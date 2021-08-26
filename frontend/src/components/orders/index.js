import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import Table from "./table";
import Tabs from "./tabs";
import Tiles from "./tiles";
import OrderIcon from "../../assets/icons/order.svg";
import TableFilter from "../../shared/advanceTableFilter";
import mon from "../../assets/icons/brand.svg";
import Package from "../../assets/icons/package.svg";
import calender from "../../assets/icons/calendar.svg";
import Order from "../../assets/icons/orders.svg";
import Totalshipments from "../../assets/icons/TotalShipment.svg";
import { useDispatch, useSelector } from "react-redux";
import ExportIcon from "../../assets/icons/Export.svg";
import dropdownIcon from "../../assets/icons/drop-down.svg";
import ExcelPopUp from "./ExcelPopup";
import Modal from "../../shared/modal";
import Status from "../../assets/icons/Status.svg";
import {
  getSentPOs,
  getReceivedPOs,
  getOrderIds,
  getProductIdDeliveryLocationsOrganisations,
  getPOs,
  resetPOs,
  resetReviewPos,
  getExportFile,
} from "../../actions/poActions";
import { config } from "../../config";
import uuid from "react-uuid";

const Orders = (props) => {
  const [menu, setMenu] = useState(false);
  const [openCreatedOrder, setOpenCreatedOrder] = useState(false);
  const [openExcel, setOpenExcel] = useState(false);
  const [visible, setvisible] = useState("one");
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [alerts, setAlerts] = useState(false);
  const dispatch = useDispatch();
  const [outboundRecords, setOutboundRecords] = useState([]);
  const [inboundRecords, setInboundRecords] = useState([]);
  const [dateFilter, setDateFilter] = useState("");
  const [productNameFilter, setProductNameFilter] = useState("");
  const [toFilter, setToFilter] = useState("");
  const [fromFilter, setFromFilter] = useState("");
  const [orderIdFilter, setOrderIdFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [poOrderIdList, setPoOrderIdList] = useState([]);
  const [poDeliveryLocationsList, setPoDeliveryLocationsList] = useState([]);
  const [poProductsList, setPoProductsList] = useState([]);
  const [poOrganisationsList, setPoOrganisationsList] = useState([]);
  const [count, setCount] = useState(0);
  const [exportFilterData, setExportFilterData] = useState([]);
  const [showExportFilter, setShowExportFilter] = useState(false);
  useEffect(() => {
    async function fetchData() {
      if (visible == "one") {
        setDateFilter("");
        setProductNameFilter("");
        setToFilter("");
        setFromFilter("");
        setOrderIdFilter("");
        setStatusFilter("");
        setLocationFilter("");
        const outboundRes = await getSentPOs("", "", "", "", "", "", 0, limit); //to, orderId, productName, deliveryLocation, date, statusFilter,skip, limit
        setOutboundRecords(outboundRes.data.outboundPOs);
        setCount(outboundRes.data.count);
      } else {
        setDateFilter("");
        setProductNameFilter("");
        setToFilter("");
        setFromFilter("");
        setOrderIdFilter("");
        setStatusFilter("");
        setLocationFilter("");
        const inboundRes = await getReceivedPOs(
          "",
          "",
          "",
          "",
          "",
          "",
          0,
          limit
        ); //from, orderId, productName, deliveryLocation, date,status, skip, limit
        setInboundRecords(inboundRes.data.inboundPOs);
        setCount(inboundRes.data.count);
      }
      const orderIdListRes = await getOrderIds();
      setPoOrderIdList(orderIdListRes);

      const productsLocationsOrganisationsRes =
        await getProductIdDeliveryLocationsOrganisations();
      // console.log('products location', productsLocationsOrganisationsRes);
      setPoDeliveryLocationsList(
        productsLocationsOrganisationsRes.deliveryLocations
      );
      setPoProductsList(productsLocationsOrganisationsRes.productIds);
      setPoOrganisationsList(productsLocationsOrganisationsRes.organisations);
      setSkip(0);
    }
    // dispatch(resetReviewPos({}));
    fetchData();
  }, [visible]);

  const onPageChange = async (pageNum) => {
    const recordSkip = (pageNum - 1) * limit;
    setSkip(recordSkip);
    if (visible == "one") {
      const outboundRes = await getSentPOs(
        toFilter,
        orderIdFilter,
        productNameFilter,
        locationFilter,
        dateFilter,
        statusFilter,
        recordSkip,
        limit
      ); //to, orderId, productName, deliveryLocation, date, skip, limit
      setOutboundRecords(outboundRes.data.outboundPOs);
      setCount(outboundRes.data.count);
    } else {
      const inboundRes = await getReceivedPOs(
        fromFilter,
        orderIdFilter,
        productNameFilter,
        locationFilter,
        dateFilter,
        statusFilter,
        recordSkip,
        limit
      ); //from, orderId, productName, deliveryLocation, date, skip, limit
      console.log(inboundRes.data.inboundPOs);
      setInboundRecords(inboundRes.data.inboundPOs);
      setCount(inboundRes.data.count);
    }
    setData(visible);
  };

  const headers = {
    coloumn1: visible == "one" ? "Order Sent To" : "Order CreatedBy",
    coloumn2: "Order Date",
    coloumn3: "Order ID",
    coloumn4: "Product",
    coloumn5: "Delivery Location",
    coloumn6: "Status",

    img1: <img src={mon} width="16" height="16" />,
    img2: <img src={calender} width="16" height="16" />,
    img3: <img src={Order} width="18" height="16" />,
    img4: <img src={Package} width="16" height="16" />,
    img5: <img src={Totalshipments} width="18" height="18" />,
    img6: <img src={Status} width="16" height="16" />,
  };

  const closeExcelModal = () => {
    setOpenExcel(false);
  };

  const closeModal = () => {
    setOpenCreatedOrder(false);
  };

  const setData = (v, a = false) => {
    setvisible(v);
    setAlerts(a);
  };
  const setDateFilterOnSelect = async (dateFilterSelected) => {
    setDateFilter(dateFilterSelected);
    setSkip(0);
    if (visible == "one") {
      const outboundRes = await getSentPOs(
        toFilter,
        orderIdFilter,
        productNameFilter,
        locationFilter,
        dateFilterSelected,
        statusFilter,
        0,
        limit
      ); //to, orderId, productName, deliveryLocation, date, skip, limit
      setOutboundRecords(outboundRes.data.outboundPOs);
      setCount(outboundRes.data.count);
    } else {
      const inboundRes = await getReceivedPOs(
        fromFilter,
        orderIdFilter,
        productNameFilter,
        locationFilter,
        dateFilterSelected,
        statusFilter,
        0,
        limit
      ); //from, orderId, productName, deliveryLocation, date, skip, limit
      setInboundRecords(inboundRes.data.inboundPOs);
      setCount(inboundRes.data.count);
    }
  };

  const setLocationFilterOnSelect = async (locationFilterSelected) => {
    setLocationFilter(locationFilterSelected);
    setSkip(0);
    if (visible == "one") {
      const outboundRes = await getSentPOs(
        toFilter,
        orderIdFilter,
        productNameFilter,
        locationFilterSelected,
        dateFilter,
        statusFilter,
        0,
        limit
      ); //to, orderId, productName, deliveryLocation, date, skip, limit;
      setOutboundRecords(outboundRes.data.outboundPOs);
      setCount(outboundRes.data.count);
    } else {
      const inboundRes = await getReceivedPOs(
        fromFilter,
        orderIdFilter,
        productNameFilter,
        locationFilterSelected,
        dateFilter,
        statusFilter,
        0,
        limit
      ); //from, orderId, productName, deliveryLocation, date, skip, limit
      setInboundRecords(inboundRes.data.inboundPOs);
      setCount(inboundRes.data.count);
    }
  };

  const setProductNameFilterOnSelect = async (productNameFilterSelected) => {
    setProductNameFilter(productNameFilterSelected);
    setSkip(0);
    if (visible == "one") {
      const outboundRes = await getSentPOs(
        toFilter,
        orderIdFilter,
        productNameFilterSelected,
        locationFilter,
        dateFilter,
        statusFilter,
        0,
        limit
      ); //to, orderId, productName, deliveryLocation, date, skip, limit
      setOutboundRecords(outboundRes.data.outboundPOs);
      setCount(outboundRes.data.count);
    } else {
      const inboundRes = await getReceivedPOs(
        fromFilter,
        orderIdFilter,
        productNameFilterSelected,
        locationFilter,
        dateFilter,
        statusFilter,
        0,
        limit
      ); //from, orderId, productName, deliveryLocation, date, skip, limit
      setInboundRecords(inboundRes.data.inboundPOs);
      setCount(inboundRes.data.count);
    }
  };

  const setOrderIdNameFilterOnSelect = async (orderIdFilterSelected) => {
    setOrderIdFilter(orderIdFilterSelected);
    setSkip(0);
    if (visible == "one") {
      const outboundRes = await getSentPOs(
        toFilter,
        orderIdFilterSelected,
        productNameFilter,
        locationFilter,
        dateFilter,
        statusFilter,
        0,
        limit
      ); //to, orderId, productName, deliveryLocation, date, skip, limit
      setOutboundRecords(outboundRes.data.outboundPOs);
      setCount(outboundRes.data.count);
    } else {
      const inboundRes = await getReceivedPOs(
        fromFilter,
        orderIdFilterSelected,
        productNameFilter,
        locationFilter,
        dateFilter,
        statusFilter,
        0,
        limit
      ); //from, orderId, productName, deliveryLocation, date, skip, limit
      setInboundRecords(inboundRes.data.inboundPOs);
      setCount(inboundRes.data.count);
    }
  };

  const setStatusFilterOnSelect = async (statusFilterSelected) => {
    console.log(statusFilterSelected);
    setStatusFilter(statusFilterSelected);
    setSkip(0);
    if (visible == "one") {
      const outboundRes = await getSentPOs(
        toFilter,
        orderIdFilter,
        productNameFilter,
        locationFilter,
        dateFilter,
        statusFilterSelected,
        0,
        limit
      ); //to, orderId, productName, deliveryLocation, date,status, skip, limit
      console.log(outboundRes.data.outboundPOs);
      setOutboundRecords(outboundRes.data.outboundPOs);
      setCount(outboundRes.data.count);
    } else {
      const inboundRes = await getReceivedPOs(
        fromFilter,
        orderIdFilter,
        productNameFilter,
        locationFilter,
        dateFilter,
        statusFilterSelected,
        0,
        limit
      ); //from, orderId, productName, deliveryLocation, date, skip, limit
      console.log(inboundRes.data.inboundPOs);
      setInboundRecords(inboundRes.data.inboundPOs);
      setCount(inboundRes.data.count);
    }
  };

  const setFromToFilterOnSelect = async (fromToFilterSelected) => {
    setFromFilter(fromToFilterSelected);
    setToFilter(fromToFilterSelected);
    setSkip(0);
    if (visible == "one") {
      const outboundRes = await getSentPOs(
        fromToFilterSelected,
        orderIdFilter,
        productNameFilter,
        locationFilter,
        dateFilter,
        statusFilter,
        0,
        limit
      ); //to, orderId, productName, deliveryLocation, date, skip, limit
      setOutboundRecords(outboundRes.data.outboundPOs);
      setCount(outboundRes.data.count);
    } else {
      const inboundRes = await getReceivedPOs(
        fromToFilterSelected,
        orderIdFilter,
        productNameFilter,
        locationFilter,
        dateFilter,
        statusFilter,
        0,
        limit
      ); //from, orderId, productName, deliveryLocation, date, skip, limit
      setInboundRecords(inboundRes.data.inboundPOs);
      setCount(inboundRes.data.count);
    }
  };

  const sendData = () => {
    let rtnArr = visible == "one" ? outboundRecords : inboundRecords;
    if (alerts)
      rtnArr = rtnArr.filter((row) => row?.shipmentAlerts?.length > 0);
    return rtnArr ? rtnArr : [];
  };

  useEffect(() => {
    setExportFilterData([
      { key: "excel", value: "Excel", checked: false },
      { key: "pdf", value: "PDF", checked: false },
      { key: "email", value: "Mail", checked: false },
      { key: "print", value: "Print", checked: false },
    ]);
  }, []);

  const onSelectionOfDropdownValue = (index, type, value) => {
    setShowExportFilter(false);
    let url = ''
    if (visible === 'one') {
      url = `${config().getExportFileForInboundPurchaseOrdersUrl}?type=${value.toLowerCase()}`;
    }
    if (visible === 'two') {
      url = `${config().getExportFileForOutboundPurchaseOrdersUrl}?type=${value.toLowerCase()}`;
    }

    getExportFile(url)
      .then(response => {
        if ((response.data) && response.status !== 200) {
          console.log('Error while downloading file');
        } else {
          const downloadUrl = window.URL.createObjectURL(new Blob([response]));
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.setAttribute('download', `${uuid()}.${value.toLowerCase()}`); //any other extension
          document.body.appendChild(link);
          link.click();
          link.remove();
        }
      })
  }

  return (
    <div className="orders">
      <div className="d-flex justify-content-between">
        <h1 className="breadcrumb">YOUR ORDERS</h1>
        <div className="d-flex">
          <Link to="/neworder">
            <button className="btn btn-orange fontSize20 font-bold mt-1">
              <img
                src={OrderIcon}
                width="20"
                height="17"
                className="mr-2 mb-1"
              />
              <span style={{ color: "white" }}>
                <b>Create New Order</b>
              </span>
            </button>
          </Link>

          {/* <div className="d-flex flex-column align-items-center"> */}
          <button
            className="btn-primary btn fontSize20 font-bold mt-1 ml-2"
            onClick={() => setMenu(!menu)}
          >
            <div className="d-flex align-items-center">
              <img src={ExportIcon} width="16" height="16" className="mr-2" />
              <span>
                <b>Import</b>
              </span>
              <img src={dropdownIcon} width="14" height="14" className="ml-2" />
            </div>
          </button>
          {menu ? (
            <div class="menu">
              <button
                className=" btn btn-outline-info mb-2 "
                onClick={() => setOpenExcel(true)}
              >
                {" "}
                Excel
              </button>
              <button className=" btn btn-outline-info"> Other</button>
            </div>
          ) : null}
          {openExcel && (
            <Modal
              title="Import"
              close={() => closeExcelModal()}
              size="modal-md" //for other size's use `modal-lg, modal-md, modal-sm`
            >
              <ExcelPopUp
                {...props}
                onHide={closeExcelModal} //FailurePopUp
                setOpenCreatedOrder={setOpenCreatedOrder}
                setOpenExcel={setOpenExcel}
                setMenu={setMenu}
              />
            </Modal>
          )}
          {/* </div> */}
        </div>
      </div>
      <Tiles {...props} setData={setData} />
      <div className="mt-4">
        <Tabs {...props} setvisible={setvisible} visible={visible} setShowExportFilter={setShowExportFilter}/>
      </div>
      <div className="full-width-ribben mt-4">
        <TableFilter
          visible={visible}
          data={headers}
          poOrderIdList={poOrderIdList}
          poDeliveryLocationsList={poDeliveryLocationsList}
          poProductsList={poProductsList}
          poOrganisationsList={poOrganisationsList}
          setFromToFilterOnSelect={setFromToFilterOnSelect}
          setOrderIdNameFilterOnSelect={setOrderIdNameFilterOnSelect}
          setStatusFilterOnSelect={setStatusFilterOnSelect}
          setProductNameFilterOnSelect={setProductNameFilterOnSelect}
          setLocationFilterOnSelect={setLocationFilterOnSelect}
          setDateFilterOnSelect={setDateFilterOnSelect}
          fb="76%"
          showExportFilter={showExportFilter}
          setShowExportFilter={setShowExportFilter}
          exportFilterData={exportFilterData}
          onSelectionOfDropdownValue={onSelectionOfDropdownValue}
        />
      </div>
      <div className="ribben-space">
        <Table
          {...props}
          skip={skip}
          ordrs={sendData}
          visible={visible}
          count={count}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default Orders;
