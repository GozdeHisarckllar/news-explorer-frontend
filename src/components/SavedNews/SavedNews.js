import { useEffect } from "react";

const SavedNews = ({ onRenderHome }) => {
  useEffect(() => {
    onRenderHome(false);
  });

  return(
    <p>fgd</p>
  );
}

export default SavedNews;