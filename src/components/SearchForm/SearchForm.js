import './SearchForm.css';

const SearchForm = () => {
  return(
    <form className="search-form">
      <label className="search-form__label">
        <input className="search-form__input" type="text" name="keyword" placeholder="Enter topic" required></input>
      </label>
      <button className="search-form__button" type="submit">Search</button>
    </form>
  );
}

export default SearchForm;