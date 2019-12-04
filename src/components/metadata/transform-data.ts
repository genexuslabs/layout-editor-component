export function transformData(
  rawData: GeneXusAbstractLayout.Data
): GeneXusAbstractLayout.Data {
  return {
    ...rawData,
    CustomProperties: transformCustomProperties(rawData.CustomProperties)
  };
}

function transformCustomProperties(
  customProperties: GeneXusAbstractLayout.DataCustomProperties
): GeneXusAbstractLayout.DataCustomProperties {
  return {
    ...customProperties,
    ...(customProperties.ControlValues &&
      parseControlValues(customProperties.ControlValues))
  };
}

function parseControlValues(
  controlValues: string
): { ControlValuesList: { Name: string; Value: string }[] } {
  const values: { Name: string; Value: string }[] = [];

  controlValues?.split(",").map(item => {
    const [Name, Value] = item.split(":");

    if (Name && Value) {
      values.push({ Name, Value });
    }
  });

  return { ControlValuesList: values };
}
