import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import "./style.scss";
import dummyimage from "../../assets/brands/user-image/Image73.png";
import Popover from "react-popover";

const UserDetails = (props) => {
  const [visible, setVisible] = useState(false);
  const popoverProps = {
    isOpen: visible,
    preferPlace: "above",
    tipSize: 7,
    place: "left",
    // onOuterAction: () => this.togglePopover(false),
    body: [
      <div className="m-3" key="b">
        <p className="txtColor mb-0">
          <a
            href="#"
            className="text-reset text-decoration-none"
            onClick={() => setVisible(!visible)}
          >
            Activate user
          </a>
        </p>
        <p className="txtColor mt-2 pt-2 border-top mb-0">
          <a
            href="#"
            className=" text-reset text-decoration-none"
            onClick={() => setVisible(!visible)}
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
          <img src={dummyimage} alt="User" className="rounded mr-1" />
          <h6 className="text-primary pt-1 txtWrapu">
            Namessssssssswwwwwwwsssss
          </h6>
        </div>
        <span className="txtWrapu w-10">Sales manager</span>
        <span className="txtWrapu w-20">ABC LTD | ABC LTD | ABC LTD</span>
        <span className="txtWrapu w-10 text-decoration-underline">
          <a href="#" className="text-decoration-underline">
            1fwedcxvxcfffffffffffv
          </a>
        </span>
        <span className="txtWrapu w-20">email@test.com</span>
        <span className="txtWrapu w-10">Active</span>
        <div className="w-10">
          <button type="button" className="btn btn-view">
            View
          </button>

          <Popover className="bg-light rounded shadow" {...popoverProps}>
            <a href="#" className="ml-2" onClick={() => setVisible(!visible)}>
              <i className="fa fa-ellipsis-v"></i>
            </a>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
