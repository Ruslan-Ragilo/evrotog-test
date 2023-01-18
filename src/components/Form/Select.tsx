import { FC, useEffect } from 'react';
import AsyncSelect from 'react-select/async';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { dataFetch, IDateForSelects, IKey } from '../../interface/iterface';
import { fetchGetData, setDataLocation, setDataSelected, setEmptyData, setSelectedData, setValueSelect } from '../../store/appSlice';

const Select: FC<IDateForSelects> = ({ nextAdress, responsAdress, nameSelect, placeholderSelect, index }) => {
  const valueSelect = useSelector(
    (state: RootState) => state.appReducer[`value${nameSelect}` as keyof IKey]
  );

  const dataSelect = useSelector(
    (state: RootState) => state.appReducer[`data${nameSelect}` as keyof IKey]
  );

  const idSelect = useSelector(
    (state: RootState) => state.appReducer[`id${nameSelect}` as keyof IKey]
  );

  const dispath = useDispatch();

  useEffect(() => {
    if (index === 0) {
      fetchGetData([nameSelect, '', '']).then((data: dataFetch[]) => {
        dispath(setDataLocation([nameSelect, data]));
        dispath(setDataSelected(nextAdress));
      });
    }
    if (index === 1) {
      fetchGetData([nameSelect, '', '']).then((data: dataFetch[]) => {
        dispath(setDataLocation([nameSelect, data]));
        dispath(setDataSelected(nextAdress));
      });
    }
  }, []);

  useEffect(() => {
    if (dataSelect?.length === 1 && index !== 0 && index !== 1) {
      const idReq: any = Object.values(dataSelect[0])[0];
      fetchGetData([nextAdress, responsAdress, idReq]).then((data: dataFetch[]) => {
        dispath(setDataLocation([nextAdress, data]));
        dispath(setDataSelected(nextAdress));
      });
    }
  }, [dataSelect]);

  const options = () => {
    if (dataSelect?.length > 30) {
      return dataSelect?.filter((_: dataFetch, i: number) => i <= 20);
    } else {
      return dataSelect;
    }
  };


  const onChanges = (option: dataFetch) => {
    if (index === 0 || option == valueSelect) {
      return;
    }
    dispath(setEmptyData(nameSelect));
    fetchGetData([nextAdress, responsAdress, Object.values(option)[0]]).then((data: dataFetch[]) => {
      dispath(setDataLocation([nextAdress, data]));
      dispath(setDataSelected(nextAdress));
      dispath(setSelectedData([nameSelect, option]));
      dispath(setValueSelect([option, nameSelect]));
    });
  };

  const filterSelect = (inputValue: string) => {
    return dataSelect?.filter((i: dataFetch) =>
      Object.values(i)[1].toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadOptions = (
    inputValue: string,
    callback: (options: dataFetch[]) => void
  ) => {
    callback(filterSelect(inputValue));
  };


  return (

    <AsyncSelect
      className="selectForm"
      value={dataSelect?.length === 1 ? dataSelect[0] : valueSelect}
      onChange={onChanges}
      isSearchable={dataSelect?.length > 30}
      placeholder={placeholderSelect}
      defaultOptions={options()}
      loadOptions={loadOptions}
      getOptionLabel={(e: dataFetch) => Object.values(e)[1]}
      getOptionValue={(e: dataFetch) => Object.values(e)[1]}
      isLoading={!dataSelect?.length}
      isDisabled={!dataSelect?.length}
    />
  );
};

export default Select;
