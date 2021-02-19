import React from "react";
import "./style.scss";

const Tabs = (props) => {
  return (
    <div className="tabs">
      <ul className="nav nav-pills mb-2 mr-3">
        <li
          className={props.tabIndex == 1 ? "nav-item-active " : "nav-item"}
          onClick={() => props.setTabIndex(1)}
        >
          <a
            className={
              props.tabIndex == 1 ? "nav-link text-secondary" : "nav-link"
            }
          >
            Affiliate Organisation
          </a>
        </li>
        <li
          className={props.tabIndex == 2 ? "nav-item-active " : "nav-item"}
          onClick={() => props.setTabIndex(2)}
        >
          <a
            className={
              props.tabIndex == 2 ? "nav-link text-secondary" : "nav-link"
            }
          >
            Received Request Pending
          </a>
        </li>
        <li
          className={props.tabIndex == 3 ? "nav-item-active " : "nav-item"}
          onClick={() => props.setTabIndex(3)}
        >
          <a
            className={
              props.tabIndex == 3 ? "nav-link text-secondary" : "nav-link"
            }
          >
            Received Requests Sent
          </a>
        </li>
        <li
          className={props.tabIndex == 4 ? "nav-item-active " : "nav-item"}
          onClick={() => props.setTabIndex(4)}
        >
          <a
            className={
              props.tabIndex == 4 ? "nav-link text-secondary" : "nav-link"
            }
          >
            Sent Request
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Tabs;
