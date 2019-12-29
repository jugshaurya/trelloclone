import React from "react";

const withAuth = WrappedComponent => {
  class decoratedClass extends React.Component {
    componentDidMount() {
      this.shouldNavigateAway();
    }

    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    shouldNavigateAway = () => {
      if (!localStorage.getItem("token")) {
        this.props.history.push("/signin");
      } else {
        console.log("Hello Hello Hello");
      }
    };

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
  return decoratedClass;
};

export default withAuth;
