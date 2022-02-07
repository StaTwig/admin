import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import TotalInventoryAdded from "../../assets/icons/TotalProductCategory.png";
import ProductSelected from "../../assets/icons/TotalProductCategory-selected.png";
import Add from "../../assets/icons/add.svg";
import user from "../../assets/icons/brand.svg";
import Quantity from "../../assets/icons/Quantity.png";
import Product from "../../assets/icons/Producttype.png";
import Next from "../../assets/icons/back.png";

const ProductInventory = (props) => {
  const { t } = props;
  const [category, setCategory] = useState(props.match.params?.category);
  const [data, setData] = useState([]);
  const [enable, setEnable] = useState(true);
  const { products, inventories } = props;
  const [scrollX, setscrollX] = useState(0);
  const [scrolEnd, setscrolEnd] = useState(false);
  const categoryArray = products
    .map((product) => product.type)
    .filter((value, index, self) => self.indexOf(value) === index);

  const categoryArrayNew = [
    category,
    ...categoryArray.filter((value) => value !== category),
  ];
  useEffect(() => {
    if (props.match && props.match.params && props.match.params.category) {
      let prodArray = [];
      inventories.map((val) => {
        // if(val.payloadData && val.payloadData.data && val.payloadData.data.products && val.payloadData.data.products.length){
        //     val.payloadData.data.products.map((productRecord)=>{
        if (val.products.type === props.match.params?.category) {
          prodArray.push(val);
          //     }
          // })
        }
      });
      setData(prodArray);
    } else {
      setEnable(false);
      const inv = inventories.filter((r) => r.inventoryDetails.quantity <= 0);
      setData(inventories.filter((r) => r.inventoryDetails.quantity <= 0));
    }
  }, [inventories, props]);
  const changeType = (cat) => {
    setCategory(cat);
    let prodArray = [];
    inventories.map((val) => {
      // if(val.payloadData.data.products){
      // val.payloadData.data.products.map((productRecord)=>{
      if (val.products.type === cat) {
        prodArray.push(val);
      }
      // })
      // }
    });
    setData(prodArray);
  };
  const ref = useRef(null);

  const scrollCheck = () => {
    setscrollX(ref.current.scrollLeft);
    if (
      Math.floor(ref.current.scrollWidth - ref.current.scrollLeft) <=
      ref.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };

  const scroll = (shift) => {
    ref.current.scrollLeft += shift;
    setscrollX(scrollX + shift);

    if (
      Math.floor(ref.current.scrollWidth - ref.current.scrollLeft) <=
      ref.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };
  // setData(inventories.filter(r => r.payloadData.data.products[0].type == cat));

  function scrollingCategory() {
    return (
      <div className='main'>
          <div
            onScroll={scrollCheck}
            style={{ overflowX: "scroll" }}
            className='row ml-0 flex-nowrap'
            ref={ref}
          >
            {categoryArrayNew.map((cat) => (
              <div
                className={`panel m-2 ${category === cat && `active`}`}
                onClick={() => changeType(cat)}
              >
                <div className='flex flex-column'>
                  <div className='picture'>
                    <img
                      src={
                        category === cat ? TotalInventoryAdded : ProductSelected
                      }
                      alt='truck'
                    />
                  </div>
                  <div
                    className={`pt-3 flex text-dark font-weight-bold ${
                      category === cat || `text-muted`
                    }`}
                  >
                    {cat}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className='toggle-button-right' onClick={() => scroll(+100)}>
            <img src={Next} className='toggle-icon-next' alt='truck' />
          </button>
          <button className='toggle-button-left' onClick={() => scroll(-100)}>
            <img src={Next} className='toggle-icon-back' alt='truck' />
          </button>
        </div>
    )
  }

  function nonScrollingCategory() {
    return (
      <div  className='row ml-0 flex-nowrap'>
            {categoryArrayNew.map((cat) => (
              <div
                className={`panel m-2 ${category === cat && `active`}`}
                onClick={() => changeType(cat)}
              >
                <div className='flex flex-column'>
                  <div className='picture'>
                    <img
                      src={
                        category === cat ? TotalInventoryAdded : ProductSelected
                      }
                      alt='truck'
                    />
                  </div>
                  <div
                    className={`pt-3 flex text-dark font-weight-bold ${
                      category === cat || `text-muted`
                    }`}
                  >
                    {cat}
                  </div>
                </div>
              </div>
            ))}
        </div>
    )
  }



  return (
    <div className='productinventory'>
      <div className='d-flex justify-content-between'>
        <h1 className='breadcrumb'>
          {enable ? t("product_category") : t("products_out_of_stock")}
        </h1>
        <div className='d-flex'>
          <Link to='/addNewCategory'>
            <button
              className='btn btn-yellow mr-3'
              style={{ position: "relative", top: "-15px" }}
            >
              <img
                src={Add}
                width='13'
                height='13'
                className='mr-2 mb-1'
                alt='Add'
              />
              <span>
                <b style={{textTransform: "uppercase"}} >{t('add_new_category')}</b>
              </span>
            </button>
          </Link>
        </div>
      </div>
      {enable && categoryArrayNew.length > 5 ? scrollingCategory() : nonScrollingCategory() }
      <div className='row'>
        <div className='p-2 mt-3 rounded full-width-ribbon'>
          <div className='row filter'>
            <div className='col-3'>
              <img src={Product} width='16' height='16' alt='Product Name' />
              <span className='ml-2 font-small'>{t('product_name')}</span>
            </div>
            <div className='col-3'>
              <img
                src={Quantity}
                width='25'
                height='16'
                alt='Product Category'
              />
              <span className='ml-2 font-small'>{t('product_category')}</span>
            </div>
            <div className='col-3'>
              <img src={user} width='16' height='16' alt='Manufacturer' />
              <span className='ml-2 font-small'>{t('manufacturer')}</span>
            </div>
            <div className='col-2'>
              <img src={Quantity} width='25' height='16' alt='Quantity' />
              <span className='ml-2 font-small'>{t('quantity')}</span>
            </div>
          </div>
        </div>
        <div className='ribbon-space col'>
          {data.map(
            (inv, i) => (
              <div key={i} className='col mb-3 rounded row bg-white shadow'>
                <div className='col-3 txt '>
                  {inv.products.name ? inv.products.name : "N/A"}
                </div>
                <div className='col-3 txt1'>
                  {inv.products.type ? inv.products.type : "N/A"}
                </div>
                <div className='col-2 txt1'>
                  {inv.products.manufacturer
                    ? inv.products.manufacturer
                    : "N/A"}
                </div>
                <div className='col-2 txt1 text-right'>
                  {inv.inventoryDetails.quantity
                    ? inv.inventoryDetails.quantity
                    : "0"}
                  {"  ("}
                  {inv.products.unitofMeasure
                    ? inv.products.unitofMeasure.name
                    : "N/A"}
                  {")"}
                </div>
                <div className='col'>
                  <button
                    type='button'
                    onClick={() =>
                      props.history.push(`/viewproduct`, { data: inv })
                    }
                    className='bttn1-blue blue-primary'
                  >
                    {t('show_more')}
                  </button>
                </div>
              </div>
            )
            // </div>
          )}
          {data?.length === 0 && (
            <div className='col-12 p-3 mb-3 rounded row bg-white shadow'>
              <div className='col-12 txt text-center txtBlue'>
                {t('no_records_found')}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductInventory;
