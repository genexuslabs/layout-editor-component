export function datasetData(
  rawData: GeneXusAbstractLayout.Data
): GeneXusAbstractLayout.Data {
  const data = { ...rawData };

  switch (data.CustomProperties?.ControlType) {
    case "Radio Button":
    case "Combo Box":
      controlValues(data);
      break;
  }

  return data;
}

function controlValues(data: GeneXusAbstractLayout.Data) {
  if (!data.CustomProperties.ControlValues) {
    data.CustomProperties.ControlValues =
      "Example data 1:example_data_1,Example data 2:example_data_2";
  }
}
