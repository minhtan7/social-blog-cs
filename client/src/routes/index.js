import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import PublicLayout from "./layouts/PublicLayout";


const Routes = () => {
  return (
    <Switch>
      <PrivateRoute path="/admin" />
      <Route path="/" component={PublicLayout} />
    </Switch>
  );
};
export default Routes;
