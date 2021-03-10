import React from "react";
import "leaflet/dist/leaflet.css";
import "./style.scss";
import { formatDate } from "../../utils/dateHelper";

const AffiliateOrganisation = (props) => {
  const { org, index, unaffiliatedOrg } = props;
  const backgroundColor = [
    "bg-primary",
    "bg-secondary",
    "bg-success",
    "bg-danger",
    "bg-warning",
    "bg-info",
    "bg-light",
    "bg-dark",
  ];

  const filterPending = org.affiliations.filter(
    (row) => row.affiliations.request_status == "PENDING"
  );

  const filterSince = org.affiliations.filter(
    (row) => row.affiliations.request_status == "APPROVED"
  );

  const requestSent = filterPending.length
    ? formatDate(filterPending[0].affiliations.request_date)
    : "";

  const affiliatedSince = filterSince.length
    ? formatDate(
        filterSince[filterSince.length - 1].affiliations.last_updated_on
      )
    : "";

  return (
    <>
      {filterPending.length < org.affiliations.length ? (
        <div className="card rounded shadow bg-white border border-white mt-1 ml-1 p-1 mb-3">
          <div className="card-body d-flex flex-row p-0 pl-2 pr-2">
            <div className="d-flex w-15 align-self-center flex-row ">
              <div
                className={`rounded mr-2 ${backgroundColor[index % 10]}`}
                style={{ width: 40, height: 40 }}
              ></div>
              <div className="text-left align-self-center">
                <span className="text-primary mb-0">{org?.user.org.name}</span>
              </div>
            </div>
            <div className="d-flex w-25 align-self-center flex-column">
              {requestSent && (
                <div className="pb-2 d-flex pr-2">
                  <span className="txtColor w-50">Request received: </span>
                  <span className="w-50">{requestSent}</span>
                </div>
              )}
              <div className="pb-2 d-flex pr-2">
                <span className="txtColor w-50">Affiliated Since: </span>
                <span className="w-50">{affiliatedSince}</span>
              </div>
            </div>
            <div className="d-flex w-15 flex-column">
              <div className="pb-2">
                <span className="txtColor">No of users: </span>
                <span>{org?.affiliations.length}</span>
              </div>
              <div className="pb-2">
                <button
                  style={{ height: 35 }}
                  type="button"
                  className="btn btn-primary rounded"
                >
                  View Users
                </button>
              </div>
            </div>
            <div className="d-flex w-25 align-self-center flex-row justify-content-between pr-2">
              <p className="txtColor  mb-0">Delivery Addresses: </p>
              <p className=" mb-0">
                &nbsp;
                {org?.user.org.postalAddress}
              </p>
            </div>
            <div className="w-20">
              <button
                onClick={() =>
                  unaffiliatedOrg({
                    orgs: org?.affiliations,
                    rindex: index,
                  })
                }
                type="button"
                className="btn btn-outline-dark"
              >
                Unaffiliate Organisation
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default AffiliateOrganisation;
