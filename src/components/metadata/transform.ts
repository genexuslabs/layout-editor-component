import { controlsDefinition } from "../common/controls";
import { transformGrid } from "./transform-grid";
import { transformGroup } from "./transform-group";
import { transformLayout } from "./transform-layout";
import { transformSection } from "./transform-section";
import { transformTab } from "./transform-tab";
import { transformTable } from "./transform-table";
import { transformUserControl } from "./transform-user-control";

const controlTypesList = controlsDefinition.map(def => def.type);
const controlsTransforms = {
  group: {
    transformFn: transformGroup
  },
  grid: {
    transformFn: transformGrid
  },
  section: {
    transformFn: transformSection
  },
  tab: {
    transformFn: transformTab
  },
  table: {
    transformFn: transformTable
  },
  ucw: {
    transformFn: transformUserControl
  }
};

function transformModel(
  rawModel: GeneXusAbstractLayout.Model
): GeneXusAbstractLayout.Model {
  return {
    layout: transformLayout(rawModel.layout)
  };
}

export function transformContainer(
  rawContainer: GeneXusAbstractLayout.Container,
  childControlType: string,
  isRoot = false,
  isPart = false
): GeneXusAbstractLayout.Container {
  const transformControlFn = getTransformFunctionByType(childControlType);

  return {
    childControlType,
    controlType: childControlType,
    [childControlType]: {
      ...transformControlFn(rawContainer[childControlType]),
      isRootControl: isRoot,
      isPartControl: isPart
    }
  };
}

export function transformControl(
  control: GeneXusAbstractLayout.Control
): GeneXusAbstractLayout.Control {
  const customPropertiesXml = control["@PATTERN_ELEMENT_CUSTOM_PROPERTIES"];
  if (customPropertiesXml) {
    control.CustomProperties = parseControlCustomProperties(
      customPropertiesXml
    );
  }
  return control;
}

function getTransformFunctionByType(
  type: string
): (control: GeneXusAbstractLayout.Control) => GeneXusAbstractLayout.Control {
  const definition = controlsTransforms[type];

  if (!definition) {
    return transformControl;
  } else {
    return (
      control: GeneXusAbstractLayout.Control
    ): GeneXusAbstractLayout.Control =>
      definition.transformFn(transformControl(control));
  }
}

function parseControlCustomProperties(
  propertiesXml: string
): GeneXusAbstractLayout.ControlCustomProperties {
  const parser = new DOMParser();
  const doc = parser.parseFromString(propertiesXml, "application/xml");
  const propsElements = Array.from(doc.querySelectorAll("Property"));
  return propsElements.reduce((acc, item) => {
    acc[item.querySelector("Name").innerHTML] = item.querySelector(
      "Value"
    ).innerHTML;
    return acc;
  }, {});
}

export function fixArrayProperty<T>(rawValue: any): T[] {
  return rawValue ? (Array.isArray(rawValue) ? rawValue : [rawValue]) : [];
}

export function inferChildControlType(parent: any): string {
  for (const type of controlTypesList) {
    if (parent[type]) {
      return type;
    }
  }
}

export const transform = transformModel;
