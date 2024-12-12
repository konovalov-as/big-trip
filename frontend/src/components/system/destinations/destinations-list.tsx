import {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {
  Spinner,
  DestinationItem,
  EditDestination,
} from '..';
import {
  selectDestinations,
  selectEditDestinationId,
  selectIsDestinationLoading,
  setEditDestinationId,
} from '../../../store';
import {TAppDispatch, TDestination, TDestinations} from '../../../types';

function DestinationsList(): JSX.Element {
  const dispatch: TAppDispatch = useAppDispatch();

  const [isNewDestination, setIsNewDestination] = useState<boolean>(false);
  const editDestinationId: number | null = useAppSelector(selectEditDestinationId);
  const destinations: TDestinations = useAppSelector(selectDestinations);
  const isDestinationLoading: boolean = useAppSelector(selectIsDestinationLoading);

  const handleAddDestinationToggle = () => {
    dispatch(setEditDestinationId(null));
    setIsNewDestination(!isNewDestination);
  };

  const handleEditDestinationToggle = (idx: number) => {
    setIsNewDestination(false);
    idx === editDestinationId ? dispatch(setEditDestinationId(null)) : dispatch(setEditDestinationId(idx));
  };

  return (
    <div className="data-view">
      <div className="data-view__header">
        <h2 className="data-view__title">Destinations</h2>
        <button
          className={isNewDestination ? 'sys-btn sys-btn--warning' : 'sys-btn'}
          onClick={handleAddDestinationToggle}
          type="button"
        >
          {isNewDestination ? 'Cancel': 'Add'}
        </button>
      </div>

      {isNewDestination && (
        <div className="data-view__decor-form">
          <EditDestination
            name={''}
            description={''}
            destinationId={''}
            pictures={[]}
          />
        </div>
      )}

      {isDestinationLoading && <Spinner />}
      {!isDestinationLoading && !destinations.length && !isNewDestination && <div className="data-view__empty">No destinations</div>}

      <ul className="data-view__list">
        {destinations.map((oneDestination: TDestination, idx: number) => (
          <DestinationItem
            key={oneDestination.id}
            oneDestination={oneDestination}
            handleEditDestinationToggle={() => handleEditDestinationToggle(idx)}
            isEditDestination={idx === editDestinationId}
          />
        ))}
      </ul>

      {/*{!isDestinationLoading && !!destinations.length && (*/}
      {/*  <div className="data-view__pagination">*/}
      {/*    <p>pagination</p>*/}
      {/*  </div>*/}
      {/*)}*/}
    </div>
  );
}

export {
  DestinationsList,
};
