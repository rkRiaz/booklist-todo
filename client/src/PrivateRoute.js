import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';


const PrivateRoute = ({ children, ...rest }) => {
  const { userLoggedIn } = useSelector((store) => store.user);
  
    return (
      <Route 
        {...rest}
        render={({ location }) =>
          userLoggedIn ? 
            ( children ) 
          : 
          (
            <Redirect
              to={{
                pathname: "/user/signup-signin",
                state: { from: location }
              }}
            />
          )
      }
    />
    );
};

export default PrivateRoute;
