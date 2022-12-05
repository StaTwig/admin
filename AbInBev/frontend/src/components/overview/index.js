import React, { useEffect, useState } from 'react';
import { AreaChart, Area, Tooltip } from 'recharts';
import { useDispatch } from 'react-redux';
import './style.scss';
import Moment from 'react-moment';

import bottlesIcon from '../../assets/becks_330ml.png';
import brewIcon from '../../assets/in brewery.png';
import s2VenorsIcon from '../../assets/s2 venors.png';
import s1VenorsIcon from '../../assets/s1vendors.png';
import SideBar from '../../components/sidebar';
import { getOverviewAnalytics } from '../../actions/overviewAction';

const Overview = (props) => {
  const dispatch = useDispatch();
  const [Transactions, setTransactions] = useState([]);
  const [overviewStats, setOverviewStats] = useState({
    breweryObj: {},
    s1Obj: {},
    s2Obj: {},
  });

  const [selectedFilter, setSelectedFilter] = useState('BREWERY');

  const today = new Date().toDateString();

  const applyFilter = (_filter) => {
    setSelectedFilter(_filter);
    // TODO: Fetch data based on filters...
    (async () => {
      const results = await dispatch(getOverviewAnalytics(_filter));
      if (results.data.overviewStats) {
        setOverviewStats(results.data.overviewStats);
      } else {
        setOverviewStats({ breweryObj: {}, s1Obj: {}, s2Obj: {} });
      }
      setTransactions(results.data.data);
    })();
  };

  useEffect(() => {
    (async () => {
      const results = await dispatch(getOverviewAnalytics());
      if (results.data.overviewStats) {
        setOverviewStats(results.data.overviewStats);
      } else {
        setOverviewStats({ breweryObj: {}, s1Obj: {}, s2Obj: {} });
      }

      setTransactions(results.data.data);
    })();
  }, []);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 d-none d-md-block padding0 greyBG">
          <SideBar {...props} />
        </div>
        <main
          role="main"
          className="col-md-9 mainContainer ml-sm-auto col-lg-10"
        >
          <div className="row">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center p-2">
              <h1 className="h2">Overview</h1>
            </div>

            <div className="col-md-9  pt-3 px-4">
              <div className="grid gafc gap3">
                <section
                  className={
                    selectedFilter === 'BREWERY' ? 'selectedBox' : 'box'
                  }
                  onClick={() => applyFilter('BREWERY')}
                >
                  <div className="grid gafc aic gapc3">
                    <div
                      className="whiteC"
                      style={{
                        backgroundImage: `url(${brewIcon})`,
                      }}
                    ></div>
                    <h6>In Brewery</h6>
                  </div>
                  <div className="grid small-txt-1 boxes-inner-2">
                    <span className="bi2-icons">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12px"
                        height="12px"
                        viewBox="0 0 21.166 21.166"
                        fill={
                          selectedFilter === 'BREWERY' ? '#ffffff' : '#333751'
                        }
                      >
                        <path
                          className="a"
                          d="M25.469,16.939A2.469,2.469,0,1,0,23,14.469,2.472,2.472,0,0,0,25.469,16.939Zm0-4.233a1.764,1.764,0,1,1-1.764,1.764A1.766,1.766,0,0,1,25.469,12.706Z"
                          transform="translate(-14.886 -7.767)"
                        />
                        <path
                          className="a"
                          d="M17.411,19.317,22.823,11.5a7.708,7.708,0,0,0-.628-9.519,6.764,6.764,0,0,0-9.567,0,7.706,7.706,0,0,0-.636,9.508ZM13.126,2.48a6.06,6.06,0,0,1,8.57,0,6.964,6.964,0,0,1,.555,8.607l-4.84,6.99-4.847-7A6.962,6.962,0,0,1,13.126,2.48Z"
                          transform="translate(-6.89 0)"
                        />
                        <path
                          className="a"
                          d="M14.858,43a.353.353,0,1,0-.083.7c3.71.437,5.686,1.614,5.686,2.3,0,.957-3.758,2.293-9.878,2.293S.706,46.955.706,46c0-.682,1.976-1.859,5.686-2.3a.353.353,0,1,0-.083-.7C2.594,43.439,0,44.671,0,46c0,1.49,3.635,3,10.583,3s10.583-1.508,10.583-3C21.166,44.671,18.572,43.439,14.858,43Z"
                          transform="translate(0 -27.83)"
                        />
                      </svg>
                    </span>
                    <span>
                      {overviewStats['breweryObj'] &&
                      overviewStats['breweryObj']['n_warehouses']
                        ? overviewStats['breweryObj']['n_warehouses']
                        : 0}
                    </span>
                    <span className="bi2-icons">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12px"
                        height="12px"
                        fill={
                          selectedFilter === 'BREWERY' ? '#ffffff' : '#333751'
                        }
                        className="bi bi-clock"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                      </svg>
                    </span>
                    <span>
                      <Moment format="MMM Do, YYYY">{today}</Moment>
                    </span>
                  </div>
                  <div
                    className="card-footer bg-transparent"
                    style={{ border: 0 }}
                  >
                    Stock: &nbsp;
                    <span className="stoct-count font-HelveticaNeue">
                      {overviewStats['breweryObj'] &&
                      overviewStats['breweryObj']['stock']
                        ? overviewStats['breweryObj']['stock']
                        : 0}
                    </span>
                  </div>
                </section>
                <section
                  className={selectedFilter === 'S1' ? 'selectedBox' : 'box'}
                  onClick={() => applyFilter('S1')}
                >
                  <div className="grid gafc aic gapc3">
                    <div
                      className="blueC"
                      style={{ backgroundImage: `url(${s1VenorsIcon})` }}
                    ></div>
                    <h6>S1 Vendors</h6>
                  </div>
                  <div className="grid gcol2 jis aic small-txt-1 boxes-inner-2">
                    <span className="bi2-icons">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12px"
                        height="12px"
                        viewBox="0 0 21.166 21.166"
                        fill={selectedFilter === 'S1' ? '#ffffff' : '#333751'}
                      >
                        <path
                          className="a"
                          d="M25.469,16.939A2.469,2.469,0,1,0,23,14.469,2.472,2.472,0,0,0,25.469,16.939Zm0-4.233a1.764,1.764,0,1,1-1.764,1.764A1.766,1.766,0,0,1,25.469,12.706Z"
                          transform="translate(-14.886 -7.767)"
                        />
                        <path
                          className="a"
                          d="M17.411,19.317,22.823,11.5a7.708,7.708,0,0,0-.628-9.519,6.764,6.764,0,0,0-9.567,0,7.706,7.706,0,0,0-.636,9.508ZM13.126,2.48a6.06,6.06,0,0,1,8.57,0,6.964,6.964,0,0,1,.555,8.607l-4.84,6.99-4.847-7A6.962,6.962,0,0,1,13.126,2.48Z"
                          transform="translate(-6.89 0)"
                        />
                        <path
                          className="a"
                          d="M14.858,43a.353.353,0,1,0-.083.7c3.71.437,5.686,1.614,5.686,2.3,0,.957-3.758,2.293-9.878,2.293S.706,46.955.706,46c0-.682,1.976-1.859,5.686-2.3a.353.353,0,1,0-.083-.7C2.594,43.439,0,44.671,0,46c0,1.49,3.635,3,10.583,3s10.583-1.508,10.583-3C21.166,44.671,18.572,43.439,14.858,43Z"
                          transform="translate(0 -27.83)"
                        />
                      </svg>
                    </span>
                    <span>
                      {overviewStats['s1Obj'] &&
                      overviewStats['s1Obj']['n_warehouses']
                        ? overviewStats['s1Obj']['n_warehouses']
                        : 0}
                    </span>
                    <span className="bi2-icons">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12px"
                        height="12px"
                        fill={selectedFilter === 'S1' ? '#ffffff' : '#333751'}
                        className="bi bi-clock"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                      </svg>
                    </span>
                    <Moment format="MMM Do, YYYY">{today}</Moment>
                  </div>
                  <div
                    className="card-footer bg-transparent"
                    style={{ border: 0 }}
                  >
                    Stock: &nbsp;
                    <span className="stoct-count">
                      {overviewStats['s1Obj'] && overviewStats['s1Obj']['stock']
                        ? overviewStats['s1Obj']['stock']
                        : 0}
                    </span>
                  </div>
                </section>
                <section
                  className={selectedFilter === 'S2' ? 'selectedBox' : 'box'}
                  onClick={() => applyFilter('S2')}
                >
                  <div className="grid gafc aic gapc3">
                    <div
                      className="blueC"
                      style={{ backgroundImage: `url(${s2VenorsIcon})` }}
                    ></div>
                    <h6>S2 Vendors</h6>
                  </div>
                  <div className="grid gcol2 jis aic small-txt-1 boxes-inner-2">
                    <span className="bi2-icons">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12px"
                        height="12px"
                        viewBox="0 0 21.166 21.166"
                        fill={selectedFilter === 'S2' ? '#ffffff' : '#333751'}
                      >
                        <path
                          className="a"
                          d="M25.469,16.939A2.469,2.469,0,1,0,23,14.469,2.472,2.472,0,0,0,25.469,16.939Zm0-4.233a1.764,1.764,0,1,1-1.764,1.764A1.766,1.766,0,0,1,25.469,12.706Z"
                          transform="translate(-14.886 -7.767)"
                        />
                        <path
                          className="a"
                          d="M17.411,19.317,22.823,11.5a7.708,7.708,0,0,0-.628-9.519,6.764,6.764,0,0,0-9.567,0,7.706,7.706,0,0,0-.636,9.508ZM13.126,2.48a6.06,6.06,0,0,1,8.57,0,6.964,6.964,0,0,1,.555,8.607l-4.84,6.99-4.847-7A6.962,6.962,0,0,1,13.126,2.48Z"
                          transform="translate(-6.89 0)"
                        />
                        <path
                          className="a"
                          d="M14.858,43a.353.353,0,1,0-.083.7c3.71.437,5.686,1.614,5.686,2.3,0,.957-3.758,2.293-9.878,2.293S.706,46.955.706,46c0-.682,1.976-1.859,5.686-2.3a.353.353,0,1,0-.083-.7C2.594,43.439,0,44.671,0,46c0,1.49,3.635,3,10.583,3s10.583-1.508,10.583-3C21.166,44.671,18.572,43.439,14.858,43Z"
                          transform="translate(0 -27.83)"
                        />
                      </svg>
                    </span>
                    <span>
                      {overviewStats['s2Obj'] &&
                      overviewStats['s2Obj']['n_warehouses']
                        ? overviewStats['s2Obj']['n_warehouses']
                        : 0}
                    </span>
                    <span className="bi2-icons">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12px"
                        height="12px"
                        fill={selectedFilter === 'S2' ? '#ffffff' : '#333751'}
                        className="bi bi-clock"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                      </svg>
                    </span>
                    <Moment format="MMM Do, YYYY">{today}</Moment>
                  </div>
                  <div
                    className="card-footer bg-transparent"
                    style={{ border: 0 }}
                  >
                    Stock: &nbsp;
                    <span className="stoct-count">
                      {overviewStats['s2Obj'] && overviewStats['s2Obj']['stock']
                        ? overviewStats['s2Obj']['stock']
                        : 0}
                    </span>
                  </div>
                </section>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="tableDetals">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col" className="skuColumnHead">
                      SKU
                    </th>
                    <th scope="col">Sales</th>
                    <th scope="col">Return Bottles</th>
                    <th scope="col">Return Target</th>
                    <th scope="col">Return Rate Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {Transactions.map((transaction, index) => (
                    <tr key={index}>
                      <td>
                        <div className="profileIcon">
                          <img
                            src={bottlesIcon}
                            alt=""
                            width="60"
                            height="60"
                          />
                        </div>
                      </td>
                      <td scope="row">
                        <div className="profileName">
                          <span className="profileTitle">
                            {transaction.productName}
                          </span>
                          <span>{transaction.productId}</span>
                        </div>
                      </td>
                      <td>{transaction.sales}</td>
                      <td>{transaction.returns}</td>
                      <td>{transaction.targetSales}</td>
                      <td>
                        {(
                          (transaction.returns / transaction.sales) *
                          100
                        ).toFixed(2)}
                        %
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default Overview;
