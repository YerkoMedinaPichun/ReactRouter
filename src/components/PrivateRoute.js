import React from "react";
import { Redirect, Route } from "react-router-dom";

// const PrivateRoute = (props) => {
//   return (
//     <Route exact={props.exact} path={props.path} component={props.component} />
//   );
// };

// const PrivateRoute = (props) => {
//   return <Route {...props} />;
// };

//Simular la autenticación
let auth;
auth = null;
auth = true;

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest}>{auth ? <Component /> : <Redirect to="/Login" />}</Route>
  );
};

export default PrivateRoute;
