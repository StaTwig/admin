import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./style.scss";
import DropdownButton from "../../shared/dropdownButtonGroup";
import Date_time from "../../assets/icons/date_time.png";
import Product from "../../assets/icons/product.png";
import mobile from "../../assets/icons/mobile.png";
import idprrof from "../../assets/icons/idproof.png";
import patient from "../../assets/icons/patient.png";
import pingrey from "../../assets/icons/pingrey.png";
import TableFilter from "./tablefilter.js";
import { getEOLInfo } from "../../actions/eolAction";
import { getProductsByWarehouse } from "../../actions/eolAction";
import {
  GetCountriesFromWarehouses,
  GetStatesFromWarehouses,
  GetCitiesFromWarehouses,
  GetWarehousesWithCity,
} from "../../actions/inventoryActions";

import Table from "./table";
const LastMile = (props) => {
  const dispatch = useDispatch();
  // var lastmile = props.lastMile;
  const lastMileCount = useSelector((state) => {
    return state.lastMileCount;
  });

  const [region, setRegion] = useState("");
  const [regions] = useState(["Asia"]);
  const [country, setCountry] = useState("");
  const [state, setstate] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [district, setdistrict] = useState("");
  const [location, setlocation] = useState("");
  const [locations, setLocations] = useState("");
  const [product, setproduct] = useState("");
  const [products, setProducts] = useState([]);
  const [countries, setCountries] = useState([]);
  const [Address, setAddress] = useState("");
  const [locationCountry, setlocationCountry] = useState("");
  const [locationState, setlocationState] = useState("");
  const [locationName, setlocationName] = useState("");
  const [limit] = useState(10);
  const [warehouseTitle, setwarehouseTitle] = useState("");
  // const [skip, setSkip] = useState(0);
  const headers = {
    coloumn1: "Beneficiary Details",
    coloumn2: "ID Proof",
    coloumn3: "Mobile No",
    coloumn4: "Product",
    coloumn5: "Date & Time",

    img1: <img src={patient} width='15' height='20' className='pb-1' alt='' />,
    img2: <img src={idprrof} width='20' height='20' className='pb-1' alt='' />,
    img3: <img src={mobile} width='16' height='25' className='pb-1' alt='' />,
    img4: <img src={Product} width='20' height='22' className='pb-1' alt='' />,
    img5: (
      <img src={Date_time} width='19' height='22' className='pb-1' alt='' />
    ),
  };

  function cardFill(obj) {
    setwarehouseTitle(
      JSON.stringify(obj.productAdministeredInfo[0].locationInfo.warehouseTitle)
    );
    setlocationCountry(obj.eol_info.contact_address.country);
    setlocationState(obj.eol_info.contact_address.state);
    setlocationName(
      obj.eol_info.contact_address.firstLine +
        " " +
        obj.eol_info.contact_address.secondLine
    );
    setAddress(
      obj.eol_info.contact_address.firstLine +
        " " +
        obj.eol_info.contact_address.secondLine +
        " " +
        obj.eol_info.contact_address.landmark +
        " " +
        obj.eol_info.contact_address.state +
        " " +
        obj.eol_info.contact_address.country +
        " " +
        obj.eol_info.contact_address.zipcode
    );
  }
  useEffect(() => {
    async function fetchData() {
      // setLastMile(props)
      // const eol_ProductID = await GetEOLInfoByProductId("pro123456");
      // const regions = await getRegions();
      // console.log(regions.data[0].country)
      // setCountries(regions.data[0].country)
      // const statess = await dispatch(getAllStates());
      // console.log(statess)
      //console.log(eol_ProductID);
    }
    fetchData();
  }, []);

  const onPageChange = async (pageNum) => {
    console.log("onPageChange =========>", pageNum);
    const recordSkip = (pageNum - 1) * limit;
    // setSkip(recordSkip);
    dispatch(
      getEOLInfo(recordSkip, limit, product, country, state, district, location)
    );
  };

  const onFilter = async (type, item) => {
    if (type === "region") {
      console.log(region);
      const countries = await GetCountriesFromWarehouses(item);
      let arr = [];
      setstate("");
      setlocation("");
      setproduct("");
      countries.data.forEach((element) => {
        if (element._id) arr.push(element._id);
      });
      setCountries(arr);
      setCountry("");
      setdistrict("");
      // dispatch(getEOLInfo(0, 10, product, country, state, district, location, region));
    }
    if (type === "country") {
      console.log(region);
      const states = await GetStatesFromWarehouses(item);
      let arr = [];
      const country = item;
      states.data.forEach((element) => {
        if (element._id) arr.push(element._id);
      });
      setStates(arr);
      setstate("");
      setlocation("");
      setproduct("");
      setdistrict("");

      dispatch(
        getEOLInfo(0, 10, country, state, district, location, product, region)
      );
    }
    if (type === "state") {
      const cities = await GetCitiesFromWarehouses(item);
      let arr = [];
      const state = item;
      cities.data.forEach((element) => {
        if (element._id) arr.push(element._id);
      });
      setCities(arr);
      setlocation("");
      setproduct("");
      setdistrict("");
      // console.log(country, state, district, location, product,region);
      dispatch(
        getEOLInfo(0, 10, country, state, district, location, product, region)
      );
    }
    if (type === "city") {
      const cities = await GetWarehousesWithCity(item);
      let arr = [];
      const district = item;
      cities.data.forEach((element) => {
        if (element._id) arr.push(element._id);
      });
      setLocations(arr);
      setlocation("");
      setproduct("");
      // console.log(country, state, district, location, product,region);
      dispatch(
        getEOLInfo(0, 10, country, state, district, location, product, region)
      );
    }
    if (type === "location") {
      const products = await getProductsByWarehouse(item);
      console.log(products);
      let arr = [];
      const location = item;
      products.data.forEach((element) => {
        if (element._id) arr.push(element._id);
      });
      setProducts(arr);
      setproduct("");

      // console.log(country, state, district, location, product,region);
      dispatch(
        getEOLInfo(0, 10, country, state, district, location, product, region)
      );
    }
    if (type === "product") {
      const product = item;
      dispatch(
        getEOLInfo(0, 10, country, state, district, location, product, region)
      );
    }
  };

  return (
    <div>
      <div>
        <div
          className='lastmile'
          style={{ position: "relative", left: "-22px", top: "-20px" }}
        >
          <h1 className='breadcrumb'>LAST MILE</h1>
          {/* <button className="btn btn-main-blue float-center ml-5" style={{position:"absolute", left:"690px"}}> 
              <img src={ExportIcon} width="16" height="16" className="mr-3" />
              <span>Export</span>
              <img src={dropdownIcon} width="12" height="12" className="ml-3" />
</button> */}
          <div className='row'>
            <div className='col tab' style={{ width: "100%" }}>
              <div className=''>
                <TableFilter data={headers} fb='79%' />
              </div>
            </div>
          </div>
          <div className='ribben-space' style={{ width: "76%" }}>
            <Table
              {...props}
              cardFill={cardFill}
              lastMile={props.lastMile}
              count={lastMileCount}
              onPageChange={onPageChange}
            />
          </div>
        </div>

        <div className='col-xl-3'>
          <div className='dashbar'>
            <div className='d-flex flex-column mb-2 region pt-4'>
              <div className='form-group row mr-1'>
                <label htmlFor='shipmentId' className='mt-2 col-4 text-left'>
                  Region
                </label>
                <div
                  className='form-control col'
                  style={{ borderBottom: "2px solid #d6d6d6" }}
                >
                  <DropdownButton
                    name={region === "" ? "Region" : region}
                    groups={regions}
                    onSelect={(item) => {
                      setRegion(item);
                      onFilter("region", item);
                    }}
                  />
                </div>
              </div>
              <div className='form-group row mr-1'>
                <label htmlFor='shipmentId' className='mt-2 col-4 text-left'>
                  Country
                </label>
                <div
                  className='form-control col'
                  style={{ borderBottom: "2px solid #d6d6d6" }}
                >
                  <DropdownButton
                    name={country === "" ? "Select Country" : country}
                    groups={countries}
                    onSelect={(item) => {
                      setCountry(item);
                      onFilter("country", item);
                    }}
                  />
                </div>
              </div>
              <div className='form-group row mr-1'>
                <label htmlFor='shipmentId' className='mt-2 col-4 text-left'>
                  State
                </label>
                <div
                  className='form-control col'
                  style={{ borderBottom: "2px solid #d6d6d6" }}
                >
                  <DropdownButton
                    name={state === "" ? "Select State" : state}
                    groups={states}
                    onSelect={(item) => {
                      setstate(item);
                      onFilter("state", item);
                    }}
                  />
                </div>
              </div>
              <div className='form-group row mr-1'>
                <label htmlFor='shipmentId' className='mt-2 col-4 text-left'>
                  District
                </label>
                <div
                  className='form-control col'
                  style={{ borderBottom: "2px solid #d6d6d6" }}
                >
                  <DropdownButton
                    name={district === "" ? "Select District" : district}
                    groups={cities}
                    onSelect={(item) => {
                      setdistrict(item);
                      onFilter("city", item);
                    }}
                  />
                </div>
              </div>
              <div className='form-group row mr-1'>
                <label htmlFor='shipmentId' className='mt-2 col-4 text-left'>
                  Location
                </label>
                <div
                  className='form-control col'
                  style={{ borderBottom: "2px solid #d6d6d6" }}
                >
                  <DropdownButton
                    name={location === "" ? "Select Location" : location}
                    groups={locations}
                    onSelect={(item) => {
                      setlocation(item);
                      onFilter("location", item);
                    }}
                  />
                </div>
              </div>
              <div className='form-group mb-4 row mr-1'>
                <label htmlFor='shipmentId' className='mt-2 col-4 text-left'>
                  Product
                </label>
                <div
                  className='form-control col'
                  style={{ borderBottom: "2px solid #d6d6d6" }}
                >
                  <DropdownButton
                    name={product === "" ? "Select Product" : product}
                    groups={products}
                    onSelect={(item) => {
                      setproduct(item);
                      onFilter("product", item);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className='mainsearchwarehouse'>
              <div className=' panel  mb-3 searchpanel'>
                <div>{warehouseTitle}</div>
                {/* <div>
                        <u>
                            <small>
                                "wallet1234 Address"  
                                &nbsp;
                            </small>
                        </u>
                    </div> */}
                <div className='d-flex text-white mt-2 flex-row '>
                  <ul className='mr-3 text-light'>
                    {/* <li className="mb-1">Country ID</li> */}
                    <li className='mb-3'>Country</li>
                    <li className='mb-3'>Location</li>
                    <li className='mb-3'>Location Name</li>
                  </ul>
                  <ul className='text-light'>
                    {/* <li className="mb-1">{countryId}</li> */}
                    <li className='mb-3'>{locationCountry}</li>
                    <li className='mb-3'>{locationState}</li>
                    <li className='mb-3'>{locationName}</li>
                  </ul>
                </div>
              </div>
              <div className='panel address searchpanel mb-2 mt-3 ml-1 mr-1'>
                <div className='row'>
                  <img src={pingrey} height='20' width='15' alt=''></img>
                  <div className='ml-2' style={{ fontSize: "13px" }}>
                    Address
                  </div>
                </div>
                <div className='ml-2'>{Address}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastMile;
