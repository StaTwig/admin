import React, { useState } from "react";
import { Link } from "react-router-dom";
import back from "../../assets/icons/back.png";
import { useSelector } from "react-redux";
import "./style.scss";
import { formatDate } from "../../utils/dateHelper";
import { changePOStatus } from "../../actions/poActions";
import { isAuthenticated } from "../../utils/commonHelper";

const ViewOrder = (props) => {
  const { order, t } = props;
  const [alertMessage, setAlertMessage] = useState({});
  if (!isAuthenticated("viewPO")) props.history.push(`/profile`);
  const isEnabled = isAuthenticated("acceptRejectOrder");
  const user = useSelector((state) => {
    return state.user;
  });
  let statusStyle = "bg-primary";
  let status = order.poStatus;
  if (
    order?.supplier?.supplierOrganisation === user?.organisationId &&
    order.poStatus === "CREATED"
  ) {
    statusStyle = "bg-primary";
    status = t("received");
  } else if (
    order?.customer?.customerOrganisation &&
    order.poStatus === "CREATED"
  ) {
    statusStyle = "bg-primary";
    status = t("sent");
  } else if (order.poStatus === "ACCEPTED") {
    statusStyle = "bg-success";
    status = t("accepted");
  } else if (order.poStatus === "REJECTED") {
    statusStyle = "bg-secondary";
    status = t("rejected");
  } else if (order.poStatus === "TRANSIT&FULLYFULFILLED") {
    statusStyle = "bg-info";
    status = t("transitfullyfilled");
  } else if (order.poStatus === "FULLYFULFILLED") {
    statusStyle = "bg-info";
    status = t("fullyfilled");
  } else if (order.poStatus === "TRANSIT&PARTIALLYFULFILLED") {
    statusStyle = "bg-warning";
    status = t("transitpartiallyfilled");
  } else if (order.poStatus === "PARTIALLYFULFILLED") {
    statusStyle = "bg-warning";
    status = t("partiallyfilled");
  } else if (order.poStatus === "CANCELLED") {
    statusStyle = "bg-secondary";
    status = t('cancelled');
  }

  const onPOStatusChange = async (status) => {
    const data = { status, orderID: order.id };
    const result = await changePOStatus(data);
    if (result.status === 200) {
      setAlertMessage("Success");
    } else {
      setAlertMessage("Fail");
    }
  };

  return (
    <div className='vieworder text-muted'>
      <div className='d-flex justify-content-between'>
        <h1 className='breadcrumb'>{t("view_order")}</h1>

        {order?.supplier?.supplierOrganisation === user?.organisationId &&
        order.poStatus === "CREATED" ? (
          <div className='d-flex'>
            {isEnabled && (
              <>
                <Link to={`/orders`}>
                  <button
                    className='btn btn-success fontSize20 font-bold mr-4 mt-2'
                    onClick={() => onPOStatusChange("ACCEPTED")}
                  >
                    {t("accept_order")}
                  </button>
                </Link>

                <Link to={`/orders`}>
                  <button
                    className='btn btn-orange fontSize20 font-bold mr-4 mt-2'
                    onClick={() => onPOStatusChange("REJECTED")}
                    style={{ borderRadius: "5px" }}
                  >
                    {t("reject_order")}
                  </button>
                </Link>
                
              </>
              )}
            <Link to={`/orders`}>
              <button className='btn btn-outline-primary mt-2'>
                <img src={back} height='17' className='mr-2 mb-1' alt='Back' />
                {t("back_to_orders")}
              </button>
            </Link>
          </div>
        ) : (
          <div className='d-flex'>
            {status == t("sent") &&
              <Link to={`/orders`}>
                <button
                  className='btn btn-orange fontSize20 font-bold mr-4 mt-2'
                  onClick={() => onPOStatusChange("CANCELLED")}
                  style={{ borderRadius: "5px" }}
                >
                  {t("cancel_order")}
                </button>
              </Link>
            }
            <Link to={`/orders`}>
              <button className='btn btn-outline-primary mt-2'>
                <img src={back} height='17' className='mr-2 mb-1' alt='Back' />
                {t("back_to_orders")}
              </button>
            </Link>
          </div>
        )}
      </div>
      <div className='mt-5'>
        <div
          className='row bg-white shadow  p-4'
          style={{ position: "relative", marginTop: "-40px" }}
        >
          <div className='col row'>
            <span className='col-4 ml-2'>{t("order_id")}</span>
            <div className='col'>
              <span className=' text-dark '> {order.id} </span>
              <span
                className={`ml-3 p-2 status rounded text-white secondary-bg ${statusStyle}`}
              >
                {status}
              </span>
            </div>
          </div>
          <div className='col row'>
            <span className='col-4'>{t("order_date")}</span>
            <span className='col text-dark '>
              {formatDate(order.creationDate)}
            </span>
          </div>
          <div className='w-100'></div>
          <div className='col row'>
            <span className='col-2 ml-2 mt-4'>{t("created_by")}</span>
            <span className='col text-dark ml-1 mt-4'>{order.createdBy}</span>
          </div>
        </div>
        <div className='row bg-white shadow mt-4 p-3'>
          <div className='col-12'>
            <span className=' p-1 text-primary '>{t("order_from")}</span>
            <div>
              <div className=' row p-1'>
                <div className='col row'>
                  <span className='col-4'>{t("organisation_name")} </span>
                  <span className=' col text-dark '>
                    {" "}
                    {order.supplier?.organisation?.name}
                  </span>
                </div>
                <div className='col row'>
                  <span className='col-4'>{t("organisation_id")} </span>
                  <span className=' col  text-dark '>
                    {order.supplier?.organisation?.id}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='row bg-white shadow p-3 mt-4'>
          <div className='col-12'>
            <span className=' p-1 text-primary '>{t("order_to")}</span>
            <div>
              <div className='row p-1'>
                <div className='col row'>
                  <span className='col-4'>{t("organisation_name")} </span>
                  <span className=' col text-dark '>
                    {order.customer?.organisation?.name}
                  </span>
                </div>
                <div className='col row'>
                  <span className='col-4'>{t("organisation_id")} </span>
                  <span className=' col text-dark '>
                    {order.customer?.organisation?.id}
                  </span>
                </div>
                {/* <div className='w-100'></div>
                <div className='col row mt-3'>
                  <span className='col-4'>{t("region")}</span>
                  <span className=' col  text-dark '>
                    {order.customer?.region || "Americas"}
                  </span>
                </div>
                <div className='col row mt-3'>
                  <span className='col-4'>{t("country")}</span>
                  <span className=' col text-dark '>
                    {order.customer?.country}
                  </span>
                </div> */}
                <div className='w-100'></div>
                <div className='col row col-6 mt-3'>
                  <span className='col-4'>{t("delivery_location")}</span>
                  <span className=' col ml-2 text-dark '>
                    {order &&
                    order.customer &&
                    order.customer.warehouse &&
                    order.customer.warehouse.warehouseAddress
                      ? order.customer.warehouse.title +
                        " / " +
                        order.customer.warehouse.warehouseAddress.firstLine +
                        " " +
                        order.customer.warehouse.warehouseAddress.city
                      : null}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-4'>
          <span className='p-1 text-info font-weight-bold'>
            {t("product_details")}
          </span>
          <div className='row mt-3'>
            {order?.products?.map((product, index) => {
              let pr = order.productDetails.filter(d => product.productId === d.id);
              let prd = pr.length > 0 ? pr[0] : {};
              let uom = prd?.unitofMeasure ? typeof prd?.unitofMeasure === "string" ? JSON.parse(prd?.unitofMeasure) : prd?.unitofMeasure : product.unitofMeasure;
              return(
              <div
                className={`bg-white shadow padding-added ${
                  index >= 0 ? "mb-5 mr-4" : ""
                  } `}
                style={{ width: "27%" }}
                key={index}
              >
                <span className=' p-1 font-weight-normal text-primary '>
                  {product.name}
                </span>
                <div className='row  p-1'>
                  <span className='col'>{t("product_id")}</span>
                  <span className=' col text-dark '>{product.productId}</span>
                </div>
                <div className='row  p-1'>
                  <span className='col'>{t("product_category")}</span>
                  <span className=' col text-dark '>{prd?.type ? prd?.type : product.type}</span>
                </div>
                <div className='row  p-1'>
                  <span className='col'>{t("manufacturer")}</span>
                  <span className=' col text-dark '>
                    {prd.manufacturer ? prd.manufacturer : product.manufacturer}
                  </span>
                </div>
                <div className='row  p-1'>
                  <span className='col'>{t("quantity")}</span>
                  <span className=' col text-dark '>
                    {product.productQuantity}
                    <span>{"("}</span>
                    {uom ? (
                      <span>{uom.name}</span>
                    ) : (
                        ""
                      )}
                    <span>{")"}</span>
                  </span>
                </div>
              </div>
            )})}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;
