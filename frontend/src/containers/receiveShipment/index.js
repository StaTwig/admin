import { useDispatch} from 'react-redux';
import React,{ useEffect, useState} from 'react';
import ReceiveShipment from '../../components/receiveShipment';
import Header from '../../shared/header';
import Sidebar from '../../shared/sidebarMenu';
import {trackProduct,  getViewShipment} from "../../actions/shipmentActions";


const ReceiveShipmentContainer = props => {
  const[trackData,setTrackData]=useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const result = await dispatch(getViewShipment(props.match.params.id));
      console.log('Test');
      console.log(result);
       if (result)
       {
        console.log(result);
       setTrackData(result);
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
