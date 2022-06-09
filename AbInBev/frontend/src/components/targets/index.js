import React, { useEffect, useState } from "react";
import SideBar from "../../components/sidebar";
import filterIcon from "../../assets/icons/funnel.svg";
import { getAllStates, updateTargets } from "../../actions/analyticsAction";
import "./index.scss";
import { useDispatch } from "react-redux";

const Targets = (props) => {
  const [state, setState] = useState("");
  const [districts, setDistricts] = useState([]);
  const [params, setParams] = useState({});
  const [returnTarget, setReturnTarget] = useState();
  const [retTargetEdit, setRetTargetEdit] = useState(false);
  const [checkedAllDis, setCheckedAllDis] = useState(false);
  const [displayDistricts, setDisplayDistricts] = useState([...props.depots]);
  const [district, setDistrict] = useState("");
  const [countChecked, setCountChecked] = useState(0);
  const [disableReturnTarget, setDisableReturnTarget] = useState(true);
  const [openTextMsg, setOpenTextMsg] = useState(false);
  const [selectedArray, setSelectedArray] = useState([]);
  const [isChecked, setIsChecked] = useState([]);
  const [percentageList, setPercentageList] = useState([
    {
      id: 1,
      value: "10",
    },
    {
      id: 2,
      value: "20",
    },
    {
      id: 3,
      value: "30",
    },
    {
      id: 4,
      value: "40",
    },
    {
      id: 5,
      value: "50",
    },
    {
      id: 5,
      value: "60",
    },
    {
      id: 5,
      value: "70",
    },
    {
      id: 5,
      value: "80",
    },
    {
      id: 5,
      value: "90",
    },
    {
      id: 5,
      value: "100",
    },
  ]);
  useEffect(() => {
    if (props.depots) setDisplayDistricts(props.depots);
  }, [props.depots]);

  const dispatch = useDispatch();

  const onStateChange = async (event) => {
    const selectedState = event.target.value;
    setState(selectedState);
    const filter = { ...params };
    filter.state = selectedState;
    const result = await props.getDistricts(selectedState);
    setDistricts(result.data);
    setDisplayDistricts(props.depots);
    setParams(filter);
  };

  const onDistrictChange = async (event) => {
    const selectedDistrict = event.target.value;
    setDistrict(selectedDistrict);
    const filter = [];
    const values = { ...params };
    values.district = selectedDistrict;
    filter.push(selectedDistrict);
    setDisplayDistricts(
      props.depots.filter((item) => item._id.depot === selectedDistrict)
    );
    setParams(values);
    // console.log(displayDistricts)
  };

  const selectedAllDistricts = (event) => {
    if (event.target.checked === true) {
      setCheckedAllDis(true);
      setDisableReturnTarget(false);
    } else {
      setCheckedAllDis(false);
      setDisableReturnTarget(true);
    }
  };

  const resetFilters = () => {
    // setState('');
    setDistrict("");
    setDisplayDistricts(props.depots);
  };

  const selectCheckBox = (event, value, index) => {
    if (selectedArray.find((element) => element.value == value)) {
      let arr = selectedArray.filter((item) => item.value != value);
      setSelectedArray(arr);
      let checkedArr = isChecked.filter((item) => item !== index);
      setIsChecked(checkedArr);
    } else {
      let arr = selectedArray;
      let checkarr = [...isChecked];
      checkarr.push(index);
      setIsChecked(checkarr);
      arr.push({ value, index });
    }
    let count = countChecked;
    if (event.target.checked) {
      count = count + 1;
      setCountChecked(count);
    } else {
      count--;
      setCountChecked(count);
    }
    if (count > 1) {
      setDisableReturnTarget(false);
    } else {
      setDisableReturnTarget(true);
    }
  };

  const onSave = async () => {
    if (isChecked.length === 0 && !checkedAllDis && !retTargetEdit) {
      alert("Select something");
      return;
    }
    if (checkedAllDis && retTargetEdit) {
      let data = [
        {
          depot: displayDistricts.map((item) => item.depots).flat(),
          percentage: returnTarget,
        },
      ];
      await dispatch(updateTargets(data));
    } else {
      let arr = [];
      selectedArray.map((element) => {
        let depot_list = displayDistricts.find(depot => depot._id.depot === element.value);
        depot_list = depot_list.depots;
        arr.push({
          depot: depot_list,
          percentage: parseInt(displayDistricts[element.index].percentage),
        })
      });
      await dispatch(updateTargets(arr));
    }
    props.refreshPage();
    setIsChecked([]);
    setCheckedAllDis(false);
  };

  const roundOff = (num) => {
    let quotient = num;
    let remainder = quotient % 10;
    if(remainder < 5) {
      quotient = quotient - remainder;
    } else {
      quotient = quotient + (10 - remainder);
    }
    return quotient;
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 d-none d-md-block padding0 greyBG">
          <SideBar {...props} />
        </div>
        <div role="main" className="col-md-9 ml-sm-auto col-lg-10">
          <div className="row">
            {openTextMsg && (
              <div>
                <div className="uploadModel">
                  <span className="closeBtn">
                    New Targets have been updated for the selected Districts
                  </span>
                  <div>
                    <button
                      type="button"
                      className="cancelButton mt-4"
                      onClick={() => setOpenTextMsg(false)}
                      style={{ border: 0 }}
                    >
                      close
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div className="col-md-9 mainContainer pt-3 px-4">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
                <h1 className="h2">Targets</h1>
                <button
                  className={!(countChecked || checkedAllDis) && (!returnTarget) ? 'saveBtnDisabled' : 'saveBtn'}
                  disabled={!(countChecked || checkedAllDis) && (!returnTarget)}
                  onClick={() => {
                    onSave();
                  }}
                >
                  Save
                </button>
              </div>

              <div className="titles">
                <div className="distric-01">
                  <input
                    type="checkbox"
                    id="districts"
                    onChange={selectedAllDistricts}
                    style={{ marginRight: "5px" }}
                    checked={checkedAllDis}
                  />
                  <span className="headerNames">District</span>
                </div>
                <div>
                  <span className="headerNames">Return Target</span>
                </div>
                <div className="text-right-align">
                  <span className="headerNames">Set Return Target</span>
                </div>
              </div>
              <div
                className="totalBox"
                style={{
                  padding: `${displayDistricts.length > 0 ? "2rem" : "unset"}`,
                }}
              >
                <div className="districtList">
                  {displayDistricts.map((district, index) => (
                    <div
                      className="district-row"
                      style={{ marginBottom: "20px" }}
                    >
                      <div className="district-name">
                        {checkedAllDis ? (
                          <input
                            key={index}
                            type="checkbox"
                            style={{ marginRight: "5px" }}
                            checked={checkedAllDis}
                          />
                        ) : (
                          <input
                            id={"distict" + index}
                            onChange={(e) =>
                              selectCheckBox(e, district._id.depot, index)
                            }
                            type="checkbox"
                            style={{ marginRight: "5px" }}
                            checked={isChecked.indexOf(index) !== -1}
                          />
                        )}
                        <span>{district._id.depot}</span>
                      </div>
                      <div className="retur-Target">
                        <span style={{ marginBottom: "20px" }}>
                          {district.percentage != "N/A" ? roundOff(district.percentage) + "%" : "N/A"}
                        </span>
                      </div>

                      <div className="set-Return-Target">
                        <select
                          value={`${roundOff(district.percentage)}`}
                          style={{ borderRadius: "10px" }}
                          disabled={isChecked.indexOf(index) === -1}
                          onChange={(e) => {
                            let array = displayDistricts;
                            array[index].percentage = e.target.value;
                            setDisplayDistricts([...array]);
                          }}
                        >
                          {percentageList?.map((item, index) => (
                            <option value={item.value}>{item.value}%</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-md-3 rightSideMenu pt-4 px-2">
              <div className="filterSection">
                <div className="filterHeader mb-3">
                  <img src={filterIcon} className="filterIcon" /> FILTERS
                </div>
                <div>
                  <label className="filterSubHeading mt-3">Select State</label>
                  <select
                    className="filterSelect mt-2"
                    value={state}
                    onChange={onStateChange}
                  >
                    <option value="">Select State</option>
                    {props.states?.map((state, index) => (
                      <option key={index} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  <label className="filterSubHeading mt-3">
                    Select District
                  </label>
                  <select
                    value={district}
                    className="filterSelect mt-2"
                    onChange={onDistrictChange}
                  >
                    <option value="">Select District</option>
                    {districts?.map((district, index) => (
                      <option key={index} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                  <label
                    className="filterSubHeading mt-3"
                    style={{
                      opacity: `${!disableReturnTarget ? "unset" : "0.5"}`,
                    }}
                  >
                    Select Return Target
                  </label>
                  <select
                    value={returnTarget}
                    className="filterSelect mt-2"
                    disabled={disableReturnTarget}
                    onChange={(e) => {
                      setReturnTarget(e.target.value);
                      setRetTargetEdit(true);
                    }}
                  >
                    <option value="">Select Return Target</option>
                    {percentageList?.map((item, index) => (
                      <option key={index} value={item.value}>
                        {`${item.value}%`}
                      </option>
                    ))}
                  </select>
                </div>
                {!!Object.keys(params).length && (
                  <button
                    className="btn SearchButton mt-4"
                    onClick={resetFilters}
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Targets;
