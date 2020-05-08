import {
  inferChildControlType,
  transformContainer,
  transformControl
} from "./transform";

export function transformUserControl(
  rawUserControl: GeneXusAbstractLayout.Ucw,
  nestingLevel: number
): GeneXusAbstractLayout.Ucw | GeneXusAbstractLayout.UcwContainer {
  const childControlType = inferChildControlType(rawUserControl);

  const transformed = childControlType
    ? (transformContainer(
        rawUserControl as GeneXusAbstractLayout.UcwContainer,
        childControlType,
        nestingLevel + 1
      ) as GeneXusAbstractLayout.UcwContainer)
    : (transformControl(rawUserControl) as GeneXusAbstractLayout.Ucw);

  return {
    ...rawUserControl,
    ...transformed
  };
}
