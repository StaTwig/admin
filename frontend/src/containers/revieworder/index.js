import React, { useEffect, useState } from 'react';
import ReviewOrder from '../../components/revieworder';
import Header from '../../shared/header';
import Sidebar from '../../shared/sidebarMenu';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder } from '../../actions/poActions';

const ReviewOrderContainer = props => {
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
    <div className="container-fluid p-0">
      <Header {...props} />
      <div className="d-flex">
        <Sidebar {...props} />
        <div className="content">
          <ReviewOrder
            order={order}
            id={id}
            {...props}
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewOrderContainer;
