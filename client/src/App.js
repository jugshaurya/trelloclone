import "bootstrap/dist/css/bootstrap.min.css";
// import $ from "jquery";
// import Popper from "popper.js";
// import "bootstrap/dist/js/bootstrap.bundle.min";
import React from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
// Action Creators
import { getUserViaTokenASYNC } from "./redux/user/user.actions";
// Child Component
import Appbar from "./components/appbar/appbar";
import SignUp from "./components/pages/signup/signup";
import SignIn from "./components/pages/signin/signin";
import NotFound from "./components/pages/not-found/notFound";
import Boards from "./components/pages/boards/boards";
import SpecificBoard from "./components/pages/specific-board/SpecificBoard";
import Homepage from "./components/pages/homepage/homepage";
// Style
import "./App.css";

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
      <>
        <div className="content">
          <header className="fixed-top">
            <Appbar user={this.props.user} />
          </header>
          <main>
            <Switch>
              <Route path="/signup" component={SignUp} />
              <Route path="/signin" component={SignIn} />
              <Route path="/boards/:id" component={ProtectedSpecificBoard} />
              <Route path="/boards" component={ProtectedBoards} />
              <Route exact path="/" component={Homepage} />
              <Route path="/" component={NotFound} />
            </Switch>
          </main>
        </div>
        <footer>
          <div className="container mt-3">
            <div className="row text-center align-items-center">
              <div className="col">
                Made with
                <span role="img" aria-labelledby="emoji">
                  💙
                </span>
                by Shaurya Singhal
              </div>
            </div>
          </div>
        </footer>
      </>
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
