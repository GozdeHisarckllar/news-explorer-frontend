import './NotFound.css';

const NotFound = ({ title, message }) => {
  return(
    <div className="notfound">
      <div className="notfound__container">
        <div className="notfound__drawing"></div>
        <h3 className="notfound__title">{title}</h3>
        <p className="notfound__message">{message}</p>
      </div>
    </div>
  );
}

export default NotFound;