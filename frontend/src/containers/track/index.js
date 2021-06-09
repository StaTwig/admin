import React, { useState,useEffect } from "react";
import Track from '../../components/track';
import Header from '../../shared/header';
import Sidebar from '../../shared/sidebarMenu';
import {useDispatch} from "react-redux";
import { chainOfCustody, chainOfCustodyTrack, getJourneyTrack,getViewShipment} from "../../actions/shipmentActions";
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
 

  const searchData = async (id,type) => {
    dispatch(turnOn());
    const result = await chainOfCustody(id);

    dispatch(turnOff());
    if (result.status == 200) {
      
      var arr = [];
      var finalArr = [];
      if (result.data.data.poChainOfCustody && (type=="PO"||type=='po')) {
        setPoChainOfCustodyData(result.data.data.poChainOfCustody);
        arr = result.data.data.poChainOfCustody;
        arr["shipmentUpdates"] = [{
          // status: result.data.data.poDetails.poStatus,
          status: 'RECEIVED',
          products: result.data.data.poChainOfCustody[0].products,
          updatedOn: moment(result.data.data.poChainOfCustody.lastUpdatedOn).format('DD/MM/YYYY hh:mm'),
          isOrder: 1
        }];
        finalArr = [arr];
        setShippmentChainOfCustodyData(finalArr);
      }
      else if(result.data.data.shipmentChainOfCustody &&(type=="SH"||type=='sh'))
      {
        setPoChainOfCustodyData(result.data.data.shipmentChainOfCustody);
        arr = result.data.data.shipmentChainOfCustody;
        arr["shipmentUpdates"] = [{
          // status: result.data.data.poDetails.poStatus,
          status: 'RECEIVED',
          products: result.data.data.shipmentChainOfCustody[0].products,
          updatedOn: moment(result.data.data.shipmentChainOfCustody.updatedAt).format('DD/MM/YYYY hh:mm'),
          isOrder: 1
        }];
        finalArr = [arr];
        setShippmentChainOfCustodyData(finalArr);
        // finalArr = result.data.data.inwardShipmentsArray.concat([result.data.data.trackedShipment]).concat(result.data.data.outwardShipmentsArray)

      }
      else if(type=="AO" || type=="ao"){
        let newarr = [];
        newarr=result.data.data.shipmentChainOfCustody;
        newarr.splice(1,newarr.length-1);
        setPoChainOfCustodyData(newarr);
        arr = result.data.data.shipmentChainOfCustody;
        arr["shipmentUpdates"]= [{
          // status: result.data.data.poDetails.poStatus,
          status: 'RECEIVED',
          products: result.data.data.shipmentChainOfCustody[0].products,
          updatedOn: moment(result.data.data.shipmentChainOfCustody[0].updatedAt).format('DD/MM/YYYY hh:mm'),
          isOrder: 1
        }];
        arr.splice(1,arr.length-1);
        finalArr = [arr];
      
        setShippmentChainOfCustodyData(finalArr);
      }
      
    }else{
      setPoChainOfCustodyData([]);
      setShippmentChainOfCustodyData([]);
    }
  }

  const resetData = () => {
    setPoChainOfCustodyData([]);
    setShippmentChainOfCustodyData([]);
  }
console.log(poChainOfCustodyData,"poChainOfCustodyData");
console.log(shippmentChainOfCustodyData,"shippmentChainOfCustodyData");
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

