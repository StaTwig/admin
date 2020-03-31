import React, { useState } from "react";
import {
      Link
} from "react-router-dom";
import './style.scss';
import ButtonGroup from '../button';
import Table from '../../shared/table';
import Tabs from '../../shared/tabs';
import truckthree from "../../assets/icons/truckthree.svg";
import Sent from "../../assets/icons/Sent.svg";
import Received from "../../assets/icons/Received.svg";
import CurrentShipmentInTransit2 from "../../assets/icons/CurrentShipmentInTransit2.svg";
import Add from '../../assets/icons/add.svg';
import Order from '../../assets/icons/order.svg';
import TableFilter from '../../shared/advanceTableFilter';
import Modal from '../../shared/modal';
import PurchaseForm from '../../components/purchaseform';

const ShipmentAnalytic = () => {
      const [openPurchaseOrder, setOpenPurchaseOrder] = useState(false);
      const closeModal = () => {
            setOpenPurchaseOrder(false);
      }
      return (
            <div className="shipment">
                  <div className="d-flex justify-content-between">
                        <h1 className="breadcrumb">SHIPMENT</h1>
                        <div className="d-flex">
                              <button className="btn btn-orange fontSize20 font-bold" onClick={() => setOpenPurchaseOrder(true)}>
                                    <img src={Order} width='20' height='20' className="mr-2" />
                                    <span>Create Purchase Order</span>
                              </button>
                              <button className="btn btn-yellow fontSize20 font-bold">
                                    <Link to="/newshipment">
                                          <img src={Add} width='20' height='20' className="mr-2" />
                                          <span>Create Shipment</span>
                                    </Link>
                              </button>
                        </div>
                  </div>
                  <div className="d-flex fix-wrap">
                        <div className="panel">
                              <div className="d-flex h-100">
                                    <div className="picture truck-bg">
                                          <img src={truckthree} alt="truck" />
                                    </div>

                                    <div className="d-flex flex-column h-100 justify-content-around mt-2">
                                          <div className="truck-text font-weight-bold fontSize25">Total Shipments</div>
                                          <div><ButtonGroup /></div>
                                          <div className="truck-text font-weight-bold fontSize30">532</div>
                                    </div>
                              </div>
                        </div>
                        <div className="panel">
                              <div className="d-flex h-100">
                                    <div className="picture sent-bg">
                                          <img src={Sent} alt="truck" />
                                    </div>
                                    <div className="d-flex flex-column h-100 justify-content-around mt-2">
                                          <div className="sent-text font-weight-bold fontSize25">Total Shipments Sent</div>
                                          <div><ButtonGroup /></div>
                                          <div className="sent-text font-weight-bold fontSize30">532</div>
                                    </div>
                              </div>
                        </div>
                        <div className="panel">
                              <div className="d-flex h-100">
                                    <div className="picture recived-bg"><img src={Received} alt="truck" /></div>
                                    <div className="d-flex flex-column h-100 justify-content-around mt-2">
                                          <div className="recived-text font-weight-bold fontSize25">Total Shipments Received</div>
                                          <div><ButtonGroup /></div>
                                          <div className="recived-text font-weight-bold fontSize30">532</div>
                                    </div>
                              </div>
                        </div>
                        <div className="panel">
                              <div className="d-flex h-100">
                                    <div className="picture transit-bg"><img src={CurrentShipmentInTransit2} alt="truck" /></div>
                                    <div className="d-flex flex-column h-100 justify-content-around mt-2">
                                          <div className="transit-text font-weight-bold fontSize25">Current Shipment in Transit</div>
                                          <div>&nbsp;</div>
                                          <div className="transit-text font-weight-bold fontSize30">532</div>
                                    </div>
                              </div>
                        </div>
                  </div>
                  <div className="mt-5">
                        <Tabs />
                        <div className="mt-5">
                              <TableFilter />
                        </div>
                        <Table />
                  </div>
                  {
                        openPurchaseOrder && <Modal
                              close={() => closeModal()}
                              title="Create Purchase Order"
                              size="modal-xl" //for other size's use `modal-lg, modal-md, modal-sm`
                              buttonName="REVIEW"
                              buttonClass="btn-orange"
                        >
                              <PurchaseForm />
                        </Modal>
                  }

            </div>
      );
};



export default ShipmentAnalytic;

