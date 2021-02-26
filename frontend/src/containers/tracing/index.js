import React, { useState,useEffect } from "react";
import Tracing from '../../components/tracing';
import Header from '../../shared/header';
import Sidebar from '../../shared/sidebarMenu';
import {useDispatch, useSelector} from "react-redux";
import {trackProduct} from "../../actions/shipmentActions";

const TracingContainer = props => {
  //const dispatch = useDispatch();
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
          <Tracing trackData={trackData}/>
        </div>
      </div>
    </div>
  );
};

export default TracingContainer;

