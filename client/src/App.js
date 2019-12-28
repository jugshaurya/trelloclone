import React from "react";
import { Switch, Route } from "react-router-dom";

import Appbar from "./components/navbar/navbar";
import SignUp from "./components/signup/signup";
import SignIn from "./components/signin/signin";
import NotFound from "./components/not-found/notFound";
import Homepage from "./components/hompage/homepage";
import withAuth from "./components/withAuth/withAuth";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const ProtectedHomepage = withAuth(Homepage);

function App() {
  return (
    <div className="App">
      <Appbar />
      <Switch>
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <Route exact path="/" component={ProtectedHomepage} />
        <Route path="/" component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
