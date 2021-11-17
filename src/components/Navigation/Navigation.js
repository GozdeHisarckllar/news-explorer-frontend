import { NavLink } from 'react-router-dom';
import './Navigation.css';

const Navigation = ({ loggedIn, currentUser, isHomeRendered, onLogout, onSignInClick}) => {
  return(
    <nav className="navbar">
      <NavLink className="navbar__link" activeClassName="navbar__link_active_home border" to="/" exact={true}>Home</NavLink>
      { loggedIn ?
        <>
          <NavLink className={`navbar__link navbar__link_type_saved ${isHomeRendered ? "navbar__link_inactive" : ''}`} 
            activeClassName="navbar__link_active_saved" to="/saved-news" >
              Saved articles
          </NavLink>
          <NavLink className={`navbar__link navbar__link_type_logout ${isHomeRendered ? "navbar__link_page_home" : 'navbar__link_page_saved'}`}
            onClick={onLogout}
            to="/"
          >
            <p className={`navbar__username ${isHomeRendered ? 'navbar__username_page_home' : ''}`}>{currentUser.name}</p>
            <div className={`navbar__icon-logout ${isHomeRendered ? 'navbar__icon-logout_page_home' : ''}`}></div>
          </NavLink>
        </>
        :
          <button className={`navbar__button-login ${isHomeRendered ? 'navbar__button-login_page_home' : ''}`} onClick={onSignInClick} 
            type="button" aria-label="Sign in">
             Sign in
          </button>
      }
    </nav>
  );
}

export default Navigation;