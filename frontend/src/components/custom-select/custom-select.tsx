import {ChangeEvent, FocusEvent, useState} from 'react';
import {IOneOption} from '../system';

interface ICustomInputProps {
  customInputId: string,
  name: string;
  label: string;
  value: string;
  isTouched: boolean | undefined;
  errorMessage: string | undefined;
  options: IOneOption[];
  onChange: (evt: ChangeEvent<HTMLSelectElement>) => void;
  onBlur: (evt: FocusEvent<HTMLSelectElement>) => void;
}

function CustomSelect({
                       customInputId,
                       name,
                       label,
                       value,
                       isTouched,
                       errorMessage,
                       options,
                       onChange,
                       onBlur,
}: ICustomInputProps): JSX.Element {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleBlur = (evt: FocusEvent<HTMLSelectElement>): void => {
    setIsFocused(false);
    onBlur(evt);
  };

  const handleChangeValue = (evt: ChangeEvent<HTMLSelectElement>): void => {
    onChange(evt);
  };

  return (
    <>
      <div className={`field-contain ${isFocused || value ? 'focused' : ''}`}>
        <div className="field-contain__wrap">
          <select
            className="field-contain__input field-contain__select"
            id={customInputId}
            name={name}
            onChange={handleChangeValue}
            onBlur={handleBlur}
            onFocus={() => setIsFocused(true)}
            value={value}
          >
            <option value=""></option>
            {options.map((oneOption: IOneOption) => (
              <option
                key={oneOption.key}
                value={oneOption.value}
                // selected={value === oneOption.value}
              >
                {oneOption.value}
              </option>
            ))}
          </select>
          <label
            className="field-contain__placeholder-text"
            htmlFor={customInputId}
          >
            {label}
          </label>
        </div>
        {isTouched && errorMessage ? (
          <div className="field-contain__message">
            <small>{errorMessage}</small>
          </div>
        ) : null}
      </div>
    </>
  );
}

export {
  CustomSelect,
};
