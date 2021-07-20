import React, { useState, useEffect } from 'react';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';

import '../../style.scss';
import bottlesIcon from '../../../../assets/becks_330ml.png';
import DownArrow from '../../../../assets/down_arrow.png';
import {
  getAnalyticsAllStats,
  getAnalyticsByBrand,
} from '../../../../actions/analyticsAction';
import { useDispatch } from 'react-redux';

const GeographicalView = (props) => {
  const { states, SKUStats, sku, viewName, brands, brandsArr, Otype } = props;

  const [analytics, setAnalytics] = useState([]);
  const dispatch = useDispatch();
  // const dispatch = useDispatch();
  // useEffect(() => {
  //     (async () => {
  //     // const result = await dispatch(getAnalyticsAllStats('?group_by=state'));
  //     const result = await dispatch(getAnalyticsByBrand());
  //     setAnalytics(result.data);
  //     })();
  // }, []);

  useEffect(() => {
    if (
      sku ||
      props.params?.district ||
      props.params?.state ||
      props.params?.year
    ) {
      if (
        (props.params?.district && props.params?.state) ||
        props.params?.year
      ) {
        let cond = '';
        if (props.params?.district)
          cond += '?district=' + props.params?.district;

        if (props.params?.year) {
          if (cond) cond += '&';
          else cond += '?';
          cond +=
            'date_filter_type=' +
            (props.params?.date_filter_type
              ? props.params?.date_filter_type
              : 'by_yearly') +
            '&year=' +
            props.params?.year +
            '&month=' +
            props.params?.month +
            '&quarter=' +
            props.params?.quarter;
        }

        if (sku) {
          if (cond) cond += '&';
          else cond += '?';
          cond += '&sku=' + sku;
        }
        if (Otype) {
          if (cond) cond += '&';
          else cond += '?';
          cond += '&orgType=' + Otype;
        }
        if (cond) {
          (async () => {
            const s_result = await dispatch(getAnalyticsByBrand(cond));
            let n = [];
            for (let a of s_result.data) {
              for (let product of a.products) {
                n.push(product);
              }
            }
            setAnalytics(n);
          })();
        } else setAnalytics(SKUStats);
      } else {
        let n = SKUStats.filter((a) => a.externalId == sku);
        if (sku == '') setAnalytics(SKUStats);
        else setAnalytics(n);
      }
    } else setAnalytics(SKUStats);
  }, [sku, viewName, props]);

  const showDetailedGeoView = (param) => {
    console.log('params', param);
    props.onViewChange('DETAILED_GEO_VIEW', param);
  };
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3">
        <h1 className="h2">Analytics</h1>
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
            {analytics.length == 0 ? (
              <tr>
                <td colSpan="5">No Data found</td>
              </tr>
            ) : (
              analytics?.map((analytic, index) => (
                <tr key={index}>
                  <td scope="row">
                    <div className="tableProfileIconCard justify-content-start">
                      <div className="profileIcon">
                        <img
                          src={
                            brandsArr[
                              brands.indexOf(
                                analytic.manufacturer?.split(' ').join(''),
                              )
                            ]
                          }
                          alt=""
                          width="50"
                          height="50"
                        />
                      </div>
                      <div className="profileName">
                        <span
                          className="profileTitle"
                          onClick={() => showDetailedGeoView(analytic)}
                        >
                          {analytic.manufacturer + ' - ' + analytic.name}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>{analytic.sales.toLocaleString('en-IN')}</td>
                  <td>
                    {analytic.returns
                      ? analytic.returns.toLocaleString('en-IN')
                      : 0}
                  </td>
                  <td>{analytic.targetSales.toLocaleString('en-IN')}</td>
                  <td>
                    {!isNaN(analytic.returnRate) ? analytic.returnRate : 0}%
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default GeographicalView;
