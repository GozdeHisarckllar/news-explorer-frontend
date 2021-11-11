// import logo from '../../logo.svg';
import { useState, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
// import { Element } from 'react-scroll';
import Footer from '../Footer/Footer';
import { articleCards } from '../../utils/placeholderData';/*link card img*/
import LoginPopup from '../LoginPopup/LoginPopup';
import RegisterPopup from '../RegisterPopup/RegisterPopup';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
// isHomeRendered --> context provider //check  section two headings //// infotooltip for auth
function App() {// 1.33 -> 1.3 // 696px mobile 600px 706px footer align itemc X //padding top bottom
  const [loggedIn, setLoggedIn] = useState(true);// 696************************
  const [isHomeRendered, setIsHomeRendered] = useState(true); /*for black color not for bottom border(navlink)*/
  const [ newsCards, setNewsCards] = useState(articleCards);
  const [ isSubmitted, setIsSubmitted] = useState(true);

  const [isHeaderExpanded, setIsHeaderExpanded] = useState(false);

  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

 function handleExpandHeader() {/*useEffect addEventListener*/
  setIsHeaderExpanded(!isHeaderExpanded); /*close signin popup as well or popup X appear disappear*/
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
    /*window.addEventListener('popstate', removeHeaderMobileClass);*/
    document.addEventListener('click', closeHeaderMobile);

    return () => {
      document.removeEventListener('keydown', closeByEscape);
      document.removeEventListener('click', closeByMouseClick);
      window.removeEventListener('resize', removeHeaderMobileClass);
      /*window.removeEventListener('popstate', removeHeaderMobileClass);*/
      document.removeEventListener('click', closeHeaderMobile);
    }
  }, []);

  return (
    <div className={`page__container ${isHomeRendered ? 'page__container_withBackground':''}
      ${isHeaderExpanded ? 'page__container_noscroll_mobile':''} ${isLoginPopupOpen||isRegisterPopupOpen||isInfoTooltipOpen ? 'page__container_noscroll_desktop':''}`}>
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
        /*onRemoveHeaderMobile={removeHeaderMobileClass}*/
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
