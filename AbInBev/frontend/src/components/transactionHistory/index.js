import React from "react";
import "./style.css";
import inTransitIcon from "../../assets/intransit.png";
import attachIcon from "../../assets/attach.png";
import receivedIcon from "../../assets/received.png";
import sentIcon from "../../assets/sent.png";
import filterIcon from "../../assets/filters.png";
import SideBar from "../../components/sidebar";

const TransactionHistory = (props) => {
  return (
    <section class="container-fluid " style={{ padding: "0px" }}>
      <div class="grid component1-transaction">
        <SideBar {...props} />
        <section class="grid gdash-main">
          <div class="grid">
            <svg
              style={{ justifySelf: "end" }}
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              fill="currentColor"
              class="bi bi-bell"
              viewBox="0 0 16 16"
            >
              <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
            </svg>
          </div>
          <div class="grid">
            <h2
              style={{
                fontWeight: "bold",
                marginBottom: "59px",
                fontSize: "41px",
              }}
            >
              Transaction History
            </h2>
          </div>

          <div class="grid">
            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link active"
                  id="pills-home-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-home"
                  type="button"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                >
                  All
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="pills-profile-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-profile"
                  type="button"
                  role="tab"
                  aria-controls="pills-profile"
                  aria-selected="false"
                >
                  Send
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="pills-Received-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-Received"
                  type="button"
                  role="tab"
                  aria-controls="pills-Received"
                  aria-selected="false"
                >
                  Received
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="pills-In-Transit-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-In-Transit"
                  type="button"
                  role="tab"
                  aria-controls="pills-In-Transit"
                  aria-selected="false"
                >
                  In-Transit
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="pills-Added-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-Added"
                  type="button"
                  role="tab"
                  aria-controls="pills-Added"
                  aria-selected="false"
                >
                  Added
                </button>
              </li>
            </ul>
          </div>

          <div class="tab-content" id="pills-tabContent">
            <div
              class="tab-pane fade show active"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
            >
              <table class="table">
                <tbody>
                  <tr>
                    <th class="notification-thumbnail noti-yellow" scope="row">
                      <img
                        src={inTransitIcon}
                        class="notification-thumbnail-img"
                        alt=""
                      />
                    </th>
                    <td>
                      <b class="notification-title">R.R.G Wines</b>
                      <br />
                      <p class="notification-title-sub">02/12/2019, 02:12PM</p>
                    </td>
                    <td>
                      <p class="notification-title-sub">Nampally, Hyderabad</p>
                    </td>
                    <td>
                      <p class="notification-title-sub">
                        <span class="dot bg-yellow"></span>InTransit
                      </p>
                    </td>
                    <td>
                      <p class="notification-title-sub">
                        <img
                          src={attachIcon}
                          class="notification-thumbnail-attach"
                          alt=""
                        />
                        123456.jpg
                      </p>
                    </td>
                    <td>
                      <p class="notification-title-sub">
                        <b>9548</b>
                      </p>
                      <br />
                    </td>
                  </tr>

                  <tr>
                    <th class="notification-thumbnail noti-green" scope="row">
                      <img
                        src={receivedIcon}
                        class="notification-thumbnail-img"
                        alt=""
                      />
                    </th>
                    <td>
                      <b class="notification-title">
                        Suvarna Durga Bottles Pvt. Ltd.
                      </b>
                      <br />
                      <p class="notification-title-sub">02/12/2019, 02:12PM</p>
                    </td>
                    <td>
                      <p class="notification-title-sub">
                        Chintalakunta, Hyderabad
                      </p>
                    </td>
                    <td>
                      <p class="notification-title-sub">
                        <span class="dot bg-green"></span>Received
                      </p>
                    </td>
                    <td>
                      <p class="notification-title-sub">
                        <img
                          src={attachIcon}
                          class="notification-thumbnail-attach"
                          alt=""
                        />
                        123456.jpg
                      </p>
                    </td>
                    <td>
                      <p class="notification-title-sub">
                        <b>9548</b>
                      </p>
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>
                      <br />
                      <p class="notification-date">December 30, 2019</p>
                    </td>
                  </tr>

                  <tr>
                    <th class="notification-thumbnail noti-red" scope="row">
                      <img
                        src={sentIcon}
                        class="notification-thumbnail-img"
                        alt=""
                      />
                    </th>
                    <td>
                      <b class="notification-title">
                        Balaji Enterprises Pvt. Ltd.
                      </b>
                      <br />
                      <p class="notification-title-sub">02/12/2019, 02:12PM</p>
                    </td>
                    <td>
                      <p class="notification-title-sub">Nampally, Hyderabad</p>
                    </td>
                    <td>
                      <p class="notification-title-sub">
                        <span class="dot bg-red"></span>Sent
                      </p>
                    </td>
                    <td>
                      <p class="notification-title-sub">
                        <img
                          src={attachIcon}
                          class="notification-thumbnail-attach"
                          alt=""
                        />
                        123456.jpg
                      </p>
                    </td>
                    <td>
                      <p class="notification-title-sub">
                        <b>9548</b>
                      </p>
                      <br />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div
              class="tab-pane fade"
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
            >
              <table class="table">
                <tbody>
                  <tr>
                    <th class="notification-thumbnail noti-yellow" scope="row">
                      <img
                        src={inTransitIcon}
                        class="notification-thumbnail-img"
                        alt=""
                      />
                    </th>
                    <td>
                      <b class="notification-title">R.R.G Wines</b>
                      <br />
                      <p class="notification-title-sub">02/12/2019, 02:12PM</p>
                    </td>
                    <td>
                      <p class="notification-title-sub">Nampally, Hyderabad</p>
                    </td>
                    <td>
                      <p class="notification-title-sub">
                        <span class="dot bg-yellow"></span>InTransit
                      </p>
                    </td>
                    <td>
                      <p class="notification-title-sub">
                        <img
                          src={attachIcon}
                          class="notification-thumbnail-attach"
                          alt=""
                        />
                        123456.jpg
                      </p>
                    </td>
                    <td>
                      <p class="notification-title-sub">
                        <b>9548</b>
                      </p>
                      <br />
                    </td>
                  </tr>

                  <tr>
                    <th class="notification-thumbnail noti-green" scope="row">
                      <img
                        src={receivedIcon}
                        class="notification-thumbnail-img"
                        alt=""
                      />
                    </th>
                    <td>
                      <b class="notification-title">
                        Suvarna Durga Bottles Pvt. Ltd.
                      </b>
                      <br />
                      <p class="notification-title-sub">02/12/2019, 02:12PM</p>
                    </td>
                    <td>
                      <p class="notification-title-sub">
                        Chintalakunta, Hyderabad
                      </p>
                    </td>
                    <td>
                      <p class="notification-title-sub">
                        <span class="dot bg-green"></span>Received
                      </p>
                    </td>
                    <td>
                      <p class="notification-title-sub">
                        <img
                          src={attachIcon}
                          class="notification-thumbnail-attach"
                          alt=""
                        />
                        123456.jpg
                      </p>
                    </td>
                    <td>
                      <p class="notification-title-sub">
                        <b>9548</b>
                      </p>
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>
                      <br />
                      <p class="notification-date">December 30, 2019</p>
                    </td>
                  </tr>

                  <tr>
                    <th class="notification-thumbnail noti-red" scope="row">
                      <img
                        src={sentIcon}
                        class="notification-thumbnail-img"
                        alt=""
                      />
                    </th>
                    <td>
                      <b class="notification-title">
                        Balaji Enterprises Pvt. Ltd.
                      </b>
                      <br />
                      <p class="notification-title-sub">02/12/2019, 02:12PM</p>
                    </td>
                    <td>
                      <p class="notification-title-sub">Nampally, Hyderabad</p>
                    </td>
                    <td>
                      <p class="notification-title-sub">
                        <span class="dot bg-red"></span>Sent
                      </p>
                    </td>
                    <td>
                      <p class="notification-title-sub">
                        <img
                          src={attachIcon}
                          class="notification-thumbnail-attach"
                          alt=""
                        />
                        123456.jpg
                      </p>
                    </td>
                    <td>
                      <p class="notification-title-sub">
                        <b>9548</b>
                      </p>
                      <br />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div style={{ marginTop: "50px" }}></div>
        </section>
        <section>
          <div class="grid-side">
            <div class="sidebox-1">
              <img
                src={filterIcon}
                class="notification-thumbnail-attach"
                alt=""
              />{" "}
              FILTERS
              <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link active"
                    id="pills-Brewery-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-Brewery"
                    type="button"
                    role="tab"
                    aria-controls="pills-Brewery"
                    aria-selected="true"
                  >
                    Brewery
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link"
                    id="pills-Vendor-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-Vendor"
                    type="button"
                    role="tab"
                    aria-controls="pills-Vendor"
                    aria-selected="false"
                  >
                    Vendor
                  </button>
                </li>
              </ul>
              Time Period
              <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link active"
                    id="pills-Today-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-Today"
                    type="button"
                    role="tab"
                    aria-controls="pills-Today"
                    aria-selected="true"
                  >
                    Today
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link"
                    id="pills-Monthly-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-Monthly"
                    type="button"
                    role="tab"
                    aria-controls="pills-Monthly"
                    aria-selected="false"
                  >
                    Monthly
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link"
                    id="pills-Quarterly-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-Quarterly"
                    type="button"
                    role="tab"
                    aria-controls="pills-Quarterly"
                    aria-selected="false"
                  >
                    Quarterly
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link"
                    id="pills-Yearly-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-Yearly"
                    type="button"
                    role="tab"
                    aria-controls="pills-Yearly"
                    aria-selected="false"
                  >
                    Yearly
                  </button>
                </li>
              </ul>
              District
              <select class="form-select" aria-label="Default select example">
                <option selected>Select District</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              Vendor
              <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link active"
                    id="pills-All-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-All"
                    type="button"
                    role="tab"
                    aria-controls="pills-All"
                    aria-selected="true"
                  >
                    All
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link"
                    id="pills-S1-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-S1"
                    type="button"
                    role="tab"
                    aria-controls="pills-S1"
                    aria-selected="false"
                  >
                    S1
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link"
                    id="pills-S2-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-S2"
                    type="button"
                    role="tab"
                    aria-controls="pills-S2"
                    aria-selected="false"
                  >
                    S2
                  </button>
                </li>
              </ul>
              Select Vendor
              <select class="form-select" aria-label="Default select example">
                <option selected>Raju Scrap Shop</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link active"
                    id="pills-All-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-All"
                    type="button"
                    role="tab"
                    aria-controls="pills-All"
                    aria-selected="true"
                  >
                    SEARCH
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};
export default TransactionHistory;
