import React, { useState, useEffect } from "react";
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
  const [showDropDownForType, setShowDropDownForType] = useState(false);
  const [showDropDownForCreatedOn, setShowDropDownForCreatedOn] = useState(false);
  const [showDropDownForStatus, setShowDropDownForStatus] = useState(false);
  const [showDropDownForCountry, setShowDropDownForCountry] = useState(false);
  const [showDropDownForRegion, setShowDropDownForRegion] = useState(false);
  const [typeData, setTypeData] = useState([]);
  const [typeOriginalData, setTypeOriginalData] = useState([]);

  const [createdOnData, setCreatedOnData] = useState([]);
  const [createdOnOriginalData, setCreatedOnOriginalData] = useState([]);

  const [statusData, setStatusData] = useState([]);
  const [statusOriginalData, setStatusOriginalData] = useState([]);

  const [countryData, setCountryData] = useState([]);
  const [countryOriginalData, setCountryOriginalData] = useState([]);

  const [regionData, setRegionData] = useState([]);
  const [regionOriginalData, setRegionOriginalData] = useState([]);

  const [searchText, setSearchText] = useState('');

  const { orgList, modifyOrg, setShowModals, addOrg, orgTypes } = props;
  orgList.sort(function (a, b) {
    return new Date(b.createdAt) < new Date(a.createdAt) ? -1 : 0;
  });

  useEffect(() => {
    setTypeOriginalData([{ key: 1, value: 'Manufacturer' },
    { key: 2, value: 'randome' }, { key: 3, value: 'doctor' },
    { key: 4, value: 'syndrome' }]);
    setCreatedOnOriginalData([{ key: 1, value: '10/04/21' },
    { key: 2, value: '11/05/33' }, { key: 3, value: '11/04/22' },
    { key: 4, value: '12/06/43' }]);
    setStatusOriginalData([{ key: 1, value: 'Active' },
    { key: 2, value: 'Not Active' }]);
    setCountryOriginalData([{ key: 1, value: 'India' },
    { key: 2, value: 'Africa' }, { key: 3, value: 'Singapore' }]);
    setRegionOriginalData([{ key: 1, value: 'Asia' },
    { key: 2, value: 'Oceania' }, { key: 3, value: 'Americans' }]);
  }, []);

  const onChangeOfSearchInput = (event, type) => {
    const value = event?.target?.value || '';
    if (value) {
      setSearchText(value);
      if (type === 'type') {
        setTypeOriginalData(filterListForDropDown(roleOriginalData, value));
      } else {
        console.log('here: ', value);
        // setSearchUserInput(value);
      }
    } else {
      if (type === 'type') {
        setTypeData(typeOriginalData);
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
  // console.log("org" + orgTypes)
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
        <SearchBar onChangeOfSearchInput={onChangeOfSearchInput} type={'searchBarTopPanel'} />
        {/* <div className="pr-4">
          <button
            type="button"
            className="btn btn-warning "
            onClick={() => setShowModal(true)}
          >
            <i className="fa fa-plus txt pr-2" aria-hidden="true"></i>
            <span className="txt">Add organisation</span>
          </button>
        </div> */}
      </div>
      {/* <div className="flex-row justify-content-between pl-2 pr-1">
        <div className="panel mr-3 mt-3">
          <div className="mt-4">
            <div className="full-width ml-4 txtColor d-flex flex-row justify-content-between table-header">
              <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
                <span className="text-center w-10 headerText">Name</span>
                <div class="vl text-center"></div>
                <div className='text-center w-10'
                  onClick={() => {
                    setShowDropDownForType(!showDropDownForType);
                    if (!showDropDownForType) {
                      setSearchText('');
                    }
                  }}>
                  <span className="headerText" style={{ marginRight: '72px' }}>{'Type'}</span>
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
                {showDropDownForType &&
                  <DropDownFilter
                    onChangeOfSearchInput={onChangeOfSearchInput}
                    data={searchText ? typeData : typeOriginalData}
                    type={'role'}
                  />
                }
                <div class="vl text-center"></div>
                <span className="text-center w-10 headerText">Postal address</span>
                <div class="vl text-center"></div>
                <span className="text-center w-10 headerText">Country</span>
                <div class="vl text-center"></div>
                <span className="text-center w-10 headerText">Region</span>
                <div class="vl text-center"></div>
                <span className="text-center w-10 headerText">Status</span>
                <div class="vl text-center"></div>
                <span className="text-center w-10 headerText">Created on</span>
                <span className="text-center w-20">&nbsp;</span>
              </div>
            </div>
         
          </div>
        </div>
      </div> */}
      <div className='full-width'>
        <div className='filter'>
          <div className='d-flex justify-content-between'>
            <div className='row' style={{ flexBasis: '95%' }}>
              <div className='box col headerText'>Name</div>
              <div class="vl text-center"></div>
              <div className='box col headerText'
                onClick={() => {
                  setShowDropDownForType(!showDropDownForType);
                  if (!showDropDownForType) {
                    setSearchText('');
                  }
                }}
              >
                <span className="headerText" style={{ marginRight: '72px' }}>{'Type'}</span>
                <img
                  class='headerText'
                  style={{
                    width: '10px',
                    height: '15px',
                    marginTop: '0px'
                  }}
                  src={sortIcon}
                  alt='roleSortIcon'
                />
              </div>
              {showDropDownForType &&
                <DropDownFilter
                  onChangeOfSearchInput={onChangeOfSearchInput}
                  data={searchText ? typeData : typeOriginalData}
                  type={'role'}
                />
              }
              <div class="vl text-center"></div>
              <div className='box col headerText'>Postal address</div>
              <div class="vl text-center"></div>
              <div className='box col headerText'
                onClick={() => {
                  setShowDropDownForCountry(!showDropDownForCountry);
                  if (!showDropDownForCountry) {
                    setSearchText('');
                  }
                }}
              >
                <span className="headerText" style={{ marginRight: '72px' }}>{'Country'}</span>
                <img
                  class='headerText'
                  style={{
                    width: '10px',
                    height: '15px',
                    marginTop: '0px'
                  }}
                  src={sortIcon}
                  alt='roleSortIcon'
                />
              </div>
              {showDropDownForCountry &&
                <DropDownFilter
                  onChangeOfSearchInput={onChangeOfSearchInput}
                  data={searchText ? countryData : countryOriginalData}
                  type={'country'}
                />}
              <div class="vl text-center"></div>
              <div className='box col headerText'
                onClick={() => {
                  setShowDropDownForRegion(!showDropDownForRegion);
                  if (!showDropDownForRegion) {
                    setSearchText('');
                  }
                }}
              >
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
                />
              </div>
              {showDropDownForRegion &&
                <DropDownFilter
                  onChangeOfSearchInput={onChangeOfSearchInput}
                  data={searchText ? regionData : regionOriginalData}
                  type={'region'}
                />}
              <div class="vl text-center"></div>
              <div className='box col headerText'
                onClick={() => {
                  setShowDropDownForStatus(!showDropDownForStatus);
                  if (!showDropDownForStatus) {
                    setSearchText('');
                  }
                }}
              >
                <span className="headerText" style={{ marginRight: '72px' }}>{'Status'}</span>
                <img
                  class='headerText'
                  style={{
                    width: '10px',
                    height: '15px',
                    marginTop: '0px'
                  }}
                  src={sortIcon}
                  alt='roleSortIcon'
                />
              </div>
              {showDropDownForStatus &&
                <DropDownFilter
                  onChangeOfSearchInput={onChangeOfSearchInput}
                  data={searchText ? statusData : statusOriginalData}
                  type={'status'}
                />}
              <div class="vl text-center"></div>
              <div className='box col headerText'
                onClick={() => {
                  setShowDropDownForCreatedOn(!showDropDownForCreatedOn);
                  if (!showDropDownForCreatedOn) {
                    setSearchText('');
                  }
                }}
              >
                <span className="headerText" style={{ marginRight: '40px' }}>{'Created on'}</span>
                <img
                  class='headerText'
                  style={{
                    width: '10px',
                    height: '15px',
                    marginTop: '0px'
                  }}
                  src={sortIcon}
                  alt='roleSortIcon'
                />
              </div>
              {showDropDownForCreatedOn &&
                <DropDownFilter
                  onChangeOfSearchInput={onChangeOfSearchInput}
                  data={searchText ? createdOnData : createdOnOriginalData}
                  type={'createdOn'}
                />}
            </div>
          </div>
        </div>
      </div>
      <div className='table-full-width'>
        {orgList.map((row, index) => (
          <Details
            key={index}
            org={row}
            rindex={index}
            setShowModals={setShowModals}
            modifyOrg={modifyOrg}
            types={orgTypes}
          />
        ))}
      </div>
    </div>
  );
};

export default Organisations;
