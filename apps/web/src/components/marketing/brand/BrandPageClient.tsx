import { BrandGuidelines } from "./BrandGuidelines";
import { BrandHero } from "./BrandHero";
import { LogoBirth } from "./LogoBirth";
import { MissionVision } from "./MissionVision";
import { RelationshipSection } from "./RelationshipSection";
import { ValuesSection } from "./ValuesSection";

export function BrandPageClient() {
  return (
    <div className="sf-brand bg-white">
      <BrandHero />
      <LogoBirth />
      <MissionVision />
      <ValuesSection />
      <RelationshipSection />
      <BrandGuidelines />
    </div>
  );
}
