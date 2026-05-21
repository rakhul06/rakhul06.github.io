import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";
import "./App.css";
import HorizontalSlider from "./HorizontalSlider";
import ElectricBorder from "./ElectricBorder";
import ShapeGrid from "./ShapeGrid";
import TextType from "./TextType";
import githubIcon from "../icons/github.png";
import linkedinIcon from "../icons/linkedin.png";
import instagramIcon from "../icons/instagram.png";
import discordIcon from "../icons/discord.png";
import homeBackdropImg from "../images/ChatGPT Image May 19, 2026, 10_44_36 PM.png";
import contactsBackdropImg from "../images/ChatGPT Image May 19, 2026, 11_19_35 PM.png";
import admlImg from "../images/ADML Text Classification (SVM).png";
import cryptoImg from "../images/Crypto Darkweb Flow Tracker.jpg";
import cricketImg from "../images/Cricket Tournament Registration System.avif";
import votingImg from "../images/Blockchain-Based Voting System.png";
import zedImg from "../images/ZED-ONE.svg";
import trackingImg from "../images/Real-Time Object Detection & Tracking.jpg";
import trafficImg from "../images/traffic_analysis.png";
import cropImg from "../images/crop_recommendation.png";
import replayImg from "../images/replay_scheduler.png";
import stockImg from "../images/stock_modeling.png";
import gestureImg from "../images/gesture_navigation.png";

gsap.registerPlugin(ScrollTrigger, SplitText);

const PROFILE = {
  name: "Rakhul Prakaash R A",
  shortName: "Rakhul Prakaash",
  handle: "Rakhul07",
  location: "Coimbatore, IN",
  coordinates: "11.0168° N, 76.9558° E",
  role: "Software Developer",
  secondaryRole: "Computer Science Student",
  headline: "Building software systems, applied AI workflows, and practical interfaces with a sharp editorial point of view.",
  about: "I am pursuing a B.E. in Computer Science and Engineering at SKCET, Coimbatore, with a strong focus on data structures, algorithms, and production-minded software development.",
  socials: {
    github: "https://github.com/Rakhul07",
    linkedin: "https://linkedin.com/in/Rakhul07",
    instagram: "https://instagram.com/_rakhull",
    discordInvite: "https://discord.gg/Rakhul006",
    resume: "https://drive.google.com/file/d/1nMDkZNYV23SRmRRbCN2Hk3uurTDsZMB3/view?usp=drive_link",
    email: "mailto:prakaash.b2k@gmail.com",
  },
};

const NAV_ITEMS = [
  { id: "home", label: "HOME" },
  { id: "works", label: "WORKS" },
  { id: "about", label: "ABOUT" },
  { id: "contacts", label: "CONTACTS" },
];

const PROJECTS = [
  { title: "ZED-ONE", stack: "AI Tool", description: "Cross-platform screenshot assistant for automated capture, analysis, and code-oriented output.", image: zedImg, repoHref: "https://github.com/Rakhul07/ZED-ONE", language: "N/A", tags: ["Conceptual", "Expressive", "Immersive"] },
  { title: "Crypto Darkweb Flow Tracker", stack: "JavaScript", description: "Visualization system for tracking and analyzing cryptocurrency flows connected to dark web activity.", image: cryptoImg, repoHref: "https://github.com/Rakhul07/Crypto-Darkweb-Flow-tracker", language: "JavaScript", tags: ["Data", "Forensics", "Interactive"] },
  { title: "Blockchain-Based Voting System", stack: "JavaScript, Ethereum", description: "Ethereum-powered e-voting platform designed for transparency, immutability, and verifiable election integrity.", image: votingImg, repoHref: "https://github.com/Rakhul07/Block-Chain-Based-Voting-System", language: "JavaScript", tags: ["Secure", "Distributed", "Product"] },
  { title: "ADML Text Classification (SVM)", stack: "Python", description: "Text classification system using Support Vector Machines with TF-IDF vectorization and CSV-based dataset support.", image: admlImg, repoHref: "https://github.com/Rakhul07/ADML_Text_Classification_using_Support_Vector_Machines_-SVM-", language: "Python", tags: ["ML", "Research", "Evaluation"] },
  { title: "Cricket Tournament Registration System", stack: "Java", description: "Full-stack application for handling registrations, players, and operational workflows for cricket tournaments.", image: cricketImg, repoHref: "https://github.com/Rakhul07/Cricket-tournament-registration-System", language: "Java", tags: ["Full Stack", "Operations", "Workflow"] },
  { title: "Real-Time Object Detection & Tracking", stack: "Python", description: "Computer vision system for real-time object detection and multi-object tracking with deep learning workflows.", image: trackingImg, repoHref: "https://github.com/Rakhul07/Real-Time-Object-Detection-and-Tracking", language: "Python", tags: ["Vision", "Realtime", "Deep Learning"] },
  { title: "ML-based Traffic Analysis", stack: "YOLOv8, FastAPI", description: "AI Traffic Analysis System image and video analysis app built with YOLOv8, FastAPI, React, and local SQLite storage.", image: trafficImg, repoHref: "https://github.com/Rakhul07/ML-based-Traffic-Analaysis", language: "JavaScript", tags: ["AI", "Vision", "Full Stack"] },
  { title: "Crop Recommendation System", stack: "JavaScript", description: "Agriculture assistant application for farmers to select suitable crops based on soil, weather, season, and location.", image: cropImg, repoHref: "https://github.com/Rakhul07/ML-based-Crop-recommendation-System", language: "JavaScript", tags: ["Agriculture", "Data", "App"] },
  { title: "Replay Scheduler", stack: "JavaScript", description: "Internal QA Tool for scheduling, prioritizing, and monitoring match replay executions with persistent storage and analytics.", image: replayImg, repoHref: "https://github.com/Rakhul07/Replay-scheduler-main", language: "JavaScript", tags: ["QA", "Database", "Analytics"] },
  { title: "Stock Price Modeling", stack: "Jupyter Notebook", description: "End-to-end, reproducible time-series modeling pipeline for stock prices using AR, MA, and ARMA models.", image: stockImg, repoHref: "https://github.com/Rakhul07/Stock-Price-Modeling-Using-AR-MA-Models", language: "Jupyter Notebook", tags: ["Finance", "Time Series", "ML"] },
  { title: "ML-Based Gesture Navigation", stack: "Python", description: "Machine learning based system for recognizing hand gestures and translating them into computer navigation commands.", image: gestureImg, repoHref: "https://github.com/Rakhul07/ML-Based-Gesture-Navigation", language: "Python", tags: ["HCI", "Vision", "ML"] },
];

const CODING_PROFILES = [
  { label: "LeetCode", handle: "rakhul06", solved: "253+", href: "https://leetcode.com/u/rakhul06/" },
  { label: "GeeksforGeeks", handle: "rakhul06", solved: "120+", href: "https://www.geeksforgeeks.org/profile/rakhul06" },
];

const SKILL_GROUPS = [
  { title: "Languages", items: ["C++", "C", "Java", "JavaScript", "Python"] },
  { title: "Web", items: ["Node.js", "Next.js", "Angular", "Vite", "Apache"] },
  { title: "Cloud", items: ["AWS", "Azure", "Google Cloud"] },
  { title: "Data", items: ["MongoDB", "MySQL", "SQLite"] },
  { title: "Tools", items: ["Git", "GitHub", "Apache Maven"] },
  { title: "Creative", items: ["Adobe", "Photoshop", "Blender"] },
];

const SOCIAL_LINKS = [
  { id: "github", label: "GitHub", href: PROFILE.socials.github, icon: githubIcon },
  { id: "linkedin", label: "LinkedIn", href: PROFILE.socials.linkedin, icon: linkedinIcon },
  { id: "instagram", label: "Instagram", href: PROFILE.socials.instagram, icon: instagramIcon },
  { id: "discord", label: "Discord", href: PROFILE.socials.discordInvite, icon: discordIcon },
];

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ── Header ─────────────────────────────────────────────── */
function SiteHeader({ activeSection }) {
  const [timeStr, setTimeStr] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setTimeStr(d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" }) + " IST");
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="siteHeader">
      <div className="headerInfo">
        <span>{PROFILE.location.toUpperCase()}</span>
        <span>{PROFILE.coordinates}</span>
        <span>{timeStr}</span>
      </div>

      <button
        className={`mobileMenuToggle ${menuOpen ? "is-open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </button>

      <nav className={`siteNav ${menuOpen ? "is-open" : ""}`} aria-label="Primary">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.id}
            className={`navLink ${activeSection === item.id ? "is-active" : ""}`}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(item.id);
              setMenuOpen(false);
            }}
          >
            {item.label}
          </a>
        ))}
        <a className="navLink" href={PROFILE.socials.resume} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>RESUME</a>
      </nav>
    </header>
  );
}

/* ── Loader ─────────────────────────────────────────────── */
function LoaderScreen({ onDone }) {
  const ref = useRef(null);
  const countRef = useRef(null);
  const fillRef = useRef(null);

  useEffect(() => {
    const obj = { val: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(ref.current, {
          opacity: 0, duration: 0.55, ease: "power2.inOut",
          onComplete: onDone,
        });
      },
    });
    tl.to(obj, {
      val: 100, duration: 1.4, ease: "power2.inOut",
      onUpdate() {
        if (countRef.current) countRef.current.textContent = String(Math.round(obj.val)).padStart(3, "0");
        if (fillRef.current) fillRef.current.style.width = `${obj.val}%`;
      },
    });
  }, [onDone]);

  return (
    <div className="loaderScreen" ref={ref}>
      <div className="loaderInner">
        <div className="loaderCount" ref={countRef}>000</div>
        <div className="loaderBar"><div className="loaderBarFill" ref={fillRef} /></div>
      </div>
    </div>
  );
}

/* ── Home Section ────────────────────────────────────────── */
function HomeSection({ loaded }) {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const bgImgRef = useRef(null);
  const titleRef = useRef(null);
  const roleRef = useRef(null);
  const taglineRef = useRef(null);
  const metaRef = useRef(null);

  useEffect(() => {
    if (!loaded) return;
    const ctx = gsap.context(() => {
      // Parallax bg
      gsap.to(bgImgRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Intro animations (Down-to-Up transitions)
      const lines = titleRef.current.querySelectorAll(".line");
      const tl = gsap.timeline({ delay: 0.1 });
      tl.from(metaRef.current, { opacity: 0, y: 18, duration: 0.7, ease: "power3.out" })
        .from(lines, { opacity: 0, y: 100, stagger: 0.15, duration: 1.3, ease: "power4.out" }, "-=0.3")
        .from(roleRef.current, { opacity: 0, y: 40, duration: 0.9, ease: "power3.out" }, "-=0.7")
        .from(taglineRef.current, { opacity: 0, y: 40, duration: 0.9, ease: "power3.out" }, "-=0.7");

      // Exit: next section slides over
      gsap.to(sectionRef.current, {
        scale: 0.92,
        opacity: 0.3,
        filter: "blur(6px)",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "bottom bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [loaded]);

  return (
    <section className="section homeSection" id="home" ref={sectionRef}>
      <div className="homeBg" ref={bgRef}>
        <img src={homeBackdropImg} alt="" ref={bgImgRef} loading="eager" />
        <div className="homeBgOverlay" />
      </div>
      <div className="homeContent">
        <div className="homeMeta" ref={metaRef}>
          {/* <span>{PROFILE.role.toUpperCase()}</span>
          <span>2026</span> */}
        </div>
        <h1 className="homeTitle" ref={titleRef}>
          <span className="line">RAKHUL</span>
          <span className="line">PRAKAASH</span>
        </h1>
        <div className="homeSubRow">
          <div className="homeRole" ref={roleRef}>SOFTWARE DEVELOPER</div>
          <p className="homeTagline" ref={taglineRef}>{PROFILE.headline}</p>
        </div>
      </div>
      <div className="homeScrollHint">
        <span>SCROLL</span>
        <div className="scrollLine" />
      </div>
    </section>
  );
}

/* ── Works Section — horizontal cinematic slider ─────────── */
function WorksSection() {
  return <HorizontalSlider projects={PROJECTS} />;
}

/* ── Quote Section ───────────────────────────────────────── */
function QuoteSection() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Brutalist Typography Entry (Down-to-Up Slide)
      gsap.from(textRef.current, {
        y: 80,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: { trigger: textRef.current, start: "top 80%" },
      });

      // Exit: next section slides over
      gsap.to(sectionRef.current, {
        scale: 0.92,
        opacity: 0.3,
        filter: "blur(6px)",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "bottom bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section quoteSection" id="quote" ref={sectionRef}>
      <div className="quoteSectionInner">
        <h2 className="quoteHugeTitle" ref={textRef}>
          <TextType
            text='"WITH GREAT ABSTRACTION COMES A GREAT DEBUGGING SESSION."'
            typingSpeed={50}
            initialDelay={600}
            showCursor={true}
            cursorCharacter="|"
            loop={true}
            startOnVisible={true}
          />
        </h2>
        <p className="quoteHugeAuthor">— SENIOR SOFTWARE ENGINEER, 3:17 A.M.</p>
      </div>
    </section>
  );
}

/* ── About Section ───────────────────────────────────────── */
function AboutSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const copyRef = useRef(null);
  const skillsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title: Slide Down-to-Up
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: titleRef.current, start: "top 88%", toggleActions: "play none none none" },
      });

      // Panels: Staggered Down-to-Up glides for biography and skills cards
      gsap.from([copyRef.current, skillsRef.current], {
        opacity: 0,
        y: 120,
        stagger: 0.15,
        duration: 1.3,
        ease: "power4.out",
        scrollTrigger: { trigger: copyRef.current, start: "top 88%", toggleActions: "play none none none" },
      });

      // Exit: next section slides over
      gsap.to(sectionRef.current, {
        scale: 0.92,
        opacity: 0.3,
        filter: "blur(6px)",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "bottom bottom",
          end: "bottom top",
          scrub: 1,
        },
      });


    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section aboutSection" id="about" ref={sectionRef}>
      <div className="inner">
        <div className="aboutHeroText">
          <span className="aboutMicroLeft">SOFTWARE WITH INTENT</span>
          <h2 className="aboutTitle" ref={titleRef}>
            ABOUT RAKHUL PRAKAASH
          </h2>
          <span className="aboutMicroRight">SYSTEMS AND NARRATIVE</span>
        </div>

        <div className="aboutGrid">
          <ElectricBorder
            color="#ffffff"
            speed={1}
            chaos={0.12}
            borderRadius={5}
            ref={copyRef}
            className="aboutCopy"
          >
            <h2>{PROFILE.secondaryRole}</h2>
            <p>{PROFILE.about}</p>
            <p>I focus on problem solving, system design, and building practical tools across web, cloud, data, and AI workflows. The work is technical, but the presentation still matters.</p>
            <div className="codingPanel">
              {CODING_PROFILES.map((cp) => (
                <a key={cp.label} className="codingStat" href={cp.href} target="_blank" rel="noreferrer">
                  <span>{cp.label}</span>
                  <strong>{cp.solved}</strong>
                  <span>@{cp.handle}</span>
                </a>
              ))}
            </div>
            <div className="aboutActions">
              <a className="ctaLink" href={PROFILE.socials.resume} target="_blank" rel="noreferrer">Resume <span className="ctaArrow">→</span></a>
              <a className="ctaLink" href={PROFILE.socials.email}>Email <span className="ctaArrow">→</span></a>
            </div>
          </ElectricBorder>
          <ElectricBorder
            color="#ffffff"
            speed={1}
            chaos={0.12}
            borderRadius={5}
            ref={skillsRef}
            className="aboutSkills"
          >
            <h3>Tools and systems</h3>
            <div className="skillGroupsContainer">
              {SKILL_GROUPS.map((group) => (
                <div key={group.title} className="skillGroupCard">
                  <h4>{group.title}</h4>
                  <div className="skillCloud">
                    {group.items.map((item) => <span key={item} className="skillChip">{item}</span>)}
                  </div>
                </div>
              ))}
            </div>
            <div className="aboutActions">
              <a className="ctaLink" href={PROFILE.socials.github} target="_blank" rel="noreferrer">GitHub <span className="ctaArrow">→</span></a>
            </div>
          </ElectricBorder>
        </div>
      </div>
    </section>
  );
}

/* ── Contacts Section ────────────────────────────────────── */
function ContactsSection() {
  const sectionRef = useRef(null);
  const bgImgRef = useRef(null);
  const titleRef = useRef(null);
  const topRowRef = useRef(null);
  const quoteRef = useRef(null);
  const panel1Ref = useRef(null);
  const panel2Ref = useRef(null);
  const socialsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax bg
      gsap.to(bgImgRef.current, {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.8,
        },
      });

      // Direct Channels Top Row: Down-to-Up glide
      gsap.from(topRowRef.current, {
        opacity: 0, y: 35, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: topRowRef.current, start: "top 90%", toggleActions: "play none none none" },
      });

      // Title lines: Down-to-Up glide with stagger
      const lines = titleRef.current.querySelectorAll(".line");
      gsap.from(lines, {
        opacity: 0, y: 80, stagger: 0.1, duration: 1.3, ease: "power4.out",
        scrollTrigger: { trigger: titleRef.current, start: "top 88%", toggleActions: "play none none none" },
      });

      // Cards: staggered Down-to-Up glides
      gsap.from([quoteRef.current, panel1Ref.current, panel2Ref.current], {
        opacity: 0, y: 100, stagger: 0.15, duration: 1.2, ease: "power4.out",
        scrollTrigger: { trigger: quoteRef.current, start: "top 88%", toggleActions: "play none none none" },
      });

      // Socials Block: Down-to-Up glide
      gsap.from(socialsRef.current, {
        opacity: 0, y: 60, duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: socialsRef.current, start: "top 92%", toggleActions: "play none none none" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section contactSection" id="contacts" ref={sectionRef}>
      <div className="contactBg">
        <img src={contactsBackdropImg} alt="" ref={bgImgRef} loading="lazy" />
        <div className="contactBgOverlay" />
      </div>
      <div className="inner">
        <div className="contactTopRow" ref={topRowRef}>
          <span>Direct channels</span>
          <span>Open for selected collaborations</span>
        </div>
        <h2 className="contactTitle" ref={titleRef}>
          <span className="line">CON</span>
          <span className="line">TACTS</span>
        </h2>
        <div className="contactGrid">
          <article className="contactQuoteCard" ref={quoteRef}>
            <p>Design-aware software, careful systems, and practical collaboration.</p>
            <span>Available for internships, freelance work, and ambitious builds.</span>
          </article>
          <article className="contactPanel" ref={panel1Ref}>
            <h2>Reach out</h2>
            <div className="contactPanelList">
              <a href={PROFILE.socials.email}>prakaash.b2k@gmail.com</a>
              <a href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer">linkedin.com/in/Rakhul07</a>
              <a href={PROFILE.socials.github} target="_blank" rel="noreferrer">github.com/Rakhul07</a>
              <a href={PROFILE.socials.discordInvite} target="_blank" rel="noreferrer">Discord / {PROFILE.handle}</a>
            </div>
          </article>
          <article className="contactPanel" ref={panel2Ref}>
            <h2>Current focus</h2>
            <p>Software systems, practical AI workflows, web engineering, and careful execution across product-facing interfaces.</p>
            <div className="contactActions">
              <a className="ctaLink" href={PROFILE.socials.email}>Send email <span className="ctaArrow">→</span></a>
              <a className="ctaLink" href={PROFILE.socials.resume} target="_blank" rel="noreferrer">Open resume <span className="ctaArrow">→</span></a>
            </div>
          </article>
        </div>
        <div className="contactSocialsBlock" ref={socialsRef}>
          <h2 className="contactSocialsTitle">Socials</h2>
          <div className="socialRow">
            {SOCIAL_LINKS.map((link) => (
              <a key={link.id} className="socialLink" href={link.href} target="_blank" rel="noreferrer" aria-label={link.label}>
                <img src={link.icon} alt="" aria-hidden="true" />
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
      <SiteFooter />
    </section>
  );
}

/* ── Footer ─────────────────────────────────────────────── */
function SiteFooter() {
  return (
    <footer className="siteFooter">
      <div className="footerLine" />
      <div className="footerContent">
        <span>{PROFILE.shortName.toUpperCase()}</span>
        <span>{PROFILE.role.toUpperCase()}</span>
        <span><a href={PROFILE.socials.email}>prakaash.b2k@gmail.com</a></span>
      </div>
    </footer>
  );
}

/* ── App ─────────────────────────────────────────────────── */
export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const lenisRef = useRef(null);

  useEffect(() => {
    // Reset scroll restoration on load/reload to manual to prevent automatic jumping
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    // Redirect to home section and scroll to the top of the viewport
    window.location.hash = "#home";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (!loaded) return;

    // Intersection observer for active nav
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.35) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.35 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [loaded]);

  return (
    <>
      {!loaded && <LoaderScreen onDone={() => setLoaded(true)} />}
      {loaded && (
        <div className="globalGridBg">
          <ShapeGrid
            speed={0.4}
            squareSize={48}
            direction="diagonal"
            borderColor="rgba(255, 255, 255, 0.07)"
            hoverFillColor="rgba(255, 255, 255, 0.04)"
            shape="square"
            hoverTrailAmount={4}
          />
        </div>
      )}
      <div className="pageShell" style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.4s ease" }}>
        <SiteHeader activeSection={activeSection} />
        <HomeSection loaded={loaded} />
        <QuoteSection />
        <WorksSection />
        <AboutSection />
        <ContactsSection />
      </div>
    </>
  );
}
