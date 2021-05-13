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
  const [buttonState0, setButtonActive] = useState("btn active");
  const [buttonState1, setButtonActive1] = useState("btn");
  const [buttonState2, setButtonActive2] = useState("btn");
  const [buttonState3, setButtonActive3] = useState("btn");
  const [buttonState4, setButtonActive4] = useState("btn");
  const [buttonState5, setButtonActive5] = useState("btn");
  const [buttonState6, setButtonActive6] = useState("btn");
  const [ButtonState7, setButtonActive7] = useState("btn");
  const [ButtonState8, setButtonActive8] = useState("btn");
  const [ButtonState9, setButtonActive9] = useState("btn");
  const [ButtonState10, setButtonActive10] = useState("btn");
  const [Brewery, setBrewery] = useState(false);
  const [dateClassName, setdateClassName] = useState("transactionListDate");
  const [quarterly, setQuarterly] = useState(false);
  const [today, setToday] = useState(true);
  const [yearly, setyearly] = useState(false);
  const [AllButton, setAllButtonActive] = useState("btn");
  const [S1Button, setS1ButtonActive] = useState("btn");
  const [S2Button, setS2ButtonActive] = useState("btn");
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [monthDate, setMonthDate] = useState(new Date());

  const [organizations, setOrganizations] = useState([]);

  const [filterVisibility, setFilterVisibility] = useState({
    state: true,
    district: false,
    organization: false,
  });
  const [filters, setFilters] = useState({
    state: "",
    district: "",
    inventoryType: "BREWERY",
    startDate: null,
    endDate: null,
  });
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
  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("-");
  }
  function getYear(date) {
    var d = new Date(date),
      year = d.getFullYear();
    return year;
  }
  function getMonth(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1);
    if (month.length < 2) month = "0" + month;

    return month;
  }
  const _getDistrictsByState = async (_state) => {
    const response = await dispatch(getDistrictsByState(_state));
    const _districts = response.data ? response.data : [];
    setDistricts(_districts);
  };
  const onStateSelection = (event) => {
    const selectedState = event.target.value;
    const _filters = { ...filters };
    _filters.state = selectedState;
    setFilters(_filters);
    // props.applyFilters(_filters);
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
    filterFun();
  };

  const onOrganizationChange = (event) => {
    const selectedOrganization = event.target.value;
    const _filters = { ...filters };
    _filters.organization = selectedOrganization;
    setFilters(_filters);
    filterFun();
  };

  function selectThis(a) {
    console.log(a);
    if (a === "all") {
      setButtonActive1("btn");
      setButtonActive2("btn");
      setButtonActive3("btn");
      setButtonActive4("btn");
      setButtonActive("btn active");
      setDisplayTransactions(transactions);
    }
    if (a === "sent") {
      setButtonActive("btn");
      setButtonActive2("btn");
      setButtonActive3("btn");
      setButtonActive4("btn");
      setButtonActive1("btn active");
      setDisplayTransactions(sent);
    }
    if (a === "received") {
      setButtonActive1("btn");
      setButtonActive("btn");
      setButtonActive3("btn");
      setButtonActive4("btn");
      setButtonActive2("btn active");
      setDisplayTransactions(inBound);
    }
    if (a === "transit") {
      setButtonActive1("btn");
      setButtonActive2("btn");
      setButtonActive("btn");
      setButtonActive4("btn");
      setButtonActive3("btn active");
      setDisplayTransactions(inTransit);
    }
    if (a === "added") {
      setButtonActive1("btn");
      setButtonActive2("btn");
      setButtonActive3("btn");
      setButtonActive("btn");
      setButtonActive4("btn active");
      setDisplayTransactions(Added);
    }
  }
  async function filterFun(_filters) {
    setFilters(_filters);
    const results = await dispatch(getTransactions(filters));
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
      if(a.status === "RECEIVED" && a.supplier.id === props.user.id){
        a.status = "SENT";
        addedarray.push(a);
      }
      if (a.status === "RECEIVED") inBound.push(a);
      if (a.status === "SENT") sent.push(a);
      if (a.status === "INTRANSIT") inTransit.push(a);
    });
    setDisplayTransactions(results.data);
    setTransactions(results.data);
    console.log("data" + results.data.length);
  }
  useEffect(() => {
    (async () => {
      _getAllStates();
      console.log("states are " + states);
      const results = await dispatch(getTransactions(filters));
      ``;
      let addedarray = [];
      let date;
      results.data.forEach((b) => {
        // console.log('a') =
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
      console.log(results);
    })();
  }, []);
  const classes = useStyles();
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
              <div class="btn-group mainButtonFilter">
                <a
                  href="#0"
                  class={buttonState0}
                  onClick={() => {
                    setButtonActive("btn active");
                    selectThis("all");
                  }}
                >
                  All
                </a>
                <a
                  href="#1"
                  class={buttonState1}
                  onClick={() => {
                    setButtonActive1("btn active");
                    selectThis("sent");
                  }}
                >
                  Sent
                </a>
                <a
                  href="#2"
                  class={buttonState2}
                  onClick={() => {
                    setButtonActive2("btn active");
                    selectThis("received");
                  }}
                >
                  Received
                </a>
              </div>
              <div className="productList">
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
                      <div className="productContainer">
                        <div className="productItem ">
                          <div className="iconGroup">
                            <div className="productIcon inTransit">
                              <img
                                src={inTransitIcon}
                                class="icon-thumbnail-img"
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
                        <div className="productItem">
                          {
                            (transaction.receiver.warehouse.warehouseAddress
                              .city,
                            transaction.receiver.warehouse.warehouseAddress
                              .state)
                          }
                        </div>
                        <div className="productItem">
                          {transaction.status === "RECEIVED" && (
                            <div className="productStatus">
                              <span class="statusbadge receivedBadge"></span>{" "}
                              Received
                            </div>
                          )}
                          {transaction.status === "SENT" && (
                            <div className="productStatus">
                              <span class="statusbadge sentBadge"></span> Sent
                            </div>
                          )}
                          {transaction.status === "INTRANSIT" && (
                            <div className="productStatus">
                              <span class="statusbadge transitBadge"></span> In
                              Transit
                            </div>
                          )}
                          {transaction.status === "CREATED" && (
                            <div className="productStatus">
                              <span class="statusbadge addedBadge"></span> Added
                            </div>
                          )}
                        </div>
                        <div className="productItem">123456.jpg</div>
                        <div className="productItem productQuantity">
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

                <div class="btn-group filterButton mt-4">
                  <a
                    href="#!"
                    class={buttonState5}
                    onClick={async () => {
                      setButtonActive5("btn active");
                      setButtonActive6("btn");
                      setBrewery(true);
                      const _filters = {};
                      _filters.inventoryType = "BREWERY";
                      filterFun(_filters);
                    }}
                  >
                    Brewery
                  </a>
                  <a
                    href="#!"
                    class={buttonState6}
                    onClick={() => {
                      const _filters = {};
                      _filters.inventoryType = "VENDOR";
                      setButtonActive6("btn active");
                      setButtonActive5("btn");
                      setBrewery(false);

                      filterFun(_filters);
                    }}
                  >
                    Vendor
                  </a>
                </div>

                <label className="filterSubHeading mt-2">Time Period</label>
                <div class="btn-group filterButton mt-2">
                  <a
                    href="#!"
                    class={ButtonState7}
                    onClick={() => {
                      setButtonActive7("btn active");
                      setButtonActive8("btn");
                      setButtonActive9("btn");
                      setButtonActive10("btn");
                      setToday(true);
                      const _filters = {};
                      Brewery
                        ? (_filters.inventoryType = "BREWERY")
                        : (_filters.inventoryType = "VENDOR");
                      _filters.date_filter_type = "by_range";
                      filterFun(_filters);
                    }}
                  >
                    Date Range
                  </a>
                  <a
                    href="#!"
                    class={ButtonState8}
                    onClick={() => {
                      setButtonActive7("btn");
                      setButtonActive8("btn active");
                      setButtonActive9("btn");
                      setButtonActive10("btn");
                      setToday(false);
                      setQuarterly(false);
                      setyearly(false);
                      const _filters = {};
                      Brewery
                        ? (_filters.inventoryType = "BREWERY")
                        : (_filters.inventoryType = "VENDOR");
                      _filters.date_filter_type = "by_monthly";
                      filterFun(_filters);
                    }}
                  >
                    Monthly
                  </a>
                  <a
                    href="#!"
                    class={ButtonState9}
                    onClick={() => {
                      setButtonActive7("btn");
                      setButtonActive8("btn");
                      setButtonActive9("btn active");
                      setButtonActive10("btn");
                      setToday(false);
                      setyearly(false);
                      setQuarterly(true);
                      const _filters = {};
                      Brewery
                        ? (_filters.inventoryType = "BREWERY")
                        : (_filters.inventoryType = "VENDOR");
                      _filters.date_filter_type = "by_quarterly";
                      _filters.year = getYear(new Date());
                      filterFun(_filters);
                    }}
                  >
                    Quarterly
                  </a>
                  <a
                    href="#!"
                    class={ButtonState10}
                    onClick={() => {
                      setButtonActive7("btn");
                      setButtonActive8("btn");
                      setButtonActive9("btn");
                      setButtonActive10("btn active");
                      setQuarterly(false);
                      setToday(false);
                      setyearly(true);

                      const _filters = {};
                      Brewery
                        ? (_filters.inventoryType = "BREWERY")
                        : (_filters.inventoryType = "VENDOR");
                      _filters.date_filter_type = "by_range";
                      _filters.startDate = formatDate(startDate);
                      _filters.endDate = formatDate(endDate);
                      filterFun(_filters);
                    }}
                  >
                    Today
                  </a>
                </div>

                {today ? (
                  <div className="row">
                    {/* <select className="filterSelect mt-2">
                                                    </select> */}

                    <div className="col-md-5">
                      <DatePicker
                        dateFormat="dd MMMM yyyy"
                        selected={startDate}
                        onChange={(date) => {
                          console.log(formatDate(date));
                          const _filters = { ...filters };
                          _filters.startDate = formatDate(date);
                          setStartDate(date);
                          filterFun(_filters);
                        }}
                      />
                    </div>
                    <div className="col-md-1"></div>
                    <div className="col-md-3">
                      <DatePicker
                        dateFormat="dd MMMM yyyy"
                        selected={endDate}
                        onChange={(date) => {
                          console.log(formatDate(date));
                          const _filters = { ...filters };
                          _filters.endDate = formatDate(date);
                          setEndDate(date);
                          filterFun(_filters);

                        }}
                      />
                    </div>
                  </div>
                ) : quarterly ? (
                  <div className=" rightSideMenu pt-4 px-2">
                    <label className="filterSubHeading mt-2">
                      Select Quarter
                    </label>
                    <div className="row">
                      <div className="col-6">
                        <div className="filterSection">
                          <label className="radioButton" for="gv">
                            <input
                              className="radioInput"
                              type="radio"
                              name="radio"
                              value="Q1"
                              id="gv"
                              onChange={(quarter) => {
                                const _filters = { ...filters };
                                _filters.quarter = "Q1";
                                setFilters(_filters);
                                filterFun();
                              }}
                              defaultChecked={true}
                            />{" "}
                            January - March
                          </label>
                          <label className="radioButton" for="sv">
                            <input
                              className="radioInput"
                              type="radio"
                              name="radio"
                              value="Q2"
                              onChange={(quarter) => {
                                const _filters = { ...filters };
                                _filters.quarter = "Q2";
                                filterFun(_filters);

                              }}
                              id="sv"
                            />{" "}
                            April - June
                          </label>
                          <label className="radioButton" for="suv">
                            <input
                              className="radioInput"
                              type="radio"
                              name="radio"
                              value="Q3"
                              onChange={(quarter) => {
                                const _filters = { ...filters };
                                _filters.quarter = "Q3";
                                filterFun(_filters);

                              }}
                              id="suv"
                            />{" "}
                            July - September
                          </label>
                          <label className="radioButton" for="bv">
                            <input
                              className="radioInput"
                              type="radio"
                              name="radio"
                              value="Q4"
                              onChange={(quarter) => {
                                const _filters = { ...filters };
                                _filters.quarter = "Q4";
                                filterFun(_filters);

                              }}
                              id="bv"
                            />{" "}
                            October - December
                          </label>
                        </div>
                      </div>
                      <div className="col-6">
                        <label className="filterSubHeading mt-2">
                          Select year
                        </label>
                        <DatePicker
                          dateFormat="dd MMMM yyyy"
                          selected={monthDate}
                          onChange={(date) => {
                            console.log(formatDate(date));
                            const _filters = { ...filters };
                            _filters.year = getYear(date);
                            setMonthDate(date);
                            filterFun(_filters);
                          }}
                          dateFormat="yyyy"
                          showYearPicker
                          showYearDropdown
                        />
                      </div>
                    </div>
                  </div>
                ) : yearly ? (
                  <div></div>
                ) : (
                  <div>
                    <label className="filterSubHeading mt-2">
                      Select Month
                    </label>
                    <DatePicker
                      dateFormat="dd MMMM yyyy"
                      selected={monthDate}
                      onChange={(date) => {
                        console.log(formatDate(date));
                        const _filters = { ...filters };
                        _filters.month = getMonth(date);
                        _filters.year = getYear(date);
                        setMonthDate(date);
                        filterFun(_filters);
                      }}
                      dateFormat="MMMM yyyy"
                      showMonthYearPicker
                      showYearDropdown
                    />
                  </div>
                )}

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

                {Brewery ? (
                  ""
                ) : (
                  <div>
                    <label className="filterSubHeading mt-2">Vendor</label>
                    <div class="btn-group filterButton mt-2">
                      <a
                        href="#!"
                        class={AllButton}
                        onClick={() => {
                          setAllButtonActive("btn active");
                          setS1ButtonActive("btn");
                          setS2ButtonActive("btn");
                        }}
                      >
                        All
                      </a>
                      <a
                        href="#!"
                        class={S1Button}
                        onClick={() => {
                          setAllButtonActive("btn ");
                          setS1ButtonActive("btn active");
                          setS2ButtonActive("btn");
                        }}
                      >
                        S1
                      </a>
                      <a
                        href="#!"
                        class={S2Button}
                        onClick={() => {
                          setAllButtonActive("btn ");
                          setS1ButtonActive("btn");
                          setS2ButtonActive("btn active");
                        }}
                      >
                        S2
                      </a>
                    </div>
                  </div>
                )}

                {!Brewery ? (
                  <label className="filterSubHeading mt-2">Select Vendor</label>
                ) : (
                  <label className="filterSubHeading mt-2">
                    Select Brewery
                  </label>
                )}
                <select
                  className="filterSelect mt-2"
                  onChange={onOrganizationChange}
                >
                  {!Brewery ? (
                    <option>Select Vendor</option>
                  ) : (
                    <option>Select Brewery</option>
                  )}
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
                  onClick={() => {
                    filterFun({});
                  }}
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
