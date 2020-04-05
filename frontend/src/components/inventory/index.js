import React from "react";
import {
      Link
} from "react-router-dom";

import './style.scss';
import Table from '../../shared/table';
import TableFilter from '../../shared/advanceTableFilter';
import TotalInventoryAdded from "../../assets/icons/TotalInventoryAddedcopy.svg";
import currentinventory from "../../assets/icons/CurrentInventory.svg";
import Expiration from "../../assets/icons/TotalVaccinenearExpiration.svg";
import TotalVaccineExpired from "../../assets/icons/TotalVaccineExpired.svg";
import Add from '../../assets/icons/add.svg';

const Inventory = (props) => {
      return (
            <div className="inventory">
                  <div className="d-flex justify-content-between">
                        <h1 className="breadcrumb">INVENTORY</h1>
                        <div className="d-flex">
                              <button className="btn btn-yellow font-weight-bold">
                                    <Link to="/newinventory">
                                          <img src={Add} width='13' height='13' className="mr-2" />
                                          <span>Add Inventory</span>
                                    </Link>
                              </button>
                        </div>
                  </div>
                  <div className="row mb-4">
                        <div className="col">
                              <div className="panel">
                                    <div className="picture truck-bg">
                                          <img src={TotalInventoryAdded} alt="truck" />
                                    </div>
                                    <div className="d-flex flex-column">
                                          <div className="title">Inventory Added</div>
                                          <div className="tab-container">
                                                <div className="tab-item active">This Year</div>
                                                <div className="tab-item">This Month</div>
                                                <div className="tab-item">This Week</div>
                                                <div className="tab-item">Today</div>
                                          </div>
                                          <div className="truck-text count">2,34,532</div>
                                    </div>
                              </div>
                        </div>
                        <div className="col">
                              <div className="panel">
                                    <div className="picture sent-bg">
                                          <img src={currentinventory} alt="truck" />
                                    </div>
                                    <div className="d-flex flex-column">
                                          <div className="title">Current Inventory</div>
                                          <div className="tab-container">
                                                <div className="tab-item active">This Year</div>
                                                <div className="tab-item">This Month</div>
                                                <div className="tab-item">This Week</div>
                                                <div className="tab-item">Today</div>
                                          </div>
                                          <div className="sent-text count">14,532</div>
                                    </div>
                              </div>
                        </div>
                        <div className="col">
                              <div className="panel">
                                    <div className="picture recived-bg">
                                          <img src={Expiration} alt="truck" />
                                    </div>
                                    <div className="d-flex flex-column">
                                          <div className="title">Vaccine To Expiration</div>
                                          <div className="tab-container">
                                                <div className="tab-item active">This Year</div>
                                                <div className="tab-item">This Month</div>
                                                <div className="tab-item">This Week</div>
                                                <div className="tab-item">Today</div>
                                          </div>
                                          <div className="recived-text count">1,532</div>
                                    </div>
                              </div>
                        </div>
                        <div className="col">
                              <div className="panel">
                                    <div className="picture transit-bg">
                                          <img src={TotalVaccineExpired} alt="truck" />
                                    </div>
                                    <div className="d-flex flex-column">
                                          <div className="title">Vaccine Expired</div>
                                          <div className="tab-container">
                                                <div className="tab-item active">This Year</div>
                                                <div className="tab-item">This Month</div>
                                                <div className="tab-item">This Week</div>
                                                <div className="tab-item">Today</div>
                                          </div>
                                          <div className="transit-text count">1,532</div>
                                    </div>
                              </div>
                        </div>
                  </div>
                  <div className="full-width-ribben">
                        <TableFilter />
                  </div>
                  <div className="ribben-space">
                        <div className="row no-gutter">
                              <div className="col-sm-12 col-xl-9">
                                    <Table {...props} />
                              </div>
                              <div className="col-sm-12 col-xl-3">
                                    <div className="list-container">
                                          <div className="d-flex justify-content-between align-items-center">
                                                <h4>Product List</h4>
                                                <button className="btn btn-link">View all</button>
                                          </div>
                                          <div className="row overflow">
                                                <div className="col-sm-6">
                                                      <div className="d-flex card flex-column align-items-center">
                                                            <div className="round-sign ellipseFour">OPV</div>
                                                            <p>Hepatitis B Vaccine</p>
                                                            <h3>Qty: 74,000</h3>
                                                      </div>
                                                </div>
                                                <div className="col-sm-6">
                                                      <div className="d-flex card flex-column align-items-center">
                                                            <div className="round-sign ellipseThree">OPV</div>
                                                            <p>Hepatitis B Vaccine</p>
                                                            <h3>Qty: 74,000</h3>
                                                      </div>
                                                </div>
                                                <div className="col-sm-6">
                                                      <div className="d-flex card flex-column align-items-center">
                                                            <div className="round-sign ellipseTwo">MMP</div>
                                                            <p>Hepatitis B Vaccine</p>
                                                            <h3>Qty: 74,000</h3>
                                                      </div>
                                                </div>
                                                <div className="col-sm-6">
                                                      <div className="d-flex card flex-column align-items-center">
                                                            <div className="round-sign ellipseOne">RV</div>
                                                            <p>Mumps, Measles & Rubella Vaccine</p>
                                                            <h3>Qty: 74,000</h3>
                                                      </div>
                                                </div>
                                                <div className="col-sm-6">
                                                      <div className="d-flex card flex-column align-items-center">
                                                            <div className="round-sign ellipseFour">PVC</div>
                                                            <p>Pneumococcal conjugate Vaccine</p>
                                                            <h3>Qty: 74,000</h3>
                                                      </div>
                                                </div>
                                                <div className="col-sm-6">
                                                      <div className="d-flex card flex-column align-items-center">
                                                            <div className="round-sign ellipseThree">BVG</div>
                                                            <p>Hepatitis B Vaccine</p>
                                                            <h3>Qty: 74,000</h3>
                                                      </div>
                                                </div>
                                                <div className="col-sm-6">
                                                      <div className="d-flex card flex-column align-items-center">
                                                            <div className="round-sign ellipseTwo">TTR</div>
                                                            <p>Hepatitis B Vaccine</p>
                                                            <h3>Qty: 74,000</h3>
                                                      </div>
                                                </div>
                                                <div className="col-sm-6">
                                                      <div className="d-flex card flex-column align-items-center">
                                                            <div className="round-sign ellipseOne">OPV</div>
                                                            <p>Hepatitis B Vaccine</p>
                                                            <h3>Qty: 74,000</h3>
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </div>

                  </div>
            </div>
      );
};



export default Inventory;

