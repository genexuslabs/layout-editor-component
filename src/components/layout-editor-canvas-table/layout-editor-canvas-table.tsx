import { Component, Element, Host, Prop, h } from "@stencil/core";
import {
  ResolverContext,
  controlResolver,
  getCellCommonAttrs,
  getControlCommonAttrs,
  getControlWrapperCommonAttrs
} from "../layout-editor/layout-editor-control-resolver";

@Component({
  shadow: false,
  styleUrl: "layout-editor-canvas-table.scss",
  tag: "gx-le-canvas-table"
})
export class LayoutEditorCanvasTable {
  @Element() element: HTMLElement;

  @Prop() context: ResolverContext;
  @Prop() model: GeneXusAbstractLayout.Cell;

  render() {
    const { table } = this.model;

    return (
      <Host {...getControlWrapperCommonAttrs(this.model)}>
        {canvasTableResolver(table, this.context)}
      </Host>
    );
  }
}

function canvasTableResolver(table, context: ResolverContext) {
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

    return renderedCells;
  });

  return (
    <gx-canvas
      {...getControlCommonAttrs(table)}
      data-gx-le-container
      data-gx-le-container-empty={isEmptyTable.toString()}
    >
      {rows.length ? (
        rows
      ) : (
        <gx-layout-editor-placeholder data-gx-le-placeholder="row" />
      )}
    </gx-canvas>
  );
}

function renderCell(cell, rowId, context) {
  return (
    <gx-canvas-cell
      {...getCellCommonAttrs(cell)}
      data-gx-le-row-id={rowId}
      data-gx-le-drop-area="vertical"
      tabindex="0"
    >
      {controlResolver(cell, context)}
    </gx-canvas-cell>
  );
}
