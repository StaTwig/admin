import React from "react";
import "./style.scss";

const Tabs = (props) => {
  const { t } = props;
  return (
    <div className='tabs'>
      <ul className='nav nav-pills'>
        {props.isAuthenticated("inboundShipments") && (
          <li
            className={props.visible === "one" ? "nav-item-active" : "nav-item"}
            onClick={() => {
              props.setvisible("one");
              props.setShowExportFilter(false);
            }}
          >
            <div
              id='tab-content'
              className={
                props.visible === "one" ? "nav-link" : "nav-link text-secondary"
              }
            >
              {t("inbound")}
            </div>
          </li>
        )}
        {props.isAuthenticated("outboundShipments") && (
          <li
            className={
              props.visible === "two" ? "nav-item-active " : "nav-item"
            }
            onClick={() => {
              props.setvisible("two");
              props.setShowExportFilter(false);
            }}
          >
            <div
              className={
                props.visible === "two" ? "nav-link" : "nav-link text-secondary"
              }
              id='tab-content'
            >
              {t("outbound")}
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Tabs;
