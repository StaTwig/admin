import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "./style.scss";
import { formatDate } from "../../utils/dateHelper";
import DropdownButton from "../../shared/dropdownButtonGroup";
import { map } from "leaflet";

const Details = (props) => {
  const { org, modifyOrg, types, orgList } = props;
  const [status, setStatus] = useState("");
  const [typeId, setTypeId] = useState("");
  const [type, setType] = useState(org?.type);
  const [orgId, setOrgId] = useState("");
  const [orgName, setOrgName] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    setStatus(org?.status);
    typedIdset();
  }, [setStatus, org]);

  const changeStatus = (status) => {
    org.status = status;
    setStatus(status);
  };

  useEffect(() => {
    setType(org?.type);
    if (org?.authority) {
      const orgTemp = orgList.filter((o) => o.id == org?.authority);
      if (orgTemp.length > 0) setOrgName(orgTemp[0].name);
    }
  }, [org]);

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
      <div className="card-body row justify-content-between">
        <div className="userPic col-2 text-left rounded row align-self-center">
          {org?.logoId && (
            <img
              src={org?.logoId}
              alt="Organisation"
              className="rounded mr-1 col"
            />
          )}
          <h6 className="text-primary pt-1 col txtWrapu">{org?.name}</h6>
        </div>
        <span className=" text-center col-2 align-self-center">
          {/* {org?.type} */}
          <DropdownButton
            groups={types}
            onSelect={(item) => {
              setType(item.name);
              setTypeId(item.id);
            }}
            name={type ? type : org?.type}
          />
        </span>
        <span
          className={`${
            type != "CENTRAL_AUTHORITY" ? "text-left" : "text-center"
          } col-2 align-self-center`}
        >
          {type != "CENTRAL_AUTHORITY" ? (
            <DropdownButton
              groups={orgList.filter(
                (o) =>
                  o.type ==
                    (type == "S1"
                      ? "BREWERY"
                      : type == "S2"
                      ? "S1"
                      : type == "S3"
                      ? "S2"
                      : "CENTRAL_AUTHORITY") &&
                  o.status == "ACTIVE" &&
                  o.type != "CENTRAL_AUTHORITY"
              )}
              onSelect={(item) => {
                setOrgName(item.name);
                setOrgId(item.id);
              }}
              name={orgName}
            />
          ) : (
            "NA"
          )}
          {error && <span className="text-danger">Required</span>}
        </span>
        <span className="col-2 text-center align-self-center">
          {org?.postalAddress}
        </span>
        <span className="txtWrapu text-center col align-self-center">
          {org?.country?.countryName}
        </span>
        <span className="txtWrapu text-center col align-self-center">
          {status}
        </span>
        <span className="txtWrapu text-center col align-self-center">
          {org?.createdAt ? formatDate(org?.createdAt) : ""}
        </span>
        <div className="col align-self-center">
          <button
            type="button"
            onClick={() => {
              if (
                orgName != "" ||
                type == "CENTRAL_AUTHORITY" ||
                type == "BREWERY"
              ) {
                if (status == "ACTIVE") {
                  modifyOrg({
                    id: org?.id,
                    status: "DEACTIVATED",
                    index: org?.ridex,
                    type: type,
                    typeId: typeId,
                    orgId: orgId,
                  });
                  changeStatus("DEACTIVATED");
                } else {
                  modifyOrg({
                    id: org?.id,
                    status: "ACTIVE",
                    index: org?.ridex,
                    type: type,
                    typeId: typeId,
                    orgId: orgId,
                  });
                  changeStatus("ACTIVE");
                }
              } else {
                setError(true);
              }
            }}
            className={`btn btn-view w-auto ${
              status == "ACTIVE" ? "btn-deactive" : "btn-active"
            }`}
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
              className="btn ml-2 btn-view bg-red  w-auto"
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
