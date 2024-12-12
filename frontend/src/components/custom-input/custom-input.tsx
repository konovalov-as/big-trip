import {
  ChangeEvent,
  FocusEvent,
  useState,
} from 'react';

interface ICustomInputProps {
  customInputId: string,
  name: string;
  type: string;
  label: string;
  value: string;
  isTouched: boolean | undefined;
  errorMessage: string | undefined;
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (evt: FocusEvent<HTMLInputElement>) => void;
  optionalButton?: JSX.Element;
}

function CustomInput({
                       customInputId,
                       name,
                       label,
                       type,
                       value,
                       isTouched,
                       errorMessage,
                       onChange,
                       onBlur,
                       optionalButton,
                     }: ICustomInputProps): JSX.Element {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleBlur = (evt: FocusEvent<HTMLInputElement>): void => {
    setIsFocused(false);
    onBlur(evt);
  };

  const handleChangeValue = (evt: ChangeEvent<HTMLInputElement>): void => {
    onChange(evt);
  };

  return (
    <>
      <div className={`field-contain ${isFocused || value ? 'focused' : ''}`}>
        <div className="field-contain__wrap">
          <input
            className="field-contain__input"
            type={type}
            id={customInputId}
            name={name}
            value={value}
            onChange={handleChangeValue}
            onBlur={handleBlur}
            onFocus={() => setIsFocused(true)}
          />
          <label
            className="field-contain__placeholder-text"
            htmlFor={customInputId}
          >
            {label}
          </label>
          {(optionalButton) && optionalButton}
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
  CustomInput,
};
