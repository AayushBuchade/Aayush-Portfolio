import { experience } from "@/lib/portfolio";
import { Reveal } from "@/components/reveal";

export function Experience() {
  return (
    <Reveal>
      <section id="experience" aria-labelledby="experience-heading" className="scroll-mt-20">
        <h2 id="experience-heading" className="sr-only">
          Experience
        </h2>
        <ul className="border-b border-line">
          {experience.map((item) => (
            <li
              key={item.org}
              className="group grid grid-cols-[44px_1fr_auto] grid-rows-2 items-center gap-x-4 border-t border-line px-1 py-3 transition-colors duration-200 hover:bg-soft sm:grid-cols-[48px_1fr_auto]"
            >
              <span className="row-span-2 grid h-11 w-11 place-items-center rounded-[4px] bg-ink text-[14px] font-bold text-paper transition duration-200 group-hover:scale-[1.04] motion-reduce:transform-none sm:h-12 sm:w-12">
                {item.mark}
              </span>
              <span className="font-bold">{item.role}</span>
              <span className="row-span-2 text-right text-[13px] text-muted">{item.period}</span>
              <span className="text-muted">{item.org}</span>
            </li>
          ))}
        </ul>
      </section>
    </Reveal>
  );
}
