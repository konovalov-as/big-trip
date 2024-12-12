import React from 'react';
import {FormikErrors, useFormik} from 'formik';
import {useAppDispatch} from '../../../hooks';
import {createAsyncCity, updateAsyncCity, setEditCityId,} from '../../../store';
import {SaveIcon, CloseIcon} from '../../icons';
import {TCity} from '../../../types';
import {CustomInput} from '../../custom-input/custom-input.tsx';

interface IEditCityProps {
  cityId: string,
  cityValue: string,
}

const validate = (values: TCity) => {
  const errors: FormikErrors<TCity> = {};

  if (!values.name.trim()) {
    errors.name = 'Required';
  }

  return errors;
}

function EditCity({cityId, cityValue}: IEditCityProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleCancelChanging = (evt: React.MouseEvent<HTMLButtonElement>): void => {
    evt.preventDefault();
    dispatch(setEditCityId(null));
  };

  const formik = useFormik<TCity>({
    initialValues: {
      name: cityValue,
      id: '',
    },
    validate,
    onSubmit: (values: TCity, {resetForm}): void => {
      if (cityId) {
        dispatch(updateAsyncCity({name: values.name.charAt(0).toUpperCase() + values.name.slice(1).toLowerCase(), id: cityId}));
        dispatch(setEditCityId(null));
        return;
      }

      dispatch(createAsyncCity({name: values.name.charAt(0).toUpperCase() + values.name.slice(1).toLowerCase(), id: cityId}));
      resetForm();
    }
  });

  return (
    <div className="data-view__form">
      <form
        onSubmit={formik.handleSubmit}
      >
        <div className="data-view__field-group">
          <div className="data-form__row">
            <CustomInput
              customInputId="city"
              name="name"
              type="text"
              label="City"
              value={formik.values.name}
              isTouched={formik.touched.name}
              errorMessage={formik.errors.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
        </div>

        <div className="data-view__action">
          {cityId && (
            <button
              onClick={handleCancelChanging}
              className="sys-btn sys-btn--outlined"
              type="button"
              aria-label="Cancel to save city"
            >
              <CloseIcon />
            </button>
          )}
          <button
            className="sys-btn"
            type="submit"
            aria-label="Save city"
            disabled={!formik.isValid}
          >
            <SaveIcon />
          </button>
        </div>
        
      </form>
    </div>
  );
}

export {
  EditCity,
};
