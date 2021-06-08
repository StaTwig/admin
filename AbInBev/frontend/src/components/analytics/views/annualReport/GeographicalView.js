
import React, { useState, useEffect } from "react";
import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";

import "../../style.scss";
import bottlesIcon from "../../../../assets/becks_330ml.png";
import DownArrow from "../../../../assets/down_arrow.png";
import UpArrow from "../../../../assets/up_arrow.png";
import { getAnalyticsAllStats, getAnalyticsByBrand } from '../../../../actions/analyticsAction';
import { useDispatch } from 'react-redux';



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
    const { states, SKUStats, sku, viewName } = props;

    const [analytics, setAnalytics] = useState(SKUStats);
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     (async () => {
    //     // const result = await dispatch(getAnalyticsAllStats('?group_by=state'));
    //     const result = await dispatch(getAnalyticsByBrand());
    //     setAnalytics(result.data);
    //     })();
    // }, []);

    useEffect(() => {
        if (sku) {
            let n = SKUStats.filter(a => a.externalId == sku);
            if (sku == '')
                setAnalytics(SKUStats);
            else
                setAnalytics(n);
        }
    }, [sku, viewName, props])

    const showDetailedGeoView = (param) => {
        props.onViewChange('DETAILED_GEO_VIEW', param);
    }
    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3">
                <h1 className="h2">Analytics</h1>
            </div>
            <div className="btn-group mainButtonFilter">
                <a href="#!" className="btn active">State</a>
                <select className="btn selectState" onChange="getSKUByState($event)">
                    <option>Select state</option>
                    {states?.map((state) =>
                        <option>{state}</option>
                    )
                    }
                </select>
            </div>

            {/* <div className="row">
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
             */}
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
                        {analytics?.map((analytic, index) =>
                            <tr>
                                <td scope="row">
                                    <div className="tableProfileIconCard justify-content-start">
                                        <div className="profileIcon">
                                            <img src={analytic.image} alt="" width="50" height="50" />
                                        </div>
                                        <div className="profileName">
                                            <span className="profileTitle" onClick={() => showDetailedGeoView(analytic)}>{analytic.manufacturer + ' - ' + analytic.name}</span>
                                        </div>
                                    </div>
                                </td>
                                <td>{analytic.sales}</td>
                                <td>{analytic.returns ? analytic.returns : 0}</td>
                                <td>{analytic.targetSales}</td>
                                <td>{analytic.returnRate ? analytic.returnRate : 0}%</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </>
    );
}
export default GeographicalView;