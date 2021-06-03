import React, { useState,useEffect } from "react";
import Track from '../../components/track';
import Header from '../../shared/header';
import Sidebar from '../../shared/sidebarMenu';
import {useDispatch} from "react-redux";
import { chainOfCustody, chainOfCustodyTrack, getShipmentJourney } from "../../actions/shipmentActions";
import { turnOff, turnOn } from '../../actions/spinnerActions';

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
    const result = await getShipmentJourney(id);
    
    dispatch(turnOff());
    if (result.status == 200) {
      setPoChainOfCustodyData(result.data.data.poDetails);
      setShippmentChainOfCustodyData(result.data.data.inwardShipmentsArray.concat([result.data.data.trackedShipment]).concat(result.data.data.outwardShipmentsArray));
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

