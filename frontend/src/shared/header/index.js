import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import searchingIcon from '../../assets/icons/search.png';   //'../../assets/icons/search_head.svg'
import bellIcon from '../../assets/icons/notification_blue.png';
import dropdownIcon from '../../assets/icons/dropdown_selected.png';
import Location from '../../assets/icons/location_blue.png';
import { Redirect } from 'react-router-dom';
import DrawerMenu from './drawerMenu';
import { getUserInfo, logoutUser, registerUser } from '../../actions/userActions';
import logo from '../../assets/brands/VACCINELEDGER.png';
//import searchingIcon from '../../assets/icons/searching@2x.png';
//import bellIcon from '../../assets/icons/bellwhite.png';
//import dropdownIcon from '../../assets/icons/drop-down.png';
import user from '../../assets/icons/user.svg';
import { getNotifications, deleteNotification } from '../../actions/notificationActions';
import { turnOff, turnOn } from "../../actions/spinnerActions";
import useOnclickOutside from 'react-cool-onclickoutside';
import { config } from "../../config";
import Modal from "../modal/index";
import FailedPopUp from "../PopUp/failedPopUp";
import {getShippingOrderIds,fetchAllairwayBillNumber} from "../../actions/shippingOrderAction";
import { getOrderIds} from "../../actions/poActions";
//import Badge from '@material-ui/core/Badge';
//import MailIcon from '@material-ui/icons/Mail';
//import Divider from '@material-ui/core/Divider';
//import MenuItem from '@material-ui/core/MenuItem';
//import FormControl from '@material-ui/core/FormControl';
//import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import DropdownButton from "../../shared/dropdownButtonGroup";
import { resetShipments } from '../../actions/shipmentActions';

const Header = props => {
  const dispatch = useDispatch();
  const [menu, setMenu] = useState(false);
  const [location, setLocation] = useState(false);
  const [sidebar, openSidebar] = useState(false);
  const [search, setSearch] = useState('');
  const [invalidSearch, setInvalidSearch] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  // const [orderIds, setOrderIds] = useState([]);
  // const [airWayBillNo,setairWayBillNo] = useState([]);
  // const [airWayBillNowithshipmentID,setairWayBillNowithshipmentID] = useState([]);
  // const [shippingIds, setShippingIds] = useState([]);
  const [wareHouse, setWareHouse]= useState({});
  const [selectLocation, setSelectLocation] = useState("");
  
const ref = useOnclickOutside(() => {
    setMenu(false);
    setLocation(false);
  });
  function onSearchChange(e) {
    setSearch(e.target.value);
  }

  const closeModalFail = () => {
    setInvalidSearch(false);
  };
  // useEffect(() => {

    // async function getIds(){
      // const resultShippingIds = await getShippingOrderIds();
      // const resultOrderIds = await getOrderIds();
      // const resultAirwayBillNo = await fetchAllairwayBillNumber();
      // setairWayBillNowithshipmentID(resultAirwayBillNo.data);

      // setOrderIds(resultOrderIds.map((so)=>so.id));
      // setShippingIds(resultShippingIds.map((so)=>so.id));
      // setairWayBillNo(resultAirwayBillNo.data.map((so)=>so.airWayBillNo))
  //   }
  //   getIds();
  // }, []);
        // console.log(airWayBillNowithshipmentID.data);
        
  async function getAllShipmentIDs(){
    dispatch(turnOn());
    let result =await getShippingOrderIds();
    dispatch(turnOff());
    return result;
  }
  async function getAllOrderIDs(){
    dispatch(turnOn());
    let result = await getOrderIds();
    dispatch(turnOff());
    return result;
  }
  async function getAllAirwayBillNo(){
    dispatch(turnOn());
    const result = await fetchAllairwayBillNumber();
    dispatch(turnOff());
    return result;
  }

  const onSeach = () => {
    if(search.substring(0,2) == 'SH'){
      getAllShipmentIDs().then((result)=>{
        let shippingIds = result.map((so)=>so.id);
        if(shippingIds.indexOf(search)!=-1){
          props.history.push(`/viewshipment/${search}`);
        }
        else
          setInvalidSearch(true);
      });
    }
    else if(search.substring(0,2) == 'PO'){
      getAllOrderIDs().then((result)=>{
        let orderIds = result.map((so)=>so.id);
        if(orderIds.indexOf(search)!=-1){
          props.history.push(`/vieworder/${search}`);
        }        
        else
          setInvalidSearch(true);
      })
    }
    else{
        getAllAirwayBillNo().then((result)=>{
          dispatch(turnOn());
          console.log(result,"data");
          let airWayBillNowithshipmentID = result.data;
          let airWayBillNo = result.data.map((so)=>so.airWayBillNo)
          dispatch(turnOff());
          if(airWayBillNo.indexOf(search)!=-1){
            let index = airWayBillNo.indexOf(search);
            props.history.push(`/viewshipment/${airWayBillNowithshipmentID[index].id}`)
          }
          else
            setInvalidSearch(true); 

        });
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

  const profile = useSelector(state => {
    return state.user;
  });
  // const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserInfo());
    async function fetchApi() {
      const response = await getNotifications();
      setNotifications(response.data);
    }
    fetchApi();
  }, []);

  const clearNotification = async notification => {
    const response = await deleteNotification(notification._id);
    setNotifications(response.data);
  }

  const onkeydown = (event) => {
    if (event.keyCode  === 13) {
      onSeach();
    }
   }
const imgs = config().fetchProfileImage;

  return (
    <div className="header">
      <div className="branding">
        <div className="mobile-menu" onClick={() => openSidebar(true)}>
          <i className="fa fa-bars" aria-hidden="true" />
        </div>
        <img
          src={logo}
          alt="vaccineledger"
          className="logo"
          onClick={() => props.history.push('/overview')}
        />
      </div>
      
      <div className="actions">
        <div className="search-form" tabIndex="-1" onKeyDown={onkeydown}>
          <input
            type="text"
            // value={search}
            placeholder="Search PO ID/ Shipment ID/ Airway Bill No."
            onFocus={(e) => e.target.placeholder = ''}
            onBlur={(e) => e.target.placeholder = 'Search PO ID/ Shipment ID/ Airway Bill No.'}
            onChange={onSearchChange}
            className= "form-control search-field"
          />
          <img src={searchingIcon} onClick={onSeach} alt="searching" />
        </div>
        <div>
        
       <div className="user-info ">
       <div className="notifications">
                {/*   <Badge badgeContent={1} color="primary"> </Badge> {/*<img src={bellIcon} alt="notification" /><MailIcon />*/}
                  
                    {  /* <div className="bellicon-wrap" onClick={() => setShowNotifications(!showNotifications)}>
            
              {notifications.length > 0 && <span className="badge badge-light">{notifications.length }</span> }
            </div>
            {showNotifications && notifications.length > 0 && (
              <div className="slider-menu">
                <React.Fragment>
                  {notifications.map(notification =>  <div className="slider-item">
                    <div className="row justify-content-between align-items-center" onClick={() => clearNotification(notification)}>
                      <div className="col-sm-10">
                        <div>{notification.message}</div>
                      </div>
                      <div className="col-sm-2">
                        <button
                          type="button"
                          className="close"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                    </div>
                  </div>)}
                </React.Fragment>
              </div>
            )}*/}
            </div>  
            <div className="divider" />
           <div className="location">
              <img src={Location} width="20" height="26" /> 
           </div>  
          <div className="userName" style={{fontSize: "13px", marginBottom:"0px"}}
          onClick={() => setLocation(!location)}> 
          <p className="cname1"><b>Location 1</b></p>
          <p className="uname"> Location Address </p>
          </div>
                           
           <div className="userActions mr-3"> 
              <img src={dropdownIcon} 
              alt="actions"
              onClick={() => setLocation(!location)}
                />
           </div>
           {location && (
            <div className="slider-menu1">
              {
                <React.Fragment>
                <div
                    className="slider-item1 border-top-0" 
                    >
                    Location 1
                    </div>

                 <div
                    className="slider-item1"
                   
                  >
                    Location 2
                  </div>
                  <div
                    className="slider-item1"
                   
                  >
                    Location 3
                  </div>
                </React.Fragment>
              }
            </div>
          )}
           
          <div className="userName">
            <p className="cname">{profile?.organisation?.split('/')[0]}</p>
           {/*  <p className="uname">{profile.warehouseAddress_city}</p> */}
           <p className="uname">{profile.firstName} {profile.lastName}</p>
          </div>

          <div className="userPic">
            <img
              src={`${imgs}${profile.photoId}` ? `${imgs}${profile.photoId}` : user }
              alt="profile"
              className={`rounded rounded-circle ${`${imgs}${profile.photoId}` ? `` :`img-thumbnail bg-transparent border-0`}` }
              onClick={() => setMenu(!menu) }
              />
          </div>
          <div className="userActions">
            <img
              src={dropdownIcon}
              alt="actions"
              onClick={() => setMenu(!menu)}
            />
          </div>
        </div>
        {menu && (
          <div className="slider-menu" ref={ref}>
            {
              <React.Fragment>
                <div className="slider-item-text">
                  <p>{profile.name}</p>
                  <p>{profile?.organisation?.split('/')[0]}</p>
                </div>
                <Link className="slider-item border-top-0" to="/profile">
                  My Profile
                </Link>
               <div
                  className="slider-item"
                  onClick={() => dispatch(logoutUser())}
                >
                  Logout
                </div>
              </React.Fragment>
            }
          </div>
        )}

        {sidebar && <DrawerMenu {...props} close={() => openSidebar(false)} />}
      </div>
      {invalidSearch && (
        <Modal
          close={() => closeModalFail()}
          size="modal-sm" //for other size's use `modal-lg, modal-md, modal-sm`
        >
          <FailedPopUp
            onHide={closeModalFail} //FailurePopUp
            // {...modalProps}
            message="Invalid Search"
          />
        </Modal>
      )}
      </div>
    </div>
  );
};

export default Header;
