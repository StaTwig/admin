
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import back from '../../assets/icons/back.png';
import { formatDate } from '../../utils/dateHelper';
import ViewTable from "./table/viewTable";
import { useSelector, useDispatch } from "react-redux";
import OrderIcon from '../../assets/icons/order.svg';
import Pen from '../../assets/icons/pen1.svg';
import ShipmentPopUp from "../neworder/shipmentPopUp";
import './style.scss';

const ReviewOrder = props => {
  const order = useSelector(state => {
    return state?.reviewPo;
  });
  const [openOrder, setOpenOrder] = useState(false);

  const onAssign = async (values) => {
    let error = false;
    const { fromOrg, toOrg, toOrgLoc, products } = values;
    products.forEach((p) => {
      if (p.quantity < 1)
        error = true;
    });

    if (!error) {
      const data = {
        externalId: "",
        supplier: {
          supplierIncharge: user.id,
          supplierOrganisation: senderOrganisation[1],
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
          <span className="p-1 text-info font-weight-bold">Product Details</span>
          <div className="row mt-3">
            <ViewTable
              product={order?.products}
            />
          </div>
        </div>
        <div className="row bg-white shadow p-3 m-3">
          <div className=" pl-4 col-12">
            <span className="p-1 text-primary font-weight-bold">Order From</span>
            <div>
              <div className=" row p-1">
                <div className="col row">
                  <span className="col-4">Organisation Name: </span>
                  <span className="col text-dark font-weight-bold">{order.fromOrg}</span>
                </div>
                <div className="col row">
                  <span className="col-4">Organisation ID: </span>
                  <span className="col font-weight-bold text-dark">{order.supplier?.organisation?.id}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row bg-white shadow p-3 m-3">
          <div className=" pl-4 col-12">
            <span className="p-1 text-primary font-weight-bold">Order To</span>
            <div>
              <div className=" row p-1">
                <div className="col row">
                  <span className="col-4">Organisation Name: </span>
                  <span className="col text-dark font-weight-bold">{order.toOrg}</span>
                </div>
                <div className="col row">
                  <span className="col-4">Organisation ID: </span>
                  <span className="col text-dark font-weight-bold">{order.toOrg}</span>
                </div>
                <div class="w-100"></div>
                <div className="col row col-6 mt-2">
                  <span className="col-4">Delivery Location:</span>
                  <span className="col ml-2 text-dark font-weight-bold">{order.toOrgLoc}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
            <div className="d-flex flex-row-reverse">
              <button className="btn btn-yellow fontSize20 font-bold">
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
            </div>
          </div>
      </div>
    </div>
  );
};

export default ReviewOrder;
