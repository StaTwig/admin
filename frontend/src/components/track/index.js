import React, { useEffect, useState } from "react";
import Chart from "./temperatureChart";
import Map from "./map";
import CurrentTemperature from "../../assets/icons/thermometer.svg";
import SoChainOfCustody from "./sochainofcustody";
import Package from "../../assets/icons/package.svg";
import back from "../../assets/icons/back.png";
import searchingIcon from "../../assets/icons/searching@2x.png";
import "./style.scss";
import { formatTimeAMPM } from "../../utils/dateHelper";
import zoomOutIcon from "../../assets/icons/smallScreen.png";
import { isAuthenticated } from "../../utils/commonHelper";
import { useTranslation } from "react-i18next";

const Track = (props) => {
  const [value, setValue] = useState("");
  const [msg, setMsg] = useState("No data found");
  const [visible, setVisible] = useState(false);
  const [op, setOp] = useState(props.match.params.id ? 1 : -1);
  const [isSubmitted, setIsSubmitted] = useState(
    props.match.params.id ? true : false
  );
  const { i18n } = useTranslation(); // langDetector.detect()

  const {
    poChainOfCustodyData,
    shippmentChainOfCustodyData,
    searchData,
    resetData,
    lang,
    t,
  } = props;

  const onSeach = async (v = value) => {
    if (v) {
      await searchData(v);
      setMsg("No data found");
    } else setMsg("Required");
    setIsSubmitted(true);
  };

  // useEffect(() => {
  //   setTrackTraceData({ setValue, value, resetData, setIsSubmitted });
  // }, [resetData, setTrackTraceData, value]);
  if (!isAuthenticated("trackAndTrace")) props.history.push(`/profile`);
  useEffect(() => {
    if (props.match.params.id && shippmentChainOfCustodyData.length === 0) {
      setValue(props.match.params.id);
      setOp(1);
      onSeach(props.match.params.id);
    }
  }, [props.match.params.id, shippmentChainOfCustodyData.length]);

  const onSearchChange = (e) => {
    setValue(e.target.value);
    setIsSubmitted(false);
    setOp(1);
    // if (
    //   e.target.value.substring(0, 2) == 'SH' ||
    //   e.target.value.substring(0, 2) == 'sh'
    // ) {
    //   setSearchType('SH');
    //   setOp(1);
    // } else {
    //   setSearchType('PO');
    //   setOp(-1);
    // }
  };

  const onkeydown = (event) => {
    if (event.keyCode === 13) {
      onSeach();
    }
  };

  const searchPlaceHolder = () => {
    if (i18n.language === "es") {
      let placeHolder = t(
        "Enter_Order_ID_or_Serial_No._or_Shipment_No._or_Transit_No."
      );
      placeHolder = placeHolder.split(" ").splice(0, 16).join(" ");
      return `${placeHolder}...`;
    } else {
      return t("Enter_Order_ID_or_Serial_No._or_Shipment_No._or_Transit_No.");
    }
  };

  return (
    <div className="track">
      <div className="row justify-content-between">
        <h1
          style={{ paddingBottom: "10px" }}
          className="vl-heading-bdr black f-700"
        >
          {t("trackntrace")}
        </h1>
      </div>
      {!props.viewIotTemperatureSplineline ? (
        <div className="row" style={{ width: "100%" }}>
          {shippmentChainOfCustodyData.length > 0 && (
            <div className="col-6">
              <div className="row mb-4">
                <div className="col" style={{ minHeight: 400 }}>
                  <Map data={shippmentChainOfCustodyData} t={t} lang={lang} />
                </div>
              </div>
            </div>
          )}
          <div className="search column col-6">
            {shippmentChainOfCustodyData.length === 0 ? (
              <>
                <div className="noOutline" tabIndex="-1" onKeyDown={onkeydown}>
                  <div className="search-form">
                    <input
                      type="text"
                      placeholder={searchPlaceHolder()}
                      onChange={onSearchChange}
                      //className="form-control border border-primary search-field"
                      className="form-control border-blue search-field border-8"
                    />
                    <img
                      src={searchingIcon}
                      onClick={() => onSeach(value)}
                      className="searchIcon cursorP"
                      alt="searching"
                    />
                  </div>
                  {isSubmitted && <span className="redTxt">{t(msg)}</span>}
                </div>
              </>
            ) : (
              <div className="col noOutline">
                <div className="d-flex flex-row-reverse mb-2">
                  {!props.match.params.id && (
                    <button
                      onClick={() => {
                        setValue("");
                        resetData();
                        setIsSubmitted(false);
                      }}
                      className="btn btn-outline-primary cursorP"
                    >
                      <img
                        src={back}
                        height="17"
                        className="mr-2 mb-1"
                        alt="Back"
                      />
                      <span className="fontSize20">{t("back_to_search")}</span>
                    </button>
                  )}
                </div>
                <div className="panel commonpanle  bg-light">
                  <h6 className=" text-primary mb-4">
                    {t("chain_of_custody")}
                  </h6>
                  <div className="row orderTxt">
                    <div className="col-1">
                      <div className="picture recived-bg">
                        <img src={Package} alt="package" />
                      </div>
                    </div>
                    <div className="col ml-1">
                      <div className="">
                        <div className="text-muted ">
                          {!!Object.keys(poChainOfCustodyData).length
                            ? t("order_id")
                            : t("shipment_id")}
                        </div>
                        <div className="font-weight-bold ">
                          {shippmentChainOfCustodyData?.length > 0
                            ? shippmentChainOfCustodyData[0].id
                            : "NA"}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pb-4">
                    {shippmentChainOfCustodyData.map((row, index) => {
                      let newArr = [];
                      // if(row.id == value)
                      newArr = shippmentChainOfCustodyData.filter((rw) =>
                        rw?.taggedShipments?.includes(value)
                      );
                      let cIndex =
                        shippmentChainOfCustodyData
                          .map((el) => el.id)
                          .indexOf(value) + 1;
                      cIndex = index < cIndex ? index : cIndex;

                      return row?.shipmentUpdates
                        ?.filter((s) => s.status === "RECEIVED")
                        .map((r, i) => (
                          <SoChainOfCustody
                            len={row.length}
                            i={i}
                            v={visible}
                            setV={setVisible}
                            level={i + 1}
                            key={i}
                            op={op}
                            setOp={setOp}
                            data={row}
                            update={r}
                            index={i + 3}
                            parentIndex={
                              newArr.length && row.id !== value ? cIndex : index
                            }
                            pindex={
                              shippmentChainOfCustodyData.length - 1 === index
                                ? 1
                                : newArr.length && row.id !== value
                                ? newArr.length
                                : 1
                            }
                            container={2 + i}
                            t={t}
                          />
                        ));
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="row mb-4 mt-4" style={{ width: "100%" }}>
          <div className="temperature-graph-container panel commonpanle col">
            <div className="graph-information-container d-flex justify-content-between">
              <div className="row ml-4 mb-2">
                <div className="arrow-temp mr-2">
                  <img
                    className="arrow-image"
                    src={CurrentTemperature}
                    width="20"
                    height="20"
                    alt="Arrow"
                  />
                </div>

                <div className="d-flex flex-column">
                  <div className="info">Current temperature</div>
                  <div className="temp">
                    {Object.keys(props.latestIotShipmentData).length > 0
                      ? props.latestIotShipmentData.temp["temp"]
                      : 0}
                    °C
                  </div>
                </div>
              </div>

              <div className="current-info-container">
                <div className="current-info">
                  <div className="info">Last Upadated on</div>
                  <div className="info">
                    {Object.keys(props.latestIotShipmentData).length > 0
                      ? formatTimeAMPM(
                          /**props.latestIotShipmentData.temp['UnixTimeStamp']*/ new Date()
                            .toString()
                            .split(" ")[4]
                        )
                      : ""}{" "}
                  </div>
                </div>
                <img
                  src={zoomOutIcon}
                  className="zoom-out-icon"
                  onClick={() =>
                    props.enableTracingZoomOutPageForViewShipment
                      ? props.navigateBackToTracingPage()
                      : props.navigateToOriginalShipmentPage()
                  }
                  alt="Zoom out"
                />
              </div>
            </div>
            <Chart allIotShipmentData={props.allIotShipmentData} />{" "}
          </div>
        </div>
      )}
    </div>
  );
};
export default Track;
