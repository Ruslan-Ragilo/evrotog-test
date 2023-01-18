export interface IDateForInputs {
  label: string;
  important: boolean;
}

export interface IDateForSelects {
  nameField: string;
  label: string;
  nameSelect: string;
  nextAdress?: string;
  responsAdress?: string;
  important: boolean;
  placeholderSelect: string;
  index?: number;
  // register?: any;
  // onChange?: any;
  // ref?: any;
  // value?: any;
  // field?: any;
  // Controller?: any;
  // control?: any;
}

export interface IKey {
  [index: string]: any;
}

export interface IOption {
  value: string;
  label: string;
  idName: string;
  idValue: string;
}

export interface dataFetch {
  [key: string]: string;
}

export interface IDataSelect {
  [x: string]: any;
  nameSelect?: string;
  nextAdress?: string;
  data: dataFetch[];
}

export interface IDataFetch {
  dataCountries: dataFetch[];
  dataRegions: dataFetch[];
  dataDistricts: dataFetch[];
  dataCities: dataFetch[];
  dataStreets: dataFetch[];
  listSelectsLocations: string[];
  valueRegions: dataFetch | boolean;
  valueDistricts: dataFetch | boolean;
  valueCities: dataFetch | boolean;
  valueStreets: dataFetch | boolean;
  nameCountries: string,
  nameRegions: string,
  nameDistricts: string,
  nameCities: string,
  nameStreets: string,
}

export interface IDataCurrent {
  selectedCountries: dataFetch | null;
  selectedRegions: dataFetch | null;
  selectedDistricts: dataFetch | null;
  selectedCities: dataFetch | null;
  selectedStreets: dataFetch | null;
  idRequestDistricts: string;
  idRequestRegions: string;
  idRequestCities: string;
  idRequestStreets: string;
  status: null | string;
  error: null | string;
}

export interface IPropsSelect {
  register: any;
}
