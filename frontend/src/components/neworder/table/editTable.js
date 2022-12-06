import React from "react";
import EditRow from "./editRow";
import mon from "../../../assets/icons/brand.svg";
import Package from "../../../assets/icons/package.svg";
import quantity from "../../../assets/icons/TotalInventoryAdded_2.png";
import "./style.scss";

const EditTable = (props) => {
  const { t } = props;
  return (
    <div className='table productTable mb-0 mt-1'>
      <div className='d-flex flex-column'>
        <div className='row mb-2'>
          <div
            className='col-4 mi-line-sm text-center'
            style={{ position: "relative", left: "-40px" }}
          >
            <img src={Package} width='16' height='16' alt='' />
            <span className='ml-2 text-muted'>{t('product_category')}*</span>
          </div>
          <div
            className='col-3 mi-line-sm text-center'
            style={{ position: "relative", left: "-40px" }}
          >
            <img src={Package} width='16' height='16' alt='' />
            <span className='ml-2 text-muted'>{t('product')}*</span>
          </div>
          <div
            className='col mi-line-sm text-center ml-2'
            style={{ position: "relative", left: "10px" }}
          >
            <img src={mon} width='16' height='16' alt='' />
            <span className='ml-2 text-muted'>{t('manufacturer')}</span>
          </div>
          <div
            className='col mi-line-sm text-center mr-5'
            style={{ position: "relative", left: "0px" }}
          >
            <img src={quantity} width='25' height='16' alt='' />
            <span className='ml-2 text-muted'>{t('quantity')}*</span>
          </div>
        </div>
        <div className=''>
          {props.product &&
            props.product.map((product, index) => (
              <EditRow key={index} prod={product} {...props} index={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default EditTable;

/*<div className="input-group-append">
<img src={downArrow} alt="downarrow" width="9" height="9" />
</div>*/
