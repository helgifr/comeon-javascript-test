import React from 'react';
import { Route, Redirect } from 'react-router-dom'

// Component that handles routes that require
// the user to be logged in
export default ({component: Component, authenticated, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => authenticated
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}