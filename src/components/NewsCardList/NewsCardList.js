import NewsCard from '../NewsCard/NewsCard';
import './NewsCardList.css';


const NewsCardList = ({ newsCards, isHomeRendered, loggedIn }) => {
  return(
    <ul className="news-card-list">
      {  newsCards.map((newsCard, i) => (
        <NewsCard newsCard={newsCard} key={i} isHomeRendered={isHomeRendered} loggedIn={loggedIn}/>
        ))
      }
    </ul>
  );
}

export default NewsCardList;