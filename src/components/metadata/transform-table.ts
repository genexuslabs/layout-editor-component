import {
  fixArrayProperty,
  inferChildControlType,
  transformContainer
} from "./transform";

export function transformTable(
  rawTable: GeneXusAbstractLayout.Table,
  nestingLevel: number
): GeneXusAbstractLayout.Table {
  const row = fixArrayProperty(rawTable.row);

  return {
    ...rawTable,
    row: row.map((rawRow: GeneXusAbstractLayout.Row) =>
      transformRow(rawRow, nestingLevel)
    )
  };
}

function transformRow(
  rawRow: GeneXusAbstractLayout.Row,
  nestingLevel: number
): GeneXusAbstractLayout.Row {
  const cell = fixArrayProperty(rawRow.cell);
  return {
    ...rawRow,
    cell: cell.map((rawCell: GeneXusAbstractLayout.Cell) =>
      transformCell(rawCell, nestingLevel)
    )
  };
}

function transformCell(
  rawCell: GeneXusAbstractLayout.Cell,
  nestingLevel: number
): GeneXusAbstractLayout.Cell {
  const childControlType = rawCell.childControlType
    ? rawCell.childControlType
    : inferChildControlType(rawCell);
  const container = childControlType
    ? transformContainer(rawCell, childControlType, nestingLevel + 1)
    : null;

  return {
    ...rawCell,
    ...container
  };
}
