import {useAppDispatch, useAppSelector} from '../../hooks';
import {
  filterAndSortPoints,
  selectCurrentSortingType,
  selectFilteredAndSortedPoints,
  setCurrentSortingType,
} from '../../store';
import {sortPoints, SortingTypes} from '../../utils';
import {TPoints} from '../../types';

function Sorting(): JSX.Element {
  const dispatch = useAppDispatch();

  const filteredAndSortedPoints: TPoints = useAppSelector(selectFilteredAndSortedPoints);

  const availableSortTypes: string[] = [SortingTypes.DAY, SortingTypes.TIME, SortingTypes.PRICE];
  const currentSortingType: string = useAppSelector(selectCurrentSortingType);

  const handleSortType = (type: string) => {
    if (!type) {
      return;
    }

    dispatch(setCurrentSortingType(type));

    const filteredPoints: TPoints = sortPoints(type, filteredAndSortedPoints.slice());
    dispatch(filterAndSortPoints(filteredPoints));
  }

  return (
    <form className="trip-events__trip-sort trip-sort" action="#" method="get">
      {Object.values(SortingTypes).map((type: string) => (
        <div
          className={`trip-sort__item`}
          key={type}
        >
          <input
            id={`sort-${type}`}
            className="trip-sort__input visually-hidden"
            type="radio"
            name="trip-sort"
            value={`sort-${type}`}
            disabled={!availableSortTypes.includes(type)}
            checked={currentSortingType === type}
            onChange={() => handleSortType(type)}
          />
          <label
            className="trip-sort__btn"
            htmlFor={`sort-${type}`}>{type.charAt(0).toUpperCase() + type.slice(1)}
          </label>
        </div>
      ))}
    </form>
  );
}

export {
  Sorting,
};
