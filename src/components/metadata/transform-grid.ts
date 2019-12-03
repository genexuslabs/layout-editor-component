import { inferChildControlType, transformContainer } from "./transform";

export function transformGrid(
  rawGrid: GeneXusAbstractLayout.Grid
): GeneXusAbstractLayout.Grid {
  return {
    ...rawGrid,
    ...transformContainer(rawGrid, inferChildControlType(rawGrid), false, true)
  };
}
