import { inferChildControlType, transformContainer } from "./transform";

export function transformGrid(
  rawGrid: GeneXusAbstractLayout.Grid,
  nestingLevel: number
): GeneXusAbstractLayout.Grid {
  return {
    ...rawGrid,
    ...transformContainer(
      rawGrid,
      inferChildControlType(rawGrid),
      nestingLevel + 1,
      true
    )
  };
}
