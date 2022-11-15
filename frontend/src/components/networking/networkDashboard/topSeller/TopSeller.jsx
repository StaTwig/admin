import React from "react";
import TopSellerProduct from "./TopSellerProduct";

const TopSeller = ({ bestseller, executeScroll, t }) => {
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
    <div className='bestSeller-container'>
      <div className='mi-flex-sb'>
        <h1 className='mi-body-sl dark f-600  mi-reset'>{t("best_seller")}</h1>
        <button
          className='nt-btn nt-btn-xs nt-btn-blue-alt'
          onClick={executeScroll}
        >
          <i className='fa-solid fa-table-list'></i>
          <span>{t("view_reports")}</span>
        </button>
      </div>
      <div className='product-seller-list'>
        {bestseller?.map((bs, index) => (
          <TopSellerProduct
            bs={bs}
            bigBoxColor={bigBoxColorsArray[index]}
            smallBoxColor={smallBoxColorsArray[index]}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default TopSeller;
