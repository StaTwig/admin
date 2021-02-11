import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './style.scss';
import Table from '../../shared/table';
import TableFilter from '../../shared/advanceTableFilter';
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
    coloumn1: 'Product Type',
    coloumn2: 'Manufacturer',
    coloumn4: 'Quantity',

    img1: <img src={Package} width="16" height="16" />,
    img2: <img src={user} width="16" height="16" />,
    img3: <img src={calender} width="16" height="16" />,
    img4: <img src={Status} width="16" height="16" />,
  };

  const tableHeaders = {
    coloumn1: 'Product Name',
    coloumn2: 'Manufacturer',
    coloumn3: 'Quantity',
  };
  const [inventoryNearExpiration, setInventoryNearExpiration] = useState('');
  const [inventoryExpired, setInventoryExpired] = useState('');
  const [inventoriesCount, setInventoriesCount] = useState('');
  const [currentInventoriesCount, setCurrentInventoriesCount] = useState('');
  const [productsList,setProductsList] = useState([]);

  const colors = ["#ffbcc4", "#c1e3f2", "#ffc18c", "#ffef83",
        "#d4e7ff", "#e0b0ff", "#F1EFCE", "#D7FAF1", "#F2B6AF" ];

  const products = Object.keys(props.inventoriesCount.dict);
  useEffect(() => {
    async function fetchData() {
      const result = await getProductList();
      setProductsList(result.message);
      setInventoriesCount(
        11 // props.inventoriesCount.counts.inventoryAdded.total,
      );
      setCurrentInventoriesCount(
        32000// props.inventoriesCount.counts.currentInventory.total,
      );
      setInventoryNearExpiration(
        3000 //  props.inventoriesCount.counts.vaccinesNearExpiration .total,
      );
      setInventoryExpired(
      1000 // props.inventoriesCount.counts.vaccinesExpired.thisYear,
      )
     
    }
    fetchData();
  }, [props.inventoriesCount]);


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
          <div className="panel">
            <div className="picture truck-bg">
              <img src={TotalInventoryAdded} alt="truck" />
            </div>
            <div className="d-flex flex-column">
              <div className="title truck-text">Inventory Added</div>
              <div className="tab-container">
                <div
                  className="tab-item active"
                  onMouseLeave={() =>
                    setInventoriesCount(
                     200// props.inventoriesCount.counts.inventoryAdded.total,
                    )
                  }
                  onMouseEnter={() =>
                    setInventoriesCount(
                     200// props.inventoriesCount.counts.inventoryAdded.thisYear,
                    )
                  }
                >
                  This Year
                </div>
                <div
                  className="tab-item"
                  onMouseLeave={() =>
                    setInventoriesCount(
                      150//props.inventoriesCount.counts.inventoryAdded.total,
                    )
                  }
                  onMouseEnter={() =>
                    setInventoriesCount(
                     150 //props.inventoriesCount.counts.inventoryAdded.thisMonth,
                    )
                  }
                >
                  This Month
                </div>
                <div
                  className="tab-item"
                  onMouseLeave={() =>
                    setInventoriesCount(
                     100// props.inventoriesCount.counts.inventoryAdded.total,
                    )
                  }
                  onMouseEnter={() =>
                    setInventoriesCount(
                      100//props.inventoriesCount.counts.inventoryAdded.thisWeek,
                    )
                  }
                >
                  This Week
                </div>
                <div
                  className="tab-item"
                  onMouseLeave={() =>
                    setInventoriesCount(
                      50//props.inventoriesCount.counts.inventoryAdded.total,
                    )
                  }
                  onMouseEnter={() =>
                    setInventoriesCount(
                     50// props.inventoriesCount.counts.inventoryAdded.today,
                    )
                  }
                >
                  Today
                </div>
              </div>
              <div className="truck-text count">{inventoriesCount}</div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="panel">
            <div className="picture sent-bg">
              <img src={currentinventory} alt="truck" />
            </div>
            <div className="d-flex flex-column">
              <div className="title sent-text">Total Inventory</div>
              <div className="tab-container">
                <div
                  className="tab-item active"
                  onMouseLeave={() =>
                    setCurrentInventoriesCount(
                      200//props.inventoriesCount.counts.currentInventory.total,
                    )
                  }
                  onMouseEnter={() =>
                    setCurrentInventoriesCount(
                     200 //props.inventoriesCount.counts.currentInventory.thisYear,
                    )
                  }
                >
                  This Year
                </div>
                <div
                  className="tab-item"
                  onMouseLeave={() =>
                    setCurrentInventoriesCount(
                     150// props.inventoriesCount.counts.currentInventory.total,
                    )
                  }
                  onMouseEnter={() =>
                    setCurrentInventoriesCount(
                     150// props.inventoriesCount.counts.currentInventory.thisMonth,
                    )
                  }
                >
                  This Month
                </div>
                <div
                  className="tab-item"
                  onMouseLeave={() =>
                    setCurrentInventoriesCount(
                     100// props.inventoriesCount.counts.currentInventory.total,
                    )
                  }
                  onMouseEnter={() =>
                    setCurrentInventoriesCount(
                      100//props.inventoriesCount.counts.currentInventory.thisWeek,
                    )
                  }
                >
                  This Week
                </div>
                <div
                  className="tab-item"
                  onMouseLeave={() =>
                    setCurrentInventoriesCount(
                     80// props.inventoriesCount.counts.currentInventory.total,
                    )
                  }
                  onMouseEnter={() =>
                    setCurrentInventoriesCount(
                     80 //props.inventoriesCount.counts.currentInventory.today,
                    )
                  }
                >
                  Today
                </div>
              </div>
              <div className="sent-text count">{currentInventoriesCount}</div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="panel">
            <div className="picture recived-bg">
              <img src={Expiration} alt="truck" />
            </div>
            <div className="d-flex flex-column">
              <div className="title recived-text">Vaccines near Expiration</div>
              <div className="tab-container">
                <div
                  className="tab-item active"
                  onMouseLeave={() =>
                    setInventoryNearExpiration(
                     //props.inventoriesCount.counts.vaccinesNearExpiration.total,
                     80
                    )
                  }
                  onMouseEnter={() =>
                    setInventoryNearExpiration(
                    //  props.inventoriesCount.counts.vaccinesNearExpiration.thisYear,
                      80
                       
                    )
                  }
                >
                  This Year
                </div>
                <div
                  className="tab-item"
                  onMouseLeave={() =>
                    setInventoryNearExpiration(
                     // props.inventoriesCount.counts.vaccinesNearExpiration.total,
                     50
                      
                    )
                  }
                  onMouseEnter={() =>
                    setInventoryNearExpiration(
                     // props.inventoriesCount.counts.vaccinesNearExpiration.thisMonth,
                      50
                    )
                  }
                >
                  This Month
                </div>
                <div
                  className="tab-item"
                  onMouseLeave={() =>
                    setInventoryNearExpiration(
                     30// props.inventoriesCount.counts.vaccinesNearExpiration.total,
                    )
                  }
                  onMouseEnter={() =>
                    setInventoryNearExpiration(
                     30// props.inventoriesCount.counts.vaccinesNearExpiration.thisWeek,
                    )
                  }
                >
                  This Week
                </div>
                <div
                  className="tab-item"
                  onMouseLeave={() =>
                    setInventoryNearExpiration(
                    20 // props.inventoriesCount.counts.vaccinesNearExpiration.total,
                    )
                  }
                  onMouseEnter={() =>
                    setInventoryNearExpiration(
                     20// props.inventoriesCount.counts.vaccinesNearExpiration.today,
                    )
                  }
                >
                  Today
                </div>
              </div>
              <div className="recived-text count">
                {inventoryNearExpiration}
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="panel">
            <div className="picture transit-bg">
              <img src={TotalVaccineExpired} alt="truck" />
            </div>
            <div className="d-flex flex-column">
              <div className="title transit-text">Vaccine Expired</div>
              <div className="tab-container">
                <div
                  className="tab-item active"
                  onMouseLeave={() =>
                    setInventoryExpired(
              60//props.inventoriesCount.counts.vaccinesExpired.total,
                    )
                  }
                  onMouseEnter={() =>
                    setInventoryExpired(
                     60// props.inventoriesCount.counts.vaccinesExpired.thisYear,
                    )
                  }
                >
                  This Year
                </div>
                <div
                  className="tab-item"
                  onMouseLeave={() =>
                    setInventoryExpired(
                    50 // props.inventoriesCount.counts.vaccinesExpired.total,
                    )
                  }
                  onMouseEnter={() =>
                    setInventoryExpired(
                     50// props.inventoriesCount.counts.vaccinesExpired.thisMonth,
                    )
                  }
                >
                  This Month
                </div>
                <div
                  className="tab-item"
                  onMouseLeave={() =>
                    setInventoryExpired(
                    40 // props.inventoriesCount.counts.vaccinesExpired.total,
                    )
                  }
                  onMouseEnter={() =>
                    setInventoryExpired(
                    40 // props.inventoriesCount.counts.vaccinesExpired.thisWeek,
                    )
                  }
                >
                  This Week
                </div>
                <div
                  className="tab-item"
                  onMouseLeave={() =>
                    setInventoryExpired(
                     40 //props.inventoriesCount.counts.vaccinesExpired.total,
                    )
                  }
                  onMouseEnter={() =>
                    setInventoryExpired(
                   40 //  props.inventoriesCount.counts.vaccinesExpired.today,
                    )
                  }
                >
                  Today
                </div>
              </div>
              <div className="transit-text count">{inventoryExpired}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="full-width-ribben">
        <TableFilter data={headers} />
      </div>
      <div className="ribben-space">
        <div className="row no-gutter">
        <div className="col-sm-12 col-xl-9 rTableHeader">
            <Table data={tableHeaders} {...props} loadMore={props.loadMore} onLoadMore={props.onLoadMore} />
          </div>
          <div className="col-sm-12 col-xl-3">
            <div className="list-container">
              <div className="d-flex justify-content-between align-items-center">
                <h4>Product List</h4>
                <Link to="/productlist/all">
                  <button className="btn btn-link">View all</button>
                </Link>
              </div>
              <div className="row overflow">
                {productsList.map((product, index) => (
                  <div className="col-sm-6" key={index}>
                    <div className="d-flex card flex-column align-items-center">
                    <div className="round-sign" style={{backgroundColor: colors[index]}}>{product.productName}</div>
                      <p className="product">{product.productId}</p>
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
