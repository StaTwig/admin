import React, { useEffect } from "react";
import TrackandTrace from "../../components/trackAndTrace";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";
import { useDispatch, useSelector } from "react-redux";
import { getShipments, resetShipments } from "../../actions/shipmentActions";

const TrackandTraceContainer = (props) => {
  const dispatch = useDispatch();

  const shipments = useSelector((state) => {
    return state.shipments;
  });

  useEffect(() => {
    dispatch(getShipments());
    return () => dispatch(resetShipments());
  }, [dispatch]);
  return (
    <div className='container-fluid p-0'>
      <Header {...props} />
      <div className='d-flex'>
        <Sidebar {...props} />
        <div className='content'>
          <TrackandTrace shipments={shipments} {...props} />
        </div>
      </div>
    </div>
  );
};

export default TrackandTraceContainer;
