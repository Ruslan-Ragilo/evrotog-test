import { FC, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchGetData,
  setDataLocation,
  setDataSelected,
  setEmptyData
} from '../../store/appSlice';
import { RootState } from '../../store/store';
import Select from 'react-select';
import { dataFetch, IPropsSelect } from '../../interface/iterface';
import { SingleValue } from 'react-select';

const SelectCities: FC<IPropsSelect> = ({ register }) => {

  const dispath = useDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [value, setValue] = useState<any | boolean>(false);

  const { idRequestCity, dataCities } = useSelector(
    (state: RootState): any => state.appReducer
  );

  useEffect(() => {
    setValue(false);
    if (dataCities?.length === 1) {
      dispath(setDataSelected({ id: dataCities[0].Address5Id, nameLocation: 'Street' }));
    }
  }, [dataCities]);



  useEffect(() => {
    if (idRequestCity) {
      setValue(false);
      setIsLoading(true);
      fetchGetData(['Cities', 'Address6Id', idRequestCity]).then((data) => {
        dispath(setDataLocation({ name: 'Cities', data }));
        setIsLoading(false);
      });
    }
  }, [idRequestCity]);

  const onChange = (option: any) => {
    if (value === option) {
      return;
    }
    setValue({ value: Object.values(option)[1], label: Object.values(option)[1] });
    dispath(setEmptyData('Streets'));
    dispath(setDataSelected({ id: option.Address5Id, nameLocation: 'Street' }));
  };

  return (
    <Form.Group className="mb-3">
      <div className="wrapperField">
        <Form.Label className="label labelImportant">
          Населенный пункт
        </Form.Label>
        <Select
          className="selectForm"
          value={dataCities?.length === 1 ? dataCities[0] : value}
          {...register('Город', {
            required: true,
          })}
          isSearchable={dataCities?.length > 20}
          onChange={(e) => onChange(e)}
          options={dataCities}
          isLoading={!dataCities?.length && isLoading}
          getOptionLabel={(e: dataFetch) => Object.values(e)[1]}
          getOptionValue={(e: dataFetch) => Object.values(e)[0]}
          placeholder={"Выберите населенный пункт"}
          isDisabled={!dataCities?.length}
        />
      </div>
      <div>
        <p className="errorText">Заполните пожалуйста</p>
      </div>
    </Form.Group>
  );
};

export default SelectCities;
