import React, { useEffect, useState } from "react";
import "./style.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Home from "../../components/home/index";

const HomeContainer = (props) => {
  // const user = useSelector((state) => {
  //   return state.user;
  // });

  // useEffect(() => {
  //   if (user) {
  //     props.history.push("/overview");
  //   }
  // }, []);

  return (
    <div className="Homecontainer">
      <div className="bg-image">
        <div className="centered">
          <Home />
        </div>
      </div>
    </div>
  );
};

export default HomeContainer;
