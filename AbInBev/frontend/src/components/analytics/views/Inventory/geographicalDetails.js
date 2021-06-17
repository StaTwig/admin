import React, { useState, useEffect } from 'react';
import becks from '../../../../assets/images/becks.png';
import bottlesIcon from '../../../../assets/becks_330ml.png';
import {
  BarChart,
  AreaChart,
  Area,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { getAnalyticsAllStats } from '../../../../actions/analyticsAction';
import { useDispatch } from 'react-redux';

const iGraphicalDetailedView = (props) => {
  const [analytics, setAnalytics] = useState([]);
  const [old, setOld] = useState([]);
  const { states, prop } = props;
  const [data, setData] = useState([
    {
      name: 'Total Sales',
      count: 0,
    },
    {
      name: 'Total Bottle Pool',
      count: 0,
    },
  ]);
  const [active, setActive] = useState(false);
  const [isActive, setIsActive] = useState(false);
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
      const result = await dispatch(
        getAnalyticsAllStats(
          '?sku=' +
            (props.sku ? props.sku : prop.externalId) +
            '&group_by=state',
        ),
      );
      setAnalytics(result.data);
      setOld(result.data);
    })();
  }, []);

  const openDetailView = async (sku) => {
    if (active) {
      const result = await dispatch(
        getAnalyticsAllStats(
          '?sku=' +
            (props.sku ? props.sku : prop.externalId) +
            '&group_by=district&state=' +
            sku,
        ),
      );
      setIsActive(true);
      setAnalytics(result.data);
      setOld(result.data);
    } else {
      let n = old.filter((a) => a.groupedBy == sku);
      setAnalytics(n);
      setData([
        {
          name: 'Total Sales',
          count: n[0].sales,
        },
        {
          name: 'Total Bottle Pool',
          count: n[0].returns,
        },
      ]);
    }
    setActive(!active);
    // props.onViewChange('SKU_DETAIL_VIEW', { sku: sku });
  };

  return (
    <div className="productDetailedView">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3">
        <h1 className="h2">Inventory Details</h1>
      </div>
      <div className="row">
        <div className="col-lg-10 col-md-10 col-sm-12">
          <div className="productDetailCard">
            <div className="productGrid">
              <img
                className="productImage"
                src={
                  props.brandsIconArr[
                    props.brands.indexOf(prop.manufacturer.split(' ').join(''))
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
                          props.brandsArr[
                            props.brands.indexOf(
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
                          (!isNaN(prop.returnRate) ? prop.returnRate : 0) + '%',
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
          {!active ? (
            <div className="productsChart">
              <label className="productsChartTitle">
                {isActive ? 'District' : 'State'}
              </label>
              <ResponsiveContainer width="100%" height={500}>
                <BarChart
                  width={500}
                  height={300}
                  data={analytics}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                  barSize={10}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar name="Sales" dataKey="sales" fill="#A344B7" />
                  <Bar
                    name="Total Bottle Pool"
                    dataKey="returns"
                    fill="#FDAB0F"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="stateandDistrictCard mb-4">
              <h2>{analytics[0].groupedBy}</h2>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart
                  width={200}
                  height={150}
                  barCategoryGap={1}
                  data={data}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                  barSize={50}
                  barGap={1}
                >
                  <XAxis dataKey="name" scale="band" />
                  <YAxis type="number" />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="count"
                    barCategoryGap={80}
                    radius={[5, 5, 0, 0]}
                    fill="#54265E"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
          <div className="tableDetals">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">{isActive ? 'District' : 'State'}</th>
                  <th scope="col">Sales</th>
                  <th scope="col">Total Bottle Pool</th>
                </tr>
              </thead>
              <tbody>
                {analytics.map((analytic, index) => (
                  <tr
                    key={index}
                    onClick={() => {
                      setIsActive((i) => !i);
                      openDetailView(analytic.groupedBy);
                    }}
                  >
                    <td scope="row">
                      <span className="stateLink">{analytic.groupedBy}</span>
                    </td>
                    <td>{analytic.sales.toLocaleString('en-IN')}</td>
                    <td>{analytic.returns.toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default iGraphicalDetailedView;
