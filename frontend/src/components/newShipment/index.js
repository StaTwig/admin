import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import EditTable from "./table/editTable";
import "./style.scss";
import { createShipment } from "../../actions/shipmentActions";
import { turnOn, turnOff } from "../../actions/spinnerActions";
import {
  getShippingOrderIds,
  getShippingOrderById,
} from "../../actions/shippingOrderAction";
import DropdownButton from "../../shared/dropdownButtonGroup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ShipmentPopUp from "./shipmentPopUp";
import ShipmentFailPopUp from "./shipmentFailPopUp";
import Modal from "../../shared/modal";

const NewShipment = (props) => {
  const [shippingOrderIds, setShippingOrderIds] = useState([]);
  const dispatch = useDispatch();
  const [shippingOrderId, setShippingOrderId] = useState(
    "Select Shipping Order ID"
  );
  const user = useSelector((state) => state.user);
  const [shippingOrderDetails, setShippingOrderDetails] = useState({});
  const [po, setPo] = useState("");
  const [airWayBillNo, setAirWayBillNo] = useState("");
  const [labelCode, setLabelCode] = useState("");
  const [shipmentDate, setShipmentDate] = useState("");
  const [estimateDeliveryDate, setEstimateDeliveryDate] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [openCreatedInventory, setOpenCreatedInventory] = useState(false);
  const [openShipmentFail, setOpenShipmentFail] = useState(false);
  const [shipmentError, setShipmentError] = useState("");

  useEffect(() => {
    async function fetchData() {
      const { search } = props.location;
      const result = await getShippingOrderIds();
      const ids = result.map((so) => so.id);

      setShippingOrderIds(ids);

      if (search) {
        const shippingId = search.split("=")[1];

        handleSOChange(shippingId);
      }
    }

    fetchData();
  }, []);

  const closeModal = () => {
    setOpenCreatedInventory(false);
    props.history.push("/shipments");
  };

  const closeModalFail = () => {
    setOpenShipmentFail(false);
  };

  const onChange = (date) => setShipmentDate(date);
  const onChange1 = (date) => setEstimateDeliveryDate(date);

  const profile = useSelector((state) => {
    return state.user;
  });

  const dates = ["shipmentDate", "estimateDeliveryDate"];

  const dateValidation = (date) => {
    try {
      let error = false;
      let a = eval(date[0]);
      let b = eval(date[1]);

      if (a > b) {
        setShipmentError("Check deliveryDate");
        setOpenShipmentFail(true);
        error = true;
      }
      return error;
    } catch (err) {
      setOpenShipmentFail(true);
    }

    let error = false;
    let a = eval(date[0]);
    let b = eval(date[1]);

    if (a > b) {
      setShipmentError("Check deliveryDate");
      setOpenShipmentFail(true);
      error = true;
    }
    return error;
  };

  const onAssign = async () => {
    let error = false;
    // dates.forEach(date => { if(!error) dateValidation(date) }); TODO Add validations
    setErrorMessage("");

    if (shippingOrderId === "Select Shipping Order ID") {
      setErrorMessage("Shipping Order Id cannot be empty");
      return;
    }

    if (!airWayBillNo) {
      setErrorMessage("Airway Bill No cannot be empty");
      return;
    }

    if (!shipmentDate) {
      setErrorMessage("Shipment date cannot be empty");
      return;
    }

    if (!estimateDeliveryDate) {
      setErrorMessage("Estimate date cannot be empty");
      return;
    }

    if (!error) {
      const data = {
        airWayBillNo,
        shippingOrderId,
        label: {
          labelId: labelCode,

          labelType: "QR_2DBAR",
        },
        externalShipmentId: "",
        supplier: {
          id: user.id,

          locationId: shippingOrderDetails.supplierDetails.locationId,
        },
        receiver: {
          id:
            shippingOrderDetails.customerDetails.shippingAddress
              .shipmentReceiverId,
          locationId:
            shippingOrderDetails.customerDetails.shippingAddress
              .shippingAddressId,
        },
        shippingDate: new Date(
          shipmentDate.getTime() - shipmentDate.getTimezoneOffset() * 60000
        ).toISOString(),
        expectedDeliveryDate: new Date(
          estimateDeliveryDate.getTime() -
          estimateDeliveryDate.getTimezoneOffset() * 60000
        ).toISOString(),
        actualDeliveryDate: new Date(
          estimateDeliveryDate.getTime() -
          estimateDeliveryDate.getTimezoneOffset() * 60000
        ).toISOString(),
        status: "CREATED",
        products: shippingOrderDetails.products,
        poId: shippingOrderDetails.purchaseOrderId,
      };

      const result = await createShipment(data);
      console.log("data", result);
      if (result?.id) {
        setMessage("Created Shipment Success");
      } else {
        setErrorMessage("Create Shipment Failed");
      }
    }
  };

  const handleSOChange = async (item) => {
    setShippingOrderId(item);
    dispatch(turnOn());
    const result = await getShippingOrderById(item);
    setShippingOrderDetails(result);
    dispatch(turnOff());
  };

  const handleQuantityChange = (value, i) => {
    const soDetailsClone = { ...shippingOrderDetails };
    soDetailsClone.products[i].productQuantity = value;
    setShippingOrderDetails(soDetailsClone);
  };

  const handleLabelIdChange = (value, i) => {
    const soDetailsClone = { ...shippingOrderDetails };
    soDetailsClone.products[i]["labelId"] = value;
    setShippingOrderDetails(soDetailsClone);
  };

  return (
    <div className="NewShipment">
      <h1 className="breadcrumb">CREATE SHIPMENT</h1>

      <div className="row mb-3">
        <div className="col bg-white formContainer low mr-3">
          <div className="col-md-6 com-sm-12">
            <div className="form-group">
              <label htmlFor="orderID">Order ID</label>

              <div className="form-control">
                <DropdownButton
                  name={shippingOrderId}
                  onSelect={handleSOChange}
                  groups={shippingOrderIds}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col bg-white formContainer low mr-3">
          <label htmlFor="client" className="headsup">
            From
          </label>

          <div className="row">
            <div className="col-md-6 com-sm-12">
              <div className="form-group">
                <label htmlFor="organizationName">Organisation Name</label>

                <div className="form-control">
                  <DropdownButton
                    name={shippingOrderId}
                    onSelect={handleSOChange}
                    groups={shippingOrderIds}
                  />
                </div>
              </div>
            </div>

            <div className="col-md-6 com-sm-12">
              <div className="form-group">
                <label htmlFor="orgLocation">Organization Location</label>

                <div className="form-control">
                  <DropdownButton
                    name={shippingOrderId}
                    onSelect={handleSOChange}
                    groups={shippingOrderIds}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col bg-white formContainer low mr-3">
          <label htmlFor="client" className="headsup">
            To
          </label>

          <div className="row">
            <div className="col-md-6 com-sm-12">
              <div className="form-group">
                <label htmlFor="organizationName">Organisation Name</label>

                <div className="form-control">
                  <DropdownButton
                    name={shippingOrderId}
                    onSelect={handleSOChange}
                    groups={shippingOrderIds}
                  />
                </div>
              </div>
            </div>

            <div className="col-md-6 com-sm-12">
              <div className="form-group">
                <label htmlFor="delLocation">Delivery Location</label>

                <div className="form-control">
                  <DropdownButton
                    name={shippingOrderId}
                    onSelect={handleSOChange}
                    groups={shippingOrderIds}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col bg-white formContainer low mr-3">
          <label htmlFor="client" className="headsup">
            Delivery Details:
          </label>

          <div className="row">
            <div className="col-md-6 com-sm-12">
              <div className="form-group">
                <label htmlFor="organizationName">Airway Bill</label>

                <input
                  type="text"
                  className="form-control"
                  name="airWayBillNo"
                  placeholder="Enter Air Way Bill No"
                  onChange={(e) => setAirWayBillNo(e.target.value)}
                  value={airWayBillNo}
                />
              </div>
            </div>

            <div className="col-md-6 com-sm-12">
              <div className="form-group">
                <label htmlFor="delLocation">Shipment Date</label>

                <div className="form-control">
                  <DatePicker
                    className="date"
                    selected={
                      shipmentDate
                        ? new Date(Date.parse(shipmentDate))
                        : shipmentDate
                    }
                    onKeyDown={(e) => e.keyCode != 8 && e.preventDefault()}
                    minDate={new Date()}
                    placeholderText="Enter Shipment Date"
                    onChange={onChange}
                    showYearDropdown
                    dateFormatCalendar="MMMM"
                    yearDropdownItemNumber={15}
                    scrollableYearDropdown
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 com-sm-12">
              <div className="form-group">
                <label htmlFor="Label code">Label Code</label>

                <input
                  type="text"
                  className="form-control"
                  name="Label code"
                  placeholder="Enter Label ID"
                  onChange={(e) => setLabelCode(e.target.value)}
                  value={labelCode}
                />
              </div>
            </div>

            <div className="col-md-6 com-sm-12">
              <div className="form-group">
                <label htmlFor="shipmentId "> Estimate Delivery Date</label>

                <div className="form-control">
                  <DatePicker
                    className="date"
                    placeholderText="Enter Delivery Date"
                    onChange={onChange1}
                    selected={
                      estimateDeliveryDate
                        ? new Date(Date.parse(estimateDeliveryDate))
                        : estimateDeliveryDate
                    }
                    minDate={new Date()}
                    onKeyDown={(e) => e.keyCode != 8 && e.preventDefault()}
                    showYearDropdown
                    dateFormatCalendar="MMMM"
                    yearDropdownItemNumber={100}
                    scrollableYearDropdown
                  />

                  <div />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <label htmlFor="productDetails" className="headsup">
          Product Details
        </label>

        <div class="table productTable mt-2">
          <div class="rTable">
            <div class="rTableHeading">
              <div class="rTableHead pro">Product Name</div>

              <div class="rTableHead pro">Manufacturer</div>

              <div class="rTableHead pro">Quantity</div>
            </div>

            <div class="rTableRow">
              <div class="rTableCell p-2">
                <div class="userpanel p-0">
                  <div class="profileIconRound recived-bg">OPV</div>

                  <div class="d-flex flex-column">
                    <div class="title recived-text">OPV</div>
                  </div>
                </div>
              </div>

              <div class="rTableCell p-2">GSK</div>

              <div class="rTableCell p-2">70000</div>
            </div>

            <div class="rTableRow">
              <div class="rTableCell p-2">
                <div class="userpanel p-0">
                  <div class="profileIconRound recived-bg">OPV</div>

                  <div class="d-flex flex-column">
                    <div class="title recived-text">OPV</div>
                  </div>
                </div>
              </div>

              <div class="rTableCell p-2">GSK</div>

              <div class="rTableCell p-2">70000</div>
            </div>

            <div class="rTableRow">
              <div class="rTableCell p-2">
                <div class="userpanel p-0">
                  <div class="profileIconRound recived-bg">OPV</div>

                  <div class="d-flex flex-column">
                    <div class="title recived-text">OPV</div>
                  </div>
                </div>
              </div>

              <div class="rTableCell p-2">GSK</div>

              <div class="rTableCell p-2">70000</div>
            </div>
          </div>
        </div>
      </div>

      {shippingOrderDetails?.products?.map((product, i) => (
        <EditTable
          product={product}
          handleQuantityChange={handleQuantityChange}
          handleLabelIdChange={handleLabelIdChange}
          index={i}
        />
      ))}

      <div className="d-flex justify-content-between">
        <div className="value">{productQuantity}</div>

        <div className="d-flex">
          <button class="btn btn-white shadow-radius font-bold mr-2">
            Cancel
          </button>

          <button className="btn btn-primary mr-2 mb-1" onClick={onAssign}>
            {" "}
            Create Shipment
          </button>
        </div>
      </div>

      {openCreatedInventory && (
        <Modal
          close={() => closeModal()}
          size="modal-sm" //for other size's use `modal-lg, modal-md, modal-sm`
        >
          <ShipmentPopUp
            onHide={closeModal} //FailurePopUp
          />
        </Modal>
      )}

      {openShipmentFail && (
        <Modal
          close={() => closeModalFail()}
          size="modal-sm" //for other size's use `modal-lg, modal-md, modal-sm`
        >
          <ShipmentFailPopUp
            onHide={closeModalFail} //FailurePopUp
            shipmentError={shipmentError}
          />
        </Modal>
      )}

      {message && (
        <div className="alert alert-success d-flex justify-content-center mt-3">
          {message}
        </div>
      )}

      {errorMessage && (
        <div className="alert alert-danger d-flex justify-content-center mt-3">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default NewShipment;
