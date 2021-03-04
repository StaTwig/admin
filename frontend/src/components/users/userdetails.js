import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "./style.scss";
import Popover from "react-popover";

const UserDetails = (props) => {
  const [visible, setVisible] = useState(false);
  const { user, activateUser, deactivateUser, unaffiliate } = props;

  useEffect(() => {
    setVisible(false);
  }, []);

  const [status, setStatus] = useState(user?.accountStatus);
  const changeStatus = (status) => {
    user.accountStatus = status;
    setStatus(status);
  };

  const popoverProps = {
    isOpen: visible,
    preferPlace: "above",
    tipSize: 7,
    place: "left",
    onOuterAction: () => setVisible(false),
    body: [
      <div className="m-3" key="b">
        <p className="txtColor mb-0">
          <a
            href="#"
            className="text-reset text-decoration-none"
            onClick={() => {
              if (status == "ACTIVE") {
                deactivateUser({ id: user?.id, index: user?.ridex });
                changeStatus("REJECTED");
              } else {
                activateUser({
                  id: user?.id,
                  role: user?.role,
                  index: user?.ridex,
                });
                changeStatus("ACTIVE");
              }
              setVisible(false);
            }}
          >
            {status == "ACTIVE" ? "Deactivate" : "Activate"} user
          </a>
        </p>
        <p className="txtColor mt-2 pt-2 border-top mb-0">
          <a
            href="#"
            className=" text-reset text-decoration-none"
            onClick={() => {
              unaffiliate({ id: user?.id });
              setVisible(false);
            }}
          >
            Unaffiliate User
          </a>
        </p>
      </div>,
    ],
  };

  return (
    <div className="card rounded bg-white border border-white mt-1 ml-1 p-1 mb-3">
      <div className="card-body d-flex flex-row justify-content-between">
        <div className="userPic w-20 rounded d-flex flex-row">
          <img src={user?.photoId} alt="User" className="rounded mr-1" />
          <h6 className="text-primary pt-1 txtWrapu">
            {user?.firstName + " " + user?.lastName}
          </h6>
        </div>
        <span className="txtWrapu w-15">{user?.role}</span>
        {/* <span className="txtWrapu w-20">ABC LTD | ABC LTD | ABC LTD</span> */}
        <span className="txtWrapu w-20 text-decoration-underline">
          <a href="#" className="text-decoration-underline">
            {user?.walletAddress}
          </a>
        </span>
        <span className="txtWrapu w-20">{user?.emailId}</span>
        <span className="txtWrapu w-15">{status}</span>
        <div className="w-20">
          {/* <button
            type="button"
            onClick={() => {
              if (status == "ACTIVE") {
                deactivateUser({ id: user?.id, index: user?.ridex });
                changeStatus("REJECTED");
              } else {
                activateUser({
                  id: user?.id,
                  role: user?.role,
                  index: user?.ridex,
                });
                changeStatus("ACTIVE");
              }
            }}
            className="btn btn-view w-auto"
          >
            {status == "ACTIVE" ? "Deactivate" : "Activate"}
          </button> */}
          <button type="button" className="btn btn-view">
            View
          </button>

          <Popover className="bg-light rounded shadow" {...popoverProps}>
            <a
              href="#"
              className="ml-2"
              onClick={() => {
                setVisible(false);
                setVisible(true);
              }}
            >
              <i className="fa fa-ellipsis-v"></i>
            </a>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
