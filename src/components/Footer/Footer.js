import { Link } from 'react-router-dom';
import githubIcon from '../../images/icon-github.svg';
import facebookIcon from '../../images/icon-facebook.svg';
import './Footer.css';
/*import Scroll from 'react-scroll';
const ScrollLink = Scroll.ScrollLink;*/

const Footer = () => {
  return(
    <footer className="footer">
      <p className="footer__copyright">© 2021 Supersite, Powered by News API</p>
      <nav className="footer__navbar">
        <ul className="footer__links">
          <li className="footer__list-item">
            <Link className="footer__link" to="/">Home</Link>
          </li>
          <li className="footer__list-item">
            <Link className="footer__link" to={{pathname:"https://practicum.yandex.com"}} target="_blank">Practicum by Yandex</Link>
          </li>
          <li className="footer__list-item">
            <Link className="footer__link-icon" to={{pathname:"https://github.com/GozdeHisarckllar/news-explorer-frontend"}} target="_blank">
              <img className="footer__icon footer__icon_path_github" src={githubIcon} alt="github icon"/>
            </Link>
          </li>
          <li className="footer__list-item">
            <Link className="footer__link-icon" to={{pathname:"https://www.facebook.com/YPracticum"}} target="_blank">
              <img className="footer__icon footer__icon_path_facebook" src={facebookIcon} alt="facebook icon"/>
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
// <ScrollLink spy={true} smooth={true} duration={500} to="header">Home</ScrollLink>
export default Footer;