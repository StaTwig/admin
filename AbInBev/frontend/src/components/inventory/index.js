import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";
import "./style.scss";
import SideBar from "../../components/sidebar";
import filterIcon from "../../assets/icons/funnel.svg";

import {
  getProductsInventory,
  getAllStates,
  getAllSKUs,
  getDistrictsByState,
  getOrganizationsByType
} from '../../actions/inventoryAction';

const Inventory = (props) => {
  const { inventories } = props;
  // const [buttonState0, setButtonActive] = useState("btn active");
  // const [buttonState1, setButtonActive1] = useState("btn");

  const [selectedInventoryType, setSelectedInventoryType] = useState('BREWERY')


  const dispatch = useDispatch();
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  // const [breweries, setBreweries] = useState([]);
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
    sku: '',
    inventoryType: 'BREWERY'
  });

  const onInventoryTypeChange = (inventoryType) => {
    setSelectedInventoryType(inventoryType);
    const _filters = { ...filters };
    _filters.inventoryType = inventoryType;
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

  const _getOrganizationsByType = async (orgType) => {
    const response = await dispatch(getOrganizationsByType(orgType));
    const _organizations = response.data ? response.data : [];
    setOrganizations(_organizations);
  }

  const onStateSelection = (event) => {
    const selectedState = event.target.value;
    const _filters = { ...filters };
    _filters.state = selectedState;
    setFilters(_filters);
    props.applyFilters(_filters);
    _getDistrictsByState(selectedState);

    const _filterVisibility = { ...filterVisibility };
    _filterVisibility.district = true;
    _filterVisibility.organization = false;
    setFilterVisibility(_filterVisibility);
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

    _getOrganizationsByType(filters.inventoryType);
  };

  const onSKUChange = (event) => {
    const selectedSKU = event.target.value;
    const _filters = { ...filters };
    _filters.sku = selectedSKU;
    setFilters(_filters);
    props.applyFilters(_filters);
  }

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
                <h1 className="h2">Inventory</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                  </svg>
                </div>
              </div>
              <div className="btn-group mainButtonFilter">
                <a
                  className={`btn ${selectedInventoryType === 'BREWERY' ? "active" : ""}`}
                  onClick={() => {
                    onInventoryTypeChange('BREWERY');
                  }}
                >
                  Brewery
                </a>
                <a
                  className={`btn ${selectedInventoryType === 'VENDOR' ? "active" : ""}`}
                  onClick={() => {
                    onInventoryTypeChange('VENDOR');
                  }}
                >
                  Vendor
                </a>
              </div>
              <div className="inventoryDetails">
                <table className="inventorytable">
                  <thead>
                    <tr>
                      <th className="inventoryHeader">Brand {/*<br/><span className="tableHeadersubtitle">Size</span>*/}</th>
                      <th className="inventoryHeader">SKU<br /><span className="tableHeadersubtitle">Stock Code</span></th>
                      <th className="inventoryHeader">Stock Long Description</th>
                      <th className="inventoryHeader">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventories.map((inventory, index) =>
                      <tr key={index}>
                        <td className="inventorydesc">{inventory.manufacturer} <br /><span className="inventorydescsubtitle">&nbsp;</span></td>
                        <td className="inventorydesc">{inventory.name}<br /><span className="inventorydescsubtitle">{inventory.externalId}</span></td>
                        <td>{inventory.shortName}</td>
                        <td>{inventory.quantity}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-md-3 rightSideMenu pt-5  px-3">
              <div className="filterSection">
                <div className="filterHeader">
                  <img src={filterIcon} className="filterIcon" /> FILTERS
                </div>
                <span className="pull-right pr-4 pl-4 pt-4 viewall"><a href="#">View All</a></span>
                <label className="filterSubHeading mt-3">Select State </label>
                <select className="filterSelect mt-2" value={filters.state} onChange={onStateSelection}>
                  <option value="">Select State</option>
                  {
                    states.map((state, index) => {
                      return <option key={index} value={state}>{state}</option>;
                    })
                  }
                </select>
                <label className="filterSubHeading mt-3">Select District </label>
                <select className="filterSelect mt-2" value={filters.district} onChange={onDistrictSelection} disabled={!filterVisibility.district}>
                  <option value="">Select District</option>
                  {
                    districts.map((district, index) => {
                      return <option key={index} value={district}>{district}</option>
                    })
                  }
                </select>
                <label className="filterSubHeading mt-3">Select Brewery </label>
                <select className="filterSelect mt-2" disabled={!filterVisibility.organization}>
                  <option value="">Select Brewery</option>
                  {
                    organizations.map((organization, index) => {
                      return <option key={index} value={organization.id}>{organization.name}</option>;
                    })
                  }
                </select>
                <label className="filterSubHeading mt-2">Select SKU</label>
                <select className="filterSelect mt-2" value={filters.sku} onChange={onSKUChange}>
                  <option>Select SKU</option>
                  {
                    SKUs.map((sku, index) => {
                      return <option key={index} value={sku.id}>{sku.name}</option>;
                    })
                  }
                </select>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div >
  );
};
export default Inventory;
