import { useEffect } from 'react';
import './Main.css';
import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';

const Main = ({ onRenderHome, newsCards, onSubmitKeyword, isHomeRendered, loggedIn }) => {
  useEffect(() => {
    onRenderHome(true);
  });

  return(
    <main className="content">
      <section className="search">
        <h1 className="search__heading">What's going on in the world?</h1>
        <p className="search__info">Find the latest news on any topic and save them in your personal account.</p>
        <SearchForm/>
      </section>
      <section className={`news-cards ${onSubmitKeyword?'news-cards_visible':''}`}>
        <div className="news-cards__container">
          { newsCards ? /* null undefined or length*/
           <>
            <h2 className="news-cards__title">Search Results</h2>
            <NewsCardList newsCards={newsCards} isHomeRendered={isHomeRendered} loggedIn={loggedIn}/>
            {newsCards.length > 3 && <button>See more</button>}
           </> :
           <div>
             <p>Nothing found</p>
             <p>Sorry, but nothing matched your search terms.</p>
           </div>
          }
          
        </div>
      </section>
      <About/>
    </main>
  );
}

export default Main;