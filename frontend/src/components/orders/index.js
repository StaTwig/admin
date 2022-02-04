import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import Table from "./table";
import Tabs from "./tabs";
import OrderIcon from "../../assets/icons/order.svg";
import mon from "../../assets/icons/brand.svg";
import Package from "../../assets/icons/package.svg";
import calender from "../../assets/icons/calendar.svg";
import Order from "../../assets/icons/orders.svg";
import Totalshipments from "../../assets/icons/TotalShipment.svg";
import ExportIcon from "../../assets/icons/Export.svg";
import dropdownIcon from "../../assets/icons/drop-down.svg";
import ExcelPopUp from "./ExcelPopup";
import Cards from "./cards/cards";
import Modal from "../../shared/modal";
import Status from "../../assets/icons/Status.svg";
import {
  getSentPOs,
  getReceivedPOs,
  getOrderIds,
  getProductIdDeliveryLocationsOrganisations,
  getExportFile,
} from "../../actions/poActions";
import { config } from "../../config";
import { isAuthenticated } from "../../utils/commonHelper";

const Orders = (props) => {
  const { t } = props;
  const [menu, setMenu] = useState(false);
  const [openCreatedOrder, setOpenCreatedOrder] = useState(false);
  const [openExcel, setOpenExcel] = useState(false);
  const [visible, setvisible] = useState("one");
  const [skip, setSkip] = useState(0);
  const [limit] = useState(10);
  const [alerts, setAlerts] = useState(false);
  // const dispatch = useDispatch();
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
  const [fromFilterDate, setFromFilterDate] = useState("");
  const [toFilterDate, setToFilterDate] = useState("");
  if (
    !isAuthenticated("viewInboundOrders") &&
    !isAuthenticated("viewOutboundOrders")
  )
    props.history.push(`/profile`);
  useEffect(() => {
    async function fetchData() {
      if (visible === "one") {
        setDateFilter("");
        setProductNameFilter("");
        setToFilter("");
        setFromFilter("");
        setOrderIdFilter("");
        setStatusFilter("");
        setLocationFilter("");
        const outboundRes = await getSentPOs("", "", "", "", "", "", 0, limit, fromFilterDate, toFilterDate); //to, orderId, productName, deliveryLocation, date, statusFilter,skip, limit
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
          limit,
          fromFilterDate,
          toFilterDate
        ); //from, orderId, productName, deliveryLocation, date,status, skip, limit
        setInboundRecords(inboundRes.data.inboundPOs);
        setCount(inboundRes.data.count);
      }
      const orderIdListRes = await getOrderIds();
      setPoOrderIdList(orderIdListRes);

      const productsLocationsOrganisationsRes =
        await getProductIdDeliveryLocationsOrganisations();
      setPoDeliveryLocationsList(
        productsLocationsOrganisationsRes.deliveryLocations
      );
      setPoProductsList(productsLocationsOrganisationsRes.productIds);
      setPoOrganisationsList(productsLocationsOrganisationsRes.organisations);
      setSkip(0);
    }
    fetchData();
  }, [limit, visible]);

  const onPageChange = async (pageNum) => {
    const recordSkip = (pageNum - 1) * limit;
    setSkip(recordSkip);
    if (visible === "one") {
      const outboundRes = await getSentPOs(
        toFilter,
        orderIdFilter,
        productNameFilter,
        locationFilter,
        dateFilter,
        statusFilter,
        recordSkip,
        limit,
        fromFilterDate,
        toFilterDate
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
        limit,
        fromFilterDate,
        toFilterDate
      ); //from, orderId, productName, deliveryLocation, date, skip, limit
      setInboundRecords(inboundRes.data.inboundPOs);
      setCount(inboundRes.data.count);
    }
    setData(visible);
  };

  const headers = {
    coloumn1: visible === "one" ? "Order Sent To" : "Order CreatedBy",
    coloumn2: "Order Date",
    coloumn3: "Order ID",
    coloumn4: "Product",
    coloumn5: "Delivery Location",
    coloumn6: "Status",

    displayColoumn1:
      visible === "one" ? t("order_sent_to") : t("order_created_by"),
    displayColoumn2: t("order_date"),
    displayColoumn3: t("order_id"),
    displayColoumn4: t("product"),
    displayColoumn5: t("delivery_location"),
    displayColoumn6: t("status"),

    img1: <img src={mon} width='16' height='16' alt='' />,
    img2: <img src={calender} width='16' height='16' alt='' />,
    img3: <img src={Order} width='18' height='16' alt='' />,
    img4: <img src={Package} width='16' height='16' alt='' />,
    img5: <img src={Totalshipments} width='18' height='18' alt='' />,
    img6: <img src={Status} width='16' height='16' alt='' />,
  };

  const closeExcelModal = () => {
    setOpenExcel(false);
  };

  // const closeModal = () => {
  //   setOpenCreatedOrder(false);
  // };

  const setData = (v, a = false) => {
    setvisible(v);
    setAlerts(a);
  };
  const setDateFilterOnSelect = async (dateFilterSelected) => {
    setDateFilter(dateFilterSelected);
    setSkip(0);
    if (visible === "one") {
      const outboundRes = await getSentPOs(
        toFilter,
        orderIdFilter,
        productNameFilter,
        locationFilter,
        dateFilterSelected,
        statusFilter,
        0,
        limit,
        fromFilterDate,
        toFilterDate
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
        limit,
        fromFilterDate,
        toFilterDate
      ); //from, orderId, productName, deliveryLocation, date, skip, limit
      setInboundRecords(inboundRes.data.inboundPOs);
      setCount(inboundRes.data.count);
    }
  };

  const setLocationFilterOnSelect = async (locationFilterSelected) => {
    setLocationFilter(locationFilterSelected);
    setSkip(0);
    if (visible === "one") {
      const outboundRes = await getSentPOs(
        toFilter,
        orderIdFilter,
        productNameFilter,
        locationFilterSelected,
        dateFilter,
        statusFilter,
        0,
        limit,
        fromFilterDate,
        toFilterDate
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
        limit,
        fromFilterDate,
        toFilterDate
      ); //from, orderId, productName, deliveryLocation, date, skip, limit
      setInboundRecords(inboundRes.data.inboundPOs);
      setCount(inboundRes.data.count);
    }
  };

  const setProductNameFilterOnSelect = async (productNameFilterSelected) => {
    setProductNameFilter(productNameFilterSelected);
    setSkip(0);
    if (visible === "one") {
      const outboundRes = await getSentPOs(
        toFilter,
        orderIdFilter,
        productNameFilterSelected,
        locationFilter,
        dateFilter,
        statusFilter,
        0,
        limit,
        fromFilterDate,
        toFilterDate
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
        limit,
        fromFilterDate,
        toFilterDate
      ); //from, orderId, productName, deliveryLocation, date, skip, limit
      setInboundRecords(inboundRes.data.inboundPOs);
      setCount(inboundRes.data.count);
    }
  };

  const setOrderIdNameFilterOnSelect = async (orderIdFilterSelected) => {
    setOrderIdFilter(orderIdFilterSelected);
    setSkip(0);
    if (visible === "one") {
      const outboundRes = await getSentPOs(
        toFilter,
        orderIdFilterSelected,
        productNameFilter,
        locationFilter,
        dateFilter,
        statusFilter,
        0,
        limit,
        fromFilterDate,
        toFilterDate
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
        limit,
        fromFilterDate,
        toFilterDate
      ); //from, orderId, productName, deliveryLocation, date, skip, limit
      setInboundRecords(inboundRes.data.inboundPOs);
      setCount(inboundRes.data.count);
    }
  };

  const setStatusFilterOnSelect = async (statusFilterSelected) => {
    setStatusFilter(statusFilterSelected);
    setSkip(0);
    if (visible === "one") {
      const outboundRes = await getSentPOs(
        toFilter,
        orderIdFilter,
        productNameFilter,
        locationFilter,
        dateFilter,
        statusFilterSelected,
        0,
        limit,
        fromFilterDate,
        toFilterDate
      ); //to, orderId, productName, deliveryLocation, date,status, skip, limit
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
        limit,
        fromFilterDate,
        toFilterDate
      ); //from, orderId, productName, deliveryLocation, date, skip, limit
      setInboundRecords(inboundRes.data.inboundPOs);
      setCount(inboundRes.data.count);
    }
  };

  const setFromToFilterOnSelect = async (fromToFilterSelected) => {
    setFromFilter(fromToFilterSelected);
    setToFilter(fromToFilterSelected);
    setSkip(0);
    if (visible === "one") {
      const outboundRes = await getSentPOs(
        fromToFilterSelected,
        orderIdFilter,
        productNameFilter,
        locationFilter,
        dateFilter,
        statusFilter,
        0,
        limit,
        fromFilterDate,
        toFilterDate
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
        limit,
        fromFilterDate,
        toFilterDate
      ); //from, orderId, productName, deliveryLocation, date, skip, limit
      setInboundRecords(inboundRes.data.inboundPOs);
      setCount(inboundRes.data.count);
    }
  };

  const sendData = () => {
    let rtnArr = visible === "one" ? outboundRecords : inboundRecords;
    const status = visible === "one" ? "REJECTED" :  "CREATED";
    if (alerts) {
      rtnArr = rtnArr.filter((row) => row.poStatus === status);
      setStatusFilterOnSelect(status);
    }
    
    return rtnArr ? rtnArr : [];
  };

  useEffect(() => {
    setExportFilterData([
      { key: "excel", value: "excel", label: t("excel"), checked: false },
      { key: "pdf",   value: "pdf", label: t("pdf"), checked: false },
      { key: "email", value: "mail", label: t("mail"), checked: false },
      // { key: "print", value: "Print", checked: false },
    ]);
  }, []);

  const onSelectionDateFilter = async (value) => {
    const fromDate = value[0] == '' ? '' : new Date(new Date(value[0]).toDateString());
    setFromFilterDate(fromDate);
    if (value.length > 1) {
      const toDate = value[0] == '' ? '' : new Date(new Date(value[1]).toDateString());
      if(toDate)
        toDate.setDate(toDate.getDate() + 1);
      setToFilterDate(toDate);
       if (visible === "one") {
        const outboundRes = await getSentPOs(
          toFilter,
          orderIdFilter,
          productNameFilter,
          locationFilter,
          dateFilter,
          statusFilter,
          0,
          limit,
          fromDate,
          toDate
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
          0,
          limit,
          fromDate,
          toDate
        ); //from, orderId, productName, deliveryLocation, date, skip, limit
        setInboundRecords(inboundRes.data.inboundPOs);
        setCount(inboundRes.data.count);
      }
    }
  }

  const onSelectionOfDropdownValue = (index, type, value) => {
    setShowExportFilter(false);
    let url = "";
    if (visible === "one") {
      url = `${
        config().getExportFileForOutboundPurchaseOrdersUrl
      }?type=${value.toLowerCase()}&to=${fromFilter}&orderId=${orderIdFilter}&productName=${productNameFilter}&dateFilter=${dateFilter}&deliveryLocation=${locationFilter}&poStatus=${statusFilter}&fromDate=${fromFilterDate}&toDate=${toFilterDate}`;
    }
    if (visible === "two") {
      url = `${
        config().getExportFileForInboundPurchaseOrdersUrl
      }?type=${value.toLowerCase()}&from=${fromFilter}&orderId=${orderIdFilter}&productName=${productNameFilter}&dateFilter=${dateFilter}&deliveryLocation=${locationFilter}&poStatus=${statusFilter}&fromDate=${fromFilterDate}&toDate=${toFilterDate}`;
    }

    var today = new Date();

    var nameOfFile;

    if (visible === "one") {
      nameOfFile =
        "ordersoutbound" +
        today.getFullYear().toString() +
        "/" +
        (today.getMonth() + 1).toString() +
        "/" +
        today.getDate().toString();
    } else if (visible === "two") {
      nameOfFile =
        "ordersinbound" +
        today.getFullYear() +
        "/" +
        (today.getMonth() + 1) +
        "/" +
        today.getDate();
    }

    getExportFile(url).then((response) => {
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
    <div className='orders'>
      <div className='d-flex justify-content-between'>
        <h1 className='breadcrumb'>{t("your_orders")}</h1>
        <div className='d-flex'>
          {isAuthenticated("createOrder") && (
            <Link to='/neworder'>
              <button className='btn btn-orange fontSize20 font-bold mt-1'>
                <img
                  src={OrderIcon}
                  width='20'
                  height='17'
                  className='mr-2 mb-1'
                  alt=''
                />
                <span style={{ color: "white" }}>
                  <b>{t("create_new_order")}</b>
                </span>
              </button>
            </Link>
          )}

          {/* <div className="d-flex flex-column align-items-center"> */}
          {isAuthenticated("importOrder") && (
            <button
              className='btn-primary btn fontSize20 font-bold mt-1 ml-2'
              onClick={() => setMenu(!menu)}
            >
              <div className='d-flex align-items-center'>
                <img
                  src={ExportIcon}
                  width='16'
                  height='16'
                  className='mr-2'
                  alt=''
                />
                <span>
                  <b>{t("import")}</b>
                </span>
                <img
                  src={dropdownIcon}
                  width='14'
                  height='14'
                  className='ml-2'
                  alt=''
                />
              </div>
            </button>
          )}
          {menu ? (
            <div className='menu'>
              <button
                className=' btn btn-outline-info mb-2 '
                onClick={() => setOpenExcel(true)}
              >
                {" "}
                {t("excel")}
              </button>
              <button className=' btn btn-outline-info'> {t("other")}</button>
            </div>
          ) : null}
          {openExcel && (
            <Modal
              title={t("import")}
              close={() => closeExcelModal()}
              size='modal-md' //for other size's use `modal-lg, modal-md, modal-sm`
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
      {isAuthenticated("orderAnalytics") && (
        // <Tiles {...props} setData={setData} t={t} />
        <Cards {...props} setData={setData} t={t} />
      )}
      <div className='mt-4'>
        <Tabs
          {...props}
          setvisible={setvisible}
          visible={visible}
          setShowExportFilter={setShowExportFilter}
          t={t}
        />
      </div>
      <div className='ribben-space'>
        <Table
          {...props}
          skip={skip}
          ordrs={sendData}
          visible={visible}
          count={count}
          onPageChange={onPageChange}
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
          fb='76%'
          showExportFilter={showExportFilter}
          setShowExportFilter={setShowExportFilter}
          exportFilterData={exportFilterData}
          onSelectionOfDropdownValue={onSelectionOfDropdownValue}
          onSelectionDateFilter={onSelectionDateFilter}
          isReportDisabled={!isAuthenticated("orderExportReport")}
          t={t}
        />
      </div>
    </div>
  );
};

export default Orders;
