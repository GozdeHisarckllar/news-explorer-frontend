import { useEffect } from 'react';
import './Main.css';
import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';
import { useState } from 'react/cjs/react.development';
//import Preloader from '../Preloader/Preloader';
import NotFound from '../NotFound/NotFound';

const Main = ({ onRenderHome, newsCards, onSubmitKeyword, isHomeRendered, loggedIn }) => {
  useEffect(() => {
    onRenderHome(true);
  });
  const [ isExpanded, setIsExpanded] = useState(false);
  function handleExpand() {
    setIsExpanded(!isExpanded)
  }
  return(
    <main className="content">
      <section className="search">
        <h1 className="search__heading">What's going on in the world?</h1>
        <p className="search__info">Find the latest news on any topic and save them in your personal account.</p>
        <SearchForm/>
      </section>
      <section className={`news-cards ${onSubmitKeyword?'news-cards_visible':''}`}>
        <div className="news-cards__container"> 
          { newsCards.length > 0 ? /* null undefined or length*/
           <div className="news-cards__results">
              <h2 className="news-cards__title">Search Results</h2>
              <NewsCardList newsCards={newsCards.length < 4 || isExpanded ? newsCards:newsCards.slice(0, 3)} isHomeRendered={isHomeRendered} loggedIn={loggedIn}/>
              <button className={`news-cards__expand-btn ${newsCards.length < 4 || isExpanded?'news-cards__expand-btn_hidden':''}`} onClick={handleExpand} type="button">Show more</button>
           </div> 
           :
           <NotFound/>
          }
        </div>
      </section>
      <About/>
   </main>
  );// del padding bottom news-cards section 
} // ***********  state && <preloader/> // results block
/*{newsCards.length > 3 ?
            <>
            <NewsCardList newsCards={newsCards.slice(0, 3)} isHomeRendered={isHomeRendered} loggedIn={loggedIn}/>
            <button className={`news-cards__expand-btn ${isExpanded?'news-cards__expand-btn_hidden':''}`} onClick={handleExpand} type="button">Show more</button>
            </>
            :
            <NewsCardList newsCards={newsCards.length < 3 || isExpanded ? newsCards:newsCards.slice(0, 3)} isHomeRendered={isHomeRendered} loggedIn={loggedIn}/>
          }*/
export default Main;