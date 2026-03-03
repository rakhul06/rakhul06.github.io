import { useCallback, useEffect, useRef } from "react";

const EASING = {
  linear: (t) => t,
  "ease-in": (t) => t * t,
  "ease-in-out": (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  "ease-out": (t) => t * (2 - t),
};

function drawLightningSegment(ctx, start, end, color, alpha, width, jitter) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const length = Math.hypot(dx, dy);
  if (length < 0.5) return;

  const nx = -dy / length;
  const ny = dx / length;
  const maxOffset = Math.min(jitter, length * 0.4);
  const offset = (Math.random() * 2 - 1) * maxOffset;

  const midX = (start.x + end.x) / 2 + nx * offset;
  const midY = (start.y + end.y) / 2 + ny * offset;

  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.strokeStyle = color;
  ctx.globalAlpha = alpha * 0.3;
  ctx.lineWidth = width * 3;
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(midX, midY);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();

  ctx.globalAlpha = alpha;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(midX, midY);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
}

export default function ClickSpark({
  sparkColor = "#fff",
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = "ease-out",
  extraScale = 1,
  trailEnabled = true,
  trailDuration = 220,
  trailMaxPoints = 24,
  trailMinDistance = 5,
  trailJitter = 8,
  trailWidth = 1.8,
  children,
}) {
  const canvasRef = useRef(null);
  const sparksRef = useRef([]);
  const trailRef = useRef([]);
  const animationFrameRef = useRef(null);
  const resizeTimeoutRef = useRef(null);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const { width, height } = parent.getBoundingClientRect();
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof ResizeObserver === "undefined") return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const handleResize = () => {
      window.clearTimeout(resizeTimeoutRef.current);
      resizeTimeoutRef.current = window.setTimeout(resizeCanvas, 100);
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(parent);
    resizeCanvas();

    return () => {
      observer.disconnect();
      window.clearTimeout(resizeTimeoutRef.current);
    };
  }, [resizeCanvas]);

  const drawFrame = useCallback(
    (timestamp) => {
      const canvas = canvasRef.current;
      if (!canvas) {
        animationFrameRef.current = null;
        return;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        animationFrameRef.current = null;
        return;
      }

      const ease = EASING[easing] ?? EASING["ease-out"];
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (trailEnabled) {
        trailRef.current = trailRef.current.filter(
          (point) => timestamp - point.time <= trailDuration,
        );

        const points = trailRef.current;
        for (let i = 1; i < points.length; i += 1) {
          const start = points[i - 1];
          const end = points[i];
          const age = timestamp - end.time;
          const alpha = 1 - age / trailDuration;
          if (alpha <= 0) continue;

          drawLightningSegment(
            ctx,
            start,
            end,
            sparkColor,
            alpha * 0.9,
            trailWidth,
            trailJitter,
          );
        }

        const head = points[points.length - 1];
        if (head) {
          ctx.fillStyle = sparkColor;
          ctx.globalAlpha = 0.18;
          ctx.beginPath();
          ctx.arc(head.x, head.y, 8, 0, Math.PI * 2);
          ctx.fill();

          ctx.globalAlpha = 0.85;
          ctx.beginPath();
          ctx.arc(head.x, head.y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= duration) return false;

        const progress = elapsed / duration;
        const eased = ease(progress);
        const distance = eased * sparkRadius * extraScale;
        const lineLength = sparkSize * (1 - eased);

        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

        ctx.strokeStyle = sparkColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        return true;
      });

      const hasTrail = trailEnabled && trailRef.current.length > 0;
      if (sparksRef.current.length > 0 || hasTrail) {
        ctx.globalAlpha = 1;
        animationFrameRef.current = requestAnimationFrame(drawFrame);
      } else {
        ctx.globalAlpha = 1;
        animationFrameRef.current = null;
      }
    },
    [
      duration,
      easing,
      extraScale,
      sparkColor,
      sparkRadius,
      sparkSize,
      trailDuration,
      trailEnabled,
      trailJitter,
      trailWidth,
    ],
  );

  const startAnimation = useCallback(() => {
    if (animationFrameRef.current !== null) return;
    animationFrameRef.current = requestAnimationFrame(drawFrame);
  }, [drawFrame]);

  useEffect(
    () => () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    },
    [],
  );

  const handleClick = useCallback(
    (event) => {
      const canvas = canvasRef.current;
      if (!canvas || sparkCount <= 0) return;

      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const now = performance.now();

      const nextSparks = Array.from({ length: sparkCount }, (_, index) => ({
        x,
        y,
        angle: (2 * Math.PI * index) / sparkCount,
        startTime: now,
      }));

      sparksRef.current.push(...nextSparks);
      startAnimation();
    },
    [sparkCount, startAnimation],
  );

  const handlePointerMove = useCallback(
    (event) => {
      if (!trailEnabled) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const points = trailRef.current;
      const lastPoint = points[points.length - 1];

      if (lastPoint) {
        const dx = x - lastPoint.x;
        const dy = y - lastPoint.y;
        if (dx * dx + dy * dy < trailMinDistance * trailMinDistance) {
          return;
        }
      }

      points.push({ x, y, time: performance.now() });
      if (points.length > trailMaxPoints) {
        points.splice(0, points.length - trailMaxPoints);
      }
      startAnimation();
    },
    [startAnimation, trailEnabled, trailMaxPoints, trailMinDistance],
  );

  return (
    <div
      onClick={handleClick}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerMove}
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100%",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          userSelect: "none",
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}
