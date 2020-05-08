import {
  fixArrayProperty,
  inferChildControlType,
  transformContainer
} from "./transform";

export function transformSection(
  rawSection: GeneXusAbstractLayout.Section,
  nestingLevel: number
): GeneXusAbstractLayout.Section {
  const item = fixArrayProperty(rawSection.item);

  return {
    ...rawSection,
    item: item.map((rawSectionItem: GeneXusAbstractLayout.SectionItem) =>
      transformSectionItem(rawSectionItem, nestingLevel)
    )
  };
}

function transformSectionItem(
  rawSectionItem: GeneXusAbstractLayout.SectionItem,
  nestingLevel: number
): GeneXusAbstractLayout.SectionItem {
  const transformed = transformContainer(
    rawSectionItem,
    inferChildControlType(rawSectionItem),
    nestingLevel + 1
  );

  return {
    ...rawSectionItem,
    ...transformed
  };
}
