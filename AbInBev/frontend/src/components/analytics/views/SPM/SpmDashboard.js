import React, { useEffect, useState } from "react";
import profile from "../../../../assets/user.png";
import {
  getNewConfig,
  getSupplierPerformanceByOrgType,
  setNewConfig,
} from "../../../../actions/analyticsAction";
import { useDispatch } from "react-redux";
import "./SpmDashBoard.scss";
import cancelIcon from "../../../../assets/icons/cross.png";
import SuccessPopUp from "../../../../shared/PopUp/successPopUp";

const SpmDashboard = (props) => {
  const [selectedRatingIndex, setSelectedRatingIndex] = useState(null);
  const [temp, setTemp] = useState(null);
  const [supplierPerformances, setSupplierPerformances] = useState([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [dates, setDates] = useState([]);
  const [persentages, setPercentages] = useState([]);
  const [openEditTargets, setOpenEditTargets] = useState(false);
  const [selectedType, setSelectedType] = useState("All");
  const [openSelectSuplier, setopenSelectSuplier] = useState(false);
  const [state, setState] = useState("");
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [configDistrict, setConfigDistrict] = useState("");
  const [openSetRating, setOpenSetRating] = useState(false);
  //remove
  const [forNextBtn, setForNextBtn] = useState(false);
  let [config, setConfig] = useState({
    returnRate: {
      min: { operator: null, value: null, rating: null },
      max: { operator: null, value: null, rating: null },
      target: null,
    },
    leadTime: {
      min: { operator: null, value: null, rating: null },
      max: { operator: null, value: null, rating: null },
      target: null,
    },
    breakageBottle: {
      min: { operator: null, value: null, rating: null },
      max: { operator: null, value: null, rating: null },
      target: null,
    },
    dirtyBottle: {
      min: { operator: null, value: null, rating: null },
      max: { operator: null, value: null, rating: null },
      target: null,
    },
    warehouseCapacity: {
      min: { operator: null, value: null, rating: null },
      max: { operator: null, value: null, rating: null },
      target: null,
    },
    bottleCapacity: {
      min: { operator: null, value: null, rating: null },
      max: { operator: null, value: null, rating: null },
      target: null,
    },
  });
  // const []
  const getWeightage = (type, value) => {
    let res = 0;
    if (!config[`${type}`]) return 0;
    if (value > config[`${type}`]?.max.value) res = 5;
    else if (
      value < config[`${type}`]?.max.value &&
      value > config[`${type}`]?.min.value
    )
      res = 2;
    else res = 0;

    return res;
  };
  useEffect(() => {
    var pushdates = [];
    for (var i = 1; i <= 30; i++) {
      pushdates.push(i);
      // pushdates.push(i + " days");
    }
    setDates(pushdates);

    var numbers = [];
    for (var i = 0; i < 20; i++) {
      numbers.push(i * 5);
      // numbers.push(i * 5 + "%");

    }
    setPercentages(numbers);
    // console.log(dates)
  }, []);

const saveConfig = async () => {
  let temp = config;
  temp[`district`] = configDistrict;
  temp[`state`] = state;
  temp[`vendorType`] = selectedType;
  let res = await setNewConfig(temp);
  if(res.status === 200){
    setOpenSetRating(false);
    setOpenEditTargets(false);
    setopenSelectSuplier(false);
  }
}
  const dispatch = useDispatch();
  useEffect(() => {
    (async () =>{
      let configs = await dispatch(getNewConfig({district: configDistrict, vendorType: selectedType}));
      // console.log(configs.data[0]);
      // let tmp = config;
      // Object.assign(tmp, configs.data[0]);
      setConfig(configs.data[0]);
    })();

    (async () => {
      const result = await dispatch(getSupplierPerformanceByOrgType());
      let _spm = result.data;
      if (_spm.length) {
        setSupplierPerformances(_spm);
      } else {
        setSupplierPerformances([]);
      }

      // if (configDistrict !== "") {
      //   let configs = await dispatch(getNewConfig());
      //   console.log(configs.data[0]);
      //   setConfig(configs.data[0]);
      // }
    })();
  }, [configDistrict, selectedType]);

  const typeSelected = (type) => {
    setSelectedType(type);
  };

  const onStateChange = async (event) => {
    const selectedState = event.target.value;
    setState(selectedState);
    const result = await props.getDistricts(selectedState);
    setDistricts(result.data);
  };

  const onDistrictChange = (event) => {
    const selectedDistrict = event.target.value;
    setDistrict(selectedDistrict);
  };

  return (
    <div>
      {showSuccessPopup && <SuccessPopUp message={"config set succesfully"}/>}
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3">
        <h1 className="h2">Dashboard - SPM</h1>
      </div>
      <div className="viewTargets">
        <button
          className="targetsBtn"
          onClick={() => {
            setopenSelectSuplier(true);
            setForNextBtn(true);
          }}
        >
          Set Targets
        </button>
      </div>
      <div className="tableDetals">
        <table
          className="table text-align-left"
          style={{ background: "unset" }}
        >
          <thead
            style={{
              fontFamily: "open sans",
              fontWeight: "bold",
              borderBottom: "unset",
            }}
          >
            <tr>
              <th scope="col">Rank</th>
              <th scope="col">Supplier</th>
              <th scope="col">Location</th>
              <th scope="col" style={{ width: "17%" }}>
                Overall Rating
              </th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody style={{ background: "#ffffff" }}>
            {supplierPerformances?.map((perf, index) => (
              <>
                <tr
                  key={index}
                  className={`${
                    selectedRatingIndex === index
                      ? "selectedRow noBottomRadius"
                      : ""
                  }`}
                  style={{ fontWeight: "bold", fontFamily: "open sans" }}
                >
                  <td scope="row" style={{ verticalAlign: "unset" }}>
                    {index + 1}
                  </td>
                  <td>
                    <div
                      className="tableProfileIconCard justify-content-start"
                      style={{ lineHeight: "1.5" }}
                    >
                      <div className="profileIcon">
                        <img src={profile} alt="" />
                      </div>
                      <div className="profileName">
                        <span className="profileTitle">{perf.name}</span>
                        <label
                          className={`
                            ${perf.type === "S1" ? "boldGreen" : ""}
                            ${perf.type === "S2" ? "boldPurple" : ""}
                            ${perf.type === "S3" ? "boldblue" : ""}
                          `}
                        >
                          {perf.type}
                        </label>
                        {selectedRatingIndex === index && (
                          <div className="spmDetailsUserCard justify-content-start">
                            <div className="profileName">
                              <label>
                                <b>Vendor ID:</b> {perf.id}
                              </label>
                              <label>
                                <b>Mobile No:</b> {perf.phoneNumber}
                              </label>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td style={{ verticalAlign: "unset" }}>
                    {perf.postalAddress}
                  </td>
                  {/* <td>{perf.returnRate ? perf.returnRate : 0}</td> */}
                  <td style={{ verticalAlign: "unset" }}>{0}</td>
                  <td style={{ position: "relative", verticalAlign: "unset" }}>
                    {/* {selectedRatingIndex !== index ? ( */}
                    <div
                      className="round round-lg"
                      onClick={() => {
                        `${
                          selectedRatingIndex !== index
                            ? setSelectedRatingIndex(index)
                            : setSelectedRatingIndex(null)
                        }`;
                      }}
                    >
                      <span
                        className={`${
                          selectedRatingIndex !== index
                            ? `fa fa-angle-down marron`
                            : `fa fa-angle-up marron`
                        }`}
                      ></span>
                    </div>
                    {selectedRatingIndex === index && (
                      <div
                        className="editTargetsContainer"
                        style={{ position: "absolute" }}
                      >
                        <button
                          className="editTarBtn"
                          onClick={() => {
                            setOpenEditTargets(true);
                          }}
                        >
                          Edit Targets
                        </button>
                      </div>
                    )}

                    {/* ) : (
                      ''
                    )} */}
                  </td>
                </tr>
                {selectedRatingIndex === index ? (
                  <tr>
                    <td colSpan="5" className="selectedSupplier">
                      <div
                        style={{
                          backgroundColor: "#ffffff",
                          borderRadius: "15px",
                        }}
                      >
                        <table
                          className="table text-align-left noTopRadius"
                          style={{ background: "unset" }}
                        >
                          <thead>
                            <tr
                              style={{
                                fontFamily: "open sans",
                                fontWeight: "bold",
                                color: "#707070",
                              }}
                            >
                              <th scope="col">Criteria</th>
                              <th scope="col">Details</th>
                              <th scope="col">Weightage</th>
                              <th scope="col">Target</th>
                            </tr>
                          </thead>
                          <tbody
                            style={{
                              fontWeight: "bold",
                              fontFamily: "open sans",
                            }}
                          >
                            <tr>
                              <td scope="row" style={{ color: "#A20134" }}>
                                Return Rate
                              </td>
                              <td>{perf.returnRate ? perf.returnRate : 0}</td>
                              <td>
                                {getWeightage(
                                  perf.returnRate ? perf.returnRate : 0,
                                  "returnRate"
                                )}
                              </td>
                              <td>{config?.returnRate?.target}</td>
                            </tr>
                            <tr>
                              <td scope="row" style={{ color: "#A20134" }}>
                                Lead Time
                              </td>
                              <td>
                                {perf.leadTime?.length
                                  ? perf.leadTime[0]?.avgLeadTime > 60
                                    ? Math.round(
                                        perf.leadTime[0]?.avgLeadTime / 60
                                      ) +
                                      " H " +
                                      Math.round(
                                        perf.leadTime[0]?.avgLeadTime % 60
                                      ) +
                                      " M"
                                    : Math.round(
                                        perf.leadTime[0]?.avgLeadTime
                                      ) + " M"
                                  : 0}
                              </td>
                              <td></td>
                              <td>{config?.leadTime?.target}</td>
                            </tr>
                            <tr>
                              <td scope="row" style={{ color: "#A20134" }}>
                                Storage Capacity
                                <br />
                                <span className="subTitle">Sqft</span>
                              </td>
                              <td>
                                {perf.storageCapacity.bottleCapacity}
                                <br />
                                <span className="subTitle">
                                  {perf.storageCapacity.sqft}
                                </span>
                              </td>
                              <td></td>
                              <td>{config?.storageCapacity?.target || 0}</td>
                            </tr>
                            <tr>
                              <td scope="row" style={{ color: "#A20134" }}>
                                Dirty Bottles
                              </td>
                              <td>{perf.dirtyBottles}%</td>
                              <td></td>
                              <td>{config?.dirtyBottle?.target}</td>
                            </tr>
                            <tr>
                              <td scope="row" style={{ color: "#A20134" }}>
                                Breakage
                              </td>
                              <td>{perf.breakage}%</td>
                              <td></td>
                              <td>{config?.breakageBottle?.target}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                ) : (
                  ""
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
      {openEditTargets && (
        <div className="editTargetsContainer1">
          <div className="editTitle">
            <span className="edittargetName">Edit Targets</span>
          </div>
          <div>
            <table
              className="table text-align-left noTopRadius"
              style={{ background: "unset" }}
            >
              <thead>
                <tr
                  style={{
                    fontFamily: "open sans",
                    fontWeight: "bold",
                    color: "#707070",
                  }}
                >
                  <th scope="col">Criteria</th>
                  <th scope="col">Set Target</th>
                  <th scope="col">Weightage</th>
                </tr>
              </thead>
              <tbody style={{ fontWeight: "bold", fontFamily: "open sans" }}>
                <tr>
                  <td scope="row" style={{ color: "#A20134" }}>
                    Return Rate
                  </td>
                  <td>
                    <select
                      className="filterSelect-1 mt-2"
                      value={config.returnRate.target}
                      onChange={(e) => {
                        let temp = config;
                        temp.returnRate.target = e.target.value;
                        setConfig(temp);
                        setTemp(e.target.value);
                      }}
                    >
                      <option>Select</option>
                      {persentages.map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>20%</td>
                </tr>
                <tr>
                  <td scope="row" style={{ color: "#A20134" }}>
                    Lead Time
                  </td>
                  <td>
                    <select
                      className="filterSelect-1 mt-2"
                      value={config.leadTime.target}
                      name="leadtime"
                      onChange={(e) => {
                        let temp = config;
                        temp.leadTime.target = e.target.value;
                        setConfig(temp);
                        setTemp(e.target.value);
                      }}
                    >
                      <option>Select</option>
                      {dates.map((date, index) => (
                        <option key={index} value={date}>
                          {date}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>20%</td>
                </tr>
                <tr>
                  <td scope="row" style={{ color: "#A20134" }}>
                    Breakage Bottle %
                  </td>
                  <td>
                    <select
                      className="filterSelect-1 mt-2"
                      value={config.breakageBottle.target}
                      style={{ boxShadow: "0px 4px 8px #54265e26" }}
                      onChange={function (e) {
                        let temp = config;
                        temp.breakageBottle.target = e.target.value;
                        console.log(temp);
                        setConfig(temp);
                        setTemp(e.target.value);
                        // debugger
                        console.log(config)
                      }}
                    >
                      <option value="">Select</option>
                      {persentages.map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>20%</td>
                </tr>
                <tr>
                  <td scope="row" style={{ color: "#A20134" }}>
                    Dirty Bottle
                  </td>
                  <td>
                    <select
                      className="filterSelect-1 mt-2"
                      value={config.dirtyBottle.target}
                      onChange={(e) => {
                        let temp = config;
                        temp.dirtyBottle.target = e.target.value;
                        console.log(temp);
                        setConfig(temp);
                        setTemp(e.target.value);
                      }}
                    >
                      <option value="">Select</option>
                      {persentages.map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>20%</td>
                </tr>
                <tr>
                  <td scope="row" style={{ color: "#000000" }}>
                    WAREHOUSE DETAILS
                  </td>
                  <td></td>
                  <td>20%</td>
                </tr>
                <tr>
                  <td scope="row" style={{ color: "#A20134" }}>
                    Storage Capacity
                  </td>
                  <td>
                    <input
                      className="filterSelect-1"
                      value={config.warehouseCapacity.target}
                      onChange={(e) => {
                        let temp = config;
                        temp.warehouseCapacity.target = e.target.value;
                        setConfig(temp);
                        setTemp(e.target.value);
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td scope="row" style={{ color: "#A20134" }}>
                    Bottle Capacity
                  </td>
                  <td>
                    <input
                      className="filterSelect-1"
                      value={config.bottleCapacity.target}
                      onChange={(e) => {
                        let temp = config;
                        temp.bottleCapacity.target = e.target.value;
                        setConfig(temp);
                        setTemp(e.target.value);
                      }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="buttons">
            <button
              className="backBtn"
              onClick={() => {
                setOpenEditTargets(false);
              }}
            >
              Close
            </button>
            <button
              className="saveBtn"
              onClick={() => {
                setOpenSetRating(true);
              }}
            >{`${forNextBtn ? `Next` : `Save`}`}</button>
          </div>
        </div>
      )}
      {openSelectSuplier && (
        <div>
          <div className="setTargetsContainer">
            <div className="editSelectSuplier">
              <span className="edittargetName">Select Supplier</span>
              <img
                src={cancelIcon}
                style={{ width: "2rem" }}
                onClick={() => setopenSelectSuplier(false)}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <label className="filterSubHeading mt-3">Select State</label>
                <select
                  className="filterSelect-1 mt-2"
                  value={state}
                  style={{ width: "100%" }}
                  onChange={onStateChange}
                >
                  <option value="">Select State</option>
                  {props.states?.map((state, index) => (
                    <option key={index} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="filterSubHeading mt-3">Select District</label>
                <select
                  className="filterSelect-1 mt-2"
                  value={configDistrict}
                  style={{ width: "100%" }}
                  onChange={(e) => setConfigDistrict(e.target.value)}
                >
                  <option>Select District</option>
                  {districts?.map((district, index) => (
                    <option key={index}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>
              <div className="filterSection-1">
                <label className="filterSubHeading-1 mt-3">vendor Type</label>
                <div className="btn-group vonderType filterButton-1 mt-2 mb-4">
                  {["All", "S1", "S2", "S3"].map((type, index) => (
                    <span
                      onClick={() => {
                        typeSelected(type);
                      }}
                      key={index}
                      className={`btn p-2  ${
                        selectedType == type ? `active` : ``
                      }`}
                      htmlFor={type}
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {true && (
              <div className="dealer_container">
                {supplierPerformances?.map((supplier, index) => (
                  <div style={{ display: "flex" }}>
                    <div style={{ width: "50%" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "25px",
                        }}
                      >
                        <span className="index">{index}</span>
                        <div className="supplierName">
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <img
                              style={{ width: "25px", marginRight: "25px" }}
                              src={profile}
                              alt=""
                            />
                            <span className="suplier">{supplier.name}</span>
                          </div>

                          <span className="suppplierType">
                            {supplier.type + " Vendor"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div style={{ width: "50%" }}>
                      <span className="postalAddress">
                        {supplier.postalAddress}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="buttons">
              <button
                className="backBtn"
                onClick={() => {
                  setopenSelectSuplier(false);
                }}
              >
                Close
              </button>
              <button
                className="saveBtn"
                onClick={() => {
                  setopenSelectSuplier(false);
                  setOpenEditTargets(true);
                }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
      {openSetRating && (
        <div>
          <div className="editTargetsContainer1">
            <div className="editTitle">
              <span className="edittargetName">Set Rating</span>
            </div>
            <div>
              <table
                className="table text-align-left noTopRadius"
                style={{ background: "unset" }}
              >
                <thead>
                  <tr
                    style={{
                      fontFamily: "open sans",
                      fontWeight: "bold",
                      color: "#707070",
                    }}
                  >
                    <th scope="col">Rating</th>
                    <th scope="col">Targets</th>
                    <th scope="col">Minimim</th>
                    <th scope="col">Maximun</th>
                  </tr>
                </thead>
                <tbody style={{ fontWeight: "bold", fontFamily: "open sans" }}>
                  <tr>
                    <td scope="row"></td>
                    <td></td>
                    <td className="subTitle">
                      <span
                        style={{ fontFamily: "unset", fontWeight: "unset" }}
                      >
                        Set Range
                      </span>
                      <span
                        style={{ fontFamily: "unset", fontWeight: "unset" }}
                      >
                        Set Value
                      </span>
                      <span
                        style={{ fontFamily: "unset", fontWeight: "unset" }}
                      >
                        Rating
                      </span>
                    </td>
                    <td style={{ fontWeight: "unset", fontFamily: "unset" }}>
                      <span
                        style={{ fontFamily: "unset", fontWeight: "unset" }}
                      >
                        Set Range
                      </span>
                      <span
                        style={{
                          marginLeft: "30px",
                          fontFamily: "unset",
                          fontWeight: "unset",
                        }}
                      >
                        Set Value
                      </span>
                      <span
                        style={{
                          marginLeft: "30px",
                          fontFamily: "unset",
                          fontWeight: "unset",
                        }}
                      >
                        Rating
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td scope="row" style={{ color: "#A20134" }}>
                      Return Rate
                    </td>
                    <td>
                      <select
                        value={config.returnRate.target}
                        className="filterSelect-1 mt-2"
                      >
                        <option value="">Select</option>
                        {persentages.map((item, index) => (
                          <option
                            key={index}
                            value={item}
                            onChange={(e) => {
                              let temp = config;
                              temp.returnRate.target = e.target.value;
                              setConfig(temp);
                        setTemp(e.target.value);
                            }}
                          >
                            {item}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="middleTextField" style={{ display: "flex" }}>
                      <select
                        className="filterSelect-1 mt-2"
                        style={{ width: "30%" }}
                        value={config.returnRate.min.operator}
                        onChange={(e) => {
                          let temp = config;
                          temp.returnRate.min.operator = e.target.value;
                          setConfig(temp);
                        setTemp(e.target.value);
                        }}
                      >
                        <option>{"<"}</option>
                        {["<", ">", "<=", ">=", "="].map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                      <select
                        className="filterSelect-1 mt-2"
                        value={config.returnRate.min.value}
                        style={{
                          width: "30%",
                          position: "relative",
                          left: "15px",
                        }}
                        onChange={(e) => {
                          let temp = config;
                          temp.returnRate.min.value = e.target.value;
                          setConfig(temp);
                        setTemp(e.target.value);
                        }}
                      >
                        <option>{"<"}</option>
                        {persentages.map((item, index) => (
                          <option value={item} key={index}>
                            {item}
                          </option>
                        ))}
                      </select>
                      <select
                        className="filterSelect-1 mt-2"
                        value={config.returnRate.min.rating}
                        style={{
                          width: "30%",
                          position: "relative",
                          left: "28px",
                        }}
                        onChange={(e) => {
                          let temp = config;
                          temp.returnRate.min.rating = e.target.value;
                          setConfig(temp);
                        setTemp(e.target.value);
                        }}
                      >
                        <option>{"<"}</option>
                        {["1", "2", "3", "4", "5"].map((item, index) => (
                          <option value={item} key={index}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <select
                        className="filterSelect-2 mt-2"
                        value={config.returnRate.max.operator}
                        onChange={(e) => {
                          let temp = config;
                          temp.returnRate.max.operator = e.target.value;
                          setConfig(temp);
                        setTemp(e.target.value);
                        }}
                      >
                        <option>{"<"}</option>
                        {["<", ">", "<=", ">=", "="].map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                      <select
                        value={config.returnRate.max.value}
                        className="filterSelect-2 mt-2"
                        style={{ marginLeft: "30px" }}
                        onChange={(e) => {
                          let temp = config;
                          temp.returnRate.max.value = e.target.value;
                          setConfig(temp);
                        setTemp(e.target.value);
                        }}
                      >
                        <option>{"<"}</option>
                        {persentages.map((item, index) => (
                          <option value={item} key={index}>
                            {item}
                          </option>
                        ))}
                      </select>
                      <select
                        value={config.returnRate.max.rating}
                        className="filterSelect-2 mt-2"
                        style={{ marginLeft: "20px" }}
                        onChange={(e) => {
                          let temp = config;
                          temp.returnRate.max.rating = e.target.value;
                          setConfig(temp);
                        setTemp(e.target.value);
                        }}
                      >
                        <option>{"<"}</option>
                        {["1", "2", "3", "4", "5"].map((item, index) => (
                          <option value={item} key={index}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td scope="row" style={{ color: "#A20134" }}>
                      Lead Time
                    </td>
                    <td>
                      <select
                        className="filterSelect-1 mt-2"
                        value={config.leadTime.target}
                        onChange={(e) => {
                          let temp = config;
                          temp.leadTime.target = e.target.value;
                          setConfig(temp);
                        setTemp(e.target.value);
                        }}
                      >
                        <option value="">Select</option>
                        {dates.map((date, index) => (
                          <option key={index} value={date}>
                            {date}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="middleTextField" style={{ display: "flex" }}>
                      <select
                        className="filterSelect-2 mt-2"
                        value={config.leadTime.min.operator}
                        onChange={(e) => {
                          let temp = config;
                          temp.leadTime.min.operator = e.target.value;
                          setConfig(temp);
                        setTemp(e.target.value);
                        }}
                      >
                        <option>{"<"}</option>
                        {["<", ">", "<=", ">=", "="].map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                      <select
                        className="filterSelect-2 mt-2"
                        style={{ marginLeft: "30px" }}
                        value={config.leadTime.min.value}
                        onChange={(e) => {
                          let temp = config;
                          temp.leadTime.min.value = e.target.value;
                          setConfig(temp);
                        setTemp(e.target.value);
                        }}
                      >
                        <option>{"<"}</option>
                        {persentages.map((item, index) => (
                          <option value={item} key={index}>
                            {item}
                          </option>
                        ))}
                      </select>
                      <select
                        className="filterSelect-1 mt-2"
                        style={{
                          width: "30%",
                          position: "relative",
                          left: "28px",
                        }}
                        value={config.leadTime.min.rating}
                        onChange={(e) => {
                          let temp = config;
                          temp.leadTime.min.rating = e.target.value;
                          setConfig(temp);
                        setTemp(e.target.value);
                        }}
                      >
                        <option>{"<"}</option>
                        {["1", "2", "3", "4", "5"].map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <select
                        className="filterSelect-2 mt-2"
                        value={config.leadTime.max.operator}
                        onChange={(e) => {
                          let temp = config;
                          temp.leadTime.max.operator = e.target.value;
                          setConfig(temp);
                        setTemp(e.target.value);
                        }}
                      >
                        <option>{"<"}</option>
                        {["<", ">", "<=", ">=", "="].map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                      <select
                        className="filterSelect-2 mt-2"
                        style={{ marginLeft: "30px" }}
                        value={config.leadTime.max.value}
                        onChange={(e) => {
                          let temp = config;
                          temp.leadTime.max.value = e.target.value;
                          setConfig(temp);
                        setTemp(e.target.value);
                        }}
                      >
                        <option>{"<"}</option>
                        {persentages.map((item, index) => (
                          <option value={item} key={index}>
                            {item}
                          </option>
                        ))}
                      </select>
                      <select
                        className="filterSelect-2 mt-2"
                        style={{ marginLeft: "20px" }}
                        value={config.leadTime.max.rating}
                        onChange={(e) => {
                          let temp = config;
                          temp.leadTime.max.rating = e.target.value;
                          setConfig(temp);
                        setTemp(e.target.value);
                        }}
                      >
                        <option>{"<"}</option>
                        {["1", "2", "3", "4", "5"].map((item, index) => (
                          <option value={item} key={index}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td scope="row" style={{ color: "#A20134" }}>
                      Breakage Bottle %
                    </td>
                    <td>
                      <select
                        className="filterSelect-1 mt-2"
                        value={config.breakageBottle.target}
                        onChange={(e) => {
                          let temp = config;
                          temp.breakageBottle.target = e.target.value;
                          setConfig(temp);
                        setTemp(e.target.value);
                        }}
                        style={{ boxShadow: "0px 4px 8px #54265e26" }}
                      >
                        <option value={null}>Select</option>
                        {persentages.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="middleTextField" style={{ display: "flex" }}>
                      <select
                        className="filterSelect-2 mt-2"
                        value={config.breakageBottle.min.operator}
                        onChange={(e) => {
                          let temp = config;
                          temp.breakageBottle.min.operator = e.target.value;
                          setConfig(temp);
                        setTemp(e.target.value);
                        }}
                      >
                        <option>{"<"}</option>
                        {["<", ">", "<=", ">=", "="].map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                      <select
                        className="filterSelect-2 mt-2"
                        style={{ marginLeft: "30px" }}
                        value={config.breakageBottle.min.value}
                        onChange={(e) => {
                          let temp = config;
                          temp.breakageBottle.min.value = e.target.value;
                          setConfig(temp);
                        setTemp(e.target.value);
                        }}
                      >
                        <option>{"<"}</option>
                        {persentages.map((item, index) => (
                          <option value={item} key={index}>
                            {item}
                          </option>
                        ))}
                      </select>
                      <select
                        className="filterSelect-1 mt-2"
                        value={config.breakageBottle.min.rating}
                        onChange={(e) => {
                          let temp = config;
                          temp.breakageBottle.min.rating = e.target.value;
                          setConfig(temp);
                        setTemp(e.target.value);
                        }}
                        style={{
                          width: "30%",
                          position: "relative",
                          left: "28px",
                        }}
                      >
                        <option>{"<"}</option>
                        {[1, 2, 3, 4, 5].map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <select
                        className="filterSelect-2 mt-2"
                        value={config.breakageBottle.max.operator}
                        onChange={(e) => {
                          let temp = config;
                          temp.breakageBottle.max.operator = e.target.value;
                          setConfig(temp);
                        setTemp(e.target.value);
                        }}
                      >
                        <option>{"<"}</option>
                        {["<", ">", "<=", ">=", "="].map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                      <select
                        className="filterSelect-2 mt-2"
                        style={{ marginLeft: "30px" }}
                        value={config.breakageBottle.max.value}
                        onChange={(e) => {
                          let temp = config;
                          temp.breakageBottle.max.value = e.target.value;
                          setConfig(temp);
                        setTemp(e.target.value);
                        }}
                      >
                        <option>{"<"}</option>
                        {persentages.map((item, index) => (
                          <option value={item} key={index}>
                            {item}
                          </option>
                        ))}
                      </select>
                      <select
                        className="filterSelect-2 mt-2"
                        style={{ marginLeft: "20px" }}
                        value={config.breakageBottle.max.rating}
                        onChange={(e) => {
                          let temp = config;
                          temp.breakageBottle.max.rating = e.target.value;
                          setConfig(temp);
                        setTemp(e.target.value);
                        }}
                      >
                        <option>{"<"}</option>
                        {["1", "2", "3", "4", "5"].map((item, index) => (
                          <option value={item} key={index}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td scope="row" style={{ color: "#A20134" }}>
                      Dirty Bottle
                    </td>
                    <td>
                      <select
                        className="filterSelect-1 mt-2"
                        value={config.dirtyBottle.target}
                        onClick={(e) => {
                          let temp = config;
                          temp.dirtyBottle.target = e.target.value;
                          setConfig(temp);
                        setTemp(e.target.value);
                        }}
                      >
                        <option value="">Select</option>
                        {persentages.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="middleTextField" style={{ display: "flex" }}>
                      <select
                        className="filterSelect-2 mt-2"
                        value={config.dirtyBottle.min.operator}
                        onChange={(e) => {
                          let temp = config;
                          temp.dirtyBottle.min.operator = e.target.value;
                          setConfig(temp);
                        setTemp(e.target.value);
                        }}
                      >
                        <option>{"<"}</option>
                        {["<", ">", "<=", ">=", "="].map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                      <select
                        className="filterSelect-2 mt-2"
                        style={{ marginLeft: "30px" }}
                        value={config.dirtyBottle.min.value}
                        onChange={(e) => {
                          let temp = config;
                          temp.dirtyBottle.min.value = e.target.value;
                          setConfig(temp);
                        setTemp(e.target.value);
                        }}
                      >
                        <option>{"<"}</option>
                        {persentages.map((item, index) => (
                          <option value={item} key={index}>
                            {item}
                          </option>
                        ))}
                      </select>
                      <select
                        className="filterSelect-1 mt-2"
                        style={{
                          width: "30%",
                          position: "relative",
                          left: "28px",
                        }}
                        value={config.dirtyBottle.min.rating}
                        onChange={(e) => {
                          let temp = config;
                          temp.dirtyBottle.min.rating = e.target.value;
                          setConfig(temp);
                        setTemp(e.target.value);
                        }}
                      >
                        <option>{"<"}</option>
                        {[1, 2, 3, 4, 5].map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </td>
                    .{" "}
                    <td>
                      <select
                        className="filterSelect-2 mt-2"
                        value={config.dirtyBottle.max.operator}
                        onChange={(e) => {
                          let temp = config;
                          temp.dirtyBottle.max.operator = e.target.value;
                          setConfig(temp);
                        setTemp(e.target.value);
                        }}
                      >
                        <option>{"<"}</option>
                        {["<", ">", "<=", ">=", "="].map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                      <select
                        className="filterSelect-2 mt-2"
                        style={{ marginLeft: "30px" }}
                        value={config.dirtyBottle.max.value}
                        onChange={(e) => {
                          let temp = config;
                          temp.dirtyBottle.max.value = e.target.value;
                          setConfig(temp);
                        setTemp(e.target.value);
                        }}
                      >
                        <option>{"<"}</option>
                        {persentages.map((item, index) => (
                          <option value={item} key={index}>
                            {item}
                          </option>
                        ))}
                      </select>
                      <select
                        className="filterSelect-2 mt-2"
                        style={{ marginLeft: "20px" }}
                        value={config.dirtyBottle.max.rating}
                        onChange={(e) => {
                          let temp = config;
                          temp.dirtyBottle.max.rating = e.target.value;
                          setConfig(temp);
                        setTemp(e.target.value);
                        }}
                      >
                        <option>{"<"}</option>
                        {["1", "2", "3", "4", "5"].map((item, index) => (
                          <option value={item} key={index}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td scope="row" style={{ color: "#000000" }}>
                      WAREHOUSE DETAILS
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td scope="row" style={{ color: "#A20134" }}>
                      Storage Capacity
                    </td>
                    <td>
                      <input
                        className="filterSelect-1"
                        type="number"
                        value={config.warehouseCapacity.target}
                        onChange={(e) => {
                          let temp = config;
                          temp.warehouseCapacity.target = e.target.value;
                          setConfig(temp);
                        setTemp(e.target.value);
                        }}
                      />
                    </td>
                    <td className="middleTextField" style={{ display: "flex" }}>
                      <select
                        className="filterSelect-2 mt-2"
                        value={config.warehouseCapacity.min.operator}
                        onChange={(e) => {
                          let temp = config;
                          temp.warehouseCapacity.min.operator = e.target.value;
                          setConfig(temp);
                        setTemp(e.target.value);
                        }}
                      >
                        <option>{"<"}</option>
                        {["<", ">", "<=", ">=", "="].map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                      <select
                        className="filterSelect-2 mt-2"
                        style={{ marginLeft: "30px" }}
                        value={config.warehouseCapacity.min.value}
                        onChange={(e) => {
                          let temp = config;
                          temp.warehouseCapacity.min.value = e.target.value;
                          setConfig(temp);
                        setTemp(e.target.value);
                        }}
                      >
                        <option>{"<"}</option>
                        {persentages.map((item, index) => (
                          <option value={item} key={index}>
                            {item}
                          </option>
                        ))}
                      </select>
                      <select
                        className="filterSelect-1 mt-2"
                        style={{
                          width: "30%",
                          position: "relative",
                          left: "28px",
                        }}
                        value={config.warehouseCapacity.min.rating}
                        onChange={(e) => {
                          let temp = config;
                          temp.warehouseCapacity.min.rating = e.target.value;
                          setConfig(temp);
                        setTemp(e.target.value);
                        }}
                      >
                        <option>{"<"}</option>
                        {[1, 2, 3, 4, 5].map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <select
                        className="filterSelect-2 mt-2"
                        value={config.warehouseCapacity.max.operator}
                        onChange={(e) => {
                          let temp = config;
                          temp.warehouseCapacity.max.operator = e.target.value;
                          setConfig(temp);
                        setTemp(e.target.value);
                        }}
                      >
                        <option>{"<"}</option>
                        {["<", ">", "<=", ">=", "="].map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                      <select
                        className="filterSelect-2 mt-2"
                        style={{ marginLeft: "30px" }}
                        value={config.warehouseCapacity.max.value}
                        onChange={(e) => {
                          let temp = config;
                          temp.warehouseCapacity.max.value = e.target.value;
                          setConfig(temp);
                        setTemp(e.target.value);
                        }}
                      >
                        <option>{"<"}</option>
                        {persentages.map((item, index) => (
                          <option value={item} key={index}>
                            {item}
                          </option>
                        ))}
                      </select>
                      <select
                        className="filterSelect-2 mt-2"
                        style={{ marginLeft: "20px" }}
                        value={config.warehouseCapacity.max.rating}
                        onChange={(e) => {
                          let temp = config;
                          temp.warehouseCapacity.max.rating = e.target.value;
                          setConfig(temp);
                        setTemp(e.target.value);
                        }}
                      >
                        <option>{"<"}</option>
                        {["1", "2", "3", "4", "5"].map((item, index) => (
                          <option value={item} key={index}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td scope="row" style={{ color: "#A20134" }}>
                      Bottle Capacity
                    </td>
                    <td>
                      <input
                        className="filterSelect-1"
                        type="number"
                        value={config.bottleCapacity.target}
                        onChange={(e) => {
                          let temp = config;
                          temp.bottleCapacity.target = e.target.value;
                          setConfig(temp);
                        setTemp(e.target.value);
                        }}
                      />
                    </td>
                    <td className="middleTextField" style={{ display: "flex" }}>
                      <select
                        className="filterSelect-2 mt-2"
                        value={config.bottleCapacity.min.operator}
                        onChange={(e) => {
                          let temp = config;
                          temp.bottleCapacity.min.operator = e.target.value;
                          setConfig(temp);
                        setTemp(e.target.value);
                        }}
                      >
                        <option>{"<"}</option>
                        {["<", ">", "<=", ">=", "="].map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                      <select
                        className="filterSelect-2 mt-2"
                        style={{ marginLeft: "30px" }}
                        value={config.bottleCapacity.min.value}
                        onChange={(e) => {
                          let temp = config;
                          temp.bottleCapacity.min.value = e.target.value;
                          setConfig(temp);
                        setTemp(e.target.value);
                        }}
                      >
                        <option>{"<"}</option>
                        {persentages.map((item, index) => (
                          <option value={item} key={index}>
                            {item}
                          </option>
                        ))}
                      </select>
                      <select
                        className="filterSelect-1 mt-2"
                        style={{
                          width: "30%",
                          position: "relative",
                          left: "28px",
                        }}
                        value={config.bottleCapacity.min.rating}
                        onChange={(e) => {
                          let temp = config;
                          temp.bottleCapacity.min.rating = e.target.value;
                          setConfig(temp);
                        setTemp(e.target.value);
                        }}
                      >
                        <option>{"<"}</option>
                        {[1, 2, 3, 4, 5].map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <select
                        className="filterSelect-2 mt-2"
                        value={config.bottleCapacity.max.operator}
                        onChange={(e) => {
                          let temp = config;
                          temp.bottleCapacity.max.operator = e.target.value;
                          setConfig(temp);
                        setTemp(e.target.value);
                        }}
                      >
                        <option>{"<"}</option>
                        {["<", ">", "<=", ">=", "="].map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                      <select
                        className="filterSelect-2 mt-2"
                        style={{ marginLeft: "30px" }}
                        value={config.bottleCapacity.max.value}
                        onChange={(e) => {
                          let temp = config;
                          temp.bottleCapacity.max.value = e.target.value;
                          setConfig(temp);
                        setTemp(e.target.value);
                        }}
                      >
                        <option>{"<"}</option>
                        {persentages.map((item, index) => (
                          <option value={item} key={index}>
                            {item}
                          </option>
                        ))}
                      </select>
                      <select
                        className="filterSelect-2 mt-2"
                        style={{ marginLeft: "20px" }}
                        value={config.bottleCapacity.max.rating}
                        onChange={(e) => {
                          let temp = config;
                          temp.bottleCapacity.max.rating = e.target.value;
                          setConfig(temp);
                        setTemp(e.target.value);
                        }}
                      >
                        <option>{"<"}</option>
                        {["1", "2", "3", "4", "5"].map((item, index) => (
                          <option value={item} key={index}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="buttons">
              <button
                className="backBtn"
                onClick={() => {
                  setOpenEditTargets(false);
                  setOpenSetRating(false);
                }}
              >
                Close
              </button>
              <button
                className="saveBtn"
                onClick={() => {
                  setForNextBtn(false);
                  console.log(config);
                  saveConfig();
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpmDashboard;
