import { useEffect } from 'react';
import NewsCardList from '../NewsCardList/NewsCardList';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import './SavedNews.css';

const SavedNews = ({ onRenderHome, newsCards, isHomeRendered }) => {
  useEffect(() => {
    onRenderHome(false);
  });

  return(
    <main className="saved-news">
      <SavedNewsHeader/>
      <section className="bookmarks">
        <div className="bookmarks__container">
        { newsCards.length > 0 ?
          <NewsCardList newsCards={newsCards} isHomeRendered={isHomeRendered} /*loggedIn*//>
          :
          <div></div>//notfound section
        }
        </div>
      </section>
    </main>
  );
}// newsCards --> savedCards

export default SavedNews;