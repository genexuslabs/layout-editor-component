import { Component, Element, Host, Prop, h } from "@stencil/core";
import {
  IResolverContext,
  controlResolver,
  getCellCommonAttrs,
  getControlCommonAttrs
} from "../layout-editor/layout-editor-control-resolver";

@Component({
  shadow: false,
  styleUrl: "layout-editor-flex-table.scss",
  tag: "gx-le-flex-table"
})
export class LayoutEditorFlexTable {
  @Element() element: HTMLElement;

  @Prop() context: IResolverContext;
  @Prop() model: GeneXusAbstractLayout.Cell;

  render() {
    const { table } = this.model;

    return (
      <Host {...getControlCommonAttrs(this.model)}>
        {flexTableResolver(table, this.context)}
      </Host>
    );
  }
}

function flexTableResolver(table, context: IResolverContext) {
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
      return renderCell(cell, row["@id"], context, table["@flexDirection"]);
    });

    return renderedCells;
  });

  return (
    <div
      style={getTableStyle(table)}
      data-gx-le-container
      data-gx-le-container-empty={isEmptyTable.toString()}
      data-gx-le-flex-table
      data-gx-le-flex-table-direction={table["@flexDirection"].toLowerCase()}
    >
      {rows.length ? (
        rows
      ) : (
        <gx-layout-editor-placeholder data-gx-le-placeholder="row" />
      )}
    </div>
  );
}

function getTableStyle(table): any {
  return {
    "align-items": table["@alignItems"],
    display: "flex",
    "flex-direction": table["@flexDirection"],
    "flex-wrap": table["@flexWrap"],
    "justify-content": table["@justifyContent"]
  };
}

function renderCell(cell, rowId, context, direction) {
  const editorCellStyle = {
    "--gx-le-control-type-name": cell.controlType && `"${cell.controlType}"`,
    "align-self": cell["@alignSelf"],
    "flex-grow": cell["@flexGrow"],
    "flex-shrink": cell["@flexShrink"],
    height: cell["@flexHeight"],
    "max-height": cell["@maxHeight"],
    "max-width": cell["@maxWidth"],
    "min-height": cell["@minHeight"],
    "min-width": cell["@minWidth"],
    width: cell["@flexWidth"]
  };

  return (
    <div
      {...getCellCommonAttrs(cell, context)}
      data-gx-le-row-id={rowId}
      data-gx-le-drop-area={direction === "Column" ? "vertical" : "horizontal"}
      data-gx-flex-cell
      tabindex="0"
      style={editorCellStyle}
    >
      {controlResolver(cell, context)}
    </div>
  );
}
