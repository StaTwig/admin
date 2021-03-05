import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import DashBoard from '../../components/dashboard';
import Header from '../../shared/header';
import Sidebar from '../../shared/sidebarMenu';
import './style.scss';
import DashBar from '../../shared/dashbar/index';
import { getProductDetailsByWarehouseId} from '../../actions/inventoryActions';
import { turnOn, turnOff } from '../../actions/spinnerActions';
const DashBoardContainer = props => {
  const [dashVisible, setDashVisible] = useState(false);
  const [content, setContent] = useState(true);
  const [ dashBarData, setDashBarData ] = useState({});
  const dispatch = useDispatch();
  const onSearchClick = async (warehouseId) => {
    dispatch(turnOn());
    const result = await getProductDetailsByWarehouseId(warehouseId);
    console.log(result);
    setDashBarData(result);
    setDashVisible(true);
    setContent(true);
    dispatch(turnOff());
  }

  const onSearchWareHouse = async (warehouseId) => {
    dispatch(turnOn());
    const result = await getProductDetailsByWarehouseId(warehouseId);
    setDashBarData(result);
    dispatch(turnOff());
  }
  return (
    <div className="container-fluid p-0">
      <Header {...props} />
      <div className="d-flex">
        <Sidebar {...props} />
        <div className="content">
          <DashBoard
            {...props}
            dashVisible={dashVisible}
            setDashVisible={setDashVisible}
            content={content}
            setContent={setContent}
            onSearchClick={onSearchClick}
            warehouseLocation={dashBarData?.warehouse?.warehouseLocation}
          />
        </div>
        {dashVisible && (
          <DashBar
            {...props}
            onSearchWareHouse={onSearchWareHouse}
            setDashVisible={setDashVisible}
            content={content}
            setContent={setContent}
            dashBarData={dashBarData}
            setDashBarData={setDashBarData}
            onWarehouseSelect={onSearchClick}
          />
        )}
      </div>
    </div>
  );
};

export default DashBoardContainer;
