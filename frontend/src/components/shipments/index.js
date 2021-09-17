import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import Table from './table';
import PoTable from './potable';
import ShippingOrderTable from './shippingOrder'
import Tabs from '../../shared/tabs';
import Tiles from './tiles';
import Add from '../../assets/icons/createshipment.png';
import Order from '../../assets/icons/order.svg';
import TableFilter from '../../shared/advanceTableFilter';
import Modal from '../../shared/modal';
import PurchaseForm from '../../components/purchaseform';
import mon from '../../assets/icons/brand.svg';
import Package from '../../assets/icons/package.svg';
import calender from '../../assets/icons/calendar.svg';
import Status from '../../assets/icons/Status.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../actions/userActions';
import PurchaseFormReview from '../../components/verifyPO/purchaseFormReview';
import { getInboundShipments, getOutboundShipments, getSupplierAndReceiverList, getShipmentIds, getShipments, resetShipments } from '../../actions/shipmentActions';
import ExcelPopUp from './ExcelPopup';
import Received from '../../assets/icons/Received1.svg';
import Sent from '../../assets/icons/Sent.png';
import update from '../../assets/icons/Update_Status.png';
import { config } from '../../config';
import { getExportFile } from '../../actions/poActions';
import uuid from 'react-uuid';
import { isAuthenticated } from '../../utils/commonHelper';

const ShipmentAnalytic = props => {
  const [visible, setvisible] = useState('one');
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [shpmnts, setShpmnts] = useState([]);
  const [alerts, setAlerts] = useState(false);
  const dispatch = useDispatch();
  const [outboundShipments, setOutboundShipments] = useState([]);
  const [inboundShipments, setInboundShipments] = useState([]);
  const [supplierReceiverList, setSupplierReceiverList] = useState([]);
  const [shipmentIdList, setShipmentIdList] = useState([]);
  const [idFilter, setIdFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [toFilter, setToFilter] = useState("");
  const [fromFilter, setFromFilter] = useState("");
  const [count, setCount] = useState(0);
  const [exportFilterData, setExportFilterData] = useState([]);
  const [showExportFilter, setShowExportFilter] = useState(false);

  const [showCalendar, setShowCalendar] = useState(false);


  const [shipmentIdData, setShipmentIdData] = useState([]);
  const [shipmentIdReplicaData, setShipmentIdReplicaData] = useState([]);
  const [showDropDownForShipmentId, setShowDropDownForShipmentId] = useState(false);

  const [fromFilterData, setFromFilterData] = useState([]);
  const [fromFilterReplicaData, setFromFilterReplicaData] = useState([]);
  const [showDropDownForFromFilter, setShowDropDownForFromFilter] = useState(false);

  const [toFilterData, setToFilterData] = useState([]);
  const [toFilterReplicaData, setToFilterReplicaData] = useState([]);
  const [showDropDownForToFilter, setShowDropDownForToFilter] = useState(false);

  const [queryKey, setQueryKey] = useState("");
  const [queryValue, setQueryValue] = useState("");

  const [inBoundData, setInboundData] = useState([]);
  const [outBoundData, setOutBoundData] = useState([]);

  if (!isAuthenticated('inboundShipments') && !isAuthenticated('outboundShipments')) props.history.push(`/profile`);

  const prepareDropdownData = (data) => {
    let finalDropDownData = [];
    data?.forEach(item => {
      let obj = {};
      obj['key'] = item.id ? item['id'] : item.toLowerCase();
      obj['value'] = item.name ? item['name'] : item;
      obj['checked'] = false;
      finalDropDownData.push(obj);
    });
    return finalDropDownData;
  }

  const getUniqueStringFromOrgListForGivenType = (data, ...args) => {
    const availableList = data?.map(item => args.length > 1 ? item && item.hasOwnProperty(args[0]) && item[args[0]].hasOwnProperty(args[1]) && item[args[0]][args[1]].hasOwnProperty(args[2]) && item[args[0]][args[1]][args[2]] : item[args[0]]).filter(item => item);
    return [...new Set(availableList)];
  };

  useEffect(() => {
    if (queryKey && queryValue) {
      if (queryValue === 'shipmentId') {
        if (visible === 'one') {
          async function fetchData() {
            const inboundRes = await getInboundShipments(queryKey, "", "", "", 0, limit, '', ''); // id, from, to, status, skip, limit
            setInboundShipments(inboundRes.data.inboundShipments);

            setCount(inboundRes.data.count);
          }
          fetchData();
        } else {
          async function fetchData() {
            const outboundRes = await getOutboundShipments(queryKey, "", "", "", 0, limit, '', ''); // id, from, to, status, skip, limit
            setOutboundShipments(outboundRes.data.outboundShipments);

            setCount(outboundRes.data.count);
          }
          fetchData();
        }

      } else if (queryValue === 'fromFilter') {
        if (visible === 'one') {
          async function fetchData() {
            const inboundRes = await getInboundShipments("", queryKey, "", "", 0, limit, '', ''); // id, from, to, status, skip, limit
            setInboundShipments(inboundRes.data.inboundShipments);

            setCount(inboundRes.data.count);
          }
          fetchData();
        } else {
          async function fetchData() {
            const outboundRes = await getOutboundShipments("", queryKey, "", "", 0, limit, '', ''); // id, from, to, status, skip, limit
            setOutboundShipments(outboundRes.data.outboundShipments);

            setCount(outboundRes.data.count);
          }
          fetchData();
        }
      } else if (queryValue === 'toFilter') {
        if (visible === 'one') {
          async function fetchData() {
            const inboundRes = await getInboundShipments("", "", queryKey, "", 0, limit, '', ''); // id, from, to, status, skip, limit
            setInboundShipments(inboundRes.data.inboundShipments);

            setCount(inboundRes.data.count);
          }
          fetchData();
        } else {
          async function fetchData() {
            const outboundRes = await getOutboundShipments("", "", queryKey, "", 0, limit, '', ''); // id, from, to, status, skip, limit
            setOutboundShipments(outboundRes.data.outboundShipments);

            setCount(outboundRes.data.count);
          }
          fetchData();
        }
      }
    } else {
      async function fetchData() {
        if (visible === 'one') {
          const inboundRes = await getInboundShipments("", "", "", "", 0, limit, '', ''); // id, from, to, status, skip, limit
          setInboundShipments(inboundRes.data.inboundShipments);
          setInboundData(inboundRes.data.inboundShipments)
          setCount(inboundRes.data.count);
        } else {
          const outboundRes = await getOutboundShipments("", "", "", "", 0, limit, '', ''); // id, from, to, status, skip, limit
          setOutboundShipments(outboundRes.data.outboundShipments);
          setOutBoundData(outboundRes.data.outboundShipments)
          setCount(outboundRes.data.count);
        }

        const supplierReceiverListRes = await getSupplierAndReceiverList();
        setSupplierReceiverList(supplierReceiverListRes.data);

        const shipmentIdListRes = await getShipmentIds();
        setShipmentIdList(shipmentIdListRes.data);
        setSkip(0);
      }
      fetchData();
    }
    // dispatch(resetShipments());
    dispatch(getAllUsers());
  }, [visible, queryKey]);

  useEffect(() => {
    if (visible === 'one' && inBoundData && inBoundData.length > 0) {
      assignInboundOutBoundData(setShipmentIdData, prepareDropdownData, getUniqueStringFromOrgListForGivenType, inBoundData, setShipmentIdReplicaData, setFromFilterData, setFromFilterReplicaData, setToFilterReplicaData, setToFilterData);
    } else if (visible === 'two' && outBoundData && outBoundData.length > 0) {
      assignInboundOutBoundData(setShipmentIdData, prepareDropdownData, getUniqueStringFromOrgListForGivenType, outBoundData, setShipmentIdReplicaData, setFromFilterData, setFromFilterReplicaData, setToFilterReplicaData, setToFilterData);
    }
  }, [inBoundData, outBoundData]);

  const onPageChange = async (pageNum) => {
    const recordSkip = (pageNum - 1) * limit;

    setSkip(recordSkip);
    if (visible == 'one') {
      const inboundRes = await getInboundShipments(idFilter, fromFilter, toFilter, statusFilter, recordSkip, limit, '', ''); // id, from, to, dateFilter, status, skip, limit
      setInboundShipments(inboundRes.data.inboundShipments);
      setCount(inboundRes.data.count)
    } else {
      const outboundRes = await getOutboundShipments(idFilter, fromFilter, toFilter, statusFilter, recordSkip, limit, '', ''); // id, from, to, dateFilter, status, skip, limit
      setOutboundShipments(outboundRes.data.outboundShipments);
      setCount(outboundRes.data.count);
    }
    setData(visible)
  };

  const headers = {
    coloumn1: 'Shipment ID',
    coloumn2: 'Shipment Date',
    coloumn3: 'From',
    coloumn4: 'To',
    coloumn6: 'Status ',

    img1: <img src={mon} width="16" height="16" />,
    img2: <img src={calender} width="16" height="16" />,
    img3: <img src={Received} width="16" height="16" />,
    img4: <img src={Sent} width="16" height="16" />,
    img6: <img src={Status} width="16" height="16" />,
  };

  const setData = (v, a = false) => {
    setvisible(v);
    setAlerts(a);
  }

  const setDateFilterOnSelect = async (dateFilterSelected) => {
    setDateFilter(dateFilterSelected);
    setSkip(0);
    if (visible == 'one') {
      const inboundRes = await getInboundShipments(idFilter, fromFilter, toFilter, dateFilterSelected, statusFilter, 0, limit); // id, from, to, dateFilter, status, skip, limit
      setInboundShipments(inboundRes.data.inboundShipments);
      setCount(inboundRes.data.count);
    } else {
      const outboundRes = await getOutboundShipments(idFilter, fromFilter, toFilter, dateFilterSelected, statusFilter, 0, limit); // id, from, to, dateFilter, status, skip, limit
      setOutboundShipments(outboundRes.data.outboundShipments);
      setCount(outboundRes.data.count);
    }
  }

  const setStatusFilterOnSelect = async (statusFilterSelected) => {
    setStatusFilter(statusFilterSelected);
    setSkip(0);
    if (visible == 'one') {
      const inboundRes = await getInboundShipments(idFilter, fromFilter, toFilter, dateFilter, statusFilterSelected, 0, limit); // id, from, to, dateFilter, status, skip, limit
      setInboundShipments(inboundRes.data.inboundShipments);
      setCount(inboundRes.data.count);
    } else {
      const outboundRes = await getOutboundShipments(idFilter, fromFilter, toFilter, dateFilter, statusFilterSelected, 0, limit); // id, from, to, dateFilter, status, skip, limit
      setOutboundShipments(outboundRes.data.outboundShipments);
      setCount(outboundRes.data.count);
    }
  }

  const setToShipmentFilterOnSelect = async (toShipmentFilterSelected) => {
    setToFilter(toShipmentFilterSelected);
    setSkip(0);
    if (visible == 'one') {
      const inboundRes = await getInboundShipments(idFilter, fromFilter, toShipmentFilterSelected, dateFilter, statusFilter, 0, limit); // id, from, to, dateFilter, status, skip, limit
      setInboundShipments(inboundRes.data.inboundShipments);
      setCount(inboundRes.data.count);
    } else {
      const outboundRes = await getOutboundShipments(idFilter, fromFilter, toShipmentFilterSelected, dateFilter, statusFilter, 0, limit); // id, from, to, dateFilter, status, skip, limit
      setOutboundShipments(outboundRes.data.outboundShipments);
      setCount(outboundRes.data.count);
    }
  }

  const setFromShipmentFilterOnSelect = async (fromShipmentFilterSelected) => {
    setFromFilter(fromShipmentFilterSelected);
    setSkip(0);
    if (visible == 'one') {
      const inboundRes = await getInboundShipments(idFilter, fromShipmentFilterSelected, toFilter, dateFilter, statusFilter, 0, limit); // id, from, to, dateFilter, status, skip, limit
      setInboundShipments(inboundRes.data.inboundShipments);
      setCount(inboundRes.data.count);
    } else {
      const outboundRes = await getOutboundShipments(idFilter, fromShipmentFilterSelected, toFilter, dateFilter, statusFilter, 0, limit); // id, from, to, dateFilter, status, skip, limit
      setOutboundShipments(outboundRes.data.outboundShipments);
      setCount(outboundRes.data.count);
    }
  }

  const setShipmentIdFilterOnSelect = async (shipmentIdFilterSelected) => {
    setSkip(0);
    if (visible == 'one') {
      const inboundRes = await getInboundShipments(shipmentIdFilterSelected, "", "", "", "", 0, limit); //id, from, to, dateFilter, status, skip, limit
      setInboundShipments(inboundRes.data.inboundShipments);
      setCount(inboundRes.data.count);
    } else {
      const outboundRes = await getOutboundShipments(shipmentIdFilterSelected, "", "", "", "", 0, limit); // id, from, to, dateFilter, status, skip, limit
      setOutboundShipments(outboundRes.data.outboundShipments);
      setCount(outboundRes.data.count);
    }
  }
  const sendData = () => {
    let rtnArr = visible == 'one' ? inboundShipments : outboundShipments;
    if (alerts)
      rtnArr = rtnArr.filter(row => row?.shipmentAlerts?.length > 0);
    return rtnArr ? rtnArr : [];
  }

  useEffect(() => {
    setExportFilterData([
      { key: "excel", value: "Excel", checked: false },
      { key: "pdf", value: "PDF", checked: false },
      { key: "email", value: "Mail", checked: false },
      { key: "print", value: "Print", checked: false },
    ]);
  }, []);

  const appendFileName = (value) => {
    const date = new Date();
    const YYYYMMDD_format = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
      .toISOString()
      .split("T")[0];
    const HHMMSS_format = `${date.getHours()}${date.getMinutes()}`;
    console.log(HHMMSS_format);
    if (visible === 'one') {
      return `Shipments_inbound_${YYYYMMDD_format}_${HHMMSS_format}hrs.${value.toLowerCase() === 'excel' ? 'xlsx' : value.toLowerCase()}`
    } else {
      return `Shipments_outbound_${YYYYMMDD_format}_${HHMMSS_format}hrs.${value.toLowerCase() === 'excel' ? 'xlsx' : value.toLowerCase()}`
    }
  }

  const onSelectionOfExportDropdown = (index, type, value) => {
    setShowExportFilter(false);
    let url = ''
    if (visible === 'one') {
      url = `${config().getExportFileForInboundShipmentUrl}?type=${value.toLowerCase()}`;
    }
    if (visible === 'two') {
      url = `${config().getExportFileForOutboundShipmentUrl}?type=${value.toLowerCase()}`;
    }
    getExportFile(url, value)
      .then(response => {
        console.log(response);
        if ((response.data) && response.status !== 200) {
          console.log('Error while downloading file');
        } else {
          const downloadUrl = window.URL.createObjectURL(new Blob([response]));
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.setAttribute('download', appendFileName(value)); //any other extension
          document.body.appendChild(link);
          link.click();
          link.remove();
        }
      })
  }

  const filterTableByCalendar = async (selectedDateRange) => {
    console.log(selectedDateRange);
    const fromDate = new Date(selectedDateRange.startDate.getTime() - (selectedDateRange.startDate.getTimezoneOffset() * 60000))
      .toISOString()
      .split("T")[0];

    const toDate = new Date(selectedDateRange.endDate.getTime() - (selectedDateRange.endDate.getTimezoneOffset() * 60000))
      .toISOString()
      .split("T")[0];

    console.log(toDate)

    setShowCalendar(false);
    setSkip(0);

    if (visible == 'one') {
      const inboundRes = await getInboundShipments("", "", "", "", 0, limit, fromDate, toDate); // id, from, to, status, skip, limit
      setInboundShipments(inboundRes.data.inboundShipments);
      setCount(inboundRes.data.count)
    } else {
      const outboundRes = await getOutboundShipments("", "", "", "", 0, limit, fromDate, toDate); // id, from, to, status, skip, limit
      setOutboundShipments(outboundRes.data.outboundShipments);
      setCount(outboundRes.data.count);
    }
  }

  const setCheckedAndUnCheckedOfProvidedList = (typeOriginalData, index) => {
    return typeOriginalData.map((item, i) => {
      if (i === index) {
        item.checked = !item.checked;
      } else {
        item.checked = false
      }
      return item;
    });
  }

  const onSelectionOfDropdownValue = (index, type, value) => {
    if (type === 'shipmentId') {
      setShipmentIdData([...setCheckedAndUnCheckedOfProvidedList(shipmentIdData, index)]);
      setQueryKeyAndQueryValue(setQueryKey, value, setQueryValue, type, shipmentIdData, index);
      markOpenedDrownsToFalse();
    } else if (type === 'fromFilter') {
      setFromFilterData([...setCheckedAndUnCheckedOfProvidedList(fromFilterData, index)]);
      setQueryKeyAndQueryValue(setQueryKey, value, setQueryValue, type, fromFilterData, index);
      markOpenedDrownsToFalse();
    } else if (type === 'toFilter') {
      setToFilterData([...setCheckedAndUnCheckedOfProvidedList(toFilterData, index)]);
      setQueryKeyAndQueryValue(setQueryKey, value, setQueryValue, type, toFilterData, index);
      markOpenedDrownsToFalse();
    }
  };

  const markOpenedDrownsToFalse = () => {
    setShowDropDownForFromFilter(false);
    setShowDropDownForShipmentId(false);
    setShowDropDownForToFilter(false);
  }

  const filterListForSearchInput = (data, searchInput) => data.filter(item => {
    return item.value.toLowerCase().includes(searchInput.toLowerCase());
  });

  const onChangeOfSearchForFilterInput = (searchInput, type) => {
    if (type === 'shipmentId' && searchInput) {
      setShipmentIdData(filterListForSearchInput(shipmentIdData, searchInput));
    } else if (type === 'fromFilter' && searchInput) {
      setFromFilterData(filterListForSearchInput(fromFilterData, searchInput))
    } else if (type === 'toFilter' && searchInput) {
      setToFilterData(filterListForSearchInput(toFilterData, searchInput))
    } else {
      if (type === 'shipmentId') {
        setShipmentIdData([...shipmentIdReplicaData]);
      } else if (type === 'fromFilter') {
        setFromFilterData([...fromFilterReplicaData]);
      } else if (type === 'toFilter') {
        setToFilterData([...toFilterReplicaData]);
      }
    }
  };

  return (
    <div className="shipment">
      <div className="d-flex justify-content-between">
        <h1 className="breadcrumb">SHIPMENT</h1>
        <div className="d-flex">
          {/* <button className=" btn-primary btn mr-2" onClick={()=>setOpenPOExcel(true)}>Import PO</button>

          <button
            className="btn btn-orange fontSize20 font-bold mr-2"
            onClick={() => setOpenPurchaseOrder(true)}
          >
            <img src={Order} width="14" height="14" className="mr-2" />
            <span>Create Purchase Order</span>
          </button> */}
          {isAuthenticated('updateShipment') &&
            <Link to='/enterid'>
              <button className="btn btn-orange fontSize20 font-bold mr-3 chain mt-2" disabled={status == "RECEIVED"}>
                <img src={update} width="20" height="17" className="mr-2 mb-1" />
                <span><b>Update Shipment</b></span>
              </button>
            </Link>
          }
          {isAuthenticated('createShipment') &&
            <Link to="/newshipment">
              <button className="btn btn-yellow fontSize20 font-bold mt-2">
                <img src={Add} width="20" height="17" className="mr-2 mb-1" />
                <span><b>Create Shipment</b></span>
              </button>
            </Link>
          }
        </div>
      </div>
      {isAuthenticated('shipmentAnalytics') &&
        <Tiles {...props} setData={setData} />
      }
      <div className="mt-4">
        <Tabs {...props} isAuthenticated={isAuthenticated} setvisible={setvisible} visible={visible} setShowExportFilter={setShowExportFilter} />
      </div>
      <div className="full-width-ribben mt-4">
        <TableFilter
          data={headers}
          shipmentIdList={shipmentIdList}
          supplierReceiverList={supplierReceiverList}
          setShipmentIdFilterOnSelect={setShipmentIdFilterOnSelect}
          setFromShipmentFilterOnSelect={setFromShipmentFilterOnSelect}
          setToShipmentFilterOnSelect={setToShipmentFilterOnSelect}
          setStatusFilterOnSelect={setStatusFilterOnSelect}
          setDateFilterOnSelect={setDateFilterOnSelect}
          fb="80%"
          showExportFilter={showExportFilter}
          setShowExportFilter={setShowExportFilter}
          exportFilterData={exportFilterData}
          onSelectionOfDropdownValue={onSelectionOfDropdownValue}
          onSelectionOfExportDropdown={onSelectionOfExportDropdown}
          isReportDisabled={!isAuthenticated('shipmentExportReport')}
          filterTableByCalendar={filterTableByCalendar}
          showCalendar={showCalendar}
          setShowCalendar={setShowCalendar}
          onChangeOfSearchForFilterInput={onChangeOfSearchForFilterInput}
          onSelectionOfDropdownValue={onSelectionOfDropdownValue}
          showDropDownForToFilter={showDropDownForToFilter}
          setShowDropDownForToFilter={setShowDropDownForToFilter}
          toFilterData={toFilterData}
          fromFilterData={fromFilterData}
          showDropDownForFromFilter={showDropDownForFromFilter}
          setShowDropDownForFromFilter={setShowDropDownForFromFilter}
          shipmentIdData={shipmentIdData}
          setShowDropDownForShipmentId={setShowDropDownForShipmentId}
          showDropDownForShipmentId={showDropDownForShipmentId}
          type={'SHIPMENT'}

        />
      </div>
      <div className="ribben-space">
        <Table {...props} skip={skip} shpmnts={sendData} count={count} onPageChange={onPageChange} />
      </div>
    </div>
  );
};

export default ShipmentAnalytic;

async function getInboundOutBoundDatabyFilters(queryKey, limit, setOutboundShipments, setCount, visible, setI) {
  if (visible === 'one') {

  } else {
    async function fetchData() {
      const outboundRes = await getOutboundShipments(queryKey, "", "", "", 0, limit, '', ''); // id, from, to, status, skip, limit
      setOutboundShipments(outboundRes.data.outboundShipments);
      setCount(outboundRes.data.count);
    }
    fetchData();
  }
}

function assignInboundOutBoundData(setShipmentIdData, prepareDropdownData, getUniqueStringFromOrgListForGivenType, outboundShipments, setShipmentIdReplicaData, setFromFilterData, setFromFilterReplicaData, setToFilterReplicaData, setToFilterData) {
  setShipmentIdData([...prepareDropdownData(getUniqueStringFromOrgListForGivenType(outboundShipments, 'id'))]);
  setShipmentIdReplicaData([...prepareDropdownData(getUniqueStringFromOrgListForGivenType(outboundShipments, 'id'))]);

  setFromFilterData([...prepareDropdownData(getUniqueStringFromOrgListForGivenType(outboundShipments, 'supplier', 'org', 'id'))]);
  setFromFilterReplicaData([...prepareDropdownData(getUniqueStringFromOrgListForGivenType(outboundShipments, 'supplier', 'org', 'id'))]);

  setToFilterReplicaData([...prepareDropdownData(getUniqueStringFromOrgListForGivenType(outboundShipments, 'supplier', 'org', 'id'))]);
  setToFilterData([...prepareDropdownData(getUniqueStringFromOrgListForGivenType(outboundShipments, 'supplier', 'org', 'id'))]);
}

function setQueryKeyAndQueryValue(setQueryValue, value, setQueryType, type, data, index) {
  if (data[index].checked) {
    setQueryValue(value);
    setQueryType(type);
  } else {
    setQueryValue();
    setQueryType();
  }
}
