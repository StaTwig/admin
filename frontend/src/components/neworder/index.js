import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import OrderIcon from '../../assets/icons/order.svg';
import EditTable from "./table/editTable";
import "./style.scss";
import { createShipment } from "../../actions/shipmentActions";
import { turnOn, turnOff } from "../../actions/spinnerActions";
import {
  getWarehouseByOrgId,
  getProductsByInventoryId,
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
import { getProducts } from '../../actions/poActions';

const NewOrder = (props) => {
  const [shippingOrderIds, setShippingOrderIds] = useState([]);
  const [senderOrganisation, setSenderOrganisation] = useState([]);
  const [allOrganisations, setAllOrganisations] = useState([]);
  const [receiverWarehouses, setReceiverWarehouses] = useState([]);
  const [orgID, setOrgID] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [addProducts, setAddProducts] = useState([{"productId": "","productQuantity": "","name": "","manufacturer": "","type": ""}]);
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
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [openCreatedInventory, setOpenCreatedInventory] = useState(false);
  const [openShipmentFail, setOpenShipmentFail] = useState(false);
  const [shipmentError, setShipmentError] = useState("");

  useEffect(() => {
    async function fetchData() {
      const orgSplit = user.organisation?.split('/');
      setSenderOrganisation(orgSplit);

      const orgs = await getAllOrganisations();
      const organisations = orgs.data.filter((org) => org.id != orgSplit[1]);
      setAllOrganisations(organisations);

      // const warehouses = await getWarehouseByOrgId(orgSplit[1]);
      // setSenderWarehouses(warehouses.data);

      const result = await getProducts();
      const categoryArray = result.map(
        product => product.type,
      );
      setCategory(categoryArray.filter((value, index, self) => self.indexOf(value) === index));
      console.log(categoryArray.filter((value, index, self) => self.indexOf(value) === index));
      
    }

    fetchData();
  }, []);

  const closeModal = () => {
    setOpenCreatedInventory(false);
    props.history.push("/orders");
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

  const onCategoryChange = async (index, value) => {
    try {
      const warehouse = await getWarehouseByOrgId(value);
      setReceiverWarehouses(warehouse.data);
    }
    catch (err) {
      setErrorMessage(err);
    }
  }

  const onProductChange = (index, item) => {
    addProducts.splice(index, 1);
    let newArr = [...addProducts];
    newArr.push(item);
    setFieldValue('products', newArr.map(row => ({"productId": row._id,"productQuantity": row?.productQuantity ? row?.productQuantity : 0,"name": row.name,"manufacturer": row.manufacturer})));
    setAddProducts(prod => [...newArr]);

    const prodIndex = products.findIndex(p => p._id === item._id);
    let newArray = [...products];
    newArray[prodIndex] = { ...newArray[prodIndex], isSelected: true };
    setProducts(prod => [...newArray]);
  }

  const onRemoveProduct = (index) => {
    const prodIndex = products.findIndex(p => p._id === addProducts[index]._id);
    let newArray = [...products];
    newArray[prodIndex] = { ...newArray[prodIndex], isSelected: false };
    setProducts(prod => [...newArray]);
    addProducts.splice(index, 1);
    let newArr = [...addProducts];
    if (newArr.length > 0)
      setFieldValue('products', newArr.map(row => ({"productId": row._id,"productQuantity": row?.productQuantity,"name": row.name,"manufacturer": row.manufacturer})));
    else
      setFieldValue('products', []);
    setAddProducts(prod => [...newArr]);
  }

  const onQuantityChange = (v, i) => {
    let newArr = [...addProducts];
    newArr[i].productQuantity = v;
    setFieldValue('products', newArr.map(row => ({"productId": row._id,"productQuantity": row.productQuantity,"name": row.name,"manufacturer": row.manufacturer})));
    setAddProducts(prod => [...newArr]);
  }

  const onAssign = async (values) => {
    let error = false;
    const { fromOrg, toOrg, toOrgLoc, fromOrgLoc, products } = values;
    products.forEach((p) => {
      if (p.productQuantity < 1)
        error = true;
    });

    if (!error) {
      const data = {
        airWayBillNo,
        shippingOrderId: shippingOrderId ? shippingOrderId : null,
        label: {
          labelId: labelCode,
          labelType: "QR_2DBAR",
        },
        externalShipmentId: "",
        supplier: {
          id: user.id,
          locationId: fromOrgLoc,
        },
        receiver: {
          id: null,
          locationId: toOrgLoc,
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
        products: products,
        poId: shippingOrderDetails.purchaseOrderId ? shippingOrderDetails.purchaseOrderId : null,
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

  return (
    <div className="NewShipment">
      <h1 className="breadcrumb">CREATE ORDER</h1>
      <Formik
        // enableReinitialize={true}
        initialValues={{
          fromOrg: senderOrganisation[0],
          toOrg: "",
          toOrgLoc: "",
          products: []
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
          console.log(values, errors);
          
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
              <label htmlFor="productDetails" className="headsup">
                Product Details*
              </label>
                <EditTable
                  product={addProducts}
                  products={products}
                  category={category}
                  handleQuantityChange={onQuantityChange}
                  onRemoveRow={onRemoveProduct}
                  handleProductChange={onProductChange}
                  handleCategoryChange={onCategoryChange}
                />
                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-white bg-white shadow-radius mt-3 font-bold"
                    onClick={() => {
                      let newArr = { productId: '', name: '', manufacturer: '', productQuantity: '', type: '' };
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
                      <label htmlFor="orgLocation">Organization ID*</label>
                      <div className="form-control border-0">
                        {senderOrganisation[1]}
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
                            setFieldValue('fromOrg', senderOrganisation[0]);
                            onOrgChange(v.id);
                            setOrgID(v.id);
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
                      <label htmlFor="delLocation">Organisation ID*</label>
                      <div className="form-control border-0">
                        {orgID}
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

            <div className="d-flex justify-content-between">
              <div className="value">{productQuantity}</div>
              <div className="d-flex">
                <button type="button" class="btn btn-white shadow-radius font-bold mr-2"onClick={() => props.history.push('/orders')}>
                  Cancel
                </button>

                <button className="btn btn-yellow fontSize20 font-bold">
                  <img src={OrderIcon} width="20" height="17" className="mr-2 mb-1" />
                  <span>Create Order</span>
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

export default NewOrder;
