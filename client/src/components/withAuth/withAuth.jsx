import React from "react";

const withAuth = WrappedComponent => {
  class decoratedClass extends React.Component {
    state = {
      permissionGranted: false
    };

    componentDidMount() {
      this.shouldNavigateAway();
    }

    componentDidUpdate() {
      if (!localStorage.getItem("token")) this.shouldNavigateAway();
    }

    shouldNavigateAway = () => {
      if (!localStorage.getItem("token")) {
        this.setState({ permissionGranted: false });

        this.props.history.push("/signin");
      } else {
        this.setState({ permissionGranted: true });
      }
    };

    render() {
      return this.state.permissionGranted ? (
        <WrappedComponent {...this.props} />
      ) : null;
    }
  }

  return decoratedClass;
};

export default withAuth;
