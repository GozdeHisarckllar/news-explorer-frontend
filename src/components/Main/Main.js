import { useState, useEffect } from 'react';
import './Main.css';
import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';
import NotFound from '../NotFound/NotFound';
import Preloader from '../Preloader/Preloader';

const Main = ({ onRenderHome, onSearch, onSave,  isPreloaderVisible, 
  isArticleSaved, newsCards, onSubmitKeyword, isHomeRendered, loggedIn, chosenCards }) => {
  
  const [ isExpanded, setIsExpanded] = useState(false);
  
  useEffect(() => {
    onRenderHome(true);
  });

  function handleExpand() {
    setIsExpanded(!isExpanded)
  }

  return(
    <main className="content">
      <section className="search">
        <h1 className="search__heading">What's going on in the world?</h1>
        <p className="search__info">Find the latest news on any topic and save them in your personal account.</p>
        <SearchForm onSearch={onSearch}/>
      </section>
      <section className={`news-cards ${onSubmitKeyword?'news-cards_visible':''}`}>
        <div className="news-cards__container">
         { isPreloaderVisible ? 
            <Preloader /> 
            :
           newsCards.length > 0 ?
           <div className="news-cards__results">
              <h2 className="news-cards__title">Search Results</h2>
              <NewsCardList 
                newsCards={newsCards.length < 4 || isExpanded ? newsCards : newsCards.slice(0, 3)} 
                isHomeRendered={isHomeRendered} 
                loggedIn={loggedIn}
                onSave={onSave}
                isArticleSaved={isArticleSaved}
                chosenCards={chosenCards}
              />
              <button 
                className={`news-cards__expand-btn ${newsCards.length < 4 || isExpanded?'news-cards__expand-btn_hidden':''}`} 
                onClick={handleExpand} 
                type="button"
              >
                Show more
              </button>
           </div> 
           :
           onSubmitKeyword && <NotFound
             title="Nothing Found"
             message="Sorry, but nothing matched your search terms."
           />
          }
        </div>
      </section>
      <About/>
   </main>
  );
}

export default Main;