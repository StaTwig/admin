import React, { useState, useEffect } from "react";
import Organisations from "../../components/organisation";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { getOrgs, updateOrg } from "../../actions/organisationActions";
import { turnOn, turnOff } from "../../actions/spinnerActions";
import Modal from "../../shared/modal";
import SuccessPopUp from "../../shared/PopUp/successPopUp";

const OrganisationContainer = (props) => {
  if ((props.user.type || props.user.organisationType) != "CENTRAL_AUTHORITY") {
    props.history.push(`/overview`);
  }
  const [showModals, setShowModals] = useState(false);
  const closeModals = () => setShowModals(false);
  const [message, setMessage] = useState("");
  const [successmessage, setSuccessMessage] = useState("");
  const [queryKey, setQueryKey] = useState("");
  const [queryValue, setQueryValue] = useState("");
  const [error, setError] = useState("");

  const [countryData, setCountryData] = useState([]);
  const [replicaCountryData, setReplicaCountryData] = useState([]);

  const [regionData, setRegionData] = useState([]);
  const [replicaRegionData, setReplicaRegionData] = useState([]);

  const [statusData, setStatusData] = useState([]);
  const [replicaStatusData, setReplicaStatusData] = useState([]);

  const [orgTypeData, setOrgTypeData] = useState([]);
  const [replicaOrgTypeData, setReplicaOrgTypeData] = useState([]);

  const [organisationList, setOrganisationList] = useState([]);

  const [showDropDownForType, setShowDropDownForType] = useState(false);
  const [showDropDownForCreatedOn, setShowDropDownForCreatedOn] = useState(false);
  const [showDropDownForStatus, setShowDropDownForStatus] = useState(false);
  const [showDropDownForCountry, setShowDropDownForCountry] = useState(false);
  const [showDropDownForRegion, setShowDropDownForRegion] = useState(false);

  const dispatch = useDispatch();

  const requestWithParams = (params, dispatch, queryKey) => {
    const paramValue = `${queryKey}=${params}`;
    dispatch(getOrgs(paramValue));
  }

  useEffect(() => {
    if (queryKey && queryValue) {
      if (queryValue === 'orgType') {
        requestWithParams(queryKey, dispatch, 'orgType');
      } else if (queryValue === 'country') {
        requestWithParams(queryKey, dispatch, 'country');
      } else if (queryValue === 'region') {
        requestWithParams(queryKey, dispatch, 'region');
      } else if (queryValue === 'status') {
        requestWithParams(queryKey, dispatch, 'status');
      }
    } else {
      async function fetchData() {
        setOrganisationList(await dispatch(getOrgs()));
      }
      fetchData();
    }
  }, [queryKey]);

  const orgList = useSelector((state) => {
    return state.organisation.list;
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
    if (organisationList.length > 0) {
      setCountryData([...prepareDropdownData(getUniqueStringFromOrgListForGivenType(organisationList, 'country', 'countryName'))]);
      setReplicaCountryData([...prepareDropdownData(getUniqueStringFromOrgListForGivenType(organisationList, 'country', 'countryName'))]);

      setRegionData([...prepareDropdownData(getUniqueStringFromOrgListForGivenType(organisationList, 'region', 'regionName'))]);
      setReplicaRegionData([...prepareDropdownData(getUniqueStringFromOrgListForGivenType(organisationList, 'region', 'regionName'))]);

      setStatusData([...prepareDropdownData(getUniqueStringFromOrgListForGivenType(organisationList, 'status'))]);
      setReplicaStatusData([...prepareDropdownData(getUniqueStringFromOrgListForGivenType(organisationList, 'status'))]);

      setOrgTypeData([...prepareDropdownData(getUniqueStringFromOrgListForGivenType(organisationList, 'type'))]);
      setReplicaOrgTypeData([...prepareDropdownData(getUniqueStringFromOrgListForGivenType(organisationList, 'type'))]);
    }
  }, [organisationList]);

  const updateOrgs = async (data) => {
    dispatch(turnOn());
    const result = await updateOrg(data.org ? data.org : data);
    if (result.status == 200) {
      setSuccessMessage("This organisation " + data.org ? data.status : data.status.toLowerCase() + "!");
    } else {
      setError(result.data.data.message);
    }
    dispatch(turnOff());
  };

  // const addOrgs = async (data) => {
  //   dispatch(turnOn());
  //   const result = await addOrg(data);
  //   if (result.status === 200) {
  //     setSuccessMessage("This organisation added!");
  //     setMessage(result.message);
  //   } else {
  //     setError(result.message);
  //   }
  //   dispatch(turnOff());
  // };

  const filterOrganisationListBasedOnTopPanelSearchInput = (inputValue, type) => {
    console.log("Search Bar:", inputValue)
    const value = inputValue;
    if (type === 'searchBarTopPanel' && inputValue.length > 0) {
      const filteredList = orgList.filter(item => {
        return item.name.toLowerCase().includes(inputValue.toLowerCase()) || item.primaryContactId.toLowerCase().includes(inputValue.toLowerCase())
      });
      console.log("Filtered List", filteredList);
      setOrganisationList([...filteredList]);
    } else {
      setOrganisationList([...orgList]);
    }
  };

  const filterListForSearchInput = (data, searchInput) => data.filter(item => {
    return item.value.toLowerCase().includes(searchInput.toLowerCase());
  });


  const onChangeOfSearchForFilterInput = (searchInput, type) => {
    const duplicateOrgType = orgTypeData;
    if (type === 'orgType' && searchInput) {
      setOrgTypeData(filterListForSearchInput(duplicateOrgType, searchInput));
    } else if (type === 'status' && searchInput) {
      setStatusData(filterListForSearchInput(statusData, searchInput))
    } else if (type === 'country' && searchInput) {
      setCountryData(filterListForSearchInput(countryData, searchInput))
    } else if (type === 'region' && searchInput) {
      setRegionData(filterListForSearchInput(regionData, searchInput))
    } else {
      if (type === 'orgType') {
        setOrgTypeData([...replicaOrgTypeData]);
      } else if (type === 'status') {
        setStatusData([...replicaStatusData]);
      } else if (type === 'country') {
        setCountryData([...replicaCountryData]);
      } else if (type === 'region') {
        setRegionData([...replicaRegionData]);
      }
    }
  }

  const setCheckedAndUnCheckedOfProvidedList = (typeOriginalData, index) => {
    return typeOriginalData.map((item, i) => {
      if (i === index) {
        item.checked = !item.checked;
      } else {
        item.checked = false;
      }
      return item;
    });
  }

  const onSelectionOfDropdownValue = (index, type, value) => {
    console.log("Type:", type);
    if (type === 'orgType') {
      setOrgTypeData([...setCheckedAndUnCheckedOfProvidedList(orgTypeData, index)]);
      setQueryKeyAndQueryValue(setQueryKey, value, setQueryValue, type, orgTypeData, index);
      markOpenedDrownsToFalse(setShowDropDownForRegion, setShowDropDownForCreatedOn, setShowDropDownForStatus, setShowDropDownForType, setShowDropDownForCountry);
    } else if (type === 'country') {
      setCountryData([...setCheckedAndUnCheckedOfProvidedList(countryData, index)]);
      setQueryKeyAndQueryValue(setQueryKey, value, setQueryValue, type, countryData, index);
      markOpenedDrownsToFalse(setShowDropDownForRegion, setShowDropDownForCreatedOn, setShowDropDownForStatus, setShowDropDownForType, setShowDropDownForCountry);
    } else if (type === 'region') {
      setRegionData([...setCheckedAndUnCheckedOfProvidedList(regionData, index)]);
      setQueryKeyAndQueryValue(setQueryKey, value, setQueryValue, type, regionData, index);
      markOpenedDrownsToFalse(setShowDropDownForRegion, setShowDropDownForCreatedOn, setShowDropDownForStatus, setShowDropDownForType, setShowDropDownForCountry);
    } else if (type === 'status') {
      setStatusData([...setCheckedAndUnCheckedOfProvidedList(statusData, index)]);
      setQueryKeyAndQueryValue(setQueryKey, value, setQueryValue, type, statusData, index);
      markOpenedDrownsToFalse(setShowDropDownForRegion, setShowDropDownForCreatedOn, setShowDropDownForStatus, setShowDropDownForType, setShowDropDownForCountry);
    } else if (type === 'createdOn') {
      // setStatusData([...setCheckedAndUnCheckedOfProvidedList(statusData, index)]);
      setShowDropDownForCreatedOn(!showDropDownForCreatedOn);
      markOpenedDrownsToFalse(setShowDropDownForRegion, setShowDropDownForCreatedOn, setShowDropDownForStatus, setShowDropDownForType, setShowDropDownForCountry);
    } else {
      setQueryKey("");
      setQueryValue("");
      markOpenedDrownsToFalse(setShowDropDownForRegion, setShowDropDownForCreatedOn, setShowDropDownForStatus, setShowDropDownForType, setShowDropDownForCountry);
      setOrgTypeData([...setCheckedAndUnCheckedOfProvidedList(orgTypeData)]);
    }
  };

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
          <Organisations
            {...props}
            organisationList={organisationList}
            modifyOrg={updateOrgs}
            showModals={showModals}
            setShowModals={setShowModals}
            countryData={countryData}
            orgTypeData={orgTypeData}
            regionData={regionData}
            statusData={statusData}
            filterOrganisationListBasedOnTopPanelSearchInput={filterOrganisationListBasedOnTopPanelSearchInput}
            onChangeOfSearchForFilterInput={onChangeOfSearchForFilterInput}
            onSelectionOfDropdownValue={onSelectionOfDropdownValue}
            showDropDownForType={showDropDownForType}
            showDropDownForCreatedOn={showDropDownForCreatedOn}
            showDropDownForCountry={showDropDownForCountry}
            showDropDownForRegion={showDropDownForRegion}
            showDropDownForStatus={showDropDownForStatus}
            setShowDropDownForType={setShowDropDownForType}
            setShowDropDownForCountry={setShowDropDownForCountry}
            setShowDropDownForRegion={setShowDropDownForRegion}
            setShowDropDownForStatus={setShowDropDownForStatus}
            setShowDropDownForCreatedOn={setShowDropDownForCreatedOn}
          // addOrg={addOrgs}
          />
        </div>
      </div>
    </div>
  );
};

export default OrganisationContainer;

function setQueryKeyAndQueryValue(setQueryValue, value, setQueryType, type, data, index) {
  if (data[index].checked) {
    setQueryValue(value);
    setQueryType(type);
  } else {
    setQueryValue();
    setQueryType();
  }
}

function markOpenedDrownsToFalse(setShowDropDownForRegion, setShowDropDownForCreatedOn, setShowDropDownForStatus, setShowDropDownForType, setShowDropDownForCountry) {
  setShowDropDownForRegion(false);
  setShowDropDownForCreatedOn(false);
  setShowDropDownForStatus(false);
  setShowDropDownForType(false);
  setShowDropDownForCountry(false);
}

