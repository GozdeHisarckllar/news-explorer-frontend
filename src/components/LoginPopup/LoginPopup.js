import { useEffect } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import useFormAndValidation from '../../hooks/useFormAndValidation';
import './LoginPopup.css';

const LoginPopup = ({ isOpen, onClose, onLogin, submitErrorMessage, isInputDisabled, onRedirect }) => {
  const { 
    values, 
    errors, 
    isFormValid, 
    handleChange, 
    resetFormValidation 
  } = useFormAndValidation();

  function handleSubmit(event) {
    event.preventDefault();
    onLogin(values);
  }

  useEffect(() => {
    resetFormValidation();
  }, [isOpen, resetFormValidation]);

  return(
    <PopupWithForm
      name="login"
      title="Sign in" 
      buttonLabel="Sign in"
      linkLabel="Sign up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
      isInputDisabled={isInputDisabled}
      onRedirect={onRedirect}
     >
        <label 
          className="form__label form__label_el_email" 
          htmlFor="email"
        >
         Email
         <input 
            type="email" 
            className="form__input form__input_type_email" 
            id="email" 
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
          htmlFor="password"
        >
          Password
          <input 
            type="password" 
            className="form__input form__input_type_password" 
            id="password" 
            name="password" 
            placeholder="Enter password" minLength="6" maxLength="30"
            value={values['password'] || ''}
            onChange={handleChange}
            disabled={isInputDisabled ? true : false}
            required
          />
          <span 
            className={`form__input-error ${errors['password'] ? 'form__input-error_visible':''}`}
          >
            {errors['password']}
          </span>
        </label>
        <span 
          className={`form__input-error form__input-error_type_submit ${submitErrorMessage && isOpen ? 'form__input-error_visible':''}`}
        >
          {submitErrorMessage}
        </span>
    </PopupWithForm>
  );
}

export default LoginPopup;