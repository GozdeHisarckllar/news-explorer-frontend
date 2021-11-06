// import logo from '../../logo.svg';
import { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
// import { Element } from 'react-scroll';
import Footer from '../Footer/Footer';
import { articleCards } from '../../utils/placeholderData';
// isHomeRendered --> context provider
function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [isHomeRendered, setIsHomeRendered] = useState(true); /*for black color not for bottom border(navlink)*/
  const [ newsCards, setNewsCards] = useState(articleCards);
  const [ isSubmitted, setIsSubmitted] = useState(true);

  function handleLogout() {
    setLoggedIn(false);
  }

  return (
    <div className={`page__container ${isHomeRendered ? 'page__container_withBackground':''}`}>
      <Header 
        loggedIn={loggedIn}
        isHomeRendered={isHomeRendered}
        onLogout={handleLogout}
      />
      <Switch>
        <Route exact path="/">
          <Main
            onRenderHome={(boolean) => {setIsHomeRendered(boolean)}}
            newsCards={newsCards}
            onSubmitKeyword={isSubmitted}
            isHomeRendered={isHomeRendered}
            loggedIn = {loggedIn}
          >

          </Main>
        </Route>
        <Route path="/saved-news">
          <SavedNews
          newsCards={newsCards}
          isHomeRendered={isHomeRendered}
          onRenderHome={(boolean) => {setIsHomeRendered(boolean)}}
          >

          </SavedNews>
        </Route>
        <Route path="*">
          <Redirect to="/"/>
        </Route>
      </Switch>
      <Footer/>
    </div>
  );
}

export default App;
