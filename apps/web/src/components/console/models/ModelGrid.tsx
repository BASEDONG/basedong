import { ModelCard } from "./ModelCard";
import type { ModelCardData } from "./content-types";

interface ModelGridProps {
  models: ModelCardData[];
  filterOpen?: boolean;
  onSelectModel?: (model: ModelCardData) => void;
}

export function ModelGrid({
  models,
  filterOpen = false,
  onSelectModel,
}: ModelGridProps) {
  return (
    <div
      className={`grid w-full gap-3 pb-3 pt-0 grid-cols-1 md:grid-cols-2 ${
        filterOpen
          ? "xl:grid-cols-2 2xl:grid-cols-3"
          : "xl:grid-cols-3 2xl:grid-cols-4"
      }`}
    >
      {models.map((model) => (
        <ModelCard key={model.id} model={model} onSelect={onSelectModel} />
      ))}
    </div>
  );
}
