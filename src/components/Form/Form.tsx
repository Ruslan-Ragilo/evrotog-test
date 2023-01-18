import { FC } from 'react';
import { Form } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { IDateForInputs, IDateForSelects } from '../../interface/iterface';
import Input from './Input';
import Select from './Select';

const inputsData: IDateForInputs[] = [
  { label: 'Дом', important: true },
  { label: 'Корпус', important: false },
  { label: 'Подъезд', important: false },
  { label: 'Этаж', important: false },
  { label: 'Кваритра', important: false },
];
const selectsData: IDateForSelects[] = [
  { nameField: 'Cтрана', label: 'Cтрана', important: true, nameSelect: 'Countries', placeholderSelect: "Выберите страну" },
  { nameField: 'Область', label: 'Область (обл.центр)', important: true, nameSelect: 'Regions', nextAdress: 'Districts', responsAdress: 'Address7Id', placeholderSelect: "Выберите область" },
  { nameField: 'Район', label: 'Район (район.центр)', important: true, nameSelect: 'Districts', nextAdress: 'Cities', responsAdress: 'Address6Id', placeholderSelect: "Выберите район" },
  { nameField: 'Населенный пункт', label: 'Населенный пункт', important: true, nameSelect: 'Cities', nextAdress: 'Streets', responsAdress: 'Address5Id', placeholderSelect: "Выберите населенный пункт" },
  { nameField: 'Улица', label: 'Улица', important: true, nameSelect: 'Streets', responsAdress: 'Address5Id', placeholderSelect: "Выберите улицу" },
];

const FormReg: FC = (props) => {
  const {
    register,
    formState: {
      errors,
    },
    handleSubmit,
    control
  } = useForm();

  const onSubmit = (data: any) => {
    alert(JSON.stringify(data));
  };



  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {selectsData.map((el, i) => (
        <Form.Group key={i} className="mb-3">
          <div className="wrapperField">
            <Form.Label className={el.important ? "label labelImportant" : "label"}>
              {el.label}
            </Form.Label>
            <Select
              nameField={el.nameField}
              label={el.label}
              important={el.important}
              nameSelect={el.nameSelect}
              nextAdress={el.nextAdress}
              responsAdress={el.responsAdress}
              placeholderSelect={el.placeholderSelect}
              index={i} />
          </div>
          <div>
            <p className="errorText">Заполните пожалуйста</p>
          </div>
        </Form.Group>
      ))}
      {inputsData.map((el, i) => (
        <Input
          key={i}
          register={register}
          label={el.label}
          important={el.important}
        />
      ))}
      <button type="submit">Сохранить</button>
    </form>
  );
};

export default FormReg;
