import {
  fixArrayProperty,
  inferChildControlType,
  transformContainer
} from "./transform";

export function transformTable(
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
