import { AboutHero } from "./AboutHero";
import { Certifications } from "./Certifications";
import { CompanyIntro } from "./CompanyIntro";
import { DevelopmentTimeline } from "./DevelopmentTimeline";
import { HonorsMarquee } from "./HonorsMarquee";

export function AboutPageClient() {
  return (
    <>
      <AboutHero />
      <CompanyIntro />
      <DevelopmentTimeline />
      <Certifications />
      <HonorsMarquee />
    </>
  );
}
