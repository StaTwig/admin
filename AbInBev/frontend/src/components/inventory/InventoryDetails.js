import React, { useState, useEffect } from 'react';
import profile from '../../assets/user.png';
import Chart from 'react-apexcharts';
import { getAllOrganisationStats } from '../../actions/analyticsAction';
import { useDispatch } from 'react-redux';
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
const InventoryDetailsView = (props) => {
  const { prop, brandsIconArr, brandsArr, brands } = props;

  const [SupplierChartData, setSupplierChartData] = useState([
    { name: 'S1', value: 0 },
    { name: 'S2', value: 0 },
    { name: 'S3', value: 0 },
  ]);
  const [name, setName] = useState(prop.name);
  const [shortName, setShortname] = useState(prop.shortName);
  const [image, setImage] = useState(prop.image);
  const dispatch = useDispatch();
  const [analytics, setAnalytics] = useState([]);

  const COLORS = ['#F9A500', '#8A2BE2', '#298B8B'];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  useEffect(() => {
    (async () => {
      if (props.sku) {
        let n = props.SKUStats.filter((a) => a.externalId == props.sku);
        setName(n[0].name);
        setShortname(n[0].shortName);
        setImage(n[0].image);
      }
      let cond = '';
      if (props.params) {
        if (props.params.state) cond = '&state=' + props.params.state;
        if (props.params.district) cond += '&district=' + props.params.district;
      }

      let result = await dispatch(
        getAllOrganisationStats(
          '?orgType=' +
            (props?.Otype ? props.Otype : 'ALL_VENDORS') +
            '&sku=' +
            (props.sku ? props.sku : prop.externalId) +
            '&pid=' +
            prop.id +
            '&brand=' +
            prop.manufacturer +
            cond,
        ),
      );

      let n = result.data.filter(
        (a) => a.type == 'S1' || a.type == 'S2' || a.type == 'S3',
      );
      result.data = n;
      if (props.Otype) {
        if (props.Otype != 'ALL_VENDORS') {
          n = result.data.filter((a) => a.type == props.Otype);
          result.data = n;
        }
      }
      setAnalytics(result.data);
      let s1;
      let s2;
      let s3;
      let s1Length, s2Length, s3Length;
      s1Length = result.data.filter((a) => a?.type == 'S1').length;
      s2Length = result.data.filter((a) => a?.type == 'S2').length;
      s3Length = result.data.filter((a) => a?.type == 'S3').length;

      s1 = result.data.filter((a) => a?.type == 'S1');
      let s1ActualTotal = s1.reduce(function (prev, cur) {
        return prev + cur.analytics.actualReturns;
      }, 0);

      s2 = result.data.filter((a) => a?.type == 'S2');
      let s2ActualTotal = s2.reduce(function (prev, cur) {
        return prev + cur.analytics.actualReturns;
      }, 0);

      s3 = result.data.filter((a) => a?.type == 'S3');
      let s3ActualTotal = s3.reduce(function (prev, cur) {
        return prev + cur.analytics.actualReturns;
      }, 0);

      let s1Data = s1ActualTotal / s1Length;
      let s2Data = s2ActualTotal / s2Length;
      let s3Data = s3ActualTotal / s3Length;

      setSupplierChartData([
        { name: 'S1', value: s1Data },
        { name: 'S2', value: s2Data },
        { name: 'S3', value: s3Data },
      ]);
    })();
  }, []);
  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3">
        <h1 className="h2">Dashboard - Supplier</h1>
      </div>

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
          <div className="col-lg-4 col-md-4 col-sm-12">
            <div id="chart"></div>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart width={300} height={300}>
                <Pie
                  data={SupplierChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {SupplierChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="col-lg-8 col-md-8 col-sm-12">
            <div className="tableDetals">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Vendor</th>
                    <th scope="col">State</th>
                    <th scope="col">District</th>
                    <th scope="col">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {analytics.length == 0 ? (
                    <tr>
                      <td colSpan="3">No Data found</td>
                    </tr>
                  ) : (
                    analytics.map((analytic, index) => (
                      <tr key={index}>
                        <td scope="row">
                          <div className="supplierImage justify-content-start">
                            <img src={profile} className="displayImage" />
                            <div className="supplierNames justify-content-start">
                              <span>{analytic.name}</span>
                              <br />
                              <span
                                className={`group ${analytic?.type?.toLowerCase()}group`}
                              >
                                {analytic.type} Vendor
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>Karnataka</td>
                        <td>District</td>
                        <td>
                          {!isNaN(analytic.analytics.actualReturns)
                            ? analytic.analytics.actualReturns
                            : 0}
                          %
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryDetailsView;
