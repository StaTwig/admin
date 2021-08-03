import React, { useEffect, useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from 'recharts';
import '../../style.scss';
import { getAnalyticsAllStats } from '../../../../actions/analyticsAction';
import { useDispatch } from 'react-redux';
import abbreviate from 'number-abbreviate';

const DetailedGeographicalView = (props) => {
  const {
    states,
    prop,
    sku,
    SKUStats,
    params,
    brandsArr,
    brands,
    geoAnalyticsCardYAxisLabel,
  } = props;

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

      if (Object.keys(props.params).length === 0) {
        qp =
          '&year=' + new Date().getFullYear() + '&date_filter_type=by_yearly';
      } else {
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
            '&pid=' +
            prop.id +
            '&brand=' +
            prop.manufacturer +
            '&group_by=date' +
            qp,
        ),
      );
      setAnalytics(result.data);
    })();
  }, [props]);

  const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = useState(config);

    const sortedItems = useMemo(() => {
      let sortableItems = [...items];
      if (sortConfig !== null) {
        sortableItems.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        });
      }
      return sortableItems;
    }, [items, sortConfig]);

    const requestSort = (key) => {
      let direction = 'ascending';
      if (
        sortConfig &&
        sortConfig.key === key &&
        sortConfig.direction === 'ascending'
      ) {
        direction = 'descending';
      }
      setSortConfig({ key, direction });
    };

    return { items: sortedItems, requestSort, sortConfig };
  };

  const { items, requestSort, sortConfig } = useSortableData(analytics);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

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
            <div className="geoanalyticsTitle"></div>
            <ResponsiveContainer width="100%" height={380}>
              <LineChart
                width={500}
                height={400}
                data={analytics}
                margin={{
                  top: 15,
                  right: 35,
                  left: 25,
                  bottom: 15,
                }}
              >
                <Legend verticalAlign="top" height={36} />
                <XAxis dataKey="groupedBy" offset={0}>
                  <Label value="Time Frame" dy={20} position="insideBottom" />
                </XAxis>
                <YAxis
                  dy={-5}
                  label={{
                    value: 'Volume',
                    angle: -90,
                    position: 'insideLeft',
                  }}
                  tickFormatter={abbreviate}
                />
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
                  name="Return Rate Percentage"
                  stroke="#A344B7"
                  strokeWidth={3}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="targetSales"
                  name="Return Target"
                  stroke="#A21233"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="tableDetals">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Month</th>
                    <th
                      scope="col"
                      onClick={() => requestSort('sales')}
                      className={getClassNamesFor('sales')}
                    >
                      Sales
                    </th>
                    <th
                      scope="col"
                      onClick={() => requestSort('returns')}
                      className={getClassNamesFor('returns')}
                    >
                      Returns
                    </th>

                    <th
                      scope="col"
                      onClick={() => requestSort('targetSales')}
                      className={getClassNamesFor('targetSales')}
                    >
                      Return Target
                    </th>

                    <th
                      scope="col"
                      onClick={() => requestSort('actualReturns')}
                      className={getClassNamesFor('actualReturns')}
                    >
                      Return Rate Percentage
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.length == 0 ? (
                    <tr>
                      <td colSpan="5">No Data found</td>
                    </tr>
                  ) : (
                    items.map((analytic, index) => (
                      <tr key={index}>
                        <td scope="row">
                          <span className="stateLink">
                            {analytic.groupedBy}
                          </span>
                        </td>
                        <td>{analytic.sales.toLocaleString('en-IN')}</td>
                        <td>{analytic.returns.toLocaleString('en-IN')}</td>
                        <td>{analytic.targetSales.toLocaleString('en-IN')}</td>
                        <td>{analytic.actualReturns}%</td>
                      </tr>
                    ))
                  )}
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
