import React, { useState, useEffect, Suspense } from "react";
import { useDispatch } from "react-redux";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";
import "./style.scss";
import DashBar from "../../shared/dashbar/index";
import {
  getProductDetailsByWarehouseId,
  getAllWarehouses,
  getShipmentIds,
} from "../../actions/inventoryActions";
import { turnOn, turnOff } from "../../actions/spinnerActions";
import { getViewShipment } from "../../actions/shipmentActions";
import { useTranslation } from 'react-i18next';

const DashBoard = React.lazy(() => import("../../components/dashboard"));

const DashBoardContainer = (props) => {
  const { t, i18n } = useTranslation();
  const [dashVisible, setDashVisible] = useState(false);
  const [content, setContent] = useState(true);
  const [dashBarData, setDashBarData] = useState({});
  const [wareHouses, setWareHouses] = useState([]);
  const [shipmentIds, setShipmentIds] = useState([]);
  const [warehouseArr, setWarehouseArr] = useState([]);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  // const user = useSelector((state) => {
  //   return state.user;
  // });

  useEffect(() => {
    (async () => {
      // const warehouse = await getWarehouseByOrgId(user?.organisationId);
      const warehouse = await getAllWarehouses();
      setWareHouses(warehouse.data);
      const shipments = await getShipmentIds();
      setShipmentIds(shipments);
    })();
  }, []);

  const onSearchClick = async (warehouseId) => {
    dispatch(turnOn());
    let result;
    if (!visible) result = await getProductDetailsByWarehouseId(warehouseId);
    else result = await dispatch(getViewShipment(warehouseId));
    setDashBarData(result);

    if (result?.warehouse || result?.id) {
      setDashVisible(true);
      setContent(true);
    }
    dispatch(turnOff());
  };

  const onSearchWareHouse = async (warehouseId) => {
    dispatch(turnOn());
    let result;
    if (!visible) result = await getProductDetailsByWarehouseId(warehouseId);
    else result = await dispatch(getViewShipment(warehouseId));

    setDashBarData(result);
    dispatch(turnOff());
  };

  return (
    <div className='container-fluid p-0'>
      <Header {...props} t={t}/>
      <div className='d-flex'>
        <Sidebar {...props} t={t} />
        <Suspense fallback={<div>Loading ...</div>}>
          <div className='content'>
            <DashBoard
              {...props}
              dashVisible={dashVisible}
              setDashVisible={setDashVisible}
              visible={visible}
              setVisible={setVisible}
              content={content}
              setContent={setContent}
              onSearchClick={onSearchClick}
              warehouseLocation={dashBarData?.warehouse?.warehouseLocation}
              warehouseArr={warehouseArr}
              shipment={dashBarData}
              setWarehouseArr={setWarehouseArr}
              setDashBarData={setDashBarData}
              warehouses={wareHouses}
              shipmentIds={shipmentIds}
              t={t}
              lang={i18n.resolvedLanguage}
            />
          </div>
          {dashVisible && (
            <DashBar
              {...props}
              onSearchWareHouse={onSearchWareHouse}
              setDashVisible={setDashVisible}
              content={content}
              visible={visible}
              setVisible={setVisible}
              setContent={setContent}
              dashBarData={dashBarData}
              setDashBarData={setDashBarData}
              onWarehouseSelect={onSearchClick}
              warehouseArr={warehouseArr}
              setWarehouseArr={setWarehouseArr}
              warehouses={wareHouses}
              shipmentIds={shipmentIds}
              t={t}
            />
          )}
        </Suspense>
      </div>
    </div>
  );
};

export default DashBoardContainer;
