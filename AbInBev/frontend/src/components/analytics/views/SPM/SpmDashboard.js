import React, { useEffect, useState } from 'react';
import profile from '../../../../assets/user.png';
import { getSupplierPerformanceByOrgType } from '../../../../actions/analyticsAction';
import { useDispatch } from 'react-redux';
import './SpmDashBoard.scss'

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

  debugger

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3">
        <h1 className="h2">Dashboard - SPM</h1>
      </div>
      <div className="viewTargets">
        <button className="targetsBtn">View Targets & Rating</button>
      </div>
      <div className="tableDetals">
        <table className="table text-align-left" style={{ background: "unset" }}>
          <thead style={{ fontFamily: "open sans", fontWeight: "bold", borderBottom: "unset" }}>
            <tr>
              <th scope="col">Rank</th>
              <th scope="col">Supplier</th>
              <th scope="col">Location</th>
              <th scope="col" style={{ width: "17%" }}>Overall Rating</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody style={{ background: "#ffffff" }}>
            {supplierPerformances?.map((perf, index) => (
              <>
                <tr
                  key={index}
                  className={`${selectedRatingIndex === index
                    ? 'selectedRow noBottomRadius'
                    : ''
                    }`}
                  style={{ fontWeight: "bold", fontFamily: "open sans" }}
                >
                  <td scope="row" style={{ verticalAlign: "unset" }}>{index + 1}</td>
                  <td>
                    <div className="tableProfileIconCard justify-content-start" style={{ lineHeight: "1.5" }}>
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
                        {selectedRatingIndex === index && (
                          <div className="spmDetailsUserCard justify-content-start">
                            <div className="profileName">
                              <label>
                                <b>Vendor ID:</b> {perf.id}
                              </label>
                              <label>
                                <b>Mobile No:</b> {perf.phoneNumber}
                              </label>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td style={{ verticalAlign: "unset" }}>{perf.postalAddress}</td>
                  {/* <td>{perf.returnRate ? perf.returnRate : 0}</td> */}
                  <td style={{ verticalAlign: "unset" }}>{0}</td>
                  <td style={{ position: "relative", verticalAlign: "unset" }}>
                    {/* {selectedRatingIndex !== index ? ( */}
                    <div
                      className="round round-lg"
                      onClick={() => {
                        `${selectedRatingIndex !== index ? setSelectedRatingIndex(index) : setSelectedRatingIndex(null)}`
                      }}
                    >
                      <span className={`${selectedRatingIndex !== index ? `fa fa-angle-down marron` : `fa fa-angle-up marron`}`}></span>
                    </div>
                    {selectedRatingIndex === index && (
                      <div className="editTargetsContainer" style={{ position: "absolute" }}>
                        <button className="editTarBtn">Edit Targets</button>
                      </div>
                    )}


                    {/* ) : (
                      ''
                    )} */}
                  </td>
                </tr>
                {selectedRatingIndex === index ? (
                  <tr>
                    <td colSpan="5" className="selectedSupplier">

                      <div style={{ backgroundColor: "#ffffff", borderRadius: "15px" }}>
                        <table className="table text-align-left noTopRadius" style={{ background: "unset" }}>
                          <thead>
                            <tr style={{ fontFamily: "open sans", fontWeight: "bold", color: "#707070" }}>
                              <th scope="col">Criteria</th>
                              <th scope="col">Details</th>
                              <th scope="col">Weightage</th>
                              <th scope="col">Rating</th>
                            </tr>
                          </thead>
                          <tbody style={{ fontWeight: "bold", fontFamily: "open sans" }}>
                            <tr>
                              <td scope="row" style={{ color: "#A20134" }}>Return Rate</td>
                              <td>{perf.returnRate ? perf.returnRate : 0}%</td>
                              <td></td>
                              <td></td>
                            </tr>
                            <tr>
                              <td scope="row" style={{ color: "#A20134" }}>Lead Time</td>
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
                              <td scope="row" style={{ color: "#A20134" }}>
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
                              <td scope="row" style={{ color: "#A20134" }}>Dirty Bottles</td>
                              <td>{perf.dirtyBottles}%</td>
                              <td></td>
                              <td></td>
                            </tr>
                            <tr>
                              <td scope="row" style={{ color: "#A20134" }}>Breakage</td>
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
