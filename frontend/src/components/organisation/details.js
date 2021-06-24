import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
// import "./style.scss";
import { formatDate } from "../../utils/dateHelper";
import DropdownButton from "../../shared/dropdownButtonGroup";
import { map } from "leaflet";

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
      <div className="card-body d-flex flex-row justify-content-between">
        <div className="d-flex flex-column w-20">
          <div className="userPic text-center rounded d-flex flex-row">
            {org?.logoId && (
              <img
                src={org?.logoId}
                alt="Organisation"
                className="rounded mr-1"
              />
            )}
            <h6 className="text-primary pt-1 txtWrapu">{org?.name}</h6>
          </div>
          <div className="blockquote-footer mt-2 ml-4 txtWrapu">
            {org?.primaryContactId}
          </div>
        </div>
        <span className=" text-center w-15 align-self-center">
          {/* {org?.type} */}
          <DropdownButton
            groups={types}
            onSelect={(item) => {
              setType(item.name);
              typedIdset();
            }}
            name={type}
          />
        </span>
        <span className=" w-20 text-center align-self-center">
          {org?.postalAddress}
        </span>
        <span className="txtWrapu text-center w-10 align-self-center">
          {org?.country?.countryName}
        </span>
        <span className="txtWrapu text-center w-10 align-self-center">
          {status}
        </span>
        <span className="txtWrapu text-center w-15 align-self-center">
          {org?.createdAt ? formatDate(org?.createdAt) : ""}
        </span>
        <div className="w-20 align-self-center">
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
