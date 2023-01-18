import { FC, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import {
  fetchGetData,
  setDataLocation,
  setDataSelected,
} from '../../store/appSlice';
import { dataFetch, IPropsSelect } from '../../interface/iterface';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Select from 'react-select';

const SelectCountries: FC<IPropsSelect> = ({ register }) => {

  const dataCountries = useSelector(
    (state: RootState) => state.appReducer.dataCountries
  );

  const dispath = useDispatch();

  useEffect(() => {
    fetchGetData(['Countries', '', '']).then((data) => {
      dispath(setDataLocation({ name: 'Countries', data }));
    });
  }, []);

  if (dataCountries?.length > 0) {
    dispath(setDataSelected({ id: '1', nameLocation: 'Region' }));
  }

  return (
    <Form.Group className="mb-3">
      <div className="wrapperField">
        <Form.Label className="label labelImportant">Cтрана</Form.Label>
        <Select
          {...register('Страна', {
            required: false,
          })}
          className="selectForm"
          value={dataCountries?.length === 1 ? dataCountries[0] : undefined}
          options={dataCountries}
          getOptionLabel={(e: dataFetch) => Object.values(e)[1]}
          getOptionValue={(e: dataFetch) => Object.values(e)[0]}
          isLoading={!dataCountries?.length}
          isDisabled={!dataCountries?.length}
          placeholder={"Выберите страну"}
        />
      </div>

      <div>
        <p className="errorText">Заполните пожалуйста</p>
      </div>
    </Form.Group>
  );
};

export default SelectCountries;
