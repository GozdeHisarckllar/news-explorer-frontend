// import logo from '../../logo.svg';
import { useState } from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
// import { Element } from 'react-scroll';
import Footer from '../Footer/Footer';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isHomeRendered, setIsHomeRendered] = useState(true); /*for black color not for bottom border(navlink)*/

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
          >

          </Main>
        </Route>
        <Route path="/saved-news">
          <SavedNews
          onRenderHome={(boolean) => {setIsHomeRendered(boolean)}}
          >

          </SavedNews>
        </Route>
      </Switch>
      <Footer/>
    </div>
  );
}

export default App;
