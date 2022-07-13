import React from "react";

const TopSellerProduct = ({ bigBoxColor, smallBoxColor }) => {
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
          <p className="mi-body-md f-500 mi-reset">Paractamol</p>
          <div className="mi-table-data">
            <p className="mi-body-sm black f-700 mi-reset">10000</p>
            <p className="mi-body-xs grey f-500 mi-reset mi-no-wrap">
              ( Packs )
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopSellerProduct;
