import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import searchingIcon from "../../assets/icons/search.png";
import bellIcon from "../../assets/icons/notification_blue.png";
import dropdownIcon from "../../assets/icons/dropdown_selected.png";
import Location from "../../assets/icons/location_blue.png";
import DrawerMenu from "./drawerMenu";
import { Link } from "react-router-dom";
import {
  getActiveWareHouses,
  getUserInfo,
  logoutUser,
  setUserLocation,
  postUserLocation,
} from "../../actions/userActions";
import logo from "../../assets/brands/VACCINELEDGER.png";
import {
  deleteNotification,
  getImage,
} from "../../actions/notificationActions";
import { turnOff, turnOn } from "../../actions/spinnerActions";
import useOnclickOutside from "react-cool-onclickoutside";
import { config } from "../../config";
import Modal from "../modal/index";
import FailedPopUp from "../PopUp/failedPopUp";
import {
  getShippingOrderIds,
  fetchAllairwayBillNumber,
} from "../../actions/shippingOrderAction";
import { getOrderIds } from "../../actions/poActions";
import DropdownButton from "../dropdownButtonGroup";
import setAuthToken from "../../utils/setAuthToken";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { createFilterOptions } from "@material-ui/lab/Autocomplete";
import axios from "axios";
import userIcon from "../../assets/icons/user.png";
import inventoryIcon from "../../assets/icons/inventorynew.png";
import shipmentIcon from "../../assets/icons/TotalShipmentsCompleted.png";
import orderIcon from "../../assets/icons/Orders.png";

const Header = (props) => {
  const dispatch = useDispatch();
  const [menu, setMenu] = useState(false);
  const [location, setLocation] = useState({});
  const [sidebar, openSidebar] = useState(false);
  const [search, setSearch] = useState("");
  const [searchString, setSearchString] = useState("");
  const [searchType, setSearchType] = useState("");
  const [alertType, setAlertType] = useState("ALERT");
  const [invalidSearch, setInvalidSearch] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [image, setImage] = useState("");
  const [activeWarehouses, setActiveWarehouses] = useState([]);
  const [options, setOptions] = useState([]);

  const filterOptions = createFilterOptions({
    //matchFrom: "start",
    stringify: (option) => option._id,
  });

  const ref = useOnclickOutside(() => {
    setMenu(false);
  });
  function onSearchChange(e) {
    setSearchString(e._id);
    setSearchType(e.type);
    axios
      .get(`${config().getSuggestions}?searchString=${e}`)
      .then((resp) => setOptions([...resp.data.data]));
  }

  const closeModalFail = () => {
    setInvalidSearch(false);
  };

  const usersLocation = useSelector((state) => {
    return state.userLocation;
  });

  function notifIcon(notif) {
    if (notif.eventType == "INVENTORY") {
      return inventoryIcon;
    } else if (notif.eventType == "ORDER") {
      return orderIcon;
    } else if (notif.eventType == "SHIPMENT") {
      return shipmentIcon;
    } else if (notif.eventType == "SHIPMENT_TRACKING") {
      return userIcon;
    }
  }

  function viewUrl(notif) {
    if (notif.eventType == "INVENTORY") {
      return "productlist/";
    } else if (notif.eventType == "ORDER") {
      return "vieworder/";
    } else if (notif.eventType == "SHIPMENT") {
      return "viewshipment/";
    } else if (notif.eventType == "SHIPMENT_TRACKING") {
      return "viewuser/";
    }
  }

  async function getAllShipmentIDs() {
    dispatch(turnOn());
    let result = await getShippingOrderIds();
    dispatch(turnOff());
    return result;
  }
  async function getAllOrderIDs() {
    dispatch(turnOn());
    let result = await getOrderIds();
    dispatch(turnOff());
    return result;
  }
  async function getAllAirwayBillNo() {
    dispatch(turnOn());
    const result = await fetchAllairwayBillNumber();
    dispatch(turnOff());
    return result;
  }

  const onSeach = () => {
    if (search.substring(0, 2) == "SH") {
      getAllShipmentIDs().then((result) => {
        let shippingIds = result.map((so) => so.id);
        if (shippingIds.indexOf(search) != -1) {
          props.history.push("/overview");
          props.history.replace(`/viewshipment/${search}`);
        } else setInvalidSearch(true);
      });
    } else if (search.substring(0, 2) == "PO") {
      getAllOrderIDs().then((result) => {
        let orderIds = result.map((so) => so.id);
        if (orderIds.indexOf(search) != -1) {
          props.history.push(`/overview`);
          props.history.replace(`/vieworder/${search}`);
        } else setInvalidSearch(true);
      });
    } else if (searchType === "transitNumber") {
      getAllAirwayBillNo().then((result) => {
        dispatch(turnOn());
        let airWayBillNowithshipmentID = result.data;
        let airWayBillNo = result.data.map((so) => so.airWayBillNo);
        dispatch(turnOff());
        if (airWayBillNo.indexOf(search) != -1) {
          let index = airWayBillNo.indexOf(search);
          props.history.push(
            `/tracing/${airWayBillNowithshipmentID[index].id}`
          );
          // props.history.push(`/viewshipment/${airWayBillNowithshipmentID[index].id}`)
        } else setInvalidSearch(true);
      });
    } else if (searchType === "productName") {
      axios
        .get(`${config().searchProduct}&productName=${searchString}`)
        .then((resp) => {
          if (resp.data.data.length > 0)
            props.history.push(`/viewproduct`, { data: resp.data.data[0] });
          else
            alert(
              `The product "${searchString}" is not found in the inventory`
            );
        })
        .catch((err) => alert(err.response.data.message));
    } else if (searchType === "productType") {
      axios
        .get(`${config().searchProduct}&productType=${searchString}`)
        .then((resp) => {
          if (resp.data.data.length > 0)
            props.history.push(`/productinventory/${searchString}`);
          else
            alert(
              `Theere are no products belonging to type: "${searchString}" in your inventory`
            );
        })
        .catch((err) => alert(err.response.data.message));
    }
    // if(orderIds.indexOf(search)!=-1)
    // props.history.push(`/vieworder/${search}`);
    // else if(shippingIds.indexOf(search)!=-1)
    // props.history.push(`/viewshipment/${search}`);
    // else if(airWayBillNo.indexOf(search)!=-1){
    //   let index = airWayBillNo.indexOf(search);
    //   props.history.push(`/viewshipment/${airWayBillNowithshipmentID[index].id}`)
    // }
    // else
    // setInvalidSearch(true);
  };

  const profile = useSelector((state) => {
    return state.user;
  });

  if (profile.photoId != null) {
    getImage(profile.photoId).then((r) => {
      const reader = new window.FileReader();
      reader.readAsDataURL(r.data);
      reader.onload = function () {
        setImage(reader.result);
      };
    });
  }

  async function changeNotifications(value) {
    const response = await axios.get(`${config().getAlerts}${value}`);
    setNotifications(response.data.data.data);
  }

  useEffect(() => {
    dispatch(getUserInfo());
    async function fetchApi() {
      const response = await axios.get(`${config().getAlerts}${alertType}`);
      setNotifications(response.data.data.data);

      const warehouses = await getActiveWareHouses();
      const active = warehouses
        .filter((i) => i.status == "ACTIVE")
        .map((item) => {
          return {
            title: item.name,
            organisationId: item.name,
            ...item,
          };
        });
      if (localStorage.getItem("location") != null) {
        setLocation((prod) => JSON.parse(localStorage.getItem("location")));
        setActiveWarehouses(active);
      } else {
        if (active.length > 0) {
          setLocation((prod) => active[0]);
          localStorage.setItem("location", JSON.stringify(active[0]));
          setActiveWarehouses(active);
        } else {
          setLocation((prod) => warehouses[0]);
          localStorage.setItem("location", JSON.stringify(warehouses[0]));
          setActiveWarehouses(warehouses);
        }
      }
    }
    fetchApi();
  }, []);

  const handleLocation = async (item) => {
    setLocation(item);
    dispatch(setUserLocation(item));
    localStorage.setItem("location", JSON.stringify(item));
    setLocation((prod) => item);
    const body = { warehouseId: item.id };

    dispatch(turnOn());
    const result = await postUserLocation(body);
    dispatch(turnOff());
    if (result.status === 200) {
      const token = result.data.data.token;
      if (token) {
        setAuthToken(token);
        localStorage.setItem("theLedgerToken", token);
        props.history.push("/neworder");
        props.history.replace(`${props.location.pathname}`);
      }
    }
  };

  const clearNotification = async (notification) => {
    const response = await deleteNotification(notification._id);
    setNotifications(response.data);
  };

  const onkeydown = (event) => {
    if (event.keyCode === 13) {
      onSeach();
    }
  };
  const imgs = config().fetchProfileImage;

  return (
    <div className='header'>
      <div className='branding'>
        <div className='mobile-menu' onClick={() => openSidebar(true)}>
          <i className='fa fa-bars' aria-hidden='true' />
        </div>
        <img
          src={logo}
          alt='vaccineledger'
          className='logo'
          onClick={() => props.history.push("/overview")}
        />
      </div>

      <div className='actions'>
        <div className='search-form' tabIndex='-1' onKeyDown={onkeydown}>
          <Autocomplete
            id='free-solo-demo'
            freeSolo
            //value={search}
            options={options}
            getOptionLabel={(option) => option._id}
            filterOptions={filterOptions}
            placeholder='Search PO ID/ Shipment ID/ Transit Number'
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) =>
              (e.target.placeholder =
                "Search PO ID/ Shipment ID/ Transit Number")
            }
            inputValue={search}
            onInputChange={(event, newInputValue) => {
              setSearch(newInputValue);
              onSearchChange(newInputValue);
            }}
            onChange={(event, newValue) => {
              onSearchChange(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Search PO ID/ Shipment ID/ Transit Number'
                margin='normal'
                variant='outlined'
              />
            )}
          />
          {/* <input
            type="text"
            // value={search}
            placeholder="Search PO ID/ Shipment ID/ Transit Number"
            onFocus={(e) => e.target.placeholder = ''}
            onBlur={(e) => e.target.placeholder = 'Search PO ID/ Shipment ID/ Transit Number'}
            onChange={onSearchChange}
            className= "form-control search-field"
        /> */}

          <img src={searchingIcon} onClick={onSeach} alt='searching' />
        </div>
        <div>
          <div className='user-info '>
            <div className='notifications'>
              <img
                src={bellIcon}
                onClick={() => setShowNotifications(!showNotifications)}
                alt='notification'
              />
              <bellIcon />

              <div
                className='bellicon-wrap'
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <span className='badge badge-light'>
                  {notifications?.length >= 0 ? notifications?.length : 0}
                </span>
              </div>
              {showNotifications && (
                <div className='slider-menu'>
                  <React.Fragment>
                    <div
                      className='nheader'
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, #0092e8, #0a6bc6)",
                      }}
                    >
                      <text
                        style={{
                          color: "white",
                          fontSize: "20px",
                          fontWeight: "bold",
                          padding: "10px",
                        }}
                      >
                        User Notifications
                      </text>
                      {notifications?.length >= 0 && (
                        <text
                          style={{
                            backgroundColor: "#fa7a23",
                            padding: "5px",
                            color: "white",
                            textAlign: "right",
                            borderRadius: "6px",
                          }}
                        >
                          {notifications?.length} new
                        </text>
                      )}
                      <div className='section'>
                        <button
                          style={{
                            backgroundColor: "transparent",
                            color: "white",
                            borderColor: "transparent",
                          }}
                          onClick={() => {
                            setAlertType("ALERT");
                            changeNotifications("ALERT");
                          }}
                        >
                          Alerts
                        </button>
                        <button
                          style={{
                            backgroundColor: "transparent",
                            color: "white",
                            borderColor: "transparent",
                          }}
                          onClick={() => {
                            setAlertType("TRANSACTION");
                            changeNotifications("TRANSACTION");
                          }}
                        >
                          Transactions
                        </button>
                      </div>
                    </div>
                    {notifications?.length >= 0 ? (
                      notifications?.map((notifications) => (
                        <div className='slider-item'>
                          <div
                            className='row justify-content-between align-items-center'
                            onClick={() => clearNotification(notifications)}
                          >
                            <div className='col-sm-10'>
                              <div>
                                <img
                                  style={{ size: "15px", marginLeft: "-20px" }}
                                  src={notifIcon(notifications)}
                                />
                                <Link
                                  to={
                                    "/" +
                                    viewUrl(notifications) +
                                    notifications.transactionId
                                  }
                                >
                                  {notifications.message}
                                </Link>
                              </div>
                            </div>

                            <div className='col-sm-2'>
                              <button className='close' aria-label='Close'>
                                <span aria-hidden='true'>&times;</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className='slider-item'>
                        <div className='row justify-content-between align-items-center'>
                          <div className='col text-center'>
                            <div>
                              <span>No notifications</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                </div>
              )}
            </div>
            {/* <div className="userName" style={{fontSize: "13px", marginBottom:"0px"}}> 
          <p className="cname1"><b>{activeWarehouses[0]?.title}</b></p>
          <p className="uname"> {activeWarehouses[0]?.warehouseAddress.firstLine}</p>
          </div> */}
            <img className='locationimg' src={Location} />

            <div className='userName'>
              <DropdownButton
                name={(
                  location?.title +
                  "\n" +
                  location?.warehouseAddress?.city +
                  "," +
                  location?.warehouseAddress?.country
                )
                  .substr(0, 25)
                  .concat("...")}
                arrowImg={dropdownIcon}
                onSelect={(item) => {
                  handleLocation(item);
                }}
                groups={activeWarehouses}
              />
            </div>

            <div className='userName'>
              <p className='cname'>{profile?.organisation?.split("/")[0]}</p>
              {/*  <p className="uname">{profile.warehouseAddress_city}</p> */}
              <p className='uname'>
                {profile.firstName} {profile.lastName}
              </p>
            </div>

            <div className='userPic'>
              <img
                src={`${image}`}
                alt='profile'
                className={`rounded rounded-circle ${
                  `${imgs}${profile.photoId}`
                    ? ``
                    : `img-thumbnail bg-transparent border-0`
                }`}
                onClick={() => setMenu(!menu)}
              />
            </div>
            <div className='userActions'>
              <img
                src={dropdownIcon}
                alt='actions'
                onClick={() => setMenu(!menu)}
              />
            </div>
          </div>
          {menu && (
            <div className='slider-menu' ref={ref}>
              {
                <React.Fragment>
                  <div className='slider-item-text p-2'>
                    <p>{profile.name}</p>
                    <p>{profile?.organisation?.split("/")[0]}</p>
                  </div>
                  <div
                    className='slider-item border-top-0 p-0'
                    onClick={() => props.history.push("/profile")}
                  >
                    My Profile
                  </div>
                  <div
                    className='slider-item p-0'
                    onClick={() => props.history.push("/settings")}
                  >
                    Settings
                  </div>
                  <div
                    className='slider-item p-0'
                    onClick={() => dispatch(logoutUser())}
                  >
                    Logout
                  </div>
                </React.Fragment>
              }
            </div>
          )}

          {sidebar && (
            <DrawerMenu {...props} close={() => openSidebar(false)} />
          )}
        </div>
        {invalidSearch && (
          <Modal
            close={() => closeModalFail()}
            size='modal-sm' //for other size's use `modal-lg, modal-md, modal-sm`
          >
            <FailedPopUp
              onHide={closeModalFail} //FailurePopUp
              // {...modalProps}
              message='Invalid Search'
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Header;
