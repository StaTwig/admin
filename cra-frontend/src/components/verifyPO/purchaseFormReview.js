import React, { useState } from "react";
import ProductsTableReview from "./productsReview";
import { useSelector, useDispatch } from "react-redux";
import { createPO, setEditPos, resetEditPos } from "../../actions/poActions";
import Pen from "../../assets/icons/po.svg";
import Modal from "../../shared/modal";
import PoPopUp from "./poPopUp";
import "./style.scss";

const tableHeader = ["Product ID", "Product Name", "Manufacturer", "Quantity"];

const PurchaseFormReview = (props) => {
  const dispatch = useDispatch();
  const month = new Date().getMonth() + 1;
  const todayDate =
    new Date().getDate() + "/" + month + "/" + new Date().getFullYear();
  const [openCreatedPo, setOpenCreatedPo] = useState(false);
  const [modalProps, setModalProps] = useState({});
  const reviewPo = useSelector((state) => {
    return state.reviewPo;
  });

  const closeModal = () => {
    props.setEditMode(false);
  };

  const onEdit = () => {
    dispatch(setEditPos(reviewPo));
    props.setEditMode(true);
  };

  const onAssign = async () => {
    const data = reviewPo;
    const result = await createPO(data);
    setOpenCreatedPo(true);
    if (result.status === 200) {
      dispatch(resetEditPos());
      setModalProps({
        message: "Created Successfully!",
        productId: result.data.orderID,
        type: "Success",
      });
    } else if (result.status === 500) {
      setModalProps({
        message: result.data.message,
        productId: result.data.orderID,
        type: "Failure",
      });
    }
  };
  return (
    <div className='purchaseform'>
      <p className='date-alignment'>Date: {todayDate}</p>
      <div className='d-flex justify-content-between'>
        <div className='input-group'>
          <label className='reference'>External PO ID</label>
          <input
            disabled
            type='text'
            className='form-control'
            value={reviewPo.data.ExternalPoId}
          />
        </div>
        <div className='input-group'>
          <label className='reference'>Organisation ID</label>
          <input
            disabled
            type='text'
            className='form-control'
            value={reviewPo.data.OrgId}
          />
        </div>
      </div>
      <div className='d-flex justify-content-between'>
        <div className='input-group'>
          <label className='reference'>Vendor Name</label>
          <input
            disabled
            type='text'
            className='form-control'
            value={reviewPo.data.vendorName}
          />
        </div>
        <div className='input-group'>
          <label className='reference'>Vendor ID</label>
          <input
            disabled
            type='text'
            className='form-control'
            value={reviewPo.data.vendorId}
          />
        </div>
      </div>
      <div className='d-flex justify-content-between'>
        <div className='input-group'>
          <label className='reference'>To Delivery Location</label>
          <input
            disabled
            type='text'
            className='form-control'
            value={reviewPo.data.toDeliveryLocation}
          />
        </div>
        <div className='input-group'>
          <label className='reference'>To Delivery ID</label>
          <input
            disabled
            type='text'
            className='form-control'
            value={reviewPo.data.deliveryId}
          />
        </div>
      </div>
      <ProductsTableReview
        tableHeader={tableHeader}
        products={reviewPo.data.products}
        materialId={reviewPo.data.material}
      />

      <button className='btn btn-orange review ' onClick={onAssign}>
        CREATE
      </button>

      <button className='btn edit mr-4' onClick={onEdit}>
        <img src={Pen} width='15' height='15' className=' mr-2' alt='Edit' />
        <span>EDIT</span>
      </button>

      {openCreatedPo && (
        <Modal
          close={() => closeModal()}
          size='modal-sm' //for other size's use `modal-lg, modal-md, modal-sm`
        >
          <PoPopUp onHide={closeModal} {...modalProps} />
        </Modal>
      )}
    </div>
  );
};

export default PurchaseFormReview;
