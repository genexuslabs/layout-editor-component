import { inferChildControlType, transformContainer } from "./transform";

export function transformGroup(
  rawGroup: GeneXusAbstractLayout.Group,
  nestingLevel: number
): GeneXusAbstractLayout.Group {
  return {
    ...rawGroup,
    ...transformContainer(
      rawGroup,
      inferChildControlType(rawGroup),
      nestingLevel + 1,
      true
    )
  };
}
