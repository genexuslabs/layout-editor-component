import { IControlDefinition, controlsDefinition } from "../common/controls";

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

export function getControlTypeName(cell): string {
  const controlDefinition =
    cell.controlType && findResolverByType(cell.controlType);

  if (controlDefinition) {
    return controlDefinition.typeName;
  } else {
    return "Unknown control";
  }
}

export function getControlName(cell): string {
  return (
    (cell.controlType &&
      cell[cell.controlType] &&
      `${cell[cell.controlType]["@controlName"] || ""}`) ||
    (cell["@controlName"] || "")
  );
}
