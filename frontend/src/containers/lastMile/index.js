import { useDispatch} from 'react-redux';
import React, { useState, useEffect, useSelector } from 'react';
import LastMile from '../../components/lastMile';
 import Header from '../../shared/header';
import Sidebar from '../../shared/sidebarMenu';
import { getTransactionFilterList} from "../../actions/inventoryActions";




const LastMileContainer = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      dispatch(getLastMile(0, 10, "", "", "", "", "")); //(skip, limit, product, country, state, district, location)
  
    })();
  }, []);


  return (
    <div className="container-fluid p-0">
      <Header {...props} />
      <div className="d-flex">
        <Sidebar {...props} />
        <div className="content">
          <LastMile {...props}/>
        </div>
      </div>
    </div>
  );
};

export default LastMileContainer;

