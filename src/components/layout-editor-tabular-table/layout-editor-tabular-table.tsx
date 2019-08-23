import { Component, Element, Host, Prop, h } from "@stencil/core";
import {
  IResolverContext,
  controlResolver,
  getCellCommonAttrs,
  getControlCommonAttrs
} from "../layout-editor/layout-editor-control-resolver";

@Component({
  shadow: false,
  styleUrl: "layout-editor-tabular-table.scss",
  tag: "gx-le-tabular-table"
})
export class LayoutEditorTabularTable {
  @Element() element: HTMLElement;

  @Prop() context: IResolverContext;
  @Prop() model: GeneXusAbstractLayout.Cell;

  render() {
    const { table } = this.model;

    return (
      <Host {...getControlCommonAttrs(this.model)}>
        {tabularTableResolver(table, this.context)}
      </Host>
    );
  }
}

function tabularTableResolver(table, context: IResolverContext) {
  const modelRows: GeneXusAbstractLayout.Row[] = table.row
    ? Array.isArray(table.row)
      ? table.row
      : [table.row]
    : [];

  const isEmptyTable = modelRows.length === 0;
  const nonEmptyRows = modelRows.filter(
    r => (Array.isArray(r.cell) && r.cell.length) || r.cell
  );

  const maxCols = nonEmptyRows.reduce(
    (acc, row) => Math.max(acc, Array.isArray(row.cell) ? row.cell.length : 1),
    0
  );

  const rowsCount = nonEmptyRows.length;

  let rowPlaceholdersToRender: IPlaceholderRow[] = [];

  const rows = nonEmptyRows.map((row, i) => {
    const rowCells: GeneXusAbstractLayout.Cell[] = Array.isArray(row.cell)
      ? row.cell
      : [row.cell];

    const nextRow = nonEmptyRows.length > i ? nonEmptyRows[i + 1] : null;
    const isLastRow = !nextRow;

    let colStart = 0;
    const renderedCells = rowCells.map((cell, j) => {
      const previousCell = rowCells[j - 1];
      const previousCellColSpan = previousCell
        ? getCellColSpan(previousCell)
        : 1;
      colStart += previousCellColSpan;

      if (!isLastRow) {
        rowPlaceholdersToRender.push({
          colSpan: getCellColSpan(cell),
          colStart,
          nextRow,
          rowSpan: 1,
          rowStart: (i + getCellRowSpan(cell)) * 2 + 1
        });
      }

      return renderCell(cell, row["@id"], i, context);
    });
    return renderedCells;
  });

  rowPlaceholdersToRender = [
    {
      colSpan: maxCols,
      colStart: 1,
      nextRow: nonEmptyRows[0],
      rowSpan: 1,
      rowStart: 1
    },
    ...mergeContiguousPlaceholders(rowPlaceholdersToRender),
    {
      colSpan: maxCols,
      colStart: 1,
      nextRow: null,
      rowSpan: 1,
      rowStart: nonEmptyRows.length * 2 + 1
    }
  ];

  return (
    <gx-table
      {...getTableStyle(rowsCount, maxCols)}
      data-gx-le-container
      data-gx-le-container-empty={isEmptyTable.toString()}
    >
      {[...rows, ...renderEmptyRows(rowPlaceholdersToRender)]}
    </gx-table>
  );
}

function mergeContiguousPlaceholders(placeholderRows: IPlaceholderRow[]) {
  return placeholderRows
    .sort((a, b) => {
      if (a.rowStart === b.rowStart) {
        return a.colStart - b.colStart;
      }
      return a.rowStart - b.rowStart;
    })
    .reduce((acc: IPlaceholderRow[], placeholder: IPlaceholderRow) => {
      if (acc.length) {
        const previous = acc[acc.length - 1];
        if (previous.rowStart === placeholder.rowStart) {
          if (previous.colStart + previous.colSpan === placeholder.colStart) {
            previous.colSpan += placeholder.colSpan;
            return acc;
          }
        }
      }
      return acc.concat(placeholder);
    }, []);
}

function getTableStyle(rowsCount, colsCount) {
  const baseRowsTemplate = new Array(rowsCount).fill("auto", 0, rowsCount);
  const baseColsTemplate = new Array(colsCount).fill("1fr", 0, colsCount);

  return {
    "columns-template": baseColsTemplate.join(" "),
    "rows-template": intercalateArray(
      baseRowsTemplate,
      "var(--gx-le-table-cell-gap)"
    ).join(" ")
  };
}

function renderEmptyRows(rowPlaceholdersToRender: IPlaceholderRow[]) {
  return rowPlaceholdersToRender.map(
    ({ nextRow, colSpan, rowStart, rowSpan }: IPlaceholderRow) => {
      const emptyCellStyle = {
        "grid-column": `span ${colSpan}`,
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

function renderCell(cell, rowId, rowIndex, context) {
  const rowSpan = (getCellRowSpan(cell) - 1) * 2 + 1;
  const colSpan = getCellColSpan(cell);
  const rowStart = (rowIndex + 1) * 2;

  return (
    <gx-table-cell
      {...getCellCommonAttrs(cell, context)}
      data-gx-le-row-id={rowId}
      data-gx-le-drop-area="horizontal"
      tabindex="0"
      style={{
        "--gx-le-control-type-name":
          cell.controlType && `"${cell.controlType}"`,
        "grid-column": `span ${colSpan}`,
        "grid-row": ` ${rowStart} / span ${rowSpan}`
      }}
    >
      {controlResolver(cell, context)}
    </gx-table-cell>
  );
}

function intercalateArray(arr, item): any[] {
  return arr.reduce((acc, o) => (o ? acc.concat(o, item) : acc), [item]);
}

function getCellRowSpan(cell): number {
  return parseInt(cell["@rowSpan"] || "1", 10);
}

function getCellColSpan(cell): number {
  return parseInt(cell["@colSpan"] || "1", 10);
}

interface IPlaceholderRow {
  colStart: number;
  colSpan: number;
  rowStart: number;
  rowSpan: number;
  nextRow: GeneXusAbstractLayout.Row;
}
