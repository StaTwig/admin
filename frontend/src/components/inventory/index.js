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

const Inventory = props => {
  const headers = {
    coloumn1: 'Product Name',
    coloumn2: 'Manufacturer',
    coloumn3: 'Quantity',


    img1: <img src={Package} width="16" height="16" />,
    img2: <img src={user} width="16" height="16" />,
    img3: <img src={Status} width="16" height="16" />,
  };

  const tableHeaders = {
    coloumn1: 'Product Name',
    coloumn2: 'Manufacturer',
    coloumn3: 'Quantity',
  };
  const [inventoryNearExpiration, setInventoryNearExpiration] = useState('');
  const [inventoryExpired, setInventoryExpired] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [stockOut, setStockOut] = useState('');

  const [inventoriesCount, setInventoriesCount] = useState('');
  const [currentInventoriesCount, setCurrentInventoriesCount] = useState('');
  const [productsList,setProductsList] = useState([]);

  const colors = ["#ffbcc4", "#c1e3f2", "#ffc18c", "#ffef83",
        "#d4e7ff", "#e0b0ff", "#F1EFCE", "#D7FAF1", "#F2B6AF" ];

  const [inventoryAnalytics,setInventoryAnalytics]= useState({})
        useEffect(() => {
          async function fetchData() {
            const result = await getInventoryAnalytics();
            setInventoryAnalytics(result.data.inventory);
          }
          fetchData();
        }, []);


     useEffect(() => {
    async function fetchData() {
      const result = await getProductList();
      setProductsList(result.message);
      const resultAnalytics = await getInventoryAnalytics();
      setInventoryAnalytics(resultAnalytics.data.inventory);
      setInventoriesCount(
        resultAnalytics.data.inventory.totalProductsAddedToInventory
      );
      setCurrentInventoriesCount(
        resultAnalytics.data.inventory.totalProductsInInventory
      );
      setInventoryNearExpiration(
        resultAnalytics.data.inventory.batchExpiringInSixMonths
      );
      setInventoryExpired(
        resultAnalytics.data.inventory.batchExpiredLastYear
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


  return (
    <div className="inventory">
      <div className="d-flex justify-content-between">
        <h1 className="breadcrumb">INVENTORY </h1>
        <div className="d-flex">
          <Link to="/newinventory">
            <button className="btn btn-yellow font-weight-bold">
              <img src={Add} width="13" height="13" className="mr-2" />
              <span>Add Inventory</span>
            </button>
          </Link>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col">
          <div className="panel" style={{height:'14vh'}}>
            <div className="picture truck-bg">
              <img src={TotalInventoryAdded} alt="truck" />
            </div>
            <div className="d-flex flex-column">
              <div className="title truck-text">Total Product Category</div>
              
              <div className="count truck-text">{inventoriesCount} {inventoryAnalytics.totalProductCategory}</div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="panel" style={{height:'14vh'}}>
            <div className="picture sent-bg">
              <img src={currentinventory} alt="truck" />
            </div>
            <div className="d-flex flex-column">
              <div className="title sent-text">Product Out Of Stock</div>
              <div className="sent-text count">{currentInventoriesCount}{inventoryAnalytics.stockOut}</div>
              </div>
              </div>       
              </div>
          <div className="col">
          <div className="panel" style={{height:'14vh'}}>
            <div className="picture recived-bg">
              <img src={Expiration} alt="truck" />
            </div>
            <div className="d-flex flex-column">
              <div className="title recived-text">Batch near Expiration</div>
              <div className="tab-container">
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
                  6 MONTHS
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
                  3 MONTHS
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
                  THIS MONTH
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
                  THIS WEEK
                </div>
              </div>
              <div className="recived-text count">
                {inventoryNearExpiration}
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="panel" style={{height:'14vh'}}>
            <div className="picture transit-bg">
              <img src={TotalVaccineExpired} alt="truck" />
            </div>
            <div className="d-flex flex-column">
              <div className="title transit-text">Batch Expired</div>
              <div className="tab-container">
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
                  THIS YEAR
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
                  THIS MONTH
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
                  THIS WEEK
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
                  TODAY
                </div>
              </div>
              <div className="transit-text count">{inventoryExpired}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="full-width-ribben">
        <TableFilter data={headers} fb="60%" />
      </div>
      <div className="ribben-space">
        <div className="row no-gutter">
        <div className="col-sm-12 col-xl-9 rTableHeader">
            <Table data={tableHeaders} {...props} colors={colors} loadMore={props.loadMore} onLoadMore={props.onLoadMore} />
          </div>
          <div className="col-sm-12 col-xl-3">
            <div className="list-container">
              <div className="d-flex justify-content-between align-items-center">
                <h4><b>Product List</b></h4>
                <Link to="/productlist/all">
                  <button className="btn btn-link"><b>View all</b></button>
                </Link>
              </div>
              <div className="row overflow">
                {productsList?.map((product, index) => (
                  <div className="col-sm-6" key={index}>
                    <div className="d-flex card flex-column align-items-center"  style={{backgroundColor: colors[index]}}>
                    <div className="round-sign">{product.productName}</div>
                      <p className="product">&nbsp;</p>
                      {/* <p className="product">{product.productName}</p> */}
                      <h3>Qty : {product.quantity}</h3>
                    </div>
                  </div>
                ))}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
