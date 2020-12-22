import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './style.scss';
import Table from '../../shared/table';
import TableFilter from '../../shared/advanceTableFilter';
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
    coloumn3: 'Expiry Date',
    coloumn4: 'Date Added',

    img1: <img src={Package} width="16" height="16" />,
    img2: <img src={user} width="16" height="16" />,
    img3: <img src={calender} width="16" height="16" />,
    img4: <img src={Status} width="16" height="16" />,
  };

  const tableHeaders = {
    coloumn1: 'Product Name',
    coloumn2: 'Manufacturer',
    coloumn3: 'Batch Number',
    coloumn4: 'Quantity',
    coloumn5: 'Serial Number',
    coloumn6: 'Date',
    coloumn7: 'Exp Date',
  };
  const [inventoryNearExpiration, setInventoryNearExpiration] = useState('');
  const [inventoryExpired, setInventoryExpired] = useState('');
  const [inventoriesCount, setInventoriesCount] = useState('');
  const [currentInventoriesCount, setCurrentInventoriesCount] = useState('');

  const colors = ["#ffbcc4", "#c1e3f2", "#ffc18c", "#ffef83",
        "#d4e7ff", "#e0b0ff", "#F1EFCE", "#D7FAF1", "#F2B6AF" ];

  const products = Object.keys(props.inventoriesCount.dict);
  useEffect(() => {
      setInventoriesCount(
        props.inventoriesCount.counts.inventoryAdded.total,
      );
      setCurrentInventoriesCount(
        props.inventoriesCount.counts.currentInventory.total,
      );
      setInventoryNearExpiration(
        props.inventoriesCount.counts.vaccinesNearExpiration
          .total,
      );
      setInventoryExpired(
        props.inventoriesCount.counts.vaccinesExpired.thisYear,
      )
    }
  , [props.inventoriesCount])



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
                      props.inventoriesCount.counts.inventoryAdded.total,
                    )
                  }
                  onMouseEnter={() =>
                    setInventoriesCount(
                      props.inventoriesCount.counts.inventoryAdded.thisYear,
                    )
                  }
                >
                  This Year
                </div>
                <div
                  className="tab-item"
                  onMouseLeave={() =>
                    setInventoriesCount(
                      props.inventoriesCount.counts.inventoryAdded.total,
                    )
                  }
                  onMouseEnter={() =>
                    setInventoriesCount(
                      props.inventoriesCount.counts.inventoryAdded.thisMonth,
                    )
                  }
                >
                  This Month
                </div>
                <div
                  className="tab-item"
                  onMouseLeave={() =>
                    setInventoriesCount(
                      props.inventoriesCount.counts.inventoryAdded.total,
                    )
                  }
                  onMouseEnter={() =>
                    setInventoriesCount(
                      props.inventoriesCount.counts.inventoryAdded.thisWeek,
                    )
                  }
                >
                  This Week
                </div>
                <div
                  className="tab-item"
                  onMouseLeave={() =>
                    setInventoriesCount(
                      props.inventoriesCount.counts.inventoryAdded.total,
                    )
                  }
                  onMouseEnter={() =>
                    setInventoriesCount(
                      props.inventoriesCount.counts.inventoryAdded.today,
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
                      props.inventoriesCount.counts.currentInventory.total,
                    )
                  }
                  onMouseEnter={() =>
                    setCurrentInventoriesCount(
                      props.inventoriesCount.counts.currentInventory.thisYear,
                    )
                  }
                >
                  This Year
                </div>
                <div
                  className="tab-item"
                  onMouseLeave={() =>
                    setCurrentInventoriesCount(
                      props.inventoriesCount.counts.currentInventory.total,
                    )
                  }
                  onMouseEnter={() =>
                    setCurrentInventoriesCount(
                      props.inventoriesCount.counts.currentInventory.thisMonth,
                    )
                  }
                >
                  This Month
                </div>
                <div
                  className="tab-item"
                  onMouseLeave={() =>
                    setCurrentInventoriesCount(
                      props.inventoriesCount.counts.currentInventory.total,
                    )
                  }
                  onMouseEnter={() =>
                    setCurrentInventoriesCount(
                      props.inventoriesCount.counts.currentInventory.thisWeek,
                    )
                  }
                >
                  This Week
                </div>
                <div
                  className="tab-item"
                  onMouseLeave={() =>
                    setCurrentInventoriesCount(
                      props.inventoriesCount.counts.currentInventory.total,
                    )
                  }
                  onMouseEnter={() =>
                    setCurrentInventoriesCount(
                      props.inventoriesCount.counts.currentInventory.today,
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
                      props.inventoriesCount.counts.vaccinesNearExpiration
                        .total,
                    )
                  }
                  onMouseEnter={() =>
                    setInventoryNearExpiration(
                      props.inventoriesCount.counts.vaccinesNearExpiration
                        .thisYear,
                    )
                  }
                >
                  This Year
                </div>
                <div
                  className="tab-item"
                  onMouseLeave={() =>
                    setInventoryNearExpiration(
                      props.inventoriesCount.counts.vaccinesNearExpiration
                        .total,
                    )
                  }
                  onMouseEnter={() =>
                    setInventoryNearExpiration(
                      props.inventoriesCount.counts.vaccinesNearExpiration
                        .thisMonth,
                    )
                  }
                >
                  This Month
                </div>
                <div
                  className="tab-item"
                  onMouseLeave={() =>
                    setInventoryNearExpiration(
                      props.inventoriesCount.counts.vaccinesNearExpiration
                        .total,
                    )
                  }
                  onMouseEnter={() =>
                    setInventoryNearExpiration(
                      props.inventoriesCount.counts.vaccinesNearExpiration
                        .thisWeek,
                    )
                  }
                >
                  This Week
                </div>
                <div
                  className="tab-item"
                  onMouseLeave={() =>
                    setInventoryNearExpiration(
                      props.inventoriesCount.counts.vaccinesNearExpiration
                        .total,
                    )
                  }
                  onMouseEnter={() =>
                    setInventoryNearExpiration(
                      props.inventoriesCount.counts.vaccinesNearExpiration
                        .today,
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
                      props.inventoriesCount.counts.vaccinesExpired.total,
                    )
                  }
                  onMouseEnter={() =>
                    setInventoryExpired(
                      props.inventoriesCount.counts.vaccinesExpired.thisYear,
                    )
                  }
                >
                  This Year
                </div>
                <div
                  className="tab-item"
                  onMouseLeave={() =>
                    setInventoryExpired(
                      props.inventoriesCount.counts.vaccinesExpired.total,
                    )
                  }
                  onMouseEnter={() =>
                    setInventoryExpired(
                      props.inventoriesCount.counts.vaccinesExpired.thisMonth,
                    )
                  }
                >
                  This Month
                </div>
                <div
                  className="tab-item"
                  onMouseLeave={() =>
                    setInventoryExpired(
                      props.inventoriesCount.counts.vaccinesExpired.total,
                    )
                  }
                  onMouseEnter={() =>
                    setInventoryExpired(
                      props.inventoriesCount.counts.vaccinesExpired.thisWeek,
                    )
                  }
                >
                  This Week
                </div>
                <div
                  className="tab-item"
                  onMouseLeave={() =>
                    setInventoryExpired(
                      props.inventoriesCount.counts.vaccinesExpired.total,
                    )
                  }
                  onMouseEnter={() =>
                    setInventoryExpired(
                      props.inventoriesCount.counts.vaccinesExpired.today,
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
                {products.map((product, index) => (
                  <div className="col-sm-6" key={index}>
                    <div className="d-flex card flex-column align-items-center">
                    <div className="round-sign" style={{backgroundColor: colors[index]}}>{product}</div>
                      <p className="product">{product}</p>
                      <h3>Qty : {props.inventoriesCount.dict[product]}</h3>
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
