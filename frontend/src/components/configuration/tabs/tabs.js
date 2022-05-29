import { t } from "i18next";
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
          <span className={tabIndex == 0 ? "nav-link textColor" : "nav-link"}>
            {t('user_role')}
          </span>
        </li>
        <li
          className={tabIndex == 1 ? "nav-item-active " : "nav-item"}
          onClick={() => setTabIndex(1)}
        >
          <span className={tabIndex == 1 ? "nav-link textColor" : "nav-link"}>
            {t('workflow')}
          </span>
        </li>
        { props.user.organisationType == "Third Party Logistics" && (
          <li
            className={tabIndex == 2 ? "nav-item-active" : "nav-item "}
            onClick={() => setTabIndex(2)}
          >
            <span className={tabIndex == 2 ? "nav-link textColor " : "nav-link "}>
              {t('integration')}
            </span>
          </li>
        )}
        <li
          className={tabIndex == 3 ? "nav-item-active " : "nav-item "}
          onClick={() => setTabIndex(3)}
        >
          <span className={tabIndex == 3 ? "nav-link textColor " : "nav-link"}>
            {t('analytics')}
          </span>
        </li>
        <li
          className={tabIndex == 4 ? "nav-item-active " : "nav-item"}
          onClick={() => setTabIndex(4)}
        >
          <span className={tabIndex == 4 ? "nav-link textColor" : "nav-link"}>
            {t('rules')}
          </span>
        </li>
        <li
          className={tabIndex == 5 ? "nav-item-active " : "nav-item"}
          onClick={() => setTabIndex(5)}
        >
          <span className={tabIndex == 5 ? "nav-link textColor" : "nav-link "}>
            {t('Payment')}
          </span>
        </li>
        <li
          className={tabIndex == 6 ? "nav-item-active" : "nav-item"}
          onClick={() => setTabIndex(6)}
        >
          <span className={tabIndex == 6 ? "nav-link textColor " : "nav-link "}>
            {t('Type')}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Tabs;
