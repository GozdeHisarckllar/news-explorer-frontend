import { useState, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import Footer from '../Footer/Footer';
import LoginPopup from '../LoginPopup/LoginPopup';
import RegisterPopup from '../RegisterPopup/RegisterPopup';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import { articleCards } from '../../utils/placeholderData';

function App() {
  
  const [loggedIn, setLoggedIn] = useState(true);
  const [isHomeRendered, setIsHomeRendered] = useState(true);
  const [ newsCards /*setNewsCards*/] = useState(articleCards);//placeholder cards//
  const [ isKeywordSubmitted /*setIsSubmitted*/] = useState(true);

  const [isHeaderExpanded, setIsHeaderExpanded] = useState(false);

  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  function handleRenderHomePage(boolean) {
    setIsHomeRendered(boolean);
  }

  function handleExpandHeader() {
    setIsHeaderExpanded(!isHeaderExpanded);
  }

  function handleSignInClick() {
    setIsInfoTooltipOpen(false);
    setIsRegisterPopupOpen(false);
    setIsLoginPopupOpen(true);
  }

  function handleSignUpClick() {
    setIsLoginPopupOpen(false);
    setIsRegisterPopupOpen(true);
  }

  function handleLogout() {
    setLoggedIn(false);
  }

  function closeAllPopups() {
    setIsLoginPopupOpen(false);
    setIsRegisterPopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  useEffect(() => {
    setIsHeaderExpanded(false);
  }, [isHomeRendered, loggedIn, isLoginPopupOpen]);

  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    };

    const closeByMouseClick = (e) => {
      if (e.target.classList.contains('modal')) {
        closeAllPopups();
      }
    };

    const removeHeaderMobileClass = () => {
      setIsHeaderExpanded(false);
    }

    const closeHeaderMobile = (e) => {
      if(e.target.classList.contains('overlay')) {
        setIsHeaderExpanded(false);
      }
    }

     document.addEventListener('keydown', closeByEscape);
     document.addEventListener('click', closeByMouseClick);
     window.addEventListener('resize', removeHeaderMobileClass);
     document.addEventListener('click', closeHeaderMobile);

    return () => {
      document.removeEventListener('keydown', closeByEscape);
      document.removeEventListener('click', closeByMouseClick);
      window.removeEventListener('resize', removeHeaderMobileClass);
      document.removeEventListener('click', closeHeaderMobile);
    }
  }, []);

  return (
    <div className={`page__container ${isHomeRendered ? 'page__container_with-background':''}
      ${isHeaderExpanded||isLoginPopupOpen||isRegisterPopupOpen||isInfoTooltipOpen ? 'page__container_noscroll':''}`}>
      <Header 
        loggedIn={loggedIn}
        isHomeRendered={isHomeRendered}
        onLogout={handleLogout}
        isHeaderExpanded = {isHeaderExpanded}
        onExpandHeader={handleExpandHeader}
        onSignInClick={handleSignInClick}
        isLoginPopupOpen={isLoginPopupOpen}
        isRegisterPopupOpen={isRegisterPopupOpen}
        isInfoTooltipOpen={isInfoTooltipOpen}
      />
      <Switch>
        <Route exact path="/">
          <Main
            onRenderHome={handleRenderHomePage}
            newsCards={newsCards}
            onSubmitKeyword={isKeywordSubmitted}
            isHomeRendered={isHomeRendered}
            loggedIn = {loggedIn}
          >
          </Main>
        </Route>
        <Route path="/saved-news">
          <SavedNews
            savedCards={newsCards}
            isHomeRendered={isHomeRendered}
            onRenderHome={handleRenderHomePage}
          >
          </SavedNews>
        </Route>
        <Route path="*">
          <Redirect to="/"/>
        </Route>
      </Switch>
      <Footer/>
      <LoginPopup 
        isOpen={isLoginPopupOpen}
        onClose={closeAllPopups}
        onRedirect={handleSignUpClick}
      />
      <RegisterPopup
        isOpen={isRegisterPopupOpen} 
        onClose={closeAllPopups}
        onRedirect={handleSignInClick}
      />
      <InfoTooltip 
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        onRedirect={handleSignInClick}
      />
    </div>
  );
}

export default App;
