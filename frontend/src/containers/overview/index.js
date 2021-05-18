import React, { useEffect , useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import OverView from '../../components/overview';
import Header from '../../shared/header';
import Sidebar from '../../shared/sidebarMenu';
import {getShipments} from "../../actions/shipmentActions";
import {getShippingOrderIds} from "../../actions/shippingOrderAction";
import {getInventories} from "../../actions/inventoryActions";
import { getOrderIds} from "../../actions/poActions";


const OverviewContainer = props => {
  const dispatch = useDispatch();
  const shipments = useSelector(state => {
    return state.shipments;
  });
  const inventories = useSelector(state =>{
    return state.inventories;
  })
  const shipmentsCount= useSelector(state => {
    return state.shipmentsCount;
  });
  const inventoriesCount = useSelector(state => {
    return state.inventoriesCount;
  });

  const [orderIds, setOrderIds] = useState([]);
  const [shippingIds, setShippingIds] = useState([]);

  useEffect(() => {

    async function getIds(){
      const resultShippingIds = await getShippingOrderIds();
      const resultOrderIds = await getOrderIds();
      setOrderIds(resultOrderIds.map((so)=>so.id));
      setShippingIds(resultShippingIds.map((so)=>so.id));
    }

    getIds();
    dispatch(getShipments());
    dispatch(getInventories());
  }, []);
  return (
    <div className="container-fluid p-0">
      <Header {...props} orderIds={orderIds} shippingIds={shippingIds}/>
      <div className="d-flex">
        <Sidebar {...props} />
        <div className="content">
          <OverView shipments={shipments} inventories={inventories} shipmentsCount={shipmentsCount} inventoriesCount={inventoriesCount} {...props} />
        </div>
      </div>
    </div>
  );
};

export default OverviewContainer;

