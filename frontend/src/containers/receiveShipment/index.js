import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import ReceiveShipment from "../../components/receiveShipment";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";
import { getViewShipment } from "../../actions/shipmentActions";
import { useTranslation } from "react-i18next";

const ReceiveShipmentContainer = (props) => {
  const { t } = useTranslation();
  const [trackData, setTrackData] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const result = await dispatch(getViewShipment(props.match.params.id));
      if (result) {
        setTrackData(result);
      } else {
        setTrackData({});
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
          <ReceiveShipment trackData={trackData} t={t} {...props} />
        </div>
      </div>
    </div>
  );
};

export default ReceiveShipmentContainer;
