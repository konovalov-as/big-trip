import {EditOffer} from '..';
import {TOffer, TOfferDetail} from '../../../types';
import {EditIcon, DeleteIcon} from '../../icons';

interface IOfferItemProps {
  categoryOffer: TOffer;
  onEditOfferToggle: CallableFunction;
  isEditOffer: boolean;
  onDeleteCategoryOffer: (deleteOffer: TOffer) => void;
  onChangeCategoryOffer: (updatedCategoryOffer: TOffer) => void;
}

function OfferItem({
                     categoryOffer,
                     onEditOfferToggle,
                     isEditOffer,
                     onDeleteCategoryOffer,
                     onChangeCategoryOffer,
}: IOfferItemProps): JSX.Element {
  const handleDeleteOffer = (): void => {
    onDeleteCategoryOffer(categoryOffer);
  };

  return (
    <li
      className={`data-view__item ${isEditOffer ? 'data-view__item--edit' : ''}`}
    >
      {!isEditOffer && (
        <>
          <div className="data-view__item-wrap offers">
            <h3 className="offers__title">{categoryOffer.type.charAt(0).toUpperCase() + categoryOffer.type.slice(1)}</h3>
            <ul className="offers__list">
              {categoryOffer.offers.map((offer: TOfferDetail) => (
                <li
                  key={offer.id}
                  className="offers__item"
                >
                  <span className="offers__subtitle">{offer.title}</span>
                  <span className="offers__price">${offer.price}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="data-view__action data-view__action--type-1">
            <button
              className="sys-btn"
              onClick={() => onEditOfferToggle()}
              type="button"
              aria-label="Edit offer"
            >
              <EditIcon />
            </button>
            <button
              className="sys-btn sys-btn--warning"
              onClick={handleDeleteOffer}
              type="button"
              aria-label="Delete offer"
            >
              <DeleteIcon />
            </button>
          </div>
        </>
      )}

      {isEditOffer && (
        <EditOffer
          offerId={categoryOffer.id}
          categoryOffer={categoryOffer}
          onChangeCategoryOffer={onChangeCategoryOffer}
        />
      )}
    </li>
  )
}

export {
  OfferItem,
};
