import React, { useState } from "react";
import Modal from "../../shared/modal";
import FailPopup from "./failPopup";

function GridRow({ heading, context }) {
  return (
    <div className="ShipmentInfo--grid-column-alt">
      <p className="info-text-width info-content-text text-secondary">
        {heading}
      </p>
      <p className="info-content-text">{context}</p>
    </div>
  );
}

export default function ProductInfo(props) {
  const { t } = props;
  const [deliveredProduct, setDeliveredProduct] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const closeModalFail = () => {
    setError(false);
  };
  const [error, setError] = useState(false);
  let deliveredProductList = [];
  return Object.keys(props.shipments).length === 0 ? (
    <div className="col-sm-4">
      {" "}
      <div className="row panel justify-content-between">N/A</div>
    </div>
  ) : (
    <div className="col-sm-4">
      {props.shipments.products.map((product, index) => (
        <div className="ShipmentInfo--main-container-alt">
          <div className="ShipmentInfo--info-wrapper">
            <div className="ShipmentInfo--content-space-2">
              <div className="ShipmentInfo--grid-column-alt">
                <p className="info-text-width productheading">
                  {product.productName}
                </p>
                <div className="edit-action-div">
                  {isVisible ? (
                    <button
                      type="button"
                      style={{ width: "3vw", height: "4vh", fontSize: "12px" }}
                      onClick={() => {
                        deliveredProductList.push(deliveredProduct);
                        props.setDelivered(deliveredProductList);
                        props.setIndex(index);
                        // if (deliveredProduct) setIsVisible(false);
                      }}
                      className="btn btn-outline-warning mt-2 mr-1 p-1"
                    >
                      {deliveredProduct ? t("save") : t("edit")}
                    </button>
                  ) : (
                    <span> &nbsp;</span>
                  )}
                </div>
              </div>
              <GridRow
                heading={t("product_name")}
                context={product.productName}
              />
              <GridRow
                heading={t("manufacturer")}
                context={product.manufacturer}
              />
              <GridRow
                heading={t("quantity") + " " + t("sent")}
                context={`${product.productQuantity} ${
                  product.unitofMeasure && product.unitofMeasure.name
                    ? `(${product.unitofMeasure.name})`
                    : ""
                }`}
              />
              <div className="ShipmentInfo--grid-column-alt">
                <p className="info-text-width info-content-text text-secondary">
                  {t("quantity") + " " + t("received")}
                </p>
                <div className="editing-options">
                  {!product["productQuantity"] ? (
                    <p className="info-content-text">
                      {product["productQuantityDelivered"]}
                    </p>
                  ) : (
                    <input
                      className="form-control quantity-received"
                      value={deliveredProductList[index]}
                      placeholder={t("enter_qunatity")}
                      onChange={(e) => {
                        setDeliveredProduct(e.target.value);
                        if (e.target.value <= product.productQuantity) {
                          setError(false);
                          props.onQuantityChange(index, e.target.value);
                          deliveredProductList[index] = e.target.value;
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
              <GridRow
                heading={t("batch_no")}
                context={props.shipments.products[0].batchNumber}
              />
              <GridRow
                heading={t("label_code")}
                context={props.shipments.label.labelId}
              />
            </div>
          </div>
        </div>
      ))}
      {error && (
        <Modal close={() => closeModalFail()} size="modal-sm">
          <FailPopup
            message="Quantity cannot be greater than sent"
            onHide={closeModalFail} //FailurePopUp
            t={t}
          />
        </Modal>
      )}
    </div>
  );
}
