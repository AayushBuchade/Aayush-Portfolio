"use client";

import { useState } from "react";
import { profile } from "@/lib/portfolio";

function Frame({ src, compact = false }: { src: string | null; compact?: boolean }) {
  return (
    <div className={`relative ${compact ? "h-28 w-28" : "h-[200px] w-[200px]"}`}>
      <div className="absolute inset-2 flex flex-col items-center justify-center bg-soft text-center">
        {src ? (
          // Portrait is a local file supplied later; dimensions vary.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt="Portrait of Aayush Nilesh Buchade" className="h-full w-full object-cover" />
        ) : (
          <>
            <span className={`font-bold tracking-tight ${compact ? "text-xl" : "text-[28px]"}`}>ANB</span>
            <span className="mt-2 px-3 text-[11px] leading-snug text-muted">Portrait forthcoming</span>
          </>
        )}
      </div>
      <svg className="pointer-events-none absolute inset-0 h-full w-full text-ink" viewBox="0 0 100 100" fill="none" aria-hidden>
        <path
          d="M6 11 C6 5 10 4 15 5 L88 4 C95 4 97 8 96 14 L97 86 C97 94 92 97 86 96 L12 97 C6 97 3 92 4 86 Z"
          stroke="currentColor"
          strokeWidth="1.15"
        />
      </svg>
    </div>
  );
}

export function Intro({ portraitSrc }: { portraitSrc: string | null }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="pb-14">
      <div className="mb-7 xl:hidden">
        <Frame src={portraitSrc} compact />
      </div>
      <div
        className="relative"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <h1 className="max-w-[16ch] text-[clamp(2.15rem,5vw,2.5rem)] leading-[1.05] font-bold tracking-[-0.03em]">
          <span
            tabIndex={0}
            className="rounded-sm outline-none"
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
          >
            {profile.given}
          </span>{" "}
          {profile.family}
        </h1>
        <div
          className={`pointer-events-none absolute top-0 right-[calc(100%+36px)] hidden transition duration-300 xl:block ${open ? "scale-[1.02]" : ""} motion-reduce:transform-none`}
        >
          <Frame src={portraitSrc} />
        </div>
      </div>
      <p className="mt-4 text-[15px] text-muted">
        {profile.location}{" "}
        <span role="img" aria-label="India">
          🇮🇳
        </span>
      </p>
      <div className="mt-6 max-w-[36rem] space-y-4 text-[16px] leading-[1.45] text-muted">
        <p>
          AI and machine learning engineer working across threat detection, explainable models, and tools that make
          unfamiliar code easier to read.
        </p>
        <p>
          Studying computer engineering at <span className="text-ink">Trinity Academy of Engineering</span>, graduating
          2027. ML intern at <span className="text-ink">GrowGrid</span>. Open to full-time and fresher roles.
        </p>
      </div>
    </header>
  );
}
