import { ControlDefinition, controlsDefinition } from "../common/controls";

import { h } from "@stencil/core";

export function controlResolver(control, context: ResolverContext) {
  if (control.childControlType) {
    const resolverObj = findResolverByType(control.childControlType);

    if (resolverObj && resolverObj.tag) {
      if (typeof resolverObj.tag === "string") {
        const TagType = resolverObj.tag as any;
        return <TagType model={control} context={context} />;
      } else if (typeof resolverObj.tag === "object") {
        const TagType = resolverObj.tag.mappings[
          control[control.childControlType][resolverObj.tag.property]
        ] as any;
        return <TagType model={control} context={context} />;
      }
    } else {
      return <gx-le-default model={control} context={context} />;
    }
  }
}

function findResolverByType(type: string): ControlDefinition {
  return controlsDefinition.find(r => r.type === type);
}

export function isCellSelected(cell, context: ResolverContext): boolean {
  const controlToVerify = findChildControl(cell) || cell;
  return isControlSelected(controlToVerify, context);
}

export function isControlSelected(control, context: ResolverContext): boolean {
  for (const selControl of context.selectedControls) {
    if (selControl === control["@id"]) {
      return true;
    }
  }

  return false;
}

function findChildControl(cell): any {
  return cell[cell.childControlType];
}

export interface ResolverContext {
  selectedControls: string[];
}

export function getCellCommonAttrs(cell: GeneXusAbstractLayout.Cell) {
  return {
    "data-gx-le-cell-id": cell["@id"],
    "data-gx-le-control-container": true,
    key: cell["@id"]
  };
}

export function getControlWrapperCommonAttrs(
  model: GeneXusAbstractLayout.Cell
) {
  const controlDefinition = findResolverByType(model.childControlType);
  const control = model[
    model.childControlType
  ] as GeneXusAbstractLayout.Control;

  return {
    "data-gx-le-control-id": control["@id"],
    "data-gx-le-control-name": control["@controlName"] || "",
    "data-gx-le-control-type-name":
      (controlDefinition && controlDefinition.typeName) || "Unknown control",
    draggable: (!control.isRootControl && !control.isPartControl).toString(),
    "data-gx-le-control-nesting-parity":
      control.nestingLevel % 2 === 0 ? "even" : "odd"
  };
}

export function getControlCommonAttrs(control: GeneXusAbstractLayout.Control) {
  return {
    class: control["@class"],
    draggable: !control.isRootControl && !control.isPartControl
  };
}
