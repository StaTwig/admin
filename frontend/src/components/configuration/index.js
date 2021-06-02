import React, { useState, useEffect } from "react";
import Tabs from "./tabs/tabs";
import "./style.scss";
import Arrow from "../../assets/icons/arrow.png"
import Add from '../../assets/icons/add.svg';
import EditTable from "./table/editTable";
import EditTable1 from "./table1/editTable";
 import { useSelector, useDispatch } from "react-redux";
//import EditTable from "./table/editTable";
import { Formik } from "formik";

import {getOrgTypeiIdsUrl} from "../../actions/organisationActions";
import {updateOrgTypesUrl} from "../../actions/organisationActions";
import {addNewOrgTypesUrl} from "../../actions/organisationActions";


const Configurationpart = (props) => {
  const [tabIndex, setTabIndex] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
 
  const [addOrganisation, setAddOrganisation] = useState([]);
  const [blankInventory, setBlankInventory] = useState({
    orgname: '', 
  });

  const [showleft,setShowLeft]=useState(true);
  
  const editPo = useSelector(state => {
    return state?.reviewPo;
  });
  
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  const [addProducts, setAddProducts] = useState([]);
  const [addProducts1, setAddProducts1] = useState([]);
  const dispatch = useDispatch();

  const [showorg,setShowOrg]=useState(true);

  const [showleft,setShowLeft]=useState(true);
  
  const editPo = useSelector(state => {
    return state?.reviewPo;
  });
  
  const [products, setProducts] = useState([]);

  const [category, setCategory] = useState(false);

  const [addProducts, setAddProducts] = useState([]);
  const [addProducts1, setAddProducts1] = useState([]);
  const dispatch = useDispatch();

 
  const [organisationsArr, setOrganisationsArr] = useState([]);

  useEffect(()=>{
    async function fetchOrganisationType() {
      const orgsType = await getOrgTypeiIdsUrl("CONF000");
      var arr =[];
      arr.push(orgsType.data[0].organisationTypes);
      setOrganisationsArr(arr);
    }
    fetchOrganisationType();
   },[])
    
    var orgTypeArray = [];
    organisationsArr.map((data)=>{
    for(var i=0;i<data.length;i++){
      orgTypeArray.push(data[i].name);
    }
  })
  
  const onQuantityChange = (v, i, setFieldValue) => {
    let newArr = [...addProducts];
    newArr[i].quantity = v;
    setFieldValue('products', newArr.map(row => ({"type": row.type})));
    setAddProducts(prod => [...newArr]);
  }

 
  const onAddAnotherOrganisation = () => {
    setInventoryState([...addOrganisation, blankInventory ]);
  };




  return (
    <div>
      <div className="addproduct">
        <h1 className="breadcrumb">CONFIGURATION</h1>
        <div>
        <Tabs {...props} tabIndex={tabIndex} setTabIndex={setTabIndex} />
        </div>
       
        {tabIndex == 6 && (
          <div className="row">
              <div className="col-2">
                <div className="card" Style="list-style: none; height:450px">
                  <div className="card-body" >
                    <li className="p-2 "
                      onClick={()=>{setShowOrg(true)}}
                    >
                     <a href="#">Organisation</a>
                      <img src={Arrow} alt="icon" width="7px" height="12px" className="ml-4"/></li>
                    <li className="p-2" onClick={()=>{setShowOrg(false)}}>
                    <a href="#">   Warehouse</a>
                      <img src={Arrow} alt="icon" width="7px" height="12px" className="ml-4"/></li>
                  </div>
                </div>
              </div>
              {
                showorg ? 
                
                <div className="col">
                <div className="row">
                  <p className="mb-4"><b>Organisation Type</b></p>
                    <div style={{position:"relative",left:"70%" }}>
                      
                        <button className="btn btn-yellow ml-5" 
                          onClick={() => {
                            let newArr = {  name: '' };
                            setAddProducts(prod => [...prod, newArr]);
                            setShowLeft(!showleft);
                            setCategory(true);
                            
                            }}
                        >
                          <img src={Add} width="13" height="13" className="mr-2" />
                          <span>Add New Type</span>
                          </button>


                     </div>
                </div>
              <div className="col">
              <div className="row">
                  <div className="col-6">
                        <EditTable
                          product={addProducts}
                          products={organisationsArr}
                          category={category}
                        
                          handleQuantityChange={(v, i) => onQuantityChange(v, i, setFieldValue)}
                        />
                        {/* {setShowLeft(false)}; */}
                      </div>
                           
                    </div>

              </div>
          </div>  : 

                  
            <div className="col">
                  <div className="row">
                    <p className="mb-4"><b>Warehouse Type</b></p>
                   
                      <div style={{position:"relative",left:"70%" }}>
                            <button className="btn btn-yellow ml-5" 
                            onClick={() => {
                              let newArr = {  name: '' };
                              setAddProducts1(prod => [...prod, newArr]);
                              setShowLeft(!showleft);
                              console.log(showleft,"------------------");
                              }}
                                >

                            <img src={Add} width="13" height="13" className="mr-2" />
                            <span>Add New Type</span>
                            </button>
                       </div>
                  </div>
                <div className="col">
                <div className="row">
              
                    <div className="col-6">
                          <EditTable1
                            product={addProducts1}
                            products={products}
                           // category={category}
                            handleQuantityChange={(v, i) => onQuantityChange(v, i, setFieldValue)}
                          />
                        </div>
                          
                      </div>
                </div>
            </div>
              }
              </div>    
        )}

      {tabIndex == 3 && (
       <div className="row d-flex flex-row p-3">
        <div className=" w-13 mt-3 mr-3">
     
          <div className="card">
            <div className="card-body" Style="list-style: none; height:450px">
            <div className="">
              <li className="p-2 ">Overview<img src={Arrow} alt="icon" width="7px" height="12px" className="ml-4"/></li>
              <li className="p-2">Shipment<img src={Arrow} alt="icon" width="7px" height="12px" className="ml-4"/></li>
              <li className="p-2">Inventory<img src={Arrow} alt="icon" width="7px" height="12px" className="ml-4"/></li>
            </div>
            </div>
          </div>
          </div>
<div className="col">
<table class="table ">
  <thead className="borderless">
    <tr className="borderless text-center">
      <th scope="col"></th>
      <th scope="col">Sent</th>
      <th scope="col">Received</th>
      <th scope="col">InTransit</th>
      <th scope="col">Expiring</th>
      <th scope="col">Expired</th>
      <th scope="col">Delay</th>
      <th scope="col">Added</th>
    </tr>
  </thead>
  <tbody className="borderless">
    <tr>
      <th scope="row">Total Products</th>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      
    </tr>
    <tr>
      <th scope="row">Total Products Expiring this week</th>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
    </tr>
    <tr>
      <th scope="row">Total Products Expiring this month</th>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
    </tr>
    <tr>
      <th scope="row">Total Products Expiring this year</th>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
    </tr>
    <tr>
      <th scope="row">Total Products Expired this week</th>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
    </tr>
    <tr>
      <th scope="row">Total Products Expired this month</th>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
    </tr>
    <tr>
      <th scope="row">Total Products Expired this year</th>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
    </tr>
    <tr>
      <th scope="row">Total Shipments</th>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
    </tr>
    <tr>
      <th scope="row">Total Product in inventory</th>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
    </tr>
  </tbody>
</table>

</div>

          </div>  )}
       </div>
    </div>
  );
};

export default Configurationpart;


