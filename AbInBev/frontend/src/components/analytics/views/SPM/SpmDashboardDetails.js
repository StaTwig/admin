import React from 'react';
import profile from '../../../../assets/user.png';
import StarRatings from 'react-star-ratings';

const SpmDashboardDetails = (props) => {

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3">
        <h1 className="h2">Dashboard - SPM Details</h1>
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
