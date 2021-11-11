import './InfoTooltip.css';

const InfoTooltip = ({ isOpen, onClose, onRedirect }) => {
  return (
    <div className={`modal ${isOpen ? 'modal_opened': ''}`}>
      <div className="modal__container modal__container_type_info">
        <div className="info-tooltip">
          <p className="info-tooltip__message">Registration successfully completed!</p>
          <p className="info-tooltip__redirect-label" onClick={onRedirect}>Sign in</p>
        </div>
        <button onClick={onClose} className="modal__close-btn modal__close-btn_type_info" aria-label="Close" type="button"></button>
      </div>
    </div>
  );
}

export default InfoTooltip;