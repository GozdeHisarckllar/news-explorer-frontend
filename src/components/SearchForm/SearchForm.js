import useFormAndValidation from '../../hooks/useFormAndValidation';
import './SearchForm.css';

const SearchForm = ({ onSearch }) => {

  const { 
    values, 
    errors, 
    isFormValid, 
    handleChange, 
    resetFormValidation 
  } = useFormAndValidation();

  /*if value="" submit error*/
  function handleSubmit(event) {
    event.preventDefault();
    onSearch(values);

  }
  return(
    <form className="search-form" name="search" onSubmit={handleSubmit}>
      <label className="search-form__label">
        <input 
          className="search-form__input" 
          type="text" 
          name="keyword" 
          placeholder="Enter topic"
          value={values['keyword'] || ''}
          onChange={handleChange}
          required
        >
        </input>
      </label>
      <button className="search-form__button" type="submit">Search</button>
    </form>
  );
}

export default SearchForm;