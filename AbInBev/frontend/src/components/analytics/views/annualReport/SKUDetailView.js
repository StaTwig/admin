import React, { useState, useEffect, useMemo } from 'react';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
  ResponsiveContainer,
} from 'recharts';

import becks from '../../../../assets/images/becks.png';
import bottlesIcon from '../../../../assets/becks_330ml.png';
import {
  getAnalyticsAllStats,
  getAnalyticsByBrand,
  getOrgTypeStats,
} from '../../../../actions/analyticsAction';
import { useDispatch } from 'react-redux';
import abbreviate from 'number-abbreviate';

const SKUDetailView = (props) => {
  const { states, brandsIconArr, brandsArr, brands } = props;

  const [analytics, setAnalytics] = useState([]);
  const [subAnalytics, setSubAnalytics] = useState([]);
  const [prop, setProp] = useState(props.prop);
  const [isActive, setIsActive] = useState(false);
  const [name, setName] = useState(prop.name);
  const [arrIndex, setArrIndex] = useState(-1);
  const [dText, setDText] = useState('State');
  const [stateLabel, setStateLabel] = useState('');
  const [shortName, setShortname] = useState(prop.shortName);
  const [image, setImage] = useState(prop.image);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      let qry = '';
      let act = true;
      // if (props.sku) {
      //   let n = props.SKUStats.filter((a) => a.externalId == props.sku);
      //   setProp(n[0]);
      //   setName(n[0].name);
      //   setShortname(n[0].shortName);
      //   setImage(n[0].image);
      // }
      if (props.params) {
        if (props.params?.state) qry += '&state=' + props.params.state;
        if (props.params?.district) {
          act = true;
          setDText('District');
          qry += '&district=' + props.params.district;
        } else {
          if (!isActive) setDText('State');
          act = false;
        }
      }
      const result = await dispatch(
        getAnalyticsAllStats(
          '?sku=' +
            (props.sku ? props.sku : prop.externalId) +
            '&group_by=' +
            (act || isActive ? 'district' : 'state') +
            '&pid=' +
            prop.id +
            '&brand=' +
            prop.manufacturer +
            qry,
        ),
      );
      setAnalytics(result.data);
    })();
    requestSort('sales');
  }, [isActive, prop, props]);

  const getAnalyticsByType = async (district, i) => {
    setArrIndex(i);
    const result = await dispatch(
      getOrgTypeStats(
        '?sku=' +
          (props.sku ? props.sku : prop.externalId) +
          '&district=' +
          district,
      ),
    );
    setSubAnalytics(result.data);
  };

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
      setArrIndex(-1);
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
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3">
        <h1 className="h2">Dashboard - SKU Detail</h1>
      </div>

      {/* Single product detailed view for brand */}
      <div className="productDetailedView">
        <div className="row">
          <div className="col-lg-10 col-md-10 col-sm-12">
            <div className="productDetailCard">
              <div className="productGrid">
                <img
                  className="productImage"
                  src={
                    brandsIconArr[
                      brands.indexOf(prop.manufacturer.split(' ').join(''))
                    ]
                  }
                />
              </div>
              <div className="productcard">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="productSection mb-2">
                      <div className="profile">
                        <img
                          src={
                            brandsArr[
                              brands.indexOf(
                                prop.manufacturer.split(' ').join(''),
                              )
                            ]
                          }
                          alt=""
                          height="60"
                        />
                      </div>
                      <div className="info">
                        <div className="name">{name}</div>
                        <div className="caption">{shortName}</div>
                        <div className="caption">
                          {props.sku ? props.sku : prop.externalId}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <span className="productText">
                      Return Rate{' '}
                      <span className="breweryPropertyValue">
                        {!isNaN(prop.returnRate) ? prop.returnRate : 0}%
                      </span>
                    </span>
                    <div className="captionSubtitle">
                      Compared to (
                      {!isNaN(prop.returnRatePrev) ? prop.returnRatePrev : 0}%
                      last month)
                    </div>
                    <div className="progress progress-line-default">
                      <div
                        className="progress-bar progress-bar-default"
                        role="progressbar"
                        aria-valuenow="60"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{
                          width:
                            (!isNaN(prop.returnRate) ? prop.returnRate : 0) +
                            '%',
                        }}
                      >
                        <span className="sr-only">
                          {!isNaN(prop.returnRate) ? prop.returnRate : 0}%
                          Complete
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 col-sm-12">
            <div className="productsChart">
              {isActive && (
                <h2 className="stateTitle">{stateLabel} SKU Details</h2>
              )}

              <ResponsiveContainer
                width="100%"
                height={analytics.length <= 1 ? 300 : 1500}
              >
                <BarChart
                  width={500}
                  height={300}
                  data={analytics}
                  layout="vertical"
                  margin={{
                    top: 15,
                    right: 30,
                    left: 70,
                    bottom: 15,
                  }}
                  barSize={10}
                  barGap={1}
                >
                  <Legend verticalAlign="top" height={36} />
                  <XAxis offset={0} type="number" tickFormatter={abbreviate}>
                    <Label value="Volume" dy={10} position="insideBottom" />
                  </XAxis>
                  <YAxis
                    dataKey="groupedBy"
                    type="category"
                    scale="band"
                    offset={0}
                    tickLine={false}
                    dx={-8}
                    style={{ fontSize: '12px', fontWeight: '600' }}
                  >
                    <Label
                      value={dText}
                      dx={-15}
                      dy={-20}
                      offset={10}
                      position="top"
                      style={{
                        fontSize: '16px',
                        color: 'red',
                        fontWeight: '600',
                      }}
                    />
                  </YAxis>
                  <Tooltip />
                  <Legend />
                  <Bar
                    name="Sales"
                    dataKey="sales"
                    stackId="a"
                    fill="#FDAB0F"
                    radius={[0, 5, 5, 0]}
                  />
                  <Bar
                    name="Returns"
                    dataKey="returns"
                    fill="#A20134"
                    stackId="b"
                  />
                  <Bar
                    name="Target Returns"
                    dataKey="targetSales"
                    fill="#A344B7"
                    stackId="b"
                    radius={[0, 5, 5, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>

              <div className="tableDetals">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">{dText}</th>
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
                        Returned
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
                        <>
                          <tr key={index}>
                            <td scope="row">
                              <span
                                className="stateLink"
                                onClick={() => {
                                  if (isActive)
                                    getAnalyticsByType(
                                      analytic.groupedBy,
                                      index,
                                    );
                                  else {
                                    setIsActive(!isActive);
                                    setStateLabel(analytic.groupedBy);
                                    setDText('District');
                                  }
                                }}
                                // onClick={() => { setIsActive(!isActive); setDText('District'); }}
                              >
                                {analytic.groupedBy}
                              </span>
                            </td>
                            <td>{analytic.sales.toLocaleString('en-IN')}</td>
                            <td>{analytic.returns.toLocaleString('en-IN')}</td>
                            <td>
                              {analytic.targetSales.toLocaleString('en-IN')}
                            </td>
                            <td>
                              {!isNaN(analytic.actualReturns)
                                ? analytic.actualReturns
                                : 0}
                              %
                            </td>
                          </tr>
                          {arrIndex === index &&
                            subAnalytics?.map((sub, i) => (
                              <tr key={i}>
                                <td scope="row">{sub._id}</td>
                                <td scope="row">&nbsp;</td>
                                <td scope="row">
                                  {sub.returns.toLocaleString('en-IN')}
                                </td>
                                <td scope="row">&nbsp;</td>
                                <td scope="row">&nbsp;</td>
                              </tr>
                            ))}
                        </>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SKUDetailView;
