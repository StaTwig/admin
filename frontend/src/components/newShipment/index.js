import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Add from "../../assets/icons/createshipment.png";
import EditTable from "./table/editTable";
import "./style.scss";
import { createShipment } from "../../actions/shipmentActions";
import { turnOn, turnOff } from "../../actions/spinnerActions";
import {
  getShippingOrderIds,
  getShippingOrderById,
  getWarehouseByOrgId,
  getAllOrganisations,
  getProductsByInventoryId,
} from "../../actions/shippingOrderAction";
import { getOrderIds, getOrder, getOpenOrderIds } from "../../actions/poActions";
import DropdownButton from "../../shared/dropdownButtonGroup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ShipmentPopUp from "./shipmentPopUp";
import ShipmentFailPopUp from "./shipmentFailPopUp";
import Modal from "../../shared/modal";
import { Formik } from "formik";
import Select from 'react-select';
import {getOrganizationsTypewithauth} from '../../actions/userActions';
import { getProducts, getProductsByCategory } from "../../actions/poActions";

const NewShipment = (props) => {
  const [OrderIds, setOrderIds] = useState([]);
  const [senderOrganisation, setSenderOrganisation] = useState([]);
  const [allOrganisations, setAllOrganisations] = useState([]);
  const [senderWarehouses, setSenderWarehouses] = useState([]);
  const [receiverWarehouses, setReceiverWarehouses] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [products, setProducts] = useState([]);
  const [addProducts, setAddProducts] = useState([]);
  const dispatch = useDispatch();
  const [category, setCategory] = useState([]);
  const [OrderId, setOrderId] = useState("Select Order ID");
  const [senderOrgId, setSenderOrgId] = useState("Select Organisation Name");
  const [orderIdSelected, setOrderIdSelected] = useState(false);
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
  const [OrderDetails, setOrderDetails] = useState({});
  const [po, setPo] = useState("");
  // const [shipmentDate, setShipmentDate] = useState("");
  // const [estimateDeliveryDate, setEstimateDeliveryDate] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [openCreatedInventory, setOpenCreatedInventory] = useState(false);
  const [openShipmentFail, setOpenShipmentFail] = useState(false);
  const [shipmentError, setShipmentError] = useState("");
  const [formatedDate, setformatedDate] = "4-21-2021";
  const [modalProps, setModalProps] = useState({});
  const [orgTypes, setOrgTypes] = useState([]);

  const profile = useSelector((state) => {
    return state.user;
  });

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px solid #d6d6d6',
      // padding: 20,
    }),
    control: () => ({
      display: 'flex'
    }),
    indicatorSeparator: () => ({
      display: 'none'
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
      return { ...provided, opacity, transition };
    }
  }

  useEffect(() => {
    // let date = new Date();

    // setformatedDate(`${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`);
    async function fetchData() {
      const { search } = props.location;
      // const result = await getShippingOrderIds();
      const result = await getOpenOrderIds();
      // console.log('IDS');
      // console.log(orderIds);
      // const data1 = await dispatch(getOrder('po-1jpv1enwklta6bf8'));
      // console.log('Data');
      // console.log(data1);
      // const data2 = await getShippingOrderById('so-1jpv1jsjkluz8yvs');
      // console.log('New Data');
      // console.log(data2);
      const ids = result.map(item => {
                                      return {
                                        value: item.id,
                                        label: item.id
                                      };
                                    });
      setOrderIds(ids);

      const orgs = await getAllOrganisations();
      
      const orgSplit = user.organisation?.split("/");
      console.log(orgSplit,"sender");
      setSenderOrganisation([orgSplit[0]]);
      // const organisations = orgs.data.filter((org) => org.id != orgSplit[1]);
      const organisations = orgs.data;
      setAllOrganisations(organisations.map(item => {
                                      return {
                                        ...item,
                                        value: item.id,
                                        label: item.name
                                      };
                                    }));
      const result1 = await getProducts();
      const categoryArray = result1.map((product) => product.type);
      setCategory(
        categoryArray.filter(
          (value, index, self) => self.indexOf(value) === index
        ).map(item => {
                        return {
                          value: item,
                          label: item
                        };
                      })
      );

      const warehouses = await getWarehouseByOrgId(orgSplit[1]);
      setSenderWarehouses(warehouses.data.map(v => {
                                      return {
                                        ...v,
                                        value: v.id,
                                        label: v?.warehouseAddress ? v?.title + '/' + v?.warehouseAddress?.firstLine + ", " + v?.warehouseAddress?.city : v?.title + '/' + v.postalAddress
                                      };
                                    }));

      const orgType = await getOrganizationsTypewithauth('CONF000');
      setOrgTypes(orgType.data.length > 0 ? orgType.data[0].organisationTypes.map(item => {
                                      return {
                                        value: item.id,
                                        label: item.name
                                      };
                                    }) : []);

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
      setReceiverWarehouses(warehouse.data.map(v => {
                                      return {
                                        ...v,
                                        value: v.id,
                                        label: v?.warehouseAddress ? v?.title + '/' + v?.warehouseAddress?.firstLine + ", " + v?.warehouseAddress?.city : v?.title + '/' + v.postalAddress
                                      };
                                    }));
    } catch (err) {
      setErrorMessage(err);
    }
  };

  const onWarehouseChange = async (value) => {
    try {
      const prods = await getProductsByInventoryId(value);
      setProducts(prods.data.map(item => {
                                      return {
                                        value: item.name,
                                        label: item.name,
                                        ...item
                                      };
                                    }));
    } catch (err) {
      setErrorMessage(err);
    }
  };

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
    const {
      toOrg,
      airWayBillNo,
      OrderId,
      labelCode,
      shipmentDate,
      estimateDeliveryDate,
      toOrgLoc,
      fromOrgLoc,
      shipmentID,
      products,
    } = values;
    products.forEach((p) => {
      if (p.productQuantity < 1) error = true;
    });

    if (!error) {
      const data = {
        airWayBillNo,
        poId: OrderId ? OrderId : null,
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
          estimateDeliveryDate != ""
            ? new Date(
                estimateDeliveryDate.getTime() -
                  estimateDeliveryDate.getTimezoneOffset() * 60000
              ).toISOString()
            : "",
        actualDeliveryDate:
          estimateDeliveryDate != ""
            ? new Date(
                estimateDeliveryDate.getTime() -
                  estimateDeliveryDate.getTimezoneOffset() * 60000
              ).toISOString()
            : "",
        status: "CREATED",
        products: products,
        // poId: OrderDetails.purchaseOrderId ? OrderDetails.purchaseOrderId : null,
      };

      dispatch(turnOn());
      const result = await createShipment(data);
      dispatch(turnOff());
      console.log("data", data);
      var check = false;

      for(var i=0;i<data.products.length;i++)
      {
        if(typeof data.products[i].productQuantity==='undefined')
        {
          check = true;
          break;
        }
      }
      if(check===true)
      {
        console.log("Hi");
        setShipmentError("Check product quantity");
        setOpenShipmentFail(true);
      }
      else if (result?.id) {
        setMessage("Created Shipment Success");
        setOpenCreatedInventory(true);
        setModalProps({
          message: "Created Successfully!",
          id: result?.id,
          type: "Success",
        });
      } 
      else  {
        setOpenShipmentFail(true);
        setErrorMessage("Create Shipment Failed");
      }
    } else {
      setShipmentError("Check product quantity");
      setOpenShipmentFail(true);
    }
  };

  const handleSOChange = async (item) => {
    setOrderId(item);
    dispatch(turnOn());
    const result = await getShippingOrderById(item);
    setOrderDetails(result);
    dispatch(turnOff());
  };
 
  const handleQuantityChange = (value, i) => {
    
    const soDetailsClone = { ...OrderDetails };
    soDetailsClone.products[i].productQuantity = value;
    setOrderDetails(soDetailsClone);
  };

  

  const handleLabelIdChange = (value, i) => {
    const soDetailsClone = { ...OrderDetails };
    soDetailsClone.products[i]["labelId"] = value;
    setOrderDetails(soDetailsClone);
  };
  const onCategoryChange = async (index, value, setFieldValue) => {
    try {
      const warehouse = await getProductsByCategory(value);
      let newArr = [...addProducts];
      newArr[index]["type"] = value;
      setAddProducts((prod) => [...newArr]);
      setProducts(warehouse.data.map(item => {
                                      return {
                                        value: item.name,
                                        label: item.name,
                                        ...item
                                      };
                                    }));
    } catch (err) {
      setErrorMessage(err);
    }
  };
  const onProductChange = (index, item, setFieldValue) => {
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
  };
//console.log(allOrganisations,"All org");

  
  
  return (
    <div className="NewShipment">
      <h1 className="breadcrumb">CREATE SHIPMENT</h1>
      <Formik
        // enableReinitialize={true}
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
          if (!orderIdSelected && values.products.length == 0) {
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
                <div className="row mt-3">
                <div className="col-md-6 col-sm-12 ">
                  <div className="form-group">
                    <label htmlFor="orderID">Order ID</label>
                    <div className="form-control">
                      {/* <DropdownButton
                        name={OrderId}
                        name2="Select Order ID"
                        onSelect={async (v) => {
                          setOrderIdSelected(true);
                          setFieldValue("OrderId", v);
                          // handleSOChange(v);
                          setOrderId(v);
                          dispatch(turnOn());
                          const result = await dispatch(getOrder(v));
                          console.log("Result");
                          console.log(result);
                          setReceiverOrgLoc(
                             result.poDetails[0].customer.warehouse.title + '/' + result.poDetails[0].customer.warehouse.postalAddress
                          );
                          setReceiverOrgId(
                            result.poDetails[0].customer.organisation.id
                          );
                          setOrderDetails(result.poDetails[0]);

                          dispatch(turnOff());
                          setDisabled(true);
                          let warehouse = senderWarehouses.filter((w) => {
                            let supplierWarehouse =
                              result.poDetails[0].supplier.organisation
                                .warehouses;
                            for (let i = 0; i < supplierWarehouse.length; i++) {
                              return w.id == supplierWarehouse[i];
                            }
                          });
                          setFieldValue("fromOrg", senderOrganisation[0]);
                          setFieldValue(
                            "fromOrgLoc",
                            result.poDetails[0].supplier.organisation.id
                          );
                          setFieldValue(
                            "toOrg",
                            result.poDetails[0].customer.organisation.id
                          );
                          setFieldValue(
                            "toOrgLoc",
                            result.poDetails[0].customer.shippingAddress
                              .shippingAddressId
                          );
                          // setSenderOrgLoc(warehouse[0].postalAddress);
                          let products_temp = result.poDetails[0].products;
                          for (let i = 0; i < products_temp.length; i++) {
                            products_temp[i].manufacturer =
                              result.poDetails[0].productDetails[i].manufacturer;
                            products_temp[i].productName =
                              result.poDetails[0].productDetails[i].name;
                            products_temp[i].productQuantity =
                              result.poDetails[0].products[i].quantity;
                            products_temp[i].productCategory =
                              result.poDetails[0].products[i].type;
                            products_temp[i].productID =
                              result.poDetails[0].products[i].productId;
                          }
                          
                         if (result.poDetails[0].productDetails.length > 0) {
                           setProducts([]);
                            setAddProducts([]);
                            setFieldValue("products",products_temp);
                          } else setFieldValue("products", []);
                        }}
                        groups={OrderIds}
                      /> */}
                      <Select
                        styles={customStyles}
                        placeholder="Select Order ID"
                        onChange={async(v) => {
                          
                           setProducts(p => []);
                            setAddProducts(p => []);
                          setOrderIdSelected(true);
                          setFieldValue("OrderId", v.value);
                          setOrderId(v.value);
                          dispatch(turnOn());
                          const result = await dispatch(getOrder(v.value));
                          setReceiverOrgLoc(
                             result.poDetails[0].customer.warehouse.title + '/' + result.poDetails[0].customer.warehouse.postalAddress
                          );
                          setReceiverOrgId(
                            result.poDetails[0].customer.organisation.id
                          );
                          setOrderDetails(result.poDetails[0]);

                          dispatch(turnOff());
                          setDisabled(true);
                          let warehouse = senderWarehouses.filter((w) => {
                            let supplierWarehouse =
                              result.poDetails[0].supplier.organisation
                                .warehouses;
                            for (let i = 0; i < supplierWarehouse.length; i++) {
                              return w.id == supplierWarehouse[i];
                            }
                          });
                          setFieldValue("fromOrg", senderOrganisation[0]);
                          setFieldValue(
                            "fromOrgLoc",
                            result.poDetails[0].supplier.organisation.id
                          );
                          setFieldValue(
                            "toOrg",
                            result.poDetails[0].customer.organisation.id + "/"+result.poDetails[0].customer.organisation.name
                          );
                          let wa = result.poDetails[0].customer.warehouse;
                          setFieldValue(
                            "toOrgLoc",
                            result.poDetails[0].customer.shippingAddress.shippingAddressId + "/" + (wa?.warehouseAddress ? wa?.title + '/' + wa?.warehouseAddress?.firstLine + ", " + wa?.warehouseAddress?.city : wa?.title + '/' + wa.postalAddress)
                          );
                          setFieldValue(
                            "rtype",
                            result.poDetails[0].customer.organisation
                              .type
                          );
                        
                          
                          let products_temp = result.poDetails[0].products;
                          for (let i = 0; i < products_temp.length; i++) {
                            products_temp[i].manufacturer =
                              result.poDetails[0].products[i].manufacturer;
                            products_temp[i].productName =
                              result.poDetails[0].products[i].name;
                            products_temp[i].productQuantity =
                              result.poDetails[0].products[i].quantity;
                            products_temp[i].productCategory =
                              result.poDetails[0].products[i].type;
                            products_temp[i].productID =
                              result.poDetails[0].products[i].productId;
                          }
                          
                         if (result.poDetails[0].products.length > 0) {
                           setProducts(p => []);
                           setAddProducts(p => []);
                            setFieldValue("products",products_temp);
                          } else setFieldValue("products", []);
                        }}
                        defaultInputValue={values.OrderId}
                        options={OrderIds}
                      />
                    </div>
                  </div>
                </div>
               <div className="col-md-6 com-sm-12">
                  <div className="form-group">
                    <label htmlFor="shipmentID">Reference Shipment ID</label>
                    <input
                      type="text"
                      className="form-control"
                      name="shipmentID"
                      onBlur={handleBlur}
                      placeholder="Enter Reference Shipment ID"
                      onChange={handleChange}
                      value={values.shipmentID}
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
                {/* <div className="row">
                  <div className="col-md-6 com-sm-12">
                    <div className="form-group">
                      <label htmlFor="organizationType">Organisation Type*</label>
                      <div className="form-control">
                        <Select
                          styles={customStyles}
                          isDisabled={disabled}
                          placeholder="Select Organisation Type"
                          onChange={(v) => {
                            setFieldValue('type', v?.value);
                            setFieldValue('typeName', v?.label);
                          }}
                          defaultInputValue={values.typeName}
                          options={orgTypes}
                        />
                        {errors.type && touched.type && (
                          <span className="error-msg text-danger">{errors.type}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div> */}
                <div className="row">
                  <div className="col-md-6 com-sm-12">
                    <div className="form-group">
                      <label className="required-field" htmlFor="organizationName">
                        Organisation Name
                      </label>
                      <div className="form-control">
                        {/* <DropdownButton
                          name={senderOrganisation[0]}
                          disabled={true}
                          onSelect={() => {}}
                          groups={senderOrganisation}
                        /> */}
                        <Select
                          styles={customStyles}
                          isDisabled={true}
                          onChange={(v) => {                   
                          }}
                          placeholder={senderOrganisation[0]}
                          defaultInputValue={senderOrganisation[0]}                        
                          value={senderOrganisation[0]}         
                          options={senderOrganisation.map((v) => { return {
                                        value: v,
                                        label: v
                                      };  })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 com-sm-12">
                    <div className="form-group">
                      <label className="required-field" htmlFor="orgLocation">
                        Organisation Location
                      </label>
                      <div className="form-control">
                        {/* <DropdownButton
                          name={senderOrgLoc}
                          name2="Select Organisation Location"
                          disabled={false}
                          onSelect={(v) => {
                            onWarehouseChange(v.warehouseInventory);
                            setFieldValue("fromOrg", senderOrganisation[0]);
                            setSenderOrgLoc(
                              v?.warehouseAddress
                                ? v?.title + '/' + v?.warehouseAddress?.firstLine +
                                    ", " +
                                    v?.warehouseAddress?.city
                                : v?.title + '/' + v.postalAddress
                            );
                            setFieldValue("fromOrgLoc", v.id);
                      //      setFieldValue("products", []);
                            setAddProducts((prod) => []);
                            let newArr = {
                              productName: "",
                              manufacturer: "",
                              productQuantity: "",
                            };
                            setAddProducts((prod) => [...prod, newArr]);
                          }}
                          groups={senderWarehouses}
                        /> */}
                        <Select
                          styles={customStyles}
                          isDisabled={false}
                          placeholder="Select Organisation Location"
                          onChange={(v) => {
                            onWarehouseChange(v.warehouseInventory);
                            setFieldValue("fromOrg", senderOrganisation[0]);
                            setFieldValue("fromOrgLoc", v.value);
                            setAddProducts((prod) => []);
                            let newArr = {
                              productName: "",
                              manufacturer: "",
                              productQuantity: "",
                            };
                            setAddProducts((prod) => [...prod, newArr]);
                          }}
                          defaultInputValue={values.fromOrgLoc}
                          options={senderWarehouses}
                        />
                        {errors.fromOrgLoc && touched.fromOrgLoc && (
                          <span className="error-msg text-danger">
                            {errors.fromOrgLoc}
                          </span>
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
                      <label className="required-field" htmlFor="organizationType">Organisation Type</label>
                      <div className="form-control">
                        <Select
                          styles={customStyles}
                          isDisabled={disabled}

                          placeholder={disabled ? values.rtype: "Select Organisation Type"}
                          onChange={(v) => {
                            setFieldValue('rtype', v?.value);
                            setFieldValue('rtypeName', v?.label); 
                          }}
                          defaultInputValue={values.rtypeName}
                          options={orgTypes}
                        />
                        {errors.rtype && touched.rtype && (
                          <span className="error-msg text-danger">{errors.rtype}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 com-sm-12">
                    <div className="form-group">
                      <label className="required-field" htmlFor="organizationName">
                        Organisation Name
                      </label>
                      <div className="form-control">
                        {/* <DropdownButton
                          name={receiverOrgId}
                          name2="Select Organisation Name"
                          disabled={disabled}
                          onSelect={(v) => {
                            setReceiverOrgLoc("Select Delivery Location");
                            setFieldValue("toOrgLoc", "");
                            setReceiverOrgId(v.name);
                            setFieldValue("toOrg", v.id);
                            onOrgChange(v.id);
                          }}
                          groups={allOrganisations}
                        /> */}
                        <Select
                          styles={customStyles}
                          isDisabled={disabled}
                          placeholder={disabled ? (values.toOrg).split("/")[1] : "Select Organisation Name"}
                          onChange={(v) => {
                            setFieldValue("toOrgLoc", "");
                            setReceiverOrgId(v.label);
                            setFieldValue("toOrg", v.value);                       
                            onOrgChange(v.value);
                          }}
                         
                          defaultInputValue={values.toOrg}
                          options={allOrganisations.filter(a => a.type == values.rtypeName)}
                        />
                        {errors.toOrg && touched.toOrg && (
                          <span className="error-msg text-danger">
                            {errors.toOrg}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 com-sm-12">
                    <div className="form-group">
                      <label className="required-field" htmlFor="delLocation">Delivery Location</label>
                      <div className="form-control">
                        {/* <DropdownButton
                          name={receiverOrgLoc}
                          name2="Select Delivery Location"
                          disabled={disabled}
                          onSelect={(v) => {
                            setReceiverOrgLoc(
                              v?.warehouseAddress
                                ? v?.title + '/' + v?.warehouseAddress?.firstLine +
                                    ", " +
                                    v?.warehouseAddress?.city
                                : v?.title + '/' + v.postalAddress
                            );
                            setFieldValue("toOrgLoc", v.id);
                          }}
                          groups={receiverWarehouses}
                        /> */}
                        <Select
                          styles={customStyles}
                          isDisabled={disabled}
                          placeholder={disabled ? values.toOrgLoc.split("/")[1] : "Select Delivery Location"}
                          onChange={(v) => {
                            setFieldValue("toOrgLoc", v.value);
                          }}
                          defaultInputValue={values.toOrgLoc}
                          options={receiverWarehouses}
                        />
                        {errors.toOrgLoc && touched.toOrgLoc && (
                          <span className="error-msg text-danger">
                            {errors.toOrgLoc}
                          </span>
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
                      <label className="required-field" htmlFor="organizationName">Airway Bill</label>
                      <input
                        type="text"
                        className="form-control"
                        name="airWayBillNo"
                        onBlur={handleBlur}
                        placeholder="Enter Airway Bill No"
                        onChange={handleChange}
                        value={values.airWayBillNo}
                      />

                      {errors.airWayBillNo && touched.airWayBillNo && (
                        <span className="error-msg text-danger1">
                          {errors.airWayBillNo}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6 com-sm-12">
                    <div className="form-group">
                      <label className="required-field" htmlFor="delLocation">Shipment Date</label>
                      <div className="form-control">
                        <DatePicker
                          className="date"
                          selected={
                            values.shipmentDate
                              ? new Date(Date.parse(values.shipmentDate))
                              : values.shipmentDate
                          }
                          onKeyDown={(e) =>
                            e.keyCode != 8 && e.preventDefault()
                          }
                          minDate={new Date()}
                          placeholderText="Enter Shipment Date"
                          //        <img src={Date} width="20" height="17" className="mr-2 mb-1" />
                          onChange={(date) => {
                            setFieldValue("shipmentDate", date);
                            // setShipmentDate(date);
                          }}
                          showYearDropdown
                          dateFormatCalendar="MMMM"
                          yearDropdownItemNumber={15}
                          scrollableYearDropdown
                        />
                        {errors.shipmentDate && touched.shipmentDate && (
                          <span className="error-msg text-danger1">
                            {errors.shipmentDate}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 com-sm-12">
                    <div className="form-group">
                      <label className="required-field" htmlFor="Label code">Label Code</label>
                      <input
                        type="text"
                        className="form-control"
                        name="labelCode"
                        placeholder="Enter Label Code"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.labelCode}
                      />
                      {errors.labelCode && touched.labelCode && (
                        <span className="error-msg text-danger1">
                          {errors.labelCode}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6 com-sm-12">
                    <div className="form-group">
                      <label htmlFor="shipmentId ">
                        {" "}
                        Estimate Delivery Date
                      </label>
                      <div className="form-control">
                        <DatePicker
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
                            e.keyCode != 8 && e.preventDefault()
                          }
                          showYearDropdown
                          dateFormatCalendar="MMMM"
                          yearDropdownItemNumber={100}
                          scrollableYearDropdown
                        />
                        {errors.estimateDeliveryDate &&
                          touched.estimateDeliveryDate && (
                            <span className="error-msg text-danger">
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
              <label htmlFor="productDetails" className="headsup">
                Product Details
              </label>
              {OrderDetails?.products?.length > 0 && (
                <EditTable
                  product={OrderDetails?.products}
                  handleQuantityChange={(v, i) => {
                    handleQuantityChange(v, i);
                  }}
                  enableDelete={false}
                  onRemoveRow={(index) => {}}
                  handleLabelIdChange={handleLabelIdChange}
                />
              )}
              {!orderIdSelected && products?.length > 0 && (
                <>
                  <EditTable
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
                            productID: row.id,
                            productQuantity: row.productQuantity,
                            productName: row.name,
                            manufacturer: row.manufacturer,
                            quantity: row.quantity,
                          }))
                        );
                      else setFieldValue("products", []);
                      setAddProducts((prod) => [...newArr]);
                    }}
                    handleProductChange={(index, item) => {
                      addProducts.splice(index, 1);
                      let newArr = [...addProducts];
                      newArr.push(item);
                      setFieldValue(
                        "products",
                        newArr.map((row) => ({
                          productCategory: row.type,
                          productID: row.id,
                          productQuantity: row.productQuantity,
                          productName: row.name,
                          manufacturer: row.manufacturer,
                          quantity: row.quantity,
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
                      setProducts((prod) => [...newArray]);
                    }}
                    handleLabelIdChange={handleLabelIdChange}
                    handleCategoryChange={onCategoryChange}
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
                        };
                        setAddProducts((prod) => [...prod, newArr]);
                      }}
                    >
                      +<span> Add Another Product</span>
                    </button>
                  </div>
                </>
              )}
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
            {errors.products && touched.products && (
              <span className="error-msg text-danger1">{errors.products}</span>
            )}
            <div className="d-flex justify-content-between">
              <div className="value">{productQuantity}</div>
              <div className="d-flex">
                <button
                  type="button"
                  className="btn btn-white shadow-radius font-bold mr-2"
                  onClick={() => props.history.push("/shipments")}
                >
                  Cancel
                </button>

                <button className="btn btn-yellow fontSize20 font-bold">
                  <img src={Add} width="20" height="17" className="mr-2 mb-1" />
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
          size="modal-sm" //for other size's use `modal-lg, modal-md, modal-sm`
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
          size="modal-sm" //for other size's use `modal-lg, modal-md, modal-sm`
        >
          <ShipmentFailPopUp
            onHide={closeModalFail} //FailurePopUp
            {...modalProps}
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
