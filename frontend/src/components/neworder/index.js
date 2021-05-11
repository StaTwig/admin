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
import DropdownButton from "../../shared/dropdownButtonGroup";
import ShipmentPopUp from "./shipmentPopUp";
import ShipmentFailPopUp from "./shipmentFailPopUp";
import Modal from "../../shared/modal";
import { Formik } from "formik";
import { getProducts, getProductsByCategory, setReviewPos, resetReviewPos } from '../../actions/poActions';

const NewOrder = (props) => {
  const editPo = useSelector(state => {
    return state?.reviewPo;
  });

  const [allOrganisations, setAllOrganisations] = useState([]);
  const [receiverWarehouses, setReceiverWarehouses] = useState([]);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [addProducts, setAddProducts] = useState(editPo !== null ? editPo.products : [{"productId": "","quantity": "","name": "","manufacturer": "","type": ""}]);
  const dispatch = useDispatch();
  const [senderOrgId, setSenderOrgId] = useState(
    editPo !== null ? editPo.fromOrgId : "Select Organisation Name"
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

  useEffect(() => {
    async function fetchData() {
      // const orgSplit = user.organisation?.split('/');
      // console.log(orgSplit);

      // setSenderOrganisation(orgSplit);

      const orgs = await getAllOrganisations();
      setAllOrganisations(orgs.data);
      // if (orgSplit?.length > 0) {
      //   const organisations = orgs.data.filter((org) => org.id != user.organisationId);
      // }

      // const warehouses = await getWarehouseByOrgId(orgSplit[1]);
      // setSenderWarehouses(warehouses.data);

      const result = await getProducts();
      const categoryArray = result.map(
        product => product.type,
      );
      setCategory(categoryArray.filter((value, index, self) => self.indexOf(value) === index));
    }

    fetchData();
  }, []);

  const closeModal = () => {
    setOpenOrder(false);
    props.history.push("/orders");
  };

  const closeModalFail = () => {
    setFailedPop(false);
  };

  const onOrgChange = async (value) => {
    try {
      const warehouse = await getWarehouseByOrgId(value);
      setReceiverWarehouses(warehouse.data);
console.log("ware",warehouse);

  }
    catch (err) {
      setErrorMessage(err);
    }
  }

  const onCategoryChange = async (index, value, setFieldValue) => {
    try {
      const warehouse = await getProductsByCategory(value);
      let newArr = [...addProducts];
      newArr[index]['type'] = value;
      setAddProducts(prod => [...newArr]);
      setProducts(warehouse.data);
    }
    catch (err) {
      setErrorMessage(err);
    }
  }

  const onProductChange = (index, item, setFieldValue) => {
    addProducts.splice(index, 1);
    let newArr = [...addProducts];
    newArr.push(item);
    setFieldValue('products', newArr.map(row => ({"productId": row.id,"quantity": row?.quantity ? row?.quantity : 0,"name": row.name,"type": row.type,"manufacturer": row.manufacturer})));
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
      setFieldValue('products', newArr.map(row => ({"productId": row.id,"quantity": row?.quantity,"name": row.name,"type": row.type,"manufacturer": row.manufacturer})));
    else
      setFieldValue('products', []);
    setAddProducts(prod => [...newArr]);
  }

  const onQuantityChange = (v, i, setFieldValue) => {
    let newArr = [...addProducts];
    newArr[i].quantity = v;
    setFieldValue('products', newArr.map(row => ({"productId": row.id,"quantity": row.quantity,"name": row.name,"type": row.type,"manufacturer": row.manufacturer})));
    setAddProducts(prod => [...newArr]);
  }

  const onAssign = async (values) => {
    let error = false;
    const { fromOrg, toOrg, toOrgLoc, products,toOrgLocName } = values;
    products.forEach((p) => {
      if (p.quantity < 1)
        error = true;
    });

    if (!error) {
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
    else {
      setOrderError("Check product quantity");
      setFailedPop(true);
    }
  };

  return (
    <div className="NewOrder m-3">
      <h1 className="breadcrumb">CREATE NEW ORDER</h1>
      <Formik
        // enableReinitialize={true}
        initialValues={{
          fromOrg: editPo !== null ? editPo.fromOrg : '',
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
                  handleCategoryChange={onCategoryChange}
                />
                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-white bg-white shadow-radius font-bold"
                    onClick={() => {
                      let newArr = { productId: '', name: '', manufacturer: '', quantity: '', type: '' };
                      setAddProducts(prod => [...prod, newArr]);
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
                      <label htmlFor="organizationName">Organisation Name*</label>
                      <div className="form-control">
                        <DropdownButton
                          name={senderOrgId}
                          name2="Select Organisation Name"
                          onSelect={(v) => {
                            setSenderOrgId(v.name);
                            setFieldValue('fromOrg', v.id);
                            setFieldValue('fromOrgId', v.name);
                          }}
                          groups={allOrganisations}
                        />
                        {errors.fromOrg && touched.fromOrg && (
                          <span className="error-msg text-danger">{errors.fromOrg}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 com-sm-12">
                    <div className="form-group">
                      <label htmlFor="orgLocation">Organization ID*</label>
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
                      <label htmlFor="organizationName">Organisation Name*</label>
                      <div className="form-control">
                        <DropdownButton
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
                        />
                        {errors.toOrg && touched.toOrg && (
                          <span className="error-msg text-danger">{errors.toOrg}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 com-sm-12">
                    <div className="form-group">
                      <label htmlFor="delLocation">Organisation ID*</label>
                      <div className="form-control border-0">
                        {values.toOrg}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-md-6 com-sm-12">
                    <div className="form-group">
                      <label htmlFor="delLocation">Delivery Location*</label>
                      <div className="form-control">
                        <DropdownButton
                          name={receiverOrgLoc}
                          name2="Select Delivery Location"
                          onSelect={(v) => {
                            let name =v?.warehouseAddress ? (v?.title +'/' + v?.warehouseAddress?.firstLine + ', ' + v?.warehouseAddress?.city) : (v?.title  +'/' + v?.postalAddress)  ;
                            setReceiverOrgLoc(name);
                            setFieldValue('toOrgLocName', name);
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

            <div className="d-flex pt-4 justify-content-between">
              <div className="value">{quantity}</div>
              <div className="d-flex">
                <button type="button" className="btn btn-white shadow-radius font-bold mr-2"onClick={() => props.history.push('/orders')}>
                  Cancel
                </button>

                <button className="btn btn-primary fontSize20 font-bold">
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
