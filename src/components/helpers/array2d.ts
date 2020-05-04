export class Array2d<T> {
  private array2d: Array<Array<T>> = [[]];

  constructor(rows = 1, columns = 1) {
    for (let i = 0; i < rows; i++) {
      this.array2d[i] = new Array<T>(columns).fill(undefined);
    }
  }

  getRowCount(): number {
    return this.array2d.length;
  }

  getColumnCount(): number {
    return this.array2d[0].length;
  }

  resize(rows: number, columns: number) {
    this.resizeRows(rows);
    this.resizeColumns(columns);
  }

  resizeRows(rows: number) {
    const diff = rows - this.getRowCount();

    for (let i = 0; i < diff; i++) {
      this.insertRow();
    }
    for (let i = 0; i > diff; i--) {
      this.removeRow();
    }
  }

  resizeColumns(columns: number) {
    const diff = columns - this.getColumnCount();

    for (let i = 0; i < diff; i++) {
      this.insertColumn();
    }
    for (let i = 0; i > diff; i--) {
      this.removeColumn();
    }
  }

  getValue(row: number, column: number): T {
    return this.array2d[row][column];
  }

  setValue(value: T, row: number, column: number) {
    this.array2d[row][column] = value;
  }

  fill(value: T) {
    this.array2d.forEach(row => {
      row.fill(value);
    });
  }

  fillRow(value: T, row: number, start?: number, end?: number) {
    this.array2d[row].fill(value, start, end);
  }

  fillColumn(value: T, column: number, start = 0, end = this.array2d.length) {
    for (let i = start; i < end; i++) {
      this.array2d[i][column] = value;
    }
  }

  insertRow(index = this.getRowCount()) {
    this.array2d.splice(
      index,
      0,
      new Array<T>(this.getColumnCount()).fill(undefined)
    );
  }

  removeRow(index = this.getRowCount() - 1) {
    this.array2d.splice(index, 1);
  }

  insertColumn(index = this.getColumnCount()) {
    for (const row of this.array2d) {
      row.splice(index, 0, undefined);
    }
  }

  removeColumn(index = this.getColumnCount() - 1) {
    for (const row of this.array2d) {
      row.splice(index, 1);
    }
  }

  toString(
    rowSeparator = "\n",
    columnSeparator?: string,
    emptyCell = " "
  ): string {
    return this.array2d
      .map(row => row.map(cell => cell || emptyCell).join(columnSeparator))
      .join(rowSeparator);
  }
}
