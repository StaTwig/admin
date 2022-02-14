import React, { useState } from "react";
import "./style.scss";
import traceDrop from "../../assets/icons/traceDrop.png";
import Down from "../../assets/icons/up.png";
import { formatTimeAMPM } from "../../utils/dateHelper";
import SoChainOfCustody from "./sochainofcustody";
import { Link } from "react-router-dom";

const PoChainOfCustody = (props) => {
  const [op, setOp] = useState(-1);
  const [visible, setVisible] = useState(false);
  const { index, container, pindex, data, shippmentChainOfCustodyData } = props;

  return (
    <>
      <div className={`row orderTxt ml-${index} mr-0 pl-3`}>
        <span
          className={`pt-${index} p-0 ${
            pindex === 1 && `border-primary border-left`
          }`}
          style={{ height: "1rem" }}
        ></span>
        <div
          className={`pt-${index} p-0 col ${
            pindex > 1 && `border-primary border-left`
          } `}
        >
          <div className='row dot-pad'>
            <div className={`big-dot dot-${container} bg-info`}></div>
            <span className='text-primary pl-4 pb-1 row col-12 font-weight-bold'>
              {data.supplier.organisation.name}
            </span>
          </div>
          <div
            className={`panel row ml-${index} container-${container} mr-0  commonpanle`}
          >
            {data.poUpdates.map((r, i) => (
              <div key={i} className='col-12 row justify-content-between'>
                <div
                  className={`${
                    op >= index && index !== 0 ? `col-5` : `col-10`
                  }`}
                >
                  <span className='font-weight-bold'>t({r.status})</span>
                  {op === -1 && (
                    <div className='text-primary mt-2'>
                      <span className=' '>Order ID: </span>
                      <span className=' font-weight-bold'>{data.id}</span>
                    </div>
                  )}
                </div>
                {op >= index && (
                  <div className='col-5 text-primary'>
                    <span className=' '>Order ID: </span>
                    <span className=' font-weight-bold'>{data.id}</span>
                  </div>
                )}
                <div className='text-primary col-2'>
                  <div className='text-muted'>{r.updatedOn.split(" ")[0]}</div>
                  <div className='text-muted'>
                    {formatTimeAMPM(r.updatedOn.split(" ")[1])}
                  </div>
                </div>
              </div>
            ))}
            {op >= index && index !== 0 && (
              <>
                <div className='row mt-1 ml-1 col-5'>
                  {data.products.map((product, index) => (
                    <div
                      key={index}
                      className='col-12 row justify-content-between'
                    >
                      <span className='text-muted'>{product.name}</span>
                      <span className='text-muted text-weight-bold'>
                        {product.quantity}
                      </span>
                    </div>
                  ))}
                </div>
                <div className='col-12 mt-2'>
                  <Link to={`/vieworder/${data.id}`}>
                    <button className='btn btn-yellow fontSize20 font-bold'>
                      View Order
                    </button>
                  </Link>
                </div>
              </>
            )}
            {op >= index && index !== 0 ? (
              <div
                className='arrow bg-primary float-right'
                onClick={() => {
                  setOp(-1);
                  setVisible(false);
                }}
              >
                <img src={Down} alt='actions' height='7' width='12' />
              </div>
            ) : (
              <div
                className='arrow float-right'
                onClick={() => {
                  setOp(1);
                  setVisible(false);
                }}
              >
                <img src={traceDrop} alt='actions' height='7' width='12' />
              </div>
            )}
          </div>
        </div>
      </div>
      {shippmentChainOfCustodyData.map((row, index) => {
        return row.shipmentUpdates.map((r, i) => (
          <SoChainOfCustody
            len={row.shipmentUpdates.length}
            i={i}
            v={visible}
            setV={setVisible}
            level={i + 1}
            key={i}
            op={op}
            setOp={setOp}
            data={row}
            update={r}
            index={3 + i + 1}
            pindex={
              shippmentChainOfCustodyData.length - 1 === index
                ? 1
                : shippmentChainOfCustodyData.length
            }
            container={2 + i}
          />
        ));
      })}
    </>
  );
};

export default PoChainOfCustody;
