import React, { useState, useEffect } from "react";
import Users from "../../components/users";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrgUsers,
  getPermissions,
  addOrgUser,
  activateOrgUser,
  deactivateOrgUser,
  unaffiliateUser,
} from "../../actions/organisationActions";
import { turnOn, turnOff } from "../../actions/spinnerActions";
import Modal from "../../shared/modal";
import SuccessPopUp from "../../shared/PopUp/successPopUp";

const UserContainer = (props) => {
  const [showModals, setShowModals] = useState(false);
  const closeModals = () => setShowModals(false);
  const [message, setMessage] = useState("");
  const [successmessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const [params, setParams] = useState("");
  const [paramType, setParamType] = useState("");

  const [roleData, setRoleData] = useState([]);
  const [roleReplicaData, setRoleReplicaData] = useState([]);

  const [accountStatusData, setAccountStatusData] = useState([]);
  const [accountStatusReplicaData, setAccountStatusReplicaData] = useState([]);

  const [showDropDownForRole, setShowDropDownForRole] = useState(false);
  const [calenderFilterJsonData, setCalenderFilterJsonData] = useState([]);

  const [showFilterDropDown, setShowFilterDropDown] = useState(false);
  const [showDropDownForAccountStatus, setShowDropDownForAccountStatus] = useState(false);
  const [filterDropDownValue, setFilterDropDownValue] = useState('');

  const [userStateList, setUsersStateList] = useState([]);

  const requestWithParams = (params, dispatch, queryKey) => {
    const paramValue = `${queryKey}=${params}`;
    dispatch(getOrgUsers(paramValue));
  }

  useEffect(() => {
    if (params && paramType) {
      if (paramType === 'role') {
        requestWithParams(params, dispatch, 'role');
      } else if (paramType === 'accountStatus') {
        requestWithParams(params, dispatch, 'status');
      } else if (paramType === 'dateRange') {
        requestWithParams(params, dispatch, 'creationFilter=true&dateRange');
      }
    } else {
      async function fetchData() {
        const originalList = await dispatch(getOrgUsers());
        localStorage.setItem('userData', JSON.stringify(originalList));
      }
      fetchData();
      dispatch(getPermissions());
    }
  }, [params]);

  const usersList = useSelector((state) => {
    return state.organisation.users;
  });

  const permissions = useSelector((state) => {
    return state.organisation.permissions;
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
    const availableList = data?.map(item => args.length > 1 ? (item && item.hasOwnProperty(args[0]) && item[args[0]].hasOwnProperty(args[1])) && item[args[0]][args[1]] : item[args[0]]).filter(item => item);
    return [...new Set(availableList)];
  };

  useEffect(() => {
    const originalList = JSON.parse(localStorage.getItem('userData'));

    setRoleData([...prepareDropdownData(getUniqueStringFromOrgListForGivenType(originalList, 'role'))]);
    setRoleReplicaData([...prepareDropdownData(getUniqueStringFromOrgListForGivenType(originalList, 'role'))]);

    setAccountStatusData([...prepareDropdownData(getUniqueStringFromOrgListForGivenType(originalList, 'accountStatus'))]);
    setAccountStatusReplicaData([...prepareDropdownData(getUniqueStringFromOrgListForGivenType(originalList, 'accountStatus'))]);

    setCalenderFilterJsonData([
    { key: 'today', value: 'Today', checked: false },
    { key: 'week', value: 'This week', checked: false },
    { key: 'month', value: 'This Month', checked: false },
    { key: 'lastThreeMonths', value: 'Last 3 Months', checked: false },
    { key: 'lastSixMonths', value: 'Last 6 Months', checked: false },
    { key: 'year', value: 'This Year', checked: false }]);
  }, []);


  const activateUser = async (data) => {
    dispatch(turnOn());
    const result = await activateOrgUser(data);
    if (result.status == 200) {
      setSuccessMessage("This User has been Activated successfully!");
    } else {
      setError(result.data.data.message);
    }
    dispatch(turnOff());
  };

  const deactivateUser = async (data) => {
    dispatch(turnOn());
    const result = await deactivateOrgUser(data);
    if (result.status == 200) {
      setSuccessMessage("This User has been Deactivated successfully!");
    } else {
      setError(result.data.data.message);
    }
    dispatch(turnOff());
  };

  const addUser = async (data) => {
    dispatch(turnOn());
    const result = await addOrgUser(data);
    if (result.status === 200) {
      setMessage(result.message);
      props.history.push(`/users`);
    } else {
      setError(result.message);
    }
    dispatch(turnOff());
  };

  const unaffiliate = async (data) => {
    dispatch(turnOn());
    const result = await unaffiliateUser(data);
    if (result.status === 200) {
      setSuccessMessage("This User has been UnAffliated successfully!");
      setShowModals(true);
    } else {
      setError(result.data.data.message);
    }
    dispatch(turnOff());
  };


  const filterListForSearchInput = (data, searchInput) => data.filter(item => {
    return item.value.toLowerCase().includes(searchInput.toLowerCase());
  });


  const onChangeOfSearchForFilterInput = (searchInput, type) => {
    if (type === 'role' && searchInput) {
      setRoleData(filterListForSearchInput(roleData, searchInput));
    } else if (type === 'accountStatus' && searchInput) {
      setAccountStatusData(filterListForSearchInput(accountStatusData, searchInput))
    } else {
      if (type === 'role') {
        setRoleData([...roleReplicaData]);
      } else if (type === 'accountStatus') {
        setAccountStatusData([...accountStatusReplicaData]);
      }
    }
  }

  const setCheckedAndUnCheckedOfProvidedList = (typeOriginalData, index) => {
    return typeOriginalData.map((item, i) => {
      if (i === index) {
        item.checked = true;
      } else {
        item.checked = false
      }
      return item;
    });
  }

  const onSelectionOfDropdownValue = (index, type, value) => {
    if (type === 'role') {
      setRoleData([...setCheckedAndUnCheckedOfProvidedList(roleData, index)]);
      setParams(value);
      setParamType(type);
      markOpenedDrownsToFalse(setShowDropDownForAccountStatus, setShowFilterDropDown, setShowDropDownForRole);
    } else if (type === 'accountStatus') {
      setAccountStatusData([...setCheckedAndUnCheckedOfProvidedList(accountStatusData, index)]);
      setParams(value);
      setParamType(type);
      markOpenedDrownsToFalse(setShowDropDownForAccountStatus, setShowFilterDropDown, setShowDropDownForRole);
    } else if (type === 'dateRange') {
      setCalenderFilterJsonData([...setCheckedAndUnCheckedOfProvidedList(calenderFilterJsonData, index)]);
      setParams(value);
      setParamType(type);
      markOpenedDrownsToFalse(setShowDropDownForAccountStatus, setShowFilterDropDown, setShowDropDownForRole);
    }
  };

  const markOpenedDrownsToFalse = (setShowDropDownForAccountStatus, setShowFilterDropDown, setShowDropDownForRole) => {
    setShowDropDownForAccountStatus(false);
    setShowFilterDropDown(false);
    setShowDropDownForRole(false);
  }

  const filterOrganisationListBasedOnTopPanelSearchInput = (inputValue, type) => {
    if (type === 'searchBarTopPanel' && inputValue.length > 0) {
      const filteredList = usersList.filter(item => {
        return `${item.firstName}${item.lastName}`.toLowerCase().includes(inputValue.toLowerCase());
      });
      setUsersStateList([...filteredList]);
    } else {
      setUsersStateList([...usersList]);
    }
  };

  console.log('setCalenderFilterJsonData:', calenderFilterJsonData);

  return (
    <div className="container-fluid p-0">
      <Header {...props} />
      <div className="d-flex">
        <Sidebar {...props} />
        <div className="content">
          <div className="text-center text text-success">{message}</div>
          <div className="text-center text text-danger">{error}</div>

          {showModals && (
            <Modal
              close={closeModals}
              // title="ADD NEW USER"
              // size="modal-sm" //for other size's use `modal-lg, modal-md, modal-sm`
              buttonclassName="btn-orange"
            >
              <SuccessPopUp onHide={closeModals} message={successmessage} />
            </Modal>
          )}
          <Users
            {...props}
            usersList={usersList}
            activateUser={activateUser}
            deactivateUser={deactivateUser}
            showModals={showModals}
            setShowModals={setShowModals}
            permissions={permissions}
            addUser={addUser}
            unaffiliate={unaffiliate}
            roleData={roleData}
            accountStatusData={accountStatusData}
            setShowDropDownForAccountStatus={setShowDropDownForAccountStatus}
            setShowDropDownForRole={setShowDropDownForRole}
            showDropDownForAccountStatus={showDropDownForAccountStatus}
            showDropDownForRole={showDropDownForRole}
            filterOrganisationListBasedOnTopPanelSearchInput={filterOrganisationListBasedOnTopPanelSearchInput}
            onChangeOfSearchForFilterInput={onChangeOfSearchForFilterInput}
            onSelectionOfDropdownValue={onSelectionOfDropdownValue}
            showFilterDropDown={showFilterDropDown}
            setShowFilterDropDown={setShowFilterDropDown}
            filterDropDownValue={filterDropDownValue}
            calenderFilterJsonData={calenderFilterJsonData}
          />
        </div>
      </div>
    </div>
  );
};

export default UserContainer;
