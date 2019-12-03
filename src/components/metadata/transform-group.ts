import { inferChildControlType, transformContainer } from "./transform";

export function transformGroup(
  rawGroup: GeneXusAbstractLayout.Group
): GeneXusAbstractLayout.Group {
  return {
    ...rawGroup,
    ...transformContainer(
      rawGroup,
      inferChildControlType(rawGroup),
      false,
      true
    )
  };
}
