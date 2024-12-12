import {toast} from 'react-toastify';
import {FormikErrors, useFormik} from 'formik';
import {FC, Fragment, useState} from 'react';
import {Link} from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {useGoogleReCaptcha} from 'react-google-recaptcha-v3';
import {AppRoute, REG_EXP_EMAIL} from '../../utils';
import {useAppDispatch} from '../../hooks';
import {login} from '../../store';
import {ILoginInfo} from '../../types';
import {CustomInput, ToggleShownPassButton} from '../../components';

const validate = (values: ILoginInfo) => {
  const errors: FormikErrors<ILoginInfo> = {};

  if (!values.email) {
    errors.email = 'Required';
  } else if (!REG_EXP_EMAIL.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Required';
  }

  return errors;
};

const LoginPage: FC = () => {
  const dispatch = useAppDispatch();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const formik = useFormik<ILoginInfo>({
    initialValues: {
      email: '',
      password: '',
      gReCaptchaToken: '',
    },
    validate,
    onSubmit: async (values: ILoginInfo): Promise<void> => {
      if (!executeRecaptcha) {
        toast.warn('Recaptcha has not been loaded', {position: toast.POSITION.TOP_CENTER});
        return;
      }

      try {
        values.gReCaptchaToken = await executeRecaptcha('login');
        dispatch(login(values));
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
    <Fragment>
      <Helmet>
        <title>Big trip - Login Page</title>
        <meta name="description" content="Login Big Trip - Modern service for real travelers"/>
      </Helmet>
      <main className="page-auth">
        <div className="page-auth__wrapper">
          <div className="page-auth__form auth-form">
            <div className="auth-form__wrapper">
              <h1 className="title-h1">Login</h1>
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
                    value={formik.values.email.trim()}
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
                  <p className="auth-form__account">
                    <Link to={`${AppRoute.Auth}/${AppRoute.RecoveryPassword}`} className="auth-form__account-link">
                      Did you forget password?
                    </Link>
                  </p>
                </div>

                <div className="auth-form__row">
                  <button
                    className="auth-form__btn"
                    type="submit"
                    disabled={!formik.isValid}
                  >Login</button>
                </div>
              </form>
            </div>

            <p className="auth-form__account">
              <span className="auth-form__account-text">Do not have account?</span>
              <Link to={`${AppRoute.Auth}/${AppRoute.Signup}`} className="auth-form__account-link">
                Registration
              </Link>
            </p>

          </div>
        </div>
      </main>
    </Fragment>
  );
}

export {
  LoginPage,
};
