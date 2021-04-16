import React, { useState } from 'react';
import './style.scss';
import traceDrop from '../../assets/icons/traceDrop.png';
import Down from '../../assets/icons/up.png';
import LineTo from 'react-lineto';

const ChainOfCustody = (props) => {
  const [op, setOp] = useState('');
  const {index,container, pindex} = props;
  
  return (
     <div className={`row orderTxt ml-${index} mr-0 pl-3`}>
      <span className={`pt-${index} p-0 ${pindex == 1 && `border-primary border-left`}`} style={{height: '1rem'}}></span>
      <div className={`pt-${index} p-0 col ${pindex > 1 && `border-primary border-left`} `}>
        <div className="row dot-pad">
          <div className={`big-dot dot-${container} bg-info`}></div>
          <span className="text-primary pl-4 pb-1 row col-12 font-weight-bold">Appollo Hospitals</span>
        </div>
        <div className={`panel row ml-${index} container-${container} mr-0 col commonpanle`}>
          <div className="col-12 row justify-content-between">
            <div className={`${op === index && index !== 0 ? `col` : `col-10`}`}>
              <span className="font-weight-bold">Order Received</span>
              {op !== index &&
                <div className="text-primary mt-2">
                  <span className=" ">Order ID: </span>
                  <span className=" font-weight-bold">PO89898988989898</span>
                </div>
              }
            </div>
            {op === index && index !== 0 &&
              <div className="col-6 text-primary">
                <span className=" ">Order ID: </span>
                <span className=" font-weight-bold">PO89898988989898</span>
              </div>
            }
            <div className="text-primary col-2">
              <div className="text-muted">05/06/2021</div>
              <div className="text-muted">10:43AM</div>
            </div>
          </div>
          {op === index && index !== 0 &&
            <>
              <div className="row mt-1 ml-1 col-5">
                <div className="col-12 row justify-content-between">
                  <span className="text-muted">Product Name</span>
                  <span className="text-muted text-weight-bold">7689</span>
                </div>
                <div className="col-12 row justify-content-between">
                  <span className="text-muted">Product Name</span>
                  <span className="text-muted text-weight-bold">7689</span>
                </div>
              </div>
              <div className="col-12 mt-2">
                <button className="btn btn-yellow fontSize20 font-bold">View Order</button>
              </div>
            </>
          }
        {op === index && index !== 0 ?
          <>
            <div className="arrow bg-primary float-right" onClick={() => { setOp('');}}>
              <img src={Down} alt="actions" height="7" width="12" />
          </div>
          
                
          </>
        :
          <>
            <div className="arrow float-right" onClick={() => { setOp(index);  }}>
              <img src={traceDrop} alt="actions" height="7" width="12" />
            </div>
          </>
        }
      </div>
    </div>
      </div>
  )
}


export default ChainOfCustody;
