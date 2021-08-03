import React from "react";
import "./style.scss";

const Tabs = (props) => {
  const { tabIndex, setTabIndex } = props;
  return (
    <div className="tabs">
      <ul className="nav nav-pills mb-2 mr-3" >
        <li
          className={tabIndex == 1 ? "nav-item-active " : "nav-item"}
          onClick={() => setTabIndex(1)}
        >
          <a className={tabIndex == 1 ? "nav-link text-secondary" : "nav-link"}>
            Affiliated Organisation
          </a>
        </li>
        <li
          className={tabIndex == 2 ? "nav-item-active " : "nav-item"}
          onClick={() => setTabIndex(2)}
        >
          <a className={tabIndex == 2 ? "nav-link text-secondary" : "nav-link"}>
            Received Request Pending
          </a>
        </li>
        <li
          className={tabIndex == 3 ? "nav-item-active " : "nav-item"}
          onClick={() => setTabIndex(3)}
        >
          <a className={tabIndex == 3 ? "nav-link text-secondary" : "nav-link"}>
            Recent Requests Sent
          </a>
        </li>
        <li
          className={tabIndex == 4 ? "nav-item-active " : "nav-item"}
          onClick={() => setTabIndex(4)}
        >
          <a className={tabIndex == 4 ? "nav-link text-secondary" : "nav-link"}>
            Send Request
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Tabs;
