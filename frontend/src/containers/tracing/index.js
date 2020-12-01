import React, { useState,useEffect } from "react";
import Tracing from '../../components/tracing';
import Header from '../../shared/header';
import Sidebar from '../../shared/sidebarMenu';
import {useDispatch, useSelector} from "react-redux";
import {trackProduct,poDetailsByShipmentId,productDetailsByShipmentId} from "../../actions/shipmentActions";

const TracingContainer = props => {
  //const dispatch = useDispatch();
  const[trackData,setTrackData]=useState({});
  const[productDetails,setProductDetails]=useState({});
  const[poDetails,setPoDetails]=useState({});

   useEffect(() => {
    async function fetchData() {
      const result = await trackProduct(props.match.params.id);
       if (result.status==200)
       {
       setTrackData(result.data);
       }else{
         setTrackData({});
       }
       const productResult = await productDetailsByShipmentId(props.match.params.id);
       if (productResult.status==200)
       {
       setProductDetails(productResult.data);
       }else{
         setProductDetails({});
       }
       const poResult = await poDetailsByShipmentId(props.match.params.id);
       if (poResult.status==200)
       {
        setPoDetails(poResult.data);
       }else{
        setPoDetails({});
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
          <Tracing shipments={trackData} productDetails = {productDetails} poDetails = {poDetails} />
        </div>
      </div>
    </div>
  );
};

export default TracingContainer;

