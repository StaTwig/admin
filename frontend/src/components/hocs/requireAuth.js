import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";

// eslint-disable-next-line import/no-anonymous-default-export
export default (ComposedComponent, isAdminComponent) => {
  class RequireAuth extends Component {
    render() {
      const { user } = this.props;

      let token = localStorage?.theLedgerToken;
      let userDetails = jwt_decode(token);
      const demoLogin = userDetails?.partialRegistration;
      let check = user;
      
      if (!user)
        check = localStorage.theLedgerToken;

      if(isAdminComponent){
          const userRole = user?.role || userDetails?.role;
          const userType = user?.type || userDetails?.type;
          if(userRole === "admin" || userType === "CENTRAL_AUTHORITY")
            check = true;
          else
            check = null; 
          console.log(check)
        }
      switch (check) {
        case null:
          return <Redirect to='/' />;

        default:
          return <ComposedComponent {...this.props} demoLogin={demoLogin} />;
      }
    }
  }

  const mapStateToProps = (state) => ({
    user: state.user,
  });

  return connect(mapStateToProps)(RequireAuth);
};
