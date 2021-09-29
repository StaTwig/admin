import React from 'react'


import './style.scss'

const tablefilter = (props) => {
  return (
    <div className="filter">
      <div className="d-flex justify-content-between">
        <div className="row" style={{ flexBasis: props.fb }}>
        <div className="box col">
          <div className="filter-item ml-0">
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
          <div className="filter-item ml-0">
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
          <div className="filter-item ml-0">
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
          <div className="filter-item ml-0">
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
            <div className="filter-item ml-0">
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
       
        
      </div>
    </div>
  )
}

export default tablefilter;