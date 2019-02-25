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
  const transformControl = getTransformFunctionByType(childControlType);

  return {
    childControlType,
    controlType: childControlType,
    [childControlType]: transformControl(rawContainer[childControlType])
  };
}

function getTransformFunctionByType(
  type: string
): (control: GeneXusAbstractLayout.IControl) => GeneXusAbstractLayout.IControl {
  const definition = controlTypes[type];
  if (!definition) {
    return x => x;
  }
  return definition.transformFn;
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

const controlTypes = {
  action: {
    transformFn: x => x
  },
  component: {
    transformFn: x => x
  },
  data: {
    transformFn: x => x
  },
  grid: {
    transformFn: x => x
  },
  horizontalrule: {
    transformFn: x => x
  },
  hyperlink: {
    transformFn: x => x
  },
  image: {
    transformFn: x => x
  },
  section: {
    transformFn: x => x
  },
  simplegrid: {
    transformFn: x => x
  },
  table: {
    transformFn: transformTable
  },
  textblock: {
    transformFn: x => x
  }
};

const controlTypesList = Object.keys(controlTypes);

export const transform = transformModel;
