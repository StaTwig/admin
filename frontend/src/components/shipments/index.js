import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import Table from "./table";
import Tabs from "../../shared/tabs";
import Add from "../../assets/icons/createshipment.png";
import mon from "../../assets/icons/brand.svg";
import calender from "../../assets/icons/calendar.svg";
import Status from "../../assets/icons/Status.svg";
import { useDispatch } from "react-redux";
import { getAllUsers } from "../../actions/userActions";
import { turnOn, turnOff } from "../../actions/spinnerActions";
import {
  getInboundShipments,
  getOutboundShipments,
  getSupplierAndReceiverList,
  getShipmentIds,
  getGMRShipments,
} from "../../actions/shipmentActions";
import Received from "../../assets/icons/Received1.svg";
import Sent from "../../assets/icons/Sent.png";
import update from "../../assets/icons/Update_Status.png";
import { config } from "../../config";
import { getExportFile } from "../../actions/poActions";
import { isAuthenticated } from "../../utils/commonHelper";
import Cards from "./cards/cards";

const ShipmentAnalytic = (props) => {
  const { t, i18n } = props;
  const [visible, setvisible] = useState("one");
  const [skip, setSkip] = useState(0);
  const [limit] = useState(20);
  const [alerts, setAlerts] = useState(false);
  const dispatch = useDispatch();
  const [outboundShipments, setOutboundShipments] = useState([]);
  const [inboundShipments, setInboundShipments] = useState([]);
  const [supplierReceiverList, setSupplierReceiverList] = useState([]);
  const [shipmentIdList, setShipmentIdList] = useState([]);
  const [idFilter, setIdFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState(null);
  const [toFilter, setToFilter] = useState("");
  const [fromFilter, setFromFilter] = useState("");
  const [count, setCount] = useState(0);
  const [exportFilterData, setExportFilterData] = useState([]);
  const [showExportFilter, setShowExportFilter] = useState(false);
  const [fromFilterDate, setFromFilterDate] = useState(new Date(0));
  const [toFilterDate, setToFilterDate] = useState(new Date());
  const intelEnabled =
    props.user.type === "Third Party Logistics" ? true : false;
  if (
    !isAuthenticated("inboundShipments") &&
    !isAuthenticated("outboundShipments")
  )
    props.history.push(`/profile`);

  useEffect(() => {
    async function fetchData() {
      if (intelEnabled) {
        dispatch(turnOn());
        const outboundRes = await getGMRShipments(0, limit, null, null, null);
        setOutboundShipments(outboundRes.data.data);
        setCount(outboundRes.data.count);
        dispatch(turnOff());
      } else {
        if (visible === "one") {
          dispatch(turnOn());
          const inboundRes = await getInboundShipments(
            "",
            "",
            "",
            "",
            "",
            0,
            limit,
            "",
            ""
          ); // id, from, to, dateFilter, status, skip, limit, fromFilterDate, toFilterDate
          setInboundShipments(inboundRes.data.inboundShipments);
          setCount(inboundRes.data.count);
          dispatch(turnOff());
        } else {
          dispatch(turnOn());
          const outboundRes = await getOutboundShipments(
            "",
            "",
            "",
            "",
            "",
            0,
            limit,
            "",
            ""
          ); // id, from, to, dateFilter, status, skip, limit, fromFilterDate, toFilterDate
          setOutboundShipments(outboundRes.data.outboundShipments);
          setCount(outboundRes.data.count);
          dispatch(turnOff());
        }
      }
      const supplierReceiverListRes = await getSupplierAndReceiverList();
      setSupplierReceiverList(supplierReceiverListRes.data);
      const shipmentIdListRes = await getShipmentIds();
      setShipmentIdList(shipmentIdListRes.data);
      setSkip(0);
    }
    fetchData();
    dispatch(getAllUsers());
  }, [dispatch, limit, intelEnabled, visible]);

  const onPageChange = async (pageNum) => {
    const recordSkip = (pageNum - 1) * limit;
    setSkip(recordSkip);
    if (intelEnabled) {
      dispatch(turnOn());
      const filteredOutboundShipments = await getGMRShipments(
        recordSkip,
        limit,
        fromFilterDate,
        toFilterDate,
        statusFilter
      );
      setOutboundShipments(filteredOutboundShipments.data.data);
      setCount(filteredOutboundShipments.data.count);
      dispatch(turnOff());
    } else {
      if (visible === "one") {
        dispatch(turnOn());
        const inboundRes = await getInboundShipments(
          idFilter,
          fromFilter,
          toFilter,
          dateFilter,
          statusFilter,
          recordSkip,
          limit,
          fromFilterDate,
          toFilterDate
        ); // id, from, to, dateFilter, status, skip, limit, fromFilterDate, toFilterDate
        setInboundShipments(inboundRes.data.inboundShipments);
        setCount(inboundRes.data.count);
        dispatch(turnOff());
      } else {
        dispatch(turnOn());
        const outboundRes = await getOutboundShipments(
          idFilter,
          fromFilter,
          toFilter,
          dateFilter,
          statusFilter,
          recordSkip,
          limit,
          fromFilterDate,
          toFilterDate
        ); // id, from, to, dateFilter, status, skip, limit, fromFilterDate, toFilterDate
        setOutboundShipments(outboundRes.data.outboundShipments);
        setCount(outboundRes.data.count);
        dispatch(turnOff());
      }
    }
    setData(visible);
  };

  const headers = {
    coloumn1: "Shipment ID",
    displayColoumn1: t("shipment_id"),
    coloumn2: "Shipment Date",
    displayColoumn2: t("shipment_date"),
    coloumn3: "From",
    displayColoumn3: t("from"),
    coloumn4: "To",
    displayColoumn4: t("to"),
    coloumn6: "ShipStatus",
    displayColoumn6: t("status"),

    img1: <img src={mon} width='16' height='16' alt='Monday' />,
    img2: <img src={calender} width='16' height='16' alt='Calender' />,
    img3: <img src={Received} width='16' height='16' alt='Received' />,
    img4: <img src={Sent} width='16' height='16' alt='Sent' />,
    img6: <img src={Status} width='16' height='16' alt='Status' />,
  };

  const setData = (v, a = false) => {
    setvisible(v);
    setAlerts(a);
  };

  const setDateFilterOnSelect = async (dateFilterSelected) => {
    setDateFilter(dateFilterSelected);
    setSkip(0);
    if (visible === "one") {
      dispatch(turnOn());
      const inboundRes = await getInboundShipments(
        idFilter,
        fromFilter,
        toFilter,
        dateFilterSelected,
        statusFilter,
        0,
        limit,
        fromFilterDate,
        toFilterDate
      ); // id, from, to, dateFilter, status, skip, limit, fromFilterDate, toFilterDate
      setInboundShipments(inboundRes.data.inboundShipments);
      setCount(inboundRes.data.count);
      dispatch(turnOff());
    } else {
      dispatch(turnOn());
      const outboundRes = await getOutboundShipments(
        idFilter,
        fromFilter,
        toFilter,
        dateFilterSelected,
        statusFilter,
        0,
        limit,
        fromFilterDate,
        toFilterDate
      ); // id, from, to, dateFilter, status, skip, limit, fromFilterDate, toFilterDate
      setOutboundShipments(outboundRes.data.outboundShipments);
      setCount(outboundRes.data.count);
      dispatch(turnOff());
    }
  };

  const setStatusFilterOnSelect = async (statusFilterSelected) => {
    if (intelEnabled) {
      dispatch(turnOn());
      setStatusFilter(statusFilterSelected);
      const filteredOutboundShipments = await getGMRShipments(
        skip,
        limit,
        fromFilterDate,
        toFilterDate,
        statusFilterSelected
      );
      setOutboundShipments(filteredOutboundShipments.data.data);
      setCount(filteredOutboundShipments.data.count);
      dispatch(turnOff());
    } else {
      setStatusFilter(statusFilterSelected);
      setSkip(0);
      if (visible === "one") {
        dispatch(turnOn());
        const inboundRes = await getInboundShipments(
          idFilter,
          fromFilter,
          toFilter,
          dateFilter,
          statusFilterSelected,
          0,
          limit,
          fromFilterDate,
          toFilterDate
        );
        setInboundShipments(inboundRes.data.inboundShipments);
        setCount(inboundRes.data.count);
        dispatch(turnOff());
      } else {
        dispatch(turnOn());
        const outboundRes = await getOutboundShipments(
          idFilter,
          fromFilter,
          toFilter,
          dateFilter,
          statusFilterSelected,
          0,
          limit,
          fromFilterDate,
          toFilterDate
        ); // id, from, to, dateFilter, status, skip, limit, fromFilterDate, toFilterDate
        setOutboundShipments(outboundRes.data.outboundShipments);
        setCount(outboundRes.data.count);
        dispatch(turnOff());
      }
    }
  };

  const setToShipmentFilterOnSelect = async (toShipmentFilterSelected) => {
    setToFilter(toShipmentFilterSelected);
    setSkip(0);
    if (visible === "one") {
      dispatch(turnOn());
      const inboundRes = await getInboundShipments(
        idFilter,
        fromFilter,
        toShipmentFilterSelected,
        dateFilter,
        statusFilter,
        0,
        limit,
        fromFilterDate,
        toFilterDate
      ); // id, from, to, dateFilter, status, skip, limit, fromFilterDate, toFilterDate
      setInboundShipments(inboundRes.data.inboundShipments);
      setCount(inboundRes.data.count);
      dispatch(turnOff());
    } else {
      dispatch(turnOn());
      const outboundRes = await getOutboundShipments(
        idFilter,
        fromFilter,
        toShipmentFilterSelected,
        dateFilter,
        statusFilter,
        0,
        limit,
        fromFilterDate,
        toFilterDate
      ); // id, from, to, dateFilter, status, skip, limit, fromFilterDate, toFilterDate
      setOutboundShipments(outboundRes.data.outboundShipments);
      setCount(outboundRes.data.count);
      dispatch(turnOff());
    }
  };

  const setFromShipmentFilterOnSelect = async (fromShipmentFilterSelected) => {
    setFromFilter(fromShipmentFilterSelected);
    setSkip(0);
    if (visible === "one") {
      dispatch(turnOn());
      const inboundRes = await getInboundShipments(
        idFilter,
        fromShipmentFilterSelected,
        toFilter,
        dateFilter,
        statusFilter,
        0,
        limit,
        fromFilterDate,
        toFilterDate
      ); // id, from, to, dateFilter, status, skip, limit, fromDate, toDate
      setInboundShipments(inboundRes.data.inboundShipments);
      setCount(inboundRes.data.count);
      dispatch(turnOff());
    } else {
      dispatch(turnOn());
      const outboundRes = await getOutboundShipments(
        idFilter,
        fromShipmentFilterSelected,
        toFilter,
        dateFilter,
        statusFilter,
        0,
        limit,
        fromFilterDate,
        toFilterDate
      ); // id, from, to, dateFilter, status, skip, limit, fromDate, toDate
      setOutboundShipments(outboundRes.data.outboundShipments);
      setCount(outboundRes.data.count);
      dispatch(turnOff());
    }
  };

  const setShipmentIdFilterOnSelect = async (shipmentIdFilterSelected) => {
    setIdFilter(shipmentIdFilterSelected);
    setSkip(0);
    if (visible === "one") {
      dispatch(turnOn());
      const inboundRes = await getInboundShipments(
        shipmentIdFilterSelected,
        "",
        "",
        "",
        "",
        0,
        limit,
        fromFilterDate,
        toFilterDate
      ); //id, from, to, dateFilter, status, skip, limit, fromFilterDate, toFilterDate
      setInboundShipments(inboundRes.data.inboundShipments);
      setCount(inboundRes.data.count);
      dispatch(turnOff());
    } else {
      dispatch(turnOn());
      const outboundRes = await getOutboundShipments(
        shipmentIdFilterSelected,
        "",
        "",
        "",
        "",
        0,
        limit,
        fromFilterDate,
        toFilterDate
      ); // id, from, to, dateFilter, status, skip, limit, fromFilterDate, toFilterDate
      setOutboundShipments(outboundRes.data.outboundShipments);
      setCount(outboundRes.data.count);
      dispatch(turnOff());
    }
  };
  
  const sendData = () => {
    let rtnArr = visible === "one" ? inboundShipments : outboundShipments;
    if (alerts)
      rtnArr = rtnArr.filter((row) => row?.shipmentAlerts?.length > 0);
    if (intelEnabled) rtnArr = outboundShipments;
    return rtnArr ? rtnArr : [];
  };

  useEffect(() => {
    setExportFilterData([
      { key: "excel", value: "excel", label: t("excel"), checked: false },
      { key: "pdf", value: "pdf", label: t("pdf"), checked: false },
    ]);
  }, [t]);

  const onSelectionDateFilter = async (value) => {
    if (intelEnabled) {
      dispatch(turnOn());
      if (value.length > 1) {
        const fromDate =
          value[0] === "" ? new Date(0) : new Date(value[0]).toISOString();
        setFromFilterDate(fromDate);
        const toDate =
          value[0] === ""
            ? new Date(Date.now())
            : new Date(new Date(value[1]).toDateString());
        setToFilterDate(toDate);
        const filteredOutboundShipments = await getGMRShipments(
          skip,
          limit,
          fromDate,
          toDate,
          statusFilter
        );
        setOutboundShipments(filteredOutboundShipments.data.data);
        setCount(filteredOutboundShipments.data.count);
        dispatch(turnOff());
      } else {
        const filteredOutboundShipments = await getGMRShipments(
          skip,
          limit,
          null,
          null,
          statusFilter
        );
        setOutboundShipments(filteredOutboundShipments.data.data);
        setCount(filteredOutboundShipments.data.count);
        dispatch(turnOff());
      }
    } else {
      const fromDate =
        value[0] === "" ? "" : new Date(new Date(value[0]).toDateString());
      setFromFilterDate(fromDate);
      if (value.length > 1) {
        const toDate =
          value[0] === "" ? "" : new Date(new Date(value[1]).toDateString());
        if (toDate) toDate.setDate(toDate.getDate() + 1);
        setToFilterDate(toDate);
        if (visible === "one") {
          dispatch(turnOn());
          const inboundRes = await getInboundShipments(
            idFilter,
            fromFilter,
            toFilter,
            dateFilter,
            statusFilter,
            0,
            limit,
            fromDate,
            toDate
          ); // id, from, to, dateFilter, status, skip, limit, fromDate, toDate
          setInboundShipments(inboundRes.data.inboundShipments);
          setCount(inboundRes.data.count);
          dispatch(turnOff());
        } else {
          dispatch(turnOn());
          const outboundRes = await getOutboundShipments(
            idFilter,
            fromFilter,
            toFilter,
            dateFilter,
            statusFilter,
            0,
            limit,
            fromDate,
            toDate
          ); // id, from, to, dateFilter, status, skip, limit, fromDate, toDate
          setOutboundShipments(outboundRes.data.outboundShipments);
          setCount(outboundRes.data.count);
          dispatch(turnOff());
        }
      }
    }
  };

  const onSelectionOfDropdownValue = (index, type, value) => {
    setShowExportFilter(false);
    let url = "";
    if (visible === "one") {
      url = `${
        config().getExportFileForInboundShipmentUrl
      }?type=${value.toLowerCase()}&shipmentId=${idFilter}&from=${fromFilter}&to=${toFilter}&dateFilter=${dateFilter}&status=${statusFilter}&fromDate=${fromFilterDate}&toDate=${toFilterDate}`;
    }
    if (visible === "two") {
      url = `${
        config().getExportFileForOutboundShipmentUrl
      }?type=${value.toLowerCase()}&shipmentId=${idFilter}&from=${fromFilter}&to=${toFilter}&dateFilter=${dateFilter}&status=${statusFilter}&fromDate=${fromFilterDate}&toDate=${toFilterDate}`;
    }

    var today = new Date();

    var nameOfFile;

    if (visible === "one") {
      nameOfFile =
        t("shipmentinbound") +
        today.getFullYear().toString() +
        "/" +
        (today.getMonth() + 1).toString() +
        "/" +
        today.getDate().toString();
    } else if (visible === "two") {
      nameOfFile =
        t("shipmentoutbound") +
        today.getFullYear() +
        "/" +
        (today.getMonth() + 1) +
        "/" +
        today.getDate();
    }
    getExportFile(url, value, i18n.language).then((response) => {
      if (response.data && response.status !== 200) {
        console.log("Error while downloading file");
      } else {
        const downloadUrl = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.setAttribute(
          "download",
          `${nameOfFile}.${
            value.toLowerCase() === "excel" ? "xlsx" : value.toLowerCase()
          }`
        ); //any other extension
        document.body.appendChild(link);
        link.click();
        link.remove();
      }
    });
  };

  return (
    <div className='shipment'>
      <div className='d-flex justify-content-between'>
        <h1 className='vl-heading-bdr black f-700'>{t("shipments")}</h1>
        <div className='d-flex'>
          {isAuthenticated("updateShipment") && !intelEnabled && (
            <Link to='/enterid' className='text-none'>
              <button className='mi-btn mi-btn-md mi-btn-orange mr-3 '>
                <img
                  src={update}
                  width='20'
                  height='17'
                  className='mr-2 mb-1'
                  alt='UpdateShipment'
                />
                <span>
                  <b>{t("update_shipment")}</b>
                </span>
              </button>
            </Link>
          )}
          {isAuthenticated("createShipment") && (
            <Link
              to={intelEnabled ? `/createshipment` : `/newshipment`}
              className='text-none'
            >
              <button className='mi-btn mi-btn-md mi-btn-yellow'>
                <img
                  src={Add}
                  width='20'
                  height='17'
                  className='mr-2 mb-1'
                  alt='CreateShipment'
                />
                <span>
                  <b>{t("create_shipment")}</b>
                </span>
              </button>
            </Link>
          )}
        </div>
      </div>
      {isAuthenticated("shipmentAnalytics") && !intelEnabled && (
        <Cards {...props} setData={setData} t={t} />
      )}
      {!intelEnabled && (
        <div className='mt-4'>
          <Tabs
            {...props}
            isAuthenticated={isAuthenticated}
            setvisible={setvisible}
            visible={visible}
            setShowExportFilter={setShowExportFilter}
          />
        </div>
      )}
      <div className='ribben-space'>
        <Table
          {...props}
          skip={skip}
          shpmnts={sendData}
          count={count}
          limit={limit}
          onPageChange={onPageChange}
          data={headers}
          shipmentIdList={shipmentIdList}
          shouldEnable={intelEnabled ? false : true}
          supplierReceiverList={intelEnabled ? [] : supplierReceiverList}
          setShipmentIdFilterOnSelect={setShipmentIdFilterOnSelect}
          setFromShipmentFilterOnSelect={setFromShipmentFilterOnSelect}
          setToShipmentFilterOnSelect={setToShipmentFilterOnSelect}
          setStatusFilterOnSelect={setStatusFilterOnSelect}
          setDateFilterOnSelect={setDateFilterOnSelect}
          fb='80%'
          showExportFilter={showExportFilter}
          setShowExportFilter={setShowExportFilter}
          exportFilterData={exportFilterData}
          onSelectionOfDropdownValue={onSelectionOfDropdownValue}
          onSelectionDateFilter={onSelectionDateFilter}
          isReportDisabled={!isAuthenticated("shipmentExportReport")}
          t={t}
        />
      </div>
    </div>
  );
};

export default ShipmentAnalytic;
