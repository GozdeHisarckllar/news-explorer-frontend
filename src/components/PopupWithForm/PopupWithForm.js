import './PopupWithForm.css';

const PopupWithForm = (props) => {
  return(
    <div className={`modal modal_type_${props.name} ${props.isOpen ? 'modal_opened':''}`}>
      <div className="modal__container">
        <form action="#" className="form" name={props.name} onSubmit={props.onSubmit}>
          <fieldset className="form__input-container">
            <legend className="form__caption">{props.title}</legend>
            {props.children}
            <button type="submit" className="form__submit-btn form__submit-btn_disabled">{props.buttonLabel}</button>
          </fieldset>
          <p className="form__redirect">or <span className="form__redirect-label" onClick={props.onRedirect}>{props.linkLabel}</span></p>
        </form>
        <button onClick={props.onClose} className="modal__close-btn" aria-label="Close" type="button"></button>
      </div>
    </div>
  );
}

export default PopupWithForm;