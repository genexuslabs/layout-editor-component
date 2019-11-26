import { controlsDefinition } from "../common/controls";

const controlTypesList = controlsDefinition.map(def => def.type);
const controlsTransforms = {
  group: {
    transformFn: transformGroup
  },
  grid: {
    transformFn: transformGrid
  },
  section: {
    transformFn: transformSection
  },
  tab: {
    transformFn: transformTab
  },
  table: {
    transformFn: transformTable
  },
  ucw: {
    transformFn: transformUserControl
  }
};

function transformModel(
  rawModel: GeneXusAbstractLayout.Model
): GeneXusAbstractLayout.Model {
  return {
    layout: transformLayout(rawModel.layout)
  };
}

function transformLayout(
  rawLayout: GeneXusAbstractLayout.Layout
): GeneXusAbstractLayout.Layout {
  const childControlType = inferChildControlType(rawLayout);
  return {
    ...rawLayout,
    ...transformContainer(rawLayout, childControlType, true)
  };
}

function transformContainer(
  rawContainer: GeneXusAbstractLayout.Container,
  childControlType: string,
  isRoot = false,
  isPart = false
): GeneXusAbstractLayout.Container {
  const transformControlFn = getTransformFunctionByType(childControlType);

  return {
    childControlType,
    controlType: childControlType,
    [childControlType]: {
      ...transformControlFn(rawContainer[childControlType]),
      isRootControl: isRoot,
      isPartControl: isPart
    }
  };
}

function getTransformFunctionByType(
  type: string
): (control: GeneXusAbstractLayout.Control) => GeneXusAbstractLayout.Control {
  const definition = controlsTransforms[type];

  if (!definition) {
    return transformControl;
  } else {
    return (
      control: GeneXusAbstractLayout.Control
    ): GeneXusAbstractLayout.Control =>
      definition.transformFn(transformControl(control));
  }
}

function transformTable(
  rawTable: GeneXusAbstractLayout.Table
): GeneXusAbstractLayout.Table {
  const row = fixArrayProperty(rawTable.row);

  return {
    ...rawTable,
    row: row.map(transformRow)
  };
}

function transformRow(
  rawRow: GeneXusAbstractLayout.Row
): GeneXusAbstractLayout.Row {
  const cell = fixArrayProperty(rawRow.cell);
  return {
    ...rawRow,
    cell: cell.map(transformCell)
  };
}

function transformCell(
  rawCell: GeneXusAbstractLayout.Cell
): GeneXusAbstractLayout.Cell {
  const childControlType = rawCell.childControlType
    ? rawCell.childControlType
    : inferChildControlType(rawCell);
  const container = childControlType
    ? transformContainer(rawCell, childControlType)
    : null;

  return {
    ...rawCell,
    ...container
  };
}

function transformUserControl(
  rawUserControl: GeneXusAbstractLayout.Ucw
): GeneXusAbstractLayout.Ucw {
  const childControlType = inferChildControlType(rawUserControl);

  const transformed = childControlType
    ? transformContainer(
        rawUserControl as GeneXusAbstractLayout.UcwContainer,
        childControlType
      )
    : transformControl(rawUserControl);

  return {
    ...rawUserControl,
    ...transformed
  };
}

function transformTab(
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

function transformGroup(
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

function transformGrid(
  rawGrid: GeneXusAbstractLayout.Grid
): GeneXusAbstractLayout.Grid {
  return {
    ...rawGrid,
    ...transformContainer(rawGrid, inferChildControlType(rawGrid), false, true)
  };
}

function transformSection(
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

function transformControl(
  control: GeneXusAbstractLayout.Control
): GeneXusAbstractLayout.Control {
  const customPropertiesXml = control["@PATTERN_ELEMENT_CUSTOM_PROPERTIES"];
  if (customPropertiesXml) {
    control.CustomProperties = parseControlCustomProperties(
      customPropertiesXml
    );
  }
  return control;
}

function parseControlCustomProperties(propertiesXml: string): any {
  const parser = new DOMParser();
  const doc = parser.parseFromString(propertiesXml, "application/xml");
  const propsElements = Array.from(doc.querySelectorAll("Property"));
  return propsElements.reduce((acc, item) => {
    acc[item.querySelector("Name").innerHTML] = item.querySelector(
      "Value"
    ).innerHTML;
    return acc;
  }, {});
}

function fixArrayProperty<T>(rawValue: any): T[] {
  return rawValue ? (Array.isArray(rawValue) ? rawValue : [rawValue]) : [];
}

function inferChildControlType(parent: any): string {
  for (const type of controlTypesList) {
    if (parent[type]) {
      return type;
    }
  }
}

export const transform = transformModel;
