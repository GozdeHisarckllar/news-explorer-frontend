import NewsCard from '../NewsCard/NewsCard';
import './NewsCardList.css';


const NewsCardList = ({ newsCards }) => {
  return(
    <ul className="news-card-list">
      {  newsCards.map((newsCard, i) => (
        <NewsCard newsCard={newsCard} key={i}/>
        ))
      }
    </ul>
  );
}

export default NewsCardList;
