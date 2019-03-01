import { controlsDefinition } from "../common/controls";

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
    ...transformContainer(rawLayout, childControlType)
  };
}

function transformContainer(
  rawContainer: GeneXusAbstractLayout.IContainer,
  childControlType: string
): GeneXusAbstractLayout.IContainer {
  const transformControlFn = getTransformFunctionByType(childControlType);

  return {
    childControlType,
    controlType: childControlType,
    [childControlType]: transformControlFn(rawContainer[childControlType])
  };
}

function getTransformFunctionByType(
  type: string
): (control: GeneXusAbstractLayout.IControl) => GeneXusAbstractLayout.IControl {
  const definition = controlsTransforms[type];

  if (!definition) {
    return transformControl;
  } else {
    return (
      control: GeneXusAbstractLayout.IControl
    ): GeneXusAbstractLayout.IControl =>
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
  const childControlType = inferChildControlType(rawCell);

  return {
    ...rawCell,
    ...transformContainer(rawCell, childControlType)
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

function transformControl(
  control: GeneXusAbstractLayout.IControl
): GeneXusAbstractLayout.IControl {
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

const controlsTransforms = {
  table: {
    transformFn: transformTable
  },
  ucw: {
    transformFn: transformUserControl
  }
};

const controlTypesList = controlsDefinition.map(def => def.type);

export const transform = transformModel;
