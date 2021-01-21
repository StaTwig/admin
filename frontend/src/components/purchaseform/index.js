import React, { useState ,useEffect} from 'react';
import ProductsTable from './products';
import ExcelPopUp from './excelpopup';
import Modal from '../../shared/modal';
import updownArrow from '../../assets/icons/up-and-down-dark.svg';
import ExportIcon from '../../assets/icons/Export.svg';
import dropdownIcon from '../../assets/icons/drop-down.svg';
import './style.scss';
import DropdownButton from '../../shared/dropdownButtonGroup';
import { createPO ,setReviewPos,getProducts,getManufacturers} from '../../actions/poActions';
import { useDispatch,useSelector} from "react-redux";

const tableHeader = ['Product ID', 'Product Name', 'Manufacturer', 'Quantity'];

const PurchaseForm = props => {
  const editPo = useSelector(state => {
    return state.editPo;
  });
  const { user, users } = props;

  const orgNames = ['St-1','St-2','St-3']
  const userNames = users.map(usr => usr.name);
  const [ExternalPoId, setExternalPoId] = useState(editPo.ExternalPoId);
  const [OrgId, setOrgId] = useState(editPo.OrgId);
  const [vendorId, setVendorId] = useState(editPo.vendorId);
  const [vendorName, setVendorName] = useState(editPo.vendorName);
  const [toDeliveryLocation, setToDeliveryLocation] = useState(editPo.toDeliveryLocation);
  const [products, setProducts] = useState(['12']);
  const [deliveryId, setDeliveryId] = useState(editPo.deliveryId);
  const [manufacturers, setManufacturers] = useState(['man']);
  const [product, setProduct] = useState(Object.keys(editPo.products[0])[0].split('-')[0]);
  const [manufacturer, setManufacturer] = useState(Object.keys(editPo.products[0])[0].split('-')[1]);
  const [quantity, setQuantity] = useState(editPo.products[0][`${product}-${manufacturer}`]);
  const  [materialId, setMaterialId] = useState(editPo.material);
  const [message, setMessage] = useState('');
  const month = new Date().getMonth()+1;
  const todayDate = new Date().getDate() + '/' + month + '/'  +new Date().getFullYear();
  const[menu,setMenu] = useState(false);
  const [poError,setPoError]=useState();
  const[openExcel,setOpenExcel]= useState(false);

  const closeExcelModal = () => {
    setOpenExcel(false);
  };

  useEffect(() => {
    async function fetchData() {
      const result = await getProducts();
      const manufacturerResult = await getManufacturers();
      const productArray = result.map((product, index) => (
        product.productName
     ))
      setProducts(productArray);
      setManufacturers(manufacturerResult);
    }
    fetchData();
  },[]);

  const poFields= ['ExternalPoId','OrgId','vendorName','vendorId','toDeliveryLocation','deliveryId',
                      'materialId','product','manufacturer','quantity'];

    const checkValidationErrors = (validations) => {
      let error = false;
      for (let i = 0; i < validations.length; i++) {
        let validationVariable = eval(validations[i]);
        validationVariable;
        if (
          validationVariable.length < 1 ||
          validationVariable == 'Select Product' ||
          validationVariable == 'Select OrgId'||
          validationVariable == 'Select Manufacturer' ||
          validationVariable == 'Select Product ID'
      ) {
          setPoError(validations[i] +" "+"must be Specified");
          error = true;
          break;
        }
      }
   return error;
    };
  const dispatch = useDispatch();

  const onProceed = () =>{
    if (checkValidationErrors(poFields)) {
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
        materialId,
        products: [],
        date:todayDate,
      },
    };

    //Store in reducer
    dispatch(setReviewPos(data));
    console.log('new po data', data);
    //Redirect to review page.
    props.setEditMode(true);
    console.log('new po data', data);
    }

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
              value={ExternalPoId}
            />
          </div>
     
        {/* <div className="input-group">
          <label className="reference">Send PO To</label>
          <input
            disabled
            type="text"
            className="form-control"
            placeholder="Select Supplier"
            value={user.name}
          />
         
        </div> */}
        <div className="input-group">
          <label className="reference">Organisation ID</label>
          <div className="form-control">
           <DropdownButton
            name={OrgId}
            onSelect={item => setOrgId(item)}
            groups={orgNames}
            className="text"
          />
          </div>
        </div>
       </div>
      <div className="d-flex justify-content-between">
      <div className="input-group">
          <label className="reference">Vendor Name</label>
           <input
              type="text"
              className="form-control"
              name="shipmentId"
              placeholder="Enter Vendor Name"
              onChange={e => setVendorName(e.target.value)}
              value={vendorName}
            />
        </div>
        <div className="input-group">
          <label className="reference">Vendor ID</label>
            <input
              type="text"
              className="form-control"
              name="shipmentId"
              placeholder="Enter Vendor ID"
              onChange={e => setVendorId(e.target.value)}
              value={vendorId}
            />
          </div>
      </div>
      <div className="d-flex justify-content-between">
      <div className="input-group">
          <label className="reference">To Delivery Location</label>
           <input
              type="text"
              className="form-control"
              name="shipmentId"
              placeholder="Enter To Delivery Location"
              onChange={e => setToDeliveryLocation(e.target.value)}
              value={toDeliveryLocation}
            />
        </div>
     
        <div className="input-group">
          <label className="reference">To Delivery ID</label>
           <input
              type="text"
              className="form-control"
              name="shipmentId"
              placeholder="Enter To Delivery ID"
              onChange={e => setDeliveryId(e.target.value)}
              value={deliveryId}
            />
        </div>
      </div>
      <ProductsTable
        tableHeader={tableHeader}
        materialId={materialId}
        onMaterialSelect={e => setMaterialId(e.target.value)}
        onProductSelect={item => setProduct(item)}
        onManufacturerSelect={item => setManufacturer(item)}
        product={product}
        manufacturer={manufacturer}
        manufacturers={manufacturers}
        products={products}
        quantity={quantity}
        onQuantityChange={e => setQuantity(e.target.value)}
      />
    <button className="btn btn-white shadow-radius font-bold">
        +<span> Add Another Product</span>
      </button>
 
    <div className="row float-right">
      <button className="btn-primary btn mr-4" onClick = {()=>setMenu(!menu)}>
            <div className="d-flex  align-items-center">
              <img src={ExportIcon} width="16" height="16" className="mr-3" />
              <span>Import</span>
              <img src={dropdownIcon} width="16" height="16" className="ml-3" />
            </div>
          </button>
          {
          menu ? 
          <div class="menu5">
         <button className=" btn btn-outline-primary" onClick={()=>setOpenExcel(true)}> Excel</button>
       </div> : null
       }
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
        <button className="btn btn-orange review" onClick={onProceed}>REVIEW</button>
      </div>
     
      <div className="text text-success">{message}</div>
      <div className="text text-danger">
        {poError}
      </div>
      
      </div>

      
  );
};

export default PurchaseForm;

/*const onReview = async () => {
   // const productId = `PO${Math.floor(Math.random() * 90000) + 10000}`;
    const productId = 'PO1805';
    const deliveryToObject = users.find(usr => usr.name === vendorName);
    const sendPOToObject = users.find(usr => usr.name === sendPOTo);
    const productManufacturer = { [`${product}-${manufacturer}`]: quantity };
    const data = {
      data: {
        orderID: productId,
        receiver: deliveryToObject,
        sendpoto: sendPOToObject,
        supplier: { name: user.name, email: user.email },
        client,
        destination,
        products: [productManufacturer],
        date:todayDate,
      },
    };

    console.log(data);
    const result = await createPO(data);
    if (result.status === 200) {
      setMessage('Success !');
    }else {
      setMessage('Unable to process , Please Check the Data entered');
    }
  }; */