import React, { useState, useEffect } from 'react';

const iSKUView = (props) => {
  const [visible, setVisible] = useState(false);
  const [analytics, setAnalytics] = useState(props.bstats);

  const [old, setOld] = useState(props.bstats);
  const [show, setShow] = useState(false);
  const openDetailView = (sku) => {
    props.onViewChange('INVENTORY_SKU_DETAILS', { ...sku });
  };

  const toggleBrand = (brand) => {
    setVisible(true);
    setAnalytics(old.filter((a) => a._id == brand));
    setShow(true);
  };

  const goBack = () => {
    setAnalytics(old);
    setVisible(false);
    setShow(false);
  };

  return (
    <div className="inventoryDashboard">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3">
        <h1 className="h2">Inventory SKU</h1>
      </div>

      <div className="row">
        {show && <span onClick={goBack}>Back</span>}
        {analytics.map((analytic, index) => {
          return (
            <>
              <div key={index} className="col-lg-3 col-md-3 col-sm-12">
                <div
                  className="productGrid"
                  onClick={() => toggleBrand(analytic._id)}
                >
                  <img
                    className="productImage"
                    src={
                      props.brandsIconArr[
                        props.brands.indexOf(analytic._id.split(' ').join(''))
                      ]
                    }
                  />
                </div>
              </div>

              {visible && (
                <div className="card-container">
                  {analytic.products.map((product, i) => (
                    <div
                      key={i}
                      className="card"
                      onClick={() => openDetailView(product)}
                    >
                      <div className="author mb-2">
                        <div className="profile">
                          <img
                            src={
                              props.brandsArr[
                                props.brands.indexOf(
                                  product.manufacturer.split(' ').join(''),
                                )
                              ]
                            }
                            alt=""
                            height="60"
                          />
                        </div>
                        <div className="info">
                          <div className="name">{product.name}</div>
                          <div className="caption">{product.shortName}</div>
                          <div className="caption">{product.externalId}</div>
                        </div>
                      </div>
                      <span className="breweryPropertyText">
                        Return Rate{' '}
                        <span className="pull-right breweryPropertyValue">
                          {!isNaN(product.returnRate) ? product.returnRate : 0}%
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
                              (!isNaN(product.returnRate)
                                ? product.returnRate
                                : 0) + '%',
                          }}
                        >
                          <span className="sr-only">
                            {!isNaN(product.returnRate)
                              ? product.returnRate
                              : 0}
                            % Complete
                          </span>
                        </div>
                      </div>
                      <div className="captionSubtitle">
                        Compared to (
                        {!isNaN(product.returnRatePrev)
                          ? product.returnRatePrev
                          : 0}
                        % last month)
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default iSKUView;
