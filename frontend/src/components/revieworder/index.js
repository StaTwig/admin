
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ViewTable from "./table/viewTable";
import { useSelector, useDispatch } from "react-redux";
import OrderIcon from '../../assets/icons/order.svg';
import Pen from '../../assets/icons/pen1.svg';
import ShipmentPopUp from "../neworder/shipmentPopUp";
import ShipmentFailPopUp from "../neworder/shipmentFailPopUp";
import './style.scss';
import { turnOn, turnOff } from "../../actions/spinnerActions";
import { createOrder, resetReviewPos } from '../../actions/poActions';

const ReviewOrder = props => {
  const order = useSelector(state => {
    return state?.reviewPo;
  });
  
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [openOrder, setOpenOrder] = useState(false);
  const [failedPop, setFailedPop] = useState(false);

  const onAssign = async () => {
    let error = false;
    const { fromOrg, fromOrgId, toOrg, toOrgLoc, products } = order;
    products.forEach((p) => {
      if (p.quantity < 1)
        error = true;
    });

    if (!error) {
      const data = {
        externalId: "",
        supplier: {
          supplierIncharge: null,
          supplierOrganisation: fromOrg,
        },
        customer: {
          customerIncharge: null,
          customerOrganisation: toOrg,
          shippingAddress: {
            shippingAddressId: toOrgLoc,
            shipmentReceiverId: null
          }
        },
        lastUpdatedOn: new Date().toISOString(),
        creationDate: new Date().toISOString(),
        poStatus: "CREATED",
        products: products,
      };

      dispatch(turnOn());
      const result = await createOrder(data);
      dispatch(turnOff());
      if (result.status === 200) {
        // dispatch(resetReviewPos({}));
        props.history.push('/orders');
      } else {
        setFailedPop(true);
        setErrorMessage("Not able to create order. Try again!");
      }
    }
  };
  

  return (
    <div className="vieworder text-muted">
      <div className="d-flex justify-content-between">
        <h1 className="breadcrumb">REVIEW ORDER</h1>
      </div>
      <div className="mt-4">
        <div className=" p-3 m-3 bg-white shadow">
          
          <span className="p-0 font-weight-bold" style={{color:"black"}}>Product Details</span>
          <div className="row mt-3">
            <ViewTable
              product={order?.products}
            />
          </div>
        </div>
        <div className="row bg-white shadow p-3 m-3">
          <div className=" pl-1 col-12">
            <span className="p-0 font-weight-bold" style={{color:"black"}}>Order From</span>
            <div>
              <div className=" row p-3">
                <div className="col row">
                  <span className="col-4">Organisation Name: </span>
                  <span className="col" style={{color: "black"}} >{order.fromOrgId}</span>
                </div>
                <div className="col row">
                  <span className="col-4">Organisation ID: </span>
                  <span className="col" style={{color: "black"}} >{order.fromOrg}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row bg-white shadow p-3 m-3">
          <div className=" pl-1 col-12">
            <span className="p-0  font-weight-bold" style={{color:"black"}}>Order To</span>
            <div>
              <div className=" row p-3">
                <div className="col row">
                  <span className="col-4">Organisation Name: </span>
                  <span className="col" style={{color: "black"}} >{order.toOrgName}</span>
                </div>
                <div className="col row">
                  <span className="col-4">Organisation ID: </span>
                  <span className="col" style={{color: "black"}} >{order.toOrg}</span>
                </div>
                <div className="w-100"></div>
                <div className="col row col-6 mt-2">
                  <span className="col-4">Delivery Location:</span>
                  <span className="col ml-2 " style={{color: "black"}} >{order.toOrgLocName}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
            <div className="d-flex flex-row-reverse">
              <button onClick={onAssign} className="btn btn-yellow fontSize20 font-bold">
                <img src={OrderIcon} width="20" height="17" className="mr-2 mb-1" />
                <span>Create Order</span>
              </button>
              <button className="btn-outline-primary btn mr-2" onClick={() => props.history.push('/neworder')}>
                <img src={Pen} width="15" height="15" className="mr-3" />
                <span>EDIT</span>
              </button>

              {openOrder && (
                <Modal
                  close={() => closeModal()}
                  size="modal-sm" //for other size's use `modal-lg, modal-md, modal-sm`
                >
                  <ShipmentPopUp
                    onHide={closeModal} //FailurePopUp
                  />
                </Modal>
              )}
              {failedPop && (
                <Modal
                  close={() => closeModalFail()}
                  size="modal-sm" //for other size's use `modal-lg, modal-md, modal-sm`
                >
                  <ShipmentFailPopUp
                    onHide={closeModalFail} //FailurePopUp
                    shipmentError={shipmentError}
                  />
                </Modal>
              )}
            </div>
          </div>
      </div>
    </div>
  );
};

export default ReviewOrder;
