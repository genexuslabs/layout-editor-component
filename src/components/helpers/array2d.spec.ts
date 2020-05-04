import { Array2d } from "./array2d";

describe("array2d", () => {
  it("create empty", () => {
    const array2d = new Array2d<string>();

    expect(array2d.getRowCount()).toBe(1);
    expect(array2d.getColumnCount()).toBe(1);
    expect(array2d.getValue(0, 0)).toBe(undefined);
  });

  it("create 4x3", () => {
    const array2d = new Array2d<string>(4, 3);

    expect(array2d.getRowCount()).toBe(4);
    expect(array2d.getColumnCount()).toBe(3);
  });

  it("set and get", () => {
    const array2d = new Array2d<string>(4, 3);

    array2d.setValue("A", 0, 0);
    array2d.setValue("B", 1, 1);
    array2d.setValue("C", 2, 2);
    array2d.setValue("D", 3, 0);
    array2d.setValue("E", 0, 1);
    array2d.setValue("F", 1, 2);
    array2d.setValue("G", 2, 0);
    array2d.setValue("H", 3, 1);
    array2d.setValue("I", 0, 2);
    array2d.setValue("J", 1, 0);
    array2d.setValue("K", 2, 1);
    array2d.setValue("L", 3, 2);

    expect(array2d.getValue(0, 0)).toBe("A");
    expect(array2d.getValue(1, 1)).toBe("B");
    expect(array2d.getValue(2, 2)).toBe("C");
    expect(array2d.getValue(3, 0)).toBe("D");
    expect(array2d.getValue(0, 1)).toBe("E");
    expect(array2d.getValue(1, 2)).toBe("F");
    expect(array2d.getValue(2, 0)).toBe("G");
    expect(array2d.getValue(3, 1)).toBe("H");
    expect(array2d.getValue(0, 2)).toBe("I");
    expect(array2d.getValue(1, 0)).toBe("J");
    expect(array2d.getValue(2, 1)).toBe("K");
    expect(array2d.getValue(3, 2)).toBe("L");
  });

  it("fill & toString", () => {
    const array2d = new Array2d<string>(4, 3);

    array2d.fill("A");
    expect(array2d.toString(" ", "|")).toBe("A|A|A A|A|A A|A|A A|A|A");
  });

  it("fillRow & toString", () => {
    const array2d = new Array2d<string>(4, 3);

    array2d.fillRow("A", 0);
    expect(array2d.toString(" ", "|", ".")).toBe("A|A|A .|.|. .|.|. .|.|.");

    array2d.fillRow("B", 1, 0, 2);
    expect(array2d.toString(" ", "|", ".")).toBe("A|A|A B|B|. .|.|. .|.|.");

    array2d.fillRow("C", 1, 2, 3);
    expect(array2d.toString(" ", "|", ".")).toBe("A|A|A B|B|C .|.|. .|.|.");

    array2d.fillRow("D", 3, 0);
    expect(array2d.toString(" ", "|", ".")).toBe("A|A|A B|B|C .|.|. D|D|D");
  });

  it("fillColumn & toString", () => {
    const array2d = new Array2d<string>(4, 3);

    array2d.fillColumn("A", 0);
    expect(array2d.toString(" ", "|", ".")).toBe("A|.|. A|.|. A|.|. A|.|.");

    array2d.fillColumn("B", 1, 0, 3);
    expect(array2d.toString(" ", "|", ".")).toBe("A|B|. A|B|. A|B|. A|.|.");

    array2d.fillColumn("C", 1, 3, 4);
    expect(array2d.toString(" ", "|", ".")).toBe("A|B|. A|B|. A|B|. A|C|.");

    array2d.fillColumn("D", 2, 0);
    expect(array2d.toString(" ", "|", ".")).toBe("A|B|D A|B|D A|B|D A|C|D");
  });

  it("insertRow & removeRow & toString", () => {
    const array2d = new Array2d<string>(4, 3);

    array2d.fillRow("A", 0);
    array2d.fillRow("B", 1);
    array2d.fillRow("C", 2);
    array2d.fillRow("D", 3);
    expect(array2d.toString(" ", "|", ".")).toBe("A|A|A B|B|B C|C|C D|D|D");

    array2d.insertRow(0);
    expect(array2d.toString(" ", "|", ".")).toBe(
      ".|.|. A|A|A B|B|B C|C|C D|D|D"
    );

    array2d.insertRow();
    expect(array2d.toString(" ", "|", ".")).toBe(
      ".|.|. A|A|A B|B|B C|C|C D|D|D .|.|."
    );

    array2d.insertRow(2);
    expect(array2d.toString(" ", "|", ".")).toBe(
      ".|.|. A|A|A .|.|. B|B|B C|C|C D|D|D .|.|."
    );

    expect(array2d.getRowCount()).toBe(7);
    expect(array2d.getColumnCount()).toBe(3);

    array2d.removeRow(6);
    expect(array2d.toString(" ", "|", ".")).toBe(
      ".|.|. A|A|A .|.|. B|B|B C|C|C D|D|D"
    );

    array2d.removeRow(0);
    expect(array2d.toString(" ", "|", ".")).toBe(
      "A|A|A .|.|. B|B|B C|C|C D|D|D"
    );

    array2d.removeRow(1);
    expect(array2d.toString(" ", "|", ".")).toBe("A|A|A B|B|B C|C|C D|D|D");

    expect(array2d.getRowCount()).toBe(4);
    expect(array2d.getColumnCount()).toBe(3);
  });

  it("insertColumn & removeColumn & toString", () => {
    const array2d = new Array2d<string>(4, 3);

    array2d.fillColumn("A", 0);
    array2d.fillColumn("B", 1);
    array2d.fillColumn("C", 2);
    expect(array2d.toString(" ", "|", ".")).toBe("A|B|C A|B|C A|B|C A|B|C");

    array2d.insertColumn(0);
    expect(array2d.toString(" ", "|", ".")).toBe(
      ".|A|B|C .|A|B|C .|A|B|C .|A|B|C"
    );

    array2d.insertColumn();
    expect(array2d.toString(" ", "|", ".")).toBe(
      ".|A|B|C|. .|A|B|C|. .|A|B|C|. .|A|B|C|."
    );

    array2d.insertColumn(2);
    expect(array2d.toString(" ", "|", ".")).toBe(
      ".|A|.|B|C|. .|A|.|B|C|. .|A|.|B|C|. .|A|.|B|C|."
    );

    expect(array2d.getRowCount()).toBe(4);
    expect(array2d.getColumnCount()).toBe(6);

    array2d.removeColumn(5);
    expect(array2d.toString(" ", "|", ".")).toBe(
      ".|A|.|B|C .|A|.|B|C .|A|.|B|C .|A|.|B|C"
    );

    array2d.removeColumn(0);
    expect(array2d.toString(" ", "|", ".")).toBe(
      "A|.|B|C A|.|B|C A|.|B|C A|.|B|C"
    );

    array2d.removeColumn(1);
    expect(array2d.toString(" ", "|", ".")).toBe("A|B|C A|B|C A|B|C A|B|C");

    expect(array2d.getRowCount()).toBe(4);
    expect(array2d.getColumnCount()).toBe(3);
  });

  it("resize & toString", () => {
    const array2d = new Array2d<string>(4, 3);

    array2d.setValue("A", 0, 0);
    array2d.setValue("B", 0, 1);
    array2d.setValue("C", 0, 2);
    array2d.setValue("D", 1, 0);
    array2d.setValue("E", 1, 1);
    array2d.setValue("F", 1, 2);
    array2d.setValue("G", 2, 0);
    array2d.setValue("H", 2, 1);
    array2d.setValue("I", 2, 2);
    array2d.setValue("J", 3, 0);
    array2d.setValue("K", 3, 1);
    array2d.setValue("L", 3, 2);
    expect(array2d.toString(" ", "|", ".")).toBe("A|B|C D|E|F G|H|I J|K|L");

    array2d.resize(6, 5);
    expect(array2d.toString(" ", "|", ".")).toBe(
      "A|B|C|.|. D|E|F|.|. G|H|I|.|. J|K|L|.|. .|.|.|.|. .|.|.|.|."
    );

    array2d.resize(4, 3);
    expect(array2d.toString(" ", "|", ".")).toBe("A|B|C D|E|F G|H|I J|K|L");
  });
});
