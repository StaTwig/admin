import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "./style.scss";
import { formatDate } from "../../utils/dateHelper";
import DropdownButton from "../../shared/dropdownButtonGroup";

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
  
  return (
    <div className="col-12 p-0 mb-3 ml-1 rounded row bg-white shadow">
        <div className="card-body details-body">
          <div className="userPic text-center rounded" 
            style={{ width: '160px',display:"flex",flexDirection:"column",alignItems:"center" }}>
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
                  
                  maxWidth: '100%'
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
          
          <span className="colum text-center align-self-center" style={{position:"relative",left:"2rem"}}>
            {org?.type}
            <DropdownButton
              groups={types}
              onSelect={(item) => {
                setType(item.name);
                typedIdset();
              }}
              name={type}
            />
          </span>

          <span className="col-2 ml-5 txt1" style={{display:"flex",alignItems:"center",flexDirection:"column"}}>
            {org?.postalAddress}
          </span>
          
          <span className="colum txt1 text-center" style={{position:"relative", left:"13px"}}>
            {org?.country?.countryName}
          </span>
          
          <span className="colum txt1 text-center" style={{position:"relative", left:"2rem"}}>
            {org?.region?.regionName}
          </span>
          
          <span className="colum txt1 font-weight-bold text-secondory text-center" style={{position:"relative", left:"3rem"}} >
          {(status) ? (<div className={getColor(status)}>{status}</div>) :  <div className="status text-warning">DEACTIVATED</div>}
          </span>
          
          <span className="colum txt1 text-center"  style={{position:"relative", left:"3rem"}}>
            {org?.createdAt ? formatDate(org?.createdAt) : ""}
          </span>
         
          <div className="colum txt1" style={{position:"relative", left:"1.5rem",display:"flex",flexDirection:"column",alignItems:"center"}}>
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
          </div>
        </div>
    </div>
  );
};

export default Details;
