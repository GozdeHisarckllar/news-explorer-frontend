import { NavLink } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import './Header.css';

const Header = ({ loggedIn, isHomeRendered, onLogout }) => {
  /* const linkModifier = isHomeRendered ? "header__link_type_home" : ''; */
 
  return (
    <header className="header">
      <div className="header__container">
        <NavLink className="header__link header__link_type_logo" 
          activeClassName="header__link_active" 
          to='/' 
          exact={true}
        >
          NewsExplorer
        </NavLink>
        <Navigation
          loggedIn={loggedIn}
          isHomeRendered={isHomeRendered}
          onLogout={onLogout}
        />
      </div>
    </header>
  );
} 

export default Header;