import {
  fixArrayProperty,
  inferChildControlType,
  transformContainer
} from "./transform";

export function transformTab(
  rawTab: GeneXusAbstractLayout.Tab
): GeneXusAbstractLayout.Tab {
  const item = fixArrayProperty(rawTab.item);

  return {
    ...rawTab,
    item: item.map(transformTabItem)
  };
}

function transformTabItem(
  rawTabItem: GeneXusAbstractLayout.TabItem
): GeneXusAbstractLayout.TabItem {
  const transformed = transformContainer(
    rawTabItem,
    inferChildControlType(rawTabItem),
    false,
    true
  );

  return {
    ...rawTabItem,
    ...transformed
  };
}
