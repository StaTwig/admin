import React, { useEffect, useState }  from "react";
import { useDispatch } from 'react-redux';
import "./style.scss";
import inTransitIcon from "../../assets/intransit.png";
import SideBar from "../../components/sidebar";
import filterIcon from "../../assets/icons/funnel.svg"
import { getTransactions } from '../../actions/transactionAction';
import Moment from 'react-moment';

const TransactionHistory = (props) => {
  const dispatch = useDispatch();
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    (async () => {
      const results = await dispatch(getTransactions());
      setTransactions(results.data);
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
                  </svg>
                </div>
              </div>
              <div className="btn-group mainButtonFilter">
                <a href="#!" className="btn active">All</a>
                <a href="#!" className="btn">Sent</a>
                <a href="#!" className="btn">Received</a>
                <a href="#!" className="btn">In-Transit</a>
                <a href="#!" className="btn">Added</a>
              </div>

              <div className="productList">
              {transactions.map((transaction, index) => 
                <div>
                  <span className="transactionListDate">
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
                              className="icon-thumbnail-img"
                              alt=""
                            />  
                          </div>
                          <div>
                            <span className="transactionTitle">{transaction.receiver.org.name}</span><br/>
                            <span className="transactionDate">
                                <Moment format="MMMM Do YYYY, h:mm a">
                                  {transaction.shippingDate}
                                </Moment>
                              </span>
                          </div>
                          
                        </div>
                      </div>
                      <div className="productItem">
                      {transaction.receiver.warehouse.warehouseAddress.city, transaction.receiver.warehouse.warehouseAddress.state }
                      </div>
                      <div className="productItem">
                      {transaction.status === 'RECEIVED' &&
                        <div className="productStatus">
                          <span className="statusbadge receivedBadge"></span> Received
                        </div>
                      }
                      {transaction.status === 'SENT' &&
                        <div className="productStatus">
                          <span className="statusbadge sentBadge"></span> Sent
                        </div>
                      }
                      {transaction.status === 'INTRANSIT' &&
                        <div className="productStatus">
                          <span className="statusbadge transitBadge"></span> In Transit
                        </div>
                      }
                      {transaction.status === 'CREATED' &&
                        <div className="productStatus">
                          <span className="statusbadge addedBadge"></span> Added
                        </div>
                      }   
                      </div>
                      <div className="productItem">
                        123456.jpg
                      </div>
                      <div className="productItem productQuantity">
                        {transaction.products.reduce((a,v) =>  a = a + v.productQuantity , 0 )}
                      </div>
                    </div>
                  </div>
                </div>
                )}
              </div>
            </div>
            <div className="col-md-3 rightSideMenu pt-4 px-2">
              <div className="filterSection">
                <div className="filterHeader">
                  <img src={filterIcon} className="filterIcon"/> FILTERS
                </div>

                <div className="btn-group filterButton mt-4">
                  <a href="#!" className="btn ">Brewery</a>
                  <a href="#!" className="btn active">Vendor</a>
                </div>

                <label className="filterSubHeading mt-2">Time Period</label>
                <div className="btn-group filterButton mt-2">
                  <a href="#!" className="btn active">Today</a>
                  <a href="#!" className="btn">Monthly</a>
                  <a href="#!" className="btn">Quarterly</a>
                  <a href="#!" className="btn">Yearly</a>
                </div>

                <label className="filterSubHeading mt-2">District</label>
                <select className="filterSelect mt-2">
                  <option>Select district</option>
                </select>

                <label className="filterSubHeading mt-2">Vendor</label>
                <div className="btn-group filterButton mt-2">
                  <a href="#!" className="btn active">All</a>
                  <a href="#!" className="btn">S1</a>
                  <a href="#!" className="btn">S2</a>
                </div>

                <label className="filterSubHeading mt-2">Select Vendor</label>
                <select className="filterSelect mt-2">
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
