"use client";

export default function Home({ visible }: { visible: boolean }) {
  return (
    <div
      className={`fixed inset-0 bg-warm-gray overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-[30px]"
      }`}
    >
      {/* KATA|RINA mark — top left, vertical split */}
      <div className="absolute top-6 left-6 flex gap-[3px] font-display text-[12px] text-cyan-mark leading-[1.6] select-none">
        <div className="flex flex-col items-center">
          {"KATA".split("").map((char, i) => (
            <span key={i}>{char}</span>
          ))}
        </div>
        <div className="flex flex-col items-center">
          {"RINA".split("").map((char, i) => (
            <span key={i}>{char}</span>
          ))}
        </div>
      </div>

      {/* Decorative dots — left side */}
      <div className="absolute top-[120px] left-6 flex flex-col gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="size-6 rounded-sm bg-white/60"
          />
        ))}
      </div>

      {/* Decorative gradient shapes */}
      <div
        className="absolute top-[-120px] right-[5%] w-[450px] h-[250px] opacity-50 rotate-180"
        style={{
          backgroundImage:
            "linear-gradient(119deg, #d9d9d9 15%, #ababab 65%)",
        }}
      />
      <div
        className="absolute bottom-[60px] left-[5%] w-[450px] h-[250px] opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(33deg, #d9d9d9 30%, #ababab 75%)",
        }}
      />

      {/* Main project content — centered */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-16">
        {/* Project info — left */}
        <div className="flex flex-col items-center gap-5 w-[200px] text-center">
          <div className="flex flex-col gap-2">
            <p className="text-[13px] text-text-secondary font-body">
              AI for Design | Implemented
            </p>
            <h2 className="font-display text-[34px] text-text-primary leading-[1]">
              For UI Studio
            </h2>
          </div>
          <p className="text-[13px] text-text-primary font-body leading-[1.5]">
            Foundational work for Spotify&apos;s AI prototyping tool, used by
            designers today.
          </p>
        </div>

        {/* Project image placeholder */}
        <div className="w-[580px] h-[260px] bg-warm-gray-dark shrink-0" />

        {/* Project metadata — right */}
        <div className="flex flex-col gap-14 w-[180px]">
          <MetaField label="Duration" value="2 months" />
          <MetaField label="Role" value="Product Designer" />
          <MetaField
            label="Project"
            value="Exploratory internship project, turned ..."
          />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-8 left-0 right-0 flex items-center justify-between px-10">
        {/* Spacer */}
        <div className="w-[200px]" />

        {/* View toggles — center */}
        <div className="flex items-center gap-2">
          {/* Scroll view icon */}
          <div className="flex items-center gap-[3px]">
            <div className="w-[3px] h-[10px] bg-text-primary" />
            <div className="w-[5px] h-[13px] bg-text-primary" />
            <div className="w-[3px] h-[10px] bg-text-primary" />
          </div>
          {/* Divider */}
          <div className="w-px h-[10px] bg-text-primary/40 mx-1" />
          {/* List view icon */}
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="text-text-primary"
          >
            <rect x="0" y="1" width="14" height="2.5" fill="currentColor" />
            <rect x="0" y="5.75" width="14" height="2.5" fill="currentColor" />
            <rect x="0" y="10.5" width="14" height="2.5" fill="currentColor" />
          </svg>
        </div>

        {/* Navigation — right */}
        <nav className="flex items-center gap-12 text-[14px]">
          <span className="font-medium text-text-nav-active">Home</span>
          <span className="text-text-nav">About me</span>
          <span className="text-text-nav">Resume</span>
        </nav>
      </div>
    </div>
  );
}

function MetaField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[13px] text-text-secondary">{label}</span>
      <span className="text-[13px] text-text-primary">{value}</span>
    </div>
  );
}
