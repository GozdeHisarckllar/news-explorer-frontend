import { useState, useEffect, useCallback } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import Footer from '../Footer/Footer';
import LoginPopup from '../LoginPopup/LoginPopup';
import RegisterPopup from '../RegisterPopup/RegisterPopup';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
//import { articleCards } from '../../utils/placeholderData';
import { mainApiAuthInstance, createMainApiInstance } from '../../utils/MainApi';
import { newsApiInstance } from '../../utils/NewsApi';
import CurrentUserContext from '../../contexts/CurrentUserContext';
//The Main, NavBar, and SavedNewsHeader components are subscribed to the CurrentUserContext context
function App() {
  
  const [loggedIn, setLoggedIn] = useState(false);
  const [isHomeRendered, setIsHomeRendered] = useState(true);
  const [newsCards, setNewsCards] = useState([]);//placeholder cards//
  const [isKeywordSubmitted, setIsKeywordSubmitted] = useState(false); ///////////////

  const [isHeaderExpanded, setIsHeaderExpanded] = useState(false);

  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [isUnauthRegisterPopupOpen, setIsUnauthRegisterPopupOpen] = useState(false);/////////////
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const [submitErrorMessage, setsubmitErrorMessage ] = useState('');
  /*const [loginSubmitErrorMessage, setLoginSubmitErrorMessage ] = useState('');*/
  /*const [registerSubmitErrorMessage, setRegisterSubmitErrorMessage ] = useState('');*/
  const [isInputDisabled, setIsInputDisabled ] = useState(false);

  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [currentUser, setCurrentUser] = useState({});

  const [isPreloaderVisible, setIsPreloaderVisible] = useState(false);
  const [isArticleSaved, setIsArticleSaved ] = useState(false);
  const [savedCards, setSavedCards] = useState([]);
  const [keyword, setKeyword] = useState('');

  const [selectedCards, setSelectedCards] = useState([]);
  /*function handleResetSubmitError() {
    setSubmitErrorMessage('');
  }*/
  
  function handleRegister({ email, password, username }) {
    setIsInputDisabled(true);
    setsubmitErrorMessage('');
    mainApiAuthInstance.register(email, password, username)
      .then((res) => {
        if (res) {
          setIsInfoTooltipOpen(true);
          setIsRegisterPopupOpen(false);
        }
      })
      .catch((err) => {
        /*if (err.validKey && err.validKey.includes('name')) {
          return setRegisterSubmitErrorMessage(err.message.replace(/:.*\//, ' such as "Damien" or "Susie".'));
        }*/
        setsubmitErrorMessage(err.message);
      })
      .finally(() => {
        setIsInputDisabled(false);
      });
  }

  function handleLogin({ email, password }) {
    //button preloader
    setIsInputDisabled(true);
    setsubmitErrorMessage('');
    mainApiAuthInstance.authorize(email, password)
      .then((res) => setToken(localStorage.getItem('token')))
      .then((res) => {
        checkToken();
        closeAllPopups();
      })
      .catch((err) => {
        setsubmitErrorMessage(err.message);
        //console.log(err.message);
      })
      .finally(() => {
        //buttonpreloader
        setIsInputDisabled(false);
      });
  }

  const checkToken = useCallback(() => {//Promise all
    if (token) {
      createMainApiInstance(token).getUserAccountInfo()
        .then((res) => {
          setCurrentUser(res.data);
          setLoggedIn(true);
        })
        .catch((err) => {
          console.log(`Error: ${err.message}`);
        });
      
      createMainApiInstance(token).getSavedArticles()
        .then((savedArticles) => {
          setSavedCards(savedArticles.data);
        })
        .catch((err) => {
          console.log(`Error: ${err.message}`);/*err.message*/
        });
    }
  }, [token]);

  useEffect(() => {
    checkToken();
  }, [checkToken]);
  
  function handleLogout() {
    localStorage.removeItem('token');
    setToken('');
    setLoggedIn(false);
  }

  function handleRenderHomePage(boolean) {
    setIsHomeRendered(boolean);
  }

  function handleExpandHeader() {
    setIsHeaderExpanded(!isHeaderExpanded);
  }

  function handleSignInClick() {
    setsubmitErrorMessage('');
    setIsInfoTooltipOpen(false);
    setIsRegisterPopupOpen(false);
    setIsLoginPopupOpen(true);
    setIsUnauthRegisterPopupOpen(false);
  }

  function handleSignUpClick() {
    setsubmitErrorMessage('');
    setIsLoginPopupOpen(false);
    setIsRegisterPopupOpen(true);
  }

  function closeAllPopups() {
    setIsLoginPopupOpen(false);
    setIsRegisterPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setsubmitErrorMessage('');
    /*setRegisterSubmitErrorMessage('');*/
    setIsUnauthRegisterPopupOpen(false);
  }
  
  function handleGetSearchedArticles({ keyword }) {
    setIsKeywordSubmitted(true);
    setIsPreloaderVisible(true);
    setKeyword(keyword);
    newsApiInstance.getSearchedArticles(keyword)
      .then((articleData) => {
        setNewsCards(articleData.articles.filter((searchedArticle) => {
          return savedCards.some((savedArticle) => savedArticle.link !== searchedArticle.url);
        }));
      })
      .catch((err) => console.log(err))
      .finally(() => setIsPreloaderVisible(false));
  }

  function handleChangeArticleSavedStatus(article) {
    if (!loggedIn) {
      //setIsRegisterPopupOpen(true);
      setIsUnauthRegisterPopupOpen(true);
    } else {
      let isSaved;
      let savedArticle;
      if (savedCards.length !== 0) { //for only getsaved articles
        createMainApiInstance(token).getSavedArticles()
          .then((savedArticles) => {
            savedArticle = savedArticles.data.find((savedArticle) => {
              return savedArticle.link === article.url;
            });
            savedArticle ? isSaved = true : isSaved = false;
            return isSaved;
          })
          .then((isSaved) => {
            createMainApiInstance(token).changeArticleSavedStatus(keyword, article, isSaved, savedArticle)
            .then((res) => {
              if (res.data) {
                setSavedCards([...savedCards, res.data]);
                setSelectedCards([...selectedCards, article]);
              } else {
                setSelectedCards(selectedCards.filter((selectedArticle) => selectedArticle.url !== article.url));
                setSavedCards(savedCards.filter((savedCard) => savedCard.link !== savedArticle.link));
                console.log(res);
              }
            }).catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
        
      } /*else {
        //createMainApiInstance(token).getSavedArticles()
        isSaved = false
        createMainApiInstance(token).changeArticleSavedStatus(keyword, article, isSaved)
          .then((res) => {
            setSavedCards([...savedCards, res.data]);
          }
      
          );
      }*/
    }
  }

  function handleRemoveSavedArticle(article) {
    createMainApiInstance(token).removeSavedArticle(article._id)
      .then((res) => {
        setSavedCards(savedCards.filter((savedCard) => 
          savedCard._id !== article._id
        ));
        console.log(res);
      })
      .catch((err) => console.log(err));
  }
  /*function handleSaveArticle(article) {
    let isSaved;
    if (!loggedIn) {
      setIsRegisterPopupOpen(true);
      setIsUnauthRegisterPopupOpen(true);
    } else {
      if (savedCards.length === 0){
       
          isSaved = false;
          createMainApiInstance(token).changeArticleSavedStatus(keyword, article, isSaved)
            .then((card) => {
            setIsArticleSaved(true);
          setSavedCards([...savedCards, card]);
        })
          .catch((err) => console.log(err));
      
      } else {
        createMainApiInstance(token).getSavedArticles()
          .then((savedArticles) => {
          const deletedArticle = savedArticles.data.filter((savedArticle) => {
            return savedArticle.link === article.url;
          });
          return deletedArticle;
        .then((savedArticles) => {
          if (savedArticles) {
            isSaved = savedArticles.some((savedArticle) => article.url === savedArticle.link)
            //if issaved or not
            createMainApiInstance(token).changeArticleSavedStatus(keyword, article, isSaved)
            .then((article) => {
              setIsArticleSaved(false);
              //setSavedCards(savedArticles.filter((savedArticle) => saved));
            })
              .catch((err) => console.log(err));
          }
        })
          .catch((err) => console.log(err))
      }
      ;

      
      //setIsArticleSaved(true);
    }
  }*/
/*function handleSaveArticle(article) {
    if (!loggedIn) {
      setIsRegisterPopupOpen(true);
      setIsUnauthRegisterPopupOpen(true);
    } else {
      let isSaved;


      if (savedCards.length === 0) {
        isSaved = false;
        createMainApiInstance(token).changeArticleSavedStatus(keyword, article, isSaved)
          .then((savedArticle) => {
            setSavedCards([...savedCards, savedArticle.data]);
          });
      } else {
        //createMainApiInstance(token).getSavedArticles()
        isSaved = true
        createMainApiInstance(token).changeArticleSavedStatus(keyword, article, isSaved)
          .then((res) => {
            console.log(res.message)}
      
          );
      }
    }
  }*/
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
      if (e.target.classList.contains('overlay')) {
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
      ${(isHeaderExpanded||isLoginPopupOpen||isRegisterPopupOpen||isInfoTooltipOpen) && !isUnauthRegisterPopupOpen? 'page__container_noscroll':''}`}>
      <CurrentUserContext.Provider value={currentUser}>
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
              onSearch={handleGetSearchedArticles}
              onSave={handleChangeArticleSavedStatus}
              isPreloaderVisible={isPreloaderVisible}
              isArticleSaved={isArticleSaved}
              newsCards={newsCards}
              onSubmitKeyword={isKeywordSubmitted}
              isHomeRendered={isHomeRendered}
              loggedIn={loggedIn}
              chosenCards={selectedCards}
            >
            </Main>
          </Route>
          <Route path="/saved-news">
            <SavedNews
              savedCards={savedCards}
              isHomeRendered={isHomeRendered}
              onRenderHome={handleRenderHomePage}
              onRemove={handleRemoveSavedArticle}
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
          onLogin={handleLogin}
          submitErrorMessage={submitErrorMessage}
          isInputDisabled={isInputDisabled}
          onRedirect={handleSignUpClick}
        />
        <RegisterPopup
          isOpen={isRegisterPopupOpen}
          isOpenUnauth={isUnauthRegisterPopupOpen}
          onClose={closeAllPopups}
          onRegister={handleRegister}
          submitErrorMessage={submitErrorMessage}
          isInputDisabled={isInputDisabled}
          onRedirect={handleSignInClick}
        />
        <InfoTooltip 
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          onRedirect={handleSignInClick}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
