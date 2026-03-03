import { useRef, useState, useEffect, useCallback } from 'react';

/**
 * ProfileCard
 * Props:
 *   avatarUrl        – main avatar image
 *   miniAvatarUrl    – small circular avatar shown in user-info bar
 *   name             – display name
 *   title            – sub-title / role
 *   handle           – @handle string
 *   status           – badge text (e.g. "Open to Work")
 *   contactText      – label for the contact button
 *   showUserInfo     – show the bottom user-info bar
 *   enableTilt       – 3-D mouse-tilt effect
 *   behindGlowEnabled – coloured glow behind the card
 *   behindGlowColor  – colour of the glow
 *   innerGradient    – CSS gradient string overlaid on the avatar
 *   onContactClick   – click handler for the contact button
 */
const ProfileCard = ({
    avatarUrl,
    miniAvatarUrl,
    name = 'Your Name',
    title = 'Your Title',
    handle = 'yourhandle',
    status = 'Available',
    contactText = 'Contact',
    showUserInfo = true,
    enableTilt = true,
    behindGlowEnabled = false,
    behindGlowColor = 'rgba(120, 80, 255, 0.5)',
    innerGradient = 'linear-gradient(145deg, #1a1a2e99 0%, #16213e99 100%)',
    onContactClick,
}) => {
    const cardRef = useRef(null);
    const glowRef = useRef(null);
    const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
    const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
    const [hovered, setHovered] = useState(false);
    const rafRef = useRef(null);
    const targetTilt = useRef({ rx: 0, ry: 0 });
    const currentTilt = useRef({ rx: 0, ry: 0 });

    // Smooth lerp animation loop
    const animateTilt = useCallback(() => {
        const lerp = (a, b, t) => a + (b - a) * t;
        currentTilt.current.rx = lerp(currentTilt.current.rx, targetTilt.current.rx, 0.1);
        currentTilt.current.ry = lerp(currentTilt.current.ry, targetTilt.current.ry, 0.1);
        setTilt({ rx: currentTilt.current.rx, ry: currentTilt.current.ry });

        const stillMoving =
            Math.abs(currentTilt.current.rx - targetTilt.current.rx) > 0.01 ||
            Math.abs(currentTilt.current.ry - targetTilt.current.ry) > 0.01;

        if (stillMoving) {
            rafRef.current = requestAnimationFrame(animateTilt);
        }
    }, []);

    const handleMouseMove = useCallback(
        (e) => {
            if (!enableTilt || !cardRef.current) return;
            const rect = cardRef.current.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = e.clientX - cx;
            const dy = e.clientY - cy;
            const maxTilt = 15;

            targetTilt.current = {
                rx: (-dy / (rect.height / 2)) * maxTilt,
                ry: (dx / (rect.width / 2)) * maxTilt,
            };

            // Glow follow
            const px = ((e.clientX - rect.left) / rect.width) * 100;
            const py = ((e.clientY - rect.top) / rect.height) * 100;
            setGlowPos({ x: px, y: py });

            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(animateTilt);
        },
        [enableTilt, animateTilt]
    );

    const handleMouseLeave = useCallback(() => {
        setHovered(false);
        targetTilt.current = { rx: 0, ry: 0 };
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(animateTilt);
    }, [animateTilt]);

    const handleMouseEnter = useCallback(() => setHovered(true), []);

    useEffect(() => {
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    const cardStyle = {
        transform: enableTilt
            ? `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${hovered ? 1.03 : 1})`
            : undefined,
        transition: hovered ? 'transform 0.05s linear' : 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
    };

    return (
        <div className="pc-wrapper">
            {/* Behind glow */}
            {behindGlowEnabled && (
                <div
                    className="pc-behind-glow"
                    style={{ background: behindGlowColor }}
                    aria-hidden="true"
                />
            )}

            <div
                ref={cardRef}
                className="pc-card"
                style={cardStyle}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* Inner highlight glow tracking cursor */}
                {hovered && (
                    <div
                        className="pc-inner-glow"
                        style={{
                            background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(255,255,255,0.08) 0%, transparent 60%)`,
                        }}
                        aria-hidden="true"
                    />
                )}

                {/* Avatar area */}
                <div className="pc-avatar-wrap">
                    {avatarUrl ? (
                        <img src={avatarUrl} alt={name} className="pc-avatar" draggable={false} />
                    ) : (
                        <div className="pc-avatar pc-avatar-placeholder" aria-hidden="true" />
                    )}
                    {/* Inner gradient overlay */}
                    <div
                        className="pc-avatar-gradient"
                        style={{ background: innerGradient }}
                        aria-hidden="true"
                    />
                </div>

                {/* User info bar */}
                {showUserInfo && (
                    <div className="pc-user-bar">
                        <div className="pc-user-left">
                            {miniAvatarUrl ? (
                                <img src={miniAvatarUrl} alt="" className="pc-mini-avatar" draggable={false} aria-hidden="true" />
                            ) : (
                                <div className="pc-mini-avatar pc-mini-avatar-placeholder" aria-hidden="true" />
                            )}
                            <div className="pc-user-text">
                                <span className="pc-user-name">{name.split(' ')[0]}</span>
                                <span className="pc-user-handle">@{handle}</span>
                            </div>
                        </div>
                        <button
                            type="button"
                            className="pc-contact-btn"
                            onClick={onContactClick}
                            aria-label={`${contactText} ${name}`}
                        >
                            {contactText}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileCard;
