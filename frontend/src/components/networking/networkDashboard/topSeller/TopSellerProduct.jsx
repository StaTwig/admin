import React from "react";

const TopSellerProduct = ({ bs, bigBoxColor, smallBoxColor }) => {
  return (
    <>
      <div
        className="best-seller-card"
        style={{ backgroundColor: `${bigBoxColor}` }}
      >
        <div
          className="best-seller-icon-space"
          style={{ background: `${smallBoxColor} ` }}
        >
          <i class="fa-solid fa-prescription-bottle-medical light"></i>
        </div>
        <div className="best-seller-content">
          <div className="product-text-wrapper">
            <p className="mi-body-sm f-500 mi-reset mi-text-wrap-sm">
              {bs.productName}
            </p>
          </div>
          <div className="mi-table-data">
            <p className="mi-body-sm black f-700 mi-reset">{bs.totalSales}</p>
            <p className="mi-body-xs grey f-500 mi-reset mi-no-wrap">
              ( {bs?.unitofMeasure?.name} )
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopSellerProduct;
