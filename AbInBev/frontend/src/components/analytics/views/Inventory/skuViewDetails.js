import React, { useState, useEffect } from 'react';
import becks from '../../../../assets/images/becks.png';
import bottlesIcon from '../../../../assets/becks_330ml.png';
import { getAnalyticsByBrand } from '../../../../actions/analyticsAction';
import { useDispatch } from 'react-redux';
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

const iSKUViewDetails = (props) => {
  const { prop } = props;
  const [analytics, setAnalytics] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();
  const [name, setName] = useState(prop.name);
  const [shortName, setShortname] = useState(prop.shortName);
  const [image, setImage] = useState(prop.image);
  let skuArr = [];

  useEffect(() => {
    (async () => {
      let cond = '';
      if (props.params) {
        if (props.params.state) cond = '&state=' + props.params.state;
        if (props.params.district) {
          setIsActive(true);
          cond += '&district=' + props.params.district;
        }
      }
      if (props.sku) {
        let n = props.SKUStats.filter((a) => a.externalId == props.sku);
        setName(n[0].name);
        setShortname(n[0].shortName);
        setImage(n[0].image);
      }
      const result = await dispatch(
        getAnalyticsAllStats(
          '?group_by=state&inventory=true' +
            (props.sku ? '&sku=' + props.sku : '') +
            '&brand=' +
            prop.manufacturer +
            '&pid=' +
            prop.id +
            cond,
        ),
      );
      setAnalytics(result.data);
    })();
  }, []);

  const openDetailView = (sku) => {
    props.onViewChange('SKU_DETAIL_VIEW', { sku: sku });
  };

  const changeSku = async (event) => {
    let cond = '';
    if (props.params) {
      if (props.params.state) cond = '&state=' + props.params.state;
      if (props.params.district) cond += '&district=' + props.params.district;
    }
    let sku = event.target.value;
    const result = await dispatch(
      getAnalyticsAllStats(
        '?group_by=state&inventory=true' +
          '&brand=' +
          prop.manufacturer +
          (sku ? '&sku=' + sku : '') +
          '&pid=' +
          prop.id +
          cond,
      ),
    );
    setAnalytics(result.data);
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3">
        <h1 className="h2">SKU View - Inventory</h1>
      </div>
      <div className="productDetailedView">
        <div className="row">
          <div className="col-md-6 col-lg-6 col-sm-12">
            <div className="productsChart">
              <label className="productsChartTitle">Overall Sales</label>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart
                  width={500}
                  height={400}
                  data={analytics}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <XAxis dataKey="groupBy" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    stroke="#8884d8"
                    strokeWidth={2}
                    fill="#8884d8"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="col-md-6 col-lg-6 col-sm-12">
            <div className="productsChart">
              <label className="productsChartTitle">Overall Inventory</label>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart
                  width={500}
                  height={400}
                  data={analytics}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <XAxis dataKey="groupBy" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="inventory"
                    stroke="#FAAB10"
                    strokeWidth={2}
                    fill="#FAAB10"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

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
                {analytics.length == 0 ? (
                  <tr>
                    <td colSpan="3">No Data found</td>
                  </tr>
                ) : (
                  analytics.map((analytic, index) => (
                    <tr key={index}>
                      <td scope="row">
                        <span className="stateLink">{analytic.groupedBy}</span>
                      </td>
                      <td>{analytic.sales.toLocaleString('en-IN')}</td>
                      <td>{analytic.inventory.toLocaleString('en-IN')}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default iSKUViewDetails;
