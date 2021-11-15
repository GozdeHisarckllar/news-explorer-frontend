import PopupWithForm from '../PopupWithForm/PopupWithForm';
import useFormAndValidation from '../../hooks/useFormAndValidation';
import './RegisterPopup.css';
import { useEffect } from 'react/cjs/react.development';

const RegisterPopup = ({ isOpen, onClose, onRegister, submitErrorMessage, isInputDisabled, onRedirect }) => {
  const { 
    values, 
    errors, 
    isFormValid, 
    handleChange, 
    resetFormValidation 
  } = useFormAndValidation();

  function handleSubmit(event) {
    event.preventDefault();
    onRegister(values);
  }

  useEffect(() => {
    resetFormValidation();
  }, [isOpen, resetFormValidation]);
  
  return(
    <PopupWithForm
      name="register"
      title="Sign up" 
      buttonLabel="Sign up"
      linkLabel="Sign in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
      onRedirect={onRedirect}
    >
      <label 
        className="form__label form__label_el_email" 
        htmlFor="signup-email"
      >
        Email
        <input 
          type="email" 
          className="form__input form__input_type_email" 
          id="signup-email" 
          name="email" 
          placeholder="Enter email"
          value={values['email'] || ''}
          onChange={handleChange}
          disabled={isInputDisabled ? true : false}
          required
        />
        <span 
          className={`form__input-error ${errors['email']? 'form__input-error_visible':''}`}
        >
          {errors['email']}
        </span>
      </label>
      <label 
        className="form__label form__label_el_password" 
        htmlFor="signup-password"
      >
        Password
        <input 
          type="password" 
          className="form__input form__input_type_password" 
          id="signup-password" 
          name="password" 
          placeholder="Enter password"
          minLength="6" maxLength="30"
          value={values['password'] || ''}
          onChange={handleChange}
          disabled={isInputDisabled ? true : false}
          required
        />
        <span 
            className={`form__input-error ${errors['password']? 'form__input-error_visible':''}`}
        >
          {errors['password']}
        </span>
      </label>
      <label 
        className="form__label form__label_el_username" 
        htmlFor="signup-username"
      >
        Username
        <input 
          type="text" 
          className="form__input form__input_type_username" 
          id="signup-username" 
          name="username" 
          placeholder="Enter your username"
          value={values['username'] || ''}
          onChange={handleChange}
          disabled={isInputDisabled ? true : false}
          required
        />
        <span 
          className={`form__input-error ${errors['username']? 'form__input-error_visible':''}`}
        >
          {errors['username']}
        </span>
      </label>
      <span 
        className={`form__input-error form__input-error_type_submit form__input-error_popup_signup ${submitErrorMessage ? 'form__input-error_visible':''}`}
      >
        {submitErrorMessage}
      </span>
    </PopupWithForm>
  );
}

export default RegisterPopup;
