import React, { useEffect, useState } from "react";
import ProductList from "../../components/productList";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";
import { useDispatch, useSelector } from "react-redux";
import {
  getInventories,
  resetInventories,
  getInventoryByBatchNumber,
} from "../../actions/inventoryActions";
import { useTranslation } from "react-i18next";

const ProductListContainer = (props) => {
  const { t } = useTranslation();
  const [skip, setSkip] = useState(5);
  const [limit] = useState(5);
  const [loadMore, setLoadMore] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetInventories());
    const { id } = props.match.params;
    if (id === "all") {
      dispatch(getInventories(0, 5));
    } else {
      dispatch(getInventoryByBatchNumber(id));
    }
  }, [dispatch, props.match.params]);

  const onLoadMore = async () => {
    const newSkip = skip + 5;
    setSkip(newSkip);
    const results = await dispatch(getInventories(skip, limit));
    if (results === 0) {
      setLoadMore(false);
    }
  };

  const inventories = useSelector((state) => {
    return state.inventories;
  });

  return (
    <div className='container-fluid p-0'>
      <Header {...props} t={t} />
      <div className='d-flex'>
        <Sidebar {...props} t={t} />
        <div className='content'>
          <ProductList
            inventories={inventories}
            loadMore={loadMore}
            onLoadMore={onLoadMore}
            t={t}
            {...props}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductListContainer;
