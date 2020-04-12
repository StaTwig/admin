import React from 'react'

import user from '../../assets/icons/brand.svg';
import Package from '../../assets/icons/package.svg';
import calender from '../../assets/icons/calendar.svg';
import Status from '../../assets/icons/Status.svg';
import updownarrow from '../../assets/icons/up-and-down-1.svg';
import FilterIcon from '../../assets/icons/Filter.svg';
import ExportIcon from '../../assets/icons/Export.svg';
import dropdownIcon from '../../assets/icons/drop-down.svg';

import './style.scss'

const AdvanceTableFilter = () => {
  return (
    <div className="filter">
      <div className="d-flex justify-content-between">
        <div className="row" style={{ flexBasis: '70%' }}>
        <div className="box col">
          <div className="filter-item">
              <div className="icon mr-2">
                <img src={Package} width="16" height="16" />
              </div>
              <div className="filterTitle">Product Type</div>
            <div className="filterAction">
              <img src={updownarrow} width="9" height="9" />
            </div>
          </div>
        </div>
        <span className="divider" />
        <div className="box col">
          <div className="filter-item">
              <div className="icon mr-2">
                <img src={user} width="16" height="16" />
              </div>
              <div className="filterTitle">Manufacturer</div>
            <div className="filterAction">
              <img src={updownarrow} width="9" height="9" />
            </div>
          </div>
        </div>
        <span className="divider" />
        <div className="box col">
          <div className="filter-item">
              <div className="icon mr-2">
                <img src={calender} width="16" height="16" />
              </div>
              <div className="filterTitle">Expiry Date</div>
            <div className="filterAction">
              <img src={updownarrow} width="9" height="9" />
            </div>
          </div>
        </div>
        <span className="divider" />
        <div className="box col">
          <div className="filter-item">
              <div className="icon mr-2">
                <img src={Status} width="16" height="16" />
              </div>
              <div className="filterTitle">Date Added</div>
            <div className="filterAction">
              <img src={updownarrow} width="9" height="9" />
            </div>
          </div>
        </div>
        
        </div>
        <div className="">
        <div className="box col">
          <button className="btn btn-md btn-main-blue mr-2">
            <div className="d-flex align-items-center">
              <img src={FilterIcon} width="16" height="16" className="mr-3" />
              <span>Filter</span>
              <img src={dropdownIcon} width="16" height="16" className="ml-3" />
            </div>
          </button>
          <button className="btn btn-md btn-blue">
            <div className="d-flex  align-items-center">
              <img src={ExportIcon} width="16" height="16" className="mr-3" />
              <span>Export</span>
              <img src={dropdownIcon} width="16" height="16" className="ml-3" />
            </div>
          </button>
        </div>
        </div>
        
      </div>
    </div>
  )
}

export default AdvanceTableFilter;