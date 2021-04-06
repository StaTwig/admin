import React, { useEffect, useState } from 'react';
import ViewShipment from '../../components/viewShipment';
import Header from '../../shared/header';
import Sidebar from '../../shared/sidebarMenu';
import {trackProduct} from "../../actions/shipmentActions";
import { chainOfCustody, updateStatus } from "../../actions/shipmentActions";
const ViewShipmentContainer = props => {
  const[trackData,setTrackData]=useState({});
const [shippmentChainOfCustodyData, setShippmentChainOfCustodyData] = useState([]);
   useEffect(() => {
    async function fetchData() {
      const result = await trackProduct(props.match.params.id);
       if (result.status==200)
       {
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
      setShippmentChainOfCustodyData(result.data.data['shipmentChainOfCustody']);
       }else{
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
          < ViewShipment trackData={trackData} shippmentChainOfCustodyData={shippmentChainOfCustodyData}{...props}/>
        </div>
      </div>
    </div>
  );
};
export default ViewShipmentContainer;
