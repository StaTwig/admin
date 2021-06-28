import React, { useState,useEffect } from "react";
import Track from '../../components/track';
import Header from '../../shared/header';
import Sidebar from '../../shared/sidebarMenu';
import {useDispatch} from "react-redux";
import { chainOfCustody, chainOfCustodyTrack, getJourneyTrack } from "../../actions/shipmentActions";
import { turnOff, turnOn } from '../../actions/spinnerActions';
import moment from 'moment';

const TrackContainer = props => {
  const dispatch = useDispatch();
  const [poChainOfCustodyData, setPoChainOfCustodyData] = useState([]);
  const [shippmentChainOfCustodyData, setShippmentChainOfCustodyData] = useState([]);
  
  // const searchData = async (id) => {
  //   dispatch(turnOn());
  //   const result = await chainOfCustody(id);
  //   dispatch(turnOff());
  //   if (result.status == 200) {
  //     setPoChainOfCustodyData(result.data.data.poChainOfCustody);
  //     setShippmentChainOfCustodyData(result.data.data.shipmentChainOfCustody);
  //   }else{
  //     setPoChainOfCustodyData([]);
  //     setShippmentChainOfCustodyData([]);
  //   }
  // }

  const searchData = async (id) => {
    dispatch(turnOn());
    const result = await getJourneyTrack(id);
    
    dispatch(turnOff());
    if (result.status == 200) {
      var arr = [];
      var finalArr = [];
      if (result.data.data?.poDetails) {
        if (!!Object.keys(result.data.data?.poDetails).length) {
          setPoChainOfCustodyData(result.data.data?.poDetails);
          arr = result.data.data.poDetails;
        
          arr["shipmentUpdates"] = [{
            poStatus: result.data.data.poDetails.poStatus,
            status: 'RECEIVED',
            products: result.data.data.poDetails.products,
            updatedOn: moment(result.data.data.poDetails.lastUpdatedOn).format('DD/MM/YYYY hh:mm'),
            isOrder: 1
          }];
          if (result.data.data?.trackedShipment?.length)
            finalArr = [arr].concat(result.data.data.inwardShipmentsArray).concat(result.data.data.trackedShipment).concat(result.data.data.outwardShipmentsArray);
          else
            finalArr = [arr].concat(result.data.data.inwardShipmentsArray).concat(result.data.data.outwardShipmentsArray);
        }
      }
      
      if (finalArr.length == 0) {
        if (result.data.data?.trackedShipment?.length)
          finalArr = result.data.data.inwardShipmentsArray.concat(result.data.data.trackedShipment).concat(result.data.data.outwardShipmentsArray);
      }
      
      setShippmentChainOfCustodyData(finalArr);
    }else{
      setPoChainOfCustodyData([]);
      setShippmentChainOfCustodyData([]);
    }
  }

  const resetData = () => {
    setPoChainOfCustodyData([]);
    setShippmentChainOfCustodyData([]);
  }

  return (
    <div className="container-fluid p-0">
      <Header {...props} />
      <div className="d-flex">
        <Sidebar {...props} />
        <div className="content">
          <Track searchData={searchData} resetData={resetData} poChainOfCustodyData={poChainOfCustodyData} shippmentChainOfCustodyData={shippmentChainOfCustodyData} {...props}/>          
        </div>
      </div>
    </div>
  );
};

export default TrackContainer;

