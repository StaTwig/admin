import React, { useState } from "react";
import ViewTable from "./table/viewTable";
import { useSelector, useDispatch } from "react-redux";
import OrderIcon from "../../assets/icons/order.svg";
import Pen from "../../assets/icons/pen.svg";
import "./style.scss";
import { turnOn, turnOff } from "../../actions/spinnerActions";
import ReviewOrderPopUp from "./revieworderpopup";

import Modal from "../../shared/modal";
import { createOrder, resetReviewPos } from "../../actions/poActions";
const ReviewOrder = (props) => {
  const { t } = props;
  const order = useSelector((state) => {
    return state?.reviewPo;
  });
  // console.log("order is ", order);
  const dispatch = useDispatch();
  const [failedPop, setFailedPop] = useState(false);
  const [openReviewOrder, setopenReviewOrder] = useState(false);
  const [modalProps, setModalProps] = useState({});

  const onAssign = async () => {
    let error = false;
    const {
      fromOrg,
      toOrg,
      toOrgLoc,
      products,
      typeName,
      rtypeName,
      toOrgCountry,
      toOrgRegion,
    } = order;
    products.forEach((p) => {
      if (p.productQuantity < 1) error = true;
    });
    if (!error) {
      const data = {
        externalId: "",
        supplier: {
          supplierIncharge: null,
          supplierOrganisation: fromOrg,
          supplierType: typeName,
        },
        customer: {
          customerIncharge: null,
          customerOrganisation: toOrg,
          customerType: rtypeName,
          region: toOrgRegion,
          country: toOrgCountry,
          shippingAddress: {
            shippingAddressId: toOrgLoc,
            shipmentReceiverId: null,
          },
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
        setopenReviewOrder(true);
        //setMessage("Status updated Successfully");
        setModalProps({
          message: "Created Successfully!",
          OrderId: result.data.data.poId,
          type: "Success",
          t: t
        });
      } else {
        setFailedPop(true);
        //       setErrorMessage("Not able to create order. Try again!");
      }
    }
  };
  const closeModal = () => {
    setopenReviewOrder(false);
    dispatch(resetReviewPos({}));
    props.history.push("/orders");
  };
  var arr = [];
  arr.push(order);

  return (
    <div className='revieworder text-muted'>
      <div className='d-flex justify-content-between'>
        <h1 className='breadcrumb'>{t('review_new_order')}</h1>
      </div>
      <div className=''>
        <div className=' p-3 m-3 bg-white shadow'>
          <span
            className='mt-5 font-weight-bold'
            style={{ color: "black" }}
          >
            {t('product_details')}
          </span>
          <div className='row mt-3'>
            {arr[0].length !== undefined ? (
              arr[0].map((element) => {
                return <ViewTable product={element?.products} t={t} />;
              })
            ) : (
              <ViewTable product={order?.products} t={t} />
            )}
          </div>
        </div>
        <div className='row bg-white shadow p-3 m-3'>
          <div className=' pl-1 col-12'>
            <span className='p-0 font-weight-bold' style={{ color: "black" }}>
              {t('order_from')}
            </span>
            <div>
              <div className=' row p-3'>
                <div className='col row'>
                  <span className='col-4'>{t('organisation_name')}: </span>
                  <span
                    className='col'
                    style={{ color: "black", fontSize: "14px" }}
                  >
                    {order.fromOrgId}
                  </span>
                </div>
                <div className='col row'>
                  <span className='col-4'>{t('organisation_id')}: </span>
                  <span
                    className='col'
                    style={{ color: "black", fontSize: "14px" }}
                  >
                    {order.typeName}/{order.fromOrg}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='row bg-white shadow p-3 m-3'>
          <div className=' pl-1 col-12'>
            <span className='p-0  font-weight-bold' style={{ color: "black" }}>
              {t('deliver_to')}
            </span>
            <div>
              <div className=' row p-3'>
                <div className='col row'>
                  <span className='col-4'>{t('organisation_name')}: </span>
                  <span
                    className='col'
                    style={{ color: "black", fontSize: "14px" }}
                  >
                    {order.toOrgName}
                  </span>
                </div>
                <div className='col row'>
                  <span className='col-4'>{t('organisation_id')}: </span>
                  <span
                    className='col'
                    style={{ color: "black", fontSize: "14px" }}
                  >
                    {order.rtypeName}/{order.toOrg}
                  </span>
                </div>
                <div className='w-100'></div>
                <div className='col row mt-3'>
                  <span className='col-4'>{t('region')}:</span>
                  <span className=' col  text-dark '>{order.toOrgRegion}</span>
                </div>
                <div className='col row mt-3'>
                  <span className='col-4'>{t('country')}:</span>
                  <span className=' col text-dark '>{order.toOrgCountry}</span>
                </div>
                <div className='w-100'></div>
                <div className='col row  mt-3'>
                  <span className='col-4'>{t('organisation_location')}:</span>
                  <span
                    className='col'
                    style={{ color: "black", fontSize: "14px" }}
                  >
                    {order.toOrgLocName}
                  </span>
                </div>
                <div className='col row  mt-5'>
                  <span className='col-4'></span>
                  <span
                    className='col ml-2 '
                    style={{ color: "black", fontSize: "14px" }}
                  ></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-3 mr-3 mb-3'>
          <div className='d-flex flex-row-reverse'>
            <button
              onClick={onAssign}
              className='btn btn-yellow fontSize20 font-bold'
            >
              <img
                src={OrderIcon}
                width='20'
                height='17'
                className='mr-2 mb-1'
                alt='Order'
              />
              <span>{t('create_new_order')}</span>
            </button>
            <button
              className='btn-edit btn mr-3'
              onClick={() => props.history.push("/neworder")}
            >
              <img
                src={Pen}
                width='15'
                height='15'
                className='mr-2'
                alt='edit'
              />
              <span className="edit-text">{t('edit')}</span>
            </button>
            {openReviewOrder && (
              <Modal
                close={() => closeModal()}
                size='modal-sm' //for other size's use `modal-lg, modal-md, modal-sm`
              >
                <ReviewOrderPopUp
                  onHide={closeModal} // onHide={closeModal} //FailurePopUp
                  t={t}
                  {...modalProps}
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
