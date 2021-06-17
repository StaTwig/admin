import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import '../../style.scss';
import { getAnalyticsAllStats } from '../../../../actions/analyticsAction';
import { useDispatch } from 'react-redux';

const DetailedGeographicalView = (props) => {
  const { states, prop, sku, SKUStats, params, brandsArr, brands } = props;

  const [analytics, setAnalytics] = useState([]);
  const [name, setName] = useState(prop.name);
  const [shortName, setShortname] = useState(prop.shortName);
  const [image, setImage] = useState(prop.image);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      if (props.sku) {
        let n = props.SKUStats.filter((a) => a.externalId == props.sku);
        setName(n[0].name);
        setShortname(n[0].shortName);
        setImage(n[0].image);
      }

      let qp = '';

      if (props.params) {
        const p = props.params;
        if (p.year) qp = '&year=' + p.year;
        if (p.month) qp += '&month=' + p.month;
        if (p.quarter) qp += '&quarter=' + p.quarter;
        if (p.state) qp += '&state=' + p.state;
        if (p.district) qp += '&district=' + p.district;

        if (p.year && p.month) qp += '&date_filter_type=by_monthly';
        else if (p.year && p.quarter) qp += '&date_filter_type=by_quarterly';
        else if (p.year) qp += '&date_filter_type=by_yearly';
      }

      const result = await dispatch(
        getAnalyticsAllStats(
          '?sku=' +
            (props.sku ? props.sku : prop.externalId) +
            '&group_by=date' +
            qp,
        ),
      );
      setAnalytics(result.data);
    })();
  }, [props]);
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3">
        <h1 className="h2">Analytics</h1>
      </div>

      <div className="geocard cursor-pointer mb-4">
        <div className="author mb-2">
          <div className="profile">
            <img
              src={
                brandsArr[brands.indexOf(prop.manufacturer.split(' ').join(''))]
              }
              alt=""
              height="60"
            />
          </div>
          <div className="info">
            <div className="name">{name}</div>
            <div className="caption">{shortName}</div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12 col-sm-12">
          <div className="geoAnalyticsCard">
            <div className="geoanalyticsTitle">Karnataka</div>
            <div className="geosubTitle mb-4">Return Rate</div>
            <ResponsiveContainer width="100%" height={380}>
              <LineChart
                width={500}
                height={300}
                data={analytics}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="groupedBy" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sales"
                  name="Sales"
                  stroke="#FBBD0E"
                  strokeWidth={3}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="returns"
                  name="Returns"
                  stroke="#A344B7"
                  strokeWidth={3}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="targetSales"
                  name="Target Sales"
                  stroke="#A21233"
                  strokeWidth={3}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="actualReturns"
                  name="Actual Returns"
                  stroke="#E36141"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="tableDetals">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">State</th>
                    <th scope="col">Sales</th>
                    <th scope="col">Returns</th>
                    <th scope="col">Target Sales</th>
                    <th scope="col">Actual Returns</th>
                  </tr>
                </thead>
                <tbody>
                  {analytics.map((analytic, index) => (
                    <tr key={index}>
                      <td scope="row">
                        <span className="stateLink">Karnataka</span>
                      </td>
                      <td>{analytic.sales}</td>
                      <td>{analytic.returns}</td>
                      <td>{analytic.targetSales}</td>
                      <td>{analytic.actualReturns}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DetailedGeographicalView;
