import { Component, Element, Host, Prop, h } from "@stencil/core";
import {
  ResolverContext,
  controlResolver,
  getCellCommonAttrs,
  getControlCommonAttrs,
  getControlWrapperCommonAttrs
} from "../layout-editor/layout-editor-control-resolver";

import { CssGridLayout } from "../helpers/css-grid-layout";

@Component({
  shadow: false,
  styleUrl: "layout-editor-tabular-table.scss",
  tag: "gx-le-tabular-table"
})
export class LayoutEditorTabularTable {
  @Element() element: HTMLElement;
  @Prop() context: ResolverContext;
  @Prop() model: GeneXusAbstractLayout.Cell;

  render() {
    const { table } = this.model;

    return (
      <Host {...getControlWrapperCommonAttrs(this.model)}>
        {this.tabularTableResolver(table, this.context)}
      </Host>
    );
  }

  private tabularTableResolver(
    table: GeneXusAbstractLayout.Table,
    context: ResolverContext
  ) {
    const grid = new CssGridLayout<string>();
    const rowPlaceholdersToRender: PlaceholderRow[] = [];
    const cells = [];

    // load CSSGridLayout with cells
    table.row.forEach((row, rowIndex) => {
      row.cell.forEach(cell => {
        grid.addToRow(
          cell["@id"],
          rowIndex + 1,
          this.getCellRowSpan(cell),
          this.getCellColSpan(cell)
        );
      });
    });

    if (this.isEmptyGrid(grid)) {
      rowPlaceholdersToRender.push({
        colSpan: 1,
        colStart: 1,
        nextRow: null,
        rowSpan: 1,
        rowStart: 1
      });
    } else {
      // add to CSSGridLayout rows to horizontal placeholders
      for (let row = grid.getRowCount(); row >= 0; row--) {
        if (
          row === 0 ||
          row === grid.getRowCount() ||
          !grid.isMergedRowsOnColumnRange(row, 2, 1, grid.getColumnCount())
        ) {
          grid.insertRow(row + 1);
        }
      }

      // load list of rows placeholders to render
      for (let i = 1; i <= grid.getRowCount(); i += 2) {
        const emptyAreasOfRow = grid.getEmptyAreasOfRow(i);

        emptyAreasOfRow.forEach(emptyArea => {
          rowPlaceholdersToRender.push({
            colSpan: emptyArea.columnSpan,
            colStart: emptyArea.column,
            nextRow: table.row[(i + 1) / 2 - 1],
            rowSpan: emptyArea.rowSpan,
            rowStart: emptyArea.row
          });
        });
      }

      // load list of cells to render
      table.row.forEach(row => {
        row.cell.forEach(cell => {
          cells.push(this.renderCell(grid, cell, row["@id"], context));
        });
      });
    }

    // render
    return (
      <gx-table
        {...getControlCommonAttrs(table)}
        {...this.getTableStyle(grid)}
        data-gx-le-container
        data-gx-le-container-empty={this.isEmptyGrid(grid).toString()}
      >
        {[...cells, ...this.renderRowPlaceholders(rowPlaceholdersToRender)]}
      </gx-table>
    );
  }

  private renderCell(grid: CssGridLayout<string>, cell, rowId, context) {
    return (
      <gx-table-cell
        {...getCellCommonAttrs(cell)}
        data-gx-le-row-id={rowId}
        data-gx-le-drop-area="horizontal"
        tabindex="0"
        style={{ "grid-area": grid.getCssGridAreaValue(cell["@id"]) }}
      >
        {controlResolver(cell, context)}
      </gx-table-cell>
    );
  }

  private renderRowPlaceholders(rowPlaceholdersToRender: PlaceholderRow[]) {
    return rowPlaceholdersToRender.map(
      ({ nextRow, colStart, colSpan, rowStart, rowSpan }: PlaceholderRow) => {
        const emptyCellStyle = {
          "grid-column": `${colStart} / span ${colSpan}`,
          "grid-row": `${rowStart} / span ${rowSpan}`
        };
        return (
          <gx-layout-editor-placeholder
            data-gx-le-placeholder="row"
            style={emptyCellStyle}
            data-gx-le-next-row-id={nextRow ? nextRow["@id"] : ""}
          />
        );
      }
    );
  }

  private getTableStyle(grid: CssGridLayout<string>) {
    const baseRowsTemplate = Array.from(
      { length: grid.getRowCount() },
      (_, i) => (i % 2 === 0 ? "var(--gx-le-table-cell-gap)" : "auto")
    );
    const baseColsTemplate = new Array(grid.getColumnCount()).fill(
      "1fr",
      0,
      grid.getColumnCount()
    );

    return {
      "columns-template": baseColsTemplate.join(" "),
      "rows-template": baseRowsTemplate.join(" ")
    };
  }

  private getCellRowSpan(cell): number {
    return parseInt(cell["@rowSpan"] || "1", 10);
  }

  private getCellColSpan(cell): number {
    return parseInt(cell["@colSpan"] || "1", 10);
  }

  private isEmptyGrid(grid: CssGridLayout<string>): boolean {
    if (
      grid.getRowCount() === 1 &&
      grid.getColumnCount() === 1 &&
      grid.get(1, 1) === undefined
    ) {
      return true;
    } else {
      return false;
    }
  }
}

interface PlaceholderRow {
  colStart: number;
  colSpan: number;
  rowStart: number;
  rowSpan: number;
  nextRow: GeneXusAbstractLayout.Row;
}
