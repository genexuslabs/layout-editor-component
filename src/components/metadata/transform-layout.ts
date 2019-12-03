import { inferChildControlType, transformContainer } from "./transform";

export function transformLayout(
  rawLayout: GeneXusAbstractLayout.Layout
): GeneXusAbstractLayout.Layout {
  const childControlType = inferChildControlType(rawLayout);
  return {
    ...rawLayout,
    ...transformContainer(rawLayout, childControlType, true)
  };
}
