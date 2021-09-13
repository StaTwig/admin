import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductsTable from './products';
import ProductsHeading from './productsHeading';
import ExcelPopUp from './excelpopup';
import Modal from '../../shared/modal';
import ExportIcon from '../../assets/icons/Export.svg';
import dropdownIcon from '../../assets/icons/drop-down.svg';
import './style.scss';
import DropdownButton from '../../shared/dropdownButtonGroup';
import { setReviewPos, getProducts, createPO } from '../../actions/poActions';
import { useDispatch, useSelector } from 'react-redux';
import {
  getOrganisations,
  getWarehouseByOrgId,
} from '../../actions/productActions';
import AlertModal from './alertModal';

const PurchaseForm = (props) => {
  const editPo = useSelector(state => {
    return state.editPo;
  });

  const [organisationName, setOrganisationName] = useState('');
  const [organisations, setOrganisations] = useState([]);
  const [orgIds, setOrgIds] = useState([]);
  const [orgId, setOrgId] = useState('Select Organisation ID');
  const [customerLocationIds, setCustomerLocationIds] = useState([]);
  const [customerLocationId, setCustomerLocationId] = useState(
    'Select Delivery Location ID',
  );
  const [customerLocationName, setCustomerLocationName] = useState('');
  const [warehouses, setWarehouses] = useState([]);
  const [externalPoId, setExternalPoId] = useState(editPo.ExternalPoId);
  const [customerOrgId, setCustomerOrgId] = useState('Select Organisation ID');
  const [products, setProducts] = useState([]);
  const [cashfreeData, setCashfreeData] = useState({});
  const [ modalProps, setModalProps ] = useState({});
  const[openCreatedPo,setOpenCreatedPo]= useState(false);

  const defaultProduct = {
    productId: 'Select ',
    productName: '',
    quantity: '',
    manufacturer: '',
    externalId: 'Select Product ID'
  };
  const [productRows, setProductRows] = useState([defaultProduct]);
  const [message, setMessage] = useState('');
  const month = new Date().getMonth() + 1;
  const todayDate =
    new Date().getDate() + '/' + month + '/' + new Date().getFullYear();
  const [menu, setMenu] = useState(false);
  const [poError, setPoError] = useState();
  const [openExcel, setOpenExcel] = useState(false);
  const [ orderAmount , setOrderAmount ] = useState('');


  const closeExcelModal = () => {
    setOpenExcel(false);
  };


  useEffect(() => {
    async function fetchData() {
      const result = await getProducts();
      setProducts(result);
      const orgs = await getOrganisations();
      setOrganisations(orgs);
      const ids = orgs.map(org => org.id);
      setOrgIds(ids);
    }
    fetchData();
  }, []);

  const poFields = [
    'ExternalPoId',
    'OrgId',
    'vendorName',
    'vendorId',
    'toDeliveryLocation',
    'deliveryId',
    'materialId',
    'product',
    'manufacturer',
    'quantity',
  ];

  const checkValidationErrors = validations => {
    let error = false;
    for (let i = 0; i < validations.length; i++) {
      let validationVariable = eval(validations[i]);
      // validationVariable;
      if (
        validationVariable.length < 1 ||
        validationVariable == 'Select Product' ||
        validationVariable == 'Select OrgId' ||
        validationVariable == 'Select Manufacturer' ||
        validationVariable == 'Select Product ID'
      ) {
        setPoError(validations[i] + ' ' + 'must be Specified');
        error = true;
        break;
      }
    }
    return error;
  };
  const dispatch = useDispatch();
  
  const closeModal =  () => {
    window.location.reload();
    props.history.push('/shipments')
  }

  const onProceed = async () => {
    /*if (checkValidationErrors(poFields)) {
      return;
    }

    const productManufacturer = { [`${product}-${manufacturer}`]: quantity };

    const data = {
      data: {
        ExternalPoId,
        OrgId,
        vendorName,
        vendorId,
        toDeliveryLocation,
        deliveryId,
        products: [{ materialId, product, manufacturer, quantity }],
        date: todayDate,
      },
    };

    //Store in reducer
    dispatch(setReviewPos(data));
    console.log('new po data', data);
    //Redirect to review page.
    props.setEditMode(true);
    console.log('new po data', data);*/

    //Temporarily sending post reqeuest

    //Todo this needs to be done after review

    const isoDate = new Date().toISOString();
    const supplierOrg = organisations.find(org => org.id === orgId);
    const customerOrg = organisations.find(org => org.id === customerOrgId);
    const customerWarhouse = warehouses.find(
      war => war.id === customerLocationId,
    );
    const selectedProducts = productRows.map(prod => ({
      productId: prod.productId,
      quantity: prod.quantity,
    }));
    const data = {
      externalId: externalPoId,
      creationDate: isoDate,
      lastUpdatedOn: isoDate,
      supplier: {
        supplierOrganisation: orgId,
        supplierIncharge: supplierOrg.primaryContactId,
      },
      customer: {
        customerOrganisation: customerOrgId,
        customerIncharge: customerOrg.primaryContactId,
        shippingAddress: {
          shippingAddressId: customerLocationId,
          shipmentReceiverId: customerWarhouse.supervisors[0],
        },
      },
      products: selectedProducts,
    };

    console.log('data', data);
    const result = await createPO(data);
    if (result.status === 200) {
      await onCashfreeClick();
      setOpenCreatedPo(true);
      setMessage(result.data.message);
      setModalProps({
        message: 'Created Successfully!',
        type: 'Success'
      })
    }
else {
  setOpenCreatedPo(true);
      setMessage(result.data.message)
      setModalProps({
        message: result.data.message,
        type: 'Failure'
      })
    }
  };

  const onCustomerOrgChange = async item => {
    setCustomerOrgId(item);
    const wareshouseList = await getWarehouseByOrgId(item);
    setWarehouses(wareshouseList.data);
    const warehouseIds = wareshouseList.data.map(warehouse => warehouse.id);
    setCustomerLocationIds(warehouseIds);
  };

  const handleProductSelect = (item, index) => {
    const productRowsClone = [...productRows];
    const product = products.find(product => product.externalId === item);
    const productRow = {
      ...productRowsClone[index],
      externalId: product.externalId,
      productId: product.id,
      name: product.name,
      manufacturer: product.manufacturer,
    };
    productRowsClone[index] = productRow;
    setProductRows(productRowsClone);
  };

  const handleQuantityChange = (e, index) => {
    const productRowsClone = [...productRows];
    const productRow = {
      ...productRowsClone[index],
      quantity: e.target.value,
    };
    setOrderAmount(parseInt(e.target.value) * 10);
    productRowsClone[index] = productRow;
    setProductRows(productRowsClone);
  };

  const addAnotherProduct = () => {
    setProductRows([...productRows, defaultProduct]);
  };

  const onCashfreeClick = async () => {
    const data = {
      orderAmount: orderAmount,
      orderCurrency: 'INR',
      orderNote: 'test optional Text',
      customerName: 'John Doe',
      customerEmail: 'Johndoe@test.com',
      customerPhone: '9999999999',
    };
    try {
      const result = await axios.post(
        'https://payment.vaccineledger.com/request',
        data,
      );
      if (result) {
        const postData = result.data.postData;
        setCashfreeData(postData);
        //const postResult = await axios.post('https://test.cashfree.com/billpay/checkout/post/submit', postData);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="purchaseform">
      <p className="date-alignment">Date: {todayDate}</p>
      <div className="row">
        <div className="col mr-3">
          <div className="input-group">
            <label className="reference">External PO ID</label>
            <input
              type="text"
              className="form-control"
              name="shipmentId"
              placeholder="Enter External PO ID"
              onChange={e => setExternalPoId(e.target.value)}
              value={externalPoId}
            />
          </div>
          <div className="font-weight-bold text-primary mb-2">Supplier Details:</div>
          <div className="input-group">
            <label className="reference">Organisation ID</label>
            <div className="form-control">
              <DropdownButton
                name={orgId}
                onSelect={item => {
                  setOrgId(item);
                  const org = organisations.find(org => org.id === item);
                  setOrganisationName(org.name);
                }}
                groups={orgIds}
                className="text"
              />
            </div>
          </div>
          <div className="input-group">
            <label className="reference">Organisation Name</label>
            <input
              type="text"
              className="form-control"
              name="Organisation Name"
              placeholder="Organisation Name"
              value={organisationName}
            />
          </div>
        </div>
        <div className="col">
          <p className="mb-2 font-weight-bold text-primary">Customer Details : </p>
          <div className="input-group">
            <label className="reference">Organisation ID</label>
            <div className="form-control">
              <DropdownButton
                name={customerOrgId}
                onSelect={onCustomerOrgChange}
                groups={orgIds}
                className="text"
              />
            </div>
          </div>

          <div className="input-group">
            <label className="reference">Delivery Location ID</label>
            <div className="form-control">
              <DropdownButton
                name={customerLocationId}
                onSelect={item => {
                  setCustomerLocationId(item);
                  const war = warehouses.find(war => war.id === item);
                  setCustomerLocationName(war.postalAddress);
                }}
                groups={customerLocationIds}
                className="text"
              />
            </div>
          </div>

          <div className="input-group">
            <label className="reference">Delivery Location</label>
            <input
              type="text"
              className="form-control"
              name="Delivery Location"
              placeholder="Delivery Location"
              value={customerLocationName}
            />
          </div>
        </div>
      </div>
      <div className="table productTable mt-2">
        <div className="rTable">
          <ProductsHeading />
          {productRows.map((product, index) => (
            <ProductsTable
              key={index}
              products={products}
              product={product}
              index={index}
              orderAmount={orderAmount}
              setOrderAmount={setOrderAmount}
              onProductSelect={handleProductSelect}
              onQuantityChange={handleQuantityChange}
            />
          ))}
        </div>
      </div>

      <div className="d-flex flex-row justify-content-between">
        
      <button
        className="btn btn-white shadow-radius font-bold"
        onClick={addAnotherProduct}
      >
        +<span> Add Another Product</span>
      </button>
        {menu ? (
          <div class="menu5">
            <button
              className=" btn btn-outline-primary"
              onClick={() => setOpenExcel(true)}
            >
              {' '}
              Excel
            </button>
          </div>
        ) : null}
        {openExcel && (
          <Modal
            title="Import"
            close={() => closeExcelModal()}
            size="modal-md" //for other size's use `modal-lg, modal-md, modal-sm`
          >
            <ExcelPopUp
              onHide={closeExcelModal} //FailurePopUp
            />
          </Modal>
        )}

        
        
      {openCreatedPo && (
        <Modal
          close={() => closeModal()}
          size="modal-sm" //for other size's use `modal-lg, modal-md, modal-sm`
        >
          <AlertModal
            onHide={closeModal}
            {...modalProps}
            {...props}
          />
        </Modal>
      )}
        <div className="d-flex flex-row">
        <button className="btn btn-yellow review  mr-5" onClick={onProceed}>
          Create PO
        </button>

        <form
          id="redirectForm"
          method="post"
          action="https://test.cashfree.com/billpay/checkout/post/submit"
        >
          <input type="hidden" name="appId" value={cashfreeData.appId} />
          <input type="hidden" name="orderId" value={cashfreeData.orderId} />
          <input
            type="hidden"
            name="orderAmount"
            value={cashfreeData.orderAmount}
          />
          <input
            type="hidden"
            name="orderCurrency"
            value={cashfreeData.orderCurrency}
          />
          <input
            type="hidden"
            name="orderNote"
            value={cashfreeData.orderNote}
          />
          <input
            type="hidden"
            name="customerName"
            value={cashfreeData.customerName}
          />
          <input
            type="hidden"
            name="customerEmail"
            value={cashfreeData.customerEmail}
          />
          <input
            type="hidden"
            name="customerPhone"
            value={cashfreeData.customerPhone}
          />
          <input
            type="hidden"
            name="returnUrl"
            value={cashfreeData.returnUrl}
          />
          <input
            type="hidden"
            name="notifyUrl"
            value={cashfreeData.notifyUrl}
          />
          <input
            type="hidden"
            name="signature"
            value={cashfreeData.signature}
          />
          <input
            type="hidden"
            name="vendorSplit"
            value={cashfreeData.vendorSplit}
          />
          <input
            type="submit"
            value="Pay Now"
            className="btn btn-orange review"
            disabled={!cashfreeData.appId}
          />
        </form>
        </div>
      </div>

    </div>
  );
};

export default PurchaseForm;


/* <button className="btn-primary btn mr-4" onClick={() => setMenu(!menu)}>
          <div className="d-flex  align-items-center">
            <img src={ExportIcon} width="16" height="16" className="mr-3" />
            <span>Import</span>
            <img src={dropdownIcon} width="16" height="16" className="ml-3" />
          </div>
        </button>*/
