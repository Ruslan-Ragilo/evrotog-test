import { FC, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { SingleValue } from 'react-select';
import Select from 'react-select';
import { dataFetch, IPropsSelect } from '../../interface/iterface';
import {
  fetchGetData,
  setDataSelected,
  setDataLocation,
  setEmptyData
} from '../../store/appSlice';
import { RootState } from '../../store/store';

const SelectRegions: FC<IPropsSelect> = ({ register }) => {
  const [value, setValue] = useState<dataFetch | boolean>(false);

  const { dataRegions } = useSelector(
    (state: RootState) => state.appReducer
  );

  const dispath = useDispatch();

  useEffect(() => {
    fetchGetData(['Regions', '', '']).then((data) => {
      dispath(setDataLocation({ name: 'Regions', data }));
    });
  }, []);


  const onChange = (option: any) => {
    if (value === option) {
      return;
    }
    if (option?.Address7Id) {
      setValue(option);
      dispath(setEmptyData('Districts'));
      dispath(setEmptyData('Cities'));
      dispath(setEmptyData('Streets'));
      dispath(
        setDataSelected({ id: option.Address7Id, nameLocation: 'District' })
      );
    }
  };

  return (
    <Form.Group className="mb-3">
      <div className="wrapperField">
        <Form.Label className="label labelImportant">
          Область (обл.центр)
        </Form.Label>
        <Select
          {...register('Область', {
            required: false,
          })}
          className="selectForm"
          isSearchable={dataRegions?.length > 15 ? true : false}
          options={dataRegions}
          onChange={(e) => onChange(e)}
          getOptionLabel={(e: dataFetch) => Object.values(e)[1]}
          getOptionValue={(e: dataFetch) => Object.values(e)[0]}
          placeholder={"Выберите область"}
          isDisabled={!dataRegions?.length}
        />
      </div>
      <div>
        <p className="errorText">Заполните пожалуйста</p>
      </div>
    </Form.Group>
  );
};

export default SelectRegions;
