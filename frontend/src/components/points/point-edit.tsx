import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  TDestination,
  TDestinations,
  TOffer,
  TOfferDetail,
  TOffers,
  TOffersTypes,
  TOfferType,
  TPicture,
  TPoint,
} from '../../types';
import {
  useAppDispatch,
  useAppSelector,
} from '../../hooks';
import {
  selectOffersTypes,
  selectOffers,
  selectDestinations,
  updateAsyncPoint,
  deleteAsyncPoint,
  createAsyncPoint,
  setIsVisibleNewPoint,
} from '../../store';

import {v4 as uuidv4} from 'uuid';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import {toast} from 'react-toastify';
import {STATIC_FILES_URL} from '../../config/app.ts';
import {CloseIcon} from '../icons';
import {CSSTransition} from 'react-transition-group';

interface IPointEditProps {
  isNew: boolean;
  point: TPoint;
  handleDetailPointToggle: CallableFunction;
}

function PointEdit({
                     point,
                     handleDetailPointToggle,
                     isNew: isNewPoint,
                   }: IPointEditProps): JSX.Element {
  const dispatch = useAppDispatch();
  const offersTypes: TOffersTypes = useAppSelector(selectOffersTypes);
  const offers: TOffers = useAppSelector(selectOffers);
  const destinations: TDestinations = useAppSelector(selectDestinations);

  const currentDestination: TDestination | undefined = destinations.find((destination) => destination.id === point.destination || null);
  const [isPointTypeToggle, setIsPointTypeToggle] = useState<boolean>(false);
  const [pointType, setPointType] = useState<string>(point.type);
  const [pointDestinationName, setPointDestinationName] = useState<string | undefined>(currentDestination && currentDestination.name);
  const [updatedDestination, setUpdatedDestination] = useState<TDestination>();
  const [dateFrom, setDateFrom] = useState<string>(point.date_from);
  const [dateTo, setDateTo] = useState<string>(point.date_to);
  const [pointPrice, setPointPrice] = useState<number>(point.base_price);
  const currentOffers: TOffers = offers.filter((offer: TOffer) => offer.type === pointType);

  const dateFromRef = useRef<HTMLInputElement>(null);
  const dateToRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPointDestinationName(currentDestination && currentDestination.name);
    setUpdatedDestination(currentDestination);
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
          const selectedDateFrom = userDate.toISOString();
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
          const selectedDateTo = userDate.toISOString();
          setDateTo(selectedDateTo);
        }
      })
    }
  }, [dateFrom, dateTo]);

  const handleChangeDestination = (evt: ChangeEvent<HTMLInputElement>) => {
    const value: string = evt.target.value;
    setPointDestinationName(value);
    
    const candidateDestination: TDestination | undefined = destinations.find((destination: TDestination): boolean => destination.name === value);
    if (candidateDestination) {
      setUpdatedDestination(candidateDestination);
    }
  };

  const handleChangePrice = (evt: ChangeEvent<HTMLInputElement>) => {
    const value: number = Number(evt.target.value);
    if (value >= 0) {
      setPointPrice(value);
    }
  };

  const transformArrayToSelectedOffers = (array: string[]) => {
    return array.reduce((acc: Record<string, boolean>, offerId: string) => {
      acc[offerId] = true;
      return acc;
    }, {});
  };
  const initialSelectedOffers: Record<string, boolean> = transformArrayToSelectedOffers(point.offers);
  const [selectedOffers, setSelectedOffers] = useState<Record<string, boolean>>(initialSelectedOffers);
  const handleSelectedOffersChange = (offerId: string) => {
    setSelectedOffers((prevSelectedOffers: Record<string, boolean>): Record<string, boolean> => ({
      ...prevSelectedOffers,
      [offerId]: !prevSelectedOffers[offerId],
    }));
  };
  const selectedOffersForPoint: string[] = Object.entries(selectedOffers)
    .filter(([offerId, isChecked]:[string, boolean]) => isChecked && currentOffers.some((oneOffer: TOffer) => oneOffer.offers.some((offer: TOfferDetail): boolean => offer.id === offerId)))
    .map(([offerId]:[string, boolean]) => offerId);

  const handleSavePoint = (evt: FormEvent) => {
    evt.preventDefault();

    const updatedPoint: TPoint = {
      id: point.id,
      base_price: pointPrice,
      date_from: dateFrom,
      date_to: dateTo,
      destination: (updatedDestination && updatedDestination.id) || '',
      is_favorite: point.is_favorite,
      offers: selectedOffersForPoint,
      type: pointType,
    };

    if (isNewPoint) {
      if (updatedPoint.base_price > 0 && updatedPoint.destination !== '') {
        dispatch(createAsyncPoint(updatedPoint));
        return;
      }
      toast.warn('The destination and price are not empty', {position: toast.POSITION.TOP_CENTER}); 
      return;
    } else {
      dispatch(updateAsyncPoint(updatedPoint));
    }
    handleDetailPointToggle();
  };

  const pointTypeRef = useRef(null);

  return (
    <form
      className="event event--edit"
      action="#"
      method="post"
      onSubmit={handleSavePoint}
    >
      <header className="event__header">
        <div className="event__type-wrapper">
          <label className="event__type event__type-btn" htmlFor={`event-type-toggle-${point.id}`}>
            <span className="visually-hidden">Choose event type</span>
            <img
              className="event__type-icon"
              width="17"
              height="17"
              src={`img/icons/${pointType}.png`}
              alt="Event type icon"
            />
          </label>
          <input
            className="event__type-toggle visually-hidden"
            id={`event-type-toggle-${point.id}`}
            type="checkbox"
            checked={isPointTypeToggle}
            onChange={(evt: ChangeEvent<HTMLInputElement>) => setIsPointTypeToggle(evt.target.checked)}
          />
          <CSSTransition
            in={isPointTypeToggle}
            timeout={500}
            classNames="fade"
            unmountOnExit
            nodeRef={pointTypeRef}
          >
            <div ref={pointTypeRef}>
              <div className="event__type-list">
                <fieldset className="event__type-group">
                  <legend className="visually-hidden">Event type</legend>
                  {offersTypes.map((oneOfferType: TOfferType) => (
                      <div
                        key={uuidv4()}
                        className="event__type-item"
                      >
                        <input
                          className="event__type-input visually-hidden"
                          id={`event-type-${oneOfferType.id}`}
                          name="event-type"
                          type="radio"
                          value={oneOfferType.type}
                          checked={pointType === oneOfferType.type}
                          onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                            setPointType(evt.target.value);
                            setSelectedOffers({});
                            setTimeout(() => {
                              setIsPointTypeToggle(false);
                            }, 0.1 * 1000);
                          }}
                        />
                        <label
                          className={`event__type-label event__type-label--${oneOfferType.type}`}
                          htmlFor={`event-type-${oneOfferType.id}`}
                        >
                          {oneOfferType.type.charAt(0).toUpperCase() + oneOfferType.type.slice(1).replace(/[0-9]/g, ' ')}
                        </label>
                      </div>
                    )
                  )}
                </fieldset>
              </div>
            </div>
          </CSSTransition>
        </div>

        <div className="event__field-group event__field-group--destination clear-field">
          <label className="event__label event__type-output" htmlFor="event-destination-1">
            {pointType.charAt(0).toUpperCase() + pointType.slice(1).replace(/[0-9]/g, ' ')}
          </label>
          <input
            className="event__input event__input--destination clear-field__input"
            id="event-destination-1"
            type="text"
            name="event-destination"
            value={pointDestinationName}
            list="destination-list-1"
            onChange={handleChangeDestination}
            autoComplete="off"
          />
          <datalist id="destination-list-1">
            {destinations.map((destination: TDestination) => (
              <option
                key={destination.id}
                value={destination.name}
              ></option>
            ))}
          </datalist>
          <button
            type="button"
            onClick={() => setPointDestinationName('')}
            className={`clear-field__btn ${pointDestinationName ? 'clear-field__btn--show' : ''}`}>
            <CloseIcon/>
          </button>
        </div>

        <div className="event__field-group event__field-group--time">
          <label className="visually-hidden" htmlFor="event-start-time-1">From</label>
          <input
            className="event__input event__input--time flatpickr flatpickr-input active"
            id="event-start-time-1"
            type="text"
            name="event-start-time"
            ref={dateFromRef}
          />
          &mdash;
          <label className="visually-hidden" htmlFor="event-end-time-1">To</label>
          <input
            className="event__input event__input--time"
            id="event-end-time-1"
            type="text"
            name="event-end-time"
            ref={dateToRef}
          />
        </div>

        <div className="event__field-group event__field-group--price">
          <label className="event__label" htmlFor="event-price-1">
            <span className="visually-hidden">Price</span>
            &euro;
          </label>
          <input
            className="event__input event__input--price"
            id="event-price-1"
            type="text"
            name="event-price"
            value={pointPrice}
            onChange={handleChangePrice}
          />
        </div>

        <button className="event__save-btn btn btn--blue" type="submit">
          Save
        </button>
        <button
          className="event__reset-btn"
          type="reset"
          onClick={() => {
            if (isNewPoint) {
              dispatch(setIsVisibleNewPoint(false));
              // dispatch(setIsPointsEmptyList(true));
            } else {
              dispatch(deleteAsyncPoint(point));
              // dispatch(setIsPointsEmptyList(true));
              handleDetailPointToggle();
            }
          }}
        >
          {isNewPoint ? 'Cancel' : 'Delete'}
        </button>
        <button
          className="event__rollup-btn"
          type="button"
          onClick={() => {
            handleDetailPointToggle()
          }}
        >
          <span className="visually-hidden">Open event</span>
        </button>
      </header>

      <section className="event__details">
        {currentOffers.length > 0 && (
          currentOffers.map((oneCurrentOffer: TOffer) => (
            <section
              key={oneCurrentOffer.id}
              className="event__section event__section--offers"
            >
              <h3 className="event__section-title event__section-title--offers">Offers</h3>
              <div className="event__available-offers">
                {oneCurrentOffer.offers.map((oneOfferDetail: TOfferDetail) => (
                  <div
                    key={oneOfferDetail.id}
                    className="event__offer-selector"
                  >
                    <input
                      className="event__offer-checkbox visually-hidden"
                      type="checkbox"
                      name={oneOfferDetail.title}
                      id={`event-offer-${oneOfferDetail.title.toLowerCase().replace(/ /g, '-')}-${oneOfferDetail.id}`}
                      checked={!!selectedOffers[oneOfferDetail.id]}
                      onChange={() => handleSelectedOffersChange(oneOfferDetail.id)}
                    />
                    <label
                      className="event__offer-label"
                      htmlFor={`event-offer-${oneOfferDetail.title.toLowerCase().replace(/ /g, '-')}-${oneOfferDetail.id}`}
                    >
                <span className="event__offer-title">
                  {oneOfferDetail.title}
                </span>
                      &nbsp;+&euro;&nbsp;
                      <span className="event__offer-price">
                  {oneOfferDetail.price}
                </span>
                    </label>
                  </div>
                ))}
              </div>
            </section>
          ))
        )}

        {(updatedDestination?.description || updatedDestination?.pictures.length) ? (
          <section className="event__section event__section--destination">
            <h3 className="event__section-title event__section-title--destination">Destination</h3>
            {updatedDestination.description && (
              <p className="event__destination-description">
                {updatedDestination.description}
              </p>
            )}

            {updatedDestination.pictures.length ? (
              <div className="event__photos-container">
                <div className="event__photos-tape">
                  {updatedDestination.pictures.map((picture: TPicture) => (
                    <img
                      key={uuidv4()}
                      className="event__photo"
                      src={STATIC_FILES_URL + '/' + picture.src}
                      alt="Event photo"
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </section>
        ) : null}
      </section>
    </form>
  );
}

export {
  PointEdit,
};
