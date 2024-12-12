import {FC, MouseEvent, useState} from 'react';
import {EyeCloseIcon, EyeOpenIcon} from "../icons";

interface IToggleShownPassButtonProps {
  onChangeIsShownPassword: (isUpdatedShownPassword: boolean) => void;
}

const ToggleShownPassButton: FC<IToggleShownPassButtonProps> = ({onChangeIsShownPassword}) => {
  const [isShownPassword, setIsShownPassword] = useState<boolean>(false);

  const handleShowPassword = (evt: MouseEvent<HTMLButtonElement>): void => {
    evt.preventDefault();
    setIsShownPassword(!isShownPassword);
    onChangeIsShownPassword(!isShownPassword);
  };

  return (
    <button
      className="field-contain__icon field-contain__icon--password"
      type="button"
      aria-label="Show or hide password"
      onClick={handleShowPassword}
    >
      {!isShownPassword && <EyeOpenIcon/>}
      {isShownPassword && <EyeCloseIcon/>}
    </button>
  );
};

export {
  ToggleShownPassButton,
};
