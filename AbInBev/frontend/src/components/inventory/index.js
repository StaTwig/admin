import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';
import './style.scss';
import SideBar from '../../components/sidebar';
import filterIcon from '../../assets/icons/funnel.svg';

import {
  getProductsInventory,
  getAllStates,
  getAllSKUs,
  getDistrictsByState,
  getOrganizationsByType,
  getOrganizationByID,
} from '../../actions/inventoryAction';

const Inventory = (props) => {
  const { totalStock, inventories } = props;
  const [selectedInventoryType, setSelectedInventoryType] = useState('BREWERY');
  const [selectedVendorType, setSelectedVendorType] = useState('ALL_VENDORS');
  const [selectedVendor, setSelectedVendor] = useState(null);

  const dispatch = useDispatch();
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [SKUs, setSKUs] = useState([]);
  const [organizations, setOrganizations] = useState([]);

  const [filterVisibility, setFilterVisibility] = useState({
    state: true,
    district: false,
    organization: false,
  });

  const [filters, setFilters] = useState({
    state: '',
    district: '',
    brewery: '',
    organization: '',
    sku: '',
    inventoryType: 'BREWERY',
    organizationType: 'BREWERY',
  });

  const defaultFilters = {
    state: '',
    district: '',
    brewery: '',
    organization: '',
    sku: '',
    inventoryType: 'BREWERY',
    organizationType: 'BREWERY',
  };

  const onInventoryTypeChange = (inventoryType) => {
    setSelectedVendor(null);
    setSelectedInventoryType(inventoryType);
    const _filters = { ...filters };
    _filters.inventoryType = inventoryType;
    _filters.organizationType = inventoryType;
    _filters.vendorType = 'ALL_VENDORS';
    setFilters(_filters);
    props.applyFilters(_filters);
  };

  const onVendorTypeChange = (vendorType) => {
    setSelectedVendorType(vendorType);
    const _filters = { ...filters };
    _filters.vendorType = vendorType;
    setFilters(_filters);
    props.applyFilters(_filters);
  };

  const _getAllStates = async () => {
    const response = await dispatch(getAllStates());
    const _states = response.data ? response.data : [];
    setStates(_states);
  };

  const _getDistrictsByState = async (_state) => {
    const response = await dispatch(getDistrictsByState(_state));
    const _districts = response.data ? response.data : [];
    setDistricts(_districts);
  };

  const _getAllSKUs = async () => {
    const response = await dispatch(getAllSKUs());
    const _skus = response.data ? response.data : [];
    setSKUs(_skus);
  };

  const _getOrganizationsByType = async (filters) => {
    const response = await dispatch(getOrganizationsByType(filters));
    const _organizations = response.data ? response.data : [];
    setOrganizations(_organizations);
  };

  const _getOrganizationById = async (orgId) => {
    const response = await dispatch(getOrganizationByID(orgId));
    return response.data ? response.data : null;
  };

  const onStateSelection = (event) => {
    const selectedState = event.target.value;
    const _filters = { ...filters };
    _filters.state = selectedState;
    setFilters(_filters);
    props.applyFilters(_filters);
    _getDistrictsByState(selectedState);
    _getOrganizationsByType(_filters);

    const _filterVisibility = { ...filterVisibility };
    _filterVisibility.district = true;
    _filterVisibility.organization = false;
    setFilterVisibility(_filterVisibility);
  };

  const resetFilters = () => {
    let _filters;
    if (selectedInventoryType == 'BREWERY') {
      _filters = { ...filters };
      _filters.inventoryType = 'BREWERY';
      _filters.district = '';
      _filters.state = '';
      _filters.brewery = '';
      _filters.sku = '';
      _filters.organization = '';
    } else {
      _filters = { ...filters };
      _filters.inventoryType = 'VENDOR';
      _filters.district = '';
      _filters.state = '';
      _filters.sku = '';
      _filters.organization = '';
      setSelectedVendorType('ALL_VENDORS');
    }
    setFilters(_filters);
    setSelectedVendor(null);
    props.applyFilters(_filters);
  };

  const onDistrictSelection = (event) => {
    const selectedDistrict = event.target.value;
    const _filters = { ...filters };
    _filters.district = selectedDistrict;
    setFilters(_filters);
    props.applyFilters(_filters);

    const _filterVisibility = { ...filterVisibility };
    _filterVisibility.organization = true;
    setFilterVisibility(_filterVisibility);
    _getOrganizationsByType(_filters);
  };

  const onOrganizationChange = (event) => {
    const selectedOrganization = event.target.value;
    const _filters = { ...filters };
    _filters.organization = selectedOrganization;
    setFilters(_filters);
    props.applyFilters(_filters);
    if (_filters.inventoryType === 'VENDOR') {
      _getOrganizationById(selectedOrganization).then((response) => {
        setSelectedVendor(response);
      });
    } else {
      setSelectedVendor(null);
    }
  };

  const onSKUChange = (event) => {
    const selectedSKU = event.target.value;
    const _filters = { ...filters };
    _filters.sku = selectedSKU;
    setFilters(_filters);
    props.applyFilters(_filters);
  };

  useEffect(() => {
    _getAllStates();
    _getAllSKUs();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 d-none d-md-block padding0 greyBG">
          <SideBar {...props} />
        </div>
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10">
          <div className="row">
            <div className="col-md-9 mainContainer pt-3 px-4">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3">
                <h1 className="h2">
                  {selectedVendor ? `Vendor's ` : ''}Inventory
                </h1>
              </div>
              {selectedVendor ? (
                <>
                  <div className="vendorDetailCard col-md-12">
                    <div className="col-md-2 userImage">
                      <span className="fa fa-user fa-5x"></span>
                    </div>
                    <div className="col-md-10">
                      <div className="col-md-12">
                        <h2 className="orgTitle">
                          {selectedVendor.organisation &&
                          selectedVendor.organisation.name
                            ? selectedVendor.organisation.name
                            : ''}{' '}
                          &nbsp;
                          <span className="purple-badge">
                            {selectedVendor.organisation &&
                            selectedVendor.organisation.type
                              ? selectedVendor.organisation.type
                              : ''}
                          </span>
                        </h2>
                      </div>
                      <div className="col-md-12">
                        <div className="pad-tb-10">
                          <span className="labelHead">Vendor ID:</span>
                          <span>
                            {selectedVendor.organisation &&
                            selectedVendor.organisation.id
                              ? selectedVendor.organisation.id
                              : ''}
                          </span>
                        </div>
                        <div className="pad-tb-10">
                          <span className="labelHead">Mobile No:</span>
                          <span>
                            {selectedVendor.organisation &&
                            selectedVendor.organisation.id
                              ? selectedVendor.organisation.id
                              : ''}
                          </span>
                        </div>
                        <div className="pad-tb-10">
                          <span className="labelHead">Total Stock:</span>
                          <span>{totalStock}</span>
                        </div>
                        <div className="pad-tb-10">
                          <span className="labelHead">Address:</span>
                          <span>
                            {selectedVendor.organisation &&
                            selectedVendor.organisation.postalAddress
                              ? selectedVendor.organisation.postalAddress
                              : ''}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="btn-group mainButtonFilter">
                  <a
                    className={`btn ${
                      selectedInventoryType === 'BREWERY' ? 'active' : ''
                    }`}
                    onClick={() => {
                      onInventoryTypeChange('BREWERY');
                    }}
                  >
                    Brewery
                  </a>
                  <a
                    className={`btn ${
                      selectedInventoryType === 'VENDOR' ? 'active' : ''
                    }`}
                    onClick={() => {
                      onInventoryTypeChange('VENDOR');
                    }}
                  >
                    Vendor
                  </a>
                </div>
              )}

              <div className="inventoryDetails">
                <table className="inventorytable">
                  <thead>
                    <tr>
                      <th className="inventoryHeader">
                        Brand{' '}
                        {/*<br/><span className="tableHeadersubtitle">Size</span>*/}
                      </th>
                      <th className="inventoryHeader">
                        SKU
                        <br />
                        <span className="tableHeadersubtitle">Stock Code</span>
                      </th>
                      <th className="inventoryHeader">
                        Stock Long Description
                      </th>
                      <th className="inventoryHeader">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventories.map((inventory, index) => (
                      <tr key={index}>
                        <td className="inventorydesc">
                          {inventory.manufacturer} <br />
                          <span className="inventorydescsubtitle">&nbsp;</span>
                        </td>
                        <td className="inventorydesc">
                          {inventory.name}
                          <br />
                          <span className="inventorydescsubtitle">
                            {inventory.externalId}
                          </span>
                        </td>
                        <td>{inventory.shortName}</td>
                        <td>{inventory.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-md-3 rightSideMenu pt-5  px-3">
              <div className="filterSection">
                <div className="filterHeader">
                  <img src={filterIcon} className="filterIcon" /> FILTERS
                </div>
                {filters.inventoryType === 'VENDOR' ? (
                  <>
                    <label className="filterSubHeading mt-3">
                      Vendor Type{' '}
                    </label>
                    <div className="btn-group mainButtonFilter">
                      <a
                        className={`btn ${
                          selectedVendorType === 'ALL_VENDORS' ? 'active' : ''
                        }`}
                        onClick={() => {
                          onVendorTypeChange('ALL_VENDORS');
                        }}
                      >
                        All
                      </a>
                      <a
                        className={`btn ${
                          selectedVendorType === 'S1' ? 'active' : ''
                        }`}
                        onClick={() => {
                          onVendorTypeChange('S1');
                        }}
                      >
                        S1
                      </a>
                      <a
                        className={`btn ${
                          selectedVendorType === 'S2' ? 'active' : ''
                        }`}
                        onClick={() => {
                          onVendorTypeChange('S2');
                        }}
                      >
                        S2
                      </a>
                      <a
                        className={`btn ${
                          selectedVendorType === 'S3' ? 'active' : ''
                        }`}
                        onClick={() => {
                          onVendorTypeChange('S3');
                        }}
                      >
                        S3
                      </a>
                    </div>
                  </>
                ) : (
                  ''
                )}
                <label className="filterSubHeading mt-3"> State </label>
                <select
                  className="filterSelect mt-2"
                  value={filters.state}
                  onChange={onStateSelection}
                >
                  <option value="">Select State</option>
                  {states.map((state, index) => {
                    return (
                      <option key={index} value={state}>
                        {state}
                      </option>
                    );
                  })}
                </select>

                <label className="filterSubHeading mt-3"> District </label>
                <select
                  className="filterSelect mt-2"
                  value={filters.district}
                  onChange={onDistrictSelection}
                  disabled={!filterVisibility.district}
                >
                  <option value="">Select District</option>
                  {districts.map((district, index) => {
                    return (
                      <option key={index} value={district}>
                        {district}
                      </option>
                    );
                  })}
                </select>
                <label className="filterSubHeading mt-3">
                  {filters.inventoryType === 'BREWERY' ? 'Brewery' : 'Vendor'}{' '}
                </label>
                <select
                  className="filterSelect mt-2"
                  disabled={!filterVisibility.organization}
                  value={filters.organization}
                  onChange={onOrganizationChange}
                >
                  <option value="">
                    Select{' '}
                    {filters.inventoryType === 'BREWERY' ? 'Brewery' : 'Vendor'}
                  </option>
                  {organizations.map((organization, index) => {
                    return (
                      <option key={index} value={organization.id}>
                        {organization.name}
                      </option>
                    );
                  })}
                </select>
                <label className="filterSubHeading mt-2"> SKU</label>
                <select
                  className="filterSelect mt-2"
                  value={filters.sku}
                  onChange={onSKUChange}
                >
                  <option>Select SKU</option>
                  {SKUs.map((sku, index) => {
                    return (
                      <option key={index} value={sku.id}>
                        {sku.name}
                      </option>
                    );
                  })}
                </select>
                <button
                  className="btn SearchButton mt-4"
                  onClick={resetFilters}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default Inventory;
