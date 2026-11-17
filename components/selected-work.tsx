import { projects } from "@/lib/portfolio";
import { ProjectCover } from "@/components/project-cover";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/site-frame";
import { WorkLink } from "@/components/work-link";

export function SelectedWork() {
  return (
    <Reveal className="mt-16">
      <section id="work" aria-labelledby="work-heading" className="scroll-mt-20">
        <SectionHeading id="work-heading">Selected work</SectionHeading>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <WorkLink
              key={project.slug}
              href={`/work/${project.slug}`}
              className="group relative block aspect-[4/3] overflow-hidden rounded-[6px] border border-line bg-soft"
            >
              <ProjectCover project={project} />
              <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-paper px-4 py-3 transition duration-300 group-hover:translate-y-0 group-focus-visible:translate-y-0 motion-reduce:translate-y-0">
                <span className="block text-[13px] font-bold">{project.name}</span>
                <span className="mt-0.5 block text-[13px] text-muted">{project.status}</span>
              </span>
            </WorkLink>
          ))}
          <a
            href="#connect"
            className="flex min-h-36 flex-col justify-between rounded-[6px] border border-line bg-soft p-6 text-muted transition duration-300 hover:text-ink sm:col-span-2"
          >
            <span className="text-base leading-snug text-ink">
              Open to a role?
              <br />
              Let&apos;s talk
            </span>
            <span className="text-[13px]">Pune · full-time and fresher roles</span>
          </a>
        </div>
      </section>
    </Reveal>
  );
}
