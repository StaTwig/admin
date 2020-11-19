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

const tableHeader = ['Material ID', 'Product Name', 'Manufacturer', 'Quantity'];

const PurchaseForm = props => {
  const editPo = useSelector(state => {
    return state.editPo;
  });
  const { user, users } = props;

  const userNames = users.map(usr => usr.name);
  const vendorIds = ['1900000363','1900000501','1900008579','1900000363','1900007249','1900007249','1900000462','1900000363'];
  const [deliveryTo, setDeliveryTo] = useState(editPo.receiver.name);
  const [sendPOTo, setSendPOTo] = useState(editPo.sendPOTo);
  const [vendorId, setVendorId] = useState(editPo.vendorId);
  const [unicefPo, setUnicefPo] = useState(editPo.unicefPo);
  const unicefPos =['45163183','45163206','45163239','45163283','45163284','45163285','45163287','45163289']
  const [vendorName, setVendorName] = useState(editPo.vendorName);
  const poNums = ['45163183','45163206','45163239','45163283','45163284','45163285','45163287','45163289']
  const [poNum, setPoNum] = useState(editPo.poNum);
  const [locationId, setLocationId] = useState(editPo.locationId);
  const locationIds = ['5577','5588','5597','5543','5581','5623','5548','5573'];
  const [products, setProducts] = useState([]);
  const [shippedFrom, setShippedFrom] = useState(editPo.shippedFrom);
  const [toLocation, setToLocation] = useState(editPo.toLocation);
  const locations= ['Niger','Guinea','Madagascar','Congo','Mali','Ethiopia','Republic of Cameroon','Chad'];
  const [manufacturers, setManufacturers] = useState([]);
  const [product, setProduct] = useState(Object.keys(editPo.products[0])[0].split('-')[0]);
  const [manufacturer, setManufacturer] = useState(Object.keys(editPo.products[0])[0].split('-')[1]);
  const [quantity, setQuantity] = useState(editPo.products[0][`${product}-${manufacturer}`]);
  const  [materialId, setMaterialId] = useState(editPo.materialId);
  const  materialIds= ['S359190','S359191','S359192','S359193','S359194', 'S359195', 'S359196', 'S359197']
  const [destination, setDestination] = useState(editPo.destination);
  const [client, setClient] = useState(editPo.client);
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

  const poFields= ['sendPOTo','vendorId','unicefPo','vendorName','poNum','locationId','shippedFrom','toLocation',
                      'materialId','product','manufacturer','quantity'];

    const checkValidationErrors = (validations) => {
      let error = false;
      for (let i = 0; i < validations.length; i++) {
        let validationVariable = eval(validations[i]);
        validationVariable;
        if (
          validationVariable.length < 1 ||
          validationVariable == 'Select Product' ||
          validationVariable == 'Select Manufacturer' ||
          validationVariable == 'Select receiver'||
          validationVariable == 'Select Send Po To'||
          validationVariable == 'Select Vendor Id'||
          validationVariable == 'Select Po'||
          validationVariable == 'Select Vendor Name'||
          validationVariable == 'Select Po#'||
          validationVariable == 'Select location Id'||
          validationVariable == 'Select Shipped From'||
          validationVariable == 'Select to Location'||
          validationVariable == 'Select Material Id'
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
    const deliveryToObject = users.find(usr => usr.name === vendorName);
    const sendPOToObject = users.find(usr => usr.name === sendPOTo);
    const productManufacturer = { [`${product}-${manufacturer}`]: quantity };
    const data = {
      data: {
        receiver: deliveryToObject,
        sendpoto: sendPOToObject, 
        supplier: { name: user.name, email: user.email },
        vendorId,
        unicefPo,
        poNum,
        locationId,
        shippedFrom,
        toLocation,
        materialId,
        products: [productManufacturer],
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

  const onReview = async () => {
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
  };

  return (
    <div className="purchaseform">
        <p className="date-alignment">Date: {todayDate}</p>
      <div className="d-flex justify-content-between">
      <div className="input-group">
          <label className="reference">Send PO To</label>
          <div className="form-control">
          <DropdownButton
           name={sendPOTo}
            onSelect={item => setSendPOTo(item)}
            groups={userNames}
            className="text"
          />
          </div>
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
          <label className="reference">Vendor Id</label>
          <div className="form-control">
          <DropdownButton
            name={vendorId}
            onSelect={item => setVendorId(item)}
            groups={vendorIds}
            className="text"
          />
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between">

      <div className="input-group">
      <label className="reference">Purchase Order ID</label>
          <div className="form-control">
          <DropdownButton
           name={unicefPo}
            onSelect={item => setUnicefPo(item)}
            groups={unicefPos}
            className="text"
          />
          </div>
        </div>
       <div className="input-group">
          <label className="reference">Vendor Name</label>
          <div className="form-control">
          <DropdownButton
           name={vendorName}
            onSelect={item => setVendorName(item)}
            groups={userNames}
            className="text"
          />
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between">
      <div className="input-group">
          <label className="reference">PO Item#</label>
          <div className="form-control">
          <DropdownButton
           name={poNum}
            onSelect={item => setPoNum(item)}
            groups={poNums}
            className="text"
          />
          </div>
        </div>
        <div className="input-group">
          <label className="reference">To Location ID</label>
          <div className="form-control">
          <DropdownButton
           name={locationId}
            onSelect={item => setLocationId(item)}
            groups={locationIds}
            className="text"
          />
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <div className="input-group">
          <label className="reference">Shipped From</label>
          <div className="form-control">
          <DropdownButton
           name={shippedFrom}
            onSelect={item => setShippedFrom(item)}
            groups={locations}
            className="text"
          />
          </div>
        </div>
        <div className="input-group">
          <label className="reference">To Location</label>
          <div className="form-control">
          <DropdownButton
           name={toLocation}
            onSelect={item => setToLocation(item)}
            groups={locations}
            className="text"
          />
          </div>
        </div>
      </div>
      <ProductsTable
        tableHeader={tableHeader}
        manufacturers={manufacturers}
        products={products}
        materialId={materialId}
        materialIds={materialIds}
        onMaterialSelect={item => setMaterialId(item)}
        onProductSelect={item => setProduct(item)}
        onManufacturerSelect={item => setManufacturer(item)}
        product={product}
        manufacturer={manufacturer}
        quantity={quantity}
        onQuantityChange={e => setQuantity(e.target.value)}
      />
      {/* <button className="btn btn-white shadow-radius font-bold">
        +<span> Add Another Product</span>
      </button>*/}
 
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
          <div class="menu">
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
