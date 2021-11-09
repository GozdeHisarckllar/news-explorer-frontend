import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import Navigation from '../Navigation/Navigation';
import './Header.css';

const Header = ({ loggedIn, isHomeRendered, onLogout }) => {
  /* const linkModifier = isHomeRendered ? "header__link_type_home" : ''; */
  const [isHeaderExpanded, setIsHeaderExpanded] = useState(false);

 function handleExpandHeader() {/*useEffect addEventListener*/
  setIsHeaderExpanded(!isHeaderExpanded); /*close signin popup as well or popup X appear disappear*/
 }

  return (
    <header className={`header ${!isHomeRendered ? 'header_border_dark':''} ${isHeaderExpanded ? 'header__expanded':''}`}>
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
        <button className="header__expand-btn" onClick={handleExpandHeader}type="button" aria-label="expand navigation">
        <svg className="header__expand-icon">
          <title>navigation button icon</title>
          <rect x="4" y="8" className={`header__expand-rect ${isHeaderExpanded? 'header__expand-rect_top':''}`} />
          <rect x="4" y="14" className={`header__expand-rect ${isHeaderExpanded? 'header__expand-rect_bottom':''}`}/>
        </svg>
          
        </button>
      </div>
    </header>
  );
} 
/*<div className="header__expand-btn-rect"></div>
          <div className=""></div>*/
export default Header;