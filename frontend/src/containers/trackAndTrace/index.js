import React, { useEffect } from "react";
import TrackandTrace from "../../components/trackAndTrace";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";
import { useDispatch, useSelector } from "react-redux";
import { getShipments, resetShipments } from "../../actions/shipmentActions";
import { useTranslation } from 'react-i18next';

const TrackandTraceContainer = (props) => {
const { t, i18n } = useTranslation();
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
      <Header {...props} t={t}/>
      <div className='d-flex'>
        <Sidebar {...props} t={t}/>
        <div className='content'>
          <TrackandTrace shipments={shipments} {...props} t={t}/>
        </div>
      </div>
    </div>
  );
};

export default TrackandTraceContainer;
