import { LayoutEditorToolArrangeObserverEntry } from "./layout-editor-tool-arrange-observer-entry";

export abstract class LayoutEditorToolArrangeObserver {
  private static entries = new Map<
    HTMLElement,
    LayoutEditorToolArrangeObserverEntry
  >();

  public static observe(el: HTMLElement) {
    if (!this.entries.has(el)) {
      this.entries.set(el, new LayoutEditorToolArrangeObserverEntry(el));
    }
  }

  public static unobserve(el: HTMLElement) {
    this.entries.get(el).destroy();
    this.entries.delete(el);
  }
}
