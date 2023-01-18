import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { dataFetch, IDataCurrent, IDataFetch, IDataSelect, IKey } from '../interface/iterface';

export const fetchGetData = async (arr: string[]) => {
  let typeAddresses = arr[0],
    variableId = arr[1],
    propertyId = arr[2];

  let data = {
    CRC: '',
    Packet: {
      JWT: 'null',
      MethodName: `Addresses.${typeAddresses}`,
      ServiceNumber: '767659F1-AB94-4E7B-9112-FC2780E03882',
      Data: {
        [variableId]: propertyId,
      },
    },
  };

  let config = {
    method: 'post',
    url: 'https://rest.eurotorg.by/10201/Json',
    headers: {
      'Content-Type': 'text/plain',
    },
    data: data,
  };

  try {
    const response = await axios(config);

    if (response.data.Table[0].Error) {
      throw new Error(response.data.Table[0].ErrorDescription);
    }

    return response.data.Table;
  } catch (error: any) {
    console.log(error);
  }
};

const initialState: IKey | IDataFetch = {
  selectedCountries: null,
  selectedRegions: null,
  selectedDistricts: null,
  selectedCities: null,
  selectedStreets: null,
  idRequestDistricts: '',
  idRequestRegions: '',
  idRequestCities: '',
  idRequestStreets: '',
  listSelectsLocations: ['Districts', 'Cities', 'Streets'],
  status: null,
  error: null,
  dataCountries: [],
  dataRegions: [],
  dataDistricts: [],
  dataCities: [],
  dataStreets: [],
  valueRegions: false,
  valueDistricts: false,
  valueCities: false,
  valueStreets: false,
  nameCountries: '',
  nameRegions: '',
  nameDistricts: '',
  nameCities: '',
  nameStreets: '',
};

export const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    setDataLocation: (
      state,
      action: PayloadAction<[string, dataFetch[]]>
    ) => {
      state[`data${action.payload[0]}` as keyof IKey] =
        action.payload[1];

      state[`name${action.payload[0]}` as keyof IKey] =
        action.payload[0];
    },

    setDataSelected: (
      state,
      action: PayloadAction<string>
    ) => {
      state[`idRequest${action.payload}` as keyof IKey] =
        action.payload;
    },
    setEmptyData: (state, action: PayloadAction<string>) => {
      const indexPayload = state.listSelectsLocations.indexOf(action.payload);
      const filterArr = state.listSelectsLocations.filter((el: dataFetch, i: number) => i > indexPayload);

      filterArr.forEach((el: dataFetch) => {
        state[`data${el}` as keyof IKey] = [];
      });

      filterArr.forEach((el: dataFetch) => {
        state[`value${el}` as keyof IKey] = false;
      });
    },

    setValueSelect: (state, action: PayloadAction<[dataFetch, string]>) => {
      state[`value${action.payload[1]}` as keyof IKey] = action.payload[0];
    },

    setSelectedData: (state, action: PayloadAction<[string, dataFetch]>) => {
      state['selected' + action.payload[0] as keyof IKey] = action.payload[1];
    },
  },
});

export const { setDataLocation, setDataSelected, setEmptyData, setSelectedData, setValueSelect } =
  appSlice.actions;
export default appSlice.reducer;
