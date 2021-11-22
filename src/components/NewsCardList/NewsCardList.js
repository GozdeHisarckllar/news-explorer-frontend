import NewsCard from '../NewsCard/NewsCard';
import './NewsCardList.css';


const NewsCardList = ({ newsCards, isHomeRendered, loggedIn, onSave, onRemove, chosenCards }) => {
  return(
    <ul className="news-card-list">
      {  newsCards.map((newsCard, i) => (
        <NewsCard 
          newsCard={newsCard} 
          key={i} 
          isHomeRendered={isHomeRendered} 
          loggedIn={loggedIn}
          onSave={onSave}
          onRemove={onRemove}
          chosenCards={chosenCards}
        />
        ))
      }
    </ul>
  );
}

export default NewsCardList;
