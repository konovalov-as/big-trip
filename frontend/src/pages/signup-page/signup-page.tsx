import {toast} from 'react-toastify';
import {FC, useState} from 'react';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import { useFormik, FormikErrors } from 'formik';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {selectIsRegistrationSuccess, registration} from '../../store';
import {IRegistrationInfo} from '../../types';
import {AppRoute, REG_EXP_EMAIL} from '../../utils';
import {
  CustomInput,
  SuccessIcon,
  ToggleShownPassButton,
} from '../../components';

const validate = (values: IRegistrationInfo) => {
  const errors: FormikErrors<IRegistrationInfo> = {};

  if (!values.email) {
    errors.email = 'Required';
  } else if (!REG_EXP_EMAIL.test(values.email)) {
    errors.email = 'Invalid email address';
  }

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

const SignupPage: FC = () => {
  const isRegistrationSuccess: boolean = useAppSelector(selectIsRegistrationSuccess);
  const dispatch = useAppDispatch();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const formik= useFormik<IRegistrationInfo>({
    initialValues: {
      email: '',
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
        values.gReCaptchaToken = await executeRecaptcha('registration');
        dispatch(registration(values));
      } catch (error) {
        toast.error('Invalid site key or not loaded', {position: toast.POSITION.TOP_CENTER});
      }
    },
  });

  const [isShownPassword, setIsShownPassword] = useState<boolean>(false);
  const handleShowPassword = (isUpdatedShownPassword: boolean) => {
    setIsShownPassword(isUpdatedShownPassword);
  };

  return (
    <>
      <Helmet>
        <title>Big trip - Signup Page</title>
        <meta name="description" content="Registration Big Trip - Modern service for real travelers"/>
      </Helmet>
      <main className="page-auth">
        <div className="page-auth__wrapper">
          {!isRegistrationSuccess && (
            <div className="page-auth__form auth-form">
              <div className="auth-form__wrapper">
              <h1 className="title-h1">Registration</h1>
                <form
                  action="#"
                  method="post"
                  onSubmit={formik.handleSubmit}
                >
                  <div className="auth-form__row">
                    <CustomInput
                      customInputId="email"
                      name="email"
                      type="email"
                      label="Email"
                      value={formik.values.email}
                      isTouched={formik.touched.email}
                      errorMessage={formik.errors.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>

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
                    >Sign up</button>
                  </div>

                </form>
              </div>

              <p className="auth-form__account">
                <span className="auth-form__account-text">Are you already registered?</span>
                <Link to={`${AppRoute.Auth}/${AppRoute.Login}`} className="auth-form__account-link">
                  Login
                </Link>
              </p>
            </div>
          )}

          {isRegistrationSuccess && (
            <div className="auth-form__account-success">
              <h2 className="title-h2">Link for account activation is sent to email {formik.values.email}</h2>
              <p className="auth-form__text">Check mailbox and follow the link in the message to complete</p>
              <p className="auth-form__text">Maybe message got into the spam folder</p>
              <div className="auth-form__icon">
                <SuccessIcon />
              </div>
            </div>
          )}

        </div>
      </main>
    </>
  );
}

export {
  SignupPage,
};
