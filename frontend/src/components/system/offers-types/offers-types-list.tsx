import {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {
  selectEditOfferTypeId,
  selectIsOffersTypesLoading,
  selectOffersTypes,
  setEditOfferTypeId,
} from '../../../store';
import {
  Spinner,
  EditOfferType,
  OfferTypeItem,
} from '..';
import {TOfferType} from '../../../types';

function OffersTypesList(): JSX.Element {
  const dispatch = useAppDispatch();

  const [isNewOfferType, setIsNewOfferType] = useState<boolean>(false);
  const editOfferTypeId: number | null = useAppSelector(selectEditOfferTypeId);
  const offerTypes: TOfferType[] = useAppSelector(selectOffersTypes);
  const isOffersTypesLoading: boolean = useAppSelector(selectIsOffersTypesLoading);

  const handleAddType = () => {
    dispatch(setEditOfferTypeId(null));
    setIsNewOfferType(!isNewOfferType);
  };

  const handleEditTypeToggle = (idx: number) => {
    setIsNewOfferType(false);
    idx === editOfferTypeId ? dispatch(setEditOfferTypeId(null)) : dispatch(setEditOfferTypeId(idx));
  };

  return (
    <div className="data-view">
      <div className="data-view__header">
        <h3 className="data-view__title">Offers types</h3>
        <button
          className={isNewOfferType ? 'sys-btn sys-btn--warning' : 'sys-btn'}
          onClick={handleAddType}
          type='button'
        >
          {isNewOfferType ? 'Cancel' : 'Add'}
        </button>
      </div>

      {isNewOfferType && (
        <div className="data-view__decor-form">
          <EditOfferType offerTypeValue={''} offerTypeId={''} />
        </div>
      )}

      {isOffersTypesLoading && <Spinner />}
      {!isOffersTypesLoading && !offerTypes.length && !isNewOfferType && (
        <div className="data-view__empty">
          <p> No offer types</p>
        </div>
      )}

      {!!offerTypes.length && (
        <ul className="data-view__list">
          {offerTypes.map((oneOfferType: TOfferType, idx: number) => (
            <OfferTypeItem
              key={oneOfferType.id}
              oneOfferType={oneOfferType}
              handleEditTypeToggle={() => handleEditTypeToggle(idx)}
              isEditType={idx === editOfferTypeId}
            />
          ))}
        </ul>
      )}

      {/* {!isOffersTypesLoading && !!offerTypes.length && (
        <div className="data-view__pagination">
          <p>pagination</p>
        </div>
      )} */}
    </div>
  );
}

export {
  OffersTypesList,
};
