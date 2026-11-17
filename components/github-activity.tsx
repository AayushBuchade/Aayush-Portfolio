import type { GithubActivity } from "@/lib/github";
import { formatGithubDate } from "@/lib/github";
import { profile } from "@/lib/portfolio";
import { SectionHeading } from "@/components/site-frame";

export function GithubActivity({ data }: { data: GithubActivity }) {
  return (
    <section id="activity" aria-labelledby="activity-heading" className="mt-16 scroll-mt-16">
      <SectionHeading id="activity-heading">GitHub</SectionHeading>
      {data.ok ? (
        <>
          <p className="mb-4 text-muted">
            <a className="text-ink underline-offset-[3px] hover:underline" href={profile.github} target="_blank" rel="noreferrer noopener">
              {profile.githubHandle}
            </a>
            <span> · {data.publicRepos} public repositories</span>
          </p>
          {data.events.length > 0 ? (
            <ul className="mb-6 border-b border-line">
              {data.events.map((event) => (
                <li key={event.id} className="grid grid-cols-1 gap-1 border-t border-line py-3 text-[15px] sm:grid-cols-[5.5rem_minmax(0,1fr)_auto] sm:items-baseline sm:gap-3">
                  <span className="text-muted">{event.label}</span>
                  <a href={event.url} className="truncate font-bold underline-offset-[3px] hover:underline" target="_blank" rel="noreferrer noopener">
                    {event.repo.replace(`${profile.githubHandle}/`, "")}
                  </a>
                  <time className="text-[13px] text-muted" dateTime={event.date}>
                    {formatGithubDate(event.date)}
                  </time>
                </li>
              ))}
            </ul>
          ) : null}
          <ul className="border-b border-line">
            {data.repos.map((repo) => (
              <li key={repo.name} className="border-t border-line py-3">
                <div className="flex items-baseline justify-between gap-4">
                  <a href={repo.url} className="font-bold break-words underline-offset-[3px] hover:underline" target="_blank" rel="noreferrer noopener">
                    {repo.name}
                  </a>
                  <time className="shrink-0 text-[13px] text-muted" dateTime={repo.pushedAt}>
                    {formatGithubDate(repo.pushedAt)}
                  </time>
                </div>
                {repo.description ? <p className="mt-1 text-muted">{repo.description}</p> : null}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="text-muted">
          {data.message}{" "}
            <a className="text-ink underline-offset-[3px] hover:underline" href={profile.github} target="_blank" rel="noreferrer noopener">
            Open the profile
          </a>
          .
        </p>
      )}
    </section>
  );
}
