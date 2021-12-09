import React, { useEffect, useState } from "react";
import ViewGMRShipment from "../../components/viewGMRShipment";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";
import {
  fetchIotEnabledApiResponse,
  getViewShipmentGmr
} from "../../actions/shipmentActions";
import { useDispatch } from "react-redux";
import { chainOfCustody, fetchImage } from "../../actions/shipmentActions";
import { useIotShipmentData } from "../../hooks/useIotShipmentData";
import { config } from "../../config";

const ViewShipmentContainer = (props) => {
  const [trackData, setTrackData] = useState({});
  const [shippmentChainOfCustodyData, setShippmentChainOfCustodyData] =
    useState([]);
  const [imagesData, setImagesData] = useState([]);
  const [iotEnabledStatus, setIotEnabledStatus] = useState(false);
  const [imageData, setImageData] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const result = await dispatch(getViewShipmentGmr(props.match.params.id));
      console.log(result, "result")
      if (result) {
        setTrackData(result);
        setShippmentChainOfCustodyData([result]);
      } else {
        setTrackData({});
      }
    }
    fetchData();
  }, [dispatch, props.match.params.id]);

  // useEffect(() => {
  //   async function fetchData() {
  //     const result = await chainOfCustody(props.match.params.id);
  //     if (result && result?.status === 200) {
  //       setShippmentChainOfCustodyData(
  //         result.data.data["shipmentChainOfCustody"]
  //       );
  //     } else {
  //       setShippmentChainOfCustodyData([]);
  //     }
  //   }
  //   fetchData();
  // }, [props.match.params.id]);

  useEffect(() => {
    async function fetchData() {
      const result = await fetchImage(props.match.params.id);
      if (result?.status === 200) {
        setImagesData(result.data.data);
      } else {
        setImageData([]);
      }
    }
    fetchData();
  }, [props.match.params.id]);

  /**
   * Enable temperature graph based on IotEnabledStatus
   */
  useEffect(() => {
    async function fetchIotEnabledStatus() {
      const result = await fetchIotEnabledApiResponse(props.match.params.id);

      if (result.data.iot_enabled) {
        setIotEnabledStatus(true);
      } else {
        setIotEnabledStatus(false);
      }
    }
    fetchIotEnabledStatus();
  }, [props.match.params.id]);

  const latestIotShipmentData = useIotShipmentData(
    config().trackLatestShipmentData.replace(
      ":shipmentId",
      props.match.params.id
    ),
    iotEnabledStatus
  );
  const lastTenIotShipmentData = useIotShipmentData(
    config().trackLastTenIotShipmentData.replace(
      ":shipmentId",
      props.match.params.id
    ),
    iotEnabledStatus
  );

  const openInTrackingPage = () => {
    props.history.push(`/tracing/${props.match.params.id}?status=shipmentView`);
  };

  return (
    <div className='container-fluid p-0'>
      <Header {...props} />
      <div className='d-flex'>
        <Sidebar {...props} />
        <div className='content'>
          <ViewGMRShipment
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
