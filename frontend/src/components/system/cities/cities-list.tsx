import {useState} from 'react';
import {TAppDispatch, TCities, TCity} from '../../../types';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {
  selectCities,
  selectEditCityId,
  selectIsCitiesLoading,
  setEditCityId,
} from '../../../store';
import {
  Spinner,
  EditCity,
  CityItem,
} from '..'

function CitiesList(): JSX.Element {
  const dispatch: TAppDispatch = useAppDispatch();

  const cities: TCities = useAppSelector(selectCities);
  const editCityId: number | null = useAppSelector(selectEditCityId);
  const isCitiesLoading: boolean = useAppSelector(selectIsCitiesLoading);

  const [isNewCity, setIsNewCity] = useState<boolean>(false);

  const handleAddCity = (): void => {
    dispatch(setEditCityId(null));
    setIsNewCity(!isNewCity);
  };

  const handleEditCityToggle = (id: number): void => {
    setIsNewCity(false);
    id === editCityId ? dispatch((setEditCityId(null))) : dispatch((setEditCityId(id)));
  };

  return (
    <div className="data-view">
      <div className="data-view__header">
        <h3 className="data-view__title">All cities</h3>
        <button
          className={isNewCity ? 'sys-btn sys-btn--warning' : 'sys-btn'}
          onClick={handleAddCity}
          type="button"
        >
          {isNewCity ? 'Cancel' : 'Add'}
        </button>
      </div>

      {isNewCity && (
        <div className="data-view__decor-form">
          <EditCity cityValue={''} cityId={''} />
        </div>
      )}

      {isCitiesLoading && <Spinner />}
      {!isCitiesLoading && !cities.length && (
        <div className="data-view__empty">
          <p>No cities</p>
        </div>
      )}

      <ul className="data-view__list">
        {cities.map((oneCity: TCity, id: number) => (
          <CityItem
            key={oneCity.id}
            oneCity={oneCity}
            handleEditCityToggle={() => handleEditCityToggle(id)}
            isEditCity={id === editCityId}
          />
        ))}
      </ul>

      {/* {!isCitiesLoading && !!cities.length && (
        <div className="data-view__pagination">
          <p>pagination</p>
        </div>
      )} */}
    </div>
  );
}

export {
  CitiesList,
};
