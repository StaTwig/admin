import React from 'react'
import updownarrow from '../../assets/icons/up-and-down-1.svg';
import FilterIcon from '../../assets/icons/Filter.svg';
import ExportIcon from '../../assets/icons/Export.svg';
import dropdownIcon from '../../assets/icons/drop-down.svg';

import './style.scss'

const AdvanceTableFilter = (props) => {
  return (
    <div className="filter">
      <div className="d-flex justify-content-between">
        <div className="row" style={{ flexBasis: props.fb }}>
        <div className="box col">
          <div className="filter-item">
              <div className="icon mr-2">
              {props.data.img1}
              </div>
              <div className="filterTitle">{props.data.coloumn1}</div>
            <div className="filterAction">
              {/* <img src={updownarrow} width="9" height="9" /> */}
            </div>
          </div>
        </div>
        <span className="divider" />
        <div className="box col">
          <div className="filter-item">
              <div className="icon mr-2">
              {props.data.img2}
              </div>
              <div className="filterTitle">{props.data.coloumn2}</div>
            <div className="filterAction">
              {/* <img src={updownarrow} width="9" height="9" /> */}
            </div>
          </div>
        </div>
        <span className="divider" />
        <div className="box col">
          <div className="filter-item">
              <div className="icon mr-2">
              {props.data.img3}
              </div>
              <div className="filterTitle">{props.data.coloumn3}</div>
            <div className="filterAction">
              {/* <img src={updownarrow} width="9" height="9" /> */}
            </div>
          </div>
        </div>
        {props.data.img4? <span className="divider" />: null}
        {props.data.img4? 
        <div className="box col">
          <div className="filter-item">
              <div className="icon mr-2">
                {props.data.img4}
              </div>
              <div className="filterTitle">{props.data.coloumn4}</div>
            <div className="filterAction">
              {/* <img src={updownarrow} width="9" height="9" /> */}
            </div>
          </div>
        </div>: null}
        {props.data.img5? <span className="divider" /> : null}
        {props.data.img5? 
          <div className="box col">
            <div className="filter-item">
                <div className="icon mr-2">
                  {props.data.img5}
                </div>
                <div className="filterTitle">{props.data.coloumn5}</div>
              <div className="filterAction">
                {/* <img src={updownarrow} width="9" height="9" /> */}
              </div>
            </div>
          </div> : null}
        </div>
        <div className="">
        <div className="box col">
          <button className="btn btn-md btn-blue mr-2">
            <div className="d-flex align-items-center">
              <img src={FilterIcon} width="16" height="16" className="mr-3" />
              <span className="text">Filter</span>
              <img src={dropdownIcon} width="16" height="16" className="ml-3" />
            </div>
          </button>
          <button className="btn btn-md btn-main-blue">
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