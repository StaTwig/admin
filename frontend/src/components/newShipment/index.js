import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Add from '../../assets/icons/createshipment.png';
import EditTable from "./table/editTable";
import "./style.scss";
import { createShipment } from "../../actions/shipmentActions";
import { turnOn, turnOff } from "../../actions/spinnerActions";
import {
  getShippingOrderIds,
  getShippingOrderById,
  getWarehouseByOrgId,
  getAllOrganisations
} from "../../actions/shippingOrderAction";
import DropdownButton from "../../shared/dropdownButtonGroup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ShipmentPopUp from "./shipmentPopUp";
import ShipmentFailPopUp from "./shipmentFailPopUp";
import Modal from "../../shared/modal";
import { Formik } from "formik";
import { getProducts } from '../../actions/poActions';

const NewShipment = (props) => {
  const [shippingOrderIds, setShippingOrderIds] = useState([]);
  const [senderOrganisation, setSenderOrganisation] = useState([]);
  const [allOrganisations, setAllOrganisations] = useState([]);
  const [senderWarehouses, setSenderWarehouses] = useState([]);
  const [receiverWarehouses, setReceiverWarehouses] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [products, setProducts] = useState("");
  const dispatch = useDispatch();
  const [shippingOrderId, setShippingOrderId] = useState(
    "Select Shipping Order ID"
  );
  const [senderOrgId, setSenderOrgId] = useState(
    "Select Organisation Name"
  );
  const [senderOrgLoc, setSenderOrgLoc] = useState(
    "Select Organisation Location"
  );
  const [receiverOrgId, setReceiverOrgId] = useState(
    "Select Organisation Name"
  );
  const [receiverOrgLoc, setReceiverOrgLoc] = useState(
    "Select Delivery Location"
  );
  const user = useSelector((state) => state.user);
  const [shippingOrderDetails, setShippingOrderDetails] = useState({});
  const [po, setPo] = useState("");
  // const [shipmentDate, setShipmentDate] = useState("");
  // const [estimateDeliveryDate, setEstimateDeliveryDate] = useState("");
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

      const orgs = await getAllOrganisations();
      const orgSplit = user.organisation?.split('/');
      setSenderOrganisation([orgSplit[0]]);
      const organisations = orgs.data.filter((org) => org.id != orgSplit[1]);
      setAllOrganisations(organisations);

      const warehouses = await getWarehouseByOrgId(orgSplit[1]);
      setSenderWarehouses(warehouses.data);

       const prds = await getProducts();
        const productsArray = prds.map(
          product => product.name,
        );
        setProducts(prds);

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

  const onOrgChange = async (value) => {
    try {
      const warehouse = await getWarehouseByOrgId(value);
      setReceiverWarehouses(warehouse.data);
    }
    catch (err) {
      setErrorMessage(err);
    }
  }

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

  const onAssign = async (values) => {
    let error = false;
    // dates.forEach(date => { if (!error) dateValidation(date) });
    const { airWayBillNo, shippingOrderId, labelCode, shipmentDate, estimateDeliveryDate } = values;
    shippingOrderDetails.products.forEach((p) => {
      if (p.productQuanty < 1)
        error = true;
    })

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

      dispatch(turnOn());
      const result = await createShipment(data);
      dispatch(turnOff());
      // console.log("data", result);
      if (result?.id) {
        setMessage("Created Shipment Success");
        setOpenCreatedInventory(true);
      } else {
        setOpenShipmentFail(true);
        setErrorMessage("Create Shipment Failed");
      }
    }
    else {
      setShipmentError("Check product quantity");
      setOpenShipmentFail(true);
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
      <Formik
        enableReinitialize={true}
        initialValues={{
          shippingOrderId: "",
          fromOrg: senderOrganisation[0],
          fromOrgLoc: "",
          toOrg: "",
          toOrgLoc: "",
          airWayBillNo: "",
          labelCode: "",
          shipmentDate: "",
          estimateDeliveryDate: "",
        }}
        validate={(values) => {
          const errors = {};
          // if (!values.fromOrg) {
          //   errors.fromOrg = "Required";
          // }
          // if (!values.fromOrgLoc) {
          //   errors.fromOrgLoc = "Required";
          // }
          // if (!values.toOrg) {
          //   errors.toOrg = "Required";
          // }
          // if (!values.toOrgLoc) {
          //   errors.toOrgLoc = "Required";
          // }
          if (!values.airWayBillNo) {
            errors.airWayBillNo = "Required";
          }
          if (!values.labelCode) {
            errors.labelCode = "Required";
          }
          if (!values.shipmentDate) {
            errors.shipmentDate = "Required";
          }
          if (!values.estimateDeliveryDate) {
            errors.estimateDeliveryDate = "Required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          onAssign(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          dirty,
        }) => (
          <form onSubmit={handleSubmit} className="mb-3">
            <div className="row mb-3">
              <div className="col bg-white formContainer low mr-3">
                <div className="col-md-6 com-sm-12">
                  <div className="form-group">
                    <label htmlFor="orderID">Order ID</label>
                    <div className="form-control">
                      <DropdownButton
                        name={shippingOrderId}
                        onSelect={async(v) => {
                          setFieldValue('shippingOrderId', v);
                          // handleSOChange(v);
                          setShippingOrderId(v);
                          dispatch(turnOn());
                          const result = await getShippingOrderById(v);
                          setReceiverOrgLoc(result.customerDetails.deliveryLocation);
                          setReceiverOrgId(result.customerDetails.customerOrgName);
                          setShippingOrderDetails(result);
                          dispatch(turnOff());
                          setDisabled(true);
                          let warehouse = senderWarehouses.filter(w => w.id == result.supplierDetails.locationId);
                          setSenderOrgLoc(warehouse[0].postalAddress);
                        }}
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
                      <label htmlFor="organizationName">Organisation Name*</label>
                      <div className="form-control">
                        <DropdownButton
                          name={senderOrganisation[0]}
                          disabled={true}
                          onSelect={() => { }}
                          groups={senderOrganisation}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 com-sm-12">
                    <div className="form-group">
                      <label htmlFor="orgLocation">Organization Location*</label>
                      <div className="form-control">
                        <DropdownButton
                          name={senderOrgLoc}
                          disabled={disabled}
                          onSelect={(v) => {
                            setSenderOrgLoc(v?.warehouseAddress ? (v?.warehouseAddress?.firstLine + ', ' + v?.warehouseAddress?.city) : v.postalAddress);
                            setFieldValue('fromOrgLoc', v.id);
                          }}
                          groups={senderWarehouses}
                        />
                        {errors.fromOrgLoc && touched.fromOrgLoc && (
                          <span className="error-msg text-danger">{errors.fromOrgLoc}</span>
                        )}
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
                      <label htmlFor="organizationName">Organisation Name*</label>
                      <div className="form-control">
                        <DropdownButton
                          name={receiverOrgId}
                          disabled={disabled}
                          onSelect={(v) => {
                            setReceiverOrgLoc("Select Delivery Location");
                            setFieldValue('toOrgLoc', '');
                            setReceiverOrgId(v.name);
                            setFieldValue('toOrg', v.id);
                            onOrgChange(v.id);
                          }}
                          groups={allOrganisations}
                        />
                        {errors.toOrg && touched.toOrg && (
                          <span className="error-msg text-danger">{errors.toOrg}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 com-sm-12">
                    <div className="form-group">
                      <label htmlFor="delLocation">Delivery Location*</label>
                      <div className="form-control">
                        <DropdownButton
                          name={receiverOrgLoc}
                          disabled={disabled}
                          onSelect={(v) => {
                            setReceiverOrgLoc(v?.warehouseAddress ? (v?.warehouseAddress?.firstLine + ', ' + v?.warehouseAddress?.city) : v.postalAddress);
                            setFieldValue('toOrgLoc', v.id);
                          }}
                          groups={receiverWarehouses}
                        />
                        {errors.toOrgLoc && touched.toOrgLoc && (
                          <span className="error-msg text-danger">{errors.toOrgLoc}</span>
                        )}
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
                      <label htmlFor="organizationName">Airway Bill*</label>
                      <input
                        type="text"
                        className="form-control"
                        name="airWayBillNo"
                        onBlur={handleBlur}
                        placeholder="Enter Air Way Bill No"
                        onChange={handleChange}
                        value={values.airWayBillNo}
                      />

                      {errors.airWayBillNo && touched.airWayBillNo && (
                        <span className="error-msg text-danger">{errors.airWayBillNo}</span>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6 com-sm-12">
                    <div className="form-group">
                      <label htmlFor="delLocation">Shipment Date*</label>
                      <div className="form-control">
                        <DatePicker
                          className="date"
                          selected={
                            values.shipmentDate
                              ? new Date(Date.parse(values.shipmentDate))
                              : values.shipmentDate
                          }
                          onKeyDown={(e) => e.keyCode != 8 && e.preventDefault()}
                          minDate={new Date()}
                  placeholderText="Enter Shipment Date"
      //        <img src={Date} width="20" height="17" className="mr-2 mb-1" />
                            onChange={(date) => {
                            setFieldValue('shipmentDate', date);
                            // setShipmentDate(date);
                          }}
                          showYearDropdown
                          dateFormatCalendar="MMMM"
                          yearDropdownItemNumber={15}
                          scrollableYearDropdown
                        />
                        {errors.shipmentDate && touched.shipmentDate && (
                          <span className="error-msg text-danger">{errors.shipmentDate}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 com-sm-12">
                    <div className="form-group">
                      <label htmlFor="Label code">Label Code*</label>
                      <input
                        type="text"
                        className="form-control"
                        name="labelCode"
                        placeholder="Enter Label ID"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.labelCode}
                      />
                      {errors.labelCode && touched.labelCode && (
                        <span className="error-msg text-danger">{errors.labelCode}</span>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6 com-sm-12">
                    <div className="form-group">
                      <label htmlFor="shipmentId "> Estimate Delivery Date</label>
                      <div className="form-control">
                        <DatePicker
                          className="date"
                          placeholderText="Enter Delivery Date"

                          onChange={(date) => {
                            setFieldValue('estimateDeliveryDate', date);
                            // setEstimateDeliveryDate(date);
                          }}
                          selected={
                            values.estimateDeliveryDate
                              ? new Date(Date.parse(values.estimateDeliveryDate))
                              : values.estimateDeliveryDate
                          }
                          minDate={new Date()}
                          onKeyDown={(e) => e.keyCode != 8 && e.preventDefault()}
                          showYearDropdown
                          dateFormatCalendar="MMMM"
                          yearDropdownItemNumber={100}
                          scrollableYearDropdown
                        />
                        {errors.estimateDeliveryDate && touched.estimateDeliveryDate && (
                          <span className="error-msg text-danger">{errors.estimateDeliveryDate}</span>
                        )}
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
              {shippingOrderDetails?.products?.map((product, i) => (
                <EditTable
                  product={product}
                  handleQuantityChange={(v) => {
                    handleQuantityChange(v, i);
                  }}
                  handleLabelIdChange={handleLabelIdChange}
                  index={i}
                />
              ))}
              {/* <div class="table productTable mt-2">
                <div class="rTable">
                  <div class="rTableHeading">
                    <div class="rTableHead pro">Product Name</div>

                    <div class="rTableHead pro">Manufacturer</div>

                    <div class="rTableHead pro">Quantity</div>
                  </div>

                </div>
              </div> */}
            </div>

            <div className="d-flex justify-content-between">
              <div className="value">{productQuantity}</div>
              <div className="d-flex">
                <button type="button" class="btn btn-white shadow-radius font-bold mr-2"onClick={() => props.history.push('/shipments')}>
                  Cancel
                </button>

                <button className="btn btn-primary mr-2 mb-1" >
                  {" "}
<img src={Add} width="20" height="17" className="mr-2 mb-1" />
                  Create Shipment
                </button>
              </div>
            </div>

          </form>
        )}
      </Formik>
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
