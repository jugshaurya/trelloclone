import React from "react";
import { Switch, Route } from "react-router-dom";

import Appbar from "./components/navbar/navbar";
import SignUp from "./components/signup/signup";
import SignIn from "./components/signin/signin";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Appbar />
      <Switch>
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <Route exact path="/" component={Appbar} />
      </Switch>
    </div>
  );
}

export default App;
