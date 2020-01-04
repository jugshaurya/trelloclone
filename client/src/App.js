import React from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
// Action Creators
import { getUserViaTokenASYNC } from "./redux/user/user.actions";
// Child Component
import Appbar from "./components/navbar/navbar";
import SignUp from "./components/signup/signup";
import SignIn from "./components/signin/signin";
import NotFound from "./components/not-found/notFound";
import Boards from "./components/boards/boards";
import SpecificBoard from "./components/specific-board/SpecificBoard";
import Homepage from "./components/hompage/homepage";
// Style
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// HOC
import withAuth from "./components/withAuth/withAuth";
const ProtectedBoards = withAuth(Boards);
const ProtectedSpecificBoard = withAuth(SpecificBoard);

class App extends React.Component {
  componentDidMount() {
    this.props.getUserViaTokenASYNC();
  }

  render() {
    return (
      <div className="App">
        <Appbar user={this.props.user} />
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

const mapStateToProps = state => ({
  user: state.user.user
});

const mapDispatchToProps = dispatch => ({
  getUserViaTokenASYNC: () => dispatch(getUserViaTokenASYNC())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
