import {ChangeEventHandler} from 'react';
import {useAppSelector} from '../../hooks';
import {
  selectIsFailedToLoad,
  selectIsNotFound,
  selectIsPointsLoading,
} from '../../store';
import {IFilterItem} from '../../types';

interface IPointsFilterItemProps {
  oneFilter: IFilterItem;
  currentFilterValue: string;
  changeFilterHandler: ChangeEventHandler<HTMLInputElement>;
}

function PointsFilterItem({
  oneFilter,
  currentFilterValue,
  changeFilterHandler,
}: IPointsFilterItemProps): JSX.Element {

  const isPointsLoading: boolean = useAppSelector(selectIsPointsLoading);
  const isNotFound: boolean = useAppSelector(selectIsNotFound);
  const isFailedToLoad: boolean = useAppSelector(selectIsFailedToLoad);
  const isFavorite: boolean = false;

  return (
    <div className="trip-filters__filter">
      <input
        id={oneFilter.inputId}
        className={oneFilter.inputClassName}
        type={oneFilter.inputType}
        name={oneFilter.inputName}
        value={oneFilter.inputValue}
        checked={currentFilterValue === oneFilter.inputValue}
        disabled={isPointsLoading || isNotFound || isFailedToLoad || isFavorite}
        onChange={changeFilterHandler}
      />
      <label className={oneFilter.labelClassName} htmlFor={oneFilter.inputId}>
        {oneFilter.labelText}
      </label>
    </div>
  );
}

export {
  PointsFilterItem,
};
