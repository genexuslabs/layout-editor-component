import { Component, Element, Prop } from "@stencil/core";
import {
  IResolverContext,
  controlResolver,
  isCellSelected
} from "../layout-editor/layout-editor-control-resolver";

@Component({
  shadow: false,
  styleUrl: "layout-editor-canvas-table.scss",
  tag: "gx-le-canvas-table"
})
export class LayoutEditorCanvasTable {
  @Element() element: HTMLElement;

  @Prop() context: IResolverContext;
  @Prop() model: GeneXusAbstractLayout.Cell;

  render() {
    return canvasTableResolver(this.model.table, this.context);
  }
}

function canvasTableResolver(table, context: IResolverContext) {
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
      data-gx-le-control-id={table["@id"]}
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
  const editorCellStyle = {
    "--gx-le-control-type-name": cell.controlType && `"${cell.controlType}"`
  };

  return (
    <gx-canvas-cell
      tabindex="0"
      key={cell["@id"]}
      data-gx-le-drop-area="vertical"
      data-gx-le-cell-id={cell["@id"]}
      data-gx-le-row-id={rowId}
      style={editorCellStyle}
      data-gx-le-selected={isCellSelected(cell, context).toString()}
    >
      {controlResolver(cell, context)}
    </gx-canvas-cell>
  );
}
