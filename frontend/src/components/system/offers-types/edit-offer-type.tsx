import {MouseEvent} from 'react';
import {useAppDispatch} from '../../../hooks';
import {
  createAsyncOfferType,
  setEditOfferTypeId,
  updateAsyncOfferType,
} from '../../../store';
import {CustomInput} from '../../custom-input/custom-input';
import {SaveIcon, CloseIcon} from '../../icons';
import {FormikErrors, useFormik} from 'formik';

interface IEditOfferTypeProps {
  offerTypeId: string,
  offerTypeValue: string,
}

interface IEditOfferTypeValue {
  offerType: string,
}

const validate = (values: IEditOfferTypeValue) => {
  const errors: FormikErrors<IEditOfferTypeValue> = {};

  if (!values.offerType.trim()) {
    errors.offerType = 'Required';
  }

  return errors;
}

function EditOfferType({ offerTypeId, offerTypeValue }: IEditOfferTypeProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleCancelChanging = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(setEditOfferTypeId(null));
  };

  const formik = useFormik<IEditOfferTypeValue>({
    initialValues: {
      offerType: offerTypeValue,
    },
    validate,
    onSubmit: (values: IEditOfferTypeValue, {resetForm}) => {
      if (offerTypeId) {
        dispatch(updateAsyncOfferType({type: values.offerType.trim().toLowerCase(), id: offerTypeId} ));
        dispatch(setEditOfferTypeId(null));
        return;
      }
      dispatch(createAsyncOfferType({type: values.offerType.trim().toLowerCase(), id: offerTypeId} ));
      resetForm();
    },
  });

  return (
    <>
      <div className="data-view__form">
        <form
          onSubmit={formik.handleSubmit}
        >
          <div className="data-view__field-group">
            <div className="data-view__row">
              <CustomInput
                customInputId="offerType"
                name="offerType"
                type="text"
                label="Offer type"
                value={formik.values.offerType}
                isTouched={formik.touched.offerType}
                errorMessage={formik.errors.offerType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>

          <div className="data-view__action">
            {offerTypeId && (
              <button
                onClick={handleCancelChanging}
                className="sys-btn sys-btn--outlined"
                type="button"
                aria-label="Cancel to save offer type"
              >
                <CloseIcon />
              </button>
            )}
            <button
              className="sys-btn"
              type="submit"
              aria-label="Save offer type"
              disabled={!formik.isValid}
            >
              <SaveIcon />
            </button>
          </div>

        </form>
      </div>
    </>
  );
}

export {
  EditOfferType,
};
