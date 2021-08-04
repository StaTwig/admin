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

  const {
    usersList,
    activateUser,
    deactivateUser,
    setShowModals,
    permissions,
    addUser,
    unaffiliate,
    roleData,
    accountStatusData,
    setShowDropDownForAccountStatus,
    setShowDropDownForRole,
    showDropDownForAccountStatus,
    showDropDownForRole,
    filterOrganisationListBasedOnTopPanelSearchInput,
    onChangeOfSearchForFilterInput,
    onSelectionOfDropdownValue,
    showFilterDropDown,
    setShowFilterDropDown,
    calenderFilterJsonData
  } = props;


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
          <SearchBar onChangeOfSearchInput={filterOrganisationListBasedOnTopPanelSearchInput}
            type={'searchBarTopPanel'} />
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
                  setShowDropDownForRole(!showDropDownForRole);
                }}
              />
              {showDropDownForRole && roleData &&
                <DropDownFiter
                  onChangeOfSearchInput={onChangeOfSearchForFilterInput}
                  data={roleData}
                  type={'role'}
                  onClickOfDropDownItem={onSelectionOfDropdownValue}
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
            <div className='col box headerText'>
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
                onClick={() => {
                  setShowDropDownForAccountStatus(!showDropDownForAccountStatus);
                }}
              />
              {showDropDownForAccountStatus &&
                <DropDownFilter
                  onChangeOfSearchInput={onChangeOfSearchForFilterInput}
                  data={accountStatusData}
                  type={'accountStatus'}
                  onClickOfDropDownItem={onSelectionOfDropdownValue}
                />
              }
            </div>
            <div className="col box">
              <button className='text-center adjustFilterBtn'
                onClick={() => setShowFilterDropDown(!showFilterDropDown)}
              >
                <img src={FilterIcon} alt={'filter-icon'} />
                <span>{'Filter'}</span>
                <img src={DownArrowIcon} alt={'drp-arrow'} />
                {
                  showFilterDropDown && calenderFilterJsonData &&
                  <FilterDropDown
                    data={calenderFilterJsonData}
                    onChangeOfFilterDropDown={onSelectionOfDropdownValue}
                    type={'dateRange'}
                  />
                }
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='userList-container'>
        {usersList?.map((row, index) => (
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
