import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Add from "../../assets/icons/createshipment.png";
import CalenderIcon from "../../assets/icons/date_icon.png";
import EditTable from "./table/editTable";
import "./style.scss";
import { newShipment } from "../../actions/shipmentActions";
import { turnOn, turnOff } from "../../actions/spinnerActions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ShipmentPopUp from "./shipmentPopUp";
import ShipmentFailPopUp from "./shipmentFailPopUp";
import Modal from "../../shared/modal";
import { Formik } from "formik";
import { getProducts } from "../../actions/poActions";

const CreateShipment = (props) => {
  const { t } = props;
  const [senderOrganisation, setSenderOrganisation] = useState([]);
  const [products, setProducts] = useState([]);
  const [addProducts, setAddProducts] = useState([]);
  const dispatch = useDispatch();
  const [category, setCategory] = useState([]);
  const [OrderId] = useState("Select Order ID");
  const [senderOrgId] = useState("null");
  const [orderIdSelected] = useState(false);
  const user = useSelector((state) => state.user);
  const [OrderDetails, setOrderDetails] = useState({});
  const [productQuantity] = useState("");
  const [openCreatedInventory, setOpenCreatedInventory] = useState(false);
  const [openShipmentFail, setOpenShipmentFail] = useState(false);
  const [shipmentError, setShipmentError] = useState("");
  const [modalProps, setModalProps] = useState({});
  const ref1 = useRef(null);
  const ref2 = useRef(null);

  useEffect(() => {
    async function fetchData() {
      const orgSplit = user.organisation?.split("/");
      if (orgSplit?.length) setSenderOrganisation([orgSplit[0]]);
      const result1 = await getProducts();
      const categoryArray = result1.map((product) => product.type);
      setCategory(
        categoryArray
          .filter((value, index, self) => self.indexOf(value) === index)
          .map((item) => {
            return {
              value: item,
              label: item,
            };
          })
      );
    }

    fetchData();
  }, [props.location, user.organisation]);

  const closeModal = () => {
    setOpenCreatedInventory(false);
    props.history.push("/shipments");
  };

  const closeModalFail = () => {
    setOpenShipmentFail(false);
  };

  const onAssign = async (values) => {
    let error = false;
    const {
      fromOrg,
      toOrg,
      airWayBillNo,
      reset,
      labelCode,
      shipmentDate,
      estimateDeliveryDate,
      toOrgLoc,
      fromOrgLoc,
      shipmentID,
      products,
    } = values;
    let errorMsg = "";
    products.forEach((p) => {
      if (p.productQuantity < 1) {
        error = true;
        errorMsg = "product quantity";
      } else if (!p.batchNumber) {
        error = true;
        errorMsg = "batch number";
      }
    });
    if (!error) {
      const data = {
        airWayBillNo,
        poId: reset && reset !== "Select Order ID" ? reset : null,
        label: {
          labelId: labelCode,
          labelType: "QR_2DBAR",
        },
        taggedShipments: shipmentID,
        externalShipmentId: "",
        supplier: {
          id: fromOrg,
          locationId: fromOrgLoc,
        },
        receiver: {
          id: toOrg,
          locationId: toOrgLoc,
        },
        shippingDate: new Date(
          shipmentDate.getTime() - shipmentDate.getTimezoneOffset() * 60000
        ).toISOString(),
        expectedDeliveryDate:
          estimateDeliveryDate !== ""
            ? new Date(
                estimateDeliveryDate.getTime() -
                  estimateDeliveryDate.getTimezoneOffset() * 60000
              ).toISOString()
            : "",
        actualDeliveryDate:
          estimateDeliveryDate !== ""
            ? new Date(
                estimateDeliveryDate.getTime() -
                  estimateDeliveryDate.getTimezoneOffset() * 60000
              ).toISOString()
            : "",
        status: "CREATED",
        products: products,
        isCustom: true,
      };

      let check = 0;

      for (let i = 0; i < data.products.length; i++) {
        if (typeof data.products[i].productQuantity === "undefined") {
          check = 1;
          break;
        }
        if (typeof data.products[i].batchNumber === "undefined") {
          check = 2;
          break;
        }
      }
      if (check === 1) {
        setShipmentError("Check product quantity");
        setOpenShipmentFail(true);
      } else if (check === 2) {
        setShipmentError("Check Batch Number");
        setOpenShipmentFail(true);
      } else {
        dispatch(turnOn());
        const result = await newShipment(data);
        dispatch(turnOff());
        if (result?.id) {
          setOpenCreatedInventory(true);
          setModalProps({
            message: "Created Successfully!",
            id: result?.id,
            type: "Success",
          });
        } else {
          setShipmentError(result.data.message);
          setOpenShipmentFail(true);
        }
      }
    } else {
      setShipmentError("Check " + errorMsg);
      setOpenShipmentFail(true);
    }
  };

  const handleLabelIdChange = (value, i) => {
    const soDetailsClone = { ...OrderDetails };
    soDetailsClone.products[i]["labelId"] = value;
    setOrderDetails(soDetailsClone);
  };

  return (
    <div className="NewShipment">
      <h1 className="vl-heading-bdr breadcrumb my-2 mb-2">CREATE SHIPMENT</h1>
      <Formik
        enableReinitialize={true}
        initialValues={{
          poId: "",
          type: "",
          typeName: "",
          shipmentID: "",
          rtype: "",
          rtypeName: "",
          fromOrg: senderOrganisation[0],
          fromOrgLoc: "",
          toOrg: "",
          toOrgLoc: "",
          airWayBillNo: "",
          labelCode: "",
          shipmentDate: "",
          estimateDeliveryDate: "",
          products: [],
          reset: OrderId,
        }}
        validate={(values) => {
          const errors = {};
          if (!values.fromOrg) {
            errors.fromOrg = "Required";
          }
          if (!values.fromOrgLoc) {
            errors.fromOrgLoc = "Required";
          }
          if (!values.toOrg) {
            errors.toOrg = "Required";
          }
          if (!values.toOrgLoc) {
            errors.toOrgLoc = "Required";
          }
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
          if (!orderIdSelected && values.products.length === 0) {
            errors.products = "Required";
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
                <label htmlFor="client" className="table-heading f-700 headsup">
                  {t("from")}
                </label>
                <div className="row">
                  <div className="col-md-6 com-sm-12">
                    <div className="form-group">
                      <label
                        className="table-heading f-400 name"
                        htmlFor="organizationName"
                      >
                        {t("organisation_name")}*
                      </label>
                      <input
                        className={`input table-heading refship ${
                          errors.fromOrg && touched.fromOrg
                            ? "border-danger"
                            : ""
                        }`}
                        type="text"
                        id="organizationName"
                        name="fromOrg"
                        value={values.fromOrg}
                        onBlur={handleBlur}
                        placeholder="Enter Organisation Name"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6 com-sm-12">
                    <div className="form-group">
                      <label
                        className="table-heading f-400 name"
                        htmlFor="orgLocation"
                      >
                        {t("organisation_location")}*
                      </label>
                      <input
                        className={`input table-heading refship ${
                          errors.fromOrgLoc && touched.fromOrgLoc
                            ? "border-danger"
                            : ""
                        }`}
                        type="text"
                        id="orgLocation"
                        name="fromOrgLoc"
                        value={values.fromOrgLoc}
                        onBlur={handleBlur}
                        placeholder="Enter Organisation Location"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col bg-white formContainer low mr-3">
                <label htmlFor="client" className="table-heading f-700 headsup">
                  {t("to")}
                </label>
                <div className="row">
                  <div className="col-md-6 com-sm-12">
                    <div className="form-group">
                      <label
                        className="table-heading f-400 name"
                        htmlFor="organizationName"
                      >
                        {t("organisation_name")}*
                      </label>
                      <input
                        className={`input table-heading refship ${
                          errors.fromOrgLoc && touched.fromOrgLoc
                            ? "border-danger"
                            : ""
                        }`}
                        type="text"
                        id="organizationName"
                        name="toOrg"
                        value={values.toOrg}
                        onBlur={handleBlur}
                        placeholder="Enter Organisation Name"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6 com-sm-12">
                    <div className="form-group">
                      <label
                        className="table-heading f-400 name"
                        htmlFor="delLocation"
                      >
                        {t("delivery_location")}*
                      </label>
                      <input
                        className={`input table-heading refship ${
                          errors.fromOrgLoc && touched.fromOrgLoc
                            ? "border-danger"
                            : ""
                        }`}
                        type="text"
                        id="delLocation"
                        name="toOrgLoc"
                        value={values.toOrgLoc}
                        onBlur={handleBlur}
                        placeholder="Enter Organisation Location"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col bg-white formContainer low mr-3">
                <label htmlFor="client" className="table-heading f-700 headsup">
                  {t("delivery_details")}:
                </label>
                <div className="row">
                  <div className="col-md-6 com-sm-12 mt-2">
                    <label
                      className="table-heading f-400 name"
                      htmlFor="organizationName"
                    >
                      {t("transit_no")}*
                    </label>
                    <input
                      className={`input table-heading refship ${
                        errors.airWayBillNo && touched.airWayBillNo
                          ? "border-danger"
                          : ""
                      }`}
                      type="text"
                      id="referenceShipmentId"
                      name="airWayBillNo"
                      value={values.airWayBillNo}
                      onBlur={handleBlur}
                      placeholder="Enter Transit Number"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6 com-sm-12 mt-3">
                    <div className="form-group">
                      <label
                        className="table-heading f-400 name"
                        htmlFor="delLocation"
                      >
                        {t("shipment_date")}*
                      </label>
                      <div
                        className={`input table-heading refship ${
                          errors.shipmentDate && touched.shipmentDate
                            ? "border-danger"
                            : ""
                        }`}
                      >
                        <DatePicker
                          ref={ref1}
                          className="date"
                          selected={
                            values.shipmentDate
                              ? new Date(Date.parse(values.shipmentDate))
                              : values.shipmentDate
                          }
                          onKeyDown={(e) =>
                            e.keyCode !== 8 && e.preventDefault()
                          }
                          // minDate={new Date()}
                          placeholderText="Enter Shipment Date"
                          onChange={(date) => {
                            setFieldValue("shipmentDate", date);
                          }}
                          showYearDropdown
                          dateFormatCalendar="MMMM"
                          yearDropdownItemNumber={15}
                          scrollableYearDropdown
                        />
                        <img
                          src={CalenderIcon}
                          alt="calenderIcon"
                          className="Calender-icon"
                          onClick={() => ref1.current.setFocus()}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 com-sm-12">
                    <label
                      className="table-heading f-400 name"
                      htmlFor="organizationName"
                    >
                      {t("label_code")}*
                    </label>
                    <input
                      className={`input table-heading refship ${
                        errors.labelCode && touched.labelCode
                          ? "border-danger"
                          : ""
                      }`}
                      type="text"
                      id="referenceShipmentId"
                      name="labelCode"
                      value={values.labelCode}
                      onBlur={handleBlur}
                      placeholder="Enter Label Code"
                      onChange={handleChange}
                    />
                    {/* {errors.labelCode && touched.labelCode && (
                      <span className="error-msg text-danger-LC">
                        {errors.labelCode}
                      </span>
                    )} */}
                  </div>

                  <div className="col-md-6 com-sm-12">
                    <div className="form-group">
                      <label
                        className="table-heading f-400 name"
                        htmlFor="shipmentId "
                      >
                        {t("estimated_delivery_date")}*
                      </label>
                      <div
                        className={`input table-heading refship ${
                          errors.estimateDeliveryDate &&
                          touched.estimateDeliveryDate
                            ? "border-danger"
                            : ""
                        }`}
                      >
                        <DatePicker
                          ref={ref2}
                          className="date"
                          placeholderText="Enter Delivery Date"
                          onChange={(date) => {
                            setFieldValue("estimateDeliveryDate", date);
                          }}
                          selected={
                            values.estimateDeliveryDate
                              ? new Date(
                                  Date.parse(values.estimateDeliveryDate)
                                )
                              : values.estimateDeliveryDate
                          }
                          // minDate={new Date()}
                          onKeyDown={(e) =>
                            e.keyCode !== 8 && e.preventDefault()
                          }
                          showYearDropdown
                          dateFormatCalendar="MMMM"
                          yearDropdownItemNumber={100}
                          scrollableYearDropdown
                        />
                        <img
                          src={CalenderIcon}
                          alt="calenderIcon"
                          className="Calender-icon"
                          onClick={() => ref2.current.setFocus()}
                        />
                        {errors.estimateDeliveryDate &&
                          touched.estimateDeliveryDate && (
                            <span className="error-msg text-danger-DD">
                              {errors.estimateDeliveryDate}
                            </span>
                          )}
                        <div />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <label
                htmlFor="productDetails"
                className="table-heading f-700 headsup"
              >
                {t("product_details")}
              </label>
              <EditTable
                check="0"
                warehouseID={senderOrgId}
                product={addProducts}
                products={products}
                category={category}
                handleQuantityChange={(v, i) => {
                  let newArr = [...addProducts];
                  newArr[i].productQuantity = v;
                  setFieldValue(
                    "products",
                    newArr.map((row) => ({
                      productCategory: row.type,
                      productID: row.id,
                      productQuantity: row.productQuantity,
                      batchNumber: row.batchNumber,
                      productName: row.name,
                      manufacturer: row.manufacturer,
                      quantity: row.quantity,
                    }))
                  );
                  setAddProducts((prod) => [...newArr]);
                }}
                handleManufacturerChange={(i, v) => {
                  let newArr = [...addProducts];
                  newArr[i].manufacturer = v;
                  setFieldValue(
                    "products",
                    newArr.map((row) => ({
                      productCategory: row.type,
                      productID: row.id,
                      productQuantity: row.productQuantity,
                      batchNumber: row.batchNumber,
                      productName: row.name,
                      manufacturer: row.manufacturer,
                      quantity: row.quantity,
                    }))
                  );
                  setAddProducts((prod) => [...newArr]);
                }}
                handleBatchChange={(v, i) => {
                  let newArr = [...addProducts];
                  newArr[i].batchNumber = v;
                  setFieldValue(
                    "products",
                    newArr.map((row) => ({
                      productCategory: row.type,
                      productID: row.id,
                      productQuantity: row.productQuantity,
                      batchNumber: row.batchNumber,
                      productName: row.name,
                      manufacturer: row.manufacturer,
                      quantity: row.quantity,
                    }))
                  );
                  setAddProducts((prod) => [...newArr]);
                }}
                enableDelete={true}
                onRemoveRow={(index) => {
                  const prodIndex = products.findIndex(
                    (p) => p.id === addProducts[index].id
                  );
                  let newArray = [...products];
                  newArray[prodIndex] = {
                    ...newArray[prodIndex],
                    isSelected: false,
                  };
                  setProducts((prod) => [...newArray]);

                  addProducts.splice(index, 1);
                  let newArr = [...addProducts];
                  if (newArr.length > 0)
                    setFieldValue(
                      "products",
                      newArr.map((row) => ({
                        productCategory: row.type,
                        productQuantity: row.productQuantity,
                        batchNumber: row.batchNumber,
                        productName: row.name,
                        manufacturer: row.manufacturer,
                        quantity: row.quantity,
                      }))
                    );
                  else setFieldValue("products", []);
                  setAddProducts((prod) => [...newArr]);
                }}
                handleProductChange={(i, v) => {
                  let newArr = [...addProducts];
                  newArr[i]["name"] = v;
                  setFieldValue(
                    "products",
                    newArr.map((row) => ({
                      batchNumber: row.batchNumber,
                      productQuantity: "",
                      quantity: "",
                      name: row.name,
                      type: row.type,
                      manufacturer: row.manufacturer,
                      unitofMeasure: row.unitofMeasure,
                    }))
                  );
                  setAddProducts((prod) => [...newArr]);
                }}
                handleLabelIdChange={handleLabelIdChange}
                handleCategoryChange={(i, v) => {
                  let newArr = [...addProducts];
                  newArr[i]["type"] = v;
                  setFieldValue(
                    "products",
                    newArr.map((row) => ({
                      productCategory: row.type,
                      productQuantity: row.productQuantity,
                      batchNumber: row.batchNumber,
                      productName: row.name,
                      manufacturer: row.manufacturer,
                      quantity: row.quantity,
                    }))
                  );
                  setAddProducts((prod) => [...newArr]);
                }}
              />
              <div className="d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-white bg-white shadow-radius mt-3 font-bold"
                  onClick={() => {
                    let newArr = {
                      productName: "",
                      manufacturer: "",
                      productQuantity: "",
                      batchNumber: "",
                      unitofMeasure: "Kgs",
                      type: "",
                    };
                    setAddProducts((prod) => [...prod, newArr]);
                  }}
                >
                  +
                  <span className="f-600 ml-1">{t("add_another_product")}</span>
                </button>
              </div>

              {/* <div className="table productTable mt-2">
                <div className="rTable">
                  <div className="rTableHeading">
                    <div className="rTableHead pro">Product Name</div>

                    <div className="rTableHead pro">Manufacturer</div>

                    <div className="rTableHead pro">Quantity</div>
                  </div>

                </div>
              </div> */}
            </div>
            {errors.products && touched.products && (
              <span className="error-msg text-danger-DD">
                {errors.products}
              </span>
            )}
            <div className="d-flex justify-content-between">
              <div className="value">{productQuantity}</div>
              <div className="d-flex">
                <button
                  type="button"
                  className="btn btn-outline-primary font-bold mr-2"
                  onClick={() => props.history.push("/shipments")}
                >
                  {t("cancel")}
                </button>

                <button className="btn btn-orange f-600">
                  <img
                    src={Add}
                    width="20"
                    height="17"
                    className="mr-2 mb-1"
                    alt=""
                  />
                  <span>{t("create_shipment")}</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </Formik>
      {openCreatedInventory && (
        <Modal close={() => closeModal()} size="modal-sm">
          <ShipmentPopUp onHide={closeModal} {...modalProps} t={t} />
        </Modal>
      )}

      {openShipmentFail && (
        <Modal close={() => closeModalFail()} size="modal-sm">
          <ShipmentFailPopUp
            onHide={closeModalFail}
            {...modalProps}
            shipmentError={shipmentError}
            t={t}
          />
        </Modal>
      )}
    </div>
  );
};

export default CreateShipment;
