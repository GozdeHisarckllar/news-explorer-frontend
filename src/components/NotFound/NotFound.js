import './NotFound.css';

const NotFound = () => {
  return(
    <div className="notfound">
      <div className="notfound__container">
        <div className="notfound__drawing"></div>
        <h3 className="notfound__title">Nothing found</h3>
        <p className="notfound__message">Sorry, but nothing matched 
        your search terms.</p>
      </div>
    </div>
  );
}

export default NotFound;