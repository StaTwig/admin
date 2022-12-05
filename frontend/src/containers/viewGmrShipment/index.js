import React, { useEffect, useState } from "react";
import ViewGMRShipment from "../../components/viewGMRShipment";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";
import { getViewShipmentGmr } from "../../actions/shipmentActions";
import { useDispatch } from "react-redux";
import { fetchImage } from "../../actions/shipmentActions";
import { useTranslation } from "react-i18next";

const ViewShipmentContainer = (props) => {
  const { t, i18n } = useTranslation();
  const [trackData, setTrackData] = useState({});
  const [shippmentChainOfCustodyData, setShippmentChainOfCustodyData] =
    useState([]);
  const [imagesData, setImagesData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      const result = await dispatch(getViewShipmentGmr(props.match.params.id));
      if (result) {
        setTrackData(result);
        setShippmentChainOfCustodyData([result]);
      } else {
        setTrackData({});
      }
    }
    fetchData();
  }, [dispatch, props.match.params.id]);

  useEffect(() => {
    async function fetchData() {
      const result = await fetchImage(props.match.params.id);
      setImagesData(result.data);
    }
    fetchData();
  }, [props.match.params.id]);

  const openInTrackingPage = () => {
    props.history.push(`/track/${props.match.params.id}?status=shipmentView`);
  };

  return (
    <div className='container-fluid p-0'>
      <Header {...props} t={t} />
      <div className='d-flex'>
        <Sidebar {...props} t={t} />
        <div className='content'>
          <ViewGMRShipment
            trackData={trackData}
            shippmentChainOfCustodyData={shippmentChainOfCustodyData}
            imagesData={imagesData}
            openInTrackingPage={openInTrackingPage}
            t={t}
            i18n={i18n}
            {...props}
          />
        </div>
      </div>
    </div>
  );
};
export default ViewShipmentContainer;
