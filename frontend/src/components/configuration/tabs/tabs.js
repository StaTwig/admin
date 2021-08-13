import React from "react";
import "./style.scss";

const Tabs = (props) => {
  const { tabIndex, setTabIndex } = props;
  return (
    <div className="tabs">
      <ul className="nav nav-pills mb-2 ml-3">
        <li
          className={tabIndex == 0 ? "nav-item-active " : "nav-item"}
          onClick={() => setTabIndex(0)}
        >
          <a className={tabIndex == 0 ? "nav-link text-secondary" : "nav-link"}>
            {'User Role'}
          </a>
        </li>
        <li
          className={tabIndex == 1 ? "nav-item-active " : "nav-item"}
          onClick={() => setTabIndex(1)}
        >
          <a className={tabIndex == 1 ? "nav-link text-secondary" : "nav-link"}>
            Workflow
          </a>
        </li>
        <li
          className={tabIndex == 2 ? "nav-item-active" : "nav-item "}
          onClick={() => setTabIndex(2)}
        >
          <a className={tabIndex == 2 ? "nav-link text-secondary " : "nav-link "}>
            Integration
          </a>
        </li>
        <li
          className={tabIndex == 3 ? "nav-item-active " : "nav-item "}
          onClick={() => setTabIndex(3)}
        >
          <a className={tabIndex == 3 ? "nav-link text-secondary " : "nav-link"}>
            Analytics
          </a>
        </li>
        <li
          className={tabIndex == 4 ? "nav-item-active " : "nav-item"}
          onClick={() => setTabIndex(4)}
        >
          <a className={tabIndex == 4 ? "nav-link text-secondary" : "nav-link"}>
            Rules
          </a>
        </li>
        <li
          className={tabIndex == 5 ? "nav-item-active " : "nav-item"}
          onClick={() => setTabIndex(5)}
        >
          <a className={tabIndex == 5 ? "nav-link text-secondary" : "nav-link "}>
            Payment
          </a>
        </li>
        <li
          className={tabIndex == 6 ? "nav-item-active" : "nav-item"}
          onClick={() => setTabIndex(6)}
        >
          <a className={tabIndex == 6 ? "nav-link text-secondary " : "nav-link "}>
            Type
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Tabs;
