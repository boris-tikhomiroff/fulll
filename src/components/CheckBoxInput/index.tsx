import { ChangeEvent, FC } from "react";

type CheckBoxInputProps = {
  checked: boolean;
  onChangeCheckbox: (event: ChangeEvent<HTMLInputElement>) => void;
};

const CheckBoxInput: FC<CheckBoxInputProps> = ({ checked, onChangeCheckbox }) => {
  return (
    <label className="custom-checkbox">
      <input type="checkbox" checked={checked} onChange={onChangeCheckbox} />
      <span className="checkmark"></span>
    </label>
  );
};

export default CheckBoxInput;
