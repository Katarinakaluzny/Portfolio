"use client";

import { useState, useEffect, useRef } from "react";
import { Mail } from "lucide-react";

const LEFT_COL = ["K", "A", "T", "A"];
const RIGHT_COL = ["R", "I", "N", "A"];

const TYPING_TOTAL_MS = 1280 + 150;
const HOLD_DURATION = 1800;
const TRANSITION_DURATION = 800;

const PROJECTS = [
  {
    tag: "AI for Design | Implemented",
    title: "For UI Studio",
    description: "Foundational work for Spotify's AI prototyping tool, used by designers today.",
    duration: "2 months",
    role: "Product Designer",
    project: "Exploratory internship project, turned to AI design prototyping tool",
    labels: ["AI", "Prototyping", "Design Tools"],
    sections: [
      { type: "about" as const, text: "Exploratory internship project, turned into this and this project happens across summer of 2025 which was first a bit like ok how can we do this and then?\n\nBasically we weren't sure and then I turned out with this and it became the foundational work for this and this which was cool and today UI Studio is being used by so many designers at Spotify." },
      { type: "body" as const, text: "Exploratory internship project, turned into this and this project happens across summer of 2025 which was first a bit like ok how can we do this and then?\n\nBasically we weren't sure and then I turned out with this and it became the foundational work for this and this which was cool and today UI Studio is being used by so many designers at Spotify. It all did this and this which was cool.\n\n1. Process step\n2. Another step\n3. Third step\n\nAnd we resulted in this, collaborating with senior designers working with the design systems." },
      { type: "body" as const, text: "The final implementation shipped to 500+ designers internally. We built a plugin architecture that allowed teams to extend the tool with their own patterns.\n\nKey learnings from this phase included understanding how AI suggestions need to be contextual to the design system being used." },
      { type: "body" as const, text: "Impact metrics after 6 months of usage:\n\n• 73% reduction in repetitive layout tasks\n• 4.2x faster prototyping for common flows\n• Adopted by 12 product teams\n\nThe tool continues to evolve with new model capabilities." },
      { type: "body" as const, text: "Reflections and next steps — the project opened doors for thinking about AI-assisted design at scale. What started as an internship exploration became core infrastructure." },
    ],
  },
  {
    tag: "Design System | Shipped",
    title: "Encore Web",
    description: "Building and scaling Spotify's unified design system across web surfaces.",
    duration: "6 months",
    role: "Design System Lead",
    project: "Cross-team design system unification and component library",
    labels: ["Design System", "Components", "Web"],
    sections: [
      { type: "about" as const, text: "Encore Web is Spotify's unified design system for all web surfaces. I led the effort to consolidate fragmented component libraries into a single source of truth.\n\nThe project involved auditing 200+ existing components, defining patterns, and shipping a cohesive library that reduced design-to-dev handoff time by 40%." },
      { type: "body" as const, text: "The audit phase revealed 200+ components across 8 different libraries. Many were near-duplicates with subtle inconsistencies that caused confusion for both designers and engineers.\n\n1. Inventory all existing components\n2. Map usage frequency and overlap\n3. Define canonical patterns\n\nThis gave us a clear picture of what to consolidate." },
      { type: "body" as const, text: "We shipped 64 canonical components with full documentation, Figma integration, and automated migration tooling for teams still on legacy libraries." },
      { type: "body" as const, text: "Adoption grew from 3 teams to 12 in the first quarter. The system now serves as the foundation for all new web surfaces at Spotify." },
      { type: "body" as const, text: "Key insight: a design system is a product, not a project. Ongoing investment in developer experience and governance made the difference." },
    ],
  },
  {
    tag: "Mobile Experience | Shipped",
    title: "Listening Party",
    description: "Real-time shared listening sessions for groups, integrated into the social layer.",
    duration: "3 months",
    role: "Product Designer",
    project: "Social features exploration for group listening experiences",
    labels: ["Social", "Mobile", "Real-time"],
    sections: [
      { type: "about" as const, text: "Listening Party lets friends listen together in real-time, no matter where they are. I designed the end-to-end experience from invitation flows to the live session UI.\n\nThe feature launched to 12 markets and saw 2M sessions in the first month." },
      { type: "body" as const, text: "The core challenge was latency — how do you make people feel they're listening together when network conditions vary wildly?\n\n1. Designed optimistic UI patterns\n2. Built visual sync indicators\n3. Created graceful degradation flows\n\nThe result feels instant even with 200ms+ delays." },
      { type: "body" as const, text: "Social dynamics were the second major challenge. We needed to balance host control with group agency — nobody wants a dictator DJ, but pure democracy is chaos." },
      { type: "body" as const, text: "Launch results exceeded targets: 2M sessions in month one, 68% week-2 retention, NPS of 72 among active users." },
      { type: "body" as const, text: "Post-launch iterations focused on async listening parties and integration with podcast content, expanding the concept beyond music." },
    ],
  },
  {
    tag: "Data Visualization | Concept",
    title: "Wrapped Stories",
    description: "Reimagining Spotify Wrapped as a year-long narrative told through micro-moments.",
    duration: "1 month",
    role: "Concept Designer",
    project: "Speculative design sprint for personalized storytelling",
    labels: ["Data Viz", "Storytelling", "Concept"],
    sections: [
      { type: "about" as const, text: "What if Wrapped wasn't just a December event but a continuous story? This concept explored surfacing meaningful listening milestones throughout the year.\n\nI designed a system of micro-narratives that build anticipation and make the annual Wrapped feel like a conclusion, not a surprise." },
      { type: "body" as const, text: "The insight: people love Wrapped because it's a mirror. But once a year isn't enough — listening habits tell a story every week.\n\n1. Mapped emotional touchpoints throughout a listener's year\n2. Designed notification-worthy milestone moments\n3. Created a visual language for progress and discovery" },
      { type: "body" as const, text: "Prototyped 12 different milestone types, from 'genre exploration streaks' to 'mood shift detections' — each with its own visual treatment and sharing format." },
      { type: "body" as const, text: "The concept was well-received internally and influenced the team's roadmap for personalization features in 2026." },
      { type: "body" as const, text: "Speculative work like this matters — it stretches what teams believe is possible and seeds ideas that surface months later in unexpected ways." },
    ],
  },
  {
    tag: "Accessibility | Shipped",
    title: "Inclusive Play",
    description: "Making the playback experience fully accessible across assistive technologies.",
    duration: "4 months",
    role: "Product Designer",
    project: "Accessibility audit and redesign of core playback controls",
    labels: ["Accessibility", "Playback", "Inclusive"],
    sections: [
      { type: "about" as const, text: "An accessibility-first redesign of Spotify's core playback controls. Starting with a comprehensive audit, I identified 47 WCAG violations in the existing player.\n\nThe redesigned controls work seamlessly with screen readers, switch controls, and voice navigation." },
      { type: "body" as const, text: "The audit surfaced issues ranging from missing ARIA labels to focus traps in the queue interface. Most critically, the seek bar was completely unusable with keyboard navigation.\n\n1. Catalogued all violations by severity\n2. Prioritized by user impact\n3. Designed solutions that preserved visual simplicity" },
      { type: "body" as const, text: "The new seek bar uses a dual-track interaction model — keyboard users get discrete 10-second jumps with audio feedback, while pointer users keep the familiar drag behavior." },
      { type: "body" as const, text: "Testing with assistive technology users revealed assumptions we'd never have caught internally. Five rounds of usability testing shaped the final designs." },
      { type: "body" as const, text: "Post-launch: zero accessibility regression tickets in 3 months. The patterns are now documented as requirements for all new playback features." },
    ],
  },
  {
    tag: "Brand Identity | Freelance",
    title: "Forma Studio",
    description: "Visual identity and website for an architecture studio based in Stockholm.",
    duration: "5 weeks",
    role: "Brand Designer",
    project: "End-to-end brand identity from strategy to digital presence",
    labels: ["Branding", "Web", "Architecture"],
    sections: [
      { type: "about" as const, text: "Forma Studio needed an identity that felt as considered as their architecture — minimal but warm, structured but human. I developed the full brand system from wordmark to digital presence.\n\nThe website uses a restrained palette with generous whitespace, letting the architectural photography speak." },
      { type: "body" as const, text: "The brief was clear: 'We don't want to look like every other architecture firm.' That meant avoiding the expected — no all-caps sans-serif, no black-and-white-only palette.\n\n1. Strategy and positioning workshop\n2. Visual exploration (50+ directions)\n3. Refinement to 3 candidates\n\nThe winning direction paired a custom serif wordmark with a warm neutral palette." },
      { type: "body" as const, text: "The website architecture mirrors their design philosophy — clean grids that let content breathe, with subtle motion that rewards attention without demanding it." },
      { type: "body" as const, text: "Deliverables included: wordmark, color system, typography scale, business cards, letterhead, social templates, and a fully responsive website." },
      { type: "body" as const, text: "The identity launched alongside their new Stockholm office opening. Client feedback: 'It feels like us, but elevated.'" },
    ],
  },
];

const DIAGONAL_OFFSET = { x: -35, y: 42 };

export default function Page() {
  const [phase, setPhase] = useState<"typing" | "transitioning" | "done">("typing");
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [logoHovered, setLogoHovered] = useState(false);
  const scrollPos = useRef(0);
  const velocity = useRef(0);
  const [renderPos, setRenderPos] = useState(0);
  const rafId = useRef<number>(0);
  const lastWheel = useRef(0);

  useEffect(() => {
    const waitBeforeTransition = TYPING_TOTAL_MS + HOLD_DURATION;

    const t1 = window.setTimeout(() => {
      setPhase("transitioning");
    }, waitBeforeTransition);

    const t2 = window.setTimeout(() => {
      setPhase("done");
    }, waitBeforeTransition + TRANSITION_DURATION);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    if (phase !== "done") return;

    const FRICTION = 0.92;
    const SNAP_STRENGTH = 0.06;
    const IDLE_THRESHOLD = 120;

    const tick = () => {
      const now = Date.now();
      const idle = now - lastWheel.current > IDLE_THRESHOLD;

      if (idle) {
        const nearest = Math.round(scrollPos.current);
        const snapDelta = nearest - scrollPos.current;
        scrollPos.current += snapDelta * 0.08;
        velocity.current *= 0.5;
      } else {
        velocity.current *= FRICTION;
        scrollPos.current += velocity.current;
      }

      if (Math.abs(velocity.current) < 0.0001) velocity.current = 0;
      scrollPos.current += velocity.current;

      const len = PROJECTS.length;
      scrollPos.current = ((scrollPos.current % len) + len) % len;

      setRenderPos(scrollPos.current);
      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, [phase]);

  useEffect(() => {
    if (phase !== "done") return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      velocity.current += delta * 0.0004;
      lastWheel.current = Date.now();
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [phase]);

  const isCenter = phase === "typing";
  const isDone = phase === "done";

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#d9d7d3",
      }}
    >
      {/* KATA | RINA letters — animate from center to top-left corner */}
      <div
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: isCenter ? "row" : "column",
          alignItems: isCenter ? "center" : "flex-start",
          justifyContent: isCenter ? "center" : "flex-start",
          gap: isCenter ? "4.5vw" : "24px",
          fontSize: isCenter ? "clamp(80px, 9vw, 140px)" : "16px",
          lineHeight: isCenter ? "1.1" : "1.5",
          top: isCenter ? "50%" : "28px",
          left: isCenter ? "50%" : "28px",
          transform: isCenter ? "translate(-50%, -50%)" : "translate(0, 0)",
          transition:
            phase === "transitioning"
              ? `all ${TRANSITION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`
              : "none",
          zIndex: 10,
        }}
      >
        {/* Logo letters */}
        <div
          onClick={() => { if (selectedProject !== null) setSelectedProject(null); }}
          onMouseEnter={() => { if (isDone) setLogoHovered(true); }}
          onMouseLeave={() => setLogoHovered(false)}
          style={{
            display: "flex",
            gap: isCenter ? "4.5vw" : "4px",
            alignItems: "center",
            justifyContent: "center",
            cursor: isDone ? "pointer" : "default",
          }}
        >
          {/* Left column — KATA */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {LEFT_COL.map((letter, i) => (
              <span
                key={`l-${i}`}
                className={`font-display letter letter-${i}`}
                style={{ color: logoHovered ? "#414141" : "#00a7cd", transition: "color 0.2s ease" }}
              >
                {letter}
              </span>
            ))}
          </div>

          {/* Right column — RINA */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {RIGHT_COL.map((letter, i) => (
              <span
                key={`r-${i}`}
                className={`font-display letter letter-${i + LEFT_COL.length}`}
                style={{ color: logoHovered ? "#414141" : "#00a7cd", transition: "color 0.2s ease" }}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>

        {/* Icons — only visible on home */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            alignItems: "center",
            alignSelf: "center",
            opacity: isDone && selectedProject === null ? 1 : 0,
            transition: "opacity 0.4s ease 0.3s",
          }}
        >
          <SocialLink href="https://linkedin.com" label="LinkedIn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </SocialLink>
          <SocialLink href="https://instagram.com" label="Instagram">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
            </svg>
          </SocialLink>
          <SocialLink href="mailto:hello@katarina.com" label="Email">
            <Mail size={16} strokeWidth={1.5} />
          </SocialLink>
        </div>
      </div>

      {/* Home content — fades in after transition */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: isDone && selectedProject === null ? 1 : isDone && selectedProject !== null ? 0 : 0,
          transform: isDone && selectedProject === null ? "translateY(0)" : "translateY(20px)",
          transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1)`,
          pointerEvents: isDone && selectedProject === null ? "auto" : "none",
        }}
      >
        {/* Diagonal project rail */}
        {PROJECTS.map((project, i) => {
          let offset = i - renderPos;
          if (offset > PROJECTS.length / 2) offset -= PROJECTS.length;
          if (offset < -PROJECTS.length / 2) offset += PROJECTS.length;
          const x = offset * DIAGONAL_OFFSET.x;
          const y = offset * DIAGONAL_OFFSET.y;
          const absOffset = Math.abs(offset);
          const opacity = Math.max(0, 1 - absOffset * 0.7);
          const scale = Math.max(0.6, 1 - absOffset * 0.15);
          const textOpacity = Math.max(0, 1 - absOffset * 2.5);
          const visible = absOffset <= 1.5;

          return (
            <div
              key={i}
              onClick={() => { if (absOffset < 0.5) setSelectedProject(i); }}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: `translate(calc(-50% + ${x}vw), calc(-50% + ${y}vh)) scale(${scale})`,
                opacity,
                pointerEvents: absOffset < 0.5 ? "auto" : "none",
                visibility: visible ? "visible" : "hidden",
                cursor: absOffset < 0.5 ? "pointer" : "default",
              }}
            >
              <ProjectCard project={project} textOpacity={textOpacity} />
            </div>
          );
        })}

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            left: 0,
            right: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 40px",
          }}
        >
          <div style={{ width: 200 }} />

          {/* View toggles */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
              <div style={{ width: 3, height: 10, backgroundColor: "#414141" }} />
              <div style={{ width: 5, height: 13, backgroundColor: "#414141" }} />
              <div style={{ width: 3, height: 10, backgroundColor: "#414141" }} />
            </div>
            <div style={{ width: 1, height: 10, backgroundColor: "rgba(65,65,65,0.4)", margin: "0 4px" }} />
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="0" y="1" width="14" height="2.5" fill="#414141" />
              <rect x="0" y="5.75" width="14" height="2.5" fill="#414141" />
              <rect x="0" y="10.5" width="14" height="2.5" fill="#414141" />
            </svg>
          </div>

          {/* Navigation */}
          <nav style={{ display: "flex", alignItems: "center", gap: 48, fontSize: 14 }}>
            <span style={{ fontWeight: 500, color: "#262626" }}>Home</span>
            <span style={{ color: "#636363" }}>About me</span>
            <span style={{ color: "#636363" }}>Resume</span>
          </nav>
        </div>
      </div>

      {/* Project detail view */}
      {selectedProject !== null && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: isDone && selectedProject !== null ? 1 : 0,
            transition: "opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            pointerEvents: selectedProject !== null ? "auto" : "none",
          }}
        >
          <ProjectDetail
            project={PROJECTS[selectedProject]}
            onBack={() => setSelectedProject(null)}
          />
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project, textOpacity }: { project: typeof PROJECTS[number]; textOpacity: number }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 60,
      }}
    >
      {/* Project info */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, width: 200, textAlign: "center", alignSelf: "center", opacity: textOpacity }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <p style={{ fontSize: 13, color: "#7b7b7b" }}>{project.tag}</p>
          <h2 className="font-display" style={{ fontSize: 34, color: "#414141", lineHeight: 1 }}>
            {project.title}
          </h2>
        </div>
        <p style={{ fontSize: 13, color: "#414141", lineHeight: 1.5 }}>
          {project.description}
        </p>
      </div>

      {/* Project image — liquid glass card */}
      <div
        style={{
          position: "relative",
          width: 580,
          height: 290,
          flexShrink: 0,
          borderRadius: 20,
          background: "linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.18) 100%)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.55)",
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.06), " +
            "inset 0 1px 1px rgba(255,255,255,0.7), " +
            "inset 0 -1px 2px rgba(0,0,0,0.03)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 20,
            background: "linear-gradient(160deg, rgba(255,255,255,0.4) 0%, transparent 35%, transparent 80%, rgba(255,255,255,0.08) 100%)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Project metadata */}
      <div style={{ display: "flex", flexDirection: "column", gap: 28, width: 220, alignSelf: "stretch", paddingTop: 20, opacity: textOpacity }}>
        <MetaField label="Duration" value={project.duration} />
        <MetaField label="Role" value={project.role} />
        <MetaField label="Project" value={project.project} />
      </div>
    </div>
  );
}

function ProjectDetail({
  project,
  onBack,
}: {
  project: typeof PROJECTS[number];
  onBack: () => void;
}) {
  const [titleHovered, setTitleHovered] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const sectionPos = useRef(0);
  const totalSections = project.sections.length;

  useEffect(() => {
    sectionPos.current = 0;
    setCurrentSection(0);
  }, [project]);

  useEffect(() => {
    let accumulated = 0;
    let lastNav = 0;
    const THRESHOLD = 120;
    const COOLDOWN = 400;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastNav < COOLDOWN) return;

      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      accumulated += delta;

      if (Math.abs(accumulated) > THRESHOLD) {
        const direction = accumulated > 0 ? 1 : -1;
        const nextSection = Math.max(0, Math.min(totalSections - 1, Math.round(sectionPos.current) + direction));
        sectionPos.current = nextSection;
        setCurrentSection(nextSection);
        accumulated = 0;
        lastNav = now;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [totalSections]);

  const section = project.sections[currentSection];

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* Go back + title frame — bottom left corner */}
      <div
        style={{
          position: "absolute",
          bottom: 24,
          left: 24,
          display: "flex",
          flexDirection: "column",
          gap: 28,
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 13,
            color: "#414141",
            padding: 0,
            textAlign: "left",
          }}
        >
          &lt; go back
        </button>
        <h1
          className="font-display"
          onMouseEnter={() => setTitleHovered(true)}
          onMouseLeave={() => setTitleHovered(false)}
          style={{
            fontSize: "clamp(80px, 9vw, 120px)",
            color: titleHovered ? "#00a7cd" : "#414141",
            lineHeight: 0.9,
            margin: 0,
            transition: "color 0.2s ease",
          }}
        >
          {project.title}
        </h1>
      </div>

      {/* Content centerpiece — left text + right image + dot nav */}
      <div
        style={{
          position: "absolute",
          top: "45%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          alignItems: "flex-start",
          gap: 14,
        }}
      >
        {/* Main content: text + image */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 0 }}>
          {/* Left column: conditional chips/about or just text */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0, width: 320, marginRight: "16vw", paddingTop: 18 }}>
            {section.type === "about" ? (
              <>
                {/* Chips + About heading */}
                <div style={{ display: "flex", flexDirection: "column", gap: 35, marginBottom: 6 }}>
                  <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                    {project.labels.map((label) => (
                      <span
                        key={label}
                        style={{
                          fontSize: 11,
                          color: "#919191",
                          backgroundColor: "rgba(255,255,255,0.5)",
                          borderRadius: 9999,
                          padding: "5px 12px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                  <span style={{ fontSize: 11, color: "#7b7b7b" }}>About</span>
                </div>
                <p style={{ fontSize: 13, color: "#414141", lineHeight: 1.7, whiteSpace: "pre-line", margin: 0 }}>
                  {section.text}
                </p>
              </>
            ) : (
              <p style={{ fontSize: 13, color: "#414141", lineHeight: 1.7, whiteSpace: "pre-line", margin: 0 }}>
                {section.text}
              </p>
            )}
          </div>

          {/* Right: image placeholder */}
          <div
            onMouseEnter={() => setTitleHovered(true)}
            onMouseLeave={() => setTitleHovered(false)}
            style={{
              width: "48vw",
              maxWidth: 720,
              height: "44vh",
              backgroundColor: "#ababab",
              flexShrink: 0,
            }}
          />
        </div>

        {/* Vertical dot navigation — liquid glass */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.18) 100%)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.5)",
            boxShadow:
              "0 4px 16px rgba(0,0,0,0.04), " +
              "inset 0 1px 1px rgba(255,255,255,0.6), " +
              "inset 0 -1px 1px rgba(0,0,0,0.02)",
            borderRadius: 53,
            padding: "22px 18px",
            gap: 21,
            marginLeft: 14,
          }}
        >
          {Array.from({ length: totalSections }).map((_, i) => (
            <div
              key={i}
              onClick={() => {
                sectionPos.current = i;
                setCurrentSection(i);
              }}
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: i === currentSection ? "#00a7cd" : "#606060",
                cursor: "pointer",
                transition: "background-color 0.2s ease",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function MetaField({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ fontSize: 13, color: "#7b7b7b" }}>{label}</span>
      <span style={{ fontSize: 13, color: "#414141" }}>{value}</span>
    </div>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: hovered ? "#414141" : "#7b7b7b",
        textDecoration: "none",
        transition: "color 0.2s ease",
      }}
    >
      <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 16, height: 16, flexShrink: 0 }}>
        {children}
      </span>
      <span
        style={{
          position: "absolute",
          left: "100%",
          marginLeft: 8,
          fontSize: 11,
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateX(0)" : "translateX(-4px)",
          transition: "all 0.2s ease",
          whiteSpace: "nowrap",
          color: "#7b7b7b",
        }}
      >
        {label}
      </span>
    </a>
  );
}
