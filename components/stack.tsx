import {
  siDocker,
  siFastapi,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPython,
  siReact,
  siScikitlearn,
  siTailwindcss,
  siTypescript,
} from "simple-icons";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/site-frame";

const icons = [
  siPython,
  siTypescript,
  siReact,
  siNextdotjs,
  siFastapi,
  siNodedotjs,
  siScikitlearn,
  siPostgresql,
  siMongodb,
  siTailwindcss,
  siDocker,
];

export function Stack() {
  return (
    <Reveal className="mt-16">
      <section id="stack" aria-labelledby="stack-heading" className="scroll-mt-20">
        <SectionHeading id="stack-heading">Stack</SectionHeading>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-5">
          {icons.map((icon) => (
            <li key={icon.slug} className="group relative">
              <span
                tabIndex={0}
                role="img"
                aria-label={icon.title}
                className="flex h-[26px] w-[26px] items-center justify-center text-ink transition duration-200 group-hover:-translate-y-0.5 motion-reduce:transform-none"
              >
                <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" aria-hidden>
                  <path d={icon.path} fill="currentColor" />
                </svg>
              </span>
              <span className="pointer-events-none absolute top-full left-1/2 z-10 mt-2 -translate-x-1/2 bg-ink px-2 py-1 text-[11px] whitespace-nowrap text-paper opacity-0 transition group-hover:opacity-100 group-focus-within:opacity-100">
                {icon.title}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </Reveal>
  );
}
