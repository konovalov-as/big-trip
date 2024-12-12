import {
  TOfferDetail,
  TOffer,
  TOffersTypes,
  TOfferType,
  TOffers, TAppDispatch,
} from '../../../types';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {
  selectOffers,
  selectOffersTypes,
  setEditOfferId,
} from '../../../store';
import {MouseEvent, useEffect, useState} from 'react';
import {SaveIcon, CloseIcon, AddFileIcon} from '../../icons';
import { EditOfferDetail } from './edit-offer-detail';
import {CustomSelect} from '../../custom-select/custom-select.tsx';
import {FormikErrors, useFormik} from 'formik';
import {v4 as uuidv4} from 'uuid';

interface IOneOption {
  key: string;
  value: string;
}

interface IEditOfferProps {
  offerId: string,
  categoryOffer: TOffer,
  onChangeCategoryOffer: (updatedCategoryOffer: TOffer) => void;
}

const validate = (values: TOffer) => {
  const errors: FormikErrors<TOffer> = {};

  if (!values.type.trim()) {
    errors.type = 'Required';
  }

  return errors;
};

function EditOffer({
                     offerId,
                     categoryOffer,
                     onChangeCategoryOffer,
                   }: IEditOfferProps): JSX.Element {
  const formik = useFormik<TOffer>({
    initialValues: {
      id: categoryOffer.id,
      type: categoryOffer.type,
      offers: categoryOffer.offers,
    },
    validate,
    onSubmit: (values: TOffer): void => {
      const updatedCategoryOffer: TOffer = {
        id: categoryOffer.id,
        type: values.type,
        offers: offersDetail,
      }
      onChangeCategoryOffer(updatedCategoryOffer);
      dispatch(setEditOfferId(null));
    }
  });

  const dispatch: TAppDispatch = useAppDispatch();
  const offersTypes: TOffersTypes = useAppSelector(selectOffersTypes);
  const offers: TOffers = useAppSelector(selectOffers);

  const [availableOffersTypes, setAvailableOffersTypes] = useState<TOffersTypes>([]);
  const [offersDetail, setOffersDetail] = useState<TOfferDetail[]>(categoryOffer.offers);

  const offersTypesOptions: IOneOption[] = availableOffersTypes.map((oneOfferType: TOfferType): IOneOption => ({
    key: oneOfferType.id,
    value: oneOfferType.type,
  }));

  const handleCancelChanging = (evt: MouseEvent<HTMLButtonElement>): void => {
    evt.preventDefault();
    dispatch(setEditOfferId(null));
  };

  const onAddOfferDetailItem = (updatedOfferDetail: TOfferDetail): void => {
    const index: number = offersDetail.findIndex((oneOffer: TOfferDetail): boolean => oneOffer.id === updatedOfferDetail.id);
    if (index === -1) {
      setOffersDetail([...offersDetail, updatedOfferDetail]);
      return;
    }
    setOffersDetail([...offersDetail.slice(0, index), updatedOfferDetail, ...offersDetail.slice(index + 1)]);
  }

  const onDeleteOfferDetailItem = (offerDetailId: string): void => {
    const updatedOffersDetail: TOfferDetail[] = offersDetail.filter((oneOffer) => oneOffer.id !== offerDetailId)
    setOffersDetail(updatedOffersDetail);
  }

  const handleAddNewOfferDetailItem = (): void => {
    const emptyOfferDetail: TOfferDetail = {
      id: uuidv4(),
      title: '',
      price: 0,
    };
    setOffersDetail([...offersDetail, emptyOfferDetail]);
  }

  useEffect((): void => {
    const filteredOfferTypes: TOfferType[] = offersTypes.filter((oneOfferType: TOfferType) =>
      !offers.some((oneOffer: TOffer): boolean => oneOffer.type === oneOfferType.type)
    );
    setAvailableOffersTypes(filteredOfferTypes);
    if (categoryOffer.type) {
      setAvailableOffersTypes((prevState: TOffersTypes) => [categoryOffer, ...prevState]);
    }
  }, [offers, offersTypes, categoryOffer]);

  return (
    <div className="data-view__form">
      <form
        onSubmit={formik.handleSubmit}
      >
        <div className="data-view__filed-group">
          <div className="data-view__row">
            <CustomSelect
              customInputId='type'
              name='type'
              label='Offer type'
              isTouched={formik.touched.type}
              errorMessage={formik.errors.type}
              options={offersTypesOptions}
              value={formik.values.type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className="data-view__row">
            <ul className="data-view__edit-list">
              {offersDetail.map((oneOfferDetail: TOfferDetail) => (
                <EditOfferDetail
                  key={oneOfferDetail.id}
                  offerDetail={oneOfferDetail}
                  onAddOfferDetailItem={onAddOfferDetailItem}
                  onDeleteOfferDetailItem={onDeleteOfferDetailItem}
                />
              ))}
            </ul>
          </div>
        </div>

        <div className="data-view__action">
          {offerId && (
            <button
              onClick={handleCancelChanging}
              className="sys-btn sys-btn--outlined"
              type="button"
              aria-label="Cancel to save offer"
            >
              <CloseIcon />
            </button>
          )}
          <button
            onClick={handleAddNewOfferDetailItem}
            className="sys-btn sys-btn--success"
            type="button"
            aria-label="Add new offer option"
          >
            <AddFileIcon />
          </button>
          <button
            className="sys-btn"
            type="submit"
            aria-label="Save offer"
            // disabled={!formik.isValid}
          >
            <SaveIcon />
          </button>
        </div>
      </form>
    </div>
  );
}

export {
  type IOneOption,
  EditOffer,
};
