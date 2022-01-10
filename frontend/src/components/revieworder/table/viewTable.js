import React from "react";
import ViewRow from "./viewRow";
import "./style.scss";
import mon from "../../../assets/icons/brand.svg";
import Package from "../../../assets/icons/package.svg";
import quantity from "../../../assets/icons/TotalInventoryAdded_2.png";

const ViewTable = (props) => {
  const { t } = props;
  return (
    <div className='table productTable mb-0  mt-2'>
      <div className='d-flex flex-column'>
        <div className='row ml-3 mb-3'>
          <div className='col theader ml-4'>
            <img src={Package} width='14' height='14' alt='Package' />
            <span className='pl-2 text-muted'>{t('product_category')}*</span>
          </div>
          <div className='col theader ml-4'>
            <img src={Package} width='14' height='14' alt='Product' />
            <span className='pl-2 text-muted '>{t('product')}*</span>
          </div>
          <div className='col theader ml-4'>
            <img src={mon} width='14' height='16' alt='Manufacturer' />
            <span className='pl-2 text-muted'>{t('manufacturer')}</span>
          </div>
          <div className='col theader ml-4'>
            <img src={quantity} width='22' height='14' alt='Quantity' />
            <span className='pl-2 text-muted '>{t('quantity')}*</span>
          </div>
        </div>
        <div className=''>
          {props.product.map((product, index) => (
            <ViewRow key={index} prod={product} {...props} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewTable;
