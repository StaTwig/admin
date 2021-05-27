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
        <div className="btn-toolbar mb-2 mb-md-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            className="bi bi-bell"
            viewBox="0 0 16 16"
          >
            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
          </svg>
        </div>
      </div>
      <div className="btn-group mainButtonFilter">
        <a href="#!" className="btn active">
          Suppliers
        </a>
        <select className="btn selectState">
          <option>Select Suppliers</option>
          <option>Overall Performance</option>
          {/* {states?.map((state) => 
                        <option>{state}</option>
                    )
                    } */}
        </select>
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
            {
              supplierPerformances?.map(((perf, index) =>
                <>
                  <tr>
                    <td scope="row">{index + 1}</td>
                    <td>
                      <div className="tableProfileIconCard justify-content-start">
                        <div className="profileIcon">
                          <img src={profile} alt="" />
                        </div>
                        <div className="profileName">
                          <span className="profileTitle">{perf.name}</span>
                          <label className="badge-purple">{perf.type}</label>
                        </div>
                      </div>
                    </td>
                    <td>{perf.postalAddress}</td>
                    <td>
                      {perf.returnRate ? perf.returnRate : 0}

                    </td>
                    <td>
                      {
                        selectedRatingIndex !== index ?
                          <div className="round round-lg" onClick={() => {
                            setSelectedRatingIndex(index);
                          }}>
                            <span className="fa fa-angle-right marron"></span>
                          </div>
                          : ""
                      }

                    </td>
                  </tr>
                  {
                    selectedRatingIndex === index ?
                      <tr className="selectedSupplier">
                        <td colSpan="5">
                          <div className="tableDetals spmDetail">
                            <table className="table text-align-left">
                              <tbody>
                                <tr>
                                  <td scope="row"></td>
                                  <td>
                                    <div className="spmDetailsUserCard justify-content-start">
                                      <div className="profileIcon">
                                        <img src={profile} alt="" />
                                      </div>
                                      <div className="profileName">
                                        <span className="profileTitle">{perf.name}</span>
                                        <label className="badge-purple">{perf.type}</label>
                                        <label>
                                          <b>Vendor ID:</b> {perf.id}
                                        </label>
                                        <label>
                                          <b>Mobile No:</b> {perf.primaryContactId}
                                        </label>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="spmAddress">
                                      <span className="addressTitle">Hyd, Telangana</span>
                                      <br />
                                      <address>
                                        {perf.postalAddress}
                                      </address>
                                    </div>
                                  </td>
                                  <td>
                                    {perf.returnRate ? perf.returnRate : 0}
                                  </td>
                                  <td>
                                    <div className="round round-lg" onClick={() => {
                                      setSelectedRatingIndex(null);
                                    }}>
                                      <span className="fa fa-angle-left marron"></span>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>

                          <div className="tableDetals mb-4">
                            <table className="table text-align-left">
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
                                  <td></td>
                                  <td></td>
                                  <td>
                                    {perf.returnRate ? perf.returnRate : 0}
                                  </td>
                                </tr>
                                <tr>
                                  <td scope="row">Lead Time</td>
                                  <td></td>
                                  <td></td>
                                  <td>
                                    {perf.leadTime && perf.leadTime[0] && perf.leadTime[0].avgLeadTime ? perf.leadTime[0].avgLeadTime : 0}
                                  </td>
                                </tr>
                                <tr>
                                  <td scope="row">Storage Capacity</td>
                                  <td></td>
                                  <td></td>
                                  <td>
                                    {perf.storageCapacity.bottleCapacity}<br />
                                    {perf.storageCapacity.sqft}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                      : ""
                  }
                </>
              ))
            }
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
