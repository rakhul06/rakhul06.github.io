import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";

const styles = {
  wrapper: {
    display: "inline-block",
    whiteSpace: "pre-wrap",
  },
  srOnly: {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: 0,
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0,0,0,0)",
    border: 0,
  },
};

function isWhitespaceChar(char) {
  return /\s/.test(char);
}

export default function DecryptedText({
  text = "",
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = "start",
  useOriginalCharsOnly = false,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+",
  className = "",
  parentClassName = "",
  encryptedClassName = "",
  animateOn = "hover",
  ...props
}) {
  const textChars = useMemo(() => Array.from(text), [text]);
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrambling, setIsScrambling] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState(() => new Set());
  const [hasAnimated, setHasAnimated] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(media.matches);
    update();

    if (media.addEventListener) {
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    }

    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  useEffect(() => {
    setDisplayText(text);
    setRevealedIndices(new Set());
    setIsScrambling(false);
  }, [text]);

  const availableChars = useMemo(() => {
    if (useOriginalCharsOnly) {
      return Array.from(new Set(textChars.filter((char) => !isWhitespaceChar(char))));
    }

    const chars = Array.from(characters).filter((char) => !isWhitespaceChar(char));
    return chars.length ? chars : textChars.filter((char) => !isWhitespaceChar(char));
  }, [characters, textChars, useOriginalCharsOnly]);

  useEffect(() => {
    if (!textChars.length) return;
    if (prefersReducedMotion) {
      setDisplayText(text);
      setIsScrambling(false);
      return;
    }

    let intervalId;
    let currentIteration = 0;

    const getNextIndex = (revealedSet) => {
      const textLength = textChars.length;
      switch (revealDirection) {
        case "start":
          return revealedSet.size;
        case "end":
          return textLength - 1 - revealedSet.size;
        case "center": {
          const middle = Math.floor(textLength / 2);
          const offset = Math.floor(revealedSet.size / 2);
          const nextIndex = revealedSet.size % 2 === 0 ? middle + offset : middle - offset - 1;

          if (nextIndex >= 0 && nextIndex < textLength && !revealedSet.has(nextIndex)) {
            return nextIndex;
          }

          for (let i = 0; i < textLength; i++) {
            if (!revealedSet.has(i)) return i;
          }
          return 0;
        }
        default:
          return revealedSet.size;
      }
    };

    const shuffleText = (currentRevealed) => {
      if (useOriginalCharsOnly) {
        const positions = textChars.map((char, index) => ({
          char,
          isWhitespace: isWhitespaceChar(char),
          index,
          isRevealed: currentRevealed.has(index),
        }));

        const remainingChars = positions
          .filter((p) => !p.isWhitespace && !p.isRevealed)
          .map((p) => p.char);

        for (let i = remainingChars.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [remainingChars[i], remainingChars[j]] = [remainingChars[j], remainingChars[i]];
        }

        let charIndex = 0;
        return positions
          .map((p) => {
            if (p.isWhitespace) return p.char;
            if (p.isRevealed) return textChars[p.index];
            return remainingChars[charIndex++] ?? textChars[p.index];
          })
          .join("");
      }

      return textChars
        .map((char, index) => {
          if (isWhitespaceChar(char)) return char;
          if (currentRevealed.has(index)) return char;
          if (!availableChars.length) return char;
          return availableChars[Math.floor(Math.random() * availableChars.length)];
        })
        .join("");
    };

    if (isHovering) {
      setIsScrambling(true);
      intervalId = setInterval(() => {
        setRevealedIndices((prevRevealed) => {
          if (sequential) {
            if (prevRevealed.size < textChars.length) {
              const nextIndex = getNextIndex(prevRevealed);
              const newRevealed = new Set(prevRevealed);
              newRevealed.add(nextIndex);
              setDisplayText(shuffleText(newRevealed));
              return newRevealed;
            }

            clearInterval(intervalId);
            setIsScrambling(false);
            setDisplayText(text);
            return prevRevealed;
          }

          setDisplayText(shuffleText(prevRevealed));
          currentIteration += 1;
          if (currentIteration >= maxIterations) {
            clearInterval(intervalId);
            setIsScrambling(false);
            setDisplayText(text);
          }
          return prevRevealed;
        });
      }, speed);
    } else {
      setDisplayText(text);
      setRevealedIndices(new Set());
      setIsScrambling(false);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [
    isHovering,
    text,
    textChars,
    speed,
    maxIterations,
    sequential,
    revealDirection,
    availableChars,
    useOriginalCharsOnly,
    prefersReducedMotion,
  ]);

  useEffect(() => {
    if (animateOn !== "view" && animateOn !== "both") return;
    if (prefersReducedMotion) return;

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsHovering(true);
          setHasAnimated(true);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    });

    const currentRef = containerRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [animateOn, hasAnimated, prefersReducedMotion]);

  const hoverProps =
    animateOn === "hover" || animateOn === "both"
      ? {
          onMouseEnter: () => setIsHovering(true),
          onMouseLeave: () => setIsHovering(false),
        }
      : {};

  const { style: styleProp, ...restProps } = props;

  return (
    <motion.span
      className={parentClassName}
      ref={containerRef}
      style={{ ...styles.wrapper, ...styleProp }}
      {...hoverProps}
      {...restProps}
    >
      <span style={styles.srOnly}>{text}</span>

      <span aria-hidden="true">
        {Array.from(displayText).map((char, index) => {
          const isRevealedOrDone = revealedIndices.has(index) || !isScrambling || !isHovering;

          return (
            <span key={index} className={isRevealedOrDone ? className : encryptedClassName}>
              {char}
            </span>
          );
        })}
      </span>
    </motion.span>
  );
}

