import React, { useState } from "react";
import { Link } from "react-router-dom";
import Selection from "./selection";
import Login from "./login";
import logo from "../../assets/ABInBev.png";
import backarrow from "../../assets/backarrow.png";
import "./style.scss";

const Home = (props) => {
  const [buttonActive, setButtonActive] = useState(0);
  const [steps, setSteps] = useState(1);
  const [continueClick, setContinueClick] = useState(false);

  return (
    <div className="home">
      <div className="d-block blockC">
        <div>
          <img src={backarrow} width={20} />
        </div>
        {steps == 1 && (
          <Selection
            setContinueClick={setContinueClick}
            setButtonActive={setButtonActive}
            buttonActive={buttonActive}
            continueClick={continueClick}
            setSteps={setSteps}
          />
        )}
        {steps == 2 && <Login setSteps={setSteps} steps={steps} />}
        <div className="row justify-content-center">
          <div className="col text-center footer-logo">
            <img src={logo} width={60} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
