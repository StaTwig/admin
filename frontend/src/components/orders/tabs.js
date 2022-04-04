import React from "react";
import "./style.scss";
import { isAuthenticated } from "../../utils/commonHelper";

const Tabs = (props) => {
  const { t } = props;
  return (
    <div className='tabs'>
      <ul className='nav nav-pills'>
        {isAuthenticated("viewOutboundOrders") && (
          <li
            className={props.visible === "one" ? "nav-item-active" : "nav-item"}
            onClick={() => {
              props.setvisible("one");
              props.setShowExportFilter(false);
            }}
          >
            <div
              className={
                props.visible === "one" ? "nav-link" : "nav-link text-secondary"
              }
            >
              {t("orders_sent")}
            </div>
          </li>
        )}
        {isAuthenticated("viewInboundOrders") && (
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
            >
              {t("orders_received")}
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Tabs;
