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
    <div className="card rounded bg-white border border-white mt-1 ml-1 p-1 mb-3" style={{ width: 'min-content' }}>
        <div className="card-body details-body">
          <div className="userPic text-center rounded" 
            style={{ width: '190px' }}>
            {org?.logoId && (
              <img
                src={org?.logoId}
                alt="Organisation"
                className="rounded mr-1"
              />
            )}
            <h6 className="text-primary pt-1" style={{
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
                  left: '23px',
                  maxWidth: '75%'
            }}>
              {org?.primaryContactId}
            </div>
          </div>
          
          <span className="text-center align-self-center" style={{ maxWidth: '170px' }}>
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

          <span className="text-center align-self-center" 
          style={{     
            maxWidth: '169px',
            wordWrap: 'break-word'
          }}>
            {org?.postalAddress}
          </span>
          
          <span className="txtWrapu text-center align-self-center" style={{ width: '203px' }}>
            {org?.country?.countryName}
          </span>
          
          <span className="txtWrapu text-center align-self-center" style={{ width: '200px' }}>
            {org?.region?.regionName}
          </span>
          
          <span className="txtWrapu text-center align-self-center font-weight-bold text-secondory" style={{ width: '203px' }}>
            {(status) ? (status === 'ACTIVE' ? <div className="status text-success"> ACTIVE </div> : <div className="status text-danger">REJECTED</div>) : <div className="status text-warning">DEACTIVATED</div>}
          </span>
          
          <span className="txtWrapu text-center align-self-center" style={{ width: '182px' }}>
            {org?.createdAt ? formatDate(org?.createdAt) : ""}
          </span>
         
          <div>
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
              className="btn btn-view w-auto"
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
                className="btn ml-2 bg-secondary btn-view w-auto"
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
