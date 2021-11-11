import PopupWithForm from "../PopupWithForm/PopupWithForm";
import './LoginPopup.css';

const LoginPopup = ({ isOpen, onClose, onRedirect }) => {
  return(
    <PopupWithForm
      name="login"
      title="Sign in" 
      buttonLabel="Sign in"
      linkLabel="Sign up"
      isOpen={isOpen}
      onClose={onClose}
      onRedirect={onRedirect}
     >
       <label className="form__label form__label_el_email" htmlFor="email">
          Email
          <input type="email" className="form__input form__input_type_email" id="email" name="email" 
            placeholder="Enter email" required/>
          <span className="form__input-error">placeholder error message</span>
        </label>
        <label className="form__label form__label_el_password" htmlFor="password">
          Password
          <input type="password" className="form__input form__input_type_password" id="password" name="password" 
            placeholder="Enter password" minLength="6" maxLength="30" required/>
          <span className="form__input-error">placeholder error message</span>
        </label>
    </PopupWithForm>
  );
}

export default LoginPopup;

/*label="Log in"
        values={values}
        errors={errors}
        onSubmit={handleSubmit}
        onChange={handleChange}
        isFormValid={isFormValid}
        linkLabel="Not a member yet? Sign up here!"
        linkPath="/signup"*/