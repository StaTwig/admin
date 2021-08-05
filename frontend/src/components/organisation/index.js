import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import Details from "./details";
import Modal from "../../shared/modal";
import OrganisationPopUp from "./organisationPopUp";

import sortIcon from '../../assets/icons/up-and-down-1.png'
import "./style.scss";

import SearchBar from "../searchBar";
import DropDownFilter from "../dropDownFilter";

const Organisations = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const closeModal = () => setShowModal(false);

  const {  modifyOrg, setShowModals, addOrg, organisationList, 
    countryData, orgTypeData, regionData, statusData, 
    filterOrganisationListBasedOnTopPanelSearchInput,
    onChangeOfSearchForFilterInput,
    onSelectionOfDropdownValue,
    showDropDownForType,
    showDropDownForCreatedOn,
    showDropDownForCountry,
    showDropDownForRegion,
    showDropDownForStatus,
    setShowDropDownForCreatedOn,
    setShowDropDownForStatus,
    setShowDropDownForRegion,
    setShowDropDownForCountry,
    setShowDropDownForType
   } = props;


  organisationList.sort(function (a, b) {
    return new Date(b.createdAt) < new Date(a.createdAt) ? -1 : 0;
  });

  return (
    <div className="users">
      {showModal && (
        <Modal
          close={closeModal}
          title="ADD ORGANISATION"
          size="modal-md" //for other size's use `modal-lg, modal-md, modal-sm`
          buttonclassName="btn-orange"
        >
          <OrganisationPopUp
            data={data}
            onSuccess={() => {
              addOrg(data);
              closeModal();
            }}
            setData={setData}
            onHide={closeModal}
            buttonText="ADD"
          />
        </Modal>
      )}
      <div className="d-flex pl-2 justify-content-between">
        <h1 className="breadcrumb dash">MANAGE ORGANISATIONS</h1>
        <SearchBar onChangeOfSearchInput={filterOrganisationListBasedOnTopPanelSearchInput} type={'searchBarTopPanel'} />
      </div>
      <div className='full-width'>
        <div className='filter'>
          <div className='row' style={{ flexBasis: '95%' }}>
            <div className='box col headerText'>Name</div>
            <div class="vl text-center"></div>

            <div className='box col headerText'>
              <span className="headerText">{'Type'}</span>
              <img
                class='headerText'
                style={{
                  width: '10px',
                  height: '15px',
                  marginTop: '0px',
                  marginLeft: '38px'
                }}
                src={sortIcon}
                alt='roleSortIcon'
                onClick={() => {
                  setShowDropDownForType(!showDropDownForType);
                }}
              />
              {showDropDownForType && orgTypeData &&
                <DropDownFilter
                  onChangeOfSearchInput={onChangeOfSearchForFilterInput}
                  data={orgTypeData}
                  type={'orgType'}
                  onClickOfDropDownItem={onSelectionOfDropdownValue}
                />
              }
            </div>
            <div class="vl text-center"></div>

            <div className='box col headerText'>Postal address</div>
            <div class="vl text-center"></div>


            <div className='box col headerText'>
              <span className="headerText">{'Country'}</span>
              <img
                class='headerText'
                style={{
                  width: '10px',
                  height: '15px',
                  marginTop: '0px',
                  marginLeft: '38px'
                }}
                src={sortIcon}
                alt='roleSortIcon'
                onClick={() => {
                  setShowDropDownForCountry(!showDropDownForCountry);
                }}
              />
              {showDropDownForCountry && countryData &&
                <DropDownFilter
                  onChangeOfSearchInput={onChangeOfSearchForFilterInput}
                  data={countryData}
                  type={'country'}
                  onClickOfDropDownItem={onSelectionOfDropdownValue}
                />
              }
            </div>
            <div class="vl text-center"></div>
            <div className='box col headerText'>
              <span className="headerText" style={{ marginRight: '72px' }}>{'Region'}</span>
              <img
                class='headerText'
                style={{
                  width: '10px',
                  height: '15px',
                  marginTop: '0px'
                }}
                src={sortIcon}
                alt='roleSortIcon'
                onClick={() => { setShowDropDownForRegion(!showDropDownForRegion); }}
              />
              {showDropDownForRegion &&
                <DropDownFilter
                  onChangeOfSearchInput={onChangeOfSearchForFilterInput}
                  data={regionData}
                  type={'region'}
                  onClickOfDropDownItem={onSelectionOfDropdownValue}
                />
              }
            </div>
            <div class="vl text-center"></div>

            <div className='box col headerText'>
              <span className="headerText">{'Status'}</span>
              <img
                class='headerText'
                style={{
                  width: '10px',
                  height: '15px',
                  marginTop: '0px',
                  marginLeft: '38px'
                }}
                src={sortIcon}
                alt='roleSortIcon'
                onClick={() => {
                  setShowDropDownForStatus(!showDropDownForStatus);
                }}
              />
              {showDropDownForStatus &&
                <DropDownFilter
                  onChangeOfSearchInput={onChangeOfSearchForFilterInput}
                  data={statusData}
                  type={'status'}
                  onClickOfDropDownItem={onSelectionOfDropdownValue}
                />
              }
            </div>
            <div class="vl text-center"></div>

            <div className='box col headerText'>
              <span className="headerText">{'Created on'}</span>
              <img
                class='headerText'
                style={{
                  width: '10px',
                  height: '15px',
                  marginTop: '0px',
                  marginLeft: '38px'
                }}
                src={sortIcon}
                alt='roleSortIcon'
                onClick={() => {
                  setShowDropDownForCreatedOn(!showDropDownForCreatedOn);
                }}
              />
              {showDropDownForCreatedOn &&
                <DropDownFilter
                  onChangeOfSearchInput={onChangeOfSearchForFilterInput}
                  data={[]}
                  type={'createdOn'}
                  onClickOfDropDownItem={onSelectionOfDropdownValue}
                />}
            </div>
            <div className='box col headerText'>
              <span className="headerText" style={{ marginRight: '72px' }}>{''}</span>
            </div></div>
        </div>
      </div>
      <div className="details-card">
        {organisationList.length > 0 ? organisationList.map((row, index) => {
          return <Details
            key={index}
            org={row}
            rindex={index}
            setShowModals={setShowModals}
            modifyOrg={modifyOrg}
            types={orgTypeData}
          />
        }) : <div>{'loading....'}</div>}
      </div>
    </div>
  );
};

export default Organisations;

