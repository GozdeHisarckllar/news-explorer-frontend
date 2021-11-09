import image1 from '../../images/card-img.jpg';
import image2 from '../../images/card-img-2.jpg';
import image3 from '../../images/card-img-3.jpg';

import './NewsCard.css';
import { Link } from 'react-router-dom';
import { useState } from 'react/cjs/react.development';

const NewsCard  = ({ newsCard, isHomeRendered, loggedIn }) => {
  
  const imgArr = [image1, image2, image3];
  const img = imgArr[Math.floor(Math.random() * imgArr.length )];

  const [isSaved, setIsSaved ] = useState(false);
  function handleSave() {
    setIsSaved(!isSaved);
  }

  return(
    <li className="news-card">
      
      <article className="news-card__article">
        <div className="news-card__img" style={{backgroundImage: `url(${img})`}}></div>
        <Link className="news-card__description" to={{pathname: newsCard.link }} target='_blank'>
          <time dateTime={newsCard.date} 
          className="news-card__date">{new Date(newsCard.date).toLocaleString('en-US', {day:'numeric', year:'numeric',month:'long'})}</time>
          <div className="news-card__text-container">
            <h3 className="news-card__title">{newsCard.title}</h3>
            <p className="news-card__text">{newsCard.text}</p>
            
            <p className="news-card__source">{newsCard.source}</p></div>
        </Link>
        <div className="news"></div>
      </article>
      {
        isHomeRendered ?
        <>
          <button className={`news-card__btn news-card__btn_type_save ${isSaved ? 'news-card__btn_saved':''}`} onClick={handleSave} disabled={loggedIn ? false : true} type="button" aria-label="create a bookmark"></button>
          <p className={`news-card__tooltip ${!loggedIn ? 'news-card__tooltip_visible':'' }`}>Sign in to save articles</p>
        </>
        :
        <>
          <p className="news-card__keyword">{newsCard.keyword}</p>
          <button className="news-card__btn news-card__btn_type_remove" type="button" aria-label="remove the bookmark"></button>
          <p className="news-card__tooltip news-card__tooltip_visible">Remove from saved</p>
        </>
      }
      
    </li>
  );
}

export default NewsCard;