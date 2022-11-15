import React, { useState, useEffect } from "react";
import { getJourneyTrack } from "../../actions/shipmentActions";
import ChainofCustody from "./chain-of-custody/ChainofCustody";
import CurrentLocation from "./current-location/CurrentLocation";
import Tab from "./tabs/Tab";
import TrackingMap from "./tracking-map/TrackingMap";
import TrackIllustration from "../../assets/images/track.webp";
import "./Tracking.scss";
import { useHistory, useParams } from "react-router";
import Modal from "../../shared/modal";
import FailedPopUp from "../../shared/PopUp/failedPopUp";
import { useTranslation } from "react-i18next";

export default function Tracking() {
  const { id } = useParams();
  const history = useHistory();
  const { t } = useTranslation();

  const closeModalFailedPopUp = () => {
    setOpenFailedPopup(false);
    setErrorInTrack("");
    history.push(`/track`);
    setTrackingID("");
  };

  const [LocationTab, setLocationTab] = useState("CHAIN");
  const [trackingID, setTrackingID] = useState(id);
  const [trackingData, setTrackingData] = useState();
  const [errorInTrack, setErrorInTrack] = useState("");
  const [openFailedPopup, setOpenFailedPopup] = useState(false);

  useEffect(async () => {
    try {
      if (id) {
        let result = await getJourneyTrack(id);
        if (result.status === 200) {
          setErrorInTrack("");
          setTrackingData(result.data.data);
        } else {
          throw new Error(result.message);
        }
      }
    } catch (err) {
      console.log(err.message);
      setErrorInTrack(err.message);
      setOpenFailedPopup(true);
    }
  }, [id]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    try {
      history.push(`/track/${trackingID}`);
      // let result = await getJourneyTrack(trackingID);
      // if(result.status === 200) {
      //   setTrackingData(result.data.data);
      // } else {
      //   throw new Error(result);
      // }
    } catch (err) {
      console.log("Error while fetching track details - ", err.message);
    }
  };

  return (
    <div className="tracking-main-layout">
      <div className="track-grid-container">
        <div className="tracking-content-area">
          <div className="tracking-header">
            <h1
              style={{ paddingBottom: "10px" }}
              className="vl-heading-bdr black f-700 mi-reset"
            >
              {t("trackntrace")}
            </h1>
            <div className="tracking-search-bar">
              <div className="mi-flex-ac">
                <input
                  type="search"
                  placeholder={t("search_track")}
                  className="track-search"
                  onKeyUp={handleKeyPress}
                  onChange={(event) => setTrackingID(event.target.value)}
                  value={trackingID}
                />
                <i
                  className="bx bx-search search-track-icon"
                  onClick={handleSearch}
                ></i>
              </div>
            </div>
          </div>
          <div className="tab-buttons">
            <Tab
              t={t}
              layout="button"
              LocationTab={LocationTab}
              setLocationTab={setLocationTab}
            />
          </div>
          {LocationTab === "CHAIN" && (
            <ChainofCustody t={t} trackingData={trackingData} />
          )}
          {LocationTab === "LOCATION" && (
            <CurrentLocation
              t={t}
              currentLocationData={trackingData?.currentLocationData}
            />
          )}
        </div>
        <div className="tracking-map-area">
          <TrackingMap
            t={t}
            LocationTab={LocationTab}
            trackingData={trackingData}
          />
        </div>
      </div>

      {openFailedPopup && (
        <Modal close={() => closeModalFailedPopUp()} size="modal-sm">
          <FailedPopUp
            message={errorInTrack}
            onHide={closeModalFailedPopUp}
            t={t}
          />
        </Modal>
      )}
    </div>
  );
}
