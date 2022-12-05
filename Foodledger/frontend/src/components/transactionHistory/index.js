import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./style.scss";
import inTransitIcon from "../../assets/intransit.png";
import SideBar from "../../components/sidebar";
import filterIcon from "../../assets/icons/funnel.svg";
import { getTransactions } from "../../actions/transactionAction";
import Moment from "react-moment";

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
    if (a === "Lost") {
      setButtonActive("btn");
      setButtonActive2("btn");
      setButtonActive3("btn");
      setButtonActive4("btn");
      setButtonActive1("btn active");
      setDisplayTransactions(Lost);
    }
    if (a === "Damaged") {
      setButtonActive1("btn");
      setButtonActive("btn");
      setButtonActive3("btn");
      setButtonActive4("btn");
      setButtonActive2("btn active");
      setDisplayTransactions(inBound);
    }
    if (a === "Receieved") {
      setButtonActive1("btn");
      setButtonActive2("btn");
      setButtonActive("btn");
      setButtonActive4("btn");
      setButtonActive3("btn active");
      setDisplayTransactions(Receieved);
    }
    if (a === "Shipped") {
      setButtonActive1("btn");
      setButtonActive2("btn");
      setButtonActive3("btn");
      setButtonActive("btn");
      setButtonActive4("btn active");
      setDisplayTransactions(Shipped);
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
              <div className="btn-group mainButtonFilter">
                <a
                  href="#0"
                  className={buttonState0}
                  onClick={() => {
                    setButtonActive("btn active");
                    selectThis("all");
                  }}
                >
                  All
                </a>
                <a
                  href="#1"
                  className={buttonState1}
                  onClick={() => {
                    setButtonActive1("btn active");
                    selectThis("Lost");
                  }}
                >
                  Lost
                </a>
                <a
                  href="#2"
                  className={buttonState2}
                  onClick={() => {
                    setButtonActive2("btn active");
                    selectThis("Damaged");
                  }}
                >
                  Damaged
                </a>
                <a
                  href="#3"
                  className={buttonState3}
                  onClick={() => {
                    setButtonActive3("btn active");
                    selectThis("Receieved");
                  }}
                >
                  Receieved
                </a>
                <a
                  href="#4"
                  className={buttonState4}
                  onClick={() => {
                    setButtonActive4("btn active");
                    selectThis("Shipped");
                  }}
                >
                  Shipped
                </a>
              </div>
              <div className="productList">
                <div className="transactionsDetails">
                  <table className="inventorytable">
                    <thead>
                      <tr>
                        <th className="inventoryHeader">Shipment ID </th>
                        <th className="inventoryHeader">RO number/ Way bill no.</th>
                        <th className="inventoryHeader">Date</th>
                        <th className="inventoryHeader">From</th>
                        <th className="inventoryHeader">To</th>
                      </tr>
                    </thead>
                    <tbody>
                        <tr>
                          <td className="inventorydesc">2804011</td>
                          <td className="inventorydesc">CC202005183728175</td>
                          <td>July 16</td>
                          <td>Mill 2804011</td>
                          <td>GD 3803002</td>
                        </tr>
                        <tr>
                          <td className="inventorydesc">2804011</td>
                          <td className="inventorydesc">CC202005183728175</td>
                          <td>July 16</td>
                          <td>Mill 2804011</td>
                          <td>GD 3803002</td>
                        </tr>
                        <tr>
                          <td className="inventorydesc">2804011</td>
                          <td className="inventorydesc">CC202005183728175</td>
                          <td>July 16</td>
                          <td>Mill 2804011</td>
                          <td>GD 3803002</td>
                        </tr>
                        <tr>
                          <td className="inventorydesc">2804011</td>
                          <td className="inventorydesc">CC202005183728175</td>
                          <td>July 16</td>
                          <td>Mill 2804011</td>
                          <td>GD 3803002</td>
                        </tr>
                        <tr>
                          <td className="inventorydesc">2804011</td>
                          <td className="inventorydesc">CC202005183728175</td>
                          <td>July 16</td>
                          <td>Mill 2804011</td>
                          <td>GD 3803002</td>
                        </tr>
                        <tr>
                          <td className="inventorydesc">2804011</td>
                          <td className="inventorydesc">CC202005183728175</td>
                          <td>July 16</td>
                          <td>Mill 2804011</td>
                          <td>GD 3803002</td>
                        </tr>
                        <tr>
                          <td className="inventorydesc">2804011</td>
                          <td className="inventorydesc">CC202005183728175</td>
                          <td>July 16</td>
                          <td>Mill 2804011</td>
                          <td>GD 3803002</td>
                        </tr>
                        <tr>
                          <td className="inventorydesc">2804011</td>
                          <td className="inventorydesc">CC202005183728175</td>
                          <td>July 16</td>
                          <td>Mill 2804011</td>
                          <td>GD 3803002</td>
                        </tr>
                        <tr>
                          <td className="inventorydesc">2804011</td>
                          <td className="inventorydesc">CC202005183728175</td>
                          <td>July 16</td>
                          <td>Mill 2804011</td>
                          <td>GD 3803002</td>
                        </tr>
                        <tr>
                          <td className="inventorydesc">2804011</td>
                          <td className="inventorydesc">CC202005183728175</td>
                          <td>July 16</td>
                          <td>Mill 2804011</td>
                          <td>GD 3803002</td>
                        </tr>
                        <tr>
                          <td className="inventorydesc">2804011</td>
                          <td className="inventorydesc">CC202005183728175</td>
                          <td>July 16</td>
                          <td>Mill 2804011</td>
                          <td>GD 3803002</td>
                        </tr>
                        <tr>
                          <td className="inventorydesc">2804011</td>
                          <td className="inventorydesc">CC202005183728175</td>
                          <td>July 16</td>
                          <td>Mill 2804011</td>
                          <td>GD 3803002</td>
                        </tr>
                        <tr>
                          <td className="inventorydesc">2804011</td>
                          <td className="inventorydesc">CC202005183728175</td>
                          <td>July 16</td>
                          <td>Mill 2804011</td>
                          <td>GD 3803002</td>
                        </tr>
                        <tr>
                          <td className="inventorydesc">2804011</td>
                          <td className="inventorydesc">CC202005183728175</td>
                          <td>July 16</td>
                          <td>Mill 2804011</td>
                          <td>GD 3803002</td>
                        </tr>
                        <tr>
                          <td className="inventorydesc">2804011</td>
                          <td className="inventorydesc">CC202005183728175</td>
                          <td>July 16</td>
                          <td>Mill 2804011</td>
                          <td>GD 3803002</td>
                        </tr>
                        <tr>
                          <td className="inventorydesc">2804011</td>
                          <td className="inventorydesc">CC202005183728175</td>
                          <td>July 16</td>
                          <td>Mill 2804011</td>
                          <td>GD 3803002</td>
                        </tr>
                        <tr>
                          <td className="inventorydesc">2804011</td>
                          <td className="inventorydesc">CC202005183728175</td>
                          <td>July 16</td>
                          <td>Mill 2804011</td>
                          <td>GD 3803002</td>
                        </tr>
                        <tr>
                          <td className="inventorydesc">2804011</td>
                          <td className="inventorydesc">CC202005183728175</td>
                          <td>July 16</td>
                          <td>Mill 2804011</td>
                          <td>GD 3803002</td>
                        </tr>
                        <tr>
                          <td className="inventorydesc">2804011</td>
                          <td className="inventorydesc">CC202005183728175</td>
                          <td>July 16</td>
                          <td>Mill 2804011</td>
                          <td>GD 3803002</td>
                        </tr>
                        <tr>
                          <td className="inventorydesc">2804011</td>
                          <td className="inventorydesc">CC202005183728175</td>
                          <td>July 16</td>
                          <td>Mill 2804011</td>
                          <td>GD 3803002</td>
                        </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-md-3 rightSideMenu pt-4 px-2">
              <div className="filterSection">
                <div className="filterHeader">
                  <img src={filterIcon} className="filterIcon" /> FILTERS
                </div>

                <label className="filterSubHeading mt-2">Time Period</label>
                <div className="btn-group filterButton mt-2">
                  <a href="#!" className="btn active">
                    Today
                  </a>
                  <a href="#!" className="btn">
                    Monthly
                  </a>
                  <a href="#!" className="btn">
                    Quarterly
                  </a>
                  <a href="#!" className="btn">
                    Yearly
                  </a>
                </div>

                <label className="filterSubHeading mt-2">State</label>
                <select className="filterSelect mt-2">
                  <option>Select State</option>
                </select>

                <label className="filterSubHeading mt-2">District</label>
                <select className="filterSelect mt-2">
                  <option>Select district</option>
                </select>

                <label className="filterSubHeading mt-2">Location</label>
                <div className="btn-group filterButton mt-2">
                  <a href="#!" className="btn active">
                    Mill
                  </a>
                  <a href="#!" className="btn">
                    Buffer Godown
                  </a>
                  <a href="#!" className="btn">
                    MLS
                  </a>
                  <a href="#!" className="btn">
                    FP Shop
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  
  
  );
};
export default TransactionHistory;
