import { FC, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Select, { SingleValue } from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetData, setDataSelected, setDataLocation, setEmptyData } from '../../store/appSlice';
import { RootState } from '../../store/store';
import { dataFetch, IPropsSelect } from '../../interface/iterface';

const SelectDistricts: FC<IPropsSelect> = ({ register }) => {
  const dispath = useDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [value, setValue] = useState<dataFetch | boolean>(false);

  const { idRequestDistrict, dataDistricts } = useSelector(
    (state: RootState): any => state.appReducer
  );

  useEffect(() => {
    if (dataDistricts?.length === 1) {
      dispath(setDataSelected({ id: dataDistricts[0].Address6Id, nameLocation: 'City' }));
    }
  }, [dataDistricts]);


  useEffect(() => {
    if (idRequestDistrict) {
      setValue(false);
      setIsLoading(true);
      fetchGetData(['Districts', 'Address7Id', idRequestDistrict]).then((data) => {
        dispath(setDataLocation({ name: 'Districts', data }));
        setIsLoading(false);
      });
    }
  }, [idRequestDistrict]);

  const onChange = (option: any) => {
    if (value === option) {
      return;
    }
    setValue(option);
    dispath(setEmptyData('Cities'));
    dispath(setDataSelected({ id: option.Address6Id, nameLocation: 'City' }));
  };

  return (
    <Form.Group className="mb-3">
      <div className="wrapperField">
        <Form.Label className="label labelImportant">
          Район (район.центр)
        </Form.Label>
        <Select
          {...register('Область', {
            required: false,
          })}
          className="selectForm"
          value={dataDistricts?.length === 1 ? dataDistricts[0] : value}
          isSearchable={dataDistricts?.length > 20}
          onChange={(e) => onChange(e)}
          options={dataDistricts}
          isLoading={!dataDistricts?.length && isLoading}
          getOptionLabel={(e: dataFetch) => Object.values(e)[1]}
          getOptionValue={(e: dataFetch) => Object.values(e)[0]}
          placeholder={"Выберите район"}
          isDisabled={!dataDistricts?.length}
        />
      </div>
      <div>
        <p className="errorText">Заполните пожалуйста</p>
      </div>
    </Form.Group>
  );
};

export default SelectDistricts;
