import { CssGridLayout } from "./css-grid-layout";

describe("css-grid-layout", () => {
  it("create empty", () => {
    const grid = new CssGridLayout<string>();

    expect(grid.getRowCount()).toBe(1);
    expect(grid.getColumnCount()).toBe(1);
    expect(grid.get(1, 1)).toBe(undefined);
  });

  it("create 4x3", () => {
    const grid = new CssGridLayout<string>(4, 3);

    expect(grid.getRowCount()).toBe(4);
    expect(grid.getColumnCount()).toBe(3);
  });

  it("set and get", () => {
    const grid = new CssGridLayout<string>(4, 3);

    grid.set("A", 1, 1);
    grid.set("B", 2, 2);
    grid.set("C", 3, 3);
    grid.set("D", 4, 1);
    grid.set("E", 1, 2);
    grid.set("F", 2, 3);
    grid.set("G", 3, 1);
    grid.set("H", 4, 2);
    grid.set("I", 1, 3);
    grid.set("J", 2, 1);
    grid.set("K", 3, 2);
    grid.set("L", 4, 3);

    expect(grid.get(1, 1)).toBe("A");
    expect(grid.get(2, 2)).toBe("B");
    expect(grid.get(3, 3)).toBe("C");
    expect(grid.get(4, 1)).toBe("D");
    expect(grid.get(1, 2)).toBe("E");
    expect(grid.get(2, 3)).toBe("F");
    expect(grid.get(3, 1)).toBe("G");
    expect(grid.get(4, 2)).toBe("H");
    expect(grid.get(1, 3)).toBe("I");
    expect(grid.get(2, 1)).toBe("J");
    expect(grid.get(3, 2)).toBe("K");
    expect(grid.get(4, 3)).toBe("L");
  });

  it("addToRow & toString", () => {
    const grid = new CssGridLayout<string>();

    grid.addToRow("A", 1, 2, 2);
    grid.addToRow("B", 1, 1, 1);
    grid.addToRow("C", 1, 1, 1);
    grid.addToRow("D", 2, 1, 2);
    grid.addToRow("E", 3, 2, 3);
    grid.addToRow("F", 3, 1, 1);

    expect(grid.getRowCount()).toBe(4);
    expect(grid.getColumnCount()).toBe(4);
    expect(grid.toString()).toBe('"A A B C"\n"A A D D"\n"E E E F"\n"E E E ."');
  });

  it("isMergedRows", () => {
    const grid = new CssGridLayout<string>();

    grid.addToRow("A", 1, 2, 2);
    grid.addToRow("B", 1, 1, 1);
    grid.addToRow("C", 1, 1, 1);
    grid.addToRow("D", 2, 1, 2);
    grid.addToRow("E", 3, 2, 3);
    grid.addToRow("F", 3, 1, 1);

    expect(grid.isMergedRows(1, 2, 1)).toBe(true);
    expect(grid.isMergedRows(1, 2, 2)).toBe(true);
    expect(grid.isMergedRows(1, 2, 3)).toBe(false);
    expect(grid.isMergedRows(1, 2, 4)).toBe(false);
    expect(grid.isMergedRows(2, 2, 1)).toBe(false);
    expect(grid.isMergedRows(2, 2, 2)).toBe(false);
    expect(grid.isMergedRows(2, 2, 3)).toBe(false);
    expect(grid.isMergedRows(2, 2, 4)).toBe(false);
    expect(grid.isMergedRows(3, 2, 1)).toBe(true);
    expect(grid.isMergedRows(3, 2, 2)).toBe(true);
    expect(grid.isMergedRows(3, 2, 3)).toBe(true);
    expect(grid.isMergedRows(3, 2, 4)).toBe(false);
  });

  it("isMergedRowsOnColumnRange", () => {
    const grid = new CssGridLayout<string>();

    grid.set("A", 1, 1, 2, 2);
    grid.set("B", 1, 3, 2, 2);
    grid.set("C", 3, 2, 2, 1);
    grid.set("D", 3, 4, 2, 1);

    expect(grid.isMergedRowsOnColumnRange(1, 2, 1, 2)).toBe(true);
    expect(grid.isMergedRowsOnColumnRange(1, 2, 3, 2)).toBe(true);
    expect(grid.isMergedRowsOnColumnRange(1, 2, 1, 4)).toBe(true);
    expect(grid.isMergedRowsOnColumnRange(1, 2, 1, 1)).toBe(true);
    expect(grid.isMergedRowsOnColumnRange(1, 2, 4, 1)).toBe(true);

    expect(grid.isMergedRowsOnColumnRange(3, 2, 1, 1)).toBe(false);
    expect(grid.isMergedRowsOnColumnRange(3, 2, 2, 1)).toBe(true);
    expect(grid.isMergedRowsOnColumnRange(3, 2, 3, 1)).toBe(false);
    expect(grid.isMergedRowsOnColumnRange(3, 2, 4, 1)).toBe(true);
    expect(grid.isMergedRowsOnColumnRange(3, 1, 1, 4)).toBe(false);
  });

  it("insertRow & toString", () => {
    const grid = new CssGridLayout<string>();

    grid.set("A", 1, 1, 2, 2);
    grid.set("B", 1, 3, 2, 2);
    grid.set("C", 3, 2, 2, 1);
    grid.set("D", 3, 4, 2, 1);
    expect(grid.toString()).toBe('"A A B B"\n"A A B B"\n". C . D"\n". C . D"');

    grid.insertRow(1);
    expect(grid.toString()).toBe(
      '". . . ."\n"A A B B"\n"A A B B"\n". C . D"\n". C . D"'
    );

    grid.insertRow(6);
    expect(grid.toString()).toBe(
      '". . . ."\n"A A B B"\n"A A B B"\n". C . D"\n". C . D"\n". . . ."'
    );

    grid.insertRow(4);
    expect(grid.toString()).toBe(
      '". . . ."\n"A A B B"\n"A A B B"\n". . . ."\n". C . D"\n". C . D"\n". . . ."'
    );

    grid.insertRow(3);
    expect(grid.toString()).toBe(
      '". . . ."\n"A A B B"\n"A A B B"\n"A A B B"\n". . . ."\n". C . D"\n". C . D"\n". . . ."'
    );

    grid.insertRow(7);
    expect(grid.toString()).toBe(
      '". . . ."\n"A A B B"\n"A A B B"\n"A A B B"\n". . . ."\n". C . D"\n". C . D"\n". C . D"\n". . . ."'
    );

    expect(grid.getRowCount()).toBe(9);
    expect(grid.getColumnCount()).toBe(4);
  });

  it("getCssGridAreaValue", () => {
    const grid = new CssGridLayout<string>();

    grid.set("A", 1, 1, 2, 2);
    grid.set("B", 1, 3, 1, 1);
    grid.set("C", 1, 4, 1, 1);
    grid.set("D", 2, 3, 1, 2);
    grid.set("E", 3, 2, 2, 1);
    grid.set("F", 3, 4, 1, 1);

    expect(grid.getCssGridAreaValue("A")).toBe("1 / 1 / span 2 / span 2");
    expect(grid.getCssGridAreaValue("B")).toBe("1 / 3 / span 1 / span 1");
    expect(grid.getCssGridAreaValue("C")).toBe("1 / 4 / span 1 / span 1");
    expect(grid.getCssGridAreaValue("D")).toBe("2 / 3 / span 1 / span 2");
    expect(grid.getCssGridAreaValue("E")).toBe("3 / 2 / span 2 / span 1");
    expect(grid.getCssGridAreaValue("F")).toBe("3 / 4 / span 1 / span 1");
  });

  it("getEmptyAreasOfRow", () => {
    const grid = new CssGridLayout<string>();

    grid.set("A", 1, 1, 1, 4);
    expect(grid.getEmptyAreasOfRow(1)).toEqual(expect.arrayContaining([]));

    grid.insertRow(2);
    expect(grid.getEmptyAreasOfRow(2)).toEqual(
      expect.arrayContaining([{ row: 2, rowSpan: 1, column: 1, columnSpan: 4 }])
    );

    grid.set("B", 3, 1, 1, 1);
    expect(grid.getEmptyAreasOfRow(3)).toEqual(
      expect.arrayContaining([{ row: 3, rowSpan: 1, column: 2, columnSpan: 3 }])
    );

    grid.set("C", 4, 4, 1, 1);
    expect(grid.getEmptyAreasOfRow(4)).toEqual(
      expect.arrayContaining([{ row: 4, rowSpan: 1, column: 1, columnSpan: 3 }])
    );

    grid.set("D", 5, 1, 1, 1);
    grid.set("E", 5, 4, 1, 1);
    expect(grid.getEmptyAreasOfRow(5)).toEqual(
      expect.arrayContaining([{ row: 5, rowSpan: 1, column: 2, columnSpan: 2 }])
    );

    grid.set("F", 6, 2, 1, 1);
    grid.set("G", 6, 3, 1, 1);
    expect(grid.getEmptyAreasOfRow(6)).toEqual(
      expect.arrayContaining([
        { row: 6, rowSpan: 1, column: 1, columnSpan: 1 },
        { row: 6, rowSpan: 1, column: 4, columnSpan: 1 }
      ])
    );

    grid.set("H", 7, 1, 1, 1);
    grid.set("I", 7, 3, 1, 1);
    expect(grid.getEmptyAreasOfRow(7)).toEqual(
      expect.arrayContaining([
        { row: 7, rowSpan: 1, column: 2, columnSpan: 1 },
        { row: 7, rowSpan: 1, column: 4, columnSpan: 1 }
      ])
    );

    grid.set("J", 8, 2, 1, 1);
    grid.set("K", 8, 4, 1, 1);
    expect(grid.getEmptyAreasOfRow(8)).toEqual(
      expect.arrayContaining([
        { row: 8, rowSpan: 1, column: 1, columnSpan: 1 },
        { row: 8, rowSpan: 1, column: 3, columnSpan: 1 }
      ])
    );

    grid.set("L", 9, 1, 1, 1);
    grid.set("M", 9, 2, 1, 3);
    expect(grid.getEmptyAreasOfRow(8)).toEqual(expect.arrayContaining([]));
  });
});
