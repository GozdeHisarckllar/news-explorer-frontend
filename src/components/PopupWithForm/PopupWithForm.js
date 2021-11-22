import './PopupWithForm.css';

const PopupWithForm = (props) => {
  return(
    <div className={`modal modal_type_${props.name} ${props.isOpen ? 'modal_opened':''}`}>
      <div className="modal__container">
        <form action="#" className="form" name={props.name} onSubmit={props.onSubmit}>
          <fieldset className="form__input-container">
            <legend className="form__caption">{props.title}</legend>
            {props.children}
            <button 
              type="submit" 
              disabled={!props.isFormValid ? true : false} 
              className="form__submit-btn">
              {props.isInputDisabled ? 'Please wait...': props.buttonLabel}
            </button>
          </fieldset>
          <button 
            type="button" 
            className="form__redirect-btn" 
            aria-label="redirect to authorize"
          >or <span className="form__redirect-label" onClick={props.onRedirect}>{props.linkLabel}</span></button>
        </form>
        <button onClick={props.onClose} className="modal__close-btn" aria-label="close" type="button"></button>
      </div>
    </div>
  );
}

export default PopupWithForm;