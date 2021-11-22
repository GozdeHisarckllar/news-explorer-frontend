import { useState, useEffect, useCallback } from 'react';
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import Footer from '../Footer/Footer';
import LoginPopup from '../LoginPopup/LoginPopup';
import RegisterPopup from '../RegisterPopup/RegisterPopup';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import { mainApiAuthInstance, createMainApiInstance } from '../../utils/MainApi';
import newsApiInstance from '../../utils/NewsApi';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { createSortedKeywordsObj } from '../../utils/utils';
import ProtectedRoute from '../ProtectedRoute';

function App() {
  
  const [loggedIn, setLoggedIn] = useState(false);
  const [isHomeRendered, setIsHomeRendered] = useState(true);
  const [newsCards, setNewsCards] = useState([]);
  const [isKeywordSubmitted, setIsKeywordSubmitted] = useState(false);

  const [isHeaderExpanded, setIsHeaderExpanded] = useState(false);

  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const [submitErrorMessage, setSubmitErrorMessage ] = useState('');

  const [isInputDisabled, setIsInputDisabled ] = useState(false);

  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [currentUser, setCurrentUser] = useState({});

  const [isPreloaderVisible, setIsPreloaderVisible] = useState(false);

  const [savedCards, setSavedCards] = useState([]);
  const [savedCardsCount, setSavedCardsCount] = useState(0);
  const [savedKeywords, setSavedKeywords] = useState({});
  const [keyword, setKeyword] = useState('');

  const [selectedCards, setSelectedCards] = useState([]);
  
  const [counter, setCounter] = useState(3);
  const [isExpanded, setIsExpanded] = useState(false);

  const [searchError, setSearchError] = useState(false);
  
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      handleSignInClick();
      history.replace({state: null});
    }
  },[location, history]);

  function handleRegister({ email, password, username }) {
    setIsInputDisabled(true);
    setSubmitErrorMessage('');
    mainApiAuthInstance.register(email, password, username)
      .then((res) => {
        if (res) {
          setIsInfoTooltipOpen(true);
          setIsRegisterPopupOpen(false);
        }
      })
      .catch((err) => {
        setSubmitErrorMessage(err.message);
      })
      .finally(() => {
        setIsInputDisabled(false);
      });
  }

  function handleLogin({ email, password }) {
    setIsInputDisabled(true);
    setSubmitErrorMessage('');

    mainApiAuthInstance.authorize(email, password)
      .then((res) => setToken(localStorage.getItem('token')))
      .then((res) => {
        checkToken();
        closeAllPopups();
      })
      .catch((err) => {
        setSubmitErrorMessage(err.message);
      })
      .finally(() => {
        setIsInputDisabled(false);
      });
  }

  const checkToken = useCallback(() => {
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
          if (err.statusCode === 404) {
            return console.log(`Error: ${err.statusCode} - No bookmarked articles found on your 'Saved Articles' list`);
          }
          console.log(`Error: ${err.message}`);
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
    setSavedCards([]);
    setNewsCards([]);
    setIsKeywordSubmitted(false);
    history.push('/');
  }

  function handleRenderHomePage(boolean) {
    setIsHomeRendered(boolean);
  }

  function handleExpandHeader() {
    setIsHeaderExpanded(!isHeaderExpanded);
  }

  function handleListCards(num) {
    setCounter(num);
  }

  function handleExpandCardList(bool) {
    setIsExpanded(bool)
  }

  function handleSignInClick() {
    setSubmitErrorMessage('');
    setIsInfoTooltipOpen(false);
    setIsRegisterPopupOpen(false);
    setIsLoginPopupOpen(true);
  }

  function handleSignUpClick() {
    setSubmitErrorMessage('');
    setIsLoginPopupOpen(false);
    setIsRegisterPopupOpen(true);
  }

  function closeAllPopups() {
    setIsLoginPopupOpen(false);
    setIsRegisterPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSubmitErrorMessage('');
  }
  
  function handleGetSearchedArticles({ keyword }) {
    setCounter(3);
    setIsExpanded(false);
    setIsInputDisabled(true);
    setIsKeywordSubmitted(true);
    setIsPreloaderVisible(true);
    setKeyword(keyword);

    newsApiInstance.getSearchedArticles(keyword)
      .then((articleData) => {
        setSelectedCards(articleData.articles.filter((article) => {
          return savedCards.some((card) => card.link === article.url)
        }));

        setNewsCards(articleData.articles);
      })
      .catch((err) => {
        setSearchError(true);
      })
      .finally(() => {
        setIsInputDisabled(false);
        setIsPreloaderVisible(false)
      });
  }

  function handleChangeArticleSavedStatus(article) {
    if (!loggedIn) {
      setIsRegisterPopupOpen(true);
    } else {
        let isSaved;
        let savedArticle;

        if (savedCards.length !== 0) {
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
                }
              })
              .catch((err) => console.log(err.message));
            })
            .catch((err) => console.log(err.message));
          
        } else {
          isSaved = false
          createMainApiInstance(token).changeArticleSavedStatus(keyword, article, isSaved)
            .then((res) => {
              setSavedCards([...savedCards, res.data]);
              setSelectedCards([...selectedCards, article]);
            })
            .catch((err) => console.log(err.message));
        }
    }
  }

  function handleRemoveSavedArticle(article) {
    createMainApiInstance(token).removeSavedArticle(article._id)
      .then((res) => {
        setSavedCards(savedCards.filter((savedCard) => 
          savedCard._id !== article._id
        ));
        setSelectedCards(selectedCards.filter((selectedArticle) => selectedArticle.url !== article.link));
      })
      .catch((err) => console.log(err.message));
  }
  
  useEffect(() => {
    setIsHeaderExpanded(false);
  }, [isHomeRendered, loggedIn, isLoginPopupOpen]);

  useEffect(() => {
    setSavedCardsCount(savedCards.length);
    setSavedKeywords(createSortedKeywordsObj(savedCards));
  },[savedCards]);

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
      ${(isHeaderExpanded||isLoginPopupOpen||isRegisterPopupOpen||isInfoTooltipOpen) ? 'page__container_noscroll':''}`}>
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
              onChangeLocation={handleSignUpClick}
              isPreloaderVisible={isPreloaderVisible}
              newsCards={newsCards}
              onSubmitKeyword={isKeywordSubmitted}
              searchError={searchError}
              isHomeRendered={isHomeRendered}
              loggedIn={loggedIn}
              isInputDisabled={isInputDisabled}
              chosenCards={selectedCards}
              counter={counter}
              onListCards={handleListCards}
              isExpanded={isExpanded}
              onExpandCardList={handleExpandCardList}
            />
          </Route>
          <ProtectedRoute exact path="/saved-news" token={token}>
            <SavedNews
              savedCards={savedCards}
              savedCardsCount={savedCardsCount}
              savedKeywords={savedKeywords}
              isHomeRendered={isHomeRendered}
              onRenderHome={handleRenderHomePage}
              onRemove={handleRemoveSavedArticle}
            />
          </ProtectedRoute>
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
