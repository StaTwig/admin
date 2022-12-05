import React, { useEffect, useState } from "react";
import UpdateStatus from "../../components/updateStatus";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";
import { useTranslation } from "react-i18next";
import { getViewShipmentGmr } from "../../actions/shipmentActions";
import { useDispatch } from "react-redux";

const UpdateTrackingStatusContainer = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [shipment, setShipment] = useState({});
  useEffect(() => {
    async function fetchData() {
      const result = await dispatch(getViewShipmentGmr(props.match.params.id));
      if (result) {
        setShipment(result);
      } else {
        setShipment({});
      }
    }
    fetchData();
  }, [dispatch, props.match.params.id]);
  return (
    <div className='container-fluid p-0'>
      <Header {...props} t={t} />
      <div className='d-flex'>
        <Sidebar {...props} t={t} />
        <div className='content'>
          <UpdateStatus shipmentData={shipment} {...props} t={t} />
        </div>
      </div>
    </div>
  );
};

export default UpdateTrackingStatusContainer;
