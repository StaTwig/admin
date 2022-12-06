import React, { useState, useEffect } from 'react';
import '../../style.scss';
import becks from '../../../../assets/images/becks.png';
import bottlesIcon from '../../../../assets/becks_330ml.png';
import profile from '../../../../assets/user.png';
import { useDispatch } from 'react-redux';
import { getAllOrganisationStats } from '../../../../actions/analyticsAction';

const BreweryDetailedView = (props) => {
  const { states, prop, brandsIconArr, brands, brandsArr } = props;
  const [name, setName] = useState(prop.name);
  const [shortName, setShortname] = useState(prop.shortName);
  const [image, setImage] = useState(prop.image);
  // const [analytics, setAnalytics] = useState(props.prop.analytics);
  const [analytics, setAnalytics] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      let qp = '';
      const p = props.params;
      if (p.state) qp += '&state=' + p.state;
      if (p.district) qp += '&district=' + p.district;
      let cond =
        '?orgType=' +
        (props?.Otype ? props.Otype : 'ALL_VENDORS') +
        '&sku=' +
        (props?.sku ? props.sku : prop.externalId) +
        '&pid=' +
        prop.id +
        '&brand=' +
        prop.manufacturer +
        qp;
      const result = await dispatch(getAllOrganisationStats(cond));
      let n = result.data.filter((a) => a.type == 'S1');
      for (let org of n) {
        let cc = result.data.filter(
          (a) => a.authority == org.id && (a.type == 'S2' || a.type == 'S3'),
        );
        for (const c of cc) {
          org.analytics.sales += parseInt(c.analytics.sales);
          org.analytics.returns += parseInt(c.analytics.returns);
        }
      }
      setAnalytics(n);
    })();
  }, []);
  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3">
        <h1 className="h2">Dashboard - Brewery Details</h1>
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
          <div className="col-lg-12 col-md-12">
            <div className="tableDetals">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Vendor</th>
                    <th scope="col">State</th>
                    <th scope="col">Sales</th>
                    <th scope="col">Returns</th>
                  </tr>
                </thead>
                <tbody>
                  {analytics.length == 0 ? (
                    <tr>
                      <td colSpan="4">No Data found</td>
                    </tr>
                  ) : (
                    analytics.map((analytic, index) => (
                      <tr key={index}>
                        <td scope="row">
                          <div className="displayImageName justify-content-start">
                            <img src={profile} className="displayImage" />
                            {analytic.name}
                          </div>
                        </td>
                        <td>Karnataka</td>
                        <td>
                          {analytic.analytics.sales.toLocaleString('en-IN')}
                        </td>
                        <td>
                          {analytic.analytics.returns.toLocaleString('en-IN')}
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
export default BreweryDetailedView;
