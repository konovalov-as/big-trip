import React, {ReactNode, useState} from 'react';
import {Link} from 'react-router-dom';
import {useAppDispatch} from '../hooks';
import {logout} from '../store';
import {AppRoute} from '../utils';
import {Logo} from '../components';

interface ISystemLayoutProps {
  children?: ReactNode;
}

function SystemLayout({ children }: ISystemLayoutProps): JSX.Element {
  const dispatch = useAppDispatch();
  const handleLogout = (evt: React.MouseEvent<HTMLButtonElement>) =>  {
    evt.preventDefault();
    dispatch(logout());
  };

  const [isOpenSystemNav, setIsOpenSystemNav] = useState<boolean>(false);

  // const body = document.querySelector('body') as HTMLBodyElement;
  // isOpenSystemNav ? body.classList.add('scroll-lock') : body.classList.remove('scroll-lock');

  const handleClickNav = (): void => {
    setIsOpenSystemNav(!isOpenSystemNav);
  }

  return (
    <div className="page-system">
      <header className="page-system__header system-header">
        <div className="system-header__row-1">
          <Logo />
          <p className="system-header__title">Big Trip Admin</p>
        </div>
      </header>

      <button
        className={`system-nav-toggle ${isOpenSystemNav ? 'is-active' : ''} `}
        onClick={() => setIsOpenSystemNav(!isOpenSystemNav)}
        type="button"
        aria-label="Toggle System Menu"
      >
        <span className="system-nav-toggle__wrapper">
          <span className="system-nav-toggle__item"></span>
          <span className="system-nav-toggle__item"></span>
          <span className="system-nav-toggle__item"></span>
        </span>
      </button>

      <nav className={`system-nav ${isOpenSystemNav ? 'is-active' : ''} `}>
        <div className="system-nav__wraper">
          <div className="system-nav__inner">
            <ul className="system-nav__list" onClick={handleClickNav}>
              <li className="system-nav__item">
                <Link className="system-nav__link" to={AppRoute.System} onClick={handleClickNav}>Home</Link>
              </li>
              <li className="system-nav__item">
                <Link className="system-nav__link" to={AppRoute.Types} onClick={handleClickNav}>Types</Link>
              </li>
              <li className="system-nav__item">
                <Link className="system-nav__link" to={AppRoute.Offers} onClick={handleClickNav}>Offers</Link>
              </li>
              <li className="system-nav__item">
                <Link className="system-nav__link" to={AppRoute.Cities} onClick={handleClickNav}>Cities</Link>
              </li>
              <li className="system-nav__item">
                <Link className="system-nav__link" to={AppRoute.Destinations} onClick={handleClickNav}>Destinations</Link>
              </li>
              <li className="system-nav__item">
                <Link className="system-nav__link" to={AppRoute.Users} onClick={handleClickNav}>Users</Link>
              </li>
              <li className="system-nav__item">
                <Link className="system-nav__link" to={AppRoute.Files} onClick={handleClickNav}>Files</Link>
              </li>
              <li className="system-nav__item">
                <button
                  onClick={handleLogout}
                  className="system-nav__link"
                  type="button"
                >Logout
                </button>
              </li>
              <li className="system-nav__item">
                <Link className="system-nav__link" to={AppRoute.Main}>Main</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="system-nav__overlay"></div>
      </nav>


      <main className="system-main">
        <div className="system-main__wrapper">
          <div className="system-main__content">
            {children}
          </div>
        </div>
      </main>

      <footer className="system-footer">
        <div className="system-footer__wrapper">
          <div className="system-footer__content">
            <Logo />
            <p className="system-footer__copyright">
              © Big Trip {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export {
  SystemLayout,
};
