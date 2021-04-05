import React, { useState } from "react";
import "./style.scss";
import { useSelector } from "react-redux";
import traceDrop from "../../assets/icons/traceDrop.png";
import Down from "../../assets/icons/up.png";

const ChainOfCustody = (props) => {
  const [op, setOp] = useState("");
  const profile = useSelector((state) => {
    return state.user;
  });
  return Object.keys(props.shipments).length === 0 ||
   !props.shipments.shipmentChainOfCustody ? (
    <div className="row panel justify-content-between">N/A</div>
  ) : (
    <div>
      {props.shipments.shipmentChainOfCustody.map((custody, index) => (
        <div>
          {custody.shipmentStatus === "CREATED" ? (
            <div className="row  mb-3">
              <div></div>
              <div className="big-dot bg-info ml-4"></div>
              <div className="col">
                <div className="color mb-3">
                  {custody.shipmentStatus === "CREATED" ? "SHIPPED" : "UPDATED"}
                </div>
                <div className="col panel  chain chainpanle">
                  <div className="row justify-content-between">
                    <div className="col">
                                        <div>
                        <strong>
                          Shipment{" "}
                          {custody.shipmentStatus === "CREATED"
                            ? "Shipped"
                            : "UPDATED"}
                        </strong>
                      </div>
                      <h6 className="poheads potext mt-3 mb-3">From</h6>
                      <div className=" d-flex flex-row p-1">
                        <span class="w-75  text-secondary" >Organisation Name{" "}</span>
                        <span class="w-75">{props.shipments.supplierOrgName}</span>
                      </div>
                      <div className=" d-flex flex-row p-1">
                       <span class="w-75 text-secondary" >Organisation Location{" "}</span>
                      <span class="w-75 " >{props.shipments.fromLocation}</span>
                      </div>
                      <h6 className="poheads potext mt-3 mb-3">To</h6>

                      <div className=" d-flex flex-row p-1">
                      <span class="w-75 text-secondary" >  Organisation Name{" "}</span>
                        <span class="w-75" >{props.shipments.customerOrgName}</span>
                      </div>
                      <div className=" d-flex flex-row p-1">
                       <span class="w-75 text-secondary" > Organisation Location{" "}</span>
                       <span class="w-75" >{props.shipments.toLocation}</span>
                      </div>
                    </div>
                    <div className="col">
                      <div className="emp"></div>
                      <div>
                        Shipment ID : <strong>{custody.shipmentId}</strong>
                      </div>
                    </div>
                    <div className="d-flex flex-column mr-5">
                      <div className="emp"></div>
                      <div>
                        {custody.dateTime.split("T")[0].split("-")[2] +
                          "/" +
                          custody.dateTime.split("T")[0].split("-")[1] +
                          "/" +
                          custody.dateTime.split("T")[0].split("-")[0]}
                      </div>
                      <div></div>
                    </div>
                  </div>
                  {op === index ? (
                    <div className="d-flex flex-row mt-4">
                      <button
                        className="btn btn-main-blue dir mr-2"
                        onClick={() => {
                          props.setHighLight(true);
                          props.setMenuShip(true);
                        }}
                      >
                        View Shipment
                      </button>
                      <button
                        className="btn btn-orange dir"
                        onClick={() => {
                          props.setProductHighLight(true);
                          props.setMenuProduct(true);
                        }}
                      >
                        View Product List
                      </button>
                    </div>
                  ) : null}
                  {op === index ? (
                    <div
                      className="arrow float-right"
                      onClick={() => {
                        setOp("");
                      }}
                    >
                      <img src={Down} alt="actions" height="7" width="12" />
                    </div>
                  ) : (
                    <div
                      className="arrow float-right"
                      onClick={() => {
                        setOp(index);
                      }}
                    >
                      <img
                        src={traceDrop}
                        alt="actions"
                        height="7"
                        width="12"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div>
              {" "}
              {custody.shipmentStatus === "RECEIVED" ? (
                <div className="row  mb-3">
                  <div></div>
                  <div className="big-dot bg-info ml-4"></div>
                  <div className="col">
                    <div className="color mb-3">
                      {custody.shipmentStatus === "RECEIVED"
                        ? "DELIVERED"
                        : "UPDATED"}
                    </div>
                    <div className="col panel  chain chainpanle series">
                      <div className="row justify-content-between">
                        <div className="col">
                          <div>
                            <strong>
                              Shipment{" "}
                              {custody.shipmentStatus === "RECEIVED"
                                ? "Delivered"
                                : "UPDATED"}
                            </strong>
                          </div>
                          <h6 className="poheads potext mt-3 mb-3">To</h6>
                          <div className="d-flex flex-row p-1">
                            <span class="w-75 text-secondary" >Organisation Name{" "}</span>
                            <span class="w-75" >{props.shipments.customerOrgName}</span>
                          </div>
                          <div className="d-flex flex-row p-1">
                           <span class="w-75 text-secondary" > Organisation Location{" "}</span>
                            <span class="w-75" >{props.shipments.toLocation}</span>
                          </div>
                        </div>
                        <div className="col">
                          <div className="emp"></div>
                          <div>
                            Shipment ID : <strong>{custody.shipmentId}</strong>
                          </div>
                        </div>
                        <div className="d-flex flex-column mr-5">
                          <div className="emp"></div>
                          <div>
                            {custody.dateTime.split("T")[0].split("-")[2] +
                              "/" +
                              custody.dateTime.split("T")[0].split("-")[1] +
                              "/" +
                              custody.dateTime.split("T")[0].split("-")[0]}
                          </div>
                          <div></div>
                        </div>
                      </div>
                      {op === index ? (
                        <div className="d-flex flex-row mt-4">
                          <button
                            className="btn btn-main-blue dir mr-2"
                            onClick={() => {
                              props.setHighLight(true);
                              props.setMenuShip(true);
                            }}
                          >
                            View Shipment
                          </button>
                          <button
                            className="btn btn-orange dir"
                            onClick={() => {
                              props.setProductHighLight(true);
                              props.setMenuProduct(true);
                            }}
                          >
                            View Product List
                          </button>
                        </div>
                      ) : null}
                      {op === index ? (
                        <div
                          className="arrow float-right"
                          onClick={() => {
                            setOp("");
                          }}
                        >
                          <img src={Down} alt="actions" height="7" width="12" />
                        </div>
                      ) : (
                        <div
                          className="arrow float-right"
                          onClick={() => {
                            setOp(index);
                          }}
                        >
                          <img
                            src={traceDrop}
                            alt="actions"
                            height="7"
                            width="12"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="row  mb-3">
                  <div></div>
                  <div className="big-dot bg-info ml-4"></div>
                  <div className="col">
                    <div className="color mb-3">{custody.shipmentStatus}</div>
                    <div className="col panel  chain chainpanle series">
                      <div className="row justify-content-between">
                        <div className="col">
                          <div>
                            <strong>Shipment {custody.shipmentStatus}</strong>
                          </div>
                          <div className=" d-flex flex-row p-1">
                           <span class="w-75 text-secondary" > By{" "}</span>
                            <span class="w-75 " >{profile.firstName}{profile.lastName}</span>
                          </div>
                          <div className=" d-flex flex-row p-1">
                           <span class="w-75 text-secondary" > Organisation Name{" "}</span>
                            <span class="w-75">{props.shipments.supplierOrgName}</span>
                          </div>
                          <div className=" d-flex flex-row p-1">
                            <span class="w-75 text-secondary" >Organisation Location{" "}</span>
                            <span class="w-75 " >{props.shipments.fromLocation}</span>
                          </div>
                        </div>
                        <div className="col">
                          <div className="emp"></div>
                          <div>
                            Shipment ID : <strong>{custody.shipmentId}</strong>
                          </div>
                        </div>
                        <div className="d-flex flex-column mr-5">
                          <div className="emp"></div>
                          <div>
                            {custody.dateTime.split("T")[0].split("-")[2] +
                              "/" +
                              custody.dateTime.split("T")[0].split("-")[1] +
                              "/" +
                              custody.dateTime.split("T")[0].split("-")[0]}
                          </div>
                          <div></div>
                        </div>
                      </div>
                      {op === index ? (
                        <div className="row">
                          <div className="column">
                            <h6 className="poheads potext mt-3 mb-3">
                              Comment*
                            </h6>
                            <div className="form-group">
                              <input
                                style={{ fontSize: "16px" }}
                                type="text"
                                className="form-control"
                                name="Comment"
                                onChange={(e) => console.log(e)}
                                size="20"
                                readonly
                              />
                            </div>
                          </div>
                          <div className="column">
                            <h6 className="poheads potext mt-3 mb-3">
                              UploadedImage
                            </h6>
                          </div>
                        </div>
                      ) : null}
                      {op === index ? (
                        <div
                          className="arrow float-right"
                          onClick={() => {
                            setOp("");
                          }}
                        >
                          <img src={Down} alt="actions" height="7" width="12" />
                        </div>
                      ) : (
                        <div
                          className="arrow float-right"
                          onClick={() => {
                            setOp(index);
                          }}
                        >
                          <img
                            src={traceDrop}
                            alt="actions"
                            height="7"
                            width="12"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default ChainOfCustody;
