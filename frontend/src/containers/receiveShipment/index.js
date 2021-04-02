import { useDispatch} from 'react-redux';
import React,{ useEffect, useState} from 'react';
import ReceiveShipment from '../../components/receiveShipment';
import Header from '../../shared/header';
import Sidebar from '../../shared/sidebarMenu';
import {trackProduct} from "../../actions/shipmentActions";


const ReceiveShipmentContainer = props => {
  const[trackData,setTrackData]=useState({});

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


  return (
    <div className="container-fluid p-0">
      <Header {...props} />
      <div className="d-flex">
        <Sidebar {...props} />
        <div className="content">
          <ReceiveShipment trackData={trackData} {...props}/>
        </div>
      </div>
    </div>
  );
};

export default ReceiveShipmentContainer;
