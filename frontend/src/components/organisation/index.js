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
    <div className="users" style={{height:"90vh"}}>
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
      <div className={ `${ window.location.pathname == '/organisation' ? `full-width1` : `full-width`}`}>
        <div className={ `${ window.location.pathname == '/organisation' ? '' : `filter`}`}>
          <div className={ `${window.location.pathname == '/organisation' ?`row orgTitle ` : `row userTitle`}`}>
            <div className='box col-1 ml-5 mr-5 headerText'>Name</div>
            <div class="vl text-center"></div>

            <div className='box col-2 headerText'>
              <span className="headerText" 
                  onClick={() => {
                    setShowDropDownForType(!showDropDownForType);
                  }}
                  
                 style={{cursor:"pointer"}}>{'Type'}
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

            <div className='box col-2 headerText'>Postal address</div>
            <div class="vl text-center"></div>


            <div className='box col-1 ml-3 mr-3 headerText'>
              <span className="headerText"  
                  onClick={() => {
                    setShowDropDownForCountry(!showDropDownForCountry);
                  }}
                  style={{cursor:"pointer"}}>{'Country'}
                </span>
              <img
                class='headerText'
                style={{
                  width: '7px',
                  height: '10px',
                  marginTop: '0px',
                  marginLeft: '20px',
                  cursor:"pointer"
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
            <div className='box col-1 headerText ml-3 mr-3'>
              <span className="headerText" 
                    onClick={() => { setShowDropDownForRegion(!showDropDownForRegion); }}
                    style={{cursor:"pointer"}}>{'Region'}
              </span>
              <img
                class='headerText'
                style={{
                  width: '7px',
                  height: '10px',
                  marginTop: '0px',
                  marginLeft: '20px',
                  cursor:"pointer"
                }}
                src={sortIcon}
                alt='roleSortIcon'
                onClick={() => { setShowDropDownForRegion(!showDropDownForRegion); }}
              />
              {showDropDownForRegion &&
                <DropDownFilter
                  setShowDropDownForRegion = {setShowDropDownForRegion}
                  onChangeOfSearchInput={onChangeOfSearchForFilterInput}
                  data={regionData}
                  type={'region'}
                  onClickOfDropDownItem={onSelectionOfDropdownValue}
                />
              }
            </div>
            <div class="vl text-center"></div>

            <div className='box col ml-3 mr-3 headerText'>
              <span className="headerText" 
                  onClick={() => {
                    setShowDropDownForStatus(!showDropDownForStatus);
                  }}
                  style={{cursor:"pointer"}}>{'Status'}
              </span>
              <img
                class='headerText'
                style={{
                  width: '7px',
                  height: '10px',
                  marginTop: '0px',
                  marginLeft: '20px',
                  cursor:"pointer"
                }}
                src={sortIcon}
                alt='roleSortIcon'
                onClick={() => {
                  setShowDropDownForStatus(!showDropDownForStatus);
                }}
              />
              {showDropDownForStatus &&
                <DropDownFilter
                  setShowDropDownForStatus = {setShowDropDownForStatus}
                  onChangeOfSearchInput={onChangeOfSearchForFilterInput}
                  data={statusData}
                  type={'status'}
                  onClickOfDropDownItem={onSelectionOfDropdownValue}
                />
              }
            </div>
            <div class="vl text-center"></div>

            <div className='box col ml-2  headerText'>
              <span className="headerText" 
                onClick={() => {
                  setShowDropDownForCreatedOn(!showDropDownForCreatedOn);
                }}
                style={{cursor:"pointer"}}>{'Created on'}
              </span>
              <img
                class='headerText'
                style={{
                  width: '7px',
                  height: '10px',
                  marginTop: '0px',
                  marginLeft: '20px',
                  cursor:"pointer"
                }}
                src={sortIcon}
                alt='roleSortIcon'
                onClick={() => {
                  setShowDropDownForCreatedOn(!showDropDownForCreatedOn);
                }}
              />
              {showDropDownForCreatedOn &&
                <DropDownFilter
                  setShowDropDownForCreatedOn = {setShowDropDownForCreatedOn}
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

