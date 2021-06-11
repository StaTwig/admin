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
  const [aoChainOfCustodyData, setaoChainOfCustodyData] = useState([]);
  const [searched,setsearched] = useState(false);
  

  const searchData = async (id,type) => {
    dispatch(turnOn());
    const result = await getJourneyTrack(id);
    dispatch(turnOff());
    if (result.status == 200) {
      var arr = [];
      var finalArr = [];
      if (type=="PO"||type=="po") {
        arr = result.data.data.poDetails;
        arr["poUpdates"] = [{
          status: result.data.data.poDetails.poStatus,
          // status: 'RECEIVED',
          products: result.data.data.poDetails.products,
          updatedOn: moment(result.data.data.poDetails.lastUpdatedOn).format('DD/MM/YYYY hh:mm'),
          isOrder: 1
        }];
        finalArr = [arr];
        setPoChainOfCustodyData(finalArr);
        // setsearched(true);
      }
      else if(type=="SH"||type=='sh')
      {
        // setPoChainOfCustodyData(result.data.data.shipmentChainOfCustody);
        // arr = result.data.data.shipmentChainOfCustody;
        // arr["shipmentUpdates"] = [{
        //   // status: result.data.data.poDetails.poStatus,
        //   status: 'RECEIVED',
        //   products: result.data.data.shipmentChainOfCustody[0].products,
        //   updatedOn: moment(result.data.data.shipmentChainOfCustody.updatedAt).format('DD/MM/YYYY hh:mm'),
        //   isOrder: 1
        // }];
        // finalArr = [arr];
        // setShippmentChainOfCustodyData(finalArr);
        finalArr = result.data.data.inwardShipmentsArray.concat([result.data.data.trackedShipment]).concat(result.data.data.outwardShipmentsArray)
        if(result.data.data.poDetails.length == 0 && result.data.data.inwardShipmentsArray.length!=0)
          setShippmentChainOfCustodyData(finalArr);
        else{
          setShippmentChainOfCustodyData(finalArr[0]);
        }
        // setShippmentChainOfCustodyData(finalArr[0]);
        // setsearched(true);
      } 
      else if(type=="AO" || type=="ao"){
        // let newarr = [];
        // newarr=result.data.data.shipmentChainOfCustody;
        // newarr.splice(1,newarr.length-1);
        // setPoChainOfCustodyData(newarr);
        // arr = result.data.data.shipmentChainOfCustody;
        // arr["shipmentUpdates"]= [{
        //   // status: result.data.data.poDetails.poStatus,
        //   status: 'RECEIVED',
        //   products: result.data.data.shipmentChainOfCustody[0].products,
        //   updatedOn: moment(result.data.data.shipmentChainOfCustody[0].updatedAt).format('DD/MM/YYYY hh:mm'),
        //   isOrder: 1
        // }];
        // arr.splice(1,arr.length-1);
        // finalArr = [arr];
        finalArr = result.data.data.trackedShipment;
        setaoChainOfCustodyData(finalArr);
        // setsearched(true);
      }
      
    }else{
      setPoChainOfCustodyData([]);
      setShippmentChainOfCustodyData([]);
      setaoChainOfCustodyData([]);
    }
  }

  const resetData = () => {
    setPoChainOfCustodyData([]);
    setShippmentChainOfCustodyData([]);
    setaoChainOfCustodyData([]);
  }
console.log(poChainOfCustodyData,"poChainOfCustodyData");
console.log(shippmentChainOfCustodyData,"shippmentChainOfCustodyData");
console.log(aoChainOfCustodyData,"aoChainOfCustodyData");
  return (
    <div className="container-fluid p-0">
      <Header {...props} />
      <div className="d-flex">
        <Sidebar {...props} />
        <div className="content">
          <Track searched={searched} setsearched={setsearched} searchData={searchData} resetData={resetData} poChainOfCustodyData={poChainOfCustodyData} shippmentChainOfCustodyData={shippmentChainOfCustodyData} aoChainOfCustodyData={aoChainOfCustodyData} {...props}/>          
        </div>
      </div>
    </div>
  );
};

export default TrackContainer;

