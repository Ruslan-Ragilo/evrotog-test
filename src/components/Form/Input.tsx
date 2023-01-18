import { FC, useState } from 'react';
import { Form } from 'react-bootstrap';

interface IInputDataProps {
  label: string;
  important: boolean;
  register: any;
}

const InputData: FC<IInputDataProps> = ({ label, important, register }) => {
  const [value, setValue] = useState<string>('');

  const isImportant = important ? 'label labelImportant' : 'label';

  return (
    <Form.Group className="mb-3">
      <div className="wrapperField">
        <Form.Label className={isImportant}>{label}</Form.Label>
        <Form.Control {...register(label, {
          required: important,
        })} className="fields" type='text' />
      </div>
      <div>
        <p className="errorText">{important && 'Заполните пожалуйста'}</p>
      </div>
    </Form.Group>
  );
};

export default InputData;
