import { useEffect, useState } from "react";
import "./App.css";
import DecryptedText from "./DecryptedText";
import githubIcon from "../icons/github.png";
import linkedinIcon from "../icons/linkedin.png";
import instagramIcon from "../icons/instagram.png";
import discordIcon from "../icons/discord.png";
import heroPhotoImg from "../images/dog001.jpg";
import admlImg from "../images/ADML Text Classification (SVM).png";
import cryptoImg from "../images/Crypto Darkweb Flow Tracker.jpg";
import cricketImg from "../images/Cricket Tournament Registration System.avif";
import votingImg from "../images/Blockchain-Based Voting System.png";
import zedImg from "../images/ZED-ONE.svg";
import trackingImg from "../images/Real-Time Object Detection & Tracking.jpg";

const PROFILE = {
  name: "Rakhul Prakaash R A",
  handle: "Rakhul07",
  location: "TamilNadu",
  headline: "Computer Science Student | DSA Practitioner | Software Developer",
  bio: "I am a Computer Science student with a strong focus on data structures, algorithms, and practical software development. I enjoy solving complex problems and building scalable projects across web systems, cloud platforms, and applied AI.",
  about:
    "I am currently pursuing a B.E. in Computer Science and Engineering at SKCET, Coimbatore.",
  socials: {
    github: "https://github.com/Rakhul07",
    linkedin: "https://linkedin.com/in/Rakhul07",
    instagram: "https://instagram.com/_rakhull",
    discordInvite: "https://discord.gg/Rakhul006",
    email: "mailto:prakaash.b2k@gmail.com",
  },
};

const NAV = [
  { id: "home", label: "home" },
  { id: "works", label: "works" },
  { id: "about-me", label: "about-me" },
  { id: "contacts", label: "contacts" },
];

const CODING_PROFILES = [
  {
    label: "LeetCode",
    handle: "rakhul06",
    solved: "253+",
    href: "https://leetcode.com/u/rakhul06/",
  },
  {
    label: "GeeksforGeeks",
    handle: "rakhul06",
    solved: "120+",
    href: "https://www.geeksforgeeks.org/profile/rakhul06",
  },
];

const PROJECTS = [
  {
    title: "ADML Text Classification (SVM)",
    stack: "Python",
    description:
      "Text classification system using Support Vector Machines with TF-IDF vectorization. Includes evaluation metrics and CSV-based dataset support.",
    image: admlImg,
    repoHref:
      "https://github.com/Rakhul07/ADML_Text_Classification_using_Support_Vector_Machines_-SVM-",
    language: "Python",
    stars: 1,
  },
  {
    title: "Crypto Darkweb Flow Tracker",
    stack: "JavaScript",
    description:
      "System for visualizing, tracking, and analyzing cryptocurrency flows associated with dark web activity.",
    image: cryptoImg,
    repoHref: "https://github.com/Rakhul07/Crypto-Darkweb-Flow-tracker",
    language: "JavaScript",
    stars: 2,
  },
  {
    title: "Cricket Tournament Registration System",
    stack: "Java",
    description:
      "Full-stack web application for managing cricket tournament registrations, including players and event workflows.",
    image: cricketImg,
    repoHref:
      "https://github.com/Rakhul07/Cricket-tournament-registration-System",
    language: "Java",
    stars: 2,
  },
  {
    title: "Blockchain-Based Voting System",
    stack: "JavaScript, Ethereum",
    description:
      "Secure e-voting platform using Ethereum smart contracts to ensure transparency, immutability, and integrity.",
    image: votingImg,
    repoHref: "https://github.com/Rakhul07/Block-Chain-Based-Voting-System",
    language: "JavaScript",
    stars: 1,
  },
  {
    title: "ZED-ONE",
    stack: "AI Tool",
    description:
      "Cross-platform AI-powered screenshot assistant for automated capture, analysis, and code generation.",
    image: zedImg,
    repoHref: "https://github.com/Rakhul07/ZED-ONE",
    language: "N/A",
    stars: 2,
  },
  {
    title: "Real-Time Object Detection & Tracking",
    stack: "Python",
    description:
      "Deep learning-based system for real-time object detection and multi-object tracking using computer vision techniques.",
    image: trackingImg,
    repoHref:
      "https://github.com/Rakhul07/Real-Time-Object-Detection-and-Tracking",
    language: "Python",
    stars: 1,
  },
];

const SKILLS = [
  { title: "Languages", items: ["C++", "C", "Java", "JavaScript", "Python", "PHP"] },
  { title: "Web", items: ["Node.js", "Next.js", "Angular", "Vite", "Apache"] },
  { title: "Cloud", items: ["AWS", "Azure", "Google Cloud"] },
  { title: "Data", items: ["MongoDB", "MySQL", "SQLite"] },
  { title: "Tools", items: ["Git", "GitHub", "Apache Maven"] },
  { title: "Creative", items: ["Adobe", "Photoshop", "Blender"] },
];

function LogoMark() {
  return (
    <span className="logoMark" aria-hidden="true">
      <span className="logoSq" />
      <span className="logoSq" />
    </span>
  );
}

function Icon({ name }) {
  const icons = {
    github: githubIcon,
    linkedin: linkedinIcon,
    instagram: instagramIcon,
    discord: discordIcon,
  };

  const src = icons[name];
  if (src) {
    return (
      <img src={src} alt="" aria-hidden="true" decoding="async" loading="lazy" />
    );
  }

  switch (name) {
    case "github":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 2c5.52 0 10 4.58 10 10.24 0 4.53-2.87 8.37-6.84 9.73-.5.1-.68-.22-.68-.48v-1.8c2.78.63 3.36-1.2 3.36-1.2.46-1.2 1.12-1.52 1.12-1.52.9-.64-.07-.63-.07-.63-1 .07-1.52 1.05-1.52 1.05-.9 1.56-2.36 1.1-2.94.84-.1-.67-.34-1.1-.62-1.36 2.22-.26 4.56-1.14 4.56-5.08 0-1.12-.38-2.03-1-2.74.1-.26.44-1.32-.1-2.74 0 0-.82-.27-2.7 1.05a9 9 0 0 0-2.46-.34c-.84 0-1.68.12-2.46.34-1.88-1.32-2.7-1.05-2.7-1.05-.54 1.42-.2 2.48-.1 2.74-.62.7-1 1.62-1 2.74 0 3.93 2.34 4.82 4.58 5.08-.22.2-.42.52-.54.96-.48.22-1.7.6-2.46-.74 0 0-.44-.84-1.28-.9 0 0-.82-.02-.06.53 0 0 .54.28.92 1.32 0 0 .48 1.5 2.84 1v1.6c0 .26-.18.58-.68.48C4.87 20.6 2 16.77 2 12.24 2 6.58 6.48 2 12 2Z"
          />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.11 1 2.48 1c1.37 0 2.5 1.12 2.5 2.5ZM.5 8h4V24h-4V8ZM8 8h3.83v2.17h.05C12.42 8.9 13.8 7.5 16.27 7.5 20.36 7.5 21 10.2 21 13.7V24h-4v-9.08c0-2.17-.04-4.96-3.02-4.96-3.02 0-3.48 2.36-3.48 4.8V24H8V8Z"
          />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4A5.8 5.8 0 0 1 16.2 22H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.6-.9a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z"
          />
        </svg>
      );
    case "discord":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M20.3 4.4A16.3 16.3 0 0 0 16.2 3l-.2.5a14.7 14.7 0 0 1 3.2 1 13.5 13.5 0 0 0-9.4 0 14.7 14.7 0 0 1 3.2-1L12 3A16.3 16.3 0 0 0 7.8 4.4C5.8 7.3 5.2 10 5.2 12.8c0 0 1.4 2.4 5.1 2.5a6.2 6.2 0 0 0 1-1.7 5.5 5.5 0 0 1-1.6-.8l.4-.3a9.8 9.8 0 0 0 7.8 0l.4.3c-.5.3-1 .6-1.6.8.2.6.6 1.2 1 1.7 3.7 0 5.1-2.5 5.1-2.5 0-2.8-.6-5.5-2.6-8.4ZM10 12.4c-.6 0-1.1-.6-1.1-1.3S9.4 9.8 10 9.8s1.1.6 1.1 1.3-.5 1.3-1.1 1.3Zm4 0c-.6 0-1.1-.6-1.1-1.3s.5-1.3 1.1-1.3 1.1.6 1.1 1.3-.5 1.3-1.1 1.3Z"
          />
        </svg>
      );
    case "dribbble":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 2a10 10 0 1 0 10 10A10.01 10.01 0 0 0 12 2Zm7.95 9.1a16 16 0 0 0-4.75-.07c-.2-.5-.44-1-.7-1.5a17.3 17.3 0 0 0 3.3-3.4 7.96 7.96 0 0 1 2.15 4.97ZM16.4 4.7a15.2 15.2 0 0 1-2.75 3 26.4 26.4 0 0 0-4-5.45 7.96 7.96 0 0 1 6.75 2.45ZM7.8 3.2a24.6 24.6 0 0 1 4.1 5.55A15.2 15.2 0 0 1 3.6 9.9 8 8 0 0 1 7.8 3.2Zm-4.55 8.9a17.4 17.4 0 0 0 9.45-1.35c.22.45.42.9.6 1.35a16 16 0 0 0-6.25 6.2 7.98 7.98 0 0 1-3.8-6.2Zm6 7.35a14.1 14.1 0 0 1 5.1-5.15 22.5 22.5 0 0 1 1.5 6.05A7.96 7.96 0 0 1 9.25 19.45Zm8.6-.95a23.8 23.8 0 0 0-1.75-6.55 14.4 14.4 0 0 1 4.05.2 7.98 7.98 0 0 1-2.3 6.35Z"
          />
        </svg>
      );
    default:
      return null;
  }
}

function SectionTitle({ id, children }) {
  return (
    <div className="sectionTitle" id={id}>
      <h2 className="sectionTitleText">
        <span className="hash">#</span>
        {children}
      </h2>
      <span className="sectionTitleLine" aria-hidden="true" />
    </div>
  );
}

function ButtonLink({ href, variant = "primary", children }) {
  return (
    <a className={`btn ${variant}`} href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

function ProjectCard({ project }) {
  return (
    <article className="projectCard">
      <div className="projectStack">
        <span>{project.stack}</span>
        <span className="projectMeta">
          <span className="muted">{project.language}</span>
          <span className="muted">★ {project.stars}</span>
        </span>
      </div>
      <div className="projectImage" aria-hidden="true">
        <div className="projectImageInner">
          {project.image ? (
            <img className="projectThumb" src={project.image} alt="" aria-hidden="true" />
          ) : null}
          <span className="projectImageLabel">{project.title}</span>
        </div>
      </div>
      <div className="projectBody">
        <h3 className="projectTitle">{project.title}</h3>
        <p className="projectDesc">{project.description}</p>
        <div className="projectActions">
          <ButtonLink href={project.repoHref} variant="primary">
            Repo →
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}

export default function App() {
  const [activeId, setActiveId] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = NAV;

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const ids = nav.map((n) => n.id);
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      { threshold: [0.2, 0.4, 0.6] },
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [nav]);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && NAV.some((n) => n.id === hash)) setActiveId(hash);
  }, []);

  const handleNavClick = (e) => {
    if (e.detail !== 0) e.currentTarget.blur();
    setMenuOpen(false);
  };

  const handleContactSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const title = String(formData.get("title") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const subjectText = title ? title : `Portfolio message from ${name}`;
    const bodyText = `Name: ${name}\nEmail: ${email}${
      title ? `\nTitle: ${title}` : ""
    }\n\nMessage:\n${message}`;

    const mailToBase = PROFILE.socials.email;
    const separator = mailToBase.includes("?") ? "&" : "?";
    const mailToHref = `${mailToBase}${separator}subject=${encodeURIComponent(
      subjectText,
    )}&body=${encodeURIComponent(bodyText)}`;

    window.location.href = mailToHref;
    form.reset();
  };

  return (
    <div className="page">
      <header className="siteHeader">
        <div className="container headerInner">
          <a className="brand" href="#home" onClick={handleNavClick}>
            <LogoMark />
            <span className="brandName">Rakhul</span>
          </a>

          <nav className="navDesktop" aria-label="Primary">
            <ul className="navList">
              {nav.map((item) => (
                <li key={item.id}>
                  <a
                    className={`navLink ${activeId === item.id ? "active" : ""}`}
                    href={`#${item.id}`}
                    onClick={handleNavClick}
                    aria-current={activeId === item.id ? "page" : undefined}
                  >
                    <span className="hash">#</span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="headerRight">
            <button
              type="button"
              className={`burger ${menuOpen ? "open" : ""}`}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <aside className="socialRail" aria-label="Social links">
        <div className="railLine" aria-hidden="true" />
        <a
          className="railIcon"
          href={PROFILE.socials.github}
          aria-label="GitHub"
          target="_blank"
          rel="noreferrer"
        >
          <Icon name="github" />
        </a>
        <a
          className="railIcon"
          href={PROFILE.socials.linkedin}
          aria-label="LinkedIn"
          target="_blank"
          rel="noreferrer"
        >
          <Icon name="linkedin" />
        </a>
        <a
          className="railIcon"
          href={PROFILE.socials.instagram}
          aria-label="Instagram"
          target="_blank"
          rel="noreferrer"
        >
          <Icon name="instagram" />
        </a>
        <a
          className="railIcon"
          href={PROFILE.socials.discordInvite}
          aria-label="Discord"
          target="_blank"
          rel="noreferrer"
        >
          <Icon name="discord" />
        </a>
      </aside>

      {menuOpen ? (
        <div
          className="mobileOverlay"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          onClick={() => setMenuOpen(false)}
        >
          <div className="mobileMenu" onClick={(e) => e.stopPropagation()}>
            <nav aria-label="Mobile">
              <ul className="mobileNav">
                {nav.map((item) => (
                  <li key={item.id}>
                    <a
                      className={`mobileLink ${
                        activeId === item.id ? "active" : ""
                      }`}
                      href={`#${item.id}`}
                      onClick={handleNavClick}
                    >
                      <span className="hash">#</span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mobileSocial">
              <a
                className="railIcon"
                href={PROFILE.socials.github}
                aria-label="GitHub"
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="github" />
              </a>
              <a
                className="railIcon"
                href={PROFILE.socials.linkedin}
                aria-label="LinkedIn"
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="linkedin" />
              </a>
              <a
                className="railIcon"
                href={PROFILE.socials.instagram}
                aria-label="Instagram"
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="instagram" />
              </a>
              <a
                className="railIcon"
                href={PROFILE.socials.discordInvite}
                aria-label="Discord"
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="discord" />
              </a>
            </div>
          </div>
        </div>
      ) : null}

      <main className="main">
        <section className="section hero" id="home">
          <div className="container heroInner">
            <div className="heroText">
              <h1 className="heroTitle">
                <DecryptedText
                  text={PROFILE.name}
                  speed={90}
                  animateOn="view"
                  sequential
                  revealDirection="start"
                  parentClassName="accent"
                  className="decryptRevealed"
                  encryptedClassName="decryptEncrypted"
                />
              </h1>
              <p className="heroLead">
                <DecryptedText
                  text={PROFILE.headline}
                  speed={60}
                  animateOn="view"
                  sequential
                  parentClassName="white"
                  className="decryptRevealed"
                  encryptedClassName="decryptEncrypted"
                />
                <br />
                <DecryptedText
                  text={PROFILE.bio}
                  speed={70}
                  maxIterations={30}
                  animateOn="view"
                  className="decryptRevealed"
                  encryptedClassName="decryptEncrypted"
                />
              </p>
              <div className="heroActions">
                <a className="btn primary" href="#contacts" onClick={handleNavClick}>
                  Contact me
                </a>
              </div>
            </div>

            <div className="heroArt" aria-hidden="true">
              <div className="heroSquares">
                <span className="square accentSq" />
                <span className="square" />
              </div>
              <div className="heroPhoto">
                <img
                  className="heroPhotoImg"
                  src={heroPhotoImg}
                  alt=""
                  aria-hidden="true"
                  decoding="async"
                  loading="eager"
                />
              </div>
              <div className="heroTag">
                <span className="tagDot" />
                Currently working on{" "}
                <span className="white">Personal Portfolio Development</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section quote">
          <div className="container quoteInner">
            <blockquote className="quoteBox">
              <p>“With great abstraction comes a great debugging session.”</p>
              <footer className="quoteBy">— Senior Software Engineer, 3:17 a.m.</footer>
            </blockquote>
          </div>
        </section>

        <section className="section works" id="works">
          <div className="container">
            <div className="sectionHeaderRow">
              <SectionTitle>projects</SectionTitle>
              <a
                className="viewAll"
                href={`${PROFILE.socials.github}?tab=repositories`}
                target="_blank"
                rel="noreferrer"
              >
                View all →
              </a>
            </div>

            <div className="projectsGrid">
              {PROJECTS.map((p) => (
                <ProjectCard key={p.title} project={p} />
              ))}
            </div>
          </div>
        </section>

        <section className="section skills" id="skills">
          <div className="container">
            <SectionTitle>skills</SectionTitle>
            <div className="skillsGrid">
              {SKILLS.map((s) => (
                <div key={s.title} className="skillCard">
                  <div className="skillTitle">{s.title}</div>
                  <div className="skillItems">{s.items.join(" | ")}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section about" id="about-me">
          <div className="container aboutInner">
            <div className="aboutText">
              <SectionTitle>about-me</SectionTitle>
              <p>
                Hello, I'm <span className="accent">{PROFILE.name}</span>.{" "}
                {PROFILE.about}
              </p>
              <p>
                Based in {PROFILE.location}, I actively work on problem-solving,
                system design, and building real-world applications spanning web
                technologies and artificial intelligence.
              </p>
              <div className="supportCard codingCard">
                <div className="contactsCardTitle">Problem Solving</div>
                {CODING_PROFILES.map((p) => (
                  <div key={p.label} className="codingRow">
                    <span className="muted">{p.label}:</span>{" "}
                    <span className="white">{p.solved}</span>{" "}
                    <span className="muted">problems solved</span>{" "}
                    <span className="muted">·</span>{" "}
                    <a href={p.href} target="_blank" rel="noreferrer">
                      {p.handle}
                    </a>
                  </div>
                ))}
              </div>
              <a
                className="btn secondary"
                href={PROFILE.socials.github}
                target="_blank"
                rel="noreferrer"
              >
                GitHub →
              </a>
            </div>
            <div className="aboutArt" aria-hidden="true">
              <div className="aboutPhoto" />
            </div>
          </div>
        </section>

        <section className="section contacts" id="contacts">
          <div className="container">
            <SectionTitle>contacts</SectionTitle>
            <div className="contactsGrid">
              <div className="contactsText">
                <p>
                  I am open to freelance opportunities and technical
                  collaborations. For inquiries, project discussions, or other
                  requests, feel free to reach out.
                </p>
              </div>

              <div className="contactsCard">
                <div className="contactsCardTitle">Message me here</div>
                <div className="contactsCardRow">
                  <span className="muted">Discord:</span>{" "}
                  <a href={PROFILE.socials.discordInvite} target="_blank" rel="noreferrer">
                    {PROFILE.handle}
                  </a>
                </div>
                <div className="contactsCardRow">
                  <span className="muted">Email:</span>{" "}
                  <a href={PROFILE.socials.email}>prakaash.b2k@gmail.com</a>
                </div>
                <div className="contactsCardRow">
                  <span className="muted">LinkedIn:</span>{" "}
                  <a href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer">
                    /in/Rakhul07
                  </a>
                </div>
              </div>
            </div>

            <div className="contactFormRow">
              <form
                className="contactForm"
                onSubmit={handleContactSubmit}
              >
                <div className="formGrid">
                  <label className="field">
                    <span className="fieldLabel">Name</span>
                    <input className="input" name="name" autoComplete="name" required />
                  </label>
                  <label className="field">
                    <span className="fieldLabel">Email</span>
                    <input
                      className="input"
                      name="email"
                      autoComplete="email"
                      type="email"
                      required
                    />
                  </label>
                  <label className="field span2">
                    <span className="fieldLabel">Title</span>
                    <input className="input" name="title" />
                  </label>
                  <label className="field span2">
                    <span className="fieldLabel">Message</span>
                    <textarea className="input textarea" name="message" rows={5} required />
                  </label>
                </div>
                <button className="btn primary" type="submit">
                  Send
                </button>
              </form>

              <div className="supportCard">
                <div className="contactsCardTitle">Socials</div>
                <div className="supportRow">
                  <span className="muted">GitHub:</span>{" "}
                  <a href={PROFILE.socials.github} target="_blank" rel="noreferrer">
                    @{PROFILE.handle}
                  </a>
                </div>
                <div className="supportRow">
                  <span className="muted">Instagram:</span>{" "}
                  <a
                    href={PROFILE.socials.instagram}
                    target="_blank"
                    rel="noreferrer"
                  >
                    @_rakhull
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="siteFooter">
        <div className="container footerInner">
          <div className="footerBrand">
            <div className="brandRow">
              <LogoMark />
              <span className="brandName">Rakhul</span>
            </div>
            <div className="muted">© 2026 Rakhul Prakaash R A. All rights reserved.</div>
          </div>

          <div className="footerMedia">
            <div className="footerMediaTitle">Media</div>
            <div className="footerIcons">
              <a
                className="railIcon"
                href={PROFILE.socials.github}
                aria-label="GitHub"
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="github" />
              </a>
              <a
                className="railIcon"
                href={PROFILE.socials.linkedin}
                aria-label="LinkedIn"
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="linkedin" />
              </a>
              <a
                className="railIcon"
                href={PROFILE.socials.instagram}
                aria-label="Instagram"
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="instagram" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
