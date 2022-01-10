import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import OrderIcon from "../../assets/icons/order.svg";
import EditTable from "./table/editTable";
import "./style.scss";
import {
  getWarehouseByOrgId,
  getAllOrganisations,
  getRegions,
  getCountryDetailsByRegion,
  getOrganizations,
} from "../../actions/shippingOrderAction";
import ShipmentPopUp from "./shipmentPopUp";
import ShipmentFailPopUp from "./shipmentFailPopUp";
import { Formik } from "formik";
import Select from "react-select";
import Modal from "../../shared/modal";
import { Alert, AlertTitle } from "@material-ui/lab";

import {
  getProducts,
  setReviewPos,
  resetReviewPos,
  getOrganizationsByTypes,
} from "../../actions/poActions";

const NewOrder = (props) => {
  const { t } = props;
  const editPo = useSelector((state) => {
    return state?.reviewPo;
  });

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: "1px solid #d6d6d6",
      // padding: 20,
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

  const closeModal = () => {};

  const [allOrganisations, setAllOrganisations] = useState([]);
  const [receiverWarehouses, setReceiverWarehouses] = useState([]);
  const [receiverWarehousesCountry, setReceiverWarehousesCountry] = useState(
    []
  );
  const [receiverWarehousesRegion, setReceiverWarehousesRegion] = useState([]);
  const [orgNames, setOrgNames] = useState([]);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [addProducts, setAddProducts] = useState(
    editPo !== null
      ? editPo.products
      : [
          {
            productId: "",
            id: "",
            productQuantity: "",
            name: "",
            manufacturer: " ",
            type: "",
          },
        ]
  );
  const dispatch = useDispatch();
  // const [senderOrgId, setSenderOrgId] = useState(
  //   editPo !== null ? editPo.fromOrgId : "Select Organisation Name"
  // );
  // const [senderOrgType, setSenderOrgType] = useState(
  //   editPo !== null ? editPo.typeName : ""
  // );
  // const [receiverOrgId, setReceiverOrgId] = useState(
  //   editPo !== null ? editPo.toOrgName : "Select Organisation Name"
  // );
  // const [receiverOrgLoc, setReceiverOrgLoc] = useState(
  //   editPo !== null ? editPo.toOrgLocName : "Select Delivery Location"
  // );
  const [message] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [quantity] = useState("");
  const [openOrder] = useState(false);
  const [failedPop, setFailedPop] = useState(false);
  const [shipmentError, setOrderError] = useState("");
  const [addAnotherProductFailed, setAddAnotherProductFailed] = useState(false);
  const [orgTypes, setOrgTypes] = useState([]);
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [orgType, setOrgType] = useState("");
  const [orgDetails, setOrgDetails] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const orgs = await getAllOrganisations();
      setAllOrganisations(
        orgs.data.map((item) => {
          return {
            value: item.id,
            label: item.name,
            type: item.type,
          };
        })
      );
      const orgType = await getOrganizationsByTypes("CONF000");
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
      // if (orgSplit?.length > 0) {
      //   const organisations = orgs.data.filter((org) => org.id != user.organisationId);
      // }

      // const warehouses = await getWarehouseByOrgId(orgSplit[1]);
      // setSenderWarehouses(warehouses.data);

      const result = await getProducts();
      let res = result.filter((item) => item.name !== "category");
      setProducts(
        res.map((item) => {
          return {
            value: item.name,
            label: item.name,
            ...item,
          };
        })
      );
      const categoryArray = result.map((product) => product.type);
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
    dispatch(resetReviewPos({}));
  }, [dispatch]);

  const closeModalFail = () => {
    setFailedPop(false);
  };

  const closeModalFailedAddAnotherProduct = () => {
    setAddAnotherProductFailed(false);
  };

  // const onOrggChange = async(v) =>
  // {
  //   console.log("Hi");
  //   try{
  //     const selOrg = orgDetails.filter((value) => {
  //       return value.name==v.label;
  //   });
  //    console.log("SelOrg is :- ", selOrg);
  //     setFieldValue('toOrgLocName',selOrg[0].postalAddress);
  //     setFieldValue('toOrgLoc',selOrg[0].warehouses[0]);

  //   }
  //   catch(err)
  //   {
  //     console.log(err);
  //   }
  // }
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

  const onOrgTypeChange = async (value) => {
    try {
      // console.log("new order label is :- onOrgTypeChange", value);
      const region = await getRegions(value);
      //const check = await getOrganizations("VENDOR","India");
      // console.log("region is => ", region);
      const rr = region.data.map((v) => {
        // console.log(v);
        return {
          value: v,
          label: v,
        };
      });
      // console.log("regions are :- ",rr);
      setReceiverWarehousesRegion(rr);
      // console.log("new order label is :- onOrgTypeChange Check", region);
    } catch (err) {
      setErrorMessage(err);
    }
  };

  const onRegionChange = async (id) => {
    try {
      // console.log("Region is " + id);
      // console.log("OrgType is " + orgType);
      const countries = await getCountryDetailsByRegion(id, orgType);
      // console.log("countries are :- ", countries);

      const cc = countries.data.map((v) => {
        return {
          value: v,
          label: v,
        };
      });

      setReceiverWarehousesCountry(cc);
    } catch (err) {
      setErrorMessage(err);
    }
  };

  const onCountryChange = async (idd) => {
    try {
      // console.log("country is " + idd);
      // console.log("org type is " + orgType);

      const org = await getOrganizations(orgType, idd);
      // console.log("Organizations names are :- ", org);
      setOrgDetails(org.data);
      const oo = org.data.map((v) => {
        return {
          value: v.id,
          label: v.name,
        };
      });
      // console.log(oo);
      setOrgNames(oo);
    } catch (err) {
      setErrorMessage(err);
    }
  };

  const onCategoryChange = async (index, value, setFieldValue) => {
    try {
      // const warehouse = await getProductsByCategory(value);
      let newArr = [...addProducts];
      newArr[index] = {
        productId: "",
        id: "",
        productQuantity: "",
        name: "",
        type: value,
        manufacturer: "",
        unitofMeasure: "",
      };
      newArr[index]["quantity"] = "";
      setAddProducts((prod) => [...newArr]);
      setFieldValue(
        "products",
        newArr.map((row) => ({
          productId: row.id,
          id: row.id,
          productQuantity: row?.productQuantity ? row?.productQuantity : 0,
          name: row.name,
          type: row.type,
          manufacturer: row.manufacturer,
          unitofMeasure: row.unitofMeasure,
        }))
      );
    } catch (err) {
      setErrorMessage(err);
    }
  };

  const onProductChange = (index, item, setFieldValue) => {
    addProducts.splice(index, 1, item);
    let newArr = [...addProducts];
    setFieldValue(
      "products",
      newArr.map((row) => ({
        productId: row.id,
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

    const prodIndex = products.findIndex((p) => p.id === item.id);
    let newArray = [...products];
    newArray[prodIndex] = { ...newArray[prodIndex], isSelected: true };
    // setProducts(prod => [...newArray]);
  };

  const onRemoveProduct = (index, setFieldValue) => {
    const prodIndex = products.findIndex((p) => p.id === addProducts[index].id);
    let newArray = [...products];
    newArray[prodIndex] = { ...newArray[prodIndex], isSelected: false };
    // setProducts(prod => [...newArray]);
    addProducts.splice(index, 1);
    let newArr = [...addProducts];
    if (newArr.length > 0)
      setFieldValue(
        "products",
        newArr.map((row) => ({
          productId: row.id,
          id: row.id,
          productQuantity: row?.productQuantity,
          name: row.name,
          type: row.type,
          manufacturer: row.manufacture,
          unitofMeasure: row.unitofMeasurer,
        }))
      );
    else setFieldValue("products", []);
    setAddProducts((prod) => [...newArr]);
  };

  const onQuantityChange = (v, i, setFieldValue) => {
    let newArr = [...addProducts];
    newArr[i].productQuantity = v;
    setFieldValue(
      "products",
      newArr.map((row) => ({
        productId: row.id,
        id: row.id,
        productQuantity: row.productQuantity,
        name: row.name,
        type: row.type,
        manufacturer: row.manufacturer,
        unitofMeasure: row.unitofMeasure,
      }))
    );
    setAddProducts((prod) => [...newArr]);
  };

  const onAssign = async (values) => {
    let error = false;
    let nameError = false;
    let typeError = false;
    const { products } = values;
    products.forEach((p) => {
      if (!p.name) {
        nameError = true;
      }
      if (!p.type) {
        typeError = true;
      }
      if (p.productQuantity < 1) {
        error = true;
      }
    });
    if (!error && !nameError && !typeError) {
      dispatch(setReviewPos(values));
      props.history.push("/revieworder");
      // const data = {
      //   externalId: "",
      //   supplier: {
      //     supplierIncharge: user.id,
      //     supplierOrganisation: senderOrganisation[1],
      //   },
      //   customer: {
      //     customerIncharge: null,
      //     customerOrganisation: toOrg,
      //     shippingAddress: {
      //       shippingAddressId: toOrgLoc,
      //       shipmentReceiverId: null
      //     }
      //   },
      //   lastUpdatedOn: new Date().toISOString(),
      //   creationDate: new Date().toISOString(),
      //   poStatus: "CREATED",
      //   products: products,
      // };

      // dispatch(turnOn());
      // const result = await createOrder(data);
      // dispatch(turnOff());
      // if (result.status === 200) {
      //   props.history.push('/orders');
      //   // setMessage("Created order");
      //   //setOpenOrder(true);
      // } else {
      //   setFailedPop(true);
      //   setErrorMessage("Not able to create order. Try again!");
      // }
    } else if (error) {
      setOrderError(t('check_product_quantity'));
      setFailedPop(true);
    } else if (nameError) {
      setOrderError(t('check_product_category'));
      setFailedPop(true);
    } else if (typeError) {
      setOrderError(t('check_product_type'));
      setFailedPop(true);
    }
  };

  return (
    <div className='NewOrder m-3'>
      <div className='d-flex justify-content-between mb-3'>
        <h1 className='breadcrumb'>{t('create_new_order')}</h1>
      </div>
      <Formik
        // enableReinitialize={true}
        initialValues={{
          fromOrg: editPo !== null ? editPo.fromOrg : "",
          type: editPo !== null ? editPo.type : "",
          typeName: editPo !== null ? editPo.typeName : "",
          rtype: editPo !== null ? editPo.rtype : "",
          rtypeName: editPo !== null ? editPo.rtypeName : "",
          fromOrgId: editPo !== null ? editPo.fromOrgId : "",
          toOrgCountry: editPo !== null ? editPo.toOrgCountry : "",
          toOrgRegion: editPo !== null ? editPo.toOrgRegion : "",
          toOrg: editPo !== null ? editPo.toOrg : "",
          toOrgName: editPo !== null ? editPo.toOrgName : "",
          toOrgLoc: editPo !== null ? editPo.toOrgLoc : "",
          toOrgLocRegion: editPo !== null ? editPo.toOrgLocRegion : "",
          toOrgLocName: editPo !== null ? editPo.toOrgLocName : "",
          toOrgLocCountry: editPo !== null ? editPo.toOrgLocCountry : "",
          products: editPo !== null ? editPo.products : [],
        }}
        validate={(values) => {
          const errors = {};
          if (!values.type) {
            errors.type = t('required');
          }
          if (!values.rtype) {
            errors.rtype = t('required');
          }
          if (!values.fromOrg) {
            errors.fromOrg = t('required');
          }
          if (!values.toOrg) {
            errors.toOrg = t('required');
          }
          if (!values.toOrgLocRegion) {
            errors.toOrgLocRegion = t('required');
          }
          if (!values.toOrgLocCountry) {
            errors.toOrgLocCountry = t('required');
          }
          if (!values.toOrgLoc) {
            errors.toOrgLoc = t('required');
          }
          if (values.products.length === 0) {
            errors.products = t('required');
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
          <form onSubmit={handleSubmit} className=''>
            <div className='row mb-3'>
              <label htmlFor='productDetails' className='headsup1'>
                {t('product_details')}
              </label>
              <EditTable
                product={addProducts}
                products={products}
                category={category}
                handleQuantityChange={(v, i) =>
                  onQuantityChange(v, i, setFieldValue)
                }
                onRemoveRow={(index) => onRemoveProduct(index, setFieldValue)}
                handleProductChange={(index, item) =>
                  onProductChange(index, item, setFieldValue)
                }
                handleCategoryChange={(index, item) =>
                  onCategoryChange(index, item, setFieldValue)
                }
                t={t}
              />
              <div className="d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-white bg-white shadow-radius font-bold mb-1"
                  onClick={() => {
                    let arr = addProducts.filter(
                      (p) =>
                        p.productId !== "" &&
                        p.id !== "" &&
                        p.name !== "" &&
                        p.manufacturer !== "" &&
                        p.type !== ""
                    );
                    if (arr.length === addProducts.length) {
                      let newArr = {
                        productId: "",
                        id: "",
                        name: "",
                        manufacturer: "",
                        productQuantity: "",
                        type: "",
                      };
                      setAddProducts((prod) => [...prod, newArr]);
                    } else {
                      setOrderError(t('error_product_details'));
                      setAddAnotherProductFailed(true);
                    }
                  }}
                >
                  {" "}
                  <div style={{ fontSize: "14px" }}>
                    +<span> {t('add_another_product')}</span>
                  </div>
                </button>
                {errors.products && touched.products && (
                  <span className="error-msg text-danger1">
                    {errors.products}
                  </span>
                )}
              </div>
            </div>
            {/* {errors.products && touched.products && (
              <span className="my-required-field error-msg text-danger1">
                "heloooo"{errors.products}
              </span>
            )} */}

            <div className='row mb-3'>
              <div className='col bg-white formContainer low'>
                <label htmlFor='client' className='headsup'>
                  {t('order_from')}
                </label>
                <div className='row'>
                  <div className='col-md-6 com-sm-12'>
                    <div className='name form-group'>
                      <label className='' htmlFor='organizationName'>
                        {t('organisation_type')}*
                      </label>
                      <div
                        className={`line ${
                          errors.type && touched.type ? "border-danger" : ""
                        }`}
                      >
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          placeholder={
                            <div className='select-placeholder-text'>
                              {t('select_organisation_type')}
                            </div>
                          }
                          onChange={(v) => {
                            setFieldValue("type", v?.value);
                            setFieldValue("typeName", v?.label);
                            setFieldValue("fromOrgId", "");
                            setFieldValue("fromOrg", "");
                          }}
                          defaultInputValue={values.typeName}
                          options={orgTypes}
                        />
                        {/* {errors.type && touched.type && (
                            <span className="error-msg text-danger">{errors.type}</span>
                         )} */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-6 com-sm-12'>
                    <div className='name form-group'>
                      <label className='' htmlFor='organizationName'>
                        {t('organisation_name')}*
                      </label>
                      <div
                        className={`line ${
                          errors.fromOrg && touched.fromOrg
                            ? "border-danger"
                            : ""
                        }`}
                      >
                        {/* <DropdownButton
                          isText={true}
                          name={senderOrgId}
                          name2="Select Organisation Name"
                          onSelect={(v) => {
                            setSenderOrgId(v.name);
                            setFieldValue('fromOrg', v.id);
                            setFieldValue('fromOrgId', v.name);
                          }}
                          groups={allOrganisations}
                        /> */}

                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          placeholder={
                            <div className='select-placeholder-text'>
                              {t('select_organisation_name')}
                            </div>
                          }
                          value={
                            values.fromOrg === ""
                              ? t('select_organisation_name')
                              : {
                                  value: values.fromOrg,
                                  label: values.fromOrgId,
                                }
                          }
                          defaultInputValue={values.fromOrgId}
                          onBlur={handleBlur}
                          onChange={(v) => {
                            setFieldValue("fromOrg", v.value);
                            setFieldValue("fromOrgId", v.label);
                          }}
                          isDisabled={values.typeName === ""}
                          options={allOrganisations.filter(
                            (a) => a.type === values.typeName
                          )}
                        />
                        {/* {errors.fromOrg && touched.fromOrg && (
                          <span className="error-msg text-danger">{errors.fromOrg}</span>
                        )} */}
                      </div>
                    </div>
                  </div>

                  <div className='col-md-6 com-sm-12'>
                    <div className='name form-group'>
                      <label className='org' htmlFor='orgLocation'>
                        {t('organisation_id')}*
                      </label>
                      <div className="orgV border-0">{values.fromOrg}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='row mb-3'>
              <div className='col bg-white formContainer low'>
                <label htmlFor='client' className='headsup'>
                  {t('deliver_to')}
                </label>

                <div className='row'>
                  <div className='col-md-6 com-sm-12'>
                    <div className='name form-group'>
                      <label className='' htmlFor='organizationName'>
                        {t('organisation_type')}*
                      </label>
                      <div
                        className={`line ${
                          errors.rtype && touched.rtype ? "border-danger" : ""
                        }`}
                      >
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          styles={customStyles}
                          placeholder={
                            <div className='select-placeholder-text'>
                              {t('select_organisation_type')}
                            </div>
                          }
                          defaultInputValue={values.rtypeName}
                          onBlur={handleBlur}
                          onChange={(v) => {
                            console.log(v);
                            setFieldValue("rtype", v.value);
                            setFieldValue("rtypeName", v.label);
                            setFieldValue("toOrg", "");
                            setFieldValue("toOrgName", "");
                            setFieldValue("toOrgCountry", "");
                            setFieldValue("toOrgRegion", "");
                            setFieldValue("toOrgLoc", "");
                            setFieldValue("toOrgLocRegion", "");
                            setFieldValue("toOrgLocCountry", "");
                            setOrgType(v.label);
                            onOrgTypeChange(v.label);
                          }}
                          options={orgTypes}
                        />
                        {/* {errors.rtype && touched.rtype && (
                            <span className="error-msg text-danger">{errors.rtype}</span>
                          )} */}
                      </div>
                    </div>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-md-6 com-sm-12'>
                    <div className='name form-group'>
                      <label className='' htmlFor='delLocation'>
                        {t('region')}*
                      </label>
                      <div
                        className={`line ${
                          errors.toOrgLocRegion && touched.toOrgLocRegion
                            ? "border-danger"
                            : ""
                        }`}
                      >
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          placeholder={
                            <div className='select-placeholder-text'>
                              {t('select_delivery_location')}
                            </div>
                          }
                          value={
                            values.toOrgLocRegion === ""
                              ? t('select_delivery_location')
                              : {
                                  value: values.toOrgLocRegion,
                                  label: values.toOrgRegion,
                                }
                          }
                          defaultInputValue={values.toOrgRegion}
                          onChange={(v) => {
                            setFieldValue("toOrgRegion", v.label);
                            setFieldValue("toOrgLocRegion", v.value);
                            setRegion(v.label);
                            onRegionChange(v.label);
                            setFieldValue("toOrg", "");
                            setFieldValue("toOrgName", "");
                            setFieldValue("toOrgCountry", "");
                            // setFieldValue("toOrgRegion", "");
                            setFieldValue("toOrgLoc", "");
                            // setFieldValue("toOrgLocRegion", "");
                            setFieldValue("toOrgLocCountry", "");
                          }}
                          isDisabled={values.rtypeName === ""}
                          options={receiverWarehousesRegion}
                        />
                        {/*errors.toOrgLoc && touched.toOrgLoc && (
                        <span className="error-msg text-danger">{errors.toOrgLoc}</span>
                      )*/}
                      </div>
                    </div>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-md-6 com-sm-12'>
                    <div className='name form-group'>
                      <label className='' htmlFor='delLocation'>
                         {t('country')}*
                      </label>
                      <div
                        className={`line ${
                          errors.toOrgLocCountry && touched.toOrgLocCountry
                            ? "border-danger"
                            : ""
                        }`}
                      >
                        <Select
                          placeholder={
                            <div className='select-placeholder-text'>
                              {t('select_delivery_location')}
                            </div>
                          }
                          value={
                            values.toOrgLocCountry === ""
                              ? t('select_delivery_location')
                              : {
                                  value: values.toOrgLocCountry,
                                  label: values.toOrgCountry,
                                }
                          }
                          defaultInputValue={values.toOrgCountry}
                          onChange={(v) => {
                            setFieldValue("toOrgCountry", v.label);
                            setFieldValue("toOrgLocCountry", v.value);
                            setCountry(v.label);
                            onCountryChange(v.label);
                            setFieldValue("toOrg", "");
                            setFieldValue("toOrgName", "");
                            // setFieldValue("toOrgCountry", "");
                            // setFieldValue("toOrgRegion", "");
                            setFieldValue("toOrgLoc", "");
                            // setFieldValue("toOrgLocRegion", "");
                            // setFieldValue("toOrgLocCountry", "");
                          }}
                          isDisabled={values.rtypeName === ""}
                          options={receiverWarehousesCountry}
                        />
                        {/*errors.toOrgLoc && touched.toOrgLoc && (
                        <span className="error-msg text-danger">{errors.toOrgLoc}</span>
                      )*/}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-6 com-sm-12'>
                    <div className='name form-group'>
                      <label className='' htmlFor='organizationName'>
                        {t('organisation_name')}*
                      </label>
                      <div
                        className={`line ${
                          errors.toOrg && touched.toOrg ? "border-danger" : ""
                        }`}
                      >
                        {/* <DropdownButton
                          isText={true}
                          name={receiverOrgId}
                          name2="Select Organisation Name"
                          onSelect={(v) => {
                            setReceiverOrgLoc("Select Delivery Location");
                            setFieldValue('toOrgLoc', '');
                            setReceiverOrgId(v.name);
                            setFieldValue('toOrg', v.id);
                            setFieldValue('toOrgName', v.name);
                            onOrgChange(v.id);
                          }}
                          groups={allOrganisations.filter((org) => org.id != values.fromOrg)}
                        /> */}
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          placeholder={
                            <div className='select-placeholder-text'>
                              {t('select_organisation_name')}
                            </div>
                          }
                          value={
                            values.toOrg === ""
                              ? t('select_organisation_name')
                              : { value: values.toOrg, label: values.toOrgName }
                          }
                          defaultInputValue={values.toOrgName}
                          onBlur={handleBlur}
                          onChange={(v) => {
                            //setFieldValue('toOrgLoc', '');

                            //   const selOrg = orgDetails.filter((value) => {
                            //     return value.name==v.label;
                            // });
                            setFieldValue("toOrg", v.value);
                            setFieldValue("toOrgName", v.label);
                            onOrgChange(v.value);
                            setFieldValue("toOrgLoc", "");
                          }}
                          isDisabled={values.rtypeName === ""}
                          options={orgNames}
                        />
                        {/* {errors.toOrg && touched.toOrg && (
                          <span className="error-msg text-danger">{errors.toOrg}</span>
                        )} */}
                      </div>
                    </div>
                  </div>

                  <div className='col-md-6 com-sm-12'>
                    <div className='name form-group'>
                      <label className='org' htmlFor='delLocation'>
                        {t('organisation_id')}*
                      </label>
                      <div className="orgV border-0">{values.toOrg}</div>
                    </div>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-md-6 com-sm-12'>
                    <div className='name form-group'>
                      <label className='' htmlFor='delLocation'>
                        {t('delivery_location')}*
                      </label>
                      <div
                        className={`line ${
                          errors.toOrgLoc && touched.toOrgLoc
                            ? "border-danger"
                            : ""
                        }`}
                      >
                        {/* <DropdownButton
                          isText={true}
                          name={receiverOrgLoc}
                          name2="Select Delivery Location"
                          onSelect={(v) => {
                            let name =v?.warehouseAddress ? (v?.title +'/' + v?.warehouseAddress?.firstLine + ', ' + v?.warehouseAddress?.city) : (v?.title  +'/' + v?.postalAddress)  ;
                            setReceiverOrgLoc(name);
                            setFieldValue('toOrgLocName', name);
                           setFieldValue('toOrgLoc', v.id);
                          }}
                          groups={receiverWarehouses}
                        /> */}
                        {/*<Select
                          styles={customStyles}
                          isDisabled={disabled}
                          placeholder={disabled ? values.toOrgLoc : "Select Delivery Location"}
                          onChange={(v) => {
                            setFieldValue("toOrgLoc", v.value);
                          }}
                          defaultInputValue={values.toOrgLoc}
                          options={receiverWarehouses}
                        /> */}

                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          placeholder={
                            <div className='select-placeholder-text'>
                              {t('select_delivery_location')}
                            </div>
                          }
                          value={
                            values.toOrgLoc === ""
                              ? t('select_delivery_location')
                              : {
                                  value: values.toOrgLoc,
                                  label: values.toOrgLocName,
                                }
                          }
                          defaultInputValue={values.toOrgLocName}
                          onBlur={handleBlur}
                          onChange={(v) => {
                            setFieldValue("toOrgLocName", v.label);
                            setFieldValue("toOrgLoc", v.value);
                          }}
                          isDisabled={values.rtypeName === ""}
                          options={receiverWarehouses}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex pt-4 justify-content-between mb-1">
              <div className="value">{quantity}</div>
              <div className="d-flex">
                <button
                  type="button"
                  className="btn btn-outline-primary font-bold mr-2 mt-3"
                  onClick={() => {
                    dispatch(resetReviewPos({}));
                    props.history.push("/orders");
                  }}
                >
                  <b>{t('cancel')}</b>
                </button>

                <button className="btn btn-orange fontSize20 font-bold mt-3">
                  <img
                    src={OrderIcon}
                    width="20"
                    height="17"
                    className="mr-2 mb-1"
                    alt="Order"
                  />
                  <span>
                    <b>{t('review_order')}</b>
                  </span>
                </button>
              </div>
            </div>
          </form>
        )}
      </Formik>
      {openOrder && (
        <Modal
          close={() => closeModal()}
          size="modal-sm" //for other size's use `modal-lg, modal-md, modal-sm`
        >
          <ShipmentPopUp
            onHide={closeModal} //FailurePopUp
          />
        </Modal>
      )}

      {failedPop && (
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

      {addAnotherProductFailed && (
        <Modal
          close={() => closeModalFailedAddAnotherProduct()}
          size="modal-md"
        >
          <ShipmentFailPopUp
            onHide={closeModalFailedAddAnotherProduct} //FailurePopUp
            shipmentError={shipmentError}
          />
        </Modal>
      )}

      {message && (
        <div className="d-flex justify-content-center mt-3">
          {" "}
          <Alert severity='success'>
            <AlertTitle>{t('success')}</AlertTitle>
            {message}
          </Alert>
        </div>
      )}

      {errorMessage && (
        <div className="d-flex justify-content-center mt-3">
          {" "}
          <Alert severity='error'>
            <AlertTitle>{t('error')}</AlertTitle>
            {errorMessage}
          </Alert>
        </div>
      )}
    </div>
  );
};

export default NewOrder;
