import React, { useState } from "react";
// import traceDrop from "../../assets/icons/traceDrop.png";
// import Down from "../../assets/icons/up.png";
import Modal from "../../shared/modal";
import FailPopup from "./failPopup";
import "./style.scss";
const ProductList = (props) => {
  const { t } = props;
  const [deliveredProduct, setDeliveredProduct] = useState();
  const [isVisible, setIsVisible] = useState(true);
  const [error, setError] = useState(false);
  let deliveredProductList = [];
  const closeModalFail = () => {
    setError(false);
  };
  return Object.keys(props.shipments).length === 0 ? (
    <div className='row panel justify-content-between'>N/A</div>
  ) : (
    <>
      {props.shipments.products.map((product, index) => (
        <div className='col-sm-4 '>
          <div
            className={
              props.productHighLight
                ? "col panel commonpanle highlight mb-5 "
                : "col panel commonpanle mb-5"
            }
          >
           <div className='container ml-2'>
              <div className='row'>
                <div className='col mt-2 productheading'>
                  {product.productName}
                </div>
                <div className='col-sm mb-2 ' style={{ textAlign: "right" }}>
                  {isVisible ? (
                    <button
                      type='button'
                      style={{ width: "3vw", height: "4vh", fontSize: "12px" }}
                      onClick={() => {
                        deliveredProductList.push(deliveredProduct);
                        props.setDelivered(deliveredProductList);
                        props.setIndex(index);
                        if (deliveredProduct) setIsVisible(false);
                      }}
                      className='btn btn-outline-warning mt-2 mr-1 p-1'
                    >
                      {deliveredProduct ? t("save") : t("edit")}
                    </button>
                  ) : (
                    <span> &nbsp;</span>
                  )}
                </div>
              </div>
              <div className='row'>
                <div className='col-sm mb-1 text-secondary styler'>
                  {t("product_name")}
                </div>
                <div className='col-sm mb-1 text-secondary styler'>
                  {product.productName}
                </div>
              </div>
                <div className='row'>
                  <div className='col-sm mb-1 text-secondary styler'>
                    {t("manufacturer")}
                  </div>
                  <div className='col-sm mb-1 text-secondary styler'>
                    {product.manufacturer}
                  </div>
                </div>
                <div className='row'>
                  <div className='col-sm mb-1 text-secondary styler'>
                    {t("quantity") + " " + t("sent")}
                  </div>
                  <div className='col-sm mb-3 text-secondary styler'>
                    {product.productQuantity}
                    <span>{"  ("}</span>
                    {product.unitofMeasure && product.unitofMeasure.name ? (
                      <span>{product.unitofMeasure.name}</span>
                    ) : (
                      ""
                    )}
                    <span>{")"}</span>
                  </div>
                </div>
                <div className='row'>
              <div className='col-sm mb-0 text-secondary styler'>
                {t("quantity") + " " + t("received")}
              </div>
                <div className='col-sm text-secondary styler'>
                  {!product["productQuantity"] ? (
                    product["productQuantityDelivered"]
                  ) : (
                    <input
                      className='form-control quantity-received'
                      value={deliveredProduct}
                      placeholder={t('Enter_the_Quantity')}
                      // maxLength={product.productQuantity.length}
                      onChange={(e) => {
                        setDeliveredProduct(e.target.value);
                        if (e.target.value <= product.productQuantity) {
                          setError(false);
                          props.onQuantityChange(index, e.target.value);
                        } else {
                          e.target.value = "";
                          setDeliveredProduct();
                          props.onQuantityChange(index, e.target.value);
                          setError(true);
                        }
                      }}
                    />
                  )}
                </div>
                </div>
                <div className='row'>
                  <div className='col-sm mb-1 text-secondary styler'>
                    {t("batch_no")}
                  </div>
                  <div className='col-sm mb-1 text-secondary styler'>
                    {props.shipments.products[0].batchNumber}
                  </div>
                </div>
                <div className='row'>
                  <div className='col-sm mb-3 text-secondary styler'>
                    {t("label_code")}
                  </div>
                  <div className='col-sm mb-3 text-secondary styler'>
                    {props.shipments.label.labelId}
                  </div>
                </div>
              </div>
          </div>
        </div>
      ))}
      {error && (
        <Modal
          close={() => closeModalFail()}
          size='modal-sm' //for other size's use `modal-lg, modal-md, modal-sm`
        >
          <FailPopup
            message='Quantity cannot be greater than sent'
            onHide={closeModalFail} //FailurePopUp
          />
        </Modal>
      )}
    </>
  );
};
export default ProductList;
