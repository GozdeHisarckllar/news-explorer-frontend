import { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './SavedNewsHeader.css';

const SavedNewsHeader = ({ savedCardsCount, savedKeywords }) => {
  const currentUser = useContext(CurrentUserContext);

  return(
    <section className="saved-info">
      <h2 className="saved-info__title">Saved articles</h2>
      <p className="saved-info__count">
        {`${currentUser.name}, you have ${savedCardsCount === 0 ? 'no': savedCardsCount} saved articles`}
      </p>
      <p className="saved-info__req-info">By keywords:
        <span className="saved-info__keywords">{ 
        savedKeywords.length <= 3 ? 
          savedKeywords.length !== 0 ?
            savedKeywords.map((keyword) => ` ${keyword}${savedKeywords.indexOf(keyword) !== savedKeywords.length-1 ? ',':''}`) 
          : ' No keywords yet...'
        : 
          ` ${savedKeywords[0]}, ${savedKeywords[1]} and ${savedKeywords.length - 2} other`
        }
        </span>
      </p>
    </section>
  );
}

export default SavedNewsHeader;