import './Preloader.css';

const Preloader = () => {
  return(
    <div className="preloader">
      <div className="preloader__container">
      <i className="preloader__circle"></i>
      <p className="preloader__text">Searching for news...</p>
      </div>
    </div>
  );
}

export default Preloader;