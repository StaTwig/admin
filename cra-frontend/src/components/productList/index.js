import React  from 'react';
import './style.scss';
import Add from '../../assets/icons/add.svg';
// import Order from '../../assets/icons/order.svg';
import TableFilter from './tableFilter';
import Table from './table';
import {
  Link
} from "react-router-dom";


import mon from '../../assets/icons/brand.svg';
import Package from '../../assets/icons/package.svg';
import calender from '../../assets/icons/calendar.svg';
import Status from '../../assets/icons/Status.svg';
import ExportIcon from '../../assets/icons/Export.svg';
import dropdownIcon from '../../assets/icons/drop-down.svg';
import upAndDown from '../../assets/icons/sidearrow.svg';
import TotalInventoryAdded from "../../assets/icons/TotalInventoryAddedcopy.svg";
import Layers from "../../assets/icons/layers.svg";



const ProductList = props => {

  const { loadMore, onLoadMore } = props;

  const headers = {
    coloumn1: 'Product Name',
    coloumn2: 'Manufacturer',
    coloumn3: 'Batch Number',
    coloumn4: 'Quantity',
    coloumn5: 'Date Added',
    coloumn6: 'Mfg Date',
    coloumn7: 'Expiry Date',
    coloumn8: 'Select',

    img1: <img src={Package} width="16" height="16" alt=""/>,
    img2: <img src={mon} width="16" height="16" alt=""/>,
    img3: <img src={Layers} width="16" height="16" alt=""/>,
    img4: <img src={TotalInventoryAdded} width="20" height="20" alt=""/>,
    img5: <img src={Status} width="16" height="16" alt=""/>,
    img6: <img src={calender} width="16" height="16" alt=""/>,
    img7: <img src={calender} width="16" height="16" alt=""/>,
  
  };

  return (
    <div className="productlist">
      <div className="d-flex justify-content-between">
        <h1 className="breadcrumb">Product List</h1>
        <div className="d-flex">
          <Link to="/inventory">
        <button className="btn btn-outline-primary fontSize20 font-weight-bold mr-4">
          <img src={upAndDown} width="14" height="14" className="mr-2" alt=""/>
            <span>Back to Inventory</span>
          </button>
          </Link>
          <Link to="/addproduct">
          <button className="btn btn-orange fontSize20 font-weight-bold mr-4 product">
          <img src={Add} width="14" height="14" className="mr-2" alt=""/>
            <span>Add New Product</span>
          </button>
          </Link>
          <button className="btn btn-md btn-main-blue export font-weight-bold">
            <div className="d-flex  align-items-center">
              <img src={ExportIcon} width="16" height="16" className="mr-3" alt=""/>
              <span>Export</span>
              <img src={dropdownIcon} width="16" height="16" className="ml-3" alt=""/>
            </div>
          </button>
          
        </div>
      </div>

      <div className="full-width-ribben">
        <TableFilter data={headers} />
      </div>
      <div className="ribben-space">
      <Table {...props}/>
      </div>
      {loadMore && (
          <button className="btn btn-success font-weight-bold" onClick={onLoadMore}>
            Load More
          </button>
        )}
      
    </div>
  );
};

export default ProductList;
