import React, { useEffect, useState } from "react";
import ViewShipment from "../../components/viewShipment";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";
import { getViewShipment } from "../../actions/shipmentActions";
import { chainOfCustody, fetchImage } from "../../actions/shipmentActions";
import { useTranslation } from "react-i18next";

const ViewGMRShipmentContainer = (props) => {
  const { t } = useTranslation();
  const [trackData, setTrackData] = useState({});
  const [shippmentChainOfCustodyData, setShippmentChainOfCustodyData] =
    useState([]);
  const [imagesData, setImagesData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const trackResult = await getViewShipment(props.match.params.id);
      if (trackResult.success) {
        setTrackData(trackResult.data);
      } else {
        setTrackData({});
      }
      const shipmentResult = await chainOfCustody(props.match.params.id);
      if (shipmentResult.success) {
        setShippmentChainOfCustodyData(
          shipmentResult.data["shipmentChainOfCustody"]
        );
      } else {
        setShippmentChainOfCustodyData([]);
      }
      const imageResult = await fetchImage(props.match.params.id);
      if (imageResult.success) {
        setImagesData(imageResult.data);
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
