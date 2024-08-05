import { ChangeEvent, FC } from "react";
import "./CheckBoxInput.css";

type CheckBoxInputProps = {
  checked: boolean;
  onChangeCheckbox: (event: ChangeEvent<HTMLInputElement>) => void;
};

const CheckBoxInput: FC<CheckBoxInputProps> = ({ checked, onChangeCheckbox }) => {
  return (
    <label className="checkbox">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChangeCheckbox}
        className="checkbox__input"
        data-testid="checkbox"
      />
      <span className="checkbox__checkmark"></span>
    </label>
  );
};

export default CheckBoxInput;
