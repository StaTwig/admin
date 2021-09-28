import React, { useState,useEffect } from "react";
import Tracing from '../../components/tracing';
import Header from '../../shared/header';
import Sidebar from '../../shared/sidebarMenu';
import {useDispatch, useSelector} from "react-redux";
import {trackProduct} from "../../actions/shipmentActions";
import { chainOfCustody, updateStatus } from "../../actions/shipmentActions";

const TracingContainer = props => {
  //const dispatch = useDispatch();
  const[trackData,setTrackData]=useState({});
  const [poChainOfCustodyData, setPoChainOfCustodyData] = useState([]);
  const [shippmentChainOfCustodyData, setShippmentChainOfCustodyData] = useState([]);
  
   useEffect(() => {
    async function fetchData() {
      const result = await trackProduct(props.match.params.id);
       if (result.status==200)
       {
         console.log('Tracking data');
         console.log(result.data);
       setTrackData(result.data);
       }else{
         setTrackData({});
       }
}
    fetchData();
  },[]);
  
  useEffect(() => {
    async function fetchData() {
      const result = await chainOfCustody(props.match.params.id);
       if (result.status==200)
       {
       console.log('Data From Response');
       console.log(result.data.data);
      //  setPoChainOfCustodyData(result.data.data['poChainOfCustody']);
      //  poChainOfCustodyData = result.data.data['poChainOfCustody'];
      setPoChainOfCustodyData(result.data.data['poChainOfCustody']);
      setShippmentChainOfCustodyData(result.data.data['shipmentChainOfCustody']);
       console.log('from variable')
       console.log(poChainOfCustodyData);
       console.log(shippmentChainOfCustodyData);
       }else{
         setPoChainOfCustodyData([]);
         setShippmentChainOfCustodyData([]);
       }
}
    fetchData();
  },[]);

  return (
    <div className="container-fluid p-0">
      <Header {...props} />
      <div className="d-flex">
        <Sidebar {...props} />
        <div className="content">
          <Tracing trackData={trackData} poChainOfCustodyData={poChainOfCustodyData} shippmentChainOfCustodyData={shippmentChainOfCustodyData} {...props}/>          
        </div>
      </div>
    </div>
  );
};

export default TracingContainer;

