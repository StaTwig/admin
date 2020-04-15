import React, { useState, useEffect } from 'react';
import {
      Link
} from "react-router-dom";

import { expired, expiringIn, Count } from '../../utils/dateHelper';
import './style.scss';
import Table from '../../shared/table';
import TableFilter from '../../shared/advanceTableFilter';
import TotalInventoryAdded from "../../assets/icons/TotalInventoryAddedcopy.svg";
import currentinventory from "../../assets/icons/CurrentInventory.svg";
import Expiration from "../../assets/icons/TotalVaccinenearExpiration.svg";
import TotalVaccineExpired from "../../assets/icons/TotalVaccineExpired.svg";
import Add from '../../assets/icons/add.svg';
import user from '../../assets/icons/brand.svg';
import Package from '../../assets/icons/package.svg';
import calender from '../../assets/icons/calendar.svg';
import Status from '../../assets/icons/Status.svg';

const Inventory = (props) => {
      const headers = {
            coloumn1 : "Product Type",
            coloumn2:  "Manufacturer",
            coloumn3: "Expiry Date",
            coloumn4:  "Date Added",

            img1: <img src={Package} width="16" height="16" />,
            img2: <img src={user} width="16" height="16" />,
            img3: <img src={calender} width="16" height="16" />,
            img4:  <img src={Status} width="16" height="16" />
      }

      const tableHeaders = {
            coloumn1 : "Product Name",
            coloumn2:  "Manufacturer",
            coloumn3:  "Batch Number",
            coloumn4:  "Quantity",
            coloumn5:  "Date Added",
            coloumn6:  "Mfg Date",
            coloumn7:  "Exp Date",
      }

     const [inventoryExpiring, setInventoryExpiring] = useState('');
     const [inventoryExpired, setInventoryExpired] = useState('');
     const [inventoryTotal, setInventoryTotal] = useState('');
     const [inventoryCurrent, setInventoryCurrent] = useState('');
    useEffect(() => {
    
    const inventoryDates = props.inventories.map((data, index) => {
      return data;      
    })
    const expiring = expiringIn(inventoryDates, 2190);
    const expired_data = expired(inventoryDates, 0);
    const expiredCount = Count(expired_data);
    const expiringCount = Count(expiring)
    const inventoryCount = Count(inventoryDates);

    console.log(expiredCount);
    setInventoryExpired(expiredCount);
    setInventoryExpiring(expiringCount - expiredCount);
    setInventoryTotal(inventoryCount);
    setInventoryCurrent(inventoryCount);
      
    })
      return (
            <div className="inventory">
                  <div className="d-flex justify-content-between">
                        <h1 className="breadcrumb">INVENTORY</h1>
                        <div className="d-flex">
                        <Link to="/newinventory">
                              <button className="btn btn-yellow font-weight-bold">
                                   <img src={Add} width='13' height='13' className="mr-2" />
                                          <span>Add Inventory</span>
                                  </button>
                                  </Link>
                        </div>
                  </div>
                  <div className="row mb-4">
                        <div className="col">
                              <div className="panel">
                                    <div className="picture truck-bg">
                                          <img src={TotalInventoryAdded} alt="truck" />
                                    </div>
                                    <div className="d-flex flex-column">
                                          <div className="title truck-text">Inventory Added</div>
                                          <div className="tab-container">
                                                <div className="tab-item active">This Year</div>
                                                <div className="tab-item">This Month</div>
                                                <div className="tab-item">This Week</div>
                                                <div className="tab-item">Today</div>
                                          </div>
                                          <div className="truck-text count">{inventoryTotal}</div>
                                    </div>
                              </div>
                        </div>
                        <div className="col">
                              <div className="panel">
                                    <div className="picture sent-bg">
                                          <img src={currentinventory} alt="truck" />
                                    </div>
                                    <div className="d-flex flex-column">
                                          <div className="title sent-text">Current Inventory</div>
                                          <div className="tab-container">
                                                <div className="tab-item active">This Year</div>
                                                <div className="tab-item">This Month</div>
                                                <div className="tab-item">This Week</div>
                                                <div className="tab-item">Today</div>
                                          </div>
                                          <div className="sent-text count">{inventoryCurrent}</div>
                                    </div>
                              </div>
                        </div>
                        <div className="col">
                              <div className="panel">
                                    <div className="picture recived-bg">
                                          <img src={Expiration} alt="truck" />
                                    </div>
                                    <div className="d-flex flex-column">
                                          <div className="title recived-text">Total Vaccine near Expiration</div>
                                          <div className="tab-container">
                                                <div className="tab-item active">This Year</div>
                                                <div className="tab-item">This Month</div>
                                                <div className="tab-item">This Week</div>
                                                <div className="tab-item">Today</div>
                                          </div>
                                          <div className="recived-text count">{inventoryExpiring}</div>
                                    </div>
                              </div>
                        </div>
                        <div className="col">
                              <div className="panel">
                                    <div className="picture transit-bg">
                                          <img src={TotalVaccineExpired} alt="truck" />
                                    </div>
                                    <div className="d-flex flex-column">
                                          <div className="title transit-text">Vaccine Expired</div>
                                          <div className="tab-container">
                                                <div className="tab-item active">This Year</div>
                                                <div className="tab-item">This Month</div>
                                                <div className="tab-item">This Week</div>
                                                <div className="tab-item">Today</div>
                                          </div>
                                          <div className="transit-text count">{inventoryExpired}</div>
                                    </div>
                              </div>
                        </div>
                  </div>
                  <div className="full-width-ribben">
                        <TableFilter data={headers} />
                  </div>
                  <div className="ribben-space">
                        <div className="row no-gutter">
                              <div className="col-sm-12 col-xl-9">
                                    <Table data={tableHeaders}{...props} />
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
                                                            <div className="round-sign ellipseOne">OPV</div>
                                                            <p>Oral Polio Vaccine</p>
                                                            <h3>Qty: 74,000</h3>
                                                      </div>
                                                </div>
                                                <div className="col-sm-6">
                                                      <div className="d-flex card flex-column align-items-center">
                                                            <div className="round-sign ellipseFour">HepB</div>
                                                            <p>Hepatitis B Vaccine</p>
                                                            <h3>Qty: 82,000</h3>
                                                      </div>
                                                </div>
                                                <div className="col-sm-6">
                                                      <div className="d-flex card flex-column align-items-center">
                                                            <div className="round-sign ellipseTwo">MMR</div>
                                                            <p>Mumps, Measles & Rubella Vaccine</p>
                                                            <h3>Qty: 74,000</h3>
                                                      </div>
                                                </div>
                                                <div className="col-sm-6">
                                                      <div className="d-flex card flex-column align-items-center">
                                                            <div className="round-sign ellipseThree">PVC</div>
                                                            <p>Pneumococcal conjugate Vaccine</p>
                                                            <h3>Qty: 74,000</h3>
                                                      </div>
                                                </div>
                                                <div className="col-sm-6">
                                                      <div className="d-flex card flex-column align-items-center">
                                                            <div className="round-sign ellipseFive">RV</div>
                                                            <p>Rotavirus Vaccine</p>
                                                            <h3>Qty: 74,000</h3>
                                                      </div>
                                                </div>
                                                <div className="col-sm-6">
                                                      <div className="d-flex card flex-column align-items-center">
                                                            <div className="round-sign ellipseSix">IPV</div>
                                                            <p>Inactivated Polio Vaccine</p>
                                                            <h3>Qty: 74,000</h3>
                                                      </div>
                                                </div>
                                                <div className="col-sm-6">
                                                      <div className="d-flex card flex-column align-items-center">
                                                            <div className="round-sign ellipseFour">HepB</div>
                                                            <p>Hepatitis B Vaccine</p>
                                                            <h3>Qty: 74,000</h3>
                                                      </div>
                                                </div>
                                                <div className="col-sm-6">
                                                      <div className="d-flex card flex-column align-items-center">
                                                            <div className="round-sign ellipseOne">OPV</div>
                                                            <p>Oral Polio Vaccine</p>
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

