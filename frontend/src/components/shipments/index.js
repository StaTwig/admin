import React, { useState } from "react";
import {
      Link
} from "react-router-dom";
import './style.scss';
import ButtonGroup from '../button';
import Table from '../../shared/table';
import Tabs from '../../shared/tabs';
import Tiles from './tiles';
import Add from '../../assets/icons/add.svg';
import Order from '../../assets/icons/order.svg';
import TableFilter from '../../shared/advanceTableFilter';
import Modal from '../../shared/modal';
import PurchaseForm from '../../components/purchaseform';

const ShipmentAnalytic = (props) => {
      const [openPurchaseOrder, setOpenPurchaseOrder] = useState(false);
      const closeModal = () => {
            setOpenPurchaseOrder(false);
      }
      return (
            <div className="shipment">
                  <div className="d-flex justify-content-between">
                        <h1 className="breadcrumb">SHIPMENT</h1>
                        <div className="d-flex">
                              <button className="btn btn-orange fontSize20 font-bold mr-2" onClick={() => setOpenPurchaseOrder(true)}>
                                    <img src={Order} width='14' height='14' className="mr-2" />
                                    <span>Create Purchase Order</span>
                              </button>
                              <button className="btn btn-yellow fontSize20 font-bold">
                                    <Link to="/newshipment">
                                          <img src={Add} width='14' height='14' className="mr-2" />
                                          <span>Create Shipment</span>
                                    </Link>
                              </button>
                        </div>
                  </div>
                  <Tiles />
                  <div className="mt-4">
                        <Tabs />
                  </div>
                  <div className="full-width-ribben mt-4">
                              <TableFilter />
                        </div>
                        <div className="ribben-space">
                              <Table {...props}/>
                        </div>
                  {
                        openPurchaseOrder && <Modal
                              close={() => closeModal()}
                              title="Create Purchase Order"
                              size="modal-xl" //for other size's use `modal-lg, modal-md, modal-sm`
                              buttonName="REVIEW"
                              buttonclassName="btn-orange"
                        >
                              <PurchaseForm />
                        </Modal>
                  }

            </div>
      );
};



export default ShipmentAnalytic;

