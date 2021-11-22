
import { Link } from 'react-router-dom';

import './NewsCard.css';


const NewsCard  = ({ newsCard, isHomeRendered, loggedIn, onSave, onRemove, chosenCards }) => {
  let isSelected;
  if (chosenCards) {
   isSelected = chosenCards.some((chosenCard) => chosenCard.url === newsCard.url);
  }
  
  function handleSaveClick() {
    onSave(newsCard);
  }

  function handleRemoveClick() {
    onRemove(newsCard);
  }
  return(
    <li className="news-card">
      <article className="news-card__article">
        <div className="news-card__img" style={{ backgroundImage: `url('${newsCard.urlToImage || newsCard.image}')`}}></div>
        <Link className="news-card__description" to={{pathname: newsCard.url || newsCard.link }} target='_blank'>
          <time dateTime={newsCard.publishedAt} className="news-card__date">
            {new Date(newsCard.publishedAt || newsCard.date ).toLocaleString('en-US', {day:'numeric', year:'numeric', month:'long'})}
          </time>
          <div className="news-card__text-container">
            <h3 className="news-card__title">{newsCard.title}</h3>
            <p className="news-card__text">{newsCard.description || newsCard.text}</p>
            <p className="news-card__source">{newsCard.source.name || newsCard.source}</p>
          </div>
        </Link>
      </article>
      {
        isHomeRendered ?
        <>
          <button className={`news-card__btn news-card__btn_type_save ${isSelected ? 'news-card__btn_saved':''}`} 
             onClick={handleSaveClick} aria-disabled={loggedIn ? false : true} type="button" aria-label="create a bookmark">
          </button>
          <p className={`news-card__tooltip ${!loggedIn ? 'news-card__tooltip_visible':'' }`}>Sign in to save articles</p>
        </>
        :
        <>
          <p className="news-card__keyword">{newsCard.keyword}</p>
          <button className="news-card__btn news-card__btn_type_remove" type="button" 
            onClick={handleRemoveClick} aria-label="remove the bookmark"></button>
          <p className="news-card__tooltip news-card__tooltip_visible">Remove from saved</p>
        </>
      }
    </li>
  );
}

export default NewsCard;