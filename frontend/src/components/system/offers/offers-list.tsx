import {useState} from 'react';
import {
  selectOffers,
  selectIsOffersLoading,
  selectEditOfferId,
  setEditOfferId,
  updateAsyncOneOffer,
  createAsyncOneOffer,
  deleteAsyncOneOffer
} from '../../../store';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {TOffer, TOffers} from '../../../types';
import {
  Spinner,
  OfferItem,
  EditOffer,
} from '..';

function OffersList(): JSX.Element {
  const dispatch = useAppDispatch();
  const offers: TOffers = useAppSelector(selectOffers);
  const editOfferId: number | null = useAppSelector(selectEditOfferId);
  const isOffersLoading: boolean = useAppSelector(selectIsOffersLoading);

  const [isNewOffer, setIsNewOffer] = useState<boolean>(false);

  const handleAddOfferToggle = (): void => {
    dispatch(setEditOfferId(null));
    setIsNewOffer(!isNewOffer);
  };

  const handleEditOfferToggle = (id: number): void => {
    setIsNewOffer(false);
    id === editOfferId ? dispatch((setEditOfferId(null))) : dispatch((setEditOfferId(id)));
  };

  const onDeleteCategoryOffer = (deleteOffer: TOffer): void => {
    dispatch(deleteAsyncOneOffer(deleteOffer));
  };

  const onChangeCategoryOffer = (updatedCategoryOffer: TOffer): void => {
    const index: number = offers.findIndex((oneCategoryOffer: TOffer): boolean => oneCategoryOffer.id === updatedCategoryOffer.id);
    if (index === - 1) {
      dispatch(createAsyncOneOffer(updatedCategoryOffer));
      setIsNewOffer(false);
      return;
    }

    dispatch(updateAsyncOneOffer(updatedCategoryOffer));
  };

  return (
    <div className="data-view">
      <div className="data-view__header">
        <h2 className="data-view__title">Offers</h2>
        <button
          className={isNewOffer ? 'sys-btn sys-btn--warning' : 'sys-btn'}
          onClick={handleAddOfferToggle}
          type='button'
        >
          {isNewOffer ? 'Cancel' : 'Add'}
        </button>
      </div>

      {isNewOffer && (
        <div className="data-view__decor-form">
          <EditOffer
            offerId={''}
            categoryOffer={{id: '', type: '', offers: []}}
            onChangeCategoryOffer={onChangeCategoryOffer}
          />
        </div>
      )}

      {isOffersLoading && <Spinner />}
      {!isOffersLoading && !offers.length && !isNewOffer && (
        <div className="data-view__empty">
          <p> No offers</p>
        </div>
      )}

      {!!offers.length && (
        <ul className="data-view__list">
          {offers.map((categoryOffer: TOffer, id: number) => (
            <OfferItem
              key={categoryOffer.type}
              categoryOffer={categoryOffer}
              onEditOfferToggle={() => handleEditOfferToggle(id)}
              isEditOffer={id === editOfferId}
              onDeleteCategoryOffer={onDeleteCategoryOffer}
              onChangeCategoryOffer={onChangeCategoryOffer}
            />
          ))}
        </ul>
      )} 

      {/*{!isOffersLoading && !!offers.length && (*/}
      {/*  <div className="data-view__pagination">*/}
      {/*    <p>pagination</p>*/}
      {/*  </div>*/}
      {/*)}*/}
    </div>
  )
}

export {
  OffersList,
};
