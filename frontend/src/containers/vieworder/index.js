import React, { useEffect, useState } from "react";
import ViewOrder from "../../components/vieworder";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";
import { useDispatch } from "react-redux";
import { getOrder } from "../../actions/poActions";
import { useTranslation } from 'react-i18next';

const ViewOrderContainer = (props) => {
const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const [order, setOrder] = useState([]);
  const { id } = props.match.params;

  useEffect(() => {
    (async () => {
      const results = await dispatch(getOrder(id));
      setOrder(results.poDetails[0]);
    })();
  }, []);

  return (
    <div className='container-fluid p-0'>
      <Header {...props} t={t}/>
      <div className='d-flex'>
        <Sidebar {...props} t={t}/>
        <div className='content'>
          <ViewOrder order={order} id={id} {...props} t={t} />
        </div>
      </div>
    </div>
  );
};

export default ViewOrderContainer;
