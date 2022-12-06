import React, { useState, useEffect } from 'react';
import becks from '../../../../assets/images/becks.png';
import bottlesIcon from '../../../../assets/becks_330ml.png';
import { getAnalyticsByBrand } from '../../../../actions/analyticsAction';
import { useDispatch } from 'react-redux';

const SKUView = (props) => {
  const [analytics, setAnalytics] = useState(props.bstats);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //     (async () => {
  //     const result = await dispatch(getAnalyticsByBrand());
  //     setAnalytics(result.data);
  //     })();
  // }, []);
  useEffect(() => {
    if (props.sku) {
      //  let n = props.bstats.filter(a => a.products.filter(b => b.externalId == props.sku));
      //  setAnalytics(n);
    }
  }, [props]);
  const openDetailView = (sku) => {
    props.onViewChange(
      props.prop?.type == 'b' ? 'BREWERY_DETAIL_VIEW' : 'SKU_DETAIL_VIEW',
      { ...sku },
    );
  };

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3">
        <h1 className="h2">Dashboard - SKU</h1>
      </div>

      {analytics?.map((analytic, index) => (
        <div key={index}>
          <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-12">
              <div className="productGrid">
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
          </div>

          <div className="card-container-sku">
            {analytic.products.map((product, i) => (
              <div
                key={i}
                className="card cursor-pointer"
                onClick={() => openDetailView(product)}
              >
                <div className="author mb-2">
                  <div className="profile">
                    <img
                      src={
                        props.brandsArr[
                          props.brands.indexOf(analytic._id.split(' ').join(''))
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
                        (!isNaN(product.returnRate) ? product.returnRate : 0) +
                        '%',
                    }}
                  >
                    <span className="sr-only">
                      {!isNaN(product.returnRate) ? product.returnRate : 0}%
                      Complete
                    </span>
                  </div>
                </div>
                <div className="captionSubtitle">
                  Compared to ({product.returnRatePrev}% last month)
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SKUView;
