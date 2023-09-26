import React, { useState } from 'react';
import axios from 'axios';
import ButtonSecondary from '../components/ButtonSecondary';
import Loader from '../components/Loader/Loader';
import useAuth from '../hook/useAuth';
import Notiflix from 'notiflix';
import css from '../components/RegistrationForm/RegistrationForm.module.css';
import logo from '../utils/Svg/logo.svg';
import RegistrationForm from '../components/RegistrationForm/RegistrationForm';
import frameTablet from '../utils/frame-registration/frame-tablet.png';
import frameDesk from '../utils/frame-registration/frame-desktop.png';

const Registration = () => {
  const { user, isRegistered } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const resend = async () => {
    try {
      setIsLoading(true);
      await axios.post('https://wallet-api.cyclic.cloud/api/users/reverify', {
        email: user.email,
      });
      Notiflix.Notify.success('Verification email has been resend');
    } catch {
      Notiflix.Notify.failure('Sorry, the email could not be resend');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={css.registerContainer}>
        <div className={css.desktopContainer}>
          <img src={frameDesk}></img>
          <span className={css.finance}>Finance App</span>
        </div>
        <div className={css.tabletContainer}>
          <img src={frameTablet}></img>
          <span className={css.finance}>Finance App</span>
        </div>
        <div className={css.registerWrapper}>
          <div className={css.logoContainer}>
            <img className={css.logo} src={logo} alt="wallet-logo"></img>
          </div>
          <RegistrationForm />
          <div className={css.spacingBt}></div>
          {isRegistered && (
            <ButtonSecondary
              text="Resend verification E-mail"
              onClick={resend}
            ></ButtonSecondary>
          )}
        </div>
      </div>
      <Loader isVisible={isLoading} />
    </>
  );
};

export default Registration;
