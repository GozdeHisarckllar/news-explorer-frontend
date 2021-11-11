import './SavedNewsHeader.css';

const SavedNewsHeader = () => {
  return(
    <section className="saved-info">
      <h2 className="saved-info__title">Saved articles</h2>
      <p className="saved-info__count">{`${'Elise'}, you have ${5} saved articles`}</p>
      <p className="saved-info__req-info">By keywords:
        <span className="saved-info__keywords">{` ${'Nature'}, ${'Yellowstone'}, and ${2} other`}</span>
      </p>
    </section>
  );
}

export default SavedNewsHeader;