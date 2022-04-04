import React, { useEffect, useState } from "react";
import Orders from "../../components/orders";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";
import { useDispatch } from "react-redux";
import { getPOs, resetPOs } from "../../actions/poActions";
import { useTranslation } from "react-i18next";

const OrdersContainer = (props) => {
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  useEffect(() => {
    (async () => {
      const result = await dispatch(getPOs());
      setOrders(result);

      return () => dispatch(resetPOs());
    })();
  }, [dispatch]);

  return (
    <div className='container-fluid p-0'>
      <Header {...props} t={t} />
      <div className='d-flex'>
        <Sidebar {...props} t={t} />
        <div className='content'>
          <Orders orders={orders} setOrders={setOrders} {...props} i18n={i18n} t={t} />
        </div>
      </div>
    </div>
  );
};

export default OrdersContainer;
