import { useContext } from "react";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import './NavMobile.css';

const NavMobile = ({ loggedIn, isHomeRendered, isHeaderExpanded, onLogout, onSignInClick }) => {
  
  const currentUser = useContext(CurrentUserContext);
  
  return(
    <div className={isHeaderExpanded ? 'overlay':''}>
      <nav className={`nav-mobile ${isHeaderExpanded ? 'nav-mobile_visible':''} ${isHomeRendered ? 'nav-mobile_dark':'nav-mobile_light'}`}>
        <Link className={`nav-mobile__link ${isHomeRendered ? 'nav-mobile__link_light':''}`}  to="/" >Home</Link>
        { loggedIn ?
        <div className='nav-mobile__flex-container'>
          <Link className={`nav-mobile__link ${isHomeRendered ? 'nav-mobile__link_light':''}`} to="/saved-news" >Saved articles</Link>
          <button className={`nav-mobile__link nav-mobile__link_type_logout ${isHomeRendered ? 'nav-mobile__link_decor_light':''}`} 
            onClick={onLogout} 
          >
            <p className="nav-mobile__username">{currentUser.name}</p>
            <div className={`nav-mobile__icon-logout ${isHomeRendered ? 'nav-mobile__icon-logout_light':''}`}></div>
          </button>
        </div>
        :
          <button className="nav-mobile__button-login" onClick={onSignInClick} type="button" aria-label="Sign in">Sign in</button>
      }
      </nav>
    </div>
  );
}

export default NavMobile;
