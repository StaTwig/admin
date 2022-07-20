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
          <p className="mi-body-md f-500 mi-reset">{bs.name}</p>
          <div className="mi-table-data">
            <p className="mi-body-sm black f-700 mi-reset">{bs.quantity}</p>
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
