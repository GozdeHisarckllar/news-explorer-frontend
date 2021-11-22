import './InfoTooltip.css';

const InfoTooltip = ({ isOpen, onClose, onRedirect }) => {
  return (
    <div className={`modal ${isOpen ? 'modal_opened': ''}`}>
      <div className="modal__container modal__container_type_info">
        <div className="info-tooltip">
          <p className="info-tooltip__message">Registration successfully completed!</p>
          <button 
            className="info-tooltip__redirect-btn" 
            onClick={onRedirect} 
            type="button" 
            aria-label="sign in"
          >
            Sign in
          </button>
        </div>
        <button 
          onClick={onClose} 
          className="modal__close-btn modal__close-btn_type_info" 
          aria-label="Close" 
          type="button">
        </button>
      </div>
    </div>
  );
}

export default InfoTooltip;