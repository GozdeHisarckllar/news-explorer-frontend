import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ children, token, ...props}) => {
  return(
    <Route { ...props }>
      { token ? 
        children 
        : 
        <Redirect to={{
          pathname: "/",
          state: {isPopupOpen: true}
        }}/> 
      }
    </Route>
  );
}

export default ProtectedRoute;