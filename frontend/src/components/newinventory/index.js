import React, { useState, useEffect } from 'react';
import EditTable from '../../shared/table/editTable';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import Modal from '../../shared/modal';
import InventoryPopUp from './inventorypopup';
import FailurePopUp from './failurepopup';
import {
  addMultipleInventories,
  setReviewinventories,
} from '../../actions/inventoryActions';
import { getManufacturers, getProducts } from '../../actions/poActions';

const NewInventory = props => {
  const editInventories = useSelector(state => {
    return state.reviewInventory;
  });

  useEffect(() => {
    async function fetchData() {
      const result = await getProducts();
      const manufacturerResult = await getManufacturers();
      const productArray = result.map(product => product.productName);
      setProducts(productArray);
      setManufacturers(manufacturerResult);
    }
    fetchData();
  }, []);

  const [openCreatedInventory, setOpenCreatedInventory] = useState(false);
  const [openFailInventory, setOpenFailInventory] = useState(false);
  const [inventoryError, setInventoryError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [products, setProducts] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [quantity, setQuantity] = useState('');
  const blankInventory = {
    productName: 'Select Product',
    manufacturerName: 'Select Manufacturer',
    quantity: '',
    manufacturingDate: '',
    expiryDate: '',
    batchNumber: '',
    serialNumber: '',
    storageConditionmin: '',
    storageConditionmax: '',
  };
  const [inventoryState, setInventoryState] = useState(editInventories);
  const editTableProps = {
    products,
    manufacturers,
  };
  const closeModal = () => {
    setOpenCreatedInventory(false);
  };

  const closeModalFail = () => {
    setOpenFailInventory(false);
  };

  var numeric = { year: 'numeric', month: 'numeric' };

  const dispatch = useDispatch();

  const inventoryFields = [
    'productName',
    'manufacturerName',
    'quantity',
    'storageConditionmin',
    'storageConditionmax',
    'manufacturingDate',
    'expiryDate',
    'batchNumber',
    'serialNumber',
  ];

  const month = new Date().getMonth() + 1;
  const newMonth = `0${month}`.slice(-2);
  const todayDate = newMonth + '/' + new Date().getFullYear();
  const dateValidationFields = ['expiryDate'];
  //const [validate,setValidate] = useState('')
  const expiryDateValidation = date => {
    let error = false;
    inventoryState.forEach(inventory => {
      if(error) return;
      let validationVariable = inventory.expiryDate;
      let a = new Date(
        Date.parse(
          typeof validationVariable == 'string'
            ? validationVariable
            : validationVariable.toLocaleDateString(),
        ),
      ).getFullYear();
      let b = todayDate.slice(-4);
      let c = `0${new Date(
        Date.parse(
          typeof validationVariable == 'string'
            ? validationVariable
            : validationVariable.toLocaleDateString(),
        ),
      ).getMonth() + 1}`.slice(-2);
      let d = todayDate.substring(0, 2);
      if (a < b || (a == b && c <= d)) {
        setInventoryError('Check expiryDate');
        setOpenFailInventory(true);
        error = true;
      }
    })

    return error;
  };
  const checkValidationErrors = validations => {
    let error = false;
    inventoryState.forEach(inventory => {
      if(error) return error;
      for (let i = 0; i < validations.length; i++) {
        let validationVariable = inventory[validations[i]];
        if (
          validationVariable.length < 1 ||
          validationVariable == 'Select Product' ||
          validationVariable == 'Select Manufacturer'
        ) {
          setInventoryError(validations[i]);
          setOpenFailInventory(true);
          error = true;
          break;
        }
      }


    });
    return error;

  };
  const onProceedToReview = () => {
    if (checkValidationErrors(inventoryFields)) {
      return;
    } else if (expiryDateValidation(dateValidationFields)) {
      return;
    }

    //Store in reducer
    dispatch(setReviewinventories(inventoryState));

    console.log('clicked');
    //Redirect to review page.
    props.history.push('/reviewinventory');

  };
  const onAddInventory = async () => {
    const updatedInventoryState = [...inventoryState];
    updatedInventoryState.forEach(inventory => inventory.manufacturingDate = inventory.manufacturingDate.date.toLocaleDateString(
      'en-GB',
      numeric,
    ))
    const result = await addMultipleInventories({ inventories: inventoryState });
    if (result.status != 400) {
      setOpenCreatedInventory(true);
    } else {
      const err = result.data.data[0];
      setErrorMessage(err.msg);
    }
  };

  const onAddAnotherProduct = () => {
    setInventoryState([...inventoryState, { ...blankInventory }]);
  };
  const handleInventoryChange = (index, key, value) => {
    const updatedInventoryState = [...inventoryState];
    updatedInventoryState[index][key] = value;
    setInventoryState(updatedInventoryState);
  };

  return (
    <div className="Newinventory">
      <h1 className="breadcrumb">ADD INVENTORY</h1>
      <EditTable
        {...editTableProps}
        inventories={inventoryState}
        handleInventoryChange={handleInventoryChange}
      />

      <button
        className="btn btn-white shadow-radius font-bold"
        onClick={onAddAnotherProduct}
      >
        +<span> Add Another Product</span>
      </button>

      <hr />
      <div className="d-flex justify-content-between">
        <div className="total">Grand Total</div>
        <span className="value">{quantity}</span>

        <button className="btn-primary btn" onClick={onProceedToReview}>
          Proceed To Review
        </button>
      </div>
      {openCreatedInventory && (
        <Modal
          close={() => closeModal()}
          size="modal-sm" //for other size's use `modal-lg, modal-md, modal-sm`
        >
          <InventoryPopUp
            onHide={closeModal} //FailurePopUp
          />
        </Modal>
      )}

      {openFailInventory && (
        <Modal
          close={() => closeModalFail()}
          size="modal-sm" //for other size's use `modal-lg, modal-md, modal-sm`
        >
          <FailurePopUp
            onHide={closeModalFail} //FailurePopUp
            inventoryError={inventoryError}
          />
        </Modal>
      )}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
    </div>
  );
};

export default NewInventory;

/*<button className="btn-primary btn" onClick={onAddInventory}>
          {' '}
          Add Inventory
        </button>*/
