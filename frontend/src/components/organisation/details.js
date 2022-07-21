import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "./style.scss";
import { formatDate } from "../../utils/dateHelper";
import DropdownButton from "../../shared/dropdownButtonGroup";
import editIcon from "../../assets/icons/editIcon.png";
import greenn_tick from "../../assets/icons/greenn_tick.png";
import { t } from "i18next";
export function getColor(status) {
  if (status === 'ACTIVE') {
    return "status text-success";
  } else if (status === "REJECTED") {
    return 'status text-danger';
  } else if (status === "NOTVERIFIED") {
    return "status text-secondary";
  } else {
    return "status text-warning";
  }
}

const Details = (props) => {
  const { org, modifyOrg, types } = props;
  const [status, setStatus] = useState("");
  const [typeId, setTypeId] = useState("");
  const [type, setType] = useState(org?.type);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [getSelectedType, setSelectedType] = useState("")


  useEffect(() => {
    setStatus(org?.status);
    // console.log(types)
    typedIdset();
  }, [setStatus, org]);

  const changeStatus = (status) => {
    org.status = status;
    setStatus(status);
  };

  function typedIdset() {
    types?.forEach((element) => {
      if (element.name === type) {
        setTypeId(element.id);
        return;
      }
    });
  }

    const changeBtnStatus = (status) => {
      debugger
      if (status == "ACTIVE") {
        modifyOrg({
          id: org?.id,
          status: "DEACTIVATED",
          index: org?.ridex,
          type: type,
          typeId: typeId,
        });
        changeStatus("DEACTIVATED");
      } else {
        modifyOrg({
          id: org?.id,
          status: "ACTIVE",
          index: org?.ridex,
          type: type,
          typeId: typeId,
        });
        changeStatus("ACTIVE");
      }
    }

    const updatedType = (value) => {

      setSelectedType(value)
      
    }

    const clickOnType = (value) => {
      org.type = value
      modifyOrg({
        org
      });
    }

  return (
    <div className="col-12 p-0 mb-3 ml-1 rounded row bg-white shadow">
        <div className="card-body details-body">
          <div className="userPic  rounded" 
            style={{width:"160px",display:"flex",flexDirection:"column"}}>
            {org?.logoId && (
              <img
                src={org?.logoId}
                alt="Organisation"
                className="rounded mr-1"
              />
            )}
            <h6 className=" txt text-primary text-left" style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  
                  maxWidth: '75%'
            }}>{org?.name}</h6>
            <div className="blockquote-footer" style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  position: 'relative',
                  left: '0px',
                  maxWidth: '75%'
            }}>
              {org?.primaryContactId}
            </div>
          </div>
          <div className="typeSpace">
            {openDropDown ? (
              <span style={{position:"relative",left:"1rem",display:"flex",flexDirection:"row",width:"100%",alignItems:"center"}}>
                <DropdownButton
                  groups={types}
                  onSelect={(item) => {
                    setType(item.name);
                    typedIdset();
                  }}
                  name={type}
                  source = {'manageOrg'}
                  setItemType = {setType}
                  onclickSelectedValue = {updatedType}
                  type={'orgType'}
                />
                <img className = "editIcon"  src = {greenn_tick} alt="right click" onClick={() => {setOpenDropDown(false); clickOnType(getSelectedType)}}/>
              </span>
            ) : (
              <div style = {{width:"90%",display:"flex",flexDirection:"row"}}>
              <span className="colum  align-self-center"
                style={{
                  position:"relative",
                  // left:"1rem", 
                  marginRight: `${org?.type === 'CUSTOMER_SUPPLIER' || 'IMPLEMENTATION PARTNER' ? `` : `3rem`}`,
                  display:"flex",
                  flexDirection:"row",
                  // whiteSpace:"nowrap",
                  overflow:"hidden",
                  textOverflow:"ellipsis",
                  maxWidth:"90%"}}>
                {org?.type}
                </span>
                <img className = "editIcon" style={{position:"relative",left:"2rem"}} src={editIcon} alt="edit" onClick ={(e) => {setOpenDropDown(true)}} />
              </div>
            )}
              
          </div>

          <span className="col-2 ml-5 txt1 mo-address" 
            style={{
             display:"flex",
             flexDirection:"column",
             position:"relative",}}>
            {org?.postalAddress}
          </span>
          
          <span className="colum txt1 mocoun" style={{position:"relative"}}>
            {org?.country?.countryName}
          </span>
          
          <span className="colum txt1 " style={{position:"relative", left:"0.8rem"}}>
            {org?.region?.name}
          </span>
          
          <span className="colum txt1 font-weight-bold text-secondory text-center switchBar">
                  <label className="switch">
                    <input type="checkbox" checked = {status === "ACTIVE" ?  true : false} />
                    <span className="slider round" onClick={(e) => { changeBtnStatus(status) }}></span>
                 </label>

           {(status) ? (<div className={getColor(status)}>{t(status)}</div>) :  <div className="status text-warning">{t('DEACTIVATED')}</div>}
          </span>
          
          <span 
            className="colum txt1 text-center"
            style={{
              display:"flex",
              flexDirection:"row",
              justifyContent:"center"}}>
            {org?.createdAt ? formatDate(org?.createdAt) : ""}
          </span>
         
          {/* <div className="colum txt1" style={{position:"relative", left:"1.5rem",display:"flex",flexDirection:"column",alignItems:"center"}}>
            <button
              type="button"
              onClick={() => {
                if (status == "ACTIVE") {
                  modifyOrg({
                    id: org?.id,
                    status: "DEACTIVATED",
                    index: org?.ridex,
                    type: type,
                    typeId: typeId,
                  });
                  changeStatus("DEACTIVATED");
                } else {
                  modifyOrg({
                    id: org?.id,
                    status: "ACTIVE",
                    index: org?.ridex,
                    type: type,
                    typeId: typeId,
                  });
                  changeStatus("ACTIVE");
                }
              }}
              className="btn btn-view  txt"
              style={{width:"6.5vw"}}
            >
              {status == "ACTIVE" ? "Deactivate" : "Activate"}
            </button>
            {status == "NOTVERIFIED" && (
              <button
                type="button"
                onClick={() => {
                  modifyOrg({
                    id: org?.id,
                    status: "REJECTED",
                    index: org?.ridex,
                  });
                  changeStatus("REJECTED");
                }}
                className="btn bg-secondary btn-view "
                style={{width:"6.5vw"}}
              >
                Reject
              </button>
            )}
          </div> */}
        </div>
    </div>
  );
};

export default Details;
