import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./style.scss";
import inTransitIcon from "../../assets/intransit.png";
import SideBar from "../../components/sidebar";
import filterIcon from "../../assets/icons/funnel.svg";
import { getTransactions } from "../../actions/transactionAction";
import Moment from "react-moment";
import setAuthToken from "../../utils/setAuthToken";
import { func } from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  getAllStates,
  getDistrictsByState,
  getOrganizationsByType,
} from "../../actions/inventoryAction";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));
const TransactionHistory = (props) => {
  const dispatch = useDispatch();
  const [transactions, setTransactions] = useState([]);
  const [displayTransactions, setDisplayTransactions] = useState([]);
  const [inBound, setinBound] = useState([]); //being used for recieved
  const [inTransit, setinTransit] = useState([]);
  const [sent, setSent] = useState([]);
  const [Added, setAdded] = useState([]);

  const [dateClassName, setdateClassName] = useState("transactionListDate");

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);

  const [selectedTransactionType, setSelectedTransactionType] = useState('ALL');
  const [selectedOrganizationType, setSelectedOrganizationType] = useState('BREWERY');
  const [selectedDateType, setSelectedDateType] = useState('by_range');
  const [selectedVendorType, setSelectedVendorType] = useState('ALL_VENDORS');

  const [organizations, setOrganizations] = useState([]);

  const [filterVisibility, setFilterVisibility] = useState({
    state: true,
    district: false,
    organization: false,
  });
  const [filters, setFilters] = useState({
    state: "",
    district: "",
    transactionType: "ALL",
    sku: '',
    organizationType: 'BREWERY',
    vendorType: 'ALL_VENDORS',
    date_filter_type: 'by_range',
    startDate: new Date(),
    endDate: new Date(),
    year: new Date().getFullYear(), //setCurentYear
    month: new Date().getMonth() + 1, //setCurrentMonth
    quarter: 0 //setCurrent Quarter.
  });

  const defaultFilters = {
    state: "",
    district: "",
    transactionType: "ALL",
    sku: '',
    organizationType: 'BREWERY',
    vendorType: 'ALL_VENDORS',
    date_filter_type: 'by_range',
    startDate: new Date(),
    endDate: new Date(),
    year: 0, //setCurentYear
    month: 0, //setCurrentMonth
    quarter: 0 //setCurrent Quarter.
  };

  const onStartDateChange = (event) => {
    const _filters = { ...filters };
    _filters.startDate = event.target.value;
    setFilters(_filters);
    // applyFilters(_filters);
  };

  const onEndDateChange = (event) => {
    const _filters = { ...filters };
    _filters.endDate = event.target.value;
    setFilters(_filters);
    applyFilters(_filters);
  };

  const onTransactionTypeChange = (transactionType) => {
    setSelectedTransactionType(transactionType);
    const _filters = { ...filters };
    _filters.transactionType = transactionType;
    setFilters(_filters);
    applyFilters(_filters);
  };
  const onOrganizationTypeChange = (organizationType) => {

    setSelectedOrganizationType(organizationType);
    const _filters = { ...filters };
    _filters.organizationType = organizationType;

    setFilters(_filters);
    applyFilters(_filters);
  };
  const onDateTypeChange = (dateType) => {
    setSelectedDateType(dateType);
    const _filters = { ...filters };
    _filters.date_filter_type = dateType;
    setFilters(_filters);
    applyFilters(_filters);
  };
  const onVendorTypeChange = (vendorType) => {
    setSelectedVendorType(vendorType);
    const _filters = { ...filters };
    _filters.vendorType = vendorType;
    setFilters(_filters);
    applyFilters(_filters);
  }

  const _getAllStates = async () => {
    const response = await dispatch(getAllStates());
    const _states = response.data ? response.data : [];
    setStates([_states]);
  };

  const _getOrganizationsByType = async (filters) => {
    const response = await dispatch(getOrganizationsByType(filters));
    const _organizations = response.data ? response.data : [];
    setOrganizations(_organizations);
  };

  const _getDistrictsByState = async (_state) => {
    const response = await dispatch(getDistrictsByState(_state));
    const _districts = response.data ? response.data : [];
    setDistricts(_districts);
  };

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("-");
  }


  const onStateSelection = (event) => {
    const selectedState = event.target.value;
    const _filters = { ...filters };
    _filters.state = selectedState;
    setFilters(_filters);
    applyFilters(_filters);
    _getDistrictsByState(selectedState);

    const _filterVisibility = { ...filterVisibility };
    _filterVisibility.district = true;
    setFilterVisibility(_filterVisibility);
  };
  const onDistrictSelection = (event) => {
    const selectedDistrict = event.target.value;
    const _filters = { ...filters };
    _filters.district = selectedDistrict;
    setFilters(_filters);
    _getOrganizationsByType(_filters);
    applyFilters(_filters);
  };

  const onOrganizationChange = (event) => {
    const selectedOrganization = event.target.value;
    const _filters = { ...filters };
    _filters.organization = selectedOrganization;
    setFilters(_filters);
    applyFilters(_filters);
  };

  const resetFilters = () => {
    let _filters = defaultFilters;
    setFilters(_filters);
    setSelectedTransactionType('ALL');
    setSelectedOrganizationType('BREWERY');
    setSelectedDateType('by_range');
    applyFilters(_filters);

  }

  const allowedMonths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 12];
  let thisYear = new Date().getFullYear();
  const allowedYears = [];
  for (let i = 1; i < 21; i++) {
    allowedYears.push(thisYear - i);
  }



  const onYearChange = (event) => {
    const selectedYear = event.target.value;
    const _filters = { ...filters };
    _filters.year = selectedYear;
    setFilters(_filters);
    applyFilters(_filters);
  };

  const onMonthChange = (event) => {
    const selectedMonth = event.target.value;
    const _filters = { ...filters };
    _filters.month = selectedMonth;
    setFilters(_filters);
    applyFilters(_filters);
  };

  const onQuarterChange = (event) => {
    const selectedQuarter = event.target.value;
    const _filters = { ...filters };
    _filters.month = selectedQuarter;
    setFilters(_filters);
    applyFilters(_filters);
  };

  async function applyFilters(_filters) {
    //  await setFilters(_filters);
    const results = await dispatch(getTransactions(_filters));
    let addedarray = [];
    let date;
    results.data.forEach((b) => {
      // console.log('a') =
      let a = b;
      if (date !== formatDate(a.createdAt)) {
        date = formatDate(a.createdAt);
        a.shippingDates = true;
      } else {
        a.shippingDates = false;
      }
      if (a.status === "CREATED") {
        a.status = "SENT";
        addedarray.push(a);
      }
      if (a.status === "RECEIVED" && a.supplier.id === props.user.id) {
        a.status = "SENT";
        addedarray.push(a);
      }
      if (a.status === "RECEIVED") inBound.push(a);
      if (a.status === "SENT") sent.push(a);
      if (a.status === "INTRANSIT") inTransit.push(a);
    });
    setDisplayTransactions(results.data);
    setTransactions(results.data);
  }
  useEffect(() => {
    (async () => {
      _getAllStates();
      const results = await dispatch(getTransactions(filters));
      let addedarray = [];
      let date;
      results.data.forEach((b) => {
        let a = b;
        if (date !== a.createdAt) {
          date = a.createdAt;
          a.shippingDates = true;
        } else {
          a.shippingDates = false;
        }
        if (a.status === "CREATED") {
          addedarray.push(a);
        }
        if (a.status === "RECEIVED") inBound.push(a);
        if (a.status === "SENT") sent.push(a);
        if (a.status === "INTRANSIT") inTransit.push(a);
      });
      setAdded(addedarray);
    })();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 d-none d-md-block padding0 greyBG">
          <SideBar {...props} />
        </div>
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10">
          <div className="row">
            <div className="col-md-9 mainContainer pt-3 px-4">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3">
                <h1 className="h2">Transactions</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    className="bi bi-bell"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                  </svg>
                </div>
              </div>
              <div className="btn-group mainButtonFilter">
                <a
                  className={`btn ${selectedTransactionType === 'ALL' ? "active" : ""}`}
                  onClick={() => {
                    onTransactionTypeChange('ALL');
                  }}
                >
                  ALL
                    </a>
                <a
                  className={`btn ${selectedTransactionType === 'SENT' ? "active" : ""}`}
                  onClick={() => {
                    onTransactionTypeChange('SENT');
                  }}
                >
                  Sent
                    </a>
                <a
                  className={`btn ${selectedTransactionType === 'RECEIVED' ? "active" : ""}`}
                  onClick={() => {
                    onTransactionTypeChange('RECEIVED');
                  }}
                >
                  Received
                    </a>
                <a
                  className={`btn ${selectedTransactionType === 'IN_TRANSIT' ? "active" : ""}`}
                  onClick={() => {
                    onTransactionTypeChange('IN_TRANSIT');
                  }}
                >
                  In-Transit
                    </a>
                <a
                  className={`btn ${selectedTransactionType === 'ADDED' ? "active" : ""}`}
                  onClick={() => {
                    onTransactionTypeChange('ADDED');
                  }}
                >
                  Added
                    </a>
              </div>


              <div className="productList">
                {
                  displayTransactions.length ?
                    <>
                      <div className="productListHeader col-md-12">
                        <div className=" col-md-3">Particulars</div>
                        <div className="padLeft20 col-md-2">Warehouse Address</div>
                        <div className="padLeft20 col-md-2">Status</div>
                        <div className="padLeft20 col-md-3">Challan Image</div>
                        <div className="padLeft20 col-md-2">Quantity</div>
                      </div>
                    </> : ""
                }

                {displayTransactions.map((transaction, index) => (
                  <div>
                    {transaction.shippingDates ? (
                      <span className={dateClassName}>
                        <Moment format="MMM Do, YYYY">
                          {transaction.createdAt}
                        </Moment>
                      </span>
                    ) : (
                      ""
                    )}
                    <div className="transactionListContainer">

                      <div className="productContainer col-md-12">
                        <div className="productItem col-md-3">
                          <div className="iconGroup">
                            <div className="productIcon inTransit">
                              <img
                                src={inTransitIcon}
                                className="icon-thumbnail-img"
                                alt=""
                              />
                            </div>
                            <div>
                              <span className="transactionTitle">
                                {transaction.receiver.org.name}
                              </span>
                              <br />
                              <span className="transactionDate">
                                <Moment format="MMMM Do YYYY, h:mm a">
                                  {transaction.createdAt}
                                </Moment>
                              </span>
                              <br />
                              <span className="transactionDate">
                                <span>FROM:</span>{" "}
                                {transaction.supplier.org.name} - TO:{" "}
                                {transaction.receiver.org.name}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="productItem col-md-2">
                          {
                            (transaction.receiver.warehouse.warehouseAddress
                              .city,
                              transaction.receiver.warehouse.warehouseAddress
                                .state)
                          }
                        </div>
                        <div className="productItem col-md-2">
                          {transaction.status === "RECEIVED" && (
                            <div className="productStatus">
                              <span className="statusbadge receivedBadge"></span>{" "}
                              Received
                            </div>
                          )}
                          {transaction.status === "SENT" && (
                            <div className="productStatus">
                              <span className="statusbadge sentBadge"></span> Sent
                            </div>
                          )}
                          {transaction.status === "INTRANSIT" && (
                            <div className="productStatus">
                              <span className="statusbadge transitBadge"></span> In
                              Transit
                            </div>
                          )}
                          {transaction.status === "CREATED" && (
                            <div className="productStatus">
                              <span className="statusbadge addedBadge"></span> Added
                            </div>
                          )}
                        </div>
                        <div className="productItem col-md-3">123456.jpg</div>
                        <div className="productItem productQuantity col-md-2">
                          {transaction.products.reduce(
                            (a, v) => (a = a + v.productQuantity),
                            0
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-md-3 rightSideMenu pt-4 px-2">
              <div className="filterSection">
                <div className="filterHeader">
                  <img src={filterIcon} className="filterIcon" /> FILTERS
                </div>

                <div className="btn-group filterButton mt-4">
                  <a
                    className={`btn ${selectedOrganizationType === 'BREWERY' ? "active" : ""}`}
                    onClick={() => {
                      onOrganizationTypeChange('BREWERY');
                    }}
                  >
                    BREWERY
                    </a>
                  <a
                    className={`btn ${selectedOrganizationType === 'VENDOR' ? "active" : ""}`}
                    onClick={() => {
                      onOrganizationTypeChange('VENDOR');
                    }}
                  >
                    VENDOR
                    </a>
                </div>

                <label className="filterSubHeading mt-2">Time Period</label>
                <div className="btn-group filterButton mt-2">
                  <a
                    className={`btn ${selectedDateType === 'by_range' ? "active" : ""}`}
                    onClick={() => {
                      onDateTypeChange('by_range');
                    }}
                  >
                    Date Range
                    </a>
                  <a
                    className={`btn ${selectedDateType === 'by_monthly' ? "active" : ""}`}
                    onClick={() => {
                      onDateTypeChange('by_monthly');
                    }}
                  >
                    Monthly
                    </a>
                  <a
                    className={`btn ${selectedDateType === 'by_quarterly' ? "active" : ""}`}
                    onClick={() => {
                      onDateTypeChange('by_quarterly');
                    }}
                  >
                    Quarterly
                    </a>
                  <a
                    className={`btn ${selectedDateType === 'by_yearly' ? "active" : ""}`}
                    onClick={() => {
                      onDateTypeChange('by_yearly');
                    }}
                  >
                    Yearly
                    </a>
                </div>
                {
                  selectedDateType === 'by_range' ?
                    <>
                      <div className="row">
                        <div className="col-md-5">
                          <input type="date"
                            className="dateInput"
                            value={filters.startDate}
                            // Shiva
                            onChange={onStartDateChange} />
                        </div>
                        <div className="col-md-5">
                          <input type="date"
                            className="dateInput"
                            value={filters.startDate}
                            // Shiva
                            onChange={onEndDateChange}
                          />
                        </div>
                      </div>
                    </> : ""
                }

                {
                  selectedDateType === 'by_monthly' ?
                    <>
                      <div className="row">
                        <div className="col-md-5">
                          <select
                            className="filterSelect mt-2"
                            value={filters.year}
                            onChange={onYearChange}
                          >
                            <option>Select Year</option>
                            {allowedYears.map((year, index) => {
                              return (
                                <option key={index} value={year}>
                                  {year}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div className="col-md-5">
                          <select
                            className="filterSelect mt-2"
                            value={filters.month}
                            onChange={onMonthChange}
                          >
                            <option>Select Year</option>
                            {allowedMonths.map((month, index) => {
                              return (
                                <option key={index} value={month}>
                                  {month}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                    </> : ""
                }

                {
                  selectedDateType === 'by_quarterly' ?
                    <>
                      <div className="row">
                        <div className="col-md-5">
                          <select
                            className="filterSelect mt-2"
                            value={filters.year}
                            onChange={onYearChange}
                          >
                            <option>Select Year</option>
                            {allowedYears.map((year, index) => {
                              return (
                                <option key={index} value={year}>
                                  {year}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div className="col-md-5">
                          <select
                            className="filterSelect mt-2"
                            value={filters.quarter}
                            onChange={onQuarterChange}
                          >
                            <option>Select Quarter</option>
                            {['1', '2', '3', '4'].map((quarter, index) => {
                              return (
                                <option key={index} value={quarter}>
                                  {quarter}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                    </> : ""
                }
                {
                  selectedDateType === 'by_yearly' ?
                    <>
                      <div className="row">
                        <div className="col-md-5">
                          <select
                            className="filterSelect mt-2"
                            value={filters.year}
                            onChange={onYearChange}
                          >
                            <option>Select Year</option>
                            {allowedYears.map((year, index) => {
                              return (
                                <option key={index} value={year}>
                                  {year}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                    </> : ""
                }

                <label className="filterSubHeading mt-3">Select State</label>
                <select
                  className="filterSelect mt-2"
                  value={filters.state}
                  onChange={onStateSelection}
                >
                  <option>Select State</option>
                  {states.map((state, index) => {
                    return (
                      <option key={index} value={state}>
                        {state}
                      </option>
                    );
                  })}
                </select>
                <label className="filterSubHeading mt-2">District</label>
                <select
                  className="filterSelect mt-2"
                  value={filters.district}
                  onChange={onDistrictSelection}
                  disabled={!filterVisibility.district}
                >
                  <option value="">Select District</option>
                  {districts.map((district, index) => {
                    return (
                      <option key={index} value={district}>
                        {district}
                      </option>
                    );
                  })}
                </select>

                {
                  selectedOrganizationType === 'VENDOR' ?
                    <>
                      <label className="filterSubHeading mt-2">Vendor</label>
                      <div className="btn-group filterButton mt-2">
                        <a
                          className={`btn ${selectedVendorType === 'ALL_VENDORS' ? "active" : ""}`}
                          onClick={() => {
                            onVendorTypeChange('ALL_VENDORS');
                          }}
                        >
                          All
                    </a>
                        <a
                          className={`btn ${selectedVendorType === 'S1' ? "active" : ""}`}
                          onClick={() => {
                            onVendorTypeChange('S1');
                          }}
                        >
                          S1
                    </a>
                        <a
                          className={`btn ${selectedVendorType === 'S2' ? "active" : ""}`}
                          onClick={() => {
                            onVendorTypeChange('S2');
                          }}
                        >
                          S2
                    </a>
                      </div>
                    </> : ""
                }

                <label className="filterSubHeading mt-2">Select
                  {
                    selectedOrganizationType === 'VENDOR' ? ' Vendor' : ' Brewery'
                  }
                </label>
                <select
                  className="filterSelect mt-2"
                  onChange={onOrganizationChange}
                >
                  <option>Select
                    {
                      selectedOrganizationType === 'VENDOR' ? ' Vendor' : ' Brewery'
                    }
                  </option>
                  {organizations.map((organization, index) => {
                    return (
                      <option key={index} value={organization.id}>
                        {organization.name}
                      </option>
                    );
                  })}
                </select>

                <button
                  className="btn SearchButton mt-4"
                  onClick={resetFilters}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default TransactionHistory;
