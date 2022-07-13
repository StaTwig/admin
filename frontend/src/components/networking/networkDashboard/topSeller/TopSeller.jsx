import React from "react";
import TopSellerProduct from "./TopSellerProduct";

const TopSeller = () => {
  const smallBoxColorsArray = [
    "#FDCD42",
    "#FE8E68",
    "#7D4CDC",
    "#51DFB4",
    "#5C6EE7",
  ];
  const bigBoxColorsArray = [
    "#FDCD4224",
    "#FC8F6A33",
    "#7A3DFD29",
    "#4FE0B333",
    "#02268926",
  ];
  return (
    <div className="bestSeller-container">
      <div className="mi-flex-sb">
        <h1 className="mi-body-lg dark f-600  mi-reset">Best Seller</h1>
        <button className="nt-btn nt-btn-xs nt-btn-blue-alt">
          <i class="fa-solid fa-chart-pie"></i>
          <span>View</span>
        </button>
      </div>
      <div className="product-seller-list">
        {bigBoxColorsArray.map((bigBoxColor, index) => (
          <TopSellerProduct
            bigBoxColor={bigBoxColor}
            smallBoxColor={smallBoxColorsArray[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default TopSeller;
