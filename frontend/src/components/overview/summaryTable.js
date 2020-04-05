import React from "react";
import dp from "../../assets/icons/harsha.jpg";
import './table-style.scss';

const SummaryTable = props => {
    return (
        <React.Fragment>
            {/* {props.shipments.map(shipment => (
                    <tr key={shipment.Shipment_ID}>
                      <th scope="row">
                        <img className="image" src={dp} width="25px" />
                      </th>
                      <td>{shipment['Deliver_To']}</td>
                      <td>{shipment['Shipment_ID']}</td>
                      <td>{shipment['Shipment_Date']}</td>
                      <td>{shipment['Delivery Location']}</td>
                      <td>8°C</td>
                      <td>
                        <span className="badge badge-pill badge-success p-2">
                          Received
                        </span>
                      </td>
                    </tr>
                  ))} */}
            <div className="summaryTable">
                <div className="rowData">
                    <div className="headline">Client</div>
                    <div className="combine-data">
                        <img className="round-sign" src={dp} width="15" />
                        <a>Andrew Mctyre</a>
                    </div>
                    <div className="combine-data">
                        <img className="round-sign" src={dp} width="15" />
                        <a>Andrew Mctyre</a>
                    </div>
                    <div className="combine-data">
                        <img className="round-sign" src={dp} width="15" />
                        <a>Andrew Mctyre</a>
                    </div>
                    <div className="combine-data">
                        <img className="round-sign" src={dp} width="15" />
                        <a>Andrew Mctyre</a>
                    </div>
                    <div className="combine-data">
                        <img className="round-sign" src={dp} width="15" />
                        <a>Andrew Mctyre</a>
                    </div>
                    <div className="combine-data">
                        <img className="round-sign" src={dp} width="15" />
                        <a>Andrew Mctyre</a>
                    </div>
                </div>
                <div className="rowData">
                    <div className="headline">Shipment ID</div>
                    <div>3987</div>
                    <div>3987</div>
                    <div>3987</div>
                    <div>3987</div>
                    <div>3987</div>
                    <div>3987</div>
                </div>
                <div className="rowData">
                    <div className="headline">Shipping Date</div>
                    <div>18/06/2008</div>
                    <div>18/06/2008</div>
                    <div>18/06/2008</div>
                    <div>18/06/2008</div>
                    <div>18/06/2008</div>
                    <div>18/06/2008</div>
                </div>
                <div className="rowData">
                    <div className="headline">Current Location</div>
                    <div>New York</div>
                    <div>New York</div>
                    <div>New York</div>
                    <div>New York</div>
                    <div>New York</div>
                    <div>New York</div>
                </div>
                <div className="rowData">
                    <div className="headline">Temperature</div>
                    <div>8°C</div>
                    <div>8°C</div>
                    <div>8°C</div>
                    <div>8°C</div>
                    <div>8°C</div>
                    <div>8°C</div>
                </div>
                <div className="rowData">
                    <div className="headline">Status</div>
                    <div><span className="badge badge-pill badge-success p-2">Received</span></div>
                    <div><span className="badge badge-pill badge-success p-2">Received</span></div>
                    <div><span className="badge badge-pill badge-success p-2">Received</span></div>
                    <div><span className="badge badge-pill badge-success p-2">Received</span></div>
                    <div><span className="badge badge-pill badge-success p-2">Received</span></div>
                    <div><span className="badge badge-pill badge-success p-2">Received</span></div>
                </div>
            </div>
            <div className="summaryTable sm-only">
                <div className="row">
                    <div className="col-sm-12 col-md-6 mb-3">
                        <div className="combine-data mb-3">
                            <img className="rounded mr-2" src={dp} width="15" />
                            <a>Andrew Mctyre</a>
                        </div>
                        <div className="d-flex">
                            <div className="mr-3">Shipment ID</div>
                            <div className="font-weight-bold">3987</div>
                        </div>
                        <div className="d-flex">
                            <div className="mr-3">Shipping Date</div>
                            <div className="font-weight-bold">18/06/2008</div>
                        </div>
                        <div className="d-flex">
                            <div className="mr-3">Current Location</div>
                            <div className="font-weight-bold">New York</div>
                        </div>
                        <div className="d-flex">
                            <div className="mr-3">Temperature</div>
                            <div className="font-weight-bold">8°C</div>
                        </div>
                        <div className="d-flex">
                            <div className="mr-3">Status</div>
                            <div className="font-weight-bold"><span className="badge badge-pill badge-success p-2">Received</span></div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6 mb-3">
                    <div className="combine-data mb-3">
                            <img className="rounded mr-2" src={dp} width="15" />
                            <a>Andrew Mctyre</a>
                        </div>
                        <div className="d-flex">
                            <div className="mr-3">Shipment ID</div>
                            <div className="font-weight-bold">3987</div>
                        </div>
                        <div className="d-flex">
                            <div className="mr-3">Shipping Date</div>
                            <div className="font-weight-bold">18/06/2008</div>
                        </div>
                        <div className="d-flex">
                            <div className="mr-3">Current Location</div>
                            <div className="font-weight-bold">New York</div>
                        </div>
                        <div className="d-flex">
                            <div className="mr-3">Temperature</div>
                            <div className="font-weight-bold">8°C</div>
                        </div>
                        <div className="d-flex">
                            <div className="mr-3">Status</div>
                            <div className="font-weight-bold"><span className="badge badge-pill badge-success p-2">Received</span></div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6 mb-3">
                    <div className="combine-data mb-3">
                            <img className="rounded mr-2" src={dp} width="15" />
                            <a>Andrew Mctyre</a>
                        </div>
                        <div className="d-flex">
                            <div className="mr-3">Shipment ID</div>
                            <div className="font-weight-bold">3987</div>
                        </div>
                        <div className="d-flex">
                            <div className="mr-3">Shipping Date</div>
                            <div className="font-weight-bold">18/06/2008</div>
                        </div>
                        <div className="d-flex">
                            <div className="mr-3">Current Location</div>
                            <div className="font-weight-bold">New York</div>
                        </div>
                        <div className="d-flex">
                            <div className="mr-3">Temperature</div>
                            <div className="font-weight-bold">8°C</div>
                        </div>
                        <div className="d-flex">
                            <div className="mr-3">Status</div>
                            <div className="font-weight-bold"><span className="badge badge-pill badge-success p-2">Received</span></div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6 mb-3">
                    <div className="combine-data mb-3">
                            <img className="rounded mr-2" src={dp} width="15" />
                            <a>Andrew Mctyre</a>
                        </div>
                        <div className="d-flex">
                            <div className="mr-3">Shipment ID</div>
                            <div className="font-weight-bold">3987</div>
                        </div>
                        <div className="d-flex">
                            <div className="mr-3">Shipping Date</div>
                            <div className="font-weight-bold">18/06/2008</div>
                        </div>
                        <div className="d-flex">
                            <div className="mr-3">Current Location</div>
                            <div className="font-weight-bold">New York</div>
                        </div>
                        <div className="d-flex">
                            <div className="mr-3">Temperature</div>
                            <div className="font-weight-bold">8°C</div>
                        </div>
                        <div className="d-flex">
                            <div className="mr-3">Status</div>
                            <div className="font-weight-bold"><span className="badge badge-pill badge-success p-2">Received</span></div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6 mb-3">
                    <div className="combine-data mb-3">
                            <img className="rounded mr-2" src={dp} width="15" />
                            <a>Andrew Mctyre</a>
                        </div>
                        <div className="d-flex">
                            <div className="mr-3">Shipment ID</div>
                            <div className="font-weight-bold">3987</div>
                        </div>
                        <div className="d-flex">
                            <div className="mr-3">Shipping Date</div>
                            <div className="font-weight-bold">18/06/2008</div>
                        </div>
                        <div className="d-flex">
                            <div className="mr-3">Current Location</div>
                            <div className="font-weight-bold">New York</div>
                        </div>
                        <div className="d-flex">
                            <div className="mr-3">Temperature</div>
                            <div className="font-weight-bold">8°C</div>
                        </div>
                        <div className="d-flex">
                            <div className="mr-3">Status</div>
                            <div className="font-weight-bold"><span className="badge badge-pill badge-success p-2">Received</span></div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6 mb-3">
                    <div className="combine-data mb-3">
                            <img className="rounded mr-2" src={dp} width="15" />
                            <a>Andrew Mctyre</a>
                        </div>
                        <div className="d-flex">
                            <div className="mr-3">Shipment ID</div>
                            <div className="font-weight-bold">3987</div>
                        </div>
                        <div className="d-flex">
                            <div className="mr-3">Shipping Date</div>
                            <div className="font-weight-bold">18/06/2008</div>
                        </div>
                        <div className="d-flex">
                            <div className="mr-3">Current Location</div>
                            <div className="font-weight-bold">New York</div>
                        </div>
                        <div className="d-flex">
                            <div className="mr-3">Temperature</div>
                            <div className="font-weight-bold">8°C</div>
                        </div>
                        <div className="d-flex">
                            <div className="mr-3">Status</div>
                            <div className="font-weight-bold"><span className="badge badge-pill badge-success p-2">Received</span></div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6 mb-3">
                    <div className="combine-data mb-3">
                            <img className="rounded mr-2" src={dp} width="15" />
                            <a>Andrew Mctyre</a>
                        </div>
                        <div className="d-flex">
                            <div className="mr-3">Shipment ID</div>
                            <div className="font-weight-bold">3987</div>
                        </div>
                        <div className="d-flex">
                            <div className="mr-3">Shipping Date</div>
                            <div className="font-weight-bold">18/06/2008</div>
                        </div>
                        <div className="d-flex">
                            <div className="mr-3">Current Location</div>
                            <div className="font-weight-bold">New York</div>
                        </div>
                        <div className="d-flex">
                            <div className="mr-3">Temperature</div>
                            <div className="font-weight-bold">8°C</div>
                        </div>
                        <div className="d-flex">
                            <div className="mr-3">Status</div>
                            <div className="font-weight-bold"><span className="badge badge-pill badge-success p-2">Received</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>

    );
};



export default SummaryTable;

