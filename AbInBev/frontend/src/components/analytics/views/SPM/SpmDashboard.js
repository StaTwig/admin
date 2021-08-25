import React, { useEffect, useState } from 'react';
import profile from '../../../../assets/user.png';
import { getSupplierPerformanceByOrgType } from '../../../../actions/analyticsAction';
import { useDispatch } from 'react-redux';

const SpmDashboard = (props) => {
  const [selectedRatingIndex, setSelectedRatingIndex] = useState(null);

  const [supplierPerformances, setSupplierPerformances] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const result = await dispatch(getSupplierPerformanceByOrgType());
      let _spm = result.data;
      if (_spm.length) {
        setSupplierPerformances(_spm);
      } else {
        setSupplierPerformances([]);
      }
    })();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3">
        <h1 className="h2">Dashboard - SPM</h1>
      </div>

      <div className="tableDetals">
        <table className="table text-align-left">
          <thead>
            <tr>
              <th scope="col">Rank</th>
              <th scope="col">Supplier</th>
              <th scope="col">Location</th>
              <th scope="col">Overall Rating</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {supplierPerformances?.map((perf, index) => (
              <>
                <tr
                  key={index}
                  className={`${
                    selectedRatingIndex === index
                      ? 'selectedRow noBottomRadius'
                      : ''
                  }`}
                >
                  <td scope="row">{index + 1}</td>
                  <td>
                    <div className="tableProfileIconCard justify-content-start">
                      <div className="profileIcon">
                        <img src={profile} alt="" />
                      </div>
                      <div className="profileName">
                        <span className="profileTitle">{perf.name}</span>
                        <label
                          className={`
                            ${perf.type === 'S1' ? 'boldGreen' : ''}
                            ${perf.type === 'S2' ? 'boldPurple' : ''}
                            ${perf.type === 'S3' ? 'boldblue' : ''}
                          `}
                        >
                          {perf.type}
                        </label>
                      </div>
                    </div>
                  </td>
                  <td>{perf.postalAddress}</td>
                  {/* <td>{perf.returnRate ? perf.returnRate : 0}</td> */}
                  <td>{0}</td>
                  <td>
                    {selectedRatingIndex !== index ? (
                      <div
                        className="round round-lg"
                        onClick={() => {
                          setSelectedRatingIndex(index);
                        }}
                      >
                        <span className="fa fa-angle-right marron"></span>
                      </div>
                    ) : (
                      ''
                    )}
                  </td>
                </tr>
                {selectedRatingIndex === index ? (
                  <tr>
                    <td colSpan="5" className="selectedSupplier">
                      <div>
                        <table className="table text-align-left noBottomRadius mb-0">
                          <tbody>
                            <tr>
                              <td scope="row"></td>
                              <td>
                                <div className="spmDetailsUserCard justify-content-start">
                                  <div className="profileIcon">
                                    <img src={profile} alt="" />
                                  </div>
                                  <div className="profileName">
                                    <span className="profileTitle">
                                      {perf.name}
                                    </span>
                                    <label
                                      className={`
                            ${perf.type === 'S1' ? 'boldGreen' : ''}
                            ${perf.type === 'S2' ? 'boldPurple' : ''}
                            ${perf.type === 'S3' ? 'boldblue' : ''}
                          `}
                                    >
                                      {perf.type}
                                    </label>
                                    <label>
                                      <b>Vendor ID:</b> {perf.id}
                                    </label>
                                    <label>
                                      <b>Mobile No:</b> {perf.phoneNumber}
                                    </label>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div className="spmAddress">
                                  <span className="addressTitle">
                                    Hyd, Telangana
                                  </span>
                                  <br />
                                  <address>{perf.postalAddress}</address>
                                </div>
                              </td>
                              <td></td>
                              <td>
                                <div
                                  className="round round-lg"
                                  onClick={() => {
                                    setSelectedRatingIndex(null);
                                  }}
                                >
                                  <span className="fa fa-angle-left marron"></span>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div>
                        <table className="table text-align-left noTopRadius">
                          <thead>
                            <tr>
                              <th scope="col">Criteria</th>
                              <th scope="col">Details</th>
                              <th scope="col">Weightage</th>
                              <th scope="col">Rating</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td scope="row">Return Rate</td>
                              <td>{perf.returnRate ? perf.returnRate : 0}%</td>
                              <td></td>
                              <td></td>
                            </tr>
                            <tr>
                              <td scope="row">Lead Time</td>
                              <td>
                                {perf.leadTime?.length
                                  ? perf.leadTime[0]?.avgLeadTime > 60
                                    ? Math.round(
                                        perf.leadTime[0]?.avgLeadTime / 60,
                                      ) +
                                      ' H ' +
                                      Math.round(
                                        perf.leadTime[0]?.avgLeadTime % 60,
                                      ) +
                                      ' M'
                                    : Math.round(
                                        perf.leadTime[0]?.avgLeadTime,
                                      ) + ' M'
                                  : 0}
                              </td>
                              <td></td>
                              <td></td>
                            </tr>
                            <tr>
                              <td scope="row">
                                Storage Capacity
                                <br />
                                <span className="subTitle">Sqft</span>
                              </td>
                              <td>
                                {perf.storageCapacity.bottleCapacity}
                                <br />
                                <span className="subTitle">
                                  {perf.storageCapacity.sqft}
                                </span>
                              </td>
                              <td></td>
                              <td></td>
                            </tr>
                            <tr>
                              <td scope="row">Dirty Bottles</td>
                              <td>{perf.dirtyBottles}%</td>
                              <td></td>
                              <td></td>
                            </tr>
                            <tr>
                              <td scope="row">Breakage</td>
                              <td>{perf.breakage}%</td>
                              <td></td>
                              <td></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                ) : (
                  ''
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
      {/* 
      <h1>SPM detialed view</h1>
       */}
    </div>
  );
};

export default SpmDashboard;
