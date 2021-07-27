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

  const {
    usersList,
    activateUser,
    deactivateUser,
    setShowModals,
    permissions,
    addUser,
    unaffiliate,
  } = props;

  useEffect(() => {
    setRoleOriginalData([{ key: 1, value: 'Manufacturer' }, { key: 2, value: 'randome' }, { key: 3, value: 'doctor' }, { key: 4, value: 'syndrome' }]);
    setAccountStatusOriginalData([{ key: 1, value: 'Manufacturer' }, { key: 2, value: 'randome' }, { key: 3, value: 'doctor' }, { key: 4, value: 'syndrome' }]);
    setCalenderFilterJsonData([{ key: 'today', value: 'Today' }, { key: 'this_week', value: 'This week' },
    { key: 'this_month', value: 'This Month' }, { key: 'last_3_onths', value: 'Last 3 Months' },
    { key: 'Last 6 Months', value: 'Last 6 Months' }, { key: 'This Year', value: 'This Year' }])
  }, []);

  const onChangeOfSearchInput = (event, type) => {
    const value = event?.target?.value || '';
    if (value) {
      setSearchText(value);
      if (type === 'role') {
        setRoleData(filterListForDropDown(roleOriginalData, value));
      } else if (type === 'accountStatus') {
        setAccountStatusData(filterListForDropDown(accountStatusOriginalData, value));
      } else {
        console.log('here: ', value);
        // setSearchUserInput(value);
      }
    } else {
      if (type === 'role') {
        setRoleData(roleOriginalData);
      } else if (type === 'accountStatus') {
        setAccountStatusData(accountStatusOriginalData);
      }
    }
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
          <SearchBar onChangeOfSearchInput={onChangeOfSearchInput} type={'searchBarTopPanel'} />
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
      <div className="flex-row justify-content-between pl-2 pr-1">
        <div className="panel mr-3 mt-3">
          <div className="mt-4">
            <div className="full-width txtColor d-flex flex-row justify-content-between table-header">
              <span className="text-center headerText w-10">Name</span>
              <div class="vl text-center"></div>
              <div className='text-center w-10'
                onClick={() => {
                  setOpenDropDownFilterForRole(!openDropDownFilterForRole);
                  if (!openDropDownFilterForRole) {
                    setSearchText('');
                  }
                }}>
                <span className="headerText" style={{ marginRight: '72px' }}>{'Role'}</span>
                <img
                  class='headerText text-center w-10'
                  style={{
                    width: '10px',
                    height: '15px',
                    marginTop: '-7px'
                  }}
                  src={sortIcon}
                  alt='roleSortIcon'
                />
              </div>
              {openDropDownFilterForRole &&
                <DropDownFilter
                  onChangeOfSearchInput={onChangeOfSearchInput}
                  data={searchText ? roleData : roleOriginalData}
                  type={'role'}
                />
              }
              <div class="vl text-center"></div>
              <span className="headerText text-center w-10">Location</span>
              <div class="vl text-center"></div>
              <span className="headerText text-center w-10">Wallet address</span>
              <div class="vl text-center"></div>
              <span className="headerText text-center w-10">Email/Mobile</span>
              <div class="vl text-center"></div>
              <div className='text-center w-10'
                onClick={() => {
                  setOpenAccountStatusDropDown(!openAccountStatusDropDown);
                  if (!openAccountStatusDropDown) {
                    setSearchText('');
                  }
                }}>
                <span className="headerText">{'Account Status'}</span>
                <img
                  class='headerText text-center w-10 accountStatusImage'
                  src={sortIcon}
                  alt='roleSortIcon'
                />
              </div>
              {openAccountStatusDropDown &&
                <DropDownFilter
                  onChangeOfSearchInput={onChangeOfSearchInput}
                  data={searchText ? accountStatusData : accountStatusOriginalData}
                  type={'accountStatus'}
                />
              }
              <button className='text-center w-10 adjustFilterBtn'
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
            {usersList.map((row, index) => (
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
      </div>
    </div>
  );
};

export default Users;
