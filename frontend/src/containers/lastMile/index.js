import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import LastMile from "../../components/lastMile";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";
import { getEOLInfo } from "../../actions/eolAction";

const LastMileContainer = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    (() => {
      dispatch(getEOLInfo(0, 10, "", "", "", "", "", "", "")); //(skip, limit, product, country, state, district, location)
    })();
  }, [dispatch]);

  const lastMile = useSelector((state) => {
    return state.lastMile;
  });

  return (
    <div className='container-fluid p-0'>
      <Header {...props} />
      <div className='d-flex'>
        <Sidebar {...props} />
        <div className='content'>
          <LastMile {...props} lastMile={lastMile} />
        </div>
      </div>
    </div>
  );
};

export default LastMileContainer;
