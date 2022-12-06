import React from "react";
import { useSelector } from "react-redux";

const TopSellerProduct = ({ bs, bigBoxColor, smallBoxColor }) => {
  const {user} = useSelector((state) => state);
  const Distributor = user.type === "DISTRIBUTORS" || user.type === "DROGUERIA" ? true : false;
  return (
    <>
      <div
        className='best-seller-card'
        style={{ backgroundColor: `${bigBoxColor}` }}
      >
        <div
          className='best-seller-icon-space'
          style={{ background: `${smallBoxColor} ` }}
        >
          <i className='fa-solid fa-prescription-bottle-medical light'></i>
        </div>
        <div className='best-seller-content'>
          <div className='product-text-wrapper'>
            <p className='mi-body-sm f-500 mi-reset mi-text-wrap-sm'>
              {bs.productName}
            </p>
          </div>
          <div className='mi-table-data'>
            <p className='mi-body-sm black f-700 mi-reset'>{bs.totalSales}</p>
            <p className='mi-body-xs grey f-500 mi-reset mi-no-wrap'>
              ( {bs?.unitofMeasure?.name} )
            </p>
          </div>

          {Distributor && (
            <div className="manufacturer-details">
              <p className="mi-body-sm grey f-400 mi-reset">{bs.manufacturer}</p>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default TopSellerProduct;
