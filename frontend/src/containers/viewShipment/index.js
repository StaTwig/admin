import React, { useEffect, useState } from 'react';
import ViewShipment from '../../components/viewShipment';
import Header from '../../shared/header';
import Sidebar from '../../shared/sidebarMenu';
import {trackProduct, getViewShipment} from "../../actions/shipmentActions";
import { chainOfCustody, updateStatus, fetchImage } from "../../actions/shipmentActions";
const ViewShipmentContainer = props => {
  const[trackData,setTrackData]=useState({});
const [shippmentChainOfCustodyData, setShippmentChainOfCustodyData] = useState([]);
const [imagesData, setImagesData] = useState([]);
   useEffect(() => {
    async function fetchData() {
      const result = await getViewShipment(props.match.params.id);
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

  useEffect(() => {
    async function fetchData() {
      const result = await fetchImage(props.match.params.id);
       if (result.status==200)
       {
       console.log('Data Image');
       console.log(result.data.data);
       setImagesData(result.data.data);
       }else{
        setImageData([]);
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
          < ViewShipment trackData={trackData} shippmentChainOfCustodyData={shippmentChainOfCustodyData} imagesData={imagesData} {...props}/>
        </div>
      </div>
    </div>
  );
};
export default ViewShipmentContainer;
