import React from "react";
import TrackandTrace from '../../components/trackAndTrace';
import Header from '../../shared/header';
import Sidebar from '../../shared/sidebarMenu';
import {useSelector} from "react-redux";


const TrackandTraceContainer = props => {
  const inventories = useSelector(state => {
    return state.inventories;
  });

  return (
    <div className="container-fluid p-0">
      <Header {...props} />
      <div className="d-flex">
        <Sidebar {...props} />
        <div className="content">
          <TrackandTrace inventories={inventories}/>
        </div>
      </div>
    </div>
  );
};

export default TrackandTraceContainer;

