import React, { useEffect, useState } from 'react';
import '../../style.scss';
import { getAllOrganisationStats } from '../../../../actions/analyticsAction';
import { useDispatch } from 'react-redux';

const BreweryView = (props) => {
  const { states, prop } = props;

  const [analytics, setAnalytics] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const result = await dispatch(
        getAllOrganisationStats('?orgType=BREWERY'),
      );
      setAnalytics(result.data);
    })();
  }, []);
  const openBreweryDetailView = (param) => {
    props.onViewChange('SKU_VIEW', {
      ...param,
      ...{ type: 'b', analytics: analytics },
    });
  };
  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3">
        <h1 className="h2">Dashboard - Brewery</h1>
      </div>

      <div className="row">
        {analytics.map((analytic, index) => (
          <div
            key={index}
            className="col-lg-4 col-md-4 col-sm-12"
            onClick={() => openBreweryDetailView(analytic)}
          >
            <div className="breweryCard">
              <h4 className="breweryTitle">{analytic.name}</h4>
              <h6 className="brewerySubtitle">&nbsp;</h6>
              {/* <p className="breweryLocationText">
                {' '}
                <i className="fa fa-map-marker breweryLoc"></i>{' '}
                {analytic.postalAddress}
              </p> */}

              <span className="breweryPropertyText">
                Sales{' '}
                <span className="pull-right breweryPropertyValue">
                  {analytic.analytics.sales.toLocaleString('en-IN')}
                </span>
              </span>
              <div className="progress progress-line-warning">
                <div
                  className="progress-bar progress-bar-warning"
                  role="progressbar"
                  aria-valuenow="60"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{
                    width:
                      (analytic.analytics.sales /
                        (analytic.analytics.targetSales > 0
                          ? analytic.analytics.targetSales
                          : 1)) *
                        100 +
                      '%',
                  }}
                >
                  <span className="sr-only">
                    {(analytic.analytics.returns /
                      (analytic.analytics.targetSales > 0
                        ? analytic.analytics.targetSales
                        : 1)) *
                      100}
                    % Complete
                  </span>
                </div>
              </div>

              <span className="breweryPropertyText">
                Returns{' '}
                <span className="pull-right breweryPropertyValue">
                  {analytic.analytics.returns.toLocaleString('en-IN')}
                </span>
              </span>
              <div className="progress progress-line-danger">
                <div
                  className="progress-bar progress-bar-danger"
                  role="progressbar"
                  aria-valuenow="60"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{
                    width:
                      analytic.analytics.actualReturns +
                      '%',
                  }}
                >
                  <span className="sr-only">
                    {analytic.analytics.actualReturns}
                    % Complete
                  </span>
                </div>
              </div>
              <span className="breweryPropertyText">
                Return Rate{' '}
                <span className="pull-right breweryPropertyValue">
                  {analytic.analytics.actualReturns}
                  %
                </span>
              </span>
              <div className="progress progress-line-primary">
                <div
                  className="progress-bar progress-bar-primary"
                  role="progressbar"
                  aria-valuenow="60"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{
                    width:
                      analytic.analytics.actualReturns +
                      '%',
                  }}
                >
                  <span className="sr-only">
                    {analytic.analytics.actualReturns}
                    % Complete
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default BreweryView;
