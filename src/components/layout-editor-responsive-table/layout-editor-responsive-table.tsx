import { Component, Element, Prop, h } from "@stencil/core";
import {
  IResolverContext,
  controlResolver,
  getControlName,
  getControlTypeName,
  isCellSelected
} from "../layout-editor/layout-editor-control-resolver";

@Component({
  shadow: false,
  styleUrl: "layout-editor-responsive-table.scss",
  tag: "gx-le-responsive-table"
})
export class LayoutEditorResponsiveTable {
  @Element() element: HTMLElement;

  @Prop() context: IResolverContext;
  @Prop() model: GeneXusAbstractLayout.Cell;

  render() {
    const table = this.model.table;
    this.element.setAttribute("data-gx-le-control-id", table["@id"]);

    return responsiveTableResolver(table, this.context);
  }
}

function responsiveTableResolver(table, context: IResolverContext) {
  const modelRows = table.row
    ? Array.isArray(table.row)
      ? table.row
      : [table.row]
    : [];

  const isEmptyTable = modelRows.length === 0;
  const nonEmptyRows = modelRows.filter(
    r => (Array.isArray(r.cell) && r.cell.length) || r.cell
  );

  const rows = nonEmptyRows.map(row => {
    const rowCells = Array.isArray(row.cell) ? row.cell : [row.cell];

    const renderedCells = rowCells.map(cell => {
      return renderCell(cell, row["@id"], context);
    });

    return (
      <div data-gx-le-responsive-table-row style={getRowStyle()}>
        {renderedCells}
      </div>
    );
  });

  const emptyRowFn = i => {
    const nextRow = nonEmptyRows[i];
    return (
      <gx-layout-editor-placeholder
        data-gx-le-placeholder="row"
        data-gx-le-next-row-id={nextRow ? nextRow["@id"] : ""}
      />
    );
  };
  const rowsAndPlaceholders = rows.reduce(
    (acc, o, i) => (o ? acc.concat(o, emptyRowFn(i + 1)) : acc),
    [emptyRowFn(0)]
  );

  return (
    <div
      data-gx-le-container
      data-gx-le-container-empty={isEmptyTable.toString()}
      data-gx-le-responsive-table
      style={getTableStyle()}
    >
      {rowsAndPlaceholders}
    </div>
  );
}

function getTableStyle(): any {
  return {
    display: "flex",
    "flex-direction": "column",
    "flex-wrap": "nowrap"
  };
}

function getRowStyle(): any {
  return {
    display: "flex",
    "flex-direction": "row",
    "flex-grow": 1,
    "flex-wrap": "nowrap"
  };
}

function renderCell(cell, rowId, context) {
  return (
    <div
      tabindex="0"
      key={cell["@id"]}
      data-gx-le-cell-id={cell["@id"]}
      data-gx-le-drop-area="horizontal"
      data-gx-le-row-id={rowId}
      data-gx-le-selected={isCellSelected(cell, context).toString()}
      data-gx-le-responsive-table-cell
      data-gx-le-control-type-name={getControlTypeName(cell)}
      data-gx-le-control-name={getControlName(cell)}
      style={getCellStyle(cell)}
    >
      {controlResolver(cell, context)}
    </div>
  );
}

function getCellStyle(cell) {
  return {
    "--gx-le-control-type-name": cell.controlType && `"${cell.controlType}"`,
    display: "flex",
    "flex-grow": "1"
  };
}
