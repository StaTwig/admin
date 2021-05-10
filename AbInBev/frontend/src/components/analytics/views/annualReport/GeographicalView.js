
import React from "react";
import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";

import "../../style.scss";
import bottlesIcon from "../../../../assets/becks_330ml.png";
import DownArrow from "../../../../assets/down_arrow.png";
import UpArrow from "../../../../assets/up_arrow.png";



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

const GeographicalView = (props) => {
    const showDetailedGeoView = () => {
        props.onViewChange('DETAILED_GEO_VIEW');
    }
    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3">
                <h1 className="h2">Analytics</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                    </svg>
                </div>
            </div>
            <div className="btn-group mainButtonFilter">
                <a href="#!" className="btn active">State</a>
                <select className="btn selectState">
                    <option>Select state</option>
                    <option>Karnataka</option>
                </select>
            </div>

            <div className="row">
                <div className="col-md-3 ">
                    <div className="analyticsCard">
                        <span className="analyticsTitle">Sales</span>
                        <span className="analyticsPercentage yellow">82% <img className="arrowIcon" src={UpArrow} /></span>
                        <div className="chartAnalytics">
                            <ResponsiveContainer width="100%" height={100}>
                                <AreaChart

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
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="analyticsCard">
                        <span className="analyticsTitle">Returns</span>
                        <span className="analyticsPercentage">78%</span>
                        <div className="chartAnalytics">
                            <ResponsiveContainer width="100%" height={100}>
                                <AreaChart
                                    data={data}
                                    margin={{
                                        top: 5,
                                        right: 0,
                                        left: 0,
                                        bottom: 5
                                    }}
                                >
                                    <Area type="monotone" dataKey="uv" stroke="#C8F4E1" fill="#C8F4E1" />
                                    <Tooltip />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 ">
                    <div className="analyticsCard">
                        <span className="analyticsTitle">Target</span>
                        <span className="analyticsPercentage pink">65% <img className="arrowIcon" src={DownArrow} /></span>
                        <div className="chartAnalytics">
                            <ResponsiveContainer width="100%" height={100}>
                                <AreaChart
                                    data={data}
                                    margin={{
                                        top: 5,
                                        right: 0,
                                        left: 0,
                                        bottom: 5
                                    }}
                                >
                                    <Area type="monotone" dataKey="uv" stroke="#F85566" fill="#F85566" />
                                    <Tooltip />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="analyticsCard">
                        <span className="analyticsTitle">Actual Returns</span>
                        <span className="analyticsPercentage blue">70%</span>
                        <div className="chartAnalytics">
                            <ResponsiveContainer width="100%" height={100}>
                                <AreaChart
                                    data={data}
                                    margin={{
                                        top: 5,
                                        right: 0,
                                        left: 0,
                                        bottom: 5
                                    }}
                                >
                                    <Area type="monotone" dataKey="uv" stroke="#20BECB" fill="#20BECB" />
                                    <Tooltip />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
            <div className="tableDetals">
                <table className="table text-align-left">
                    <thead>
                        <tr>
                            <th scope="col">SKU</th>
                            <th scope="col">Sales</th>
                            <th scope="col">Return Bottles</th>
                            <th scope="col">Target</th>
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
                                        <span className="profileTitle"
                                        onClick={showDetailedGeoView}
                                        >Becks 330 ml</span>
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

        </>
    );
}
export default GeographicalView;