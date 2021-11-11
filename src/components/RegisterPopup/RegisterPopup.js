import PopupWithForm from '../PopupWithForm/PopupWithForm';
import './RegisterPopup.css';

const RegisterPopup = ({ isOpen, onClose, onRedirect }) => {
  return(
    <PopupWithForm
      name="register"
      title="Sign up" 
      buttonLabel="Sign up"
      linkLabel="Sign in"
      isOpen={isOpen}
      onClose={onClose}
      onRedirect={onRedirect}
    >
      <label className="form__label form__label_el_email" htmlFor="signup-email">
        Email
        <input type="email" className="form__input form__input_type_email" id="signup-email" name="email" 
          placeholder="Enter email" required/>
      </label>
      <label className="form__label form__label_el_password" htmlFor="signup-password">
        Password
        <input type="password" className="form__input form__input_type_password" id="signup-password" name="password" 
          placeholder="Enter password" minLength="6" maxLength="30" required/>
      </label>
      <label className="form__label form__label_el_username" htmlFor="signup-username">
        Password
        <input type="text" className="form__input form__input_type_username" id="signup-username" name="username" 
          placeholder="Enter your username" required/>
      </label>
      <span className="form__input-error form__input-error_type_signup">placeholder error message</span>
    </PopupWithForm>
  );
}

export default RegisterPopup;
