import { Link } from 'react-router-dom';
import githubIcon from '../../images/icon-github.svg';
import facebookIcon from '../../images/icon-facebook.svg';
import './Footer.css';

const Footer = () => {
  return(
    <footer className="footer">
      <p className="footer__copyright">© 2021 Supersite, Powered by News API</p>
      <nav className="footer__navbar">
        <ul className="footer__links footer__links_no-icon">
          <li className="footer__list-item footer__list-item_path_home">
            <Link className="footer__link" to="/">Home</Link>
          </li>
          <li className="footer__list-item footer__list-item_path_practicum">
            <Link className="footer__link" to={{pathname:"https://practicum.yandex.com"}} target="_blank">Practicum by Yandex</Link>
          </li>
        </ul>
        <ul className="footer__links footer__links_with-icon">
          <li className="footer__list-item footer__list-item_path_github">
            <Link className="footer__link-icon" to={{pathname:"https://github.com/GozdeHisarckllar/news-explorer-frontend"}} target="_blank">
              <img className="footer__icon" src={githubIcon} alt="github icon"/>
            </Link>
          </li>
          <li className="footer__list-item footer__list-item_path_facebook">
            <Link className="footer__link-icon" to={{pathname:"https://www.facebook.com/YPracticum"}} target="_blank">
              <img className="footer__icon" src={facebookIcon} alt="facebook icon"/>
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;