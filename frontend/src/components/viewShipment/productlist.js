import React from "react";
import "./style.scss";

const ProductList = (props) => {
  const { t } = props;

  const getVisibleDate = (dateString) => {
    let date = new Date(dateString);
    if (date.toLocaleDateString() === "Invalid Date") return "N/A";
    console.log(`${date.getMonth() + 1}/${date.getFullYear()}`)
    return `${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  return Object.keys(props.shipments).length === 0 ? (
    <div className='row panel justify-content-between'>N/A</div>
  ) : (
    <div>
      {props.shipments?.products?.map((product, index) => (
        <div
          key={index}
          className={
            props.productHighLight
              ? "col panel commonpanle highlight mb-3"
              : "col panel commonpanle mb-3"
          }
        >
          <div className='d-flex flex-row '>
            <ul className='w-75 elemens'>
              <li className='mb-1 text-secondary'>{t("product_name")}</li>
              <li className='mb-1 text-secondary'> {t("manufacturer")}</li>
              <li className='mb-1 text-secondary'>{t("batch_no")}</li>
              <li className='mb-1 text-secondary'>
                {t("quantity") + " " + t("sent")}{" "}
              </li>
              <li className='mb-1 text-secondary'>
                {t("quantity") + " " + t("received")}
              </li>
              <li className='mb-1 text-secondary'>{t("label_code")}</li>
              <li className='mb-1 text-secondary'>{t("mfg_date")}</li>
              <li className='mb-1 text-secondary'>{t("exp_date")}</li>
            </ul>
            <ul className='elemens w-75'>
              <li className='mb-1'>{product.productName}</li>
              <li className='mb-1'>{product.manufacturer}</li>
              <li className='mb-1'>{product?.batchNumber}</li>
              <li className='mb-1'>
                {product.productQuantity}
                <span>{"  ("}</span>
                {product.unitofMeasure && product.unitofMeasure.name ? (
                  <span>{product.unitofMeasure.name}</span>
                ) : (
                  ""
                )}
                <span>{")"}</span>
              </li>
              <li className='mb-1'>
                {product["productQuantityDelivered"]
                  ? product["productQuantityDelivered"]
                  : ""}
                <span>{"  ("}</span>
                {product.unitofMeasure && product.unitofMeasure.name ? (
                  <span>{product.unitofMeasure.name}</span>
                ) : (
                  ""
                )}
                <span>{")"}</span>
              </li>
              <li className='mb-1'>{props.shipments.label.labelId}</li>
              <li className='mb-1'>{getVisibleDate(product.mfgDate)}</li>
              <li className='mb-1'>{getVisibleDate(product.expDate)}</li>
            </ul>
            <div></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
