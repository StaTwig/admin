import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "./style.scss";
import Popover from "react-popover";

const UserDetails = (props) => {
  const [visible, setVisible] = useState(false);
  const [display, setDisplay] = useState(false);
  const { user, activateUser, deactivateUser, unaffiliate, permission } = props;

  const [status, setStatus] = useState("");

  useEffect(() => {
    setVisible(false);
    setStatus(user?.accountStatus);
  }, [setStatus, setVisible, user]);

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
        {user?.orgs?.length > 0 && (
          <p className="txtColor mt-2 pt-2 border-top mb-0">
            <a
              href="#"
              className=" text-reset text-decoration-none"
              onClick={() => {
                unaffiliate({ id: user?.id });
                setVisible(false);
                user.orgs = [];
              }}
            >
              Unaffiliate User
            </a>
          </p>
        )}
      </div>,
    ],
  };

  return (
    <div className="card rounded bg-white border border-white mt-1 ml-1 p-1 mb-3">
      <div className="card-body d-flex flex-row justify-content-between">
        <div className="userPic w-15 text-center rounded d-flex flex-row">
          <img src={user?.photoId} alt="User" className="rounded mr-1" />
          <h6 className="text-primary pt-1 txtWrapu">
            {user?.firstName + " " + user?.lastName}
          </h6>
        </div>
        <span
          className={`w-20 ${
            display ? `text-left` : ` align-self-center txtWrapu text-center`
          } `}
        >
          <span className="">{user?.role}</span>
          {display && (
            <div className="pt-3">
              {permission?.map((per) => (
                <span className="d-block"> {per} </span>
              ))}
            </div>
          )}
        </span>
        <span
          className={`txtWrapu text-center w-15 ${
            display ? ` ` : ` align-self-center`
          } `}
        >
          {user?.orgs?.length
            ? user.orgs.map((row, index) => (index > 0 ? " | " : "") + row.name)
            : "-"}
        </span>
        <span
          className={`txtWrapu w-15 text-center text-decoration-underline ${
            display ? ` ` : ` align-self-center`
          } `}
        >
          <a href="#" className="text-decoration-underline">
            {user?.walletAddress}
          </a>
        </span>
        <span
          className={`txtWrapu text-center w-15 ${
            display ? ` ` : ` align-self-center`
          } `}
        >
          {user?.emailId}
        </span>
        <span
          className={`txtWrapu text-center  w-10 ${
            display ? `align-self-start` : ` align-self-center`
          } `}
        >
          {status}
        </span>
        <div
          className={`w-10  ${
            display ? `align-self-start` : ` align-self-center`
          } `}
        >
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
          <button
            type="button"
            className="btn btn-view"
            onClick={() => setDisplay(!display)}
          >
            {display ? "Back" : "View"}
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
