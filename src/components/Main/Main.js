import { useEffect } from 'react';
import './Main.css';
import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';
import NotFound from '../NotFound/NotFound';
import Preloader from '../Preloader/Preloader';

const Main = ({ onRenderHome, onSearch, onSave, isInputDisabled, isPreloaderVisible, newsCards, onSubmitKeyword, 
  searchError, isHomeRendered, loggedIn, chosenCards, counter, onListCards, isExpanded, onExpandCardList }) => {
  
  const increment = 3;
  
  useEffect(() => {
    onRenderHome(true);
  });

  function expandResults() {
    onListCards(counter + increment);

    if (counter + increment >= newsCards.length) {
      onExpandCardList(true);
    }
  }

  return(
    <main className="content">
      <section className="search">
        <h1 className="search__heading">What's going on in the world?</h1>
        <p className="search__info">Find the latest news on any topic and save them in your personal account.</p>
        <SearchForm 
          onSearch={onSearch} 
          isInputDisabled={isInputDisabled}
        />
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
                newsCards={newsCards.slice(0, counter)} 
                isHomeRendered={isHomeRendered} 
                loggedIn={loggedIn}
                onSave={onSave}
                chosenCards={chosenCards}
              />
              <button 
                className={`news-cards__expand-btn ${newsCards.length <= 3 || isExpanded?'news-cards__expand-btn_hidden':''}`} 
                onClick={expandResults} 
                type="button"
              >
                Show more
              </button>
           </div> 
           :
           onSubmitKeyword && !searchError ?<NotFound
             title="Nothing Found"
             message="Sorry, but nothing matched your search terms."
           /> : onSubmitKeyword && 
             <div class="news-cards__search-error">
              <p class="news-cards__search-error-title">
                Sorry, something went wrong during the request.
              </p>
              <p class="news-cards__search-error-message">
                There may be a connection issue or the server may be down. Please try again later.
              </p>
             </div>
          }
        </div>
      </section>
      <About/>
   </main>
  );
}

export default Main;