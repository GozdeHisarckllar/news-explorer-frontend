import { useEffect } from 'react';
import NewsCardList from '../NewsCardList/NewsCardList';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NotFound from '../NotFound/NotFound';
import './SavedNews.css';

const SavedNews = ({ onRenderHome, savedCards, savedCardsCount, savedKeywords, isHomeRendered, onRemove }) => {
  
  useEffect(() => {
    onRenderHome(false);
  }, [onRenderHome]);

  return(
    <div className="saved-news">
      <SavedNewsHeader 
        savedCardsCount={savedCardsCount}
        savedKeywords={savedKeywords}
      />
      <section className="bookmarks">
        <div className="bookmarks__container">
        { savedCards.length > 0 ?
          <NewsCardList 
            newsCards={savedCards} 
            isHomeRendered={isHomeRendered}
            onRemove={onRemove}
          />
          :
          <NotFound
            title="No saved articles found"
            message="You may have not created bookmarks yet!"
          />
        }
        </div>
      </section>
    </div>
  );
}

export default SavedNews;