import React, { useState } from 'react';
import './style.scss';
import traceDrop from '../../assets/icons/traceDrop.png';
import Down from '../../assets/icons/up.png';
import { formatTimeAMPM } from '../../utils/dateHelper';
import { Link } from 'react-router-dom';

const AoChainOfCustody = (props) => {
  const { index, container, pindex, data, update, op, setOp, i, level, v, setV, len, parentIndex,products } = props;
  const [visible, setVisible] = useState(v);

  const isShipment = !update?.isOrder;

  return (
  <>
      {/* {op >= level ? */}
        <div className={`row orderTxt  mr-0 `} style={{marginLeft: (parentIndex == 0 ? 0.5 : 0.5), paddingLeft: (parentIndex == 0 ? 0.5 : 1)}}>
          <span className={`pt-${index > 2 ? 2 : index} p-0 ${pindex == 1 && `border-primary border-left`}`} style={{ height: '1rem' }}></span>
          <div className={`pt-${index > 2 ? 2 : index} p-0 col ${pindex > 1 && `border-primary border-left`} `}>
            <div className="row dot-pad">
              <div className={`big-dot dot-${container} bg-info`}></div>
              <span className="text-primary pl-4 pb-1 row col-12 font-weight-bold">{data?.supplier?.warehouse?.postalAddress}</span>
            </div>
            <div className={`panel row container-${container} mr-0 commonpanle`} style={{marginLeft: "0.5rem"}}>
              <div className="col-12 row justify-content-between">
                <div className={`${visible && v ? `col` : `col-10`}`}>
                  <span className="font-weight-bold">{update.status}</span>
                  {(!visible || !v) &&
                    <div className="text-primary mt-2">
                      <span className=" ">Shipment ID: </span>
                      <span className=" font-weight-bold">{data.id}</span>
                    </div>
                  }
                </div>
                {visible && v &&
                  <div className="col-6 text-primary">
                    <span className=" ">AirWay BillNo: </span>
                    <span className=" font-weight-bold">{data.airWayBillNo}</span>
                  </div>
                }
                <div className="text-primary col-2">
                  <div className="text-muted">{update.updatedOn.split(' ')[0]}</div>
                  <div className="text-muted">{formatTimeAMPM(update.updatedOn)}</div>
                </div>
              </div>
              {visible && v &&
                <>
                  <div className="row mt-1 ml-1 col-5">
                    {/* {update.products.map((product, index) => */}
                      <div key={index} className="col-12 row justify-content-between">
                        <span className="text-muted">{products[0]?.productName ? products[0]?.productName : products[0].name}</span>
                        <span className="text-muted text-weight-bold">{products[0]?.productQuantity ? products[0].productQuantity : products[0].quantity}</span>
                      </div>
                    {/* )} */}
                  </div>
                  <div className="col-12 mt-2">
                    <Link to={`/viewshipment/${data.id}`}>
                      <button className="btn btn-orange fontSize20 font-bold">View Shipment</button>
                    </Link>
                  </div>
                </>
              }
              {visible && v ?
                <div className="arrow bg-primary float-right" onClick={() => { setVisible(false); if(i == 0 && len > 1) setOp(op-1); }}>
                  <img src={Down} alt="actions" height="7" width="12" />
                </div>
                :
                <div className="arrow float-right" onClick={() => {
                  setVisible(true);
                  if(i == 0 && len > 1) setOp(level + 1);
                  setV(true);
                }}>
                  <img src={traceDrop} alt="actions" height="7" width="12" />
                </div>
              }
            </div>
          </div>
        </div>
      </>
  )
}


export default AoChainOfCustody;
