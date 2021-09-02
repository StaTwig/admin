import React from 'react'
import updownarrow from '../../../assets/icons/up-and-down-1.svg';
import FilterIcon from '../../../assets/icons/Filter.svg';
import ExportIcon from '../../../assets/icons/Export.svg';
import dropdownIcon from '../../../assets/icons/drop-down.svg';

import './style.scss'

const TableFilter = (props) => {
  return (
    <div className="filter">
      <div className="d-flex justify-content-between">
        <div className="row" style={{ flexBasis: '100%' }}>
        <div className="box col">
          <div className="filter-item">
              <div className="icon mr-2">
              {props.data.img1}
              </div>
              <div className="filterTitle">{props.data.coloumn1}</div>
            <div className="filterAction">
              <img src={updownarrow} width="9" height="9" />
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
              <img src={updownarrow} width="9" height="9" />
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
              <img src={updownarrow} width="9" height="9" />
            </div>
          </div>
        </div>
        <span className="divider" />
        <div className="box col">
          <div className="filter-item">
              <div className="icon mr-2">
                {props.data.img4}
              </div>
              <div className="filterTitle">{props.data.coloumn4}</div>
            <div className="filterAction">
              <img src={updownarrow} width="9" height="9" />
            </div>
          </div>
        </div>
        <span className="divider" />
        <div className="box col">
          <div className="filter-item">
              <div className="icon mr-2">
                {props.data.img5}
              </div>
              <div className="filterTitle">{props.data.coloumn5}</div>
            <div className="filterAction">
              <img src={updownarrow} width="9" height="9" />
            </div>
          </div>
        </div>
        <span className="divider" />
        <div className="box col">
          <div className="filter-item">
              <div className="icon mr-2">
                {props.data.img6}
              </div>
              <div className="filterTitle">{props.data.coloumn6}</div>
            <div className="filterAction">
              <img src={updownarrow} width="9" height="9" />
            </div>
          </div>
        </div>
        <span className="divider" />
        <div className="box col">
          <div className="filter-item">
              <div className="icon mr-2">
                {props.data.img7}
              </div>
              <div className="filterTitle">{props.data.coloumn7}</div>
            <div className="filterAction">
              <img src={updownarrow} width="9" height="9" />
            </div>
          </div>
        </div>
         </div>
         <span className="divider" />
        <div className="box col">
          <button className="btn btn-md btn-main-blue font-weight-bold">
            Select
          </button>
        </div>
        
      </div>
    </div>
  )
}

export default TableFilter;