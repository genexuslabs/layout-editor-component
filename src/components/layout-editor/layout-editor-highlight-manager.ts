import { findParentCell, findParentContainer } from "./layout-editor-helpers";

export class LayoutEditorHighlightManager {
  constructor(private element: HTMLGxLayoutEditorElement) {}

  public initialize() {
    this.element.addEventListener(
      "mouseover",
      (event: MouseEvent) => {
        const hoveredElement = event.target as HTMLElement;
        const cell = findParentCell(hoveredElement);

        if (cell) {
          const container = hoveredElement.matches("[data-gx-le-container]")
            ? hoveredElement
            : findParentContainer(cell);

          this.clearHighglighting();
          cell.setAttribute("data-gx-le-highlighted", "");
          container.setAttribute("data-gx-le-highlighted-container", "");
        }
      },
      { passive: true }
    );

    this.element.addEventListener(
      "mouseout",
      this.clearHighglighting.bind(this),
      { passive: true }
    );
  }

  private clearHighglighting() {
    const highlightedElement = this.element.querySelector(
      "[data-gx-le-highlighted]"
    );
    if (highlightedElement) {
      highlightedElement.removeAttribute("data-gx-le-highlighted");
    }
    const highlightedCtElement = this.element.querySelector(
      "[data-gx-le-highlighted-container]"
    );
    if (highlightedCtElement) {
      highlightedCtElement.removeAttribute("data-gx-le-highlighted-container");
    }
  }
}
