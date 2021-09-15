import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import user from "../../assets/icons/brand.svg";
import Add from "../../assets/icons/add.svg";

const ProductCategory = (props) => {
  const { products } = props;
  const categoryArray = products
    .map((product) => product.type)
    .filter((value, index, self) => self.indexOf(value) === index);

  return (
    <div className='productcategory'>
      <div className='d-flex justify-content-between'>
        <h1 className='breadcrumb'>PRODUCT CATEGORY</h1>
        <div
          className='d-flex mr-5'
          style={{ position: "relative", left: "-30px" }}
        >
          <Link to='/addNewCategory'>
            <button className='btn btn-yellow'>
              <img
                src={Add}
                width='13'
                height='13'
                className='mr-2'
                alt='Add'
              />
              <span>
                <b>Add New Category</b>
              </span>
            </button>
          </Link>
        </div>
      </div>
      <div className='row mb-4'>
        {categoryArray.map((cat) => {
          let sum = 0;
          let displayCount = false;
          let prods = products.filter((p) => p.type === cat);
          return (
            <div className='panel m-2 '>
              <Link to={`/productinventory/${cat}`}>
                <div className='flex flex-column'>
                  <div className=' picture truck-bg'>
                    <img src={user} alt='truck' />
                  </div>
                  <div className='pt-3 flex'>{cat}</div>
                  <div className=' pt-2 pb-2 d-flex row'>
                    {prods.map((product, j) => {
                      let isNull = false;
                      if (displayCount) isNull = true;
                      sum += product.name.length;
                      if (sum > 40 && !isNull) displayCount = true;
                      return isNull ? null : displayCount &&
                        j < prods.length ? (
                        <span className='txt-outline text-muted'>
                          {"+" + (prods.length - j)}
                        </span>
                      ) : (
                        <span className='txt-outline text-muted'>
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
        <div className='panel m-2 bg-grey align-items-center justify-content-center'>
          <div className='flex flex-column'>
            <div className=' pt-2 pb-2 d-flex row text-light'>
              <Link to='/addNewCategory'>+ Add New Category</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;
