import {CSSTransition} from 'react-transition-group';
import {useState, useRef, useEffect} from 'react';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {
  selectDestinations,
  selectOffers,
  toggleFavoriteAsyncPoint,
  setIsVisibleNewPoint,
} from '../../store';
import {
  TDestination,
  TDestinations,
  TOffer,
  TOfferDetail,
  TOffers,
  TPoint,
} from '../../types';
import {
  formatDate,
  formatDuration,
  getDuration,
  DAY_FORMAT,
  MACHINE_DAY_FORMAT,
  MACHINE_TIME_FORMAT,
  TIME_FORMAT,
} from '../../utils';
import {PointEdit, StarIcon} from '../../components';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/light.css'

type TPointItemProps = {
  handleDetailPointToggle: CallableFunction;
  onePoint: TPoint;
  isOpenPoint: boolean;
}

function PointItem(
  {
    handleDetailPointToggle,
    onePoint,
    isOpenPoint,
  }: TPointItemProps): JSX.Element {
  const dispatch = useAppDispatch();
  const destinations: TDestinations = useAppSelector(selectDestinations);
  const offers: TOffers = useAppSelector(selectOffers);
  const [pointType] = useState<string>(onePoint.type);

  const currentDestination: TDestination | undefined = destinations.find((item: TDestination) => item.id === onePoint.destination || null);
  const currentOffers: TOffer | undefined = offers.find((oneOffer) => oneOffer.type === pointType);

  const findDestination = (array: TDestinations, id: string): TDestination | null => {
    const result = array.find(item => item.id === id);
    return result ? result : null;
  };
  const destinationCandidate: TDestination | null = findDestination(destinations, onePoint.destination);
  const [pointDestination, setPointDestination] = useState<TDestination | null>(destinationCandidate);
  useEffect(() => {
    setPointDestination(destinationCandidate);
  }, [destinationCandidate]);

  const [_, setPointDestinationName] = useState<string | null>(pointDestination && pointDestination.name);
  useEffect(() => {
    setPointDestinationName(pointDestination && pointDestination.name);
  }, [pointDestination]);

  const [dateFrom, setDateFrom] = useState<string>(onePoint.date_from);
  const [dateTo, setDateTo] = useState<string>(onePoint.date_to);

  let filteredOffers: TOfferDetail[] | undefined = undefined;
  if (onePoint.offers) {
    filteredOffers = currentOffers?.offers.filter((sourceItem: TOfferDetail) => onePoint.offers.find((distItem: string) => distItem === sourceItem.id));
  }

  const favoriteButtonRef = useRef<HTMLButtonElement>(null);
  const dateFromRef = useRef<HTMLInputElement>(null);
  const dateToRef = useRef<HTMLInputElement>(null);

  const toggleFavoriteHandler = () => {
    const updatedPoint: TPoint = {...onePoint, is_favorite: !onePoint.is_favorite};
    if (favoriteButtonRef.current) {
      favoriteButtonRef.current.blur();
    }
    dispatch(toggleFavoriteAsyncPoint(updatedPoint));
  };

  const [_eventDestination, setEventDestination] = useState<TDestination | undefined>(currentDestination && currentDestination);
  useEffect(() => {
    setEventDestination(currentDestination);
  }, [currentDestination]);

  useEffect(() => {
    if (dateFromRef.current && dateToRef.current) {
      flatpickr(dateFromRef.current, {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        time_24hr: true,
        locale: {
          firstDayOfWeek: 1
        },
        defaultDate: dateFrom,
        maxDate: dateTo,
        onChange: ([userDate]) => {
          const selectedDateFrom: string = userDate.toISOString();
          setDateFrom(selectedDateFrom);
        }
      })
      flatpickr(dateToRef.current, {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        time_24hr: true,
        locale: {
          firstDayOfWeek: 1
        },
        defaultDate: dateTo,
        minDate: dateFrom,
        onChange: ([userDate]) => {
          const selectedDateTo: string = userDate.toISOString();
          setDateTo(selectedDateTo);
        }
      })
    }
  }, [dateFrom, dateTo]);

  useEffect(() => {
    const handleEsc = (evt: KeyboardEvent) => {
       if (evt.key === 'Escape') {
        dispatch(setIsVisibleNewPoint(false));
        handleDetailPointToggle();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [dispatch, handleDetailPointToggle]);

  let selectedOfferDetail: boolean[] = [];
  useEffect(() => {
    if (currentOffers !== undefined && onePoint !== undefined) {
      selectedOfferDetail = currentOffers.offers.map((item: TOfferDetail) => {
        return onePoint.offers.some((selectedItem: string) => {
          if (item.id === selectedItem) {
            return item
          }
        });
      })
      setChecked(selectedOfferDetail)
    }
  }, [offers, onePoint])

  const [_checked, setChecked] = useState<boolean[]>(selectedOfferDetail);

  const existPointRef = useRef(null);

  return (
    <li className={`trip-events__item ${isOpenPoint ? 'trip-events__item--edit' : ''}`}>
      {!isOpenPoint && (
        <div className="event">
          <time
            className="event__date"
            dateTime={formatDate(onePoint.date_from, MACHINE_DAY_FORMAT)}
          >
            {formatDate(onePoint.date_from, DAY_FORMAT)}
          </time>
          <div className="event__type">
            <img
              className="event__type-icon"
              width="42"
              height="42"
              src={`img/icons/${onePoint.type}.png`}
              alt="Event type icon"
            />
          </div>
          <h3 className="event__title">{onePoint.type} {currentDestination?.name}</h3>
          <div className="event__schedule">
            <p className="event__time">
              <time
                className="event__start-time"
                dateTime={formatDate(onePoint.date_from, MACHINE_TIME_FORMAT)}
              >
                {formatDate(onePoint.date_from, TIME_FORMAT)}
              </time>
              &mdash;
              <time
                className="event__end-time"
                dateTime={formatDate(onePoint.date_to, MACHINE_TIME_FORMAT)}
              >
                {formatDate(onePoint.date_to, TIME_FORMAT)}
              </time>
            </p>
            <p className="event__duration">
              {formatDuration(getDuration(onePoint.date_from, onePoint.date_to))}
            </p>
          </div>
          <p className="event__price">
            &euro;&nbsp;
            <span className="event__price-value">
              {onePoint.base_price}
            </span>
          </p>
          <h4 className="visually-hidden">Offers:</h4>
          <ul className="event__selected-offers">
            {filteredOffers && (filteredOffers.map((offer: TOfferDetail) => (
              <li
                key={offer.id}
                className="event__offer"
              >
                <span className="event__offer-title">
                  {offer.title}
                </span>
                &nbsp;+&euro;&nbsp;
                <span className="event__offer-price">
                  {offer.price}
                </span>
              </li>
            )))}
          </ul>
          <button
            className={"event__favorite-btn " + (onePoint.is_favorite ? "event__favorite-btn--active" : "")}
            type="button"
            onClick={toggleFavoriteHandler}
            ref={favoriteButtonRef}
          >
            <span className="visually-hidden">Add to favorite</span>
            <span className="event__favorite-icon">
              <StarIcon/>
            </span>
          </button>
          <button
            className="event__rollup-btn"
            type="button"
            onClick={() => handleDetailPointToggle()}
          >
            <span className="visually-hidden">Open event</span>
          </button>
        </div>
      )}

      <CSSTransition
        timeout={500}
        classNames="alert"
        in={isOpenPoint}
        nodeRef={existPointRef}
        unmountOnExit
      >
        <div
          ref={existPointRef}
        >
          <PointEdit
            point={onePoint}
            isNew={false}
            handleDetailPointToggle={handleDetailPointToggle}
          />
        </div>
      </CSSTransition>
  </li>
  );
}

export {
  PointItem,
};
