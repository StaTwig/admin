import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import UserDetails from "./userdetails";
import Modal from "../../shared/modal";
import NUModal from "./NUModal";
import sortIcon from '../../assets/icons/up-and-down-1.png'
import DropDownFilter from "../dropDownFilter";
import FilterDropDown from "../filterDropDown";
import FilterIcon from '../../assets/icons/adjust-filter.svg';
import DownArrowIcon from '../../assets/icons/down-arrow.svg';
import SearchBar from "../searchBar";

const Users = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const closeModal = () => setShowModal(false);
  const [searchText, setSearchText] = useState('');
  const [roleOriginalData, setRoleOriginalData] = useState();
  const [accountStatusOriginalData, setAccountStatusOriginalData] = useState();

  const [roleData, setRoleData] = useState([]);

  const [accountStatusData, setAccountStatusData] = useState([]);
  const [openDropDownFilterForRole, setOpenDropDownFilterForRole] = useState(false);
  const [calenderFilterJsonData, setCalenderFilterJsonData] = useState([]);
  const [openFilterDropDown, setOpenFilterDropDown] = useState(false);
  const [openAccountStatusDropDown, setOpenAccountStatusDropDown] = useState(false);
  const [filterDropDownValue, setFilterDropDownValue] = useState('');

  const [userList, setUsersList] = useState([]);

  const {
    usersList,
    activateUser,
    deactivateUser,
    setShowModals,
    permissions,
    addUser,
    unaffiliate,
  } = props;

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

  const prepareData = (data, type) => {
    const availableList = data?.map(item => item[type]).filter(item => item);
    return [...new Set(availableList)];
  };

  useEffect(() => {
    setUsersList(usersList);
    console.log('userlist: ', prepareData(usersList, 'role'));

    setRoleData(oldTypes => [...oldTypes, ...prepareDropdownData(prepareData(usersList, 'role'))]);
    setRoleOriginalData(roleData);
   
    setAccountStatusOriginalData([{ key: 1, value: 'Manufacturer' }, { key: 2, value: 'randome' }, { key: 3, value: 'doctor' }, { key: 4, value: 'syndrome' }]);
    setCalenderFilterJsonData([{ key: 'today', value: 'Today', checked: false }, 
    { key: 'this_week', value: 'This week', checked: false  },
    { key: 'this_month', value: 'This Month', checked: false  },
    { key: 'last_3_onths', value: 'Last 3 Months', checked: false  },
    { key: 'Last 6 Months', value: 'Last 6 Months', checked: false  }, 
    { key: 'This Year', value: 'This Year', checked: false }])
  }, []);

  const onChangeOfSearchInput = (event, type) => {
    
  };

  const filterListForDropDown = (data, value) => {
    return data?.filter(item => {
      if (item.value.toLowerCase().includes(value)) {
        return item;
      }
    })
  };

  const onChangeOfFilterDropDown = (value) => {
    setFilterDropDownValue(value);
    setOpenFilterDropDown(false);
  }

  const onChangeOfSearchForOriginalListInput = (inputValue, type) => {
    if (type === 'searchBarTopPanel' && inputValue) {
      const filteredList = usersList.filter(item => {
        return `${item.firstName}${item.lastName}`.toLowerCase().includes(inputValue.toLowerCase());
      });
      setUsersList(filteredList);
    } else {
      setUsersList(usersList);
    }
  };

  const filterListForSearchInput = (data, searchInput) => data.filter(item => {
    return item.value.toLowerCase().includes(searchInput.toLowerCase());
  });

  const onChangeOfSearchForFilterInput = (searchInput, type) => {
    if (type === 'role' && searchInput) {
      setRoleOriginalData(filterListForSearchInput(roleData, searchInput));
    } else if (type === 'status') {
      setStatusOriginalData(filterListForSearchInput(statusData, searchInput))
    } else {
      console.log('roledata', role);
      if (type === 'role') {
        setRoleOriginalData(roleData);
      } else if (type === 'status') {
        setTypeOriginalData(statusData);
      }
    }
  }

  const setCheckedAndUnCheckedOfProvidedList = (typeOriginalData, index) => {
    return typeOriginalData.filter((item, i) => i === index ? item.checked = true : item.checked = false);
  }

  const onClickOfDropDownItem = (index, type) => {
    if (type === 'role') {
      setRoleOriginalData([...setCheckedAndUnCheckedOfProvidedList(roleData, index)]);
      setOpenDropDownFilterForRole(!openDropDownFilterForRole);
    } 
  };

  return (
    <div className="users">
      {showModal && (
        <Modal
          close={closeModal}
          title="ADD NEW USER"
          size="modal-lg" //for other size's use `modal-lg, modal-md, modal-sm`
          buttonclassName="btn-orange"
        >
          <NUModal
            data={data}
            permissions={permissions}
            onSuccess={() => {
              addUser(data);
              closeModal();
            }}
            setData={setData}
            onHide={closeModal}
            buttonText="ADD USER"
          />
        </Modal>
      )}
      <div className="d-flex pl-2 justify-content-between">
        <h1 className="breadcrumb dash">MANAGE USERS</h1>
        <div className='d-flex'>
          <SearchBar onChangeOfSearchInput={onChangeOfSearchForOriginalListInput} type={'searchBarTopPanel'} />
          <div className="pr-4">
            <button
              type="button"
              className="btn btn-warning "
              onClick={() => setShowModal(true)}
            >
              <i className="fa fa-plus txt pr-2" aria-hidden="true"></i>
              <span className="txt">Add New User</span>
            </button>
          </div>
        </div>
      </div>
      <div className="full-width">
        <div className="filter">
          <div className="row" style={{ flexBasis: '95%' }}>
            <span className="col box headerText">Name</span>

            <div class="vl text-center"></div>
            <div className='col box headerText'>
              <span className="headerText" style={{ marginRight: '72px' }}>{'Role'}</span>
              <img
                class='headerText'
                style={{
                  width: '10px',
                  height: '15px',
                  marginTop: '0px'
                }}
                src={sortIcon}
                alt='roleSortIcon'
                onClick={() => {
                  setOpenDropDownFilterForRole(!openDropDownFilterForRole);  }}
              />
              {openDropDownFilterForRole &&
                <DropDownFilter
                  onChangeOfSearchInput={onChangeOfSearchForFilterInput}
                  data={roleOriginalData}
                  type={'role'}
                  onClickOfDropDownItem={onClickOfDropDownItem}
                />
              }
            </div>

            <div class="vl text-center"></div>
            <span className="headerText col box headerText">Location</span>

            <div class="vl text-center"></div>
            <span className="headerText col box headerText">Wallet address</span>

            <div class="vl text-center"></div>
            <span className="headerText col box headerText">Email/Mobile</span>

            <div class="vl text-center"></div>
            <div className='col box headerText'
              onClick={() => {
                setOpenAccountStatusDropDown(!openAccountStatusDropDown);
                if (!openAccountStatusDropDown) {
                  setSearchText('');
                }
              }}>
              <span className="headerText" style={{ 'marginRight': '40px' }}>{'Account Status'}</span>
              <img
                class='headerText'
                style={{
                  width: '10px',
                  height: '15px',
                  marginTop: '0px',
                }}
                src={sortIcon}
                alt='roleSortIcon'
              />
              {openAccountStatusDropDown &&
                <DropDownFilter
                  onChangeOfSearchInput={onChangeOfSearchForFilterInput}
                  data={accountStatusOriginalData}
                  type={'accountStatus'}
                  onClickOfDropDownItem={onClickOfDropDownItem}
                />
              }
            </div>
            <div className="col box">
              <button className='text-center adjustFilterBtn'
                onClick={() => setOpenFilterDropDown(!openFilterDropDown)}
              >
                <img src={FilterIcon} alt={'filter-icon'} />
                <span>{'Filter'}</span>
                <img src={DownArrowIcon} alt={'drp-arrow'} />
              </button>
              {
                openFilterDropDown &&
                <FilterDropDown
                  data={calenderFilterJsonData}
                  onChangeOfFilterDropDown={onChangeOfFilterDropDown}
                />
              }
            </div>
          </div>
        </div>
      </div>
      <div className='userList-container'>
        {userList?.map((row, index) => (
          <UserDetails
            key={index}
            user={row}
            rindex={index}
            setShowModals={setShowModals}
            activateUser={activateUser}
            deactivateUser={deactivateUser}
            unaffiliate={unaffiliate}
            permissions={permissions}
            permission={
              permissions.length
                ? permissions.filter((row) => row.role == row.role)[0]
                  .permissions
                : []
            }
          />
        ))}
      </div>

    </div>
  );
};

export default Users;
