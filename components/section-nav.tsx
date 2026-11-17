"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#experience", id: "experience", label: "Experience" },
  { href: "#work", id: "work", label: "Work" },
];

export function SectionNav() {
  const [active, setActive] = useState("experience");

  useEffect(() => {
    const nodes = links
      .map((link) => document.getElementById(link.id))
      .filter((node): node is HTMLElement => Boolean(node));
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.1, 0.4] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label="Sections" className="sticky top-0 z-30 -mx-5 bg-paper px-5 py-4 sm:mx-0 sm:px-0">
      <p className="flex items-center gap-3 text-[13px] font-bold tracking-[0.04em] uppercase">
        {links.map((link, index) => (
          <span key={link.id} className="flex items-center gap-3">
            {index > 0 ? <span className="text-muted">/</span> : null}
            <a
              href={link.href}
              aria-current={active === link.id ? "location" : undefined}
              className={active === link.id ? "text-ink" : "text-muted"}
            >
              {link.label}
            </a>
          </span>
        ))}
      </p>
    </nav>
  );
}
