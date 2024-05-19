import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import Login from "./components/login/login";
import ButtonFile from "./components/button-file/button-file";

const Routes = () => {
   return(
       <BrowserRouter>
           <Route component = { Login }  path="/" exact />
           <Route component = { ButtonFile }  path="/file" />
       </BrowserRouter>
   )
}

export default Routes;