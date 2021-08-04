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
    <div className="card rounded bg-white border border-white mt-1 ml-1 p-1 mb-3">
      <div className="row row-details">
        <div className="card-body details-body" style={{ display: 'flex' }}>
          <div className="userPic w-25 text-center rounded">
            {org?.logoId && (
              <img
                src={org?.logoId}
                alt="Organisation"
                className="rounded mr-1"
              />
            )}
            <h6 className="text-primary pt-1 txtWrapu">{org?.name}</h6>
            <div className="blockquote-footer mt-2 ml-4 txtWrapu">
              {org?.primaryContactId}
            </div>
          </div>
          <span className=" text-center w-25 align-self-center">
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

          <span className=" w-25 text-center align-self-center">
            {org?.postalAddress}
          </span>
          <span className="txtWrapu text-center w-25 align-self-center">
            {org?.country?.countryName}
          </span>
          <span className="txtWrapu text-center w-25 align-self-center">
            {org?.region?.regionName}
          </span>
          <span className="txtWrapu text-center w-25 align-self-center font-weight-bold text-secondory">
            {(status) ? (status === 'ACTIVE' ? <div className="status text-success"> ACTIVE </div> : <div className="status text-danger">REJECTED</div>) : <div className="status text-warning">DEACTIVATED</div>}
          </span>
          <span className="txtWrapu text-center w-25 align-self-center">
            {org?.createdAt ? formatDate(org?.createdAt) : ""}
          </span>
          <div className="w-25">
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
    </div>
  );
};

export default Details;
