import React from "react";
import { Switch, Route } from "react-router-dom";

import Appbar from "./components/navbar/navbar";
import SignUp from "./components/signup/signup";
import SignIn from "./components/signin/signin";
import NotFound from "./components/not-found/notFound";
import Boards from "./components/boards/boards";
import SpecificBoard from "./components/specific-board/SpecificBoard";
import withAuth from "./components/withAuth/withAuth";
import Homepage from "./components/hompage/homepage";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const ProtectedBoards = withAuth(Boards);
const ProtectedSpecificBoard = withAuth(SpecificBoard);

class App extends React.Component {
  state = {
    user: null
  };

  getUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await fetch("http://localhost:5000/user", {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`
        }
      });

      const user = await response.json();
      this.setState({ user });
    }
  };

  componentDidMount() {
    this.getUser();
  }

  render() {
    return (
      <div className="App">
        <Appbar user={this.state.user} />
        <Switch>
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <Route path="/boards/:id" component={ProtectedSpecificBoard} />
          <Route path="/boards" component={ProtectedBoards} />
          <Route exact path="/" component={Homepage} />
          <Route path="/" component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
