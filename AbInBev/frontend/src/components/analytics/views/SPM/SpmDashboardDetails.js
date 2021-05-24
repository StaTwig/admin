import React, { useState } from 'react';
import profile from '../../../../assets/user.png';
import StarRatings from 'react-star-ratings';

const SpmDashboardDetails = (props) => {
  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3">
        <h1 className="h2">Dashboard - SPM Details</h1>
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
      <div className="tableDetals spmDetail">
        <table className="table text-align-left">
          <tbody>
            <tr>
              <td scope="row">1</td>
              <td>
                <div className="spmDetailsUserCard justify-content-start">
                  <div className="profileIcon">
                    <img src={profile} alt="" />
                  </div>
                  <div className="profileName">
                    <span className="profileTitle">Supplier Name</span>
                    <label className="badge-purple">S1 Supplier</label>
                    <label>
                      <b>Vendor ID:</b> 123456789
                    </label>
                    <label>
                      <b>Mobile No:</b> 1234567890
                    </label>
                  </div>
                </div>
              </td>
              <td>
                <div className="spmAddress">
                  <span className="addressTitle">Hyd, Telangana</span>
                  <br />
                  <address>
                    NH65, Engineers Colony, <br />
                    Jahangir Nagar Colony, Chintalakunta, <br />
                    Hyderabad, Telangana 500070
                  </address>
                </div>
              </td>
              <td>
                <StarRatings
                  rating={5}
                  name="small-rating"
                  caption="Small!"
                  size={5}
                  starRatedColor="#ffcc00"
                  numberOfStars={5}
                  name="rating"
                  starDimension="25px"
                  starSpacing="5px"
                />
              </td>
              <td>
                <div className="round round-lg">
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
              <th scope="col">Weightage</th>
              <th scope="col">test</th>
              <th scope="col">Test</th>
              <th scope="col">Rating</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td scope="row">Return Rate</td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <StarRatings
                  rating={1}
                  name="small-rating"
                  caption="Small!"
                  size={5}
                  starRatedColor="#ffcc00"
                  numberOfStars={5}
                  name="rating"
                  starDimension="25px"
                  starSpacing="5px"
                />
              </td>
            </tr>
            <tr>
              <td scope="row">Return Rate</td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <StarRatings
                  rating={5}
                  name="small-rating"
                  caption="Small!"
                  size={5}
                  starRatedColor="#ffcc00"
                  numberOfStars={5}
                  name="rating"
                  starDimension="25px"
                  starSpacing="5px"
                />
              </td>
            </tr>
            <tr>
              <td scope="row">Return Rate</td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <StarRatings
                  rating={3}
                  name="small-rating"
                  caption="Small!"
                  size={5}
                  starRatedColor="#ffcc00"
                  numberOfStars={5}
                  name="rating"
                  starDimension="25px"
                  starSpacing="5px"
                />
              </td>
            </tr>
            <tr>
              <td scope="row">Return Rate</td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <StarRatings
                  rating={4}
                  name="small-rating"
                  caption="Small!"
                  size={5}
                  starRatedColor="#ffcc00"
                  numberOfStars={5}
                  name="rating"
                  starDimension="25px"
                  starSpacing="5px"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SpmDashboardDetails;
