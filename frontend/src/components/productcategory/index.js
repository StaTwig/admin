import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import user from "../../assets/icons/brand.svg";

const ProductCategory = (props) => {
  const { products, t } = props;
  const categoryArray = products
    .map((product) => product.type)
    .filter((value, index, self) => self.indexOf(value) === index);
  const colors = [
    "#D8E5FB",
    "#FFEF83",
    "#DFF1F2",
    "#EBDDED",
    "#D9E5EF",
    "#FFC18C",
    "#F1DDC6",
    "#BCFFF2",
    "#FFD0CA",
    "#63B7AF",
    "#FFCB91",
    "#FFEFA1",
    "#94EBCD",
    "#6DDCCF",
    "#FFE194",
    "#E8F6EF",
    "#B8DFD8",
    "#D8E5FB",
    "#FFEF83",
    "#DFF1F2",
    "#EBDDED",
    "#D9E5EF",
    "#FFC18C",
    "#F1DDC6",
    "#BCFFF2",
    "#FFD0CA",
    "#63B7AF",
    "#FFCB91",
    "#FFEFA1",
    "#94EBCD",
    "#6DDCCF",
    "#FFE194",
    "#E8F6EF",
    "#B8DFD8",
    "#D8E5FB",
    "#FFEF83",
    "#DFF1F2",
    "#EBDDED",
    "#D9E5EF",
    "#FFC18C",
    "#F1DDC6",
    "#BCFFF2",
    "#FFD0CA",
    "#63B7AF",
    "#FFCB91",
    "#FFEFA1",
    "#94EBCD",
    "#6DDCCF",
    "#FFE194",
    "#E8F6EF",
    "#B8DFD8",
  ];
  return (
    <div className="productcategory">
      <div className="d-flex justify-content-between">
        <h1 className="breadcrumb">{t("product_category")}</h1>
        {/* <div
          className="d-flex mr-5"
          style={{ position: "relative", left: "-30px" }}
        >
          <Link to="/addNewProduct">
            <button className="btn btn-yellow">
              <img
                src={Add}
                width="13"
                height="13"
                className="mr-2"
                alt="Add"
              />
              <span>
                <b>{t("add_new_product")}</b>
              </span>
            </button>
          </Link>
        </div> */}
      </div>
      <div className="product-categories mb-4">
        {categoryArray.map((cat, it) => {
          let i = it % 64;
          let sum = 0;
          let displayCount = false;
          let prods = products.filter((p) => p.type === cat);
          return (
            <div className="panel">
              <Link to={`/productinventory/${cat}`}>
                <div className="flex flex-column">
                  <div
                    className=" picture truck-bg"
                    style={{ background: colors[i] }}
                  >
                    <img src={user} alt="truck" />
                  </div>
                  <div
                    className="pt-3 flex"
                    style={{ color: "black", fontWeight: "bolder" }}
                  >
                    {cat}
                  </div>
                  <div className=" pt-2 pl-2 pb-2 d-flex row">
                    {prods.map((product, j) => {
                      let isNull = false;
                      if (displayCount) isNull = true;
                      sum += product.name.length;
                      if (sum > 40 && !isNull) displayCount = true;
                      return isNull ? null : displayCount &&
                        j < prods.length ? (
                        <span
                          className="txt-line text-muted"
                          style={{ border: `2px solid ${colors[i]}` }}
                        >
                          {"+" + (prods.length - j)}
                        </span>
                      ) : (
                        <span
                          className="txt-line text-muted category-string"
                          style={{ border: `2px solid ${colors[i]}` }}
                        >
                          {product.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
        {/* <div className="panel bg-grey align-items-center justify-content-center">
          <div className="flex flex-column">
            <div className=" pt-2 pb-2 d-flex row text-light">
              <Link to="/addNewCategory">+ {t("add_new_category")}</Link>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ProductCategory;
