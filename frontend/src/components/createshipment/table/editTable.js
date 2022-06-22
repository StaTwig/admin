import React from "react";
import EditRow from "./editRow";
import "./style.scss";
import { batch } from "react-redux";

const EditTable = (props) => {
  const { t } = props;
  return (
    <div className='table productTable mt-2'>
      <div className='d-flex flex-column'>
        <div className='row mb-3'>
          <div className='col theader text-center pro'>{t('product_category')}*</div>
          <div className='col theader text-center pro'>{t('product_name')}*</div>
          <div className='col theader text-center pro'>{t('manufacturer')}</div>
          <div className='col theader text-center pro mr-5'>{t('quantity')}*</div>
          <div
            className='col theader text-center pro mr-5'
            style={{ position: "relative", left: "-60px" }}
          >
            {t('batch_no')}*
          </div>
          {props.enableDelete && (
            <div className=' ml-2 bg-light align-self-center '>&nbsp;</div>
          )}
        </div>
        <div>
          {props.product.map((product, index) => (
            <EditRow prod={product} {...props} index={index} />
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
