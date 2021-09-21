import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "./style.scss";
import Popover from "react-popover";
import dummyImage from '../../assets/icons/block-icon.png'

const UserDetails = (props) => {
  const [visible, setVisible] = useState(false);
  const [display, setDisplay] = useState(false);
  const [statusStyle, setStatusStyle] = useState("");
  const { user, activateUser, deactivateUser, unaffiliate, permission } = props;
  const [viewButton, setViewButton] = useState(false)
  // console.log("user",user);

  const [status, setStatus] = useState("");

  useEffect(() => {
    setVisible(false);
    let statusStyle = 'bg-primary';
    if (user?.accountStatus == "ACTIVE") {
      setStatusStyle('bg-primary');
      setStatus(user?.accountStatus);
    }
    else if (user?.accountStatus == "REJECTED") {
      setStatusStyle('bg-warning');
      setStatus(user?.accountStatus);
    }

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
        <div className="card-body d-flex">
          <div className="userPic w-25 text-center rounded">
            {user?.photoId && (
              <img
                style={{ display: "flex" }}
                src={user?.photoId}
                alt="user"
                className="rounded mr-1"
              />
            )}
            <h6 className="text-primary 
            pt-1 txtWrapu text-left" style={{
                marginTop: '-35px',
                marginLeft: '21px',
              }}>
              {user?.firstName + " " + user?.lastName}
            </h6>
            <div
              className="blockquote-footer ml-3 txtWrapu text-left"
              style={{ marginLeft: '21px', maxWidth:'150px' }}
            >
              {user?.emailId}
            </div>
          </div>
          <span
            className={`w-25 ${display ? `text-left` : ` txtWrapu1 text-center`
              } ${viewButton ? `` : `align-self-center`}`}
          >
            <span className={
              `w-10 ${display ? `text-left` : ` roleText txtWrapu1 text-center`
              } ${viewButton ? `` : `align-self-center`}`
            }>{user?.role}</span>
            {display && (
              <div className="pt-3">
                {permission?.map((per) => (
                  <span className="d-block"> {per} </span>
                ))}
              </div>
            )}
          </span>
          <span className={`text-left ${viewButton ? `` : `align-self-center`} locationText`}>
            { user?.location }
          </span>
          <span className={` w-25 text-center ${viewButton ? `` : `align-self-center`} walletText txtWrapu`}>
            <a href="#" className="text-decoration-underline">
              {user?.walletAddress}
            </a>
          </span>
          <span className={` w-25 text-left ${viewButton ? `` : `align-self-center`} emailText`}>
            {user?.emailId}
          </span>
          <span className={`" w-25 text-center ${viewButton ? `` : `align-self-center`} accountText font-weight-bold"`}>
           {(status) ? (status === 'ACTIVE' ? <div className="status text-success"> ACTIVE </div> : <div className="status text-danger">REJECTED</div>) : <div className="status text-warning">DEACTIVATED</div>}
          
          </span>
          <div
            className={`w-15  ${display || viewButton ? `align-self-start` : ` align-self-center`
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
              className="btn btn-view btnText"
              onClick={() => {setDisplay(!display); setViewButton(viewButton ? false : true)}}
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
