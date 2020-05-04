import { Array2d } from "./array2d";

export class CssGridLayout<T> {
  private grid: Array2d<T>;

  constructor(rows?: number, columns?: number) {
    this.grid = new Array2d(rows, columns);
  }

  getRowCount(): number {
    return this.grid.getRowCount();
  }

  getColumnCount(): number {
    return this.grid.getColumnCount();
  }

  get(row: number, column: number): T {
    return this.grid.getValue(row - 1, column - 1);
  }

  set(value: T, row: number, column: number, rowSpan = 1, colSpan = 1) {
    if (row + rowSpan - 1 > this.getRowCount()) {
      this.grid.resizeRows(row + rowSpan - 1);
    }
    if (column + colSpan - 1 > this.getColumnCount()) {
      this.grid.resizeColumns(column + colSpan - 1);
    }

    for (let i = row; i < row + rowSpan; i++) {
      this.grid.fillRow(value, i - 1, column - 1, column - 1 + colSpan);
    }
  }

  addToRow(value: T, row: number, rowSpan = 1, colSpan = 1) {
    if (row + rowSpan - 1 > this.getRowCount()) {
      this.grid.resizeRows(row + rowSpan - 1);
    }

    let column;
    const emptyAreasOfRow = this.getEmptyAreasOfRow(row);
    if (emptyAreasOfRow.length === 0) {
      column = this.getColumnCount() + 1;
    } else {
      column = emptyAreasOfRow[0].column;
    }

    this.set(value, row, column, rowSpan, colSpan);
  }

  isMergedRows(row: number, rowSpan: number, column: number): boolean {
    const value = this.get(row, column);
    let isMerged = true;

    if (value) {
      for (let i = row + 1; i < row + rowSpan; i++) {
        if (value !== this.get(i, column)) {
          isMerged = false;
          break;
        }
      }
    } else {
      isMerged = false;
    }

    return isMerged;
  }

  isMergedRowsOnColumnRange(
    row: number,
    rowSpan: number,
    column: number,
    columnSpan: number
  ): boolean {
    let isMerged = false;

    for (let iColumn = column; iColumn < column + columnSpan; iColumn++) {
      isMerged = this.isMergedRows(row, rowSpan, iColumn);
      if (!isMerged) break;
    }

    return isMerged;
  }

  insertRow(position: number) {
    this.grid.insertRow(position - 1);

    if (position !== 1 && position !== this.grid.getRowCount()) {
      for (let i = 1; i <= this.getColumnCount(); i++) {
        if (this.get(position - 1, i) === this.get(position + 1, i)) {
          this.set(this.get(position - 1, i), position, i);
        }
      }
    }
  }

  getEmptyAreasOfRow(row: number): CssGridLayoutArea[] {
    const emptyAreasRow: CssGridLayoutArea[] = [];
    let i = 1;

    while (i <= this.getColumnCount()) {
      const columnStart = this.getEmptyColumnPosition(row, i);

      if (columnStart) {
        const columnEnd = this.getEmptyColumnLastPosition(row, columnStart);
        const area: CssGridLayoutArea = {
          row,
          rowSpan: 1,
          column: columnStart,
          columnSpan: columnEnd - columnStart + 1
        };
        emptyAreasRow.push(area);

        i = columnEnd + 1;
      } else {
        break;
      }
    }

    return emptyAreasRow;
  }

  getCssGridAreaValue(value: T): string {
    const area = this.getAreaOf(value);

    if (area) {
      return `${area.row} / ${area.column} / span ${area.rowSpan} / span ${area.columnSpan}`;
    }
  }

  toString(emptyCell = "."): string {
    return `"${this.grid.toString('"\n"', " ", emptyCell)}"`;
  }

  private getEmptyColumnPosition(row: number, startPosition = 1): number {
    if (row <= this.getRowCount()) {
      for (let i = startPosition; i <= this.getColumnCount(); i++) {
        if (this.get(row, i) === undefined) {
          return i;
        }
      }
    }
  }

  private getEmptyColumnLastPosition(row: number, startPosition = 1): number {
    let position = 0;

    for (let i = startPosition; i <= this.grid.getColumnCount(); i++) {
      if (this.get(row, i) === undefined) {
        position = i;
      } else {
        break;
      }
    }

    return position;
  }

  private getStartPositionOf(value: T): CssGridLayoutPosition {
    let row: number, column: number;

    for (let i = 1; i <= this.getRowCount(); i++) {
      for (let j = 1; j <= this.getColumnCount(); j++) {
        if (this.get(i, j) === value) {
          row = i;
          column = j;
          break;
        }
      }
      if (row && column) {
        break;
      }
    }

    if (row && column) {
      return { row, column };
    }
  }

  private getEndPositionOf(value: T): CssGridLayoutPosition {
    let row: number, column: number;

    for (let i = 1; i <= this.getRowCount(); i++) {
      for (let j = 1; j <= this.getColumnCount(); j++) {
        if (this.get(i, j) === value) {
          row = i;
          column = j;
        }
      }
    }

    if (row && column) {
      return { row, column };
    }
  }

  private getAreaOf(value: T): CssGridLayoutArea {
    const startPosition = this.getStartPositionOf(value);
    const endPosition = this.getEndPositionOf(value);

    if (startPosition && endPosition) {
      return {
        row: startPosition.row,
        rowSpan: endPosition.row - startPosition.row + 1,
        column: startPosition.column,
        columnSpan: endPosition.column - startPosition.column + 1
      };
    }
  }
}

interface CssGridLayoutPosition {
  row: number;
  column: number;
}

export interface CssGridLayoutArea {
  row: number;
  rowSpan: number;
  column: number;
  columnSpan: number;
}
