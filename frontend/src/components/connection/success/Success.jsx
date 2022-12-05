import React from "react";
import { useHistory } from "react-router";
import Cele from "../../../assets/files/icons/cele.png";
import Wait from "../../../assets/files/icons/waiting.jpg";

export default function Success({ t }) {
  const history = useHistory();
  const onSubmit = (event) => {
    event.preventDefault();
    history.push("/");
  };
  return (
    <section className="account-section">
      <div className="vl-verify-container">
        <form onSubmit={onSubmit} className="account-form-container">
          <section className="illustration-holder">
            <img src={Wait} alt="wait" />
          </section>
          <div className="form-headers form-center-align">
            <h1 className="vl-heading f-700 vl-black">
              {t("welcome_board")}{" "}
              <span>
                <img src={Cele} alt="cele" className="cele-icon" />
              </span>
            </h1>
            <h2 className="vl-subheading f-400 vl-grey-xs vl-line-sm f-500-sm">
              {t("welcome_board_msg")}
            </h2>
          </div>
          <section className="call-by-action top-space">
            <button
              type="submit"
              className="vl-btn vl-btn-md vl-btn-full vl-btn-primary"
            >
              {t("welcome_board_btn")}
            </button>
          </section>
        </form>
      </div>
    </section>
  );
}
