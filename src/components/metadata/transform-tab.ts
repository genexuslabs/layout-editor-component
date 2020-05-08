import {
  fixArrayProperty,
  inferChildControlType,
  transformContainer
} from "./transform";

export function transformTab(
  rawTab: GeneXusAbstractLayout.Tab,
  nestingLevel: number
): GeneXusAbstractLayout.Tab {
  const item = fixArrayProperty(rawTab.item);

  return {
    ...rawTab,
    item: item.map((rawTabItem: GeneXusAbstractLayout.TabItem) =>
      transformTabItem(rawTabItem, nestingLevel)
    )
  };
}

function transformTabItem(
  rawTabItem: GeneXusAbstractLayout.TabItem,
  nestingLevel: number
): GeneXusAbstractLayout.TabItem {
  const transformed = transformContainer(
    rawTabItem,
    inferChildControlType(rawTabItem),
    nestingLevel + 1,
    true
  );

  return {
    ...rawTabItem,
    ...transformed
  };
}
