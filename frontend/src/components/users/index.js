import React, { useState } from "react";
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
import useOnclickOutside from "react-cool-onclickoutside";

const Users = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const closeModal = () => setShowModal(false);

  const ref = useOnclickOutside(() => {
    setShowDropDownForRole(false);
  })

  const ref1 = useOnclickOutside(() => {
    setShowDropDownForAccountStatus(false);
  })

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
    calenderFilterJsonData,
    addresses
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
            addresses={addresses}
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
            <span
               className="col box headerText col-1 ml-5 mr-5"
               style={{position:"relative",
                left:"15px",
                justifyContent:"unset"}}
               >Name</span>

            <div class="vl text-center"></div>
            <div className='col box headerText' style={{paddingLeft:"10px"}}>
              <span className="headerText" 
                  onClick={() => {
                    setShowDropDownForRole(!showDropDownForRole);
                  }}
                  style={{cursor:"pointer"}}>{'Role'}
              </span>
              <img
              class='headerText'
              style={{
                width: '7px',
                height: '10px',
                marginTop: '0px',
                marginLeft: '68px',
                cursor:"pointer"
              }}
                src={sortIcon}
                alt='roleSortIcon'
                onClick={() => {
                  setShowDropDownForRole(!showDropDownForRole);
                }}
              />
              {showDropDownForRole && roleData &&
                <DropDownFilter
                  setShowDropDownForRole = {setShowDropDownForRole}
                  onChangeOfSearchInput={onChangeOfSearchForFilterInput}
                  data={roleData}
                  type={'role'}
                  onClickOfDropDownItem={onSelectionOfDropdownValue}
                />
              }
            </div>

            <div class="vl text-center"></div>
            <span className="headerText col box headerText pl-2">Location</span>

            <div class="vl text-center"></div>
            <span className="headerText col box headerText pl-2">Wallet address</span>

            <div class="vl text-center"></div>
            <span className="headerText col box headerText pl-2">Email/Mobile</span>

            <div class="vl text-center"></div>
            <div className='col box headerText pl-2'>
              <span className="headerText" onClick={() => {
                setShowDropDownForAccountStatus(!showDropDownForAccountStatus);
              }} style={{cursor:"pointer"}}>{'Account Status'}</span>
              <img
              class='headerText'
              style={{
                width: '7px',
                height: '10px',
                marginTop: '0px',
                marginLeft: '50px',
                cursor:"pointer"
              }}
                src={sortIcon}
                alt='roleSortIcon'
                onClick={() => {
                  setShowDropDownForAccountStatus(!showDropDownForAccountStatus);
                }}
              />
              {showDropDownForAccountStatus &&
                <DropDownFilter
                  setShowDropDownForAccountStatus = {setShowDropDownForAccountStatus}
                  onChangeOfSearchInput={onChangeOfSearchForFilterInput}
                  data={accountStatusData}
                  type={'accountStatus'}
                  onClickOfDropDownItem={onSelectionOfDropdownValue}
                />
              }
            </div>
            <div className="col box pl-3">
              <button className='btn btn-primary'
                onClick={() => setShowFilterDropDown(!showFilterDropDown)}
              >
                <img className="mr-3" src={FilterIcon} alt={'filter-icon'} />
                <span className="btnText">{'Filter'}</span>
                <img className="ml-3" src={DownArrowIcon} alt={'drp-arrow'} />
                {
                  showFilterDropDown && calenderFilterJsonData &&
                  <FilterDropDown
                    data={calenderFilterJsonData}
                    onChangeOfFilterDropDown={onSelectionOfDropdownValue}
                    type={'dateRange'}
                    showFilterDropDown={showFilterDropDown}
                    setShowFilterDropDown={setShowFilterDropDown}
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
