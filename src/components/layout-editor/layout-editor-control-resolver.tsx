import { IControlDefinition, controlsDefinition } from "../common/controls";

import { h } from "@stencil/core";

export function controlResolver(control, context: IResolverContext) {
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

function findResolverByType(type: string): IControlDefinition {
  return controlsDefinition.find(r => r.type === type);
}

export function isCellSelected(cell, context: IResolverContext): boolean {
  const controlToVerify = findChildControl(cell) || cell;
  return isControlSelected(controlToVerify, context);
}

export function isControlSelected(control, context: IResolverContext): boolean {
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

export interface IResolverContext {
  selectedControls: string[];
}

export function getCellCommonAttrs(cell: GeneXusAbstractLayout.Cell) {
  return {
    "data-gx-le-cell-id": cell["@id"],
    "data-gx-le-control-container": true,
    key: cell["@id"]
  };
}

export function getControlCommonAttrs(model: GeneXusAbstractLayout.Cell) {
  const controlDefinition = findResolverByType(model.childControlType);
  const control = model[
    model.childControlType
  ] as GeneXusAbstractLayout.IControl;

  return {
    "data-gx-le-control-id": control["@id"],
    "data-gx-le-control-name": control["@controlName"] || "",
    "data-gx-le-control-type-name":
      controlDefinition.typeName || "Unknown control"
  };
}
