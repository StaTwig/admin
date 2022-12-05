import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";
import "./style.scss";

import bottlesIcon from "../../assets/becks_330ml.png";
import DownArrow from "../../assets/down_arrow.png";
import UpArrow from "../../assets/up_arrow.png";
import React from "react";

const GeographicalView = (props) => {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  const { analytics } = props;
  console.log(analytics);
  return (
    <div>
      <div className="row">
        <div className="col-md-3 ">
          <div className="analyticsCard">
            <span className="analyticsTitle">Sales</span>
            <span className="analyticsPercentage yellow">
              82% <img className="arrowIcon" src={UpArrow} />
            </span>
            <div className="chartAnalytics">
              <ResponsiveContainer width="100%" height={100}>
                <AreaChart
                  data={data}
                  margin={{
                    top: 5,
                    right: 0,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <Area
                    type="monotone"
                    dataKey="uv"
                    stroke="#F49C00"
                    fill="#F49C00"
                  />
                  <Tooltip />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="analyticsCard">
            <span className="analyticsTitle">Returns</span>
            <span className="analyticsPercentage">82%</span>
            <div className="chartAnalytics">
              <ResponsiveContainer width="100%" height={100}>
                <AreaChart
                  data={data}
                  margin={{
                    top: 5,
                    right: 0,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <Area
                    type="monotone"
                    dataKey="uv"
                    stroke="#C8F4E1"
                    fill="#C8F4E1"
                  />
                  <Tooltip />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="col-md-3 ">
          <div className="analyticsCard">
            <span className="analyticsTitle">Target</span>
            <span className="analyticsPercentage pink">
              82% <img className="arrowIcon" src={DownArrow} />
            </span>
            <div className="chartAnalytics">
              <ResponsiveContainer width="100%" height={100}>
                <AreaChart
                  data={data}
                  margin={{
                    top: 5,
                    right: 0,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <Area
                    type="monotone"
                    dataKey="uv"
                    stroke="#F85566"
                    fill="#F85566"
                  />
                  <Tooltip />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="analyticsCard">
            <span className="analyticsTitle">Return Rate Percentage</span>
            <span className="analyticsPercentage blue">82%</span>
            <div className="chartAnalytics">
              <ResponsiveContainer width="100%" height={100}>
                <AreaChart
                  data={data}
                  margin={{
                    top: 5,
                    right: 0,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <Area
                    type="monotone"
                    dataKey="uv"
                    stroke="#20BECB"
                    fill="#20BECB"
                  />
                  <Tooltip />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="tableDetals">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">SKU</th>
              <th scope="col">Sales</th>
              <th scope="col">Return Bottles</th>
              <th scope="col">Return Target</th>
              <th scope="col">Return Rate Percentage</th>
            </tr>
          </thead>
          <tbody>
            {analytics.map((analytic, index) => (
              <tr>
                <td scope="row">
                  <div className="tableProfileIconCard">
                    <div className="profileIcon">
                      <img src={bottlesIcon} alt="" width="50" height="50" />
                    </div>
                    <div className="profileName">
                      <span className="profileTitle">
                        {analytic.productName}
                      </span>
                    </div>
                  </div>
                </td>
                <td>{analytic.sales}</td>
                <td>{analytic.returns}</td>
                <td>{analytic.target}</td>
                <td>
                  {((analytic.returns / analytic.sales) * 100).toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GeographicalView;
