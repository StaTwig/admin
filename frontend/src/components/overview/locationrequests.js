import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import "./style.scss";
import { formatDate } from "../../utils/dateHelper";
import { getAddress } from "../../utils/commonHelper";
import { config } from "../../config";
import { t } from "i18next";
import defaultIcon from "../../assets/icons/user.png";

const LocationRequests = (props) => {
  const {
    row,
    setShowModal,
    setData,
    rejectApproval,
    rindex,
    setTitle,
    setBtnTxt,
    modifyLocations,
  } = props;
  const imgDomain = config().imgDomainUrl;
  const img = imgDomain + "/" + row?.employee.photoId;

  return (
    <div className="card flex-row justify-content-between rounded border border-white shadow bg-white mt-3 ml-2 p-3">
      <div className="d-flex flex-row w-50">
        <div className="userPic rounded">
          <img
            src={defaultIcon}
            alt="Location"
            className="rounded"
          />
        </div>
        <div className="pl-1 w-100">
          <span className="pb-2">
            {row?.employee.firstName + " " + row?.employee.lastName}
          </span>
          <div className="pb-2 txtColor d-flex ">
            <span className="txtWrapR text-decoration-underline">
              {row?.employee.walletAddress}
            </span>
          </div>
          <div className="pb-2 d-flex">
            <span className="txtColor">
              {row?.employee.phoneNumber ? `${t('mobile_no')} :` : `${t('email_id')}: ` }
            </span>
            <span className="txtWrapR">
              &nbsp;
              {row?.employee.phoneNumber
                ? row?.employee.phoneNumber
                : row?.employee.emailId}
            </span>
          </div>
          <div className="pb-2">
            <span className="txtColor">{t('location')}: </span>
            <span>{getAddress(row?.warehouseAddress)} </span>
          </div>
        </div>
      </div>
      <div className="pl-1">
        <div className="d-grid txtColor">
          <span>{t('date')}: {formatDate(row?.updatedAt)}</span>
        </div>
        <div className="d-flex flex-row mt-5 pt-5">
          <button
            type="button"
            style={{borderStyle:"solid",borderWidth:"thin",width:"8vw",fontWeight:"bold"}}
            className="bg-white rounded btn-outline-success bg-green mr-3 pl-2 pr-2 btnstyles"
            onClick={() => {
              modifyLocations({
                id: row?.id,
                eid: row?.employee.id,
                rindex: rindex,
                type: 1,
              });
            }}
          >
            {t('Approve')}
          </button>
          <button
            type="button"
            style={{borderStyle:"solid",borderWidth:"thin",width:"8vw",fontWeight:"bold"}}
            className="bg-white rounded btn-outline-danger bg-red pl-2 pr-2 btnstyles"
            onClick={() => {
              modifyLocations({
                id: row?.id,
                eid: row?.employee.id,
                rindex: rindex,
                type: 2,
              });
            }}
          >
            {t('Reject')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationRequests;
