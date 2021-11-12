import { Link } from "react-router-dom";
import './NavMobile.css';

const NavMobile = ({ loggedIn, isHomeRendered, isHeaderExpanded, onLogout, onSignInClick, onRemoveHeaderMobile}) => {

  return(
    <div className={isHeaderExpanded ? 'overlay':''}>
      <nav className={`nav-mobile ${isHeaderExpanded ? 'nav-mobile_visible':''} ${isHomeRendered ? 'nav-mobile_dark':'nav-mobile_light'}`}>
        <Link className={`nav-mobile__link ${isHomeRendered ? 'nav-mobile__link_light':''}`}  to="/" >Home</Link>
        { loggedIn ?
        <div className='nav-mobile__flex-container'>
          <Link className={`nav-mobile__link ${isHomeRendered ? 'nav-mobile__link_light':''}`} to="/saved-news" >Saved articles</Link>
          <Link className={`nav-mobile__link nav-mobile__link_type_logout ${isHomeRendered ? 'nav-mobile__link_decor_light':''}`} 
            onClick={onLogout} 
            to="/"
          >
            <p className="nav-mobile__username">Elise</p>
            <div className={`nav-mobile__icon-logout ${isHomeRendered ? 'nav-mobile__icon-logout_light':''}`}></div>
          </Link>
        </div>
        :
          <button className="nav-mobile__button-login" onClick={onSignInClick} type="button" aria-label="Sign in">Sign in</button>
      }
      </nav>
    </div>
  );
}

export default NavMobile;
