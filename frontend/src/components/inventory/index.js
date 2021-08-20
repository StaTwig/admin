import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './style.scss';
import Table from '../../shared/table';
import TableFilter from '../../shared/advanceTableFilter';
import {
  getInventoryAnalytics
} from '../../actions/analyticsAction';
import {getProductList} from '../../actions/productActions';
import TotalInventoryAdded from '../../assets/icons/TotalInventoryAddedcopy.svg';
import currentinventory from '../../assets/icons/CurrentInventory.svg';
import Expiration from '../../assets/icons/TotalVaccinenearExpiration.svg';
import TotalVaccineExpired from '../../assets/icons/TotalVaccineExpired.svg';
import Add from '../../assets/icons/add.svg';
import user from '../../assets/icons/brand.svg';
import Package from '../../assets/icons/package.svg';
import calender from '../../assets/icons/calendar.svg';
import Status from '../../assets/icons/Status.svg';
import Quantity from '../../assets/icons/Quantity.png';
import Product from '../../assets/icons/Producttype.png';import {useDispatch, useSelector} from "react-redux";
import {getInventories, resetInventories, getInventoryDetails} from "../../actions/inventoryActions";

const Inventory = props => {
  const headers = {
    coloumn1: 'Product Name',
    coloumn2: 'Product Category',
    // coloumn3: 'Manufacturer',
    coloumn3: 'Date',
    coloumn4: 'Quantity',
    coloumn5: 'Status',
    

    img1: <img src={Product} width="16" height="16" />,
    img2: <img src={Quantity} width="24" height="16" />,
    // img3: <img src={user} width="16" height="16" />,
    img3: <img src={calender} width="16" height="16" />,
    img4: <img src={Quantity} width="24" height="16" />,
    img5: <img src={Status} width="16" height="16" />,
    
  };

  const tableHeaders = {
    coloumn1: 'Product Name',
    // coloumn2: 'Manufacturer',
    coloumn3: 'Quantity',
  };
  const MAX_LENGTH = 20;
  const [inventoryNearExpiration, setInventoryNearExpiration] = useState('');
  const [inventoryExpired, setInventoryExpired] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [stockOut, setStockOut] = useState('');

  const [inventoriesCount, setInventoriesCount] = useState('');
  const [currentInventoriesCount, setCurrentInventoriesCount] = useState('');
  const [productsList,setProductsList] = useState([]);
  const dispatch = useDispatch();
  /* const colors = ["#ffbcc4", "#c1e3f2", "#ffc18c", "#ffef83",
        "#d4e7ff", "#e0b0ff", "#F1EFCE", "#D7FAF1", "#F2B6AF" ];*/
  const colors = ["#94d2bd", "#d9ed92", "#ffe5d9", "#d8e2dc","#FFE194", "#E8F6EF", "#B8DFD8","#87DFD6", "#FBFD8A","#94d2bd", "#d9ed92", "#ffe5d9", "#d8e2dc",
                   "#FFE194", "#E8F6EF", "#B8DFD8","#87DFD6", "#FBFD8A","#94d2bd", "#d9ed92", "#ffe5d9", "#d8e2dc","#FFE194", "#E8F6EF", "#B8DFD8","#87DFD6", "#FBFD8A" ];

  const [inventoryAnalytics,setInventoryAnalytics]= useState({})
        // useEffect(() => {
        //   async function fetchData() {
        //     const result = await getInventoryAnalytics();
        //     setInventoryAnalytics(result.data.inventory);
        //   }
        //   fetchData();
        // }, []);

        const [skip, setSkip] = useState(0);
        const [limit, setLimit] = useState(10);
        const [count, setCount] = useState(0);
        const [dateFilter, setDateFilter] = useState("");
        const [productNameFilter, setProductNameFilter] = useState("");
        const [productCategoryFilter, setProductCategoryFilter] = useState("");
        const [manufacturerFilter, setManufacturerFilter] = useState("");
        const [statusFilter, setStatusFilter] = useState("");

     useEffect(() => {
    async function fetchData() {
      const result = await getProductList();
      console.log(result);
      setProductsList(result.message);
      const resultAnalytics = await getInventoryAnalytics();
      
      setInventoryAnalytics(resultAnalytics.data.inventory);
      setInventoriesCount(
        resultAnalytics.data.inventory.totalProductsAddedToInventory
      );
      setCurrentInventoriesCount(
        resultAnalytics.data.inventory.totalProductsInInventory
      );
      // setInventoryNearExpiration(
      //   resultAnalytics.data.inventory.batchExpiringInSixMonths
      // );
      setInventoryNearExpiration(
        resultAnalytics.data.inventory.batchNearExpiration
      );
      // setInventoryExpired(
      //   resultAnalytics.data.inventory.batchExpiredLastYear
      // );
      setInventoryExpired(
        resultAnalytics.data.inventory.batchExpired
      );
      setProductCategory(
        resultAnalytics.data.inventory.totalProductCategory
      )
      setStockOut(
        resultAnalytics.data.inventory.stockOut
      )

    }
    fetchData();
  }, []);


  const onPageChange = async (pageNum) => {
    console.log("onPageChange =========>", pageNum)
    const recordSkip = (pageNum-1)*limit;
    setSkip(recordSkip);
    dispatch(getInventories(recordSkip, limit, dateFilter, productNameFilter, productCategoryFilter, statusFilter));  //(skip, limit, dateFilter, productName, productCategoryFilter, status)
  };

  const setDateFilterOnSelect = async (dateFilterSelected) => {
    console.log("setDateFilterOnSelect =========>", dateFilterSelected)
    setDateFilter(dateFilterSelected);
    setSkip(0);
    dispatch(getInventories(0, limit, dateFilterSelected,  productNameFilter, productCategoryFilter, statusFilter));  //(skip, limit, dateFilter, productName, productCategoryFilter, status)
  }

  const setInventoryStatusFilterOnSelect = async (statusFilterSelected) => {
    console.log("setInventoryStatusFilterOnSelect =========>", statusFilterSelected);
    setStatusFilter(statusFilterSelected);
    setSkip(0);
      dispatch(getInventories(0, limit, dateFilter, productNameFilter, productCategoryFilter, statusFilterSelected));  //(skip, limit, dateFilter, productName, productCategoryFilter, status)
  }

  const setInventoryProductNameFilterOnSelect = async (productNameFilterSelected) => {
    console.log("setInventoryProductNameFilterOnSelect =========>", productNameFilterSelected)
    setProductNameFilter(productNameFilterSelected);
    setSkip(0);
      dispatch(getInventories(0, limit, dateFilter, productNameFilterSelected, productCategoryFilter, statusFilter));  //(skip, limit, dateFilter, productName, productCategoryFilter, status)
  }

  const setInventoryManufacturerFilterOnSelect = async (manufacturerFilterSelected) => {
    console.log("setInventoryManufacturerFilterOnSelect =========>", manufacturerFilterSelected)
    setManufacturerFilter(manufacturerFilterSelected);
    setSkip(0);
      dispatch(getInventories(0, limit, dateFilter, productNameFilter, manufacturerFilterSelected, statusFilter));  //(skip, limit, dateFilter, productName, productManufacturer, status)
  }

  const setInventoryProductCategoryFilterOnSelect = async (categoryFilterSelected) => {
    console.log("setInventoryProductCategoryFilterOnSelect =========>", categoryFilterSelected)
    setProductCategoryFilter(categoryFilterSelected);
    setSkip(0);
      dispatch(getInventories(0, limit, dateFilter, productNameFilter, categoryFilterSelected, statusFilter));  //(skip, limit, dateFilter, productName, productCategory, status)
  }
  return (
    <div className="inventory">
      <div className="d-flex justify-content-between">
        <h1 className="breadcrumb">INVENTORY </h1>
        <div className="d-flex">
          <Link to="/newinventory">
            <button className="btn btn-yellow mt-2">
              <img src={Add} width="13" height="13" className="mr-2" />
              <span><b>Add Inventory</b></span>
            </button>
          </Link>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col">
          <Link to="/productcategory">
            <div className="panel">
              <div className="picture truck-bg">
                <img src={TotalInventoryAdded} alt="truck"/>
              </div>
              <div className="d-flex flex-column">
                <div className="title truck-text font-weight-bold">Total Product Category</div>
                
                <div className="count truck-text">{inventoriesCount} {inventoryAnalytics?.totalProductCategory}</div>
              </div>
            </div>
          </Link>
        </div>
        <div className="col">
          <Link to="/productoutofstock">
          <div className="panel">
            <div className="picture sent-bg">
              <img src={currentinventory} alt="truck" />
            </div>
            <div className="d-flex flex-column">
              <div className="title sent-text font-weight-bold">Product Out Of Stock</div>
              <div className="sent-text count">{currentInventoriesCount}{inventoryAnalytics?.stockOut}</div>
              </div>
            </div>
          </Link>      
              </div>
          
        <div className="col">
          <Link to="/batchnearexpiry/product">
          <div className="panel">
            <div className="picture recived-bg">
              <img src={Expiration} alt="truck" />
            </div>
            <div className="d-flex flex-column">
              <div className="title recived-text font-weight-bold">Batch near Expiration</div>
              {/* <div className="tab-container">
                <div
                  className="tab-item active"
                  onMouseLeave={() =>
                    setInventoryNearExpiration(
                      inventoryAnalytics.batchExpiringInSixMonths
                    )
                  }
                  onMouseEnter={() =>
                    setInventoryNearExpiration(
                      inventoryAnalytics.batchExpiringInSixMonths
                    )
                  }
                >
                </div>
                <div
                  className="tab-item"
                  onMouseLeave={() =>
                    setInventoryNearExpiration(
                      inventoryAnalytics.batchExpiringInSixMonths
                    )
                  }
                  onMouseEnter={() =>
                    setInventoryNearExpiration(
                      inventoryAnalytics.batchExpiringInThreeMonths
                    )
                  }
                >
                </div>
                <div
                  className="tab-item"
                  onMouseLeave={() =>
                    setInventoryNearExpiration(
                      inventoryAnalytics.batchExpiringInSixMonths
                      )
                  }
                  onMouseEnter={() =>
                    setInventoryNearExpiration(
                      inventoryAnalytics.batchExpiringThisMonth
                    )
                  }
                >
                </div>
                <div
                  className="tab-item"
                  onMouseLeave={() =>
                    setInventoryNearExpiration(
                      inventoryAnalytics.batchExpiringInSixMonths
                    )
                  }
                  onMouseEnter={() =>
                    setInventoryNearExpiration(
                      inventoryAnalytics.batchExpiringThisWeek
                    )
                  }
                >
              </div>
              </div> */}
              <div className="recived-text count">
                {inventoryNearExpiration}
              </div>
            </div>
          </div>
        </Link>
        </div>
        <div className="col">
          <Link to="/batchexpired">
          <div className="panel">
            <div className="picture transit-bg">
              <img src={TotalVaccineExpired} alt="truck" />
            </div>
            <div className="d-flex flex-column">
              <div className="title transit-text font-weight-bold">Batch Expired</div>
              {/* <div className="tab-container">
                <div
                  className="tab-item active"
                  onMouseLeave={() =>
                    setInventoryExpired(
                      inventoryAnalytics.batchExpiredLastYear
                    )
                  }
                  onMouseEnter={() =>
                    setInventoryExpired(
                      inventoryAnalytics.batchExpiredLastYear
                    )
                  }
                >
                </div>
                <div
                  className="tab-item"
                  onMouseLeave={() =>
                    setInventoryExpired(
                      inventoryAnalytics.batchExpiredLastYear
                    )
                  }
                  onMouseEnter={() =>
                    setInventoryExpired(
                      inventoryAnalytics.batchExpiredLastMonth
                    )
                  }
                >
                </div>
                <div
                  className="tab-item"
                  onMouseLeave={() =>
                    setInventoryExpired(
                      inventoryAnalytics.batchExpiredLastYear
                    )
                  }
                  onMouseEnter={() =>
                    setInventoryExpired(
                      inventoryAnalytics.batchExpiredLastWeek
                    )
                  }
                >
                </div>
                <div
                  className="tab-item"
                  onMouseLeave={() =>
                    setInventoryExpired(
                      inventoryAnalytics.batchExpiredLastYear
                    )
                  }
                  onMouseEnter={() =>
                    setInventoryExpired(
                      inventoryAnalytics.batchExpiredToday
                    )
                  }
                >
                </div>
              </div> */}
              <div className="transit-text count">{inventoryExpired}</div>
            </div>
          </div>
          </Link>
        </div>
      </div>
      <div className="full-width-ribben">
        
      <TableFilter data={headers} inventoryFilterData={props.inventoryFilterData} setInventoryProductNameFilterOnSelect={setInventoryProductNameFilterOnSelect} setInventoryManufacturerFilterOnSelect={setInventoryManufacturerFilterOnSelect}  setInventoryStatusFilterOnSelect={setInventoryStatusFilterOnSelect} setDateFilterOnSelect={setDateFilterOnSelect} setInventoryProductCategoryFilterOnSelect={setInventoryProductCategoryFilterOnSelect} 
        fb="80%"/>
      </div>
      <div className="ribben-space">
        <div className="row no-gutter">
        <div className="col-sm-12 col-xl-9 rTableHeader">
            <Table data={tableHeaders} {...props} colors={colors}inventoryCount ={props.inventoriesCount} onPageChange={onPageChange} />
          </div>
          <div className="col-sm-12 col-xl-3">
            <div className="list-container">
              <div className="d-flex justify-content-between align-items-center ml-4">
                <h4><b>Product List</b></h4>
                <Link to="/productcategory">
                  <button className="btn btn-link mr-3"><b>View all</b></button>
                </Link>
              </div>
              {
                console.log(productsList)
              }
              <div className="overflow" style={{height:"800px",overflowX:"hidden"}}>
              <div className="row">
                {productsList?.map((product, index) => (
                  <div className="col-sm-6" key={index}>
                    <div className="d-flex card flex-column align-items-center"  style={{backgroundColor: colors[index]}}>
                    <div className="round-sign">
                    {product.productName.length <= MAX_LENGTH ?
                      (<div>{product.productName}</div>) : 
                      <div>{`${product.productName.substring(0, MAX_LENGTH)}...`}</div>
                    }
                    </div>
                      
                      {/* <p className="product">{product.productName}</p> */}
                      <h3 className="qty">Qty : {product.quantity}<span>{"  ("}</span>{product.unitofMeasure && product.unitofMeasure.name ? <span>{product.unitofMeasure.name}</span>:""}<span>{")"}</span></h3>
                    </div>
                  </div>
                ))}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
