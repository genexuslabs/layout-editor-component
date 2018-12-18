import { newE2EPage } from "@stencil/core/testing";
import {
  MODEL_RESPONSIVE_TABLE,
  MODEL_RESPONSIVE_TABLE_WITH_TEXTBLOCK
} from "./layout-editor-test.mock";

describe("gx-layout-editor rendering", () => {
  it("should render a gx-layout-editor component", async () => {
    const page = await newE2EPage();
    await page.setContent(`<gx-layout-editor></gx-layout-editor>`);
    const el = await page.find("gx-layout-editor");
    expect(el).toBeTruthy();
  });

  it("should draw a gx-le-responsive-table component", async () => {
    const page = await newE2EPage();
    await page.setContent(`<gx-layout-editor></gx-layout-editor>`);
    const layoutEditor = await page.find("gx-layout-editor");
    layoutEditor.setProperty("model", MODEL_RESPONSIVE_TABLE);

    await page.waitForChanges();
    const table = await page.find("gx-le-responsive-table");
    expect(table).toBeTruthy();
  });

  it("should draw a gx-le-textblock component inside a gx-le-responsive-table", async () => {
    const page = await newE2EPage();
    await page.setContent(`<gx-layout-editor></gx-layout-editor>`);
    const layoutEditor = await page.find("gx-layout-editor");
    await layoutEditor.setProperty("model", MODEL_RESPONSIVE_TABLE);

    await page.waitForChanges();
    const table = await page.find("gx-le-responsive-table");
    expect(table).toBeTruthy();
    await layoutEditor.setProperty(
      "model",
      MODEL_RESPONSIVE_TABLE_WITH_TEXTBLOCK
    );

    await page.waitForChanges();
    const textblock = await page.find("gx-le-responsive-table gx-le-textblock");
    expect(textblock).toBeTruthy();
  });

  it("should mark a gx-le-textblock component's parent cell as selected", async () => {
    const page = await newE2EPage();
    await page.setContent(`<gx-layout-editor></gx-layout-editor>`);
    const layoutEditor = await page.find("gx-layout-editor");
    await layoutEditor.setProperty(
      "model",
      MODEL_RESPONSIVE_TABLE_WITH_TEXTBLOCK
    );
    await layoutEditor.setProperty("selectedControls", [
      "table/row[8]/cell[1]/textblock"
    ]);

    await page.waitForChanges();

    const selectedTextblock = await page.find(
      "gx-le-responsive-table > div > div > div[data-gx-le-responsive-table-cell][data-gx-le-selected='true'] > gx-le-textblock"
    );
    expect(selectedTextblock).toBeTruthy();
  });

  it("should click on gx-le-textblock component, mark it as selected and fire the controlSelected event", async () => {
    const page = await newE2EPage();
    await page.setContent(`<gx-layout-editor></gx-layout-editor>`);
    const layoutEditor = await page.find("gx-layout-editor");
    await layoutEditor.setProperty(
      "model",
      MODEL_RESPONSIVE_TABLE_WITH_TEXTBLOCK
    );
    await page.waitForChanges();

    const controlSelectedEvent = await layoutEditor.spyOnEvent(
      "controlSelected"
    );

    const textblock = await page.find("gx-le-textblock");
    await textblock.click();

    await page.waitForChanges();
    const selectedTextblock = await page.find(
      "gx-le-responsive-table > div > div > div[data-gx-le-responsive-table-cell][data-gx-le-selected='true'] > gx-le-textblock"
    );
    expect(selectedTextblock).toBeTruthy();

    const selectedControls: string[] = await layoutEditor.getProperty(
      "selectedControls"
    );
    expect(
      selectedControls.find(c => c === "table/row[8]/cell[1]/textblock")
    ).toBeTruthy();

    expect(controlSelectedEvent).toHaveReceivedEventDetail({
      controls: ["table/row[8]/cell[1]/textblock"]
    });
  });

  it("should select the gx-le-textblock component by pressing space bar on its parent cell, while focused", async () => {
    const page = await newE2EPage();
    await page.setContent(`<gx-layout-editor></gx-layout-editor>`);
    const layoutEditor = await page.find("gx-layout-editor");
    await layoutEditor.setProperty(
      "model",
      MODEL_RESPONSIVE_TABLE_WITH_TEXTBLOCK
    );
    await page.waitForChanges();

    const controlSelectedEvent = await layoutEditor.spyOnEvent(
      "controlSelected"
    );

    const textBlockParentCell = await page.find(
      "[data-gx-le-responsive-table-cell]"
    );
    await textBlockParentCell.focus();
    await textBlockParentCell.press(" ");

    await page.waitForChanges();
    expect(controlSelectedEvent).toHaveReceivedEventDetail({
      controls: ["table/row[8]/cell[1]/textblock"]
    });
  });

  it("should fire the controlRemoved event", async () => {
    const page = await newE2EPage();
    await page.setContent(`<gx-layout-editor></gx-layout-editor>`);
    const layoutEditor = await page.find("gx-layout-editor");
    await layoutEditor.setProperty(
      "model",
      MODEL_RESPONSIVE_TABLE_WITH_TEXTBLOCK
    );

    await page.waitForChanges();
    const controlRemovedEvent = await layoutEditor.spyOnEvent("controlRemoved");

    const textblock = await page.find("gx-le-textblock");
    await textblock.click();

    await page.waitForChanges();
    await layoutEditor.press("Delete");

    await page.waitForChanges();
    expect(controlRemovedEvent).toHaveReceivedEventDetail({
      controls: ["table/row[8]/cell[1]/textblock"]
    });
  });
});
