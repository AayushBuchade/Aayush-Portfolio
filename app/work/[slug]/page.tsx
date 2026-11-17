import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { HashLink } from "@/components/hash-link";
import { SiteFrame, SectionHeading } from "@/components/site-frame";
import { ProjectGallery } from "@/components/project-cover";
import { WorkLink } from "@/components/work-link";
import { getNextProject, getProject, projects } from "@/lib/portfolio";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Work" };
  return { title: project.name, description: project.summary };
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const next = getNextProject(project.slug);

  return (
    <SiteFrame>
      <article>
        <p className="text-[13px] font-bold tracking-[0.04em] text-muted uppercase">
          <HashLink href="/#work" className="hover:text-ink">
            Index
          </HashLink>
          <span> / {project.status}</span>
        </p>
        {project.images.length === 0 ? (
          <ViewTransition name={`work-${project.slug}`} share="morph" default="none">
            <h1 className="mt-4 max-w-[14ch] text-[clamp(2rem,5vw,2.5rem)] leading-[1.1] font-bold tracking-[-0.02em]">
              {project.name}
            </h1>
          </ViewTransition>
        ) : (
          <h1 className="mt-4 max-w-[14ch] text-[clamp(2rem,5vw,2.5rem)] leading-[1.1] font-bold tracking-[-0.02em]">
            {project.name}
          </h1>
        )}
        <p className="mt-5 max-w-[38rem] text-base leading-[1.45] text-muted">{project.summary}</p>
        <p className="mt-6 text-[13px]">
          <a className="font-bold underline-offset-[3px] hover:underline" href={project.repo} target="_blank" rel="noreferrer noopener">
            GitHub repository
          </a>
        </p>
        <ProjectGallery project={project} />

        <section className="mt-14">
          <SectionHeading>Context</SectionHeading>
          <div className="space-y-4 text-muted">
            {project.context.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <SectionHeading>In the repository</SectionHeading>
          <ul className="space-y-3 text-muted">
            {project.built.map((item) => (
              <li key={item} className="border-t border-line py-3">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <SectionHeading>Scope</SectionHeading>
          <ul className="space-y-3 text-muted">
            {project.scope.map((item) => (
              <li key={item} className="border-t border-line py-3">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <SectionHeading>Stack</SectionHeading>
          <p className="text-muted">{project.stack.join(" · ")}</p>
        </section>

        <p className="mt-14 border-t border-line pt-6">
          <WorkLink href={`/work/${next.slug}`} className="font-bold">
            Next · {next.name}
          </WorkLink>
        </p>
      </article>
    </SiteFrame>
  );
}
