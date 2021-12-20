import React, { useEffect, useState } from 'react';
import ViewShipment from '../../components/viewShipment';
import Header from '../../shared/header';
import Sidebar from '../../shared/sidebarMenu';
import { trackProduct, getViewShipment, fetchIotEnabledApiResponse } from "../../actions/shipmentActions";
import { useDispatch, useSelector } from 'react-redux';
import { chainOfCustody, updateStatus, fetchImage } from "../../actions/shipmentActions";
import { useIotShipmentData } from '../../hooks/useIotShipmentData';
import { config } from "../../config";

const ViewShipmentContainer = props => {
  const [trackData, setTrackData] = useState({});
  const [shippmentChainOfCustodyData, setShippmentChainOfCustodyData] = useState([]);
  const [imagesData, setImagesData] = useState([]);
  const [iotEnabledStatus, setIotEnabledStatus] = useState(false);
  // const [latestIotShipmentData, setLatestIotShipmentData] = useState({});
  // const [lastTenIotShipmentData, setLastTenIotShipmentData] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const result = await dispatch(getViewShipment(props.match.params.id));
      // console.log('Test');
      // console.log(result);
      if (result) {
        // console.log(result);
        setTrackData(result);
      } else {
        setTrackData({});
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const result = await chainOfCustody(props.match.params.id);
      if (result.status == 200) {
        setShippmentChainOfCustodyData(result.data.data['shipmentChainOfCustody']);
      } else {
        setShippmentChainOfCustodyData([]);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const result = await fetchImage(props.match.params.id);
      if (result.status == 200) {
        //  console.log('Data Image');
        //  console.log(result.data.data);
        setImagesData(result.data.data);
      } else {
        setImageData([]);
      }
    }
    fetchData();
  }, []);

  /**
   * Enable temperature graph based on IotEnabledStatus
   */
  useEffect(() => {
    async function fetchIotEnabledStatus() {
      const result = await fetchIotEnabledApiResponse(props.match.params.id);

      if(result.data.iot_enabled) {
        setIotEnabledStatus(true);
     } else {
        setIotEnabledStatus(false);
      }
    }
    fetchIotEnabledStatus();
  }, []);

  const latestIotShipmentData = useIotShipmentData(config().trackLatestShipmentData.replace(':shipmentId', props.match.params.id), iotEnabledStatus);
  const lastTenIotShipmentData = useIotShipmentData(config().trackLastTenIotShipmentData.replace(':shipmentId', props.match.params.id), iotEnabledStatus);

  const openInTrackingPage = () => {
    props.history.push(`/tracing/${props.match.params.id}?status=shipmentView`);
  };

  return (
    <div className="container-fluid p-0">
      <Header {...props} />
      <div className="d-flex">
        <Sidebar {...props} />
        <div className="content">
          <ViewShipment
            trackData={trackData}
            shippmentChainOfCustodyData={shippmentChainOfCustodyData}
            imagesData={imagesData}
            latestIotShipmentData={latestIotShipmentData}
            lastTenIotShipmentData={lastTenIotShipmentData}
            iotEnabledStatus={iotEnabledStatus}
            openInTrackingPage={openInTrackingPage}
            {...props}
          />
        </div>
      </div>
    </div>
  );
};
export default ViewShipmentContainer;
