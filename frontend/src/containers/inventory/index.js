import React, { useEffect, useState } from "react";
import Inventory from '../../components/inventory';
import Header from '../../shared/header';
import Sidebar from '../../shared/sidebarMenu';
import { useDispatch, useSelector } from "react-redux";
import { getInventories, resetInventories, getInventoryDetails, getTransactionFilterList } from "../../actions/inventoryActions";

const InventoryContainer = props => {
  const dispatch = useDispatch();

  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(5);
  const [inventoryFilterData, setInventoryFilterData] = useState([]);
  const [inventoryList, setInventoryList] = useState([]);

  const [productNameData, setProductNameData] = useState([]);
  const [productNameReplicaData, setProductNameReplicaData] = useState([]);
  const [showDropDownForProductName, setShowDropDownForProductName] = useState(false);

  const [categoryData, setCategoryData] = useState([]);
  const [categoryReplicaData, setCategoryReplicaData] = useState([]);
  const [showDropDownForCategory, setShowDropDownForCategory] = useState(false);

  const [queryKey, setQueryKey] = useState("");
  const [queryValue, setQueryValue] = useState("");


  // const [loadMore, setLoadMore] = useState(true);

  const inventories = useSelector(state => {
    return state.inventories;
  });
  const inventoryDetails = useSelector(state => {
    return state.inventoryDetails;
  });

  const inventoriesCount = useSelector(state => {
    return state.inventoriesCount;
  });

  const prepareDropdownData = (data) => {
    let finalDropDownData = [];
    data?.forEach(item => {
      let obj = {};
      obj['key'] = item.id ? item['id'] : item.toLowerCase();
      obj['value'] = item.name ? item['name'] : item;
      obj['checked'] = false;
      finalDropDownData.push(obj);
    });
    return finalDropDownData;
  }

  const getUniqueStringFromOrgListForGivenType = (data, ...args) => {
    console.log(args);
    const availableList = data?.map(item => args.length > 1 ? (item && item.hasOwnProperty(args[0]) && item[args[0]].hasOwnProperty(args[1])) && item[args[0]][args[1]] : item[args[0]]).filter(item => item);
    return [...new Set(availableList)];
  };

  useEffect(() => {
    if (queryKey && queryValue) {
      if (queryValue === 'productName') {
        dispatch(getInventories(0, 10, queryKey, '', '', '', ''));
      } else if (queryValue === 'category') {
        dispatch(getInventories(0, 10, '', queryKey, '', '', ''));
      } 
    } else {
      async function fetchData() {

        async function fetchData2() {
          const inventoryFilterDataRes = await getTransactionFilterList();
          setInventoryFilterData(inventoryFilterDataRes);
        };

        dispatch(resetInventories());
        const value = await dispatch(getInventories(0, 10, "", "", "", "", ""));
        setInventoryList(value.inventoryRecords); //(skip, limit, productName, productCategory, status)
        fetchData2();
      }
      fetchData();
    }
  }, [queryKey]);

  useEffect(() => {
    if (inventoryList && inventoryList.length > 0) {
      setProductNameData([...prepareDropdownData(getUniqueStringFromOrgListForGivenType(inventoryList, 'productDetails', 'name'))]);
      setProductNameReplicaData([...prepareDropdownData(getUniqueStringFromOrgListForGivenType(inventoryList, 'productDetails', 'name'))]);

      setCategoryData([...prepareDropdownData(getUniqueStringFromOrgListForGivenType(inventoryList, 'productDetails', 'type'))]);
      setCategoryReplicaData([...prepareDropdownData(getUniqueStringFromOrgListForGivenType(inventoryList, 'productDetails', 'type'))]);
    } 
  }, [inventoryList]);

  console.log(productNameData);


  // const onLoadMore = async () => {
  //   const newSkip = skip + 5;
  //   setSkip(newSkip);
  //   const results = await dispatch(getInventories(skip, limit));
  //   if (results === 0) {
  //     setLoadMore(false);
  //   }
  // };

  // const onLoadMore = async (isInc) => {
  //   const newSkip = isInc ? skip + 5 : skip - 5;
  //   setSkip(newSkip);
  //   dispatch(getInventories(newSkip, limit, ""));
  // };

  const setCheckedAndUnCheckedOfProvidedList = (typeOriginalData, index) => {
    return typeOriginalData.map((item, i) => {
      if (i === index) {
        item.checked = !item.checked;
      } else {
        item.checked = false
      }
      return item;
    });
  }

  const onSelectionOfDropdownValue = (index, type, value) => {
    if (type === 'productName') {
      setProductNameData([...setCheckedAndUnCheckedOfProvidedList(productNameData, index)]);
      setQueryKeyAndQueryValue(setQueryKey, value, setQueryValue, type, productNameData, index);
      markOpenedDrownsToFalse(setShowDropDownForProductName, setShowDropDownForCategory);
    } else if (type === 'category') {
      setCategoryData([...setCheckedAndUnCheckedOfProvidedList(categoryData, index)]);
      setQueryKeyAndQueryValue(setQueryKey, value, setQueryValue, type, categoryData, index);
      markOpenedDrownsToFalse(setShowDropDownForProductName, setShowDropDownForCategory);
    }
  };

  const markOpenedDrownsToFalse = (setShowDropDownForAccountStatus, setShowFilterDropDown, setShowDropDownForRole) => {
    setShowDropDownForProductName(false);
    setShowDropDownForCategory(false);
  }

  const filterListForSearchInput = (data, searchInput) => data.filter(item => {
    return item.value.toLowerCase().includes(searchInput.toLowerCase());
  });

  const onChangeOfSearchForFilterInput = (searchInput, type) => {
    console.log(searchInput);
    if (type === 'productName' && searchInput) {
      setProductNameData(filterListForSearchInput(productNameData, searchInput));
    } else if (type === 'category' && searchInput) {
      setCategoryData(filterListForSearchInput(categoryData, searchInput))
    } else {
      if (type === 'productName') {
        setProductNameData([...productNameReplicaData]);
      } else if (type === 'category') {
        setCategoryData([...categoryReplicaData]);
      } 
    }
  };

  return (
    <div className="container-fluid p-0">
      <Header {...props} />
      <div className="d-flex">
        <Sidebar {...props} />
        <div className="content">
          <Inventory
            skip={skip}
            inventoriesCount={inventoriesCount}
            inventoryDetails={inventories}
            inventoryFilterData={inventoryFilterData}
            productNameData={productNameData}
            showDropDownForProductName={showDropDownForProductName}
            setShowDropDownForProductName={setShowDropDownForProductName}
            onChangeOfSearchForFilterInput={onChangeOfSearchForFilterInput}
            onSelectionOfDropdownValue={onSelectionOfDropdownValue}
            categoryData={categoryData}
            showDropDownForCategory={showDropDownForCategory}
            setShowDropDownForCategory={setShowDropDownForCategory}
            {...props}
          />
        </div>
      </div>
    </div>
  );
};

export default InventoryContainer;

function setQueryKeyAndQueryValue(setQueryValue, value, setQueryType, type, data, index) {
  if(data[index].checked) {
    setQueryValue(value);
    setQueryType(type);
  } else {
    setQueryValue();
    setQueryType();
  }
}
