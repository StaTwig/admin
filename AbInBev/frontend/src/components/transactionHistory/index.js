import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./style.scss";
import inTransitIcon from "../../assets/intransit.png";
import SideBar from "../../components/sidebar";
import filterIcon from "../../assets/icons/funnel.svg";
import { getTransactions } from "../../actions/transactionAction";
import Moment from "react-moment";
import setAuthToken from '../../utils/setAuthToken'
import { func } from "prop-types";

const TransactionHistory = (props) => {
  const dispatch = useDispatch();
  const [transactions, setTransactions] = useState([]);
  const [displayTransactions, setDisplayTransactions] = useState([]);
  const [inBound, setinBound] = useState([]); //being used for recieved
  const [outBound, setoutBound] = useState([]);
  const [inTransit, setinTransit] = useState([]);
  const [sent, setSent] = useState([]);
  const [Added, setAdded] = useState([]);
  const [buttonState0, setButtonActive] = useState("btn active");
  const [buttonState1, setButtonActive1] = useState("btn");
  const [buttonState2, setButtonActive2] = useState("btn");
  const [buttonState3, setButtonActive3] = useState("btn");
  const [buttonState4, setButtonActive4] = useState("btn");
  const [dateClassName, setdateClassName] = useState("transactionListDate");
  const [groupDate, setGroupDate] = useState("null");
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
  useEffect(() => {
    (async () => {
      const results = await dispatch(getTransactions());
      setDisplayTransactions(results.data);
      setTransactions(results.data);
      let addedarray = [];
      results.data.forEach((a) => {
        // console.log('a')
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
                <a
                  href="#3"
                  class={buttonState3}
                  onClick={() => {
                    setButtonActive3("btn active");
                    selectThis("transit");
                  }}
                >
                  In-Transit
                </a>
                <a
                  href="#4"
                  class={buttonState4}
                  onClick={() => {
                    setButtonActive4("btn active");
                    selectThis("added");
                  }}
                >
                  Added
                </a>
              </div>
              <div className="productList">
                {displayTransactions.map((transaction, index) => (
                  <div>
                    <span className={dateClassName}>
                      <Moment format="MMM Do, YYYY">
                        {transaction.shippingDate}
                      </Moment>
                    </span>
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
                                  {transaction.shippingDate}
                                </Moment>
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
                  <a href="#!" class="btn ">
                    Brewery
                  </a>
                  <a href="#!" class="btn active">
                    Vendor
                  </a>
                </div>

                <label className="filterSubHeading mt-2">Time Period</label>
                <div class="btn-group filterButton mt-2">
                  <a href="#!" class="btn active">
                    Today
                  </a>
                  <a href="#!" class="btn">
                    Monthly
                  </a>
                  <a href="#!" class="btn">
                    Quarterly
                  </a>
                  <a href="#!" class="btn">
                    Yearly
                  </a>
                </div>

                <label className="filterSubHeading mt-2">District</label>
                <select className="filterSelect mt-2">
                  <option>Select district</option>
                </select>

                <label className="filterSubHeading mt-2">Vendor</label>
                <div class="btn-group filterButton mt-2">
                  <a href="#!" class="btn active">
                    All
                  </a>
                  <a href="#!" class="btn">
                    S1
                  </a>
                  <a href="#!" class="btn">
                    S2
                  </a>
                </div>

                <label className="filterSubHeading mt-2">Select Vendor</label>
                <select className="filterSelect mt-2">
                  <option>Select Vendor</option>
                  <option>Select Vendor</option>
                  <option>Select Vendor</option>
                  <option>Select Vendor</option>
                </select>

                <button className="btn SearchButton mt-4">Search</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>


  );
};
export default TransactionHistory;
