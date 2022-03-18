import React, { useEffect, useState } from "react";
import ReviewOrder from "../../components/revieworder";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";
import { useDispatch } from "react-redux";
import { getOrder } from "../../actions/poActions";
import { useTranslation } from "react-i18next";

const ReviewOrderContainer = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [order, setOrder] = useState([]);
  const { id } = props.match.params;
  const evTypep = window.performance.getEntriesByType("navigation")[0];
  if (evTypep && evTypep.type === "reload") window.location.href = "orders";
  useEffect(() => {
    dispatch(getOrder(id)).then((results) => {
      setOrder(results);
    });
  }, [dispatch, id]);

  return (
    <div className='container-fluid p-0'>
      <Header {...props} t={t} />
      <div className='d-flex'>
        <Sidebar {...props} t={t} />
        <div className='content'>
          <ReviewOrder order={order} id={id} t={t} {...props} />
        </div>
      </div>
    </div>
  );
};

export default ReviewOrderContainer;
