import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import OrderIcon from '../../assets/icons/order.svg';
import EditTable from "./table/editTable";
import "./style.scss";
import {
  getWarehouseByOrgId,
  getAllOrganisations,
} from "../../actions/shippingOrderAction";
// import {
//   getShippingOrderIds,
//   getShippingOrderById,
//   getWarehouseByOrgId,
//   getAllOrganisations,
//   getProductsByInventoryId
// } from "../../actions/shippingOrderAction";
import ShipmentPopUp from "./shipmentPopUp";
import ShipmentFailPopUp from "./shipmentFailPopUp";
import { Formik } from "formik";
import Select from 'react-select';
import Modal from '../../shared/modal';
import ExcelPopUp from './ExcelPopup/index';
import ExportIcon from '../../assets/icons/Export.svg';
import dropdownIcon from '../../assets/icons/drop-down.svg';

import { getProducts, getProductsByCategory, setReviewPos, resetReviewPos , getOrganizationsByTypes} from '../../actions/poActions';

const NewOrder = (props) => {
  const editPo = useSelector(state => {
    return state?.reviewPo;
  });
  
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
  const [openCreatedOrder, setOpenCreatedOrder] = useState(false);
  const [allOrganisations, setAllOrganisations] = useState([]);
  const [receiverWarehouses, setReceiverWarehouses] = useState([]);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [openExcel, setOpenExcel] = useState(false);
  const [menu, setMenu] = useState(false);
  const [addProducts, setAddProducts] = useState(editPo !== null ? editPo.products : [{"productId": "","id": "","productQuantity": "","name": "","manufacturer": "","type": ""}]);
  const dispatch = useDispatch();
  const [senderOrgId, setSenderOrgId] = useState(
    editPo !== null ? editPo.fromOrgId : "Select Organisation Name"
  );
  const [senderOrgType, setSenderOrgType] = useState(
    editPo !== null ? editPo.typeName : ""
  );
  const [receiverOrgId, setReceiverOrgId] = useState(
    editPo !== null ? editPo.toOrgName : "Select Organisation Name"
  );
  const [receiverOrgLoc, setReceiverOrgLoc] = useState(
    editPo !== null ? editPo.toOrgLocName : "Select Delivery Location"
  );
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [quantity, setquantity] = useState("");
  const [openOrder, setOpenOrder] = useState(false);
  const [failedPop, setFailedPop] = useState(false);
  const [shipmentError, setOrderError] = useState("");
  const [orgTypes, setOrgTypes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // const orgSplit = user.organisation?.split('/');
      // console.log(orgSplit);
      
      // setSenderOrganisation(orgSplit);

      const orgs = await getAllOrganisations();
      setAllOrganisations(orgs.data.map(item => {
                                      return {
                                        value: item.id,
                                        label: item.name,
                                        type: item.type
                                      };
                                    }));
      const orgType = await getOrganizationsByTypes("CONF000");
      setOrgTypes(orgType.data.length > 0 ? orgType.data[0].organisationTypes.map(item => {
                                      return {
                                        value: item.id,
                                        label: item.name
                                      };
                                    }) : []);
      // if (orgSplit?.length > 0) {
      //   const organisations = orgs.data.filter((org) => org.id != user.organisationId);
      // }

      // const warehouses = await getWarehouseByOrgId(orgSplit[1]);
      // setSenderWarehouses(warehouses.data);

      const result = await getProducts();
      const categoryArray = result.map(
        product => product.type,
      );
      setCategory(categoryArray.filter((value, index, self) => self.indexOf(value) === index).map(item => {
                                      return {
                                        value: item,
                                        label: item
                                      };
                                    }));
    }
    fetchData();
  }, []);

  const closeExcelModal = () => {
    setOpenExcel(false);
  };

  const closeModalFail = () => {
    setFailedPop(false);
  };
  const closeModal = () => {
    setOpenCreatedOrder(false);
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
    }
    catch (err) {
      setErrorMessage(err);
    }
  }

  const onCategoryChange = async (index, value, setFieldValue) => {
    try {
      const warehouse = await getProductsByCategory(value);
      let newArr = [...addProducts];
      newArr[index] = {"productId": "", "id": "", "productQuantity": "", "name": "", "type": value, "manufacturer": ""};
      newArr[index]['quantity'] = '';
      setAddProducts(prod => [...newArr]);
      setFieldValue('products', newArr.map(row => ({ "productId": row.id, "id": row.id, "productQuantity": row?.productQuantity ? row?.productQuantity : 0, "name": row.name, "type": row.type, "manufacturer": row.manufacturer })));
    
      setProducts(warehouse.data.map(item => {
                                      return {
                                        value: item.name,
                                        label: item.name,
                                        ...item
                                      };
                                    }));
    }
    catch (err) {
      setErrorMessage(err);
    }
  }

  const onProductChange = (index, item, setFieldValue) => {
    addProducts.splice(index, 1);
    let newArr = [...addProducts];
    newArr.push(item);
    
    setFieldValue('products', newArr.map(row => ({"productId": row.id,"id": row.id,"productQuantity": row?.productQuantity ? row?.productQuantity : '',"quantity": row?.productQuantity ? row?.productQuantity : '',"name": row.name,"type": row.type,"manufacturer": row.manufacturer})));
    setAddProducts(prod => [...newArr]);

    const prodIndex = products.findIndex(p => p.id === item.id);
    let newArray = [...products];
    newArray[prodIndex] = { ...newArray[prodIndex], isSelected: true };
    setProducts(prod => [...newArray]);
  }

  const onRemoveProduct = (index, setFieldValue) => {
    const prodIndex = products.findIndex(p => p.id === addProducts[index].id);
    let newArray = [...products];
    newArray[prodIndex] = { ...newArray[prodIndex], isSelected: false };
    setProducts(prod => [...newArray]);
    addProducts.splice(index, 1);
    let newArr = [...addProducts];
    if (newArr.length > 0)
      setFieldValue('products', newArr.map(row => ({"productId": row.id,"id": row.id,"productQuantity": row?.productQuantity,"name": row.name,"type": row.type,"manufacturer": row.manufacturer})));
    else
      setFieldValue('products', []);
    setAddProducts(prod => [...newArr]);
  }

  const onQuantityChange = (v, i, setFieldValue) => {
    let newArr = [...addProducts];
    newArr[i].productQuantity = v;
    setFieldValue('products', newArr.map(row => ({"productId": row.id,"id": row.id,"productQuantity": row.productQuantity,"name": row.name,"type": row.type,"manufacturer": row.manufacturer})));
    setAddProducts(prod => [...newArr]);
  }

  const onAssign = async (values) => {
    let error = false;
    let nameError=false;
    let typeError=false;
    const { fromOrg, toOrg, toOrgLoc, products, toOrgLocName } = values;
    console.log("products------",products);
    products.forEach((p) => {
      if(!p.name)
      {
        nameError=true;  
      }
      if(!p.type)
      {
        typeError=true; 
      }
      if(p.productQuantity < 1)
      {
        error = true;
      }
    });
    if (!error &&  !nameError && !typeError) {
      dispatch(setReviewPos(values));
      props.history.push('/revieworder');
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

    }
    else if(error) {
      setOrderError("Check product quantity");
      setFailedPop(true);
    }
    else if(nameError) {
      setOrderError("Check Product Category");
      setFailedPop(true);
    }
    else if(typeError) {
      setOrderError("Check Product Type");
      setFailedPop(true);
    }
    
  };


  return (
    <div className="NewOrder m-3">
    <div className="d-flex justify-content-between mb-3">
      <h1 className="breadcrumb">CREATE NEW ORDER</h1>
      <div className="d-flex flex-column align-items-center">
    <button className="btn-primary btn" onClick={() => setMenu(!menu)}>
            <div className="d-flex align-items-center">
              <img src={ExportIcon} width="16" height="16" className="mr-3" />
              <span>Import</span>
              <img src={dropdownIcon} width="16" height="16" className="ml-3" />
            </div>
          </button>
          {menu ? (
            <div class="menu">
              <button
                className=" btn btn-outline-info mb-2 "
                onClick={() => setOpenExcel(true)}
              >
                {' '}
                Excel
              </button>
              <button className=" btn btn-outline-info" > Other</button>
            </div>
          ) : null}
              {openExcel && (
            <Modal
              title="Import"
              close={() => closeExcelModal()}
              size="modal-md" //for other size's use `modal-lg, modal-md, modal-sm`
            >
              <ExcelPopUp
                {...props}
                onHide={closeExcelModal} //FailurePopUp
                setOpenCreatedOrder={setOpenCreatedOrder}
              />
            </Modal>
          )}
          </div>
          </div>
      <Formik
        // enableReinitialize={true}
        initialValues={{
          fromOrg: editPo !== null ? editPo.fromOrg : '',
          type: editPo !== null ? editPo.type : '',
          typeName: editPo !== null ? editPo.typeName : '',
          rtype: editPo !== null ? editPo.rtype : '',
          rtypeName: editPo !== null ? editPo.rtypeName : '',
          fromOrgId: editPo !== null ? editPo.fromOrgId : '',
          toOrg:  editPo !== null ? editPo.toOrg : '',
          toOrgName:  editPo !== null ? editPo.toOrgName : '',
          toOrgLoc: editPo !== null ? editPo.toOrgLoc : '',
          toOrgLocName: editPo !== null ? editPo.toOrgLocName : '',
          products: editPo !== null ? editPo.products : []
        }}
        validate={(values) => {
          const errors = {};
          if (!values.fromOrg) {
            errors.fromOrg = "Required";
          }
          if (!values.toOrg) {
            errors.toOrg = "Required";
          }
          if (!values.toOrgLoc) {
            errors.toOrgLoc = "Required";
          }
          if (values.products.length == 0) {
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
          <form onSubmit={handleSubmit} className="">

            <div className="row mb-3">
              <label htmlFor="productDetails" className="headsup1">
                Product Details
              </label>
                <EditTable
                  product={addProducts}
                  products={products}
                  category={category}
                  handleQuantityChange={(v, i) => onQuantityChange(v, i, setFieldValue)}
                  onRemoveRow={(index) => onRemoveProduct(index, setFieldValue)}
                  handleProductChange={(index, item) => onProductChange(index, item, setFieldValue)}
                  handleCategoryChange={(index, item) => onCategoryChange(index, item, setFieldValue)}
                />
                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-white bg-white shadow-radius font-bold mb-1"
                    onClick={() => {
                      let arr = addProducts.filter(p => p.productId != '' && p.id != '' && p.name != '' && p.manufacturer != '' && p.productQuantity != '' && p.type != '');
                      if (arr.length == addProducts.length) {
                        let newArr = { productId: '', id: '', name: '', manufacturer: '', productQuantity: '', type: '' };
                        setAddProducts(prod => [...prod, newArr]);
                      }
                    }}
                  >
                    +<span> Add Another Product</span>
                  </button>
                </div>
            </div>
            {errors.products && touched.products && (
              <span className="error-msg text-danger">{errors.products}</span>
            )}

            <div className="row mb-3">
              <div className="col bg-white shadow formContainer low p-3">
                <label htmlFor="client" className="headsup">
                  Order From
                </label>
                <div className="row">
                    <div className="col-md-6 com-sm-12">
                      <div className="form-group">
                        <label className="required-field" htmlFor="organizationName" style={{fontSize:"16px"}}>Organisation Type</label>
                        <div className="form-control">
                          <Select
                            styles={customStyles}
                            placeholder={<div className="select-placeholder-text">Select Organisation Type</div>}
                           
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
                </div>
                <div className="row">
                  <div className="col-md-6 com-sm-12">
                    <div className="form-group">
                      <label className="required-field" htmlFor="organizationName" style={{fontSize:"16px"}}>Organisation Name</label>
                      <div className="form-control">
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
                            styles={customStyles}
                            placeholder={<div className="select-placeholder-text">Select Organisation Name</div>}
                          
                            defaultInputValue={values.fromOrgId}
                            onChange={(v) => {
                              setFieldValue('fromOrg', v.value);
                              setFieldValue('fromOrgId', v.label);
                            }}
                            isDisabled={values.typeName == ''}
                            options={allOrganisations.filter(a => a.type == values.typeName)}
                          />
                        {errors.fromOrg && touched.fromOrg && (
                          <span className="error-msg text-danger">{errors.fromOrg}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 com-sm-12">
                    <div className="form-group">
                      <label className="required-field" htmlFor="orgLocation" style={{fontSize:"16px"}}>Organization ID</label>
                      <div className="form-control border-0">
                        {values.fromOrg}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col bg-white formContainer shadow low p-3">
                <label htmlFor="client" className="headsup">
                Deliver To
                </label>
                  
                 <div className="row">
                    <div className="col-md-6 com-sm-12">
                      <div className="form-group">
                        <label className="required-field" htmlFor="organizationName" style={{fontSize:"16px"}}>Organisation Type</label>
                        <div className="form-control">
                          <Select
                            styles={customStyles}
                           
                            placeholder={<div className="select-placeholder-text">Select Organisation Type</div>}
                            defaultInputValue={values.rtypeName}
                            onChange={(v) => {
                              setFieldValue('rtype', v.value);
                              setFieldValue('rtypeName', v.label);
                            }}
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
                      <label className="required-field" htmlFor="organizationName" style={{fontSize:"16px"}}>Organisation Name</label>
                      <div className="form-control">
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
                            styles={customStyles}
                            placeholder={<div className="select-placeholder-text">Select Organisation Name</div>}
                            
                            defaultInputValue={values.toOrgName}
                            onChange={(v) => {
                              setFieldValue('toOrgLoc', '');
                              setFieldValue('toOrg', v.value);
                              setFieldValue('toOrgName', v.label);
                              onOrgChange(v.value);
                            }}
                            isDisabled={values.rtypeName == ''}
                            options={allOrganisations.filter(a => a.type == values.rtypeName)}
                          />
                        {errors.toOrg && touched.toOrg && (
                          <span className="error-msg text-danger">{errors.toOrg}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 com-sm-12">
                    <div className="form-group">
                      <label className="required-field" htmlFor="delLocation" style={{fontSize:"16px"}}>Organisation ID</label>
                      <div className="form-control border-0">
                        {values.toOrg}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 com-sm-12">
                    <div className="form-group">
                      <label className="required-field" htmlFor="delLocation" style={{fontSize:"16px"}}>Delivery Location</label>
                      <div className="form-control">
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
 {/* <Select
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
                            styles={customStyles}
                            placeholder={<div className="select-placeholder-text">Select Delivery Location</div>}
                           
                            defaultInputValue={values.toOrgLocName}
                            onChange={(v) => {
                              setFieldValue('toOrgLocName', v.label);
                              setFieldValue('toOrgLoc', v.value);
                            }}
                            isDisabled={values.rtypeName == ''}
                            options={receiverWarehouses}
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
            <div className="d-flex pt-4 justify-content-between mb-1">
              <div className="value">{quantity}</div>
              <div className="d-flex">
                <button type="button" className="btn btn-white shadow-radius font-bold mr-2"onClick={() => {dispatch(resetReviewPos({})); props.history.push('/orders')}}>
                  Cancel
                </button>

                <button className="btn btn-orange fontSize20 font-bold mb-2">
                  <img src={OrderIcon} width="20" height="17" className="mr-2 mb-1" />
                  <span>Review Order</span>
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

export default NewOrder;
