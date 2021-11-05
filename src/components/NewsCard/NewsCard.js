import image1 from '../../images/card-img.jpg';
import image2 from '../../images/card-img-2.jpg';
import image3 from '../../images/card-img-3.jpg';
import './NewsCard.css';
import { Link } from 'react-router-dom';

const NewsCard  = ({ newsCard }) => {
  
  const imgArr = [image1, image2, image3];
  const img = imgArr[Math.floor(Math.random() * imgArr.length )];

  return(
    <li className="news-card">
      <Link className="news-card__link" to={{pathname: newsCard.link }} target='_blank'>
      <article className="news-card__article">
        <div className="news-card__img" style={{backgroundImage: `url(${img})`}}></div>
        <div className="news-card__description">
          <time dateTime={newsCard.date} 
          className="news-card__date">{new Date(newsCard.date).toLocaleString('en-US', {day:'numeric', year:'numeric',month:'long'})}</time>
          <h3 className="news-card__title">{newsCard.title}</h3>
          <p className="news-card__text">{newsCard.text}</p>
          <p className="news-card__source">{newsCard.source}</p>
        </div>
      </article>
      </Link>
    </li>
  );
}

export default NewsCard;