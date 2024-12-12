import {toast} from 'react-toastify';
import {Helmet} from 'react-helmet-async';
import {useGoogleReCaptcha} from 'react-google-recaptcha-v3';
import {FormikErrors, useFormik} from 'formik';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {recoveryPassword, selectIsRegistrationSuccess} from '../../store';
import {IRecoveryPasswordInfo} from '../../types';
import {CustomInput, SuccessIcon} from '../../components';
import {REG_EXP_EMAIL} from '../../utils';

const validate = (values: IRecoveryPasswordInfo) => {
  const errors: FormikErrors<IRecoveryPasswordInfo> = {};

  if (!values.email) {
    errors.email = 'Required';
  } else if (!REG_EXP_EMAIL.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
}

function  RecoveryPasswordPage(): JSX.Element {
  const isRegistrationSuccess = useAppSelector(selectIsRegistrationSuccess)
  const dispatch = useAppDispatch();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const formik = useFormik<IRecoveryPasswordInfo>({
    initialValues: {
      email: '',
      gReCaptchaToken: '',
    },
    validate,
    onSubmit: async (values: IRecoveryPasswordInfo): Promise<void> => {
      if (!executeRecaptcha) {
        toast.warn('Recaptcha has not been loaded', {position: toast.POSITION.TOP_CENTER});
        return;
      }

      try {
        values.gReCaptchaToken = await executeRecaptcha('recoveryPassword');
        dispatch(recoveryPassword(values));
      } catch (error) {
        toast.error('Invalid site key or not loaded', {position: toast.POSITION.TOP_CENTER});
      }
    }
  });

  return (
    <>
      <Helmet>
        <title>Big trip - Recovery Password Page</title>
        <meta name="description" content="Recovery Password Big Trip - Modern service for real travelers" />
      </Helmet>

      <main className="page-auth">
        <div className="page-auth__wrapper">
          {!isRegistrationSuccess && (
            <div className="page-auth__form auth-form">
              <div className="auth-form__wrapper">
                <h1 className="title-h1">Restore password</h1>
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
                    <button
                      className="auth-form__btn"
                      type="submit"
                      disabled={!formik.isValid}
                    >Recover</button>
                  </div>

                </form>
              </div>

            </div>
          )}

          {isRegistrationSuccess && (
            <div className="auth-form__account-success">
              <h2 className="title-h2">Link for account recovery is sent to email {formik.values.email}</h2>
              <p className="auth-form__text">Check mailbox and follow the link in the message to complete password restoration</p>
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
  RecoveryPasswordPage,
};
