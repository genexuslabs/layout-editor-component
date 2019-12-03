import {
  fixArrayProperty,
  inferChildControlType,
  transformContainer
} from "./transform";

export function transformSection(
  rawSection: GeneXusAbstractLayout.Section
): GeneXusAbstractLayout.Section {
  const item = fixArrayProperty(rawSection.item);

  return {
    ...rawSection,
    item: item.map(transformSectionItem)
  };
}

function transformSectionItem(
  rawSectionItem: GeneXusAbstractLayout.SectionItem
): GeneXusAbstractLayout.SectionItem {
  const transformed = transformContainer(
    rawSectionItem,
    inferChildControlType(rawSectionItem)
  );

  return {
    ...rawSectionItem,
    ...transformed
  };
}
