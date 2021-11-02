import { NavLink } from "react-router-dom";
import './Footer.css';
/*import Scroll from 'react-scroll';
const ScrollLink = Scroll.ScrollLink;*/

const Footer = () => {
  return(
    <footer className="footer">
      <p className="footer__copyright">© 2021 Supersite, Powered by News API</p>
      <nav className="footer__navbar">
        <NavLink className="footer__link" to="/">Home</NavLink>
        <NavLink className="footer__link" to={{pathname:"https://practicum.yandex.com"}} target="_blank">Practicum by Yandex</NavLink>
        <NavLink className="footer__icon" to={{pathname:"https://github.com/GozdeHisarckllar"}} target="_blank"/>
        <NavLink className="footer__icon" to={{pathname:"https://www.facebook.com/YPracticum"}} target="_blank"/>
      </nav>
    </footer>
  );
}
// <ScrollLink spy={true} smooth={true} duration={500} to="header">Home</ScrollLink>
export default Footer;