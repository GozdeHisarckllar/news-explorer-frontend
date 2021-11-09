// import logo from '../../logo.svg';
import { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
// import { Element } from 'react-scroll';
import Footer from '../Footer/Footer';
import { articleCards } from '../../utils/placeholderData';/*link card img*/
// isHomeRendered --> context provider //check  section two headings //// infotooltip for auth
function App() {// 1.33 -> 1.3 // 696px mobile 600px 706px footer align itemc X //padding top bottom
  const [loggedIn, setLoggedIn] = useState(true);// 696************************
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
