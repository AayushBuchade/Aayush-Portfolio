import Link from "next/link";
import { SiteFrame } from "@/components/site-frame";

export default function NotFound() {
  return (
    <SiteFrame>
      <h1 className="text-[clamp(2rem,5vw,2.5rem)] font-bold tracking-[-0.02em]">Page not found</h1>
      <p className="mt-4 text-muted">That address is not part of this portfolio.</p>
      <p className="mt-6">
        <Link href="/" className="font-bold underline-offset-[3px] hover:underline">
          Back to the index
        </Link>
      </p>
    </SiteFrame>
  );
}
