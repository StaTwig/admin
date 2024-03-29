import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getOverviewAnalytics } from "../../actions/analyticsAction";
import ChartsPage from "../doughnut";
import SummaryTable from "./summaryTable";
import totalshipments from "../../assets/icons/TotalShipmentsCompleted.svg";
import currentshipment from "../../assets/icons/CurrentShipmentInTransit.svg";
import shipmentsdelayed from "../../assets/icons/TotalShipmentsDelayed.svg";
import TotalInventoryAdded from "../../assets/icons/TotalProductCategory.png";
import AverageOrderProcessingTime from "../../assets/icons/Av_or_pr_ti.png";
import { isAuthenticated } from "../../utils/commonHelper";

import "./style.scss";

const Overview = (props) => {
  const { t, i18n } = props;
  const [visible, setvisible] = useState("one");
  const [shpmnts, setShpmnts] = useState([]);
  const [overviewAnalytics, setOverViewAnalytics] = useState({});
  if (!isAuthenticated("overview")) props.history.push(`/profile`);
  useEffect(() => {
    async function fetchData() {
      const result = await getOverviewAnalytics();
      setOverViewAnalytics(result.data.overview);
    }
    fetchData();
  }, []);

  const setData = (v, a = "") => {
    setvisible(v);
    let rtnArr =
      v === "two"
        ? props.shipments.filter(
            (row) => props.user.warehouseId === row.supplier.locationId
          )
        : props.shipments.filter(
            (row) => props.user.warehouseId !== row.supplier.locationId
          );
    if (a !== "")
      rtnArr = rtnArr.filter((row) => row?.shipmentAlerts?.length > 0);
    setShpmnts(rtnArr);
  };

  return (
    <div className="overview">
      <h1 style={{paddingBottom:"10px", marginBottom:"1.2rem"}} className="vl-heading-bdr f-700 black">{t("overview")}</h1>
      <div className="full-width-ribben">
        <div className="row no-gutters">
          <div className="col">
            <div className="panel">
              <div className="picture truck-bg">
                <img src={totalshipments} alt="truck" />
              </div>
              <div className="d-flex flex-column">
                <div className="text-sm-3 f-700 grey">
                  {t("total_outbound_shipments")}
                </div>
                <div className="count1 vl-card-subtext">
                  {overviewAnalytics?.outboundShipments}
                  <small className="dayStatus ml-1"></small>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="panel">
              <div className="picture truck-bg">
                <img
                  className="currentintransit"
                  src={currentshipment}
                  alt="truck"
                />
              </div>

              <div className="d-flex flex-column">
                <div className="text-sm-3 f-700 grey">
                  {t("total_inbound_shipments")}
                </div>
                <div className="count3 vl-card-subtext">
                  {overviewAnalytics?.inboundShipments}
                  <small className="dayStatus ml-1"></small>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="panel">
              <div className="time truck-bg">
                <img src={TotalInventoryAdded} alt="truck" width="65%" />
              </div>
              <div className="d-flex flex-column">
                <div className="text-sm-3 f-700 grey">
                  {t("total_product_category")}
                </div>
                <div className="count2 vl-card-subtext">
                  {overviewAnalytics?.totalProductCategory}
                  <small className="dayStatus ml-1"></small>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="panel">
              <div className="time truck-bg">
                <img
                  src={AverageOrderProcessingTime}
                  width="30px"
                  alt="truck"
                />
              </div>
              <div className="d-flex flex-column">
                <div className="text-sm-3 f-700 grey">
                  {t("avg_order_processing_time")}
                </div>
                <div className="count4 vl-card-subtext">
                  {overviewAnalytics?.averageOrderProcessingTime}
                  <small className="dayStatus ml-1"></small>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="panel border-0">
              <div className="picture truck-bg">
                <img src={shipmentsdelayed} alt="truck" />
              </div>
              <div className="d-flex flex-column">
                <div className="text-sm-3 f-700 grey">
                  {t("pending_orders")}
                </div>
                <div className="count5 vl-card-subtext">
                  {overviewAnalytics?.pendingOrders}{" "}
                  <small className="dayStatus"></small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row ribben-space">
        <div className="col-sm-12 col-lg-5 col-xl-5 mb-sm-4">
          <div className="custom-card">
            <div className="card-header">
              <div className="d-flex align-items-center justify-content-between">
                <h5 className="card-title f-500 card-text mt-2">
                  {t("inventory_summary")}
                </h5>
                {isAuthenticated("addInventory") && (
                  <Link to="/newinventory" className="text-none">
                    <button className="mi-btn mi-btn-md mi-btn-primary mt-3">
                      {" "}
                      <b>{t("add_inventory")}</b>
                    </button>
                  </Link>
                )}
              </div>
            </div>
            <div className="card-body pl-1">
              <div id="chartjs-render-monitor">
                <ChartsPage {...props} t={t} />
              </div>
            </div>
            <div className="card-footer mb-2">
              <div className="d-flex align-items-center justify-content-center">
                {isAuthenticated("viewInventory") && (
                  <Link to="/inventory" className="text-none">
                    <button className="mi-btn mi-btn-md mi-btn-blue">
                      {t("view_more")}
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-lg-7 col-xl-7 p-lg-0  mb-sm-4">
          <div className="custom-card ml-1">
            <div className="card-header">
              <div className="d-flex align-items-center justify-content-between">
                <h5 className="card-title f-600 card-text mt-2">
                  {t("shipment_summary")}
                </h5>
                {isAuthenticated("createShipment") && (
                  <Link to="/newshipment" className="text-none">
                    <button className="mi-btn mi-btn-md mi-btn-primary mt-3">
                      <b> {t("create_shipment")} </b>
                    </button>
                  </Link>
                )}
              </div>
            </div>
            <div className="card-body" style={{ padding: 0 }}>
              <SummaryTable
                {...props}
                t={t}
                setvisible={setData}
                visible={visible}
              />
            </div>
            <div className="card-footer mb-2">
              <div className="d-flex align-items-center justify-content-center">
                {isAuthenticated("viewShipment") && (
                  <Link to="/shipments" className="text-none">
                    <button className="mi-btn mi-btn-md mi-btn-blue">
                      {t("view_more")}
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;

/*
 {props.shipmentsCount.totalShipments.thisYear}
            { props.inventoriesCount.counts.inventoryAdded.total}
            {props.shipmentsCount.currentShipments.thisMonth}
             {props.shipmentsCount.totalShipments.thisWeek} */
