import React, { useEffect , useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import OverView from '../../components/overview';
import Header from '../../shared/header';
import Sidebar from '../../shared/sidebarMenu';
import {getShipments} from "../../actions/shipmentActions";
import {getUserInfo} from "../../actions/userActions";

const OverviewContainer = props => {
  const dispatch = useDispatch();
  const shipments = useSelector(state => {
    return state.shipments;
  });
  useEffect(() => {
    dispatch(getShipments());
  }, []);
  return (
    <div className="container-fluid p-0">
      <Header {...props} />
      <div className="d-flex">
        <Sidebar {...props} />
        <div className="content">
          <OverView shipments={shipments}/>
        </div>
      </div>
    </div>
  );
};

export default OverviewContainer;

