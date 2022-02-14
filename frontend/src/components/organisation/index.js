import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import Details from "./details";
import Modal from "../../shared/modal";
import OrganisationPopUp from "./organisationPopUp";

import sortIcon from '../../assets/icons/up-and-down-1.png'
import "./style.scss";

import SearchBar from "../searchBar";
import DropDownFilter from "../dropDownFilter";
import { t } from "i18next";
import NoRecordsFound from "../NoRecordsFound";

const Organisations = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const closeModal = () => setShowModal(false);

  const { modifyOrg, setShowModals, addOrg, organisationList,
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

  // console.log("Organisation List:", organisationList);



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
        <h1 className="breadcrumb dash">{t('manage_organisations')}</h1>
        <SearchBar onChangeOfSearchInput={filterOrganisationListBasedOnTopPanelSearchInput} type={'searchBarTopPanel'} />
      </div>
      <div className='full-width'>
        <div className='filter'>
          <div className='row'>
            <div className='box col-1 ml-5 mr-5 headerText headerTitles' style={{position:"relative",left:"1.1rem"}}>{t('name')}</div>
            <div class="vl text-center"></div>

            <div className='box col-2 headerText headerTitles' style={{marginLeft:"12px"}}>
              <span className="headerText" 
                  onClick={() => {
                    setShowDropDownForType(!showDropDownForType);
                  }}
                  
                 style={{cursor:"pointer"}}>{t('type')}
              </span>
              <img
                class='headerText'
                style={{
                  width: '7px',
                  height: '10px',
                  marginTop: '0px',
                  marginLeft: '68px',
                  cursor: "pointer"
                }}
                src={sortIcon}
                alt='roleSortIcon'
                onClick={() => {
                  setShowDropDownForType(!showDropDownForType);
                }}
              />
              {showDropDownForType && orgTypeData &&
                <DropDownFilter
                  setShowDropDownForType={setShowDropDownForType}
                  onChangeOfSearchInput={onChangeOfSearchForFilterInput}
                  data={orgTypeData}
                  type={'orgType'}
                  onClickOfDropDownItem={onSelectionOfDropdownValue}
                />
              }
            </div>
            <div class="vl text-center"></div>

            <div className='box col-2 headerText headerTitles' style={{marginLeft:"15px"}}>{t('postal_address')}</div>
            <div class="vl text-center"></div>


            <div className='box ml-2 mr-2 headerText headerTitles' style={{flex:"0 0 10.333333%", maxWidth:"10.333333%"}}>
              <span className="headerText"  
                  onClick={() => {
                    setShowDropDownForCountry(!showDropDownForCountry);
                  }}
                  style={{cursor:"pointer"}}>{t('country')}
                </span>
              <img
                class='headerText'
                style={{
                  width: '7px',
                  height: '10px',
                  marginTop: '0px',
                  marginLeft: '50px',
                  cursor: "pointer"
                }}
                src={sortIcon}
                alt='roleSortIcon'
                onClick={() => {
                  setShowDropDownForCountry(!showDropDownForCountry);
                }}
              />
              {showDropDownForCountry && countryData &&
                <DropDownFilter
                  setShowDropDownForCountry={setShowDropDownForCountry}
                  onChangeOfSearchInput={onChangeOfSearchForFilterInput}
                  data={countryData}
                  type={'country'}
                  onClickOfDropDownItem={onSelectionOfDropdownValue}
                />
              }
            </div>
            <div class="vl text-center"></div>
            <div className='box col-1 headerText ml-2 mr-2 headerTitles'>
              <span className="headerText" 
                    onClick={() => { setShowDropDownForRegion(!showDropDownForRegion); }}
                    style={{cursor:"pointer"}}>{t('region')}
              </span>
              <img
                class='headerText'
                style={{
                  width: '7px',
                  height: '10px',
                  marginTop: '0px',
                  marginLeft: '50px',
                  cursor: "pointer"
                }}
                src={sortIcon}
                alt='roleSortIcon'
                onClick={() => { setShowDropDownForRegion(!showDropDownForRegion); }}
              />
              {showDropDownForRegion &&
                <DropDownFilter
                  setShowDropDownForRegion={setShowDropDownForRegion}
                  onChangeOfSearchInput={onChangeOfSearchForFilterInput}
                  data={regionData}
                  type={'region'}
                  onClickOfDropDownItem={onSelectionOfDropdownValue}
                />
              }
            </div>
            <div class="vl text-center"></div>

            <div className='box col ml-2 mr-2 headerText headerTitles'>
              <span className="headerText" 
                  onClick={() => {
                    setShowDropDownForStatus(!showDropDownForStatus);
                  }}
                  style={{cursor:"pointer"}}>{t('status')}
              </span>
              <img
                class='headerText'
                style={{
                  width: '7px',
                  height: '10px',
                  marginTop: '0px',
                  marginLeft: '68px',
                  cursor: "pointer"
                }}
                src={sortIcon}
                alt='roleSortIcon'
                onClick={() => {
                  setShowDropDownForStatus(!showDropDownForStatus);
                }}
              />
              {showDropDownForStatus &&
                <DropDownFilter
                  setShowDropDownForStatus={setShowDropDownForStatus}
                  onChangeOfSearchInput={onChangeOfSearchForFilterInput}
                  data={statusData}
                  type={'status'}
                  onClickOfDropDownItem={onSelectionOfDropdownValue}
                />
              }
            </div>
            <div class="vl text-center"></div>

            <div className='box col mo-create headerText headerTitles'>
              <span className="headerText"
                onClick={() => {
                  setShowDropDownForCreatedOn(!showDropDownForCreatedOn);
                }}
                style={{cursor:"pointer"}}>{t('created_on')}
              </span>
              {showDropDownForCreatedOn &&
                <DropDownFilter
                  setShowDropDownForCreatedOn={setShowDropDownForCreatedOn}
                  onChangeOfSearchInput={onChangeOfSearchForFilterInput}
                  data={[]}
                  type={'createdOn'}
                  onClickOfDropDownItem={onSelectionOfDropdownValue}
                />}
            </div>
            {/* <div className='box col headerText'>
              <span className="headerText" style={{ marginRight: '72px' }}>{''}</span>
            </div> */}
          </div>
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
            onClickOfDropDownItem={onSelectionOfDropdownValue}
          />
        }) :
          <div className="col recordsMsg justify-content">
            <NoRecordsFound dClass="w-50" />
          </div>}
      </div>
    </div>
  );
};

export default Organisations;

