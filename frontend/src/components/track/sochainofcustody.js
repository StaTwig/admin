import React, { useState } from "react";
import "./style.scss";
import traceDrop from "../../assets/icons/traceDrop.png";
import Down from "../../assets/icons/up.png";
import { formatTimeAMPM } from "../../utils/dateHelper";
import { Link } from "react-router-dom";

const SoChainOfCustody = (props) => {
  const {
    index,
    container,
    pindex,
    data,
    update,
    op,
    setOp,
    i,
    level,
    v,
    setV,
    len,
    parentIndex,
    t
  } = props;
  const [visible, setVisible] = useState(v);

  const isShipment = !update?.isOrder;
  if (update.isOrder) console.log(data);

  return (
    <>
      {op >= level ? (
        <div
          className={`row orderTxt  mr-0 `}
          style={{
            marginLeft: (parentIndex === 0 ? 0.5 : parentIndex) + "rem",
            paddingLeft: (parentIndex === 0 ? 0.5 : 1) + "rem",
          }}
        >
          <span
            className={`pt-${index > 2 ? 2 : index} p-0 ${
              pindex === 1 && `border-primary border-left`
            }`}
            style={{ height: "1rem" }}
          ></span>
          <div
            className={`pt-${index > 2 ? 2 : index} p-0 col ${
              pindex > 1 && `border-primary border-left`
            } `}
          >
            <div className='row dot-pad'>
              <div className={`big-dot dot-${container} bg-info`}></div>
              <span className='text-primary pl-4 pb-1 row col-12 font-weight-bold'>
                {isShipment
                  ? data?.receiver?.org?.name +
                    "/" +
                    data?.supplier?.warehouse?.title
                  : data?.supplier?.name}
              </span>
            </div>
            <div
              className={`panel row container-${container} mr-0 commonpanle`}
              style={{ marginLeft: "0.5rem" }}
            >
              <div className='col-12 row justify-content-between'>
                <div className={`${visible && v ? `col` : `col-10`}`}>
                  <span className='font-weight-bold'>
                    {isShipment ? t(update.status.toLowerCase()) :  t(update.poStatus.toLowerCase())}
                  </span>
                  {(!visible || !v) && (
                    <div className='text-primary mt-2'>
                      <span className=' '>
                        {isShipment ? t('shipment_id') : t('order_id')}:{" "}
                      </span>
                      <span className=' font-weight-bold'>{data.id}</span>
                    </div>
                  )}
                </div>
                {visible && v && (
                  <div className='col-6 text-primary'>
                    <span className=' '>
                      {isShipment ? t('shipment_id') : t('order_id')}:{" "}
                    </span>
                    <span className=' font-weight-bold'>{data.id}</span>
                  </div>
                )}
                <div className='text-primary col-2'>
                  <div className='text-muted'>
                    {update.updatedOn.split(" ")[0]}
                  </div>
                  <div className='text-muted'>
                    {formatTimeAMPM(update.updatedOn.split(" ")[1])}
                  </div>
                </div>
              </div>
              {visible && v && (
                <>
                  <div className='row mt-1 ml-1 col-5'>
                    {update.products.map((product, index) => (
                      <div
                        key={index}
                        className='col-12 row justify-content-between'
                      >
                        <span className='text-muted'>
                          {product?.productName
                            ? product?.productName
                            : product.name}
                        </span>
                        <span className='text-muted text-weight-bold'>
                          {product?.productQuantity
                            ? product.productQuantity
                            : product.quantity}
                          {" ("}
                          {product.unitofMeasure
                            ? product.unitofMeasure.name
                            : "N/A"}
                          {")"}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className='col-12 mt-2'>
                    <Link
                      to={
                        isShipment
                          ? `/viewshipment/${data.id}`
                          : `/vieworder/${data.id}`
                      }
                    >
                      <button className='btn btn-orange fontSize20 font-bold'>
                        {t('view')}
                      </button>
                    </Link>
                  </div>
                </>
              )}
              {visible && v ? (
                <div
                  className='arrow bg-primary float-right'
                  onClick={() => {
                    setVisible(false);
                    if (i === 0 && len > 1) setOp(op - 1);
                  }}
                >
                  <img src={Down} alt='actions' height='7' width='12' />
                </div>
              ) : (
                <div
                  className='arrow float-right'
                  onClick={() => {
                    setVisible(true);
                    if (i === 0 && len > 1) setOp(level + 1);
                    setV(true);
                  }}
                >
                  <img src={traceDrop} alt='actions' height='7' width='12' />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default SoChainOfCustody;
