import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./HorizontalSlider.css";

gsap.registerPlugin(ScrollTrigger);

/* ── lerp helper ─────────────────────────────────────────── */
const lerp = (a, b, t) => a + (b - a) * t;

/* ── clamp ───────────────────────────────────────────────── */
const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

/* ── modulo (positive wrap) ──────────────────────────────── */
const mod = (n, m) => ((n % m) + m) % m;

/* ── card layout constants ───────────────────────────────── */
const CARD_W_VW = 32;   // active card width as % of vw
const CARD_ASPECT = 1.55; // width/height
const GAP_VW = 2.5;     // gap between cards % of vw

/* ── Pagination ──────────────────────────────────────────── */
function Pagination({ total, current, onGo }) {
  const visible = 5;
  const half = Math.floor(visible / 2);
  let start = current - half;
  let end = current + half;
  if (start < 0) { end -= start; start = 0; }
  if (end >= total) { start -= (end - total + 1); end = total - 1; }
  start = Math.max(0, start);

  const nums = [];
  for (let i = start; i <= end; i++) nums.push(i);

  return (
    <div className="sliderPagination">
      <div className="sliderPaginationNums">
        {nums.map((i) => (
          <span
            key={i}
            className={`sliderPaginationNum${i === current ? " is-active" : Math.abs(i - current) === 1 ? " is-near" : ""}`}
            onClick={() => onGo(i)}
          >
            {i + 1}
          </span>
        ))}
      </div>
      <div className="sliderFraction">{current + 1}/{total}</div>
    </div>
  );
}

/* ── Main component ──────────────────────────────────────── */
export default function HorizontalSlider({ projects }) {
  const total = projects.length;
  const [current, setCurrent] = useState(0);
  const [titleVisible, setTitleVisible] = useState(true);

  /* animation state */
  const targetRef = useRef(0);        // target index (float)
  const posRef = useRef(0);           // current lerped index (float)
  const rafRef = useRef(null);
  const cardsRef = useRef([]);
  const trackRef = useRef(null);
  const transitioning = useRef(false);

  /* drag state */
  const dragRef = useRef({ active: false, startX: 0, startIdx: 0, velocity: 0, lastX: 0, lastT: 0 });

  /* compute card transform based on distance from lerped position */
  const getCardStyle = useCallback((idx, pos) => {
    const vw = window.innerWidth;
    const cardW = (CARD_W_VW / 100) * vw;
    const gap = (GAP_VW / 100) * vw;
    const step = cardW + gap;

    const dist = idx - pos; // signed distance from center
    const absDist = Math.abs(dist);

    // translate: center card at 0, others offset by step
    const tx = dist * step;

    // scale: active=1, adjacent=0.82, farther=0.7
    const scale = absDist < 0.01 ? 1 : absDist < 1.1 ? lerp(1, 0.82, clamp(absDist, 0, 1)) : lerp(0.82, 0.7, clamp(absDist - 1, 0, 1));

    // opacity: active=1, adjacent=0.55, far=0.2
    const opacity = absDist < 0.01 ? 1 : absDist < 1.1 ? lerp(1, 0.55, clamp(absDist, 0, 1)) : lerp(0.55, 0.18, clamp(absDist - 1, 0, 1));

    // rotateY: slight perspective tilt for side cards
    const rotateY = clamp(dist * -8, -22, 22);

    // blur during fast motion
    const blur = absDist > 0.5 ? clamp((absDist - 0.5) * 1.5, 0, 3) : 0;

    // visible: only show 3 cards on each side
    const visible = absDist < 3.5;

    return { tx, scale, opacity, rotateY, blur, visible };
  }, []);

  /* apply transforms to DOM cards each frame */
  const applyStyles = useCallback((pos) => {
    const vw = window.innerWidth;
    const cardW = (CARD_W_VW / 100) * vw;
    const cardH = cardW / CARD_ASPECT;

    cardsRef.current.forEach((el, idx) => {
      if (!el) return;
      const s = getCardStyle(idx, pos);

      if (!s.visible) {
        el.style.visibility = "hidden";
        return;
      }
      el.style.visibility = "visible";
      el.style.width = `${cardW}px`;
      el.style.height = `${cardH}px`;
      el.style.transform = `translate3d(${s.tx}px, 0, 0) scale(${s.scale}) rotateY(${s.rotateY}deg)`;
      el.style.opacity = s.opacity;
      el.style.filter = s.blur > 0.2 ? `blur(${s.blur}px)` : "none";
      el.style.zIndex = Math.round(10 - Math.abs(idx - pos) * 2);

      const isActive = Math.abs(idx - pos) < 0.15;
      if (isActive) {
        el.classList.add("is-active");
      } else {
        el.classList.remove("is-active");
      }
    });
  }, [getCardStyle]);

  /* RAF loop */
  useEffect(() => {
    const LERP_SPEED = 0.095;

    const loop = () => {
      posRef.current = lerp(posRef.current, targetRef.current, LERP_SPEED);
      applyStyles(posRef.current);

      // Update current integer index when settled
      const rounded = Math.round(posRef.current);
      const diff = Math.abs(posRef.current - targetRef.current);
      if (diff < 0.002) {
        posRef.current = targetRef.current;
        setCurrent(mod(Math.round(targetRef.current), total));
      }

      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [applyStyles, total]);

  /* navigate */
  const goTo = useCallback((idx) => {
    const wrapped = mod(idx, total);
    targetRef.current = wrapped;

    // Animate title
    setTitleVisible(false);
    setTimeout(() => {
      setCurrent(wrapped);
      setTitleVisible(true);
    }, 280);
  }, [total]);

  const goPrev = useCallback(() => goTo(Math.round(targetRef.current) - 1), [goTo]);
  const goNext = useCallback(() => goTo(Math.round(targetRef.current) + 1), [goTo]);

  /* keyboard */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goPrev, goNext]);

  /* wheel */
  useEffect(() => {
    let pending = false;
    const onWheel = (e) => {
      e.preventDefault();
      if (pending) return;
      pending = true;
      setTimeout(() => { pending = false; }, 500);
      if (e.deltaX > 10 || e.deltaY > 10) goNext();
      else if (e.deltaX < -10 || e.deltaY < -10) goPrev();
    };
    const el = trackRef.current?.closest(".sliderSection");
    if (el) el.addEventListener("wheel", onWheel, { passive: false });
    return () => { if (el) el.removeEventListener("wheel", onWheel); };
  }, [goPrev, goNext]);

  /* drag/swipe */
  const onPointerDown = useCallback((e) => {
    dragRef.current = {
      active: true,
      startX: e.clientX,
      startIdx: targetRef.current,
      velocity: 0,
      lastX: e.clientX,
      lastT: Date.now(),
    };
    trackRef.current?.classList.add("is-dragging");
    e.preventDefault();
  }, []);

  const onPointerMove = useCallback((e) => {
    const d = dragRef.current;
    if (!d.active) return;
    const vw = window.innerWidth;
    const cardW = (CARD_W_VW / 100) * vw;
    const gap = (GAP_VW / 100) * vw;
    const step = cardW + gap;
    const dx = e.clientX - d.startX;
    const now = Date.now();
    d.velocity = (e.clientX - d.lastX) / (now - d.lastT + 1) * 16;
    d.lastX = e.clientX;
    d.lastT = now;
    targetRef.current = d.startIdx - dx / step;
  }, []);

  const onPointerUp = useCallback(() => {
    const d = dragRef.current;
    if (!d.active) return;
    d.active = false;
    trackRef.current?.classList.remove("is-dragging");
    // snap with momentum
    const snapped = Math.round(targetRef.current - d.velocity * 0.08);
    goTo(snapped);
  }, [goTo]);

  useEffect(() => {
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [onPointerMove, onPointerUp]);

  /* initial sizing */
  useEffect(() => {
    applyStyles(0);
    const onResize = () => applyStyles(posRef.current);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [applyStyles]);

  const proj = projects[current];
  const sectionFadeRef = useRef(null);

  /* Fade-off exit: scale down, fade opacity + blur as About section scrolls over */
  useEffect(() => {
    const el = sectionFadeRef.current;
    if (!el) return;
    const st = gsap.to(el, {
      scale: 0.92,
      opacity: 0.3,
      filter: "blur(6px)",
      ease: "none",
      scrollTrigger: {
        trigger: "#about",
        start: "top bottom",
        end: "top top",
        scrub: 1,
      },
    });
    return () => st.scrollTrigger?.kill();
  }, []);

  /* Entrance Transitions: Down-to-Up watermark, cascaded cards stagger, and side navs sliding */
  useEffect(() => {
    const el = sectionFadeRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Watermark title glides Down-to-Up
      gsap.from(".sliderHugeTitleInner", {
        y: 120,
        opacity: 0,
        duration: 1.8,
        ease: "power4.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });

      // Cards cascade glide from Down-to-Up
      gsap.from(".sliderCard", {
        y: 150,
        opacity: 0,
        stagger: 0.08,
        duration: 1.3,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".sliderTrack",
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });

      // Navigation arrows slide in from Down-to-Up
      gsap.from([".sliderNav.prev", ".sliderNav.next"], {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 1.0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="sliderSection" id="works" ref={sectionFadeRef}>
      
      {/* Huge Background Title */}
      <div className="sliderHugeTitle" aria-hidden="true">
        <div className="sliderHugeTitleInner">
          <span className="line">FEATURED</span>
          <span className="line">PROJECTS</span>
        </div>
      </div>

      {/* PREV */}
      <button className="sliderNav prev" onClick={goPrev} aria-label="Previous project">
        <div className="sliderNavArrow" />
        <span className="sliderNavLabel">PREV</span>
      </button>

      {/* Title */}
      <div className="sliderTitleArea">
        <div className={`sliderProjectTitle ${titleVisible ? "is-visible" : "is-hiding"}`}>
          {proj?.title?.toUpperCase()}
        </div>
      </div>

      {/* Cards track */}
      <div className="sliderTrack" ref={trackRef} onPointerDown={onPointerDown}>
        {projects.map((p, i) => (
          <div
            key={p.title}
            className="sliderCard"
            ref={(el) => { cardsRef.current[i] = el; }}
            onClick={() => {
              if (Math.abs(i - Math.round(posRef.current)) < 0.3) {
                window.open(p.repoHref, "_blank");
              } else {
                goTo(i);
              }
            }}
          >
            <div className="sliderCardFrame" style={{ width: "100%", height: "100%" }}>
              <img
                className="sliderCardImg"
                src={p.image}
                alt={p.title}
                draggable={false}
                loading="lazy"
              />
              <div className="sliderCardVignette" />
              <div className="sliderCardMeta">
                <span className="sliderCardStack">{p.stack}</span>
                <a className="sliderCardLink" href={p.repoHref} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                  VIEW →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* NEXT */}
      <button className="sliderNav next" onClick={goNext} aria-label="Next project">
        <span className="sliderNavLabel">NEXT</span>
        <div className="sliderNavArrow" />
      </button>

      {/* Pagination */}
      <Pagination total={total} current={current} onGo={goTo} />
    </section>
  );
}
