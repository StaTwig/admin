import React, { useState } from "react";
import "./style.scss";
import traceDrop from "../../assets/icons/traceDrop.png";
import Down from "../../assets/icons/up.png";
import { formatDistanceToNow } from "date-fns";
const ChainOfCustody = (props) => {
  const { t } = props;
  const [op, setOp] = useState("");
  const shipmentData = props.shipments[0];
  return Object.keys(props.shipments).length === 0 || !props.shipments ? (
    <div className='row panel justify-content-between'>N/A</div>
  ) : (
    <div>
      {props.shipments[0].shipmentUpdates?.map((custody, index) =>
        index === 0 ? (
          <div className='row  mb-3' key={index}>
            <div className='col'>
              <div className='color mb-3'>
                {custody.status === "CREATED" ? t("shipped") : t("delivered")}
              </div>
              <div className='col panel  chain chainpanle'>
                <div className='row justify-content-between'>
                  <div className='col'>
                    <div>
                      <strong>
                        {t("shipment")}{" "}
                        {custody.status === "CREATED"
                          ? t("shipped")
                          : t("delivered")}
                      </strong>
                    </div>
                    <h6 className='poheads potext mt-3 mb-3'>{t("from")}</h6>
                    <div className=' d-flex flex-row p-1'>
                      <span className='w-100  text-secondary'>
                        {t("organisation_name")}{" "}
                      </span>
                      <span className='w-100 pl-2'>
                        {shipmentData.supplier.id}
                      </span>
                    </div>
                    <div className=' d-flex flex-row p-1'>
                      <span className='w-100 text-secondary'>
                        {t("organisation_location")}{" "}
                      </span>
                      <span className='w-100 pl-2 '>
                        {shipmentData.supplier.locationId}
                      </span>
                    </div>
                  </div>
                  <div className='col'>
                    <div>
                      {t("shipment_id")} : <strong>{shipmentData.id}</strong>
                    </div>
                  </div>
                  <div className='d-flex flex-column mr-5'>
                    <div>
                      {formatDistanceToNow(Date.parse(custody?.updatedOn)) +
                        " ago"}
                    </div>
                  </div>
                </div>
                {op === index ? (
                  <>
                    <div className='row'>
                      <div className='column'>
                        <h6 className='poheads potext mt-3 mb-3'>
                          {t("comment")}*
                        </h6>
                        {<div>{custody.updateComment || "N/A"}</div>}
                      </div>
                      <div className='column'>
                        <h6 className='poheads potext mt-3 mb-3'>
                          {t("uploaded_image")}
                        </h6>
                        {custody?.image ? (
                          <img
                            src={custody.image}
                            alt='Shipment Update'
                            className='img-fluid'
                          />
                        ) : (
                          <strong>N / A</strong>
                        )}
                      </div>
                    </div>
                    <div className='d-flex flex-row mt-4'>
                      <button
                        className='btn btn-main-blue dir mr-2'
                        onClick={() => {
                          props.setHighLight(true);
                          props.setMenuShip(true);
                        }}
                      >
                        {t("view_shipment")}
                      </button>
                      <button
                        className='btn btn-orange dir'
                        onClick={() => {
                          props.setProductHighLight(true);
                          props.setMenuProduct(true);
                        }}
                      >
                        {t("view") + " " + t("product_list")}
                      </button>
                    </div>
                  </>
                ) : null}
                {op === index ? (
                  <div
                    className='arrow float-right'
                    onClick={() => {
                      setOp("");
                    }}
                  >
                    <img src={Down} alt='actions' height='7' width='12' />
                  </div>
                ) : (
                  <div
                    className='arrow float-right'
                    onClick={() => {
                      setOp(index);
                    }}
                  >
                    <img src={traceDrop} alt='actions' height='7' width='12' />
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div key={index}>
            {" "}
            {custody.status === "RECEIVED" ? (
              <div className='row  mb-3'>
                <div></div>
                <div className='big-dot bg-info ml-4'></div>
                <div className='col'>
                  <div className='color mb-3'>
                    {custody.status === "RECEIVED" ? "DELIVERED" : "DELIVERED"}
                  </div>
                  <div className='col panel  chain chainpanle'>
                    <div className='row justify-content-between'>
                      <div className='col'>
                        <div>
                          <strong>
                            {t("shipment")}{" "}
                            {custody.status === "RECEIVED"
                              ? t("delivered")
                              : t("shipped")}
                          </strong>
                        </div>
                        <h6 className='poheads potext mt-3 mb-3'>{t("to")}</h6>
                        <div className='d-flex flex-row p-1'>
                          <span className='w-75 text-secondary'>
                            {t("organisation_name")}{" "}
                          </span>
                          <span className='w-75'>
                            {shipmentData?.receiver?.org?.name}
                          </span>
                        </div>
                        <div className='d-flex flex-row p-1'>
                          <span className='w-75 text-secondary'>
                            {" "}
                            {t("organisation_location")}{" "}
                          </span>
                          <span className='w-75'>
                            {shipmentData?.receiver?.locationId}
                          </span>
                        </div>
                      </div>
                      <div className='col'>
                        <div className='emp'></div>
                        <div>
                          {t("shipment_id")} :{" "}
                          <strong>{shipmentData?.id}</strong>
                        </div>
                      </div>
                      <div className='d-flex flex-column mr-5'>
                        <div className='emp'></div>
                        <div>
                          {formatDistanceToNow(Date.parse(custody?.updatedOn)) +
                            " ago"}
                        </div>
                      </div>
                    </div>
                    {op === index ? (
                      <div className='row'>
                        <div className='column'>
                          <h6 className='poheads potext mt-3 mb-3'>
                            {t("comment")}**
                          </h6>
                          {<div>{custody.updateComment}</div>}
                        </div>
                        <div className='column'>
                          <h6 className='poheads potext mt-3 mb-3'>
                            {t("uploaded_image")}
                          </h6>
                          {custody?.image ? (
                            <img
                              src={custody.image}
                              alt='Shipment Update'
                              className='img-fluid'
                            />
                          ) : (
                            <strong>N / A</strong>
                          )}
                        </div>
                      </div>
                    ) : null}
                    {op === index ? (
                      <div
                        className='arrow float-right'
                        onClick={() => {
                          setOp("");
                        }}
                      >
                        <img src={Down} alt='actions' height='7' width='12' />
                      </div>
                    ) : (
                      <div
                        className='arrow float-right'
                        onClick={() => {
                          setOp(index);
                        }}
                      >
                        <img
                          src={traceDrop}
                          alt='actions'
                          height='7'
                          width='12'
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className='row  mb-3'>
                <div></div>
                <div className='big-dot bg-info ml-4'></div>
                <div className='col'>
                  <div className='color mb-3'>
                    {custody?.status === "UPDATED"
                      ? t("UPDATED")
                      : t("UPDATED")}
                  </div>
                  <div className='col panel  chain chainpanle'>
                    <div className='row justify-content-between'>
                      <div className='col'>
                        <div>
                          <strong>
                            {t("shipment")}{" "}
                            {custody.status === "UPDATED"
                              ? t("updated")
                              : t("updated")}
                          </strong>
                        </div>
                        <div className=' d-flex flex-row p-1'>
                          <span className='w-75 text-secondary'>
                            {" "}
                            {t("by")}{" "}
                          </span>
                          <span className='w-75 '>{custody.updatedBy}</span>
                        </div>
                        <div className=' d-flex flex-row p-1'>
                          <span className='w-75 text-secondary'>
                            {" "}
                            {t("organisation_name")}{" "}
                          </span>
                          <span className='w-75'>{custody.orgid}</span>
                        </div>
                        <div className=' d-flex flex-row p-1'>
                          <span className='w-75 text-secondary'>
                            {t("updated_location")}{" "}
                          </span>
                          <span className='w-75 '>{custody.updatedAt}</span>
                        </div>
                      </div>
                      <div className='col'>
                        <div className='emp'></div>
                        <div>
                          {t("shipment_id")} :{" "}
                          <strong>{shipmentData.id}</strong>
                        </div>
                      </div>
                      <div className='d-flex flex-column mr-5'>
                        <div className='emp'></div>
                        <div>
                          {formatDistanceToNow(Date.parse(custody?.updatedOn)) +
                            " ago"}
                        </div>
                        <div></div>
                      </div>
                    </div>
                    {op === index ? (
                      <div className='row'>
                        <div className='column'>
                          <h6 className='poheads potext mt-3 mb-3'>
                            {t("comment")}*
                          </h6>
                          {<div>{custody.updateComment}</div>}
                        </div>
                        <div className='column'>
                          <h6 className='poheads potext mt-3 mb-3'>
                            {t("uploaded_image")}
                          </h6>
                          {custody?.image ? (
                            <div className='update-image-holder'>
                              <img
                                src={custody.image}
                                alt='Shipment Update'
                                className='img-fluid'
                              />
                            </div>
                          ) : (
                            <strong>N / A</strong>
                          )}
                        </div>
                      </div>
                    ) : null}
                    {op === index ? (
                      <div
                        className='arrow float-right'
                        onClick={() => {
                          setOp("");
                        }}
                      >
                        <img src={Down} alt='actions' height='7' width='12' />
                      </div>
                    ) : (
                      <div
                        className='arrow float-right'
                        onClick={() => {
                          setOp(index);
                        }}
                      >
                        <img
                          src={traceDrop}
                          alt='actions'
                          height='7'
                          width='12'
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default ChainOfCustody;
