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
    expect(el).toBeDefined();
  });

  it("should draw a gx-le-responsive-table component", async () => {
    const page = await newE2EPage();
    await page.setContent(`<gx-layout-editor></gx-layout-editor>`);
    const layoutEditor = await page.find("gx-layout-editor");
    layoutEditor.setProperty("model", MODEL_RESPONSIVE_TABLE);

    await page.waitForChanges();
    const table = await page.find("gx-le-responsive-table");
    expect(table).toBeDefined();
  });

  it("should draw a gx-le-textblock component inside a gx-le-responsive-table", async () => {
    const page = await newE2EPage();
    await page.setContent(`<gx-layout-editor></gx-layout-editor>`);
    const layoutEditor = await page.find("gx-layout-editor");
    await layoutEditor.setProperty("model", MODEL_RESPONSIVE_TABLE);

    await page.waitForChanges();
    const table = await page.find("gx-le-responsive-table");
    expect(table).toBeDefined();
    await layoutEditor.setProperty(
      "model",
      MODEL_RESPONSIVE_TABLE_WITH_TEXTBLOCK
    );

    await page.waitForChanges();
    const textblock = await page.find("gx-le-responsive-table gx-le-textblock");
    expect(textblock).toBeDefined();
  });
});
