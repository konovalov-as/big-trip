import {toast} from 'react-toastify';
import {useState} from 'react';
import {useGoogleReCaptcha} from 'react-google-recaptcha-v3';
import {useParams} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import {useFormik, FormikErrors} from 'formik';
import {useAppDispatch} from '../../hooks';
import {setNewPassword} from '../../store';
import {INewPasswordInfo} from '../../types';
import {CustomInput, ToggleShownPassButton,} from '../../components';

const validate = (values: INewPasswordInfo) => {
  const errors: FormikErrors<INewPasswordInfo> = {};

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 8) {
    errors.password = 'Must be at least 8 characters long';
  }

  if (!values.confirmedPassword) {
    errors.confirmedPassword = 'Please confirm your password';
  } else if (values.password !== values.confirmedPassword) {
    errors.confirmedPassword = 'Passwords must match';
  }

  return errors;
};

function SetNewPasswordPage(): JSX.Element {
  const { link } = useParams();
  const dispatch = useAppDispatch();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const formik= useFormik<INewPasswordInfo>({
    initialValues: {
      resetLink: link || '',
      password: '',
      confirmedPassword: '',
      gReCaptchaToken: '',
    },
    validate,
    onSubmit: async (values): Promise<void> => {
      if (!executeRecaptcha) {
        toast.warn('Recaptcha has not been loaded', {position: toast.POSITION.TOP_CENTER});
        return;
      }

      try {
        values.gReCaptchaToken = await executeRecaptcha('setNewPassword');
        dispatch(setNewPassword(values));
      } catch (error) {
        toast.error('Invalid site key or not loaded', {position: toast.POSITION.TOP_CENTER});
      }
    },
  });

  const [isShownPassword, setIsShownPassword] = useState<boolean>(false);
  const handleShowPassword = (isUpdatedShownPassword: boolean): void => {
    setIsShownPassword(isUpdatedShownPassword);
  };

  return (
    <>
      <Helmet>
        <title>Big trip - Change Password Page</title>
        <meta name="description" content="Change Password Big Trip - Modern service for real travelers" />
      </Helmet>
      <main className="page-auth">
        <div className="page-auth__wrapper">
          <div className="page-auth__form auth-form">
            <div className="auth-form__wrapper">
              <h1 className="title-h1">Change password</h1>
              <form
                action="#"
                method="post"
                onSubmit={formik.handleSubmit}
              >
                <div className="auth-form__row">
                  <CustomInput
                    customInputId="password"
                    name="password"
                    type={`${!isShownPassword ? 'password' : 'text'}`}
                    label="Password"
                    value={formik.values.password.trim()}
                    isTouched={formik.touched.password}
                    errorMessage={formik.errors.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    optionalButton={<ToggleShownPassButton onChangeIsShownPassword={handleShowPassword} />}
                  />
                </div>

                <div className="auth-form__row">
                  <CustomInput
                    customInputId="confirmedPassword"
                    name="confirmedPassword"
                    type={`${!isShownPassword ? 'password' : 'text'}`}
                    label="Confirmed password"
                    value={formik.values.confirmedPassword.trim()}
                    isTouched={formik.touched.confirmedPassword}
                    errorMessage={formik.errors.confirmedPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    optionalButton={<ToggleShownPassButton onChangeIsShownPassword={handleShowPassword} />}
                  />
                </div>

                <div className="auth-form__row">
                  <button
                    className="auth-form__btn"
                    type="submit"
                    disabled={!formik.isValid}
                  >Change password</button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export {
  SetNewPasswordPage,
};
