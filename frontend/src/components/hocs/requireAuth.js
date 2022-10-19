import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";

export default (ComposedComponent) => {
  class RequireAuth extends Component {
    render() {
      const { user } = this.props;
      let token = localStorage?.theLedgerToken;
      let userDetails = jwt_decode(token);
      const demoLogin = userDetails?.partialRegistration;

      let check = user;
      if (!user)
        check = localStorage.theLedgerToken;
      switch (check) {
        case null:
          return <Redirect to='/' />;

        default:
          return <ComposedComponent {...this.props} demoLogin={demoLogin} />;
      }
    }
  }

  const mapStateToProps = ({ user }) => ({
    user: user,
  });

  return connect(mapStateToProps)(RequireAuth);
};
