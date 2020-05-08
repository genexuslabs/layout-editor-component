import { controlsDefinition } from "../common/controls";
import { datasetData } from "../dataset/dataset-data";
import { transformData } from "./transform-data";
import { transformGrid } from "./transform-grid";
import { transformGroup } from "./transform-group";
import { transformLayout } from "./transform-layout";
import { transformSection } from "./transform-section";
import { transformTab } from "./transform-tab";
import { transformTable } from "./transform-table";
import { transformUserControl } from "./transform-user-control";

const controlTypesList = controlsDefinition.map(def => def.type);
const controlsTransforms = {
  data: {
    transformFn: transformData,
    datasetFn: datasetData
  },
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
    layout: transformLayout(rawModel.layout, 0)
  };
}

export function transformContainer(
  rawContainer: GeneXusAbstractLayout.Container,
  childControlType: string,
  nestingLevel: number,
  isPart = false
): GeneXusAbstractLayout.Container {
  const transformControlFn = getTransformFunctionByType(childControlType);

  return {
    childControlType,
    controlType: childControlType,
    [childControlType]: {
      ...transformControlFn(rawContainer[childControlType], nestingLevel),
      nestingLevel,
      isRootControl: nestingLevel === 0,
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

function transformDataset(
  datasetFn,
  control: GeneXusAbstractLayout.Control
): GeneXusAbstractLayout.Control {
  return datasetFn ? datasetFn(control) : control;
}

function getTransformFunctionByType(
  type: string
): (
  control: GeneXusAbstractLayout.Control,
  nestingLevel: number
) => GeneXusAbstractLayout.Control {
  const definition = controlsTransforms[type];

  if (!definition) {
    return transformControl;
  } else {
    return (
      control: GeneXusAbstractLayout.Control,
      nestingLevel: number
    ): GeneXusAbstractLayout.Control =>
      definition.transformFn(
        transformDataset(definition.datasetFn, transformControl(control)),
        nestingLevel
      );
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
