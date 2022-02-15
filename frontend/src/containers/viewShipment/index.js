import React, { useEffect, useState } from "react";
import ViewShipment from "../../components/viewShipment";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";
import { getViewShipment } from "../../actions/shipmentActions";
import { useDispatch } from "react-redux";
import { chainOfCustody, fetchImage } from "../../actions/shipmentActions";
import { useTranslation } from "react-i18next";

const ViewGMRShipmentContainer = (props) => {
  const { t } = useTranslation();
  const [trackData, setTrackData] = useState({});
  const [shippmentChainOfCustodyData, setShippmentChainOfCustodyData] =
    useState([]);
  const [imagesData, setImagesData] = useState([]);
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

  useEffect(() => {
    async function fetchData() {
      const result = await chainOfCustody(props.match.params.id);
      if (result && result?.status === 200) {
        setShippmentChainOfCustodyData(
          result.data.data["shipmentChainOfCustody"]
        );
      } else {
        setShippmentChainOfCustodyData([]);
      }
    }
    fetchData();
  }, [props.match.params.id]);

  useEffect(() => {
    async function fetchData() {
      const result = await fetchImage(props.match.params.id);
      if (result?.status === 200) {
        setImagesData(result.data.data);
      } else {
        setImagesData([]);
      }
    }
    fetchData();
  }, [props.match.params.id]);

  return (
    <div className='container-fluid p-0'>
      <Header {...props} t={t} />
      <div className='d-flex'>
        <Sidebar {...props} t={t} />
        <div className='content'>
          <ViewShipment
            trackData={trackData}
            shippmentChainOfCustodyData={shippmentChainOfCustodyData}
            imagesData={imagesData}
            t={t}
            {...props}
          />
        </div>
      </div>
    </div>
  );
};
export default ViewGMRShipmentContainer;
