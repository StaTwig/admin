import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Add from "../../assets/icons/createshipment.png";
import CalenderIcon from "../../assets/icons/date_icon.png";
import EditTable from "./table/editTable";
import "./style.scss";
import { createShipment, getViewShipment, newShipment } from "../../actions/shipmentActions";
import { turnOn, turnOff } from "../../actions/spinnerActions";
import {
  getShippingOrderById,
  getWarehouseByOrgId,
  getAllOrganisations,
  getProductsByInventoryId,
} from "../../actions/shippingOrderAction";
import { getOrder, getOpenOrderIds } from "../../actions/poActions";
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

const CreateShipment = (props) => {
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
  const [FromOrgLabel, setFromOrgLabel] = useState("Select Organisation Location");
  const dispatch = useDispatch();
  const [category, setCategory] = useState([]);
  const [OrderId, setOrderId] = useState("Select Order ID");
  const [senderOrgId, setSenderOrgId] = useState("null");
  const [orderIdSelected, setOrderIdSelected] = useState(false);
  const [validShipmentID, setValidShipmentID] = useState(false)
  // const [senderOrgLoc, setSenderOrgLoc] = useState(
  //   "Select Organisation Location"
  // );
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [receiverOrgId, setReceiverOrgId] = useState(
    "Select Organisation Name"
  );
  const [toOrgLocLabel, settoOrgLocLabel] = useState("");
  const [receiverOrgLoc, setReceiverOrgLoc] = useState(
    "Select Delivery Location"
  );
  const user = useSelector((state) => state.user);
  const [OrderDetails, setOrderDetails] = useState({});
  // const  [OrderProduct,setOrderProduct] = useState([]);
  // const [shipmentDate, setShipmentDate] = useState("");
  // const [estimateDeliveryDate, setEstimateDeliveryDate] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [productQuantity] = useState("");
  const [openCreatedInventory, setOpenCreatedInventory] = useState(false);
  const [openShipmentFail, setOpenShipmentFail] = useState(false);
  const [shipmentError, setShipmentError] = useState("");
  // const [formatedDate, setformatedDate] = "4-21-2021";
  const [modalProps, setModalProps] = useState({});
  const [orgTypes, setOrgTypes] = useState([]);
  const [productsList, setProductsList] = useState([]);
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
    async function fetchData() {

      
      const result111 = await getProductList();

      setProductsList(result111.message);
      console.log(result111);
      const { search } = props.location;
      console.log(search)
      // const result = await getShippingOrderIds();
      const result = await getOpenOrderIds();

      const ids = result.map((item) => {
        return {
          value: item.id,
          label: item.id,
        };
      });
      setOrderIds(ids);

      const orgs = await getAllOrganisations();
console.log(user.organisation)
      const orgSplit = user.organisation?.split("/");
      if(orgSplit?.length)
      setSenderOrganisation([orgSplit[0]]);

      const organisations = orgs.data;
      setAllOrganisations(
        organisations.map((item) => {
          return {
            ...item,
            value: item.id,
            label: item.name,
          };
        })
      );
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

      const warehouses = await getWarehouseByOrgId(orgSplit[1]);
      setSenderWarehouses(
        warehouses.data.map((v) => {
          return {
            ...v,
            value: v.id,
            label: v?.warehouseAddress
              ? v?.title +
                "/" +
                v?.warehouseAddress?.firstLine +
                ", " +
                v?.warehouseAddress?.city
              : v?.title + "/" + v.postalAddress,
          };
        })
      );

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
  }, [ props.location, user.organisation]);

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
      setReceiverWarehouses(
        warehouse.data.map((v) => {
          return {
            ...v,
            value: v.id,
            label: v?.warehouseAddress
              ? v?.title +
                "/" +
                v?.warehouseAddress?.firstLine +
                ", " +
                v?.warehouseAddress?.city
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
    } catch (err) {
      setErrorMessage(err);
      return false;
    }
  };

  // const dates = ["shipmentDate", "estimateDeliveryDate"];

  // const dateValidation = (date) => {
  //   try {
  //     let error = false;
  //     let a = eval(date[0]);
  //     let b = eval(date[1]);

  //     if (a > b) {
  //       setShipmentError("Check deliveryDate");
  //       setOpenShipmentFail(true);
  //       error = true;
  //     }
  //     return error;
  //   } catch (err) {
  //     setOpenShipmentFail(true);
  //   }

  //   let error = false;
  //   let a = eval(date[0]);
  //   let b = eval(date[1]);

  //   if (a > b) {
  //     setShipmentError("Check deliveryDate");
  //     setOpenShipmentFail(true);
  //     error = true;
  //   }
  //   return error;
  // };

  const onAssign = async (values) => {
    let error = false;
    // dates.forEach(date => { if (!error) dateValidation(date) });
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
    let errorMsg = '';
    products.forEach((p) => {
      if (p.productQuantity < 1) { error = true; errorMsg = 'product quantity'; }
      else if (!p.batchNumber) {error = true; errorMsg = 'batch number';
    }
    });
    if (!error) {
      const data = {
        airWayBillNo,
        poId: reset && reset != 'Select Order ID' ? reset : null,
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
        console.log("product quantity is undefined ");
        setShipmentError("Check product quantity");
        setOpenShipmentFail(true);
      } else if(check===2)
      {
        setShipmentError("Check Batch Number");
        setOpenShipmentFail(true);
      } else {
        // let i, j;
        // let nn = data.products.length;
        // for (i = 0; i < data.products.length; i++) {
        //   let prdctName = data.products[i].productName;
        //   // let qty = parseInt(data.products[i].productQuantity);
        //   let flag = false;

        //   for (j = 0; j < productsList.length; j++) {
        //     if (productsList[j].productName === prdctName) {
        //       flag = true;
        //       break;
        //     } else {
        //       flag = false;
        //     }
        //   }

        //   if (!flag) {
        //     setShipmentError("The product doesn't exist in this inventory");
        //     //setShipmentError("Check product quantity");
        //     setOpenShipmentFail(true);
        //     break;
        //   }
        // }

        // if (i >= nn) {
          dispatch(turnOn());
          // const result = await createShipment(data);
          const result = await newShipment(data);
          dispatch(turnOff());
          if (result?.id) {
            setMessage("Created Shipment Success");
            setOpenCreatedInventory(true);
            setModalProps({
              message: "Created Successfully!",
              id: result?.id,
              type: "Success",
            });
          } else {

            setShipmentError(result.data.message);
            setOpenShipmentFail(true);
            setErrorMessage("Create Shipment Failed");
          }
        // }
      }
    } else {
      setShipmentError("Check "+errorMsg);
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
      alert("Quantity cannot be more than ordered quantity");
      return;
    }
    soDetailsClone.products[i].productQuantity = value;
    setOrderDetails(soDetailsClone);
  };

  const handleBatchChange = (value, i) => {
    const soDetailsClone = { ...OrderDetails };
    soDetailsClone.products[i].batchNumber = value;
    setOrderDetails(soDetailsClone);
  };

  const handleLabelIdChange = (value, i) => {
    const soDetailsClone = { ...OrderDetails };
    soDetailsClone.products[i]["labelId"] = value;
    setOrderDetails(soDetailsClone);
  };
  const onCategoryChange =  (index, value, setFieldValue) => {
    try {
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
    } catch (err) {
      setErrorMessage(err);
    }
  };

  /* const onProductChange = (index, item, setFieldValue) => {
    addProducts.splice(index, 1);
    let newArr = [...addProducts];
    newArr.push(item);
    setFieldValue(
      "products",
      newArr.map((row) => ({
        productId: row.id,
        quantity: row?.quantity ? row?.quantity : 0,
        name: row.name,
        productCategory: row.type,
        manufacturer: row.manufacturer,

      }))
    );
    setAddProducts((prod) => [...newArr]);

    const prodIndex = products.findIndex((p) => p.id === item.id);
    let newArray = [...products];
    newArray[prodIndex] = { ...newArray[prodIndex], isSelected: true };
    setProducts((prod) => [...newArray]);
  }; */

  // //console.log(allOrganisations,"All org");
  // async function fetchShipmentDetails(id){
  //   const result = await dispatch(getViewShipment(id));
  //   return result;
  // }
  // console.log(products,"1");
  // console.log(addProducts,"2");
  // console.log(category,"3");
  const onRemoveRow = (index) => {
    const inventoryStateClone = JSON.parse(
      JSON.stringify(OrderDetails?.products)
    );
    inventoryStateClone.splice(index, 1);
    const cloneOrder = OrderDetails;
    cloneOrder.products = inventoryStateClone;
    setOrderDetails(cloneOrder);
    // setOrderProduct(inventoryStateClone);
  };

  function onSearchChange(e) {
    debugger
    axios
      .get(`${config().getSuggestions}?searchString=${e}`)
      .then((resp) =>{
        const value = resp.data.data.length > 0 ? true : false
         setValidShipmentID(value)
        })
  }

  return (
    <div className='NewShipment'>
      <h1 className='breadcrumb'>CREATE SHIPMENT</h1>
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
          // if (!values.estimateDeliveryDate) {
          //   errors.estimateDeliveryDate = "Required";
          // }
          if (!orderIdSelected && values.products.length === 0) {
            errors.products = "Required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values, "values");
          
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
          <form onSubmit={handleSubmit} className='mb-3'>
            <div className='row mb-3'>
              <div className='col bg-white formContainer low mr-3'>
                <label htmlFor='client' className='headsup'>
                  From
                </label>
                <div className='row'>
                  <div className='col-md-6 com-sm-12'>
                    <div className='form-group'>
                      <label className='name' htmlFor='organizationName'>
                        Organisation Name*
                      </label>
                      <input
                        className={`input refship ${
                          errors.fromOrg && touched.fromOrg
                            ? "border-danger"
                            : ""
                        }`}
                        type='text'
                        id='organizationName'
                        name='fromOrg'
                        value={values.fromOrg}
                        onBlur={handleBlur}
                        placeholder='Enter Organisation Name'
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className='col-md-6 com-sm-12'>
                    <div className='form-group'>
                      <label className='name' htmlFor='orgLocation'>
                          Organisation Location*
                      </label>
                        <input
                        className={`input refship ${
                          errors.fromOrgLoc && touched.fromOrgLoc
                            ? "border-danger"
                            : ""
                        }`}
                        type='text'
                        id='orgLocation'
                        name='fromOrgLoc'
                        value={values.fromOrgLoc}
                        onBlur={handleBlur}
                        placeholder='Enter Organisation Location'
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='row mb-3'>
              <div className='col bg-white formContainer low mr-3'>
                <label htmlFor='client' className='headsup'>
                  To
                </label>
                <div className='row'>
                  <div className='col-md-6 com-sm-12'>
                    <div className='form-group'>
                      <label className='name' htmlFor='organizationName'>
                        Organisation Name*
                      </label>
                      <input
                        className={`input refship ${
                          errors.fromOrgLoc && touched.fromOrgLoc
                            ? "border-danger"
                            : ""
                        }`}
                        type='text'
                        id='organizationName'
                        name='toOrg'
                        value={values.toOrg}
                        onBlur={handleBlur}
                        placeholder='Enter Organisation Name'
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className='col-md-6 com-sm-12'>
                    <div className='form-group'>
                      <label className='name' htmlFor='delLocation'>
                          Delivery Location*
                      </label>
                        <input
                        className={`input refship ${
                          errors.fromOrgLoc && touched.fromOrgLoc
                            ? "border-danger"
                            : ""
                        }`}
                        type='text'
                        id='delLocation'
                        name='toOrgLoc'
                        value={values.toOrgLoc}
                        onBlur={handleBlur}
                        placeholder='Enter Organisation Location'
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='row mb-3'>
              <div className='col bg-white formContainer low mr-3'>
                <label htmlFor='client' className='headsup'>
                  Delivery Details:
                </label>
                <div className='row'>
                  <div className='col-md-6 com-sm-12 mt-2'>
                    <label className='name' htmlFor='organizationName'>
                      Transit Number*
                    </label>
                    <input
                      className={`input refship ${
                        errors.airWayBillNo && touched.airWayBillNo
                          ? "border-danger"
                          : ""
                      }`}
                      type='text'
                      id='referenceShipmentId'
                      name='airWayBillNo'
                      value={values.airWayBillNo}
                      onBlur={handleBlur}
                      placeholder='Enter Transit Number'
                      onChange={handleChange}
                    />
                    {/* {errors.airWayBillNo && touched.airWayBillNo && (
                        <span className="error-msg text-danger-AB">
                          {errors.airWayBillNo}
                        </span>
                      )} */}
                  </div>

                  <div className='col-md-6 com-sm-12 mt-3'>
                    <div className='form-group'>
                      <label className='name' htmlFor='delLocation'>
                        Shipment Date*
                      </label>
                      <div
                        className={`input refship ${
                          errors.shipmentDate && touched.shipmentDate
                            ? "border-danger"
                            : ""
                        }`}
                      >
                        <DatePicker
                        ref={ref1}
                          className='date'
                          selected={
                            values.shipmentDate
                              ? new Date(Date.parse(values.shipmentDate))
                              : values.shipmentDate
                          }
                          onKeyDown={(e) =>
                            e.keyCode !== 8 && e.preventDefault()
                          }
                          minDate={new Date()}
                          placeholderText='Enter Shipment Date'
                          //        <img src={Date} width="20" height="17" className="mr-2 mb-1" />
                          onChange={(date) => {
                            setFieldValue("shipmentDate", date);
                            // setShipmentDate(date);
                          }}
                          showYearDropdown
                          dateFormatCalendar='MMMM'
                          yearDropdownItemNumber={15}
                          scrollableYearDropdown
                        />
                        <img src={CalenderIcon} alt="calenderIcon" className="Calender-icon" onClick={() => ref1.current.setFocus()} />
                        {/* {errors.shipmentDate && touched.shipmentDate && (
                          <span className="error-msg text-danger-SD">
                            {errors.shipmentDate}
                          </span>
                        )} */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-6 com-sm-12'>
                    <label className='name' htmlFor='organizationName'>
                      Label Code*
                    </label>
                    <input
                      className={`input refship ${
                        errors.labelCode && touched.labelCode
                          ? "border-danger"
                          : ""
                      }`}
                      type='text'
                      id='referenceShipmentId'
                      name='labelCode'
                      value={values.labelCode}
                      onBlur={handleBlur}
                      placeholder='Enter Label Code'
                      onChange={handleChange}
                    />
                    {/* {errors.labelCode && touched.labelCode && (
                      <span className="error-msg text-danger-LC">
                        {errors.labelCode}
                      </span>
                    )} */}
                  </div>

                  <div className='col-md-6 com-sm-12'>
                    <div className='form-group'>
                      <label className='name' htmlFor='shipmentId '>
                        Estimate Delivery Date
                      </label>
                      <div
                        className={`input refship ${
                          errors.estimateDeliveryDate &&
                          touched.estimateDeliveryDate
                            ? "border-danger"
                            : ""
                        }`}
                      >
                        <DatePicker
                          ref={ref2}
                          className='date'
                          placeholderText='Enter Delivery Date'
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
                          dateFormatCalendar='MMMM'
                          yearDropdownItemNumber={100}
                          scrollableYearDropdown
                        />
                        <img src={CalenderIcon} alt="calenderIcon" className="Calender-icon" onClick={() => ref2.current.setFocus()}/>
                        {errors.estimateDeliveryDate &&
                          touched.estimateDeliveryDate && (
                            <span className='error-msg text-danger-DD'>
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

            <div className='row mb-3'>
              <label htmlFor='productDetails' className='headsup'>
                  Product Details
              </label>              
                  <EditTable
                    key={Math.random()}
                    check='0'
                    warehouseID={senderOrgId}
                    product={addProducts}
                    products={products}
                    category={category}
                    handleQuantityChange={(v, i) => {
                      console.log(v, "v");
                      
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
                            // productID: row.id,
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
                      console.log(newArr);
                      setFieldValue(
                        "products",
                        newArr.map((row) => ({
                          // productId: row.id,
                          batchNumber: row.batchNumber,
                          // id: row.id,
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
                          // productID: row.id,
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
                          unitofMeasure: "Kgs",
                          type: ""
                        };
                        setAddProducts((prod) => [...prod, newArr]);
                      }}
                    >
                      +<span> Add Another Product</span>
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
              <span className='error-msg text-danger-DD'>
                {errors.products}
              </span>
            )}
            <div className='d-flex justify-content-between'>
              <div className='value'>{productQuantity}</div>
              <div className='d-flex'>
                <button
                  type='button'
                  className='btn btn-outline-primary font-bold mr-2'
                  onClick={() => props.history.push("/shipments")}
                >
                  Cancel
                </button>

                <button
                  className='btn btn-orange fontSize20 font-bold'
                >
                  <img
                    src={Add}
                    width='20'
                    height='17'
                    className='mr-2 mb-1'
                    alt=''
                  />
                  <span>Create Shipment</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </Formik>
      {openCreatedInventory && (
        <Modal
          close={() => closeModal()}
          size='modal-sm' //for other size's use `modal-lg, modal-md, modal-sm`
        >
          <ShipmentPopUp
            onHide={closeModal} //FailurePopUp
            {...modalProps}
          />
        </Modal>
      )}

      {openShipmentFail && (
        <Modal
          close={() => closeModalFail()}
          size='modal-sm' //for other size's use `modal-lg, modal-md, modal-sm`
        >
          <ShipmentFailPopUp
            onHide={closeModalFail} //FailurePopUp
            {...modalProps}
            shipmentError={shipmentError}
          />
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
