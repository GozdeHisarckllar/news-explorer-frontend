import { useState } from 'react';
import './SearchForm.css';

const SearchForm = ({ onSearch, isInputDisabled }) => {

const [values, setValues] = useState({});
 
  function handleSubmit(event) {
    event.preventDefault();
    
    onSearch(values);
  }
  
  function handleChange(event) {
    const {name, value} = event.target;
    setValues({...values, [name]: value});
    event.target.setCustomValidity("");
  }

  function setCustomInvalidError(event) {
    if (!values['keyword'] ) {
      event.target.setCustomValidity("Please enter a keyword");
    }
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
          onInvalid={setCustomInvalidError}
          disabled={isInputDisabled ? true : false}
          required
        >
        </input>
        
      </label>
      <button className="search-form__button" type="submit">Search</button>
    </form>
  );
}

export default SearchForm;