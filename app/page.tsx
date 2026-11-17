import { SiteFrame } from "@/components/site-frame";
import { Intro } from "@/components/intro";
import { SectionNav } from "@/components/section-nav";
import { Experience } from "@/components/experience";
import { Stack } from "@/components/stack";
import { SelectedWork } from "@/components/selected-work";
import { SideQuests } from "@/components/side-quests";
import { GithubActivity } from "@/components/github-activity";
import { Connect } from "@/components/connect";
import { getGithubActivity } from "@/lib/github";
import { getLocalAssets } from "@/lib/assets";

export const revalidate = 3600;

export default async function HomePage() {
  const [github, assets] = await Promise.all([getGithubActivity(), Promise.resolve(getLocalAssets())]);

  return (
    <SiteFrame>
      <Intro portraitSrc={assets.portraitSrc} />
      <SectionNav />
      <Experience />
      <Stack />
      <SelectedWork />
      <SideQuests />
      <GithubActivity data={github} />
      <Connect
        resumeReady={assets.resumeReady}
        deliveryConfigured={Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_FROM_EMAIL)}
      />
    </SiteFrame>
  );
}
