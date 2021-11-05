import { useEffect } from 'react';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import './SavedNews.css';

const SavedNews = ({ onRenderHome }) => {
  useEffect(() => {
    onRenderHome(false);
  });

  return(
    <main className="saved-news">
      <SavedNewsHeader/>
    </main>
  );
}

export default SavedNews;