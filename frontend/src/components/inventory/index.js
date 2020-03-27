import React from "react";
import {
      Link
} from "react-router-dom";

import './style.scss';
import ButtonGroup from '../button';
import Table from '../../shared/table';
import TableFilter from '../../shared/advanceTableFilter';
import TotalInventoryAdded from "../../assets/icons/TotalInventoryAddedcopy.svg";
import currentinventory from "../../assets/icons/CurrentInventory.svg";
import Expiration from "../../assets/icons/TotalVaccinenearExpiration.svg";
import TotalVaccineExpired from "../../assets/icons/TotalVaccineExpired.svg";
import Add from '../../assets/icons/add.svg';
import OPV from "../../assets/icons/OPV.svg";
import MMR from "../../assets/icons/MMR.svg";
import HiB from "../../assets/icons/HiB.svg";
import HepB from "../../assets/icons/HepB.svg";
import IPV from "../../assets/icons/IPV.svg";
import PVC from "../../assets/icons/PVC.svg";
import BVG from "../../assets/icons/BCG.svg";
import RV from "../../assets/icons/RV.svg";


const Inventory = () => {
      return (
            <div className="inventory">
                  <div className="d-flex justify-content-between">
                        <h1 className="breadcrumb">INVENTORY</h1>
                        <div className="d-flex">
                               <button className="btn btn-yellow fontSize20 font-bold">
                                  <Link to="/newinventory">
                                    <img src={Add} width='20' height='20' className="mr-2" />
                                    <span>Add Inventory</span>
                                    </Link>
                              </button>
                        </div>
                  </div>
                  <div className="d-flex fix-wrap">
                        <div className="panel">
                              <div className="d-flex h-100">
                                    <div className="picture truck-bg">
                                          <img src={TotalInventoryAdded} alt="truck" />
                                    </div>

                                    <div className="d-flex flex-column h-100 justify-content-around mt-2">
                                          <div className="truck-text font-weight-bold fontSize25">Total Inventory Added</div>
                                          <div><ButtonGroup /></div>
                                          <div className="truck-text font-weight-bold fontSize30">2,34,532</div>
                                    </div>
                              </div>
                        </div>
                        <div className="panel">
                              <div className="d-flex h-100">
                                    <div className="picture sent-bg">
                                          <img src={currentinventory} alt="truck" />
                                    </div>
                                    <div className="d-flex flex-column h-100 justify-content-around mt-2">
                                          <div className="sent-text font-weight-bold fontSize25">Current Inventory</div>
                                          <div><ButtonGroup /></div>
                                          <div className="sent-text font-weight-bold fontSize30">14,532</div>
                                    </div>
                              </div>
                        </div>
                        <div className="panel">
                              <div className="d-flex h-100">
                                    <div className="picture recived-bg"><img src={Expiration} alt="truck" /></div>
                                    <div className="d-flex flex-column h-100 justify-content-around mt-2">
                                          <div className="recived-text font-weight-bold fontSize25">Total Vaccine near Expiration</div>
                                          <div><ButtonGroup /></div>
                                          <div className="recived-text font-weight-bold fontSize30">532</div>
                                    </div>
                              </div>
                        </div>
                        <div className="panel">
                              <div className="d-flex h-100">
                                    <div className="picture transit-bg"><img src={TotalVaccineExpired} alt="truck" /></div>
                                    <div className="d-flex flex-column h-100 justify-content-around mt-2">
                                          <div className="transit-text font-weight-bold fontSize25">Total Vaccine Expired</div>
                                          <div>&nbsp;</div>
                                          <div className="transit-text font-weight-bold fontSize30">1532</div>
                                    </div>
                              </div>
                        </div>
                  </div>
                  <div className="mt-5">
                        <TableFilter />
                        <div className="row no-gutter mt-5">
                              <div className="col-sm-12 col-lg-9 col-md-6">
                                    <Table />
                              </div>
                              <div className="col-sm-12 col-lg-3 col-md-6">
                                    <div className="list-container">
                                          <div className="d-flex justify-content-between align-items-center">
                                                <h4>Product List</h4>
                                                <button className="btn btn-link">View all</button>
                                          </div>
                                          <div className="row overflow">
                                                <div className="col-sm-6">
                                                      <div className="d-flex card flex-column align-items-center">
                                                      <img src={OPV} width='40' height='40' className="my-2" />
                                                            <p>OPV</p>
                                                            <h3>2930</h3>
                                                      </div>
                                                </div>
                                                <div className="col-sm-6">
                                                      <div className="d-flex card flex-column align-items-center">
                                                      <img src={MMR} width='40' height='40' className="my-2" />
                                                            <p>MMR</p>
                                                            <h3>2930</h3>
                                                      </div>
                                                </div>
                                                <div className="col-sm-6 mt-4">
                                                      <div className="d-flex card flex-column align-items-center">
                                                      <img src={HiB} width='40' height='40' className="my-2" />
                                                            <p>HiB</p>
                                                            <h3>2930</h3>
                                                      </div>
                                                </div>
                                                <div className="col-sm-6 mt-4">
                                                      <div className="d-flex card flex-column align-items-center">
                                                      <img src={HepB} width='40' height='40' className="my-2" />
                                                            <p>Hep B</p>
                                                            <h3>2930</h3>
                                                      </div>
                                                </div>
                                                <div className="col-sm-6 mt-4">
                                                      <div className="d-flex card flex-column align-items-center">
                                                      <img src={IPV} width='40' height='40' className="my-2" />
                                                            <p>IPV</p>
                                                            <h3>2930</h3>
                                                      </div>
                                                </div>
                                                <div className="col-sm-6 mt-4">
                                                      <div className="d-flex card flex-column align-items-center">
                                                      <img src={PVC} width='40' height='40' className="my-2" />
                                                            <p>PVC</p>
                                                            <h3>2930</h3>
                                                      </div>
                                                </div>
                                                <div className="col-sm-6 mt-4">
                                                      <div className="d-flex card flex-column align-items-center">
                                                      <img src={BVG} width='40' height='40' className="my-2" />
                                                            <p>BVG</p>
                                                            <h3>2930</h3>
                                                      </div>
                                                </div>
                                                <div className="col-sm-6 mt-4">
                                                      <div className="d-flex card flex-column align-items-center">
                                                      <img src={RV} width='40' height='40' className="my-2" />
                                                            <p>RV</p>
                                                            <h3>2930</h3>
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

