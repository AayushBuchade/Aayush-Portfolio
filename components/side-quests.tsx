"use client";

import { useState } from "react";
import { sideQuests } from "@/lib/portfolio";
import { SectionHeading } from "@/components/site-frame";

export function SideQuests() {
  const [active, setActive] = useState<string | null>(null);
  const current = sideQuests.find((quest) => quest.name === active);

  return (
    <section id="side-quests" aria-labelledby="side-quests-heading" className="mt-16 scroll-mt-16">
      <SectionHeading id="side-quests-heading">Side quests</SectionHeading>
      <ul className="border-b border-line" onMouseLeave={() => setActive(null)}>
        {sideQuests.map((quest) => (
          <li key={quest.name} className="border-t border-line" onMouseEnter={() => setActive(quest.name)}>
            <a
              href={quest.href}
              target="_blank"
              rel="noreferrer"
              className="grid grid-cols-[48px_1fr] gap-x-4 py-[11px] sm:grid-cols-[48px_1fr_auto]"
            >
              <span className="row-span-2 grid h-12 w-12 place-items-center rounded-[4px] bg-ink text-[15px] font-bold text-paper">
                {quest.mark}
              </span>
              <span className="font-bold">{quest.name}</span>
              <span className="hidden text-right text-[13px] text-muted sm:block">{quest.status}</span>
              <span className="col-start-2 text-muted sm:col-span-2">{quest.description}</span>
            </a>
          </li>
        ))}
      </ul>
      <p className="sr-only" aria-live="polite">
        {current ? `${current.name}, ${current.status}` : ""}
      </p>
    </section>
  );
}
