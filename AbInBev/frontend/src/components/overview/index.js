import React from "react";
import { AreaChart, Area, Tooltip } from "recharts";
import "./style.scss";
import logo from "../../assets/ABInBev.png";
import bottlesIcon from "../../assets/becks_330ml.png";
import brewIcon from "../../assets/in brewery.png";
import s2VenorsIcon from "../../assets/s2 venors.png";
import s1VenorsIcon from "../../assets/s1vendors.png";
import SideBar from "../../components/sidebar";
const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];
const Overview = (props) => {
  const { history } = props;
  history.location.pathname;
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 d-none d-md-block padding0 greyBG">
          <nav className="sidebar">
            <div className="abinBevLogo">
              <img src={logo} width={90} />
            </div>
            <div className="sidebar-sticky">
              <div className="grid" style={{ rowGap: "20px", alignContent: "end" }}>
                <div
                  className={
                    history.location.pathname.includes("overview")
                      ? "gds-links bord-white"
                      : "gds-links"
                  }
                >
                  <div className="gdsl-in">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-house"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
                      />
                      <path
                        fillRule="evenodd"
                        d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
                      />
                    </svg>
                    <div onClick={() => history.push("/overview")}>Overview</div>
                  </div>
                </div>
                <div
                  className={
                    history.location.pathname.includes("dashboard")
                      ? "gds-links bord-white"
                      : "gds-links"
                  }
                >
                  <div className="gdsl-in">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-bar-chart-line"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1V2zm1 12h2V2h-2v12zm-3 0V7H7v7h2zm-5 0v-3H2v3h2z" />
                    </svg>
                    <div onClick={() => history.push("/overview")}>Dashboard</div>
                  </div>
                </div>

                <div
                  className={
                    history.location.pathname.includes("transactionHistory")
                      ? "gds-links bord-white"
                      : "gds-links"
                  }
                >
                  <div className="gdsl-in">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-clock-history"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z" />
                      <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z" />
                      <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z" />
                    </svg>
                    <div onClick={() => history.push("/transactionHistory")}>
                      Transaction History
                    </div>
                  </div>
                </div>
                <div
                  className={
                    history.location.pathname.includes("inventory")
                      ? "gds-links bord-white"
                      : "gds-links"
                  }
                >
                  <div className="gdsl-in">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-bag"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                    </svg>
                    <div onClick={() => history.push("/inventory")}>Inventory</div>
                  </div>
                </div>
                <div className="gds-links">
                  <div className="gdsl-in">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-people-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                      <path
                        fillRule="evenodd"
                        d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"
                      />
                      <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                    </svg>
                    <div>Manage Users</div>
                  </div>
                </div>
                <div className="gds-links">
                  <div className="gdsl-in">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-box-arrow-right"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                      />
                      <path
                        fillRule="evenodd"
                        d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                      />
                    </svg>
                    <div>Logout</div>
                  </div>
                </div>
              </div>
            </div>
            <button className="btn btn-warning dahbtngo">
              <span className="whiteC"></span>
              <span className="grid jis">
                <span>ABC Pvt Ltd.</span>
                <span style={{ fontSize: "10px" }}>My Settings</span>
              </span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#A20134"
                  className="bi bi-chevron-right"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </span>
            </button>      
          </nav>
        </div>
          

        <main role="main" className="col-md-9 ml-sm-auto col-lg-10">
          <div className="row">
            <div className="col-md-9 mainContainer pt-3 px-4">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3">
                <h1 className="h2">Overview</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
                  </svg>
                </div>
              </div>
              <div className="grid gafc gap3">
                <section className="boxes1">
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
                        stroke="white"
                        xmlns="http://www.w3.org/2000/svg"
                        width="12px"
                        height="12px"
                        viewBox="0 0 21.166 21.166"
                      >
                        <defs></defs>
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
                    <span>2</span>
                    <span className="bi2-icons">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12px"
                        height="12px"
                        fill="white"
                        className="bi bi-clock"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                      </svg>
                    </span>
                    <span>15 Nov 2019</span>
                  </div>
                  <div className="progressBox">
                      <div className="progressarea">
                        <div className="progress">
                          <div
                            className="progress-bar white-bg"
                            role="progressbar"
                            style={{ width: "87%" }}
                            aria-valuenow="87"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                      <span>87%</span>     
                  </div>
                  <div className="card-footer bg-transparent" style={{ border: 0 }}>
                    Stock :
                    <span className="stoct-count font-HelveticaNeue">2,47,953</span>
                  </div>
                </section>
                <section className="boxes2">
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
                    <span>2</span>
                    <span className="bi2-icons">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12px"
                        height="12px"
                        fill="#333751"
                        className="bi bi-clock"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                      </svg>
                    </span>
                    <span>15 Nov 2019</span>
                  </div>
                  <div className="progressBox">
                      <div className="progressarea">
                        <div className="progress">
                          <div
                            className="progress-bar purple-bg"
                            role="progressbar"
                            style={{ width: "87%" }}
                            aria-valuenow="87"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                      <span>87%</span>     
                  </div>
                  <div className="card-footer bg-transparent" style={{ border: 0 }}>
                    Stock :<span className="stoct-count">2,47,953</span>
                  </div>
                </section>
                <section className="boxes2">
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
                    <span>2</span>
                    <span className="bi2-icons">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12px"
                        height="12px"
                        fill="#333751"
                        className="bi bi-clock"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                      </svg>
                    </span>
                    <span>15 Nov 2019</span>
                  </div>
                  <div className="progressBox">
                      <div className="progressarea">
                        <div className="progress">
                          <div
                            className="progress-bar orange-bg"
                            role="progressbar"
                            style={{ width: "87%" }}
                            aria-valuenow="87"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                      <span>87%</span>     
                  </div>
                  <div className="card-footer bg-transparent" style={{ border: 0 }}>
                    Stock :<span className="stoct-count">2,47,953</span>
                  </div>
                </section>
              </div>
                <div className="tableDetals">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">SKU</th>
                        <th scope="col">Sales</th>
                        <th scope="col">Return Bottles</th>
                        <th scope="col">Traget</th>
                        <th scope="col">Actual Return</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td scope="row">
                          <div className="tableProfileIconCard">
                            <div className="profileIcon">
                              <img src={bottlesIcon} alt="" width="50" height="50" />
                            </div>
                            <div className="profileName">
                              <span className="profileTitle">Becks 330 ml</span>
                              <span>526025</span>
                            </div>
                          </div>
                          
                        </td>
                        <td>333333</td>
                        <td>333333</td>
                        <td>333333</td>
                        <td>333333</td>
                      </tr>
                      <tr>
                        <td scope="row">
                          <div className="tableProfileIconCard">
                            <div className="profileIcon">
                              <img src={bottlesIcon} alt="" width="50" height="50" />
                            </div>
                            <div className="profileName">
                              <span className="profileTitle">Becks 330 ml</span>
                              <span>526025</span>
                            </div>
                          </div>
                          
                        </td>
                        <td>333333</td>
                        <td>333333</td>
                        <td>333333</td>
                        <td>333333</td>
                      </tr>
                      <tr>
                        <td scope="row">
                          <div className="tableProfileIconCard">
                            <div className="profileIcon">
                              <img src={bottlesIcon} alt="" width="50" height="50" />
                            </div>
                            <div className="profileName">
                              <span className="profileTitle">Becks 330 ml</span>
                              <span>526025</span>
                            </div>
                          </div>
                          
                        </td>
                        <td>333333</td>
                        <td>333333</td>
                        <td>333333</td>
                        <td>333333</td>
                      </tr>
                      <tr>
                        <td scope="row">
                          <div className="tableProfileIconCard">
                            <div className="profileIcon">
                              <img src={bottlesIcon} alt="" width="50" height="50" />
                            </div>
                            <div className="profileName">
                              <span className="profileTitle">Becks 330 ml</span>
                              <span>526025</span>
                            </div>
                          </div>
                          
                        </td>
                        <td>333333</td>
                        <td>333333</td>
                        <td>333333</td>
                        <td>333333</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
          
            </div>
            <div className="col-md-3 rightSideMenu pt-3 px-2">
              <div className="white-box">
                <h3 className="box-title">Order Quantity</h3>
                <div className="row pt-3">
                    <div className="col-md-6 col-sm-6 col-xs-6  m-t-30">
                      <div className="quantity">7650</div>
                      <span className="quantityDesc"><b>1.5 %</b> than last year</span> 
                    </div>
                    <div className="col-md-6 col-sm-6 col-xs-6">
                      <AreaChart
                          width={100}
                          height={30}
                          data={data}
                          margin={{
                            top: 5,
                            right: 0,
                            left: 0,
                            bottom: 5
                          }}
                        >
                          <Area type="monotone" dataKey="uv" stroke="#F49C00" fill="#F49C00" />
                          <Tooltip />
                        </AreaChart>
                    </div>
                </div>
              </div>
              <div className="white-box">
                <h3 className="box-title">Avg. Order Value</h3>
                <div className="row pt-3">
                    <div className="col-md-6 col-sm-6 col-xs-6  m-t-30">
                      <div className="quantity">$306.20</div>
                      <span className="quantityDesc"><b>1.3 %</b> than last year</span> 
                    </div>
                    <div className="col-md-6 col-sm-6 col-xs-6">
                      <AreaChart
                        width={100}
                        height={30}
                        data={data}
                        margin={{
                          top: 5,
                          right: 0,
                          left: 0,
                          bottom: 5
                        }}
                      >
                        <Area type="monotone" dataKey="uv" stroke="#A3ECCD" fill="#A3ECCD" />
                        <Tooltip />
                      </AreaChart>
                    </div>
                </div>
              </div>
            </div>
          </div>
          
        </main>
      </div>
    </div>  
    );
};
export default Overview;
