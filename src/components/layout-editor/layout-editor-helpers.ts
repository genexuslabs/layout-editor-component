export function findParentCell(el: HTMLElement): HTMLElement {
  if (el.hasAttribute("data-gx-le-drop-area")) {
    return el;
  }

  while (el) {
    const parent = el.parentElement;
    if (parent && parent.hasAttribute("data-gx-le-drop-area")) {
      return parent;
    }
    el = parent;
  }
}

export function findValidDropTarget(el: HTMLElement): HTMLElement {
  if (el.matches("[data-gx-le-placeholder]")) {
    return el;
  }

  if (el.tagName.toLowerCase() === "gx-layout-editor") {
    const dropCandidates = el.querySelectorAll(
      `:scope > [data-gx-le-control-id] > [data-gx-le-container] > [data-gx-le-placeholder]:last-child,
       :scope > [data-gx-le-control-id] > [data-gx-le-container] > [data-gx-le-drop-area]:last-child`
    );
    return dropCandidates[dropCandidates.length - 1] as HTMLElement;
  }

  return findParentCell(el);
}

export function getCellData(el: Element): CellData {
  return {
    cellId: el.getAttribute("data-gx-le-cell-id"),
    dropArea: el.getAttribute("data-gx-le-drop-area"),
    rowId: el.getAttribute("data-gx-le-row-id")
  };
}

export function getControlData(element: Element): ControlData {
  return {
    id: element.getAttribute("data-gx-le-control-id"),
    name: element.getAttribute("data-gx-le-control-name"),
    typeName: element.getAttribute("data-gx-le-control-type-name")
  };
}

export function getDropTargetData(el: HTMLElement): DropTargetData {
  return {
    nextRowId: el.getAttribute("data-gx-le-next-row-id"),
    placeholderType: el.getAttribute("data-gx-le-placeholder")
  };
}

export function isEmptyContainerDrop(el: HTMLElement): boolean {
  return (
    el.matches("gx-layout-editor-placeholder") &&
    el.parentElement &&
    el.parentElement.getAttribute("data-gx-le-container-empty") === "true"
  );
}

export function getControlId(el: Element): string {
  return el ? el.getAttribute("data-gx-le-control-id") || "" : "";
}

export function getControlItemId(el: Element): string {
  return el ? el.getAttribute("data-gx-le-control-item-id") || "" : "";
}

export function getControlItemSelectedId(el: Element): string {
  return el ? el.getAttribute("data-gx-le-control-item-selected-id") || "" : "";
}

export function getControlSelectionId(wrapper: Element) {
  return getControlItemSelectedId(wrapper) || getControlId(wrapper);
}

export function setControlItemSelectedId(el: Element, value: string) {
  el.setAttribute("data-gx-le-control-item-selected-id", value);
}

export function findParentContainer(el: Element): Element {
  const parentElement = el.parentElement;
  if (!parentElement) {
    return null;
  }

  const controlId = getControlId(parentElement);
  if (controlId) {
    return parentElement;
  }

  return findParentContainer(parentElement);
}

export function getSelectedData(el: Element): SelectedData {
  let controlId = getControlId(el);

  if (controlId === "" && el.firstElementChild) {
    controlId = getControlId(el.firstElementChild);
  }

  return {
    controlId
  };
}

export function getBreadcrumb(el: HTMLElement): HTMLElement[] {
  const breadcrumb: HTMLElement[] = [];

  while (el.parentElement) {
    const parent = el.parentElement;

    if (parent.dataset && parent.dataset.gxLeControlTypeName) {
      breadcrumb.push(parent);
    }

    el = parent;
  }

  return breadcrumb;
}

export function findControlWrapper(el: HTMLElement): HTMLElement {
  while (el && !isControlWrapper(el)) {
    el = el.parentElement;
  }

  return el;
}

export function findContainedControlWrapper(cell: Element): HTMLElement {
  return (cell || document).querySelector("[data-gx-le-control-id]");
}

export function findContainedControl(wrapper: Element): HTMLElement {
  return (wrapper || document).querySelector("[data-gx-le-control-id] > *");
}

export function getControlWrapper(
  controlId: string,
  element?: Element
): HTMLElement {
  return (element || document).querySelector(
    `[data-gx-le-control-id="${controlId}"], [data-gx-le-control-item-selected-id="${controlId}"]`
  );
}

export function isControlWrapper(el: Element): boolean {
  return el.hasAttribute("data-gx-le-control-id");
}

export function isControlContainer(el: Element): boolean {
  return el.hasAttribute("data-gx-le-control-container");
}

export function isControlDraggable(el: Element): boolean {
  return el.getAttribute("draggable") === "true";
}

export function isControlDragActiveTarget(el: Element): boolean {
  return el.hasAttribute("data-gx-le-active-target-parent");
}

interface CellData {
  cellId: string;
  dropArea: string;
  rowId: string;
}

interface ControlData {
  id: string;
  name: string;
  typeName: string;
}

interface SelectedData {
  controlId: string;
}

interface DropTargetData {
  nextRowId: string;
  placeholderType: string;
}
