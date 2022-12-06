import React, { useEffect, useState } from "react";
import Inventory from "../../components/inventory";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";
import { useDispatch, useSelector } from "react-redux";
import {
  getInventories,
  resetInventories,
  getTransactionFilterList,
} from "../../actions/inventoryActions";
import { getProducts } from "../../actions/poActions";
import { useTranslation } from "react-i18next";

const InventoryContainer = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [skip, setSkip] = useState(0);
  const [inventoryFilterData, setInventoryFilterData] = useState([]);
  const [categories, setCategories] = useState([]);
  const inventories = useSelector((state) => {
    return state.inventories;
  });

  const inventoriesCount = useSelector((state) => {
    return state.inventoriesCount;
  });

  useEffect(() => {
    async function fetchData() {
      const inventoryFilterDataRes = await getTransactionFilterList();
      setInventoryFilterData(inventoryFilterDataRes);
      const result1 = await getProducts();
      const categoryArray = result1.map((product) => product.type);
      setCategories(
        categoryArray
          .filter((value, index, self) => self.indexOf(value) === index)
          .map((item) => {
            return {
              value: item,
              label: item,
            };
          })
      );
    }
    fetchData();
    dispatch(resetInventories());
    dispatch(getInventories(0, 10, "", "", "", "")); //(skip, limit, dateFilter, productName, productCategory, status)
  }, [dispatch]);

  return (
    <div className='container-fluid p-0'>
      <Header {...props} t={t} />
      <div className='d-flex'>
        <Sidebar {...props} t={t} />
        <div className='content'>
          <Inventory
            skip={skip}
            inventoriesCount={inventoriesCount}
            inventoryDetails={inventories}
            inventoryFilterData={inventoryFilterData}
            productCategories={categories}
            t={t}
            {...props}
          />
        </div>
      </div>
    </div>
  );
};

export default InventoryContainer;
