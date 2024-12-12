import {ChangeEvent} from 'react';
import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {
  filterAndSortPoints,
  filterPoints,
  selectCurrentFilterType,
  selectCurrentSortingType,
  selectDestinations,
  selectIsFailedToLoad,
  selectIsNotFound,
  selectIsPointsEmptyList,
  selectIsPointsLoading,
  selectIsVisibleNewPoint,
  selectOffers,
  selectPoints,
  setCurrentFilterType,
  setIsPointsEmptyList,
  setIsVisibleNewPoint,
  setPointId,
} from '../../store';
import {
  DAY_MONTH_FORMAT,
  PointsCount,
  AppRoute,
  FilterTypes,
  formatDate,
  sortPoints,
} from '../../utils';
import {IFilterItem, IFilterList, TOffers, TPoint, TPoints} from '../../types';
import {PointsFilterItem} from '../../components';

const filterList: IFilterList = [
  {
    id: 1,
    inputId: `filter-${FilterTypes.Everything.toLocaleLowerCase()}`,
    inputClassName: 'trip-filters__filter-input visually-hidden',
    inputType: 'radio',
    inputName: 'trip-filter',
    inputValue: FilterTypes.Everything.toLocaleLowerCase(),
    labelClassName: 'trip-filters__filter-label',
    labelText: FilterTypes.Everything.toLocaleLowerCase(),
  },
  {
    id: 2,
    inputId: `filter-${FilterTypes.Future.toLocaleLowerCase()}`,
    inputClassName: 'trip-filters__filter-input visually-hidden',
    inputType: 'radio',
    inputName: 'trip-filter',
    inputValue: FilterTypes.Future.toLocaleLowerCase(),
    labelClassName: 'trip-filters__filter-label',
    labelText: FilterTypes.Future.toLocaleLowerCase(),
  },
  {
    id: 3,
    inputId: `filter-${FilterTypes.Present.toLocaleLowerCase()}`,
    inputClassName: 'trip-filters__filter-input visually-hidden',
    inputType: 'radio',
    inputName: 'trip-filter',
    inputValue: FilterTypes.Present.toLocaleLowerCase(),
    labelClassName: 'trip-filters__filter-label',
    labelText: FilterTypes.Present.toLocaleLowerCase(),
  },
  {
    id: 4,
    inputId: `filter-${FilterTypes.Past.toLocaleLowerCase()}`,
    inputClassName: 'trip-filters__filter-input visually-hidden',
    inputType: 'radio',
    inputName: 'trip-filter',
    inputValue: FilterTypes.Past.toLocaleLowerCase(),
    labelClassName: 'trip-filters__filter-label',
    labelText: FilterTypes.Past.toLocaleLowerCase(),
  },
  {
    id: 5,
    inputId: `filter-${FilterTypes.Favorite.toLocaleLowerCase()}`,
    inputClassName: 'trip-filters__filter-input visually-hidden',
    inputType: 'radio',
    inputName: 'trip-filter',
    inputValue: FilterTypes.Favorite.toLocaleLowerCase(),
    labelClassName: 'trip-filters__filter-label',
    labelText: FilterTypes.Favorite.toLocaleLowerCase(),
  },
];

function Header(): JSX.Element {
  const isPointsLoading: boolean = useAppSelector(selectIsPointsLoading);
  const isNotFound: boolean = useAppSelector(selectIsNotFound);
  const isFailedToLoad: boolean = useAppSelector(selectIsFailedToLoad);
  const isFavorite: boolean = false;
  const isPointsEmptyList: boolean = useAppSelector(selectIsPointsEmptyList);
  const points = useAppSelector(selectPoints);
  const destinations = useAppSelector(selectDestinations);
  const offers: TOffers = useAppSelector(selectOffers);
  const currentSortingType = useAppSelector(selectCurrentSortingType);
  const currentFilterValue: string = useAppSelector(selectCurrentFilterType);

  const changeFilterHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    if (isPointsLoading || isNotFound || isFailedToLoad || isFavorite) {
      return;
    }

    const value: string = evt.target.value;

    dispatch(setIsPointsEmptyList(false));

    switch (value.toUpperCase()) {
      case FilterTypes.Past: {
        const filteredPoints: TPoints = points.filter((point: TPoint): boolean => Date.parse(point.date_to) < Date.now());
        const filteredAndSortedPoints: TPoints = sortPoints(currentSortingType, filteredPoints.slice());
        if (!filteredAndSortedPoints.length) {
          dispatch(setIsPointsEmptyList(true));
        }
        dispatch(filterPoints(filteredAndSortedPoints));
        break;
      }
      case FilterTypes.Present:
        {
          const filteredPoints: TPoints = points.filter((point: TPoint): boolean => (Date.parse(point.date_from) <= Date.now() && Date.parse(point.date_to) >= Date.now()));
          const filteredAndSortedPoints: TPoints = sortPoints(currentSortingType, filteredPoints.slice());
          if (!filteredAndSortedPoints.length) {
            dispatch(setIsPointsEmptyList(true));
          }
          dispatch(filterPoints(filteredAndSortedPoints));
          break;
        }
      case FilterTypes.Future:
        {
          const filteredPoints: TPoints = points.filter((point: TPoint): boolean => Date.parse(point.date_from) > Date.now());
          const filteredAndSortedPoints: TPoints = sortPoints(currentSortingType, filteredPoints.slice());
          if (!filteredAndSortedPoints.length) {
            dispatch(setIsPointsEmptyList(true));
          }
          dispatch(filterPoints(filteredAndSortedPoints));
          break;
        }
      case FilterTypes.Everything: {
        const filteredAndSortedPoints: TPoints = sortPoints(currentSortingType, points.slice());
        if (!filteredAndSortedPoints.length) {
          dispatch(setIsPointsEmptyList(true));
        }
        dispatch(filterPoints(filteredAndSortedPoints));
        break;
      }
      case FilterTypes.Favorite: {
        const filteredPoints: TPoints = points.filter((point: TPoint) => point.is_favorite);
        const filteredAndSortedPoints: TPoints = sortPoints(currentSortingType, filteredPoints.slice());
        if (!filteredAndSortedPoints.length) {
          dispatch(setIsPointsEmptyList(true));
        }
        dispatch(filterAndSortPoints(filteredAndSortedPoints));
        break;
      }
      default:
        dispatch(filterPoints(points));
    }

    dispatch(setCurrentFilterType(value));
  };

  const getTripTitle = () => {
    if (!points.length) {
      return 'No events';
    }
    if (points.length === PointsCount.One) {
      const tripLocation = destinations.filter((destination) => destination.id === points[0].destination);
      return `${tripLocation[0]?.name}`;
    }
    if (points.length === PointsCount.Two) {
      const tripFrom = destinations.filter((destination) => destination.id === points[0].destination);
      const tripTo = destinations.filter((destination) => destination.id === points[1].destination);
      return `${tripFrom[0]?.name} \u2013 ${tripTo[0]?.name}`;
    }
    if (points.length === PointsCount.Three) {
      const tripFrom = destinations.filter((destination) => destination.id === points[0].destination);
      const tripMiddle = destinations.filter((destination) => destination.id === points[1].destination);
      const tripTo = destinations.filter((destination) => destination.id === points[2].destination);
      return `${tripFrom[0]?.name} \u2013 ${tripMiddle[0]?.name} \u2013 ${tripTo[0]?.name}`;
    }

    const tripFrom = destinations.filter((destination) => destination.id === points[0].destination);
    const tripTo = destinations.filter((destination) => destination.id === points[points.length - 1].destination);
    return `${tripFrom[0]?.name} \u2013 ... \u2013 ${tripTo[0]?.name}`;
  };

  const getTripDates = () => {
    return `${formatDate(points[0]?.date_from, DAY_MONTH_FORMAT)}\u00A0\u2013\u00A0${formatDate(points[points.length - 1]?.date_to, DAY_MONTH_FORMAT)}`;
  };

  const totalCost = points.reduce((total, point) => {
    let subTotal = point.base_price; // Add base_price

    const offersByType = offers.filter((offer) => offer.type === point.type);
    offersByType.map(offerByType => offerByType.offers.map((availableOffer) => {
      point.offers.map((selectedOffer) => {
        if (availableOffer.id === selectedOffer) {
          subTotal += availableOffer.price;
        }
      })
    }));

    return total + subTotal; // Accumulate the subTotal with the previous total
  }, 0);

  const dispatch = useAppDispatch();
  const isVisibleNewPoint = useAppSelector(selectIsVisibleNewPoint);

  return (
    <header className="page-header">
      <div className="container">
       <div className="page-decor page-decor--kind-1">
          <div className="page-header__logo">
            <img src="img/logo.png" width="42" height="42" alt="Trip logo" />
          </div>
          <div className="trip-main">
            {(!isPointsLoading && !isNotFound && !isFailedToLoad && !isPointsEmptyList) && (
              <section className="trip-main__trip-info trip-info">
                <div className="trip-info__main">
                  <h1 className="trip-info__title">{getTripTitle()}</h1>

                  <p className="trip-info__dates">{getTripDates()}</p>
                </div>

                <p className="trip-info__cost">
                  Total: &euro;&nbsp;<span className="trip-info__cost-value">{totalCost}</span>
                </p>
              </section>
            )}

            <div className="trip-main__trip-controls trip-controls">
              <div className="trip-controls__filters">
                <h2 className="visually-hidden">Filter events</h2>
                <form className="trip-filters" action="#" method="get">
                  {filterList.map((oneFilter: IFilterItem) => (
                    <PointsFilterItem
                      key={oneFilter.id}
                      oneFilter={oneFilter}
                      currentFilterValue={currentFilterValue.toLocaleLowerCase()}
                      changeFilterHandler={changeFilterHandler}
                    />
                  ))}

                  <button className="visually-hidden" type="submit">Accept filter</button>
                </form>
              </div>
            </div>

            {isNotFound
              ?
              <Link
                to={AppRoute.Main}
                className="btn btn--big btn--yellow"
              >
                Go home page
              </Link>
              :
              <button
              className="trip-main__event-add-btn btn btn--big btn--yellow"
              type="button"
              disabled={isVisibleNewPoint || isFailedToLoad || isPointsLoading}
              onClick={() => {
                dispatch(setIsVisibleNewPoint(true));
                dispatch(setPointId(null));
                dispatch(setIsPointsEmptyList(false));
              }}
              >New event</button>
            }
          </div>
        </div>
      </div>
    </header>
  );
}

export {
  Header,
};
