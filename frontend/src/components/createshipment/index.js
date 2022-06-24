import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Add from "../../assets/icons/createshipment.png";
import CalenderIcon from "../../assets/icons/date_icon.png";
import EditTable from "./table/editTable";
import "./style.scss";
import { createShipment, getViewShipment } from "../../actions/shipmentActions";
import { turnOn, turnOff } from "../../actions/spinnerActions";
import {
  getShippingOrderById,
  getWarehouseByOrgId,
  getAllOrganisations,
  getProductsByInventoryId,
} from "../../actions/shippingOrderAction";
import { getOrder, getOpenOrderIds, addNewProduct } from "../../actions/poActions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ShipmentPopUp from "./shipmentPopUp";
import ShipmentFailPopUp from "./shipmentFailPopUp";
import Modal from "../../shared/modal";
import { Formik } from "formik";
import Select from "react-select";
import { getOrganizationsTypewithauth } from "../../actions/userActions";
import { getProducts, searchProduct } from "../../actions/poActions";
import { getProductList } from "../../actions/productActions";
import { config } from "../../config";
import axios from "axios";
// import PopUpLocation from "../../components/profile/popuplocation";
// import AddLocationCard from "../../components/editLocation/index";
import { AddLocationCard } from "../../components/Addlocation/index";
import OrganisationPopUp from "../signUp/organisationPopUp";

const CreateShipment = (props) => {
  const { t } = props;
  //const intelEnabled = props.user.type == "Third Party Logistics" ? true : false;
  const intelEnabled = true;
  const [senderOrganisationId, setSenderOrganistionId] = useState('');
  const [OrderIds, setOrderIds] = useState([]);
  const [senderOrganisation, setSenderOrganisation] = useState([]);
  const [allOrganisations, setAllOrganisations] = useState([]);
  const [senderWarehouses, setSenderWarehouses] = useState([]);
  const [receiverWarehouses, setReceiverWarehouses] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [fetchdisabled, setfetchdisabled] = useState(false);
  const [pofetchdisabled] = useState(false);
  const [FromLocationSelected, setFromLocationSelected] = useState(false);
  const [products, setProducts] = useState([]);
  const [addProducts, setAddProducts] = useState([]);
  const [FromOrgLabel, setFromOrgLabel] = useState(
    "Select Organisation Location"
  );


  // const [fromNewOrg, setFromNewOrg] = useState('');
  const [toNewOrg, setToNewOrg] = useState('');
  const [enableFromNewOrg, setEnablFromeNewOrg] = useState(false);
  const [enableToNewOrg, setEnablToeNewOrg] = useState(false);
  const [fromNewOrgRes, setFromNewOrgRes] = useState({ value: '', id: '' });
  const [toNewOrgRes, setToNewOrgRes] = useState({ value: '', id: '' });

  const [fromAddLocation, setFromAddLocation] = useState(false);

  const dispatch = useDispatch();
  const [category, setCategory] = useState([]);
  const [OrderId, setOrderId] = useState("Select Order ID");
  const [senderOrgId, setSenderOrgId] = useState("null");
  const [orderIdSelected, setOrderIdSelected] = useState(false);
  const [validShipmentID, setValidShipmentID] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [receiverOrgId, setReceiverOrgId] = useState(
    "Select Organisation Name"
  );
  const [toOrgLocLabel, settoOrgLocLabel] = useState("");
  const [receiverOrgLoc, setReceiverOrgLoc] = useState(
    t("select_delivery_location")
  );
  const user = useSelector((state) => state.user);
  const [OrderDetails, setOrderDetails] = useState({});
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [productQuantity] = useState("");
  const [openCreatedInventory, setOpenCreatedInventory] = useState(false);
  const [openShipmentFail, setOpenShipmentFail] = useState(false);
  const [shipmentError, setShipmentError] = useState("");
  const [modalProps, setModalProps] = useState({});
  const [orgTypes, setOrgTypes] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [createNewWareNOrgSuccess, setCreateNewWareNOrgSuccess] = useState('');
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const customStyles = {
    // placeholder: (provided, state) => ({
    //   color: state.isDisabled ? "black" : "grey",
    // }),
    option: (provided, state) => ({
      ...provided,
      borderBottom: "1px solid #d6d6d6",
    }),
    control: () => ({
      display: "flex",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";
      return { ...provided, opacity, transition };
    },
  };

  const handleSOChange = async (item) => {
    setOrderId(item);
    dispatch(turnOn());
    const result = await getShippingOrderById(item);
    setOrderDetails(result);
    dispatch(turnOff());
  };

  useEffect(() => {
    if (createNewWareNOrgSuccess === '') return;
    async function fetchData() {
      const userType = intelEnabled ? "TPL" : "regular"
      const orgs = await getAllOrganisations(userType);
      const organisations = orgs.data.map((item) => {
        return {
          ...item,
          value: item.id,
          label: item.name,
        };
      })
      // console.log("organisatoins ", organisations);
      setAllOrganisations([
        ...organisations,
        { name: 'new org', value: 'New org', label: 'New Org' }
      ]);
    }
    fetchData();
  }, [createNewWareNOrgSuccess])

  useEffect(() => {
    async function fetchData() {
      const result111 = await getProductList();
      setProductsList(result111.message);
      const result = await getOpenOrderIds();

      const ids = result.map((item) => {
        return {
          value: item.id,
          label: item.id,
        };
      });
      setOrderIds(ids);
      const userType = intelEnabled ? "TPL" : "regular"
      const orgs = await getAllOrganisations(userType);
      const orgSplit = user.organisation?.split("/");
      console.log("orgs ", orgs);
      const organisations = orgs.data.map((item) => {
        return {
          ...item,
          value: item.id,
          label: item.name,
        };
      })
      console.log("organisatoins ", organisations);
      setAllOrganisations([
        ...organisations,
        { name: 'new org', value: 'New org', label: 'New Org' }
      ]);
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

      const warehouses = await getWarehouseByOrgId(orgSplit?.length ? orgSplit[1] : "");
      if (warehouses) {
        const ware = warehouses.data.map((v) => {
          return {
            ...v,
            value: v.id,
            label: v?.warehouseAddress
              ? v?.warehouseAddress?.firstLine +
              "/" +
              v?.warehouseAddress?.city +
              ", " +
              v?.warehouseAddress?.state
              : v?.title + "/" + v.postalAddress,
          };
        });
        ware.push({ name: 'new org', value: 'New org', label: 'New Org' });
        setSenderWarehouses(ware);
      }

      const orgType = await getOrganizationsTypewithauth("CONF000");
      setOrgTypes(
        orgType.data.length > 0
          ? orgType.data[0].organisationTypes.map((item) => {
            return {
              value: item.id,
              label: item.name,
            };
          })
          : []
      );

      // if (search) {
      //   const shippingId = search.split("=")[1];
      //   handleSOChange(shippingId);
      // }
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

  const onOrgChange = async (value) => {
    try {
      const userType = intelEnabled ? "TPL" : "regular"
      const warehouse = await getWarehouseByOrgId(value, userType);
      setReceiverWarehouses(
        warehouse.data.map((v) => {
          return {
            ...v,
            value: v.id,
            label: v?.warehouseAddress
            ? v?.warehouseAddress?.firstLine +
            "/" +
            v?.warehouseAddress?.city +
            ", " +
            v?.warehouseAddress?.state
            : v?.title + "/" + v.postalAddress,
          };
        })
      );
    } catch (err) {
      setErrorMessage(err);
    }
  };

  const onSenderOrgChange = async (value) => {
    try {
      const userType = intelEnabled ? "TPL" : "regular"
      const warehouse = await getWarehouseByOrgId(value, userType);
      setSenderWarehouses(
        warehouse.data.map((v) => {
          return {
            ...v,
            value: v.id,
            label: v?.warehouseAddress
              ? v?.warehouseAddress?.firstLine +
              "/" +
              v?.warehouseAddress?.city +
              ", " +
              v?.warehouseAddress?.state
              : v?.title + "/" + v.postalAddress,
          };
        })
      );
    } catch (err) {
      setErrorMessage(err);
    }
  };

  const onWarehouseChange = async (value) => {
    try {
      if (!intelEnabled) {
        const prods = await getProductsByInventoryId(value);
        if (prods.data.length === 0) {
          alert("No products availabe in this warehouse");
          setErrorMessage("err");
          return false;
        }
        setProducts(
          prods.data.map((item) => {
            return {
              value: item.name,
              label: item.name,
              ...item,
            };
          })
        );
        setProductsList(
          prods.data.map((item) => {
            return {
              value: item.name,
              label: item.name,
              ...item,
            };
          })
        );
        return true;
      }
    } catch (err) {
      setErrorMessage(err);
      return false;
    }
  };


  const onAssign = async (values) => {
    let error = false;
    // dates.forEach(date => { if (!error) dateValidation(date) });
    const {
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
        errorMsg = `${t("product")}${t("quantity")}`;
      } else if (!p.batchNumber) {
        error = true;
        errorMsg = t("batch_number");
      }
    });
    if (!error) {
      const data = {
        airWayBillNo,
        poId: reset && reset != "Select Order ID" ? reset : null,
        label: {
          labelId: labelCode,
          labelType: "QR_2DBAR",
        },
        taggedShipments: shipmentID,
        externalShipmentId: "",
        supplier: {
          id: user.organisationId,
          locationId: fromOrgLoc,
        },
        receiver: {
          id: toOrg.split("/")[0],
          locationId: toOrgLoc.split("/")[0],
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
        // poId: OrderDetails.purchaseOrderId ? OrderDetails.purchaseOrderId : null,
      };

      var check = 0;

      for (var i = 0; i < data.products.length; i++) {
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
        setShipmentError(t("check_product_quantity"));
        setOpenShipmentFail(true);
      } else if (check === 2) {
        setShipmentError(t("check_batch_numberssssssssssss"));
        setOpenShipmentFail(true);
      } else {
        let i, j;
        let nn = data.products.length;
        for (i = 0; i < data.products.length; i++) {
          let prdctName = data.products[i].productName;
          let flag = false;

          for (j = 0; j < productsList.length; j++) {
            if (productsList[j].productName === prdctName) {
              flag = true;
              break;
            } else {
              flag = false;
            }
          }

          if (!flag) {
            setShipmentError(t("product_not_exist_inventory"));
            setOpenShipmentFail(true);
            break;
          }
        }

        if (i >= nn) {
          dispatch(turnOn());
          const result = await createShipment(data);
          dispatch(turnOff());
          if (result?.id) {
            setMessage("Created Shipment Success");
            setOpenCreatedInventory(true);
            setModalProps({
              message: "Created Successfully!",
              id: result?.id,
              type: "Success",
              t: t,
            });
          } else {

            setShipmentError(result?.data?.message);
            setOpenShipmentFail(true);
            setErrorMessage("Create Shipment Failed");
          }
        }
      }
    } else {
      setShipmentError(t("check") + " " + errorMsg);
      setOpenShipmentFail(true);
    }
  };

  const handleQuantityChange = (value, i) => {
    const soDetailsClone = { ...OrderDetails };
    if (
      parseInt(value) > parseInt(soDetailsClone.products[i].orderedQuantity)
    ) {
      soDetailsClone.products[i].productQuantity =
        soDetailsClone.products[i].orderedQuantity;
      setOrderDetails(soDetailsClone);
      alert(t("quantity_not_more_error"));
      return;
    }
    soDetailsClone.products[i].productQuantity = value;
    setOrderDetails(soDetailsClone);
  };

  const handleBatchChange = (value, i) => {
    console.log("Batch:", value, i);
    const soDetailsClone = { ...OrderDetails };
    soDetailsClone.products[i].batchNumber = value;
    setOrderDetails(soDetailsClone);
  };


  const handleLabelIdChange = (value, i) => {
    const soDetailsClone = { ...OrderDetails };
    soDetailsClone.products[i]["labelId"] = value;
    setOrderDetails(soDetailsClone);
  };
  const onCategoryChange = async (index, value, setFieldValue) => {
    try {
      const warehouse = await searchProduct(value, selectedWarehouse);
      let newArr = [...addProducts];
      newArr[index]["type"] = value;
      newArr[index] = {
        productId: "",
        batchNumber: "",
        id: "",
        productQuantity: "",
        name: "",
        type: value,
        manufacturer: "",
        unitofMeasure: "",
      };
      newArr[index]["quantity"] = "";
      setAddProducts((prod) => [...newArr]);
      let buffer = warehouse.filter(
        (item) => item.inventoryDetails.quantity > 0
      );
      setProducts(
        buffer.map((item) => {
          return {
            value: item.products.name,
            label: item.products.name,
            ...item.products,
          };
        })
      );
    } catch (err) {
      setErrorMessage(err);
    }
  };

  const onRemoveRow = (index) => {
    const inventoryStateClone = JSON.parse(
      JSON.stringify(OrderDetails?.products)
    );
    inventoryStateClone.splice(index, 1);
    const cloneOrder = OrderDetails;
    cloneOrder.products = inventoryStateClone;
    setOrderDetails(cloneOrder);
  };

  function onSearchChange(e) {
    axios.get(`${config().getSuggestions}?searchString=${e}`).then((resp) => {
      const value = resp.data.data.length > 0 ? true : false;
      setValidShipmentID(value);
    });
  }

  const saveFromNewOrgNWaherhouse = (data) => {

    const body = {
      org: { name: data.name },
      warehouse: {
        country: data.country,
        employeess: [],
        organisationId: "",
        postalAddress: null,
        region: data.region,
        supervisors: [],
        title: "",
        warehouseAddress: {
          city: data.city,
          country: data.country,
          firstLine: data.line1,
          landmark: null,
          region: data.region,
          secondLine: null,
          state: data.state,
          zipCode: data.pincode
        }
      }
    }

    // if (fromNewOrg === '') return;
    axios.post(`${config().addNewOrgNWarehouse}`, body, { headers: { "Access-Control-Allow-Origin": "*" } }).then((res) => {
      console.log("res ", res);
      setCreateNewWareNOrgSuccess(res.data.data[0].id);
      setEnablFromeNewOrg(false);

    }).catch((err) => console.log(err));
    // setEnablFromeNewOrg(false);
  }

  // const saveToNewOrg = () => {
  //   if (toNewOrg === '') return;
  //   axios.post(`${config().createNewOrg}`, { name: toNewOrg }, { headers: { "Access-Control-Allow-Origin": "*" } }).then((res) => setToNewOrgRes({ value: res.data.data.name, label: res.data.data.id })).catch((err) => console.log(err));
  //   setEnablToeNewOrg(false);
  // }

  // console.log("allOrganisations ", allOrganisations);

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
          // if (!values.labelCode) {
          //   errors.labelCode = "Required";
          // }
          if (!values.shipmentDate) {
            errors.shipmentDate = "Required";
          }
          // if (!values.estimateDeliveryDate) {
          //   errors.estimateDeliveryDate = "Required";
          // }
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
                {/* {intelEnabled && enableFromNewOrg && <div className="row m-2" >
                  <div className='col-md-6 com-sm-12 d-flex justify-content-end'>
                    <div>
                      <input placeholder="New Organistion" className="inputOrg input refship " value={fromNewOrg} onChange={e => setFromNewOrg(e.target.value)} />
                    </div>
                    <button className="btn btn-warning font-bold" onClick={saveFromNewOrg} >Save</button>
                  </div>
                </div>} */}
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
                {/* {intelEnabled && enableToNewOrg && <div className="row m-2" >
                  <div className='col-md-6 com-sm-12 d-flex justify-content-end'>
                    <div>
                      <input placeholder="New Organistion" className="inputOrg input refship " value={toNewOrg} onChange={e => setToNewOrg(e.target.value)} />
                    </div>
                    <button className="btn btn-warning  font-bold" onClick={saveToNewOrg} >Save</button>
                  </div>
                </div>} */}
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
                    {/* {errors.airWayBillNo && touched.airWayBillNo && (
                        <span className="error-msg text-danger-AB">
                          {errors.airWayBillNo}
                        </span>
                      )} */}
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
                            // setShipmentDate(date);
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
                        {/* {errors.shipmentDate && touched.shipmentDate && (
                          <span className="error-msg text-danger-SD">
                            {errors.shipmentDate}
                          </span>
                        )} */}
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
                            // setEstimateDeliveryDate(date);
                          }}
                          selected={
                            values.estimateDeliveryDate
                              ? new Date(
                                Date.parse(values.estimateDeliveryDate)
                              )
                              : values.estimateDeliveryDate
                          }
                          minDate={new Date()}
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
              {/* { OrderDetails ? (
                <EditTable
                  t={t}
                  check='1'
                  warehouseID={senderOrgId}
                  product={OrderDetails?.products || []}
                  handleQuantityChange={(v, i) => {
                    handleQuantityChange(v, i);
                  }}
                  handleBatchChange={(v, i) => {
                    handleBatchChange(v, i);
                  }}
                  enableDelete={false}
                  onRemoveRow={(index) => {
                    const prodIndex = products.findIndex(
                      (p) => p.id === OrderDetails?.products[index].id
                    );
                    let newArray = [...products];
                    newArray[prodIndex] = {
                      ...newArray[prodIndex],
                      isSelected: false,
                    };
                    setProducts((prod) => [...newArray]);

                    OrderDetails?.products.splice(index, 1);
                    let newArr = [...OrderDetails?.products];
                    if (newArr.length > 0)
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
                    else setFieldValue("products", []);
                    setAddProducts((prod) => [...newArr]);
                  }}
                  handleLabelIdChange={handleLabelIdChange}
                />
              ) 
              : (
                products?.length <= 0 && (
                  <div>
                    <h4
                      style={{
                        fontSize: "100%",
                        marginRight: "550px",
                        marginLeft: "-105px",
                        color: "red",
                      }}
                      className='mt-5 '
                    >
                      *{t("no_products_available")}
                    </h4>
                  </div>
                )
              )
              } */}

              {(
                <>
                  <EditTable
                    check='0'
                    warehouseID={senderOrgId}
                    product={addProducts}
                    t={t}
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
                    handleBatchChange={(v, i, batch) => {
                      let newArr = [...addProducts];
                      if (batch?.length > 1 && batch[0].index === i) {
                        batch.forEach((elem) => {
                          newArr[elem.index] = { ...addProducts[0] };
                          newArr[elem.index].batchNumber = elem.bnp;
                          newArr[elem.index].productQuantity = elem.quant;
                        })
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
                        setAddProducts(() => [...newArr]);
                      } else if (batch?.length === 1) {
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
                        setAddProducts(() => [...newArr]);
                      }

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
                            productID: row.id,
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
                    handleProductChange={(index, item) => {
                      addProducts.splice(index, 1, item);
                      let newArr = [...addProducts];
                      setFieldValue(
                        "products",
                        newArr.map((row) => ({
                          productId: row.id,
                          batchNumber: row.batchNumber,
                          id: row.id,
                          productQuantity: "",
                          quantity: "",
                          name: row.name,
                          type: row.type,
                          manufacturer: row.manufacturer,
                          unitofMeasure: row.unitofMeasure,
                        }))
                      );
                      setAddProducts((prod) => [...newArr]);

                      const prodIndex = products.findIndex(
                        (p) => p.id === item.id
                      );
                      let newArray = [...products];
                      newArray[prodIndex] = {
                        ...newArray[prodIndex],
                        isSelected: true,
                      };
                      // setProducts(prod => [...newArray]);
                    }}
                    handleLabelIdChange={handleLabelIdChange}
                    handleCategoryChange={onCategoryChange}
                  />
                  <div className='d-flex justify-content-between'>
                    <button
                      type='button'
                      className='btn btn-white bg-white shadow-radius mt-3 font-bold'
                      onClick={() => {
                        let newArr = {
                          productName: "",
                          manufacturer: "",
                          productQuantity: "",
                          batchNumber: "",
                        };
                        setAddProducts((prod) => [...prod, newArr]);
                      }}
                    >
                      +<span> {t("add_another_product")}</span>
                    </button>
                  </div>
                </>
              )}
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
            onHide={closeModalFail} //FailurePopUp
            {...modalProps}
            t={t}
            shipmentError={shipmentError}
          />
        </Modal>
      )}

      {fromAddLocation && (
        <Modal
          close={() => setFromAddLocation(false)}
          // size='modal-lg' //for other size's use `modal-lg, modal-md, modal-sm`
          style={{ width: "60vw" }}
          className="modal-lg"
          size="modal-md"
        >
          <AddLocationCard {...props} popup={true} senderOrgId={senderOrganisationId} close={() => setFromAddLocation(false)} />

        </Modal>
      )}
      {enableFromNewOrg && (
        <Modal
          isMandatory={true}
          close={() => setEnablFromeNewOrg(false)}
          size="modal-md" //for other size's use `modal-lg, modal-md, modal-sm`
        >
          <OrganisationPopUp onHide={() => setEnablFromeNewOrg(false)} enableFromNewOrg={enableFromNewOrg} onSignup={saveFromNewOrgNWaherhouse} />
        </Modal>
      )}
    </div>
  );
};

export default CreateShipment;

/* {message && (
  <div className="d-flex justify-content-center mt-3"> <Alert severity="success"><AlertTitle>Success</AlertTitle>{message}</Alert></div>
)} 

{errorMessage && (
  <div className="d-flex justify-content-center mt-3"> <Alert severity="error"><AlertTitle>Error</AlertTitle>{errorMessage}</Alert></div>
)} */
