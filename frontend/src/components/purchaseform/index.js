import React, { useState, useEffect } from 'react';
import ProductsTable from './products';
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

const PurchaseForm = props => {
  const editPo = useSelector(state => {
    return state.editPo;
  });

  const [organisationName, setOrganisationName] = useState(
    'Select Organisation ID',
  );
  const [organisations, setOrganisations] = useState([]);
  const [orgIds, setOrgIds] = useState([]);
  const [orgId, setOrgId] = useState('Select');
  const [customerLocationIds, setCustomerLocationIds] = useState([]);
  const [customerLocationId, setCustomerLocationId] = useState(
    'Select Location ID',
  );
  const [customerLocationName, setCustomerLocationName] = useState(
    'Select Location ID',
  );
  const [warehouses, setWarehouses] = useState([]);
  const [externalPoId, setExternalPoId] = useState(editPo.ExternalPoId);
  const [customerOrgId, setCustomerOrgId] = useState('Select Org Id');
  const [products, setProducts] = useState([]);
  const defaultProduct = {
    productId: 'Select',
    productName: 'Select',
    quantity: '',
    manufacturer: 'Select Product Id',
  };
  const [productRows, setProductRows] = useState([defaultProduct]);
  const [message, setMessage] = useState('');
  const month = new Date().getMonth() + 1;
  const todayDate =
    new Date().getDate() + '/' + month + '/' + new Date().getFullYear();
  const [menu, setMenu] = useState(false);
  const [poError, setPoError] = useState();
  const [openExcel, setOpenExcel] = useState(false);

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
      validationVariable;
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
      setMessage(result.data.message);
    } else {
      setPoError('Failed to create po');
    }
  };

  const onCustomerOrgChange = async item => {
    setCustomerOrgId(item);
    const wareshouseList = await getWarehouseByOrgId(item);
    setWarehouses(wareshouseList);
    const warehouseIds = wareshouseList.map(warehouse => warehouse.id);
    setCustomerLocationIds(warehouseIds);
  };

  const handleProductSelect = (item, index) => {
    const productRowsClone = [...productRows];
    const product = products.find(product => product.id === item);
    const productRow = {
      ...productRowsClone[index],
      productId: product.id,
      productName: product.name,
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
    productRowsClone[index] = productRow;
    setProductRows(productRowsClone);
  };

  const addAnotherProduct = () => {
    setProductRows([...productRows, defaultProduct]);
  };

  return (
    <div className="purchaseform">
      <p className="date-alignment">Date: {todayDate}</p>
      <div className="d-flex justify-content-between">
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
        <div className="input-group">
          <label className="reference">Customer Organisation ID</label>
          <div className="form-control">
            <DropdownButton
              name={customerOrgId}
              onSelect={onCustomerOrgChange}
              groups={orgIds}
              className="text"
            />
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <div className="input-group">
          <label className="reference">Supplier Organisation Name</label>
          <label>{organisationName}</label>
        </div>
        <div className="input-group">
          <label className="reference">Customer Delivery Location</label>
          <label>{customerLocationName}</label>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <div className="input-group">
          <label className="reference">Supplier Organisation ID</label>
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

        <div className="input-group">
          <label className="reference">Customer Location ID</label>
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
      {productRows.map((product, index) => (
        <ProductsTable
          key={index}
          products={products}
          product={product}
          index={index}
          onProductSelect={handleProductSelect}
          onQuantityChange={handleQuantityChange}
        />
      ))}

      <button
        className="btn btn-white shadow-radius font-bold"
        onClick={addAnotherProduct}
      >
        +<span> Add Another Product</span>
      </button>

      <div className="row float-right">
        <button className="btn-primary btn mr-4" onClick={() => setMenu(!menu)}>
          <div className="d-flex  align-items-center">
            <img src={ExportIcon} width="16" height="16" className="mr-3" />
            <span>Import</span>
            <img src={dropdownIcon} width="16" height="16" className="ml-3" />
          </div>
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
        <button className="btn btn-orange review" onClick={onProceed}>
          REVIEW
        </button>
      </div>

      <div className="text text-success">{message}</div>
      <div className="text text-danger">{poError}</div>
    </div>
  );
};

export default PurchaseForm;
