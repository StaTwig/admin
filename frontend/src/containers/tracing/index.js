import React, { useEffect } from "react";
import Tracing from '../../components/tracing';
import Header from '../../shared/header';
import Sidebar from '../../shared/sidebarMenu';
import {useDispatch, useSelector} from "react-redux";
import {trackShipment} from "../../actions/shipmentActions";

const TracingContainer = props => {
  const dispatch = useDispatch();

  const shipments = useSelector(state => {
    return state.trackShipment;
  });
  useEffect(() => {
    dispatch(trackShipment(props.match.params.id));

  }, []);
  return (
    <div className="container-fluid p-0">
      <Header {...props} />
      <div className="d-flex">
        <Sidebar {...props} />
        <div className="content">
          <Tracing shipments={shipments}/>
        </div>
      </div>
    </div>
  );
};

export default TracingContainer;

