import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import NavMobile from '../NavMobile/NavMobile';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './Header.css';


const Header = ({ loggedIn, isHomeRendered, onLogout, isHeaderExpanded, onExpandHeader, 
  onSignInClick, onRemoveHeaderMobile, isLoginPopupOpen, isRegisterPopupOpen, isInfoTooltipOpen }) => {

  const currentUser = useContext(CurrentUserContext);

  return (
    <header className={`header ${!isHomeRendered ? 'header_border_dark':''} ${isHeaderExpanded && isHomeRendered ? 'header_dark':''}`}>
      <div className={`header__container ${isLoginPopupOpen||isRegisterPopupOpen||isInfoTooltipOpen ? 'header__container_mobile':''}`}>
        <NavLink className="header__link header__link_type_logo" 
          activeClassName="header__link_active" 
          to='/' 
          exact={true}
        >
          NewsExplorer
        </NavLink>
        <Navigation
          loggedIn={loggedIn}
          currentUser={currentUser}
          isHomeRendered={isHomeRendered}
          onLogout={onLogout}
          onSignInClick={onSignInClick}
        />
        <button className="header__expand-btn" onClick={onExpandHeader} type="button" aria-label="expand navigation bar">
          <svg className="header__expand-icon">
            <title>Navigation button icon</title>
            <rect x="4" y="8" className={`header__expand-rect ${isHeaderExpanded? 'header__expand-rect_top':''} ${isHomeRendered ? 'header__expand-rect_light':''}`}/>
            <rect x="4" y="14" className={`header__expand-rect ${isHeaderExpanded? 'header__expand-rect_bottom':''} ${isHomeRendered ? 'header__expand-rect_light':''}`}/>
          </svg>
        </button>
      </div>
      <NavMobile 
        loggedIn={loggedIn}
        currentUser={currentUser}
        isHomeRendered={isHomeRendered}
        isHeaderExpanded={isHeaderExpanded}
        onLogout={onLogout}
        onSignInClick={onSignInClick}
        onRemoveHeaderMobile={onRemoveHeaderMobile}
      />
    </header>
  );
} 

export default Header;