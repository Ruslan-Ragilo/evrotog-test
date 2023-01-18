import { FC, useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { SingleValue } from 'react-select';
import { dataFetch, IPropsSelect } from '../../interface/iterface';
import { fetchGetData, setDataLocation } from '../../store/appSlice';
import { RootState } from '../../store/store';

interface res {
  userId: number,
  id: number,
  title: string,
  completed: boolean;
}

const SelectStreets: FC<IPropsSelect> = ({ register }) => {
  const dispath = useDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [value, setValue] = useState<dataFetch | boolean>(false);

  const { idRequestStreet, dataStreets } = useSelector(
    (state: RootState): any => state.appReducer
  );


  useEffect(() => {
    setValue(false);
  }, [dataStreets]);


  useEffect(() => {
    if (idRequestStreet) {
      setValue(false);
      setIsLoading(true);
      fetchGetData(['Streets', 'Address5Id', idRequestStreet]).then((data) => {
        dispath(setDataLocation({ name: 'Streets', data }));
        setIsLoading(false);
      });
    }
  }, [idRequestStreet]);

  const onChange = (option: any) => {
    setValue(option);
  };

  const options = () => {
    if (dataStreets.length > 40) {
      return dataStreets.filter((_: dataFetch, i: number) => i <= 10);
    } else {
      return dataStreets;
    }
  };

  const filterStreets = (inputValue: string) => {
    return dataStreets.filter((i: dataFetch) =>
      i.Address4Name.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadOptions = (
    inputValue: string,
    callback: (options: dataFetch[]) => void
  ) => {
    callback(filterStreets(inputValue));
  };


  return (
    <Form.Group className="mb-3">
      <div className="wrapperField">
        <Form.Label className="label labelImportant">Улица</Form.Label>
        <AsyncSelect
          {...register('Улица', {
            required: false,
          })}
          className="selectForm"
          value={dataStreets?.length === 1 ? dataStreets[0] : value}
          isSearchable={dataStreets?.length > 20}
          onChange={(e) => onChange(e)}
          loadOptions={loadOptions}
          defaultOptions={options()}
          isLoading={!dataStreets?.length && isLoading}
          getOptionLabel={(e: dataFetch) => Object.values(e)[2]}
          getOptionValue={(e: dataFetch) => Object.values(e)[0]}
          placeholder={"Выберите улицу"}
          isDisabled={!dataStreets?.length}
        />
      </div>
      <div>
        <p className="errorText">{'Заполните пожалуйста'}</p>
      </div>
    </Form.Group>
  );
};

export default SelectStreets;
