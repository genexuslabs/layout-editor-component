import { inferChildControlType, transformContainer } from "./transform";

export function transformLayout(
  rawLayout: GeneXusAbstractLayout.Layout,
  nestingLevel: number
): GeneXusAbstractLayout.Layout {
  const childControlType = inferChildControlType(rawLayout);
  return {
    ...rawLayout,
    ...transformContainer(rawLayout, childControlType, nestingLevel + 1, false)
  };
}
