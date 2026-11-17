import { profile } from "@/lib/portfolio";

export type GithubRepo = {
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  pushedAt: string;
};

export type GithubEvent = {
  id: string;
  label: string;
  repo: string;
  url: string;
  date: string;
};

export type GithubActivity =
  | {
      ok: true;
      publicRepos: number;
      repos: GithubRepo[];
      events: GithubEvent[];
    }
  | { ok: false; message: string };

type RepoPayload = {
  name?: string;
  description?: string | null;
  html_url?: string;
  language?: string | null;
  pushed_at?: string;
  fork?: boolean;
};

type EventPayload = {
  id?: string;
  type?: string;
  created_at?: string;
  repo?: { name?: string };
};

const unavailable: GithubActivity = {
  ok: false,
  message: "GitHub activity is temporarily unavailable.",
};

function headers() {
  const value: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "aayush-portfolio",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) {
    value.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return value;
}

function eventLabel(type: string) {
  switch (type) {
    case "PushEvent":
      return "Pushed";
    case "CreateEvent":
      return "Created";
    case "PullRequestEvent":
      return "Pull request";
    case "IssuesEvent":
      return "Issue";
    case "IssueCommentEvent":
      return "Comment";
    case "WatchEvent":
      return "Starred";
    case "ForkEvent":
      return "Forked";
    case "PublicEvent":
      return "Published";
    default:
      return type.replace(/Event$/, "") || "Activity";
  }
}

export async function getGithubActivity(): Promise<GithubActivity> {
  try {
    const [userRes, repoRes, eventRes] = await Promise.all([
      fetch(`https://api.github.com/users/${profile.githubHandle}`, {
        headers: headers(),
        next: { revalidate: 3600 },
      }),
      fetch(
        `https://api.github.com/users/${profile.githubHandle}/repos?per_page=8&sort=pushed`,
        { headers: headers(), next: { revalidate: 3600 } },
      ),
      fetch(
        `https://api.github.com/users/${profile.githubHandle}/events/public?per_page=6`,
        { headers: headers(), next: { revalidate: 3600 } },
      ),
    ]);

    if (!userRes.ok || !repoRes.ok) return unavailable;

    const user = (await userRes.json()) as { public_repos?: number };
    const repoJson = (await repoRes.json()) as RepoPayload[];
    const repos = repoJson
      .filter((repo) => repo.name && repo.html_url && repo.pushed_at && !repo.fork)
      .slice(0, 5)
      .map((repo) => ({
        name: repo.name as string,
        description: repo.description ?? null,
        url: repo.html_url as string,
        language: repo.language ?? null,
        pushedAt: repo.pushed_at as string,
      }));

    let events: GithubEvent[] = [];
    if (eventRes.ok) {
      const eventJson = (await eventRes.json()) as EventPayload[];
      events = eventJson.slice(0, 4).flatMap((event) => {
        if (!event.id || !event.type || !event.repo?.name || !event.created_at) return [];
        return [
          {
            id: event.id,
            label: eventLabel(event.type),
            repo: event.repo.name,
            url: `https://github.com/${event.repo.name}`,
            date: event.created_at,
          },
        ];
      });
    }

    return {
      ok: true,
      publicRepos: user.public_repos ?? repos.length,
      repos,
      events,
    };
  } catch {
    return unavailable;
  }
}

export function formatGithubDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(new Date(iso));
}
