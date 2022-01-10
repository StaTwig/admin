import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OverView from "../../components/overview";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";
import { getShipments } from "../../actions/shipmentActions";
import { getInventories } from "../../actions/inventoryActions";
import { useTranslation } from 'react-i18next';

const OverviewContainer = (props) => {
const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const shipments = useSelector((state) => {
    return state.shipments;
  });
  const inventories = useSelector((state) => {
    return state.inventories;
  });
  const shipmentsCount = useSelector((state) => {
    return state.shipmentsCount;
  });
  const inventoriesCount = useSelector((state) => {
    return state.inventoriesCount;
  });

  useEffect(() => {
    dispatch(getShipments());
    dispatch(getInventories());
  }, [dispatch]);
  return (
    <div className='container-fluid p-0'>
      <Header {...props} t={t} />
      <div className='d-flex'>
        <Sidebar {...props} t={t} />
        <div className='content'>
          <OverView
            shipments={shipments}
            inventories={inventories}
            shipmentsCount={shipmentsCount}
            inventoriesCount={inventoriesCount}
            t={t}
            {...props}
          />
        </div>
      </div>
    </div>
  );
};

export default OverviewContainer;
