import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = ({ loggedIn, isHomeRendered }) => {
  /* const linkModifier = isHomeRendered ? "header__link_type_home" : ''; */
 
  return (
    <header className="header">
      <p className={`header__logo ${isHomeRendered ? 'header__logo_page_home' : ''}`}>NewsExplorer</p>
      <nav className="header__navbar">
          <NavLink className="header__link" activeClassName="header__link_active_home" to="/" exact={true}>Home</NavLink>
          { loggedIn ?
            <>
              <NavLink className={`header__link header__link_type_saved ${isHomeRendered ? "header__link_inactive" : ''}`} activeClassName="header__link_active_saved" to="/saved-news" >Saved articles</NavLink>
              <NavLink className={`header__link header__link_type_logout ${isHomeRendered ? "header__link_page_home" : 'header__link_page_saved'}`} to="/" >
                <p className={`header__username ${isHomeRendered ? 'header__username_page_home' : ''}`}>Elise</p>
                <div className={`header__icon-logout ${isHomeRendered ? 'header__icon-logout_page_home' : ''}`}></div>
              </NavLink>
            </>
            :
              <button className="header__button-login">Sign in</button>
          }
        </nav>
    </header>
  );
} 

export default Header;