import Autocomplete from '@material-ui/lab/Autocomplete';
import React,{useEffect, useState} from 'react';
import { useDispatch } from 'react-redux'
import { fetchAllRegions,fetchCountriesByRegion } from '../../actions/productActions';
import {
    getRegions,
    getCountryByRegion,
    getWareHousesByCountry,
    getWareHousesByRegion,
    getProductDetailsByWarehouseId
} from '../../actions/inventoryActions';
import CloseIcon from '../../assets/icons/cross.svg';
import DropdownButton from '../dropdownButtonGroup';
import './style.scss'
import { TextField } from '@material-ui/core';
   const SearchWareHouse = props => {
       const dispatch = useDispatch();
    const [region,setRegion]= useState('Select Region')
    const [regions,setRegions]= useState([])
    const [country,setCountry] = useState('Select Country')
    const [countries,setCountries] = useState([])
    const [warehouseId,setWareHouseId]=useState('Select Location')
    const [warehouses,setWareHouses]=useState([]);
    const [warehouseIds,setWareHouseIds]=useState([]);
    const [ products, setProducts ] = useState([]);
    const [ warehouse, setWarehouse ] = useState({});
    useEffect(() => {
    async function fetchAllRegions1(){
        let arr = await fetchAllRegions();
        console.log(arr);
        setRegions(arr.data);
      }
      fetchAllRegions1();
      }, []);

    //     const onCountries = async (item) => {
    //        const countryResult = await getCountryByRegion(item);
    //     if (countryResult.status === 1) {
    //         setCountries(countryResult.data.countries)
    //     }
    // }
    async function fetchAllCountries1(id){
        let res = await fetchCountriesByRegion(id);
        console.log("res",res);
        setCountries(x=>res.data);
        console.log("countries",countries);
      };

    const onRegionChange = async (item) => {
        const warehousesResult = await getWareHousesByRegion(item);
     if (warehousesResult.status === 1) {
         setWareHouses(warehousesResult.data);
         props.setWarehouseArr(warehousesResult.data);
         const warehouseList = warehousesResult.data.map(w => w.id);
         setWareHouseIds(warehouseList);
     }
 }


    const onCountryChange = async item => {
        setRegion(item)
        onCountries(item);
        const regionResult = await getWareHousesByCountry(item);
        if (regionResult.status === 1) {
            setWareHouses(regionResult.data);
            const warehouseList = regionResult.data.map(w => w.id);
            setWareHouseIds(warehouseList);
        }
    }

    const onWarehouses = async (item) => {
        const warehousesResult = await getWareHousesByCountry(item);
     if (warehousesResult.status === 1) {
         setWareHouses(warehousesResult.data);
         props.setWarehouseArr(warehousesResult.data);
         const warehouseList = warehousesResult.data.map(w => w.id);
         setWareHouseIds(warehouseList);
     }
 }
       const onSearchWareHouse = async (warehouseId) => {
            props.onWarehouseSelect(warehouseId);
       }
    return (
        <div className="dashbar">
            <div>
                <button type="button" className="close" onClick={() =>
                    {
                        props.setDashVisible(false)
                        //props.setDashBarData({})
                    }
                }>
                    <img src={CloseIcon} alt="Close" with="30" height="30" className="close-icon" />
                </button>
            </div>
            <div className="d-flex flex-column mb-2 region">
                <div className="form-group row mr-1 mt-2">
                  <label htmlFor="shipmentId" className="mt-2 mr-3 col-3 text-left">Region</label>
                    <div className="form-control col">
                        <Autocomplete
                        value={region}
                        onChange={(event,newValue)=>{
                            fetchAllCountries1(newValue);
                            setRegion(newValue);
                            onRegionChange(newValue);
                            setCountry('');
                            setWareHouseId('');

                        }}
                        options={regions}
                        renderInput={(params)=><TextField {...params}/>}
                        />
                    </div>
                </div>
                <div className="form-group row mr-1">
                    <label htmlFor="shipmentId" className="mt-2 mr-3 col-3 text-left">Country</label>
                    <div className="form-control col">
                        <Autocomplete
                        value={country}
                        onChange={(event,newValue)=>{
                            setCountry(newValue)
                            onWarehouses(newValue)
                            setWareHouseId('')
                        }}
                        options={countries.map((option)=>option.name)}
                        renderInput={(params)=><TextField {...params}/>}
                        />
                    </div>
                </div>
                <div className="form-group mb-4 row mr-1">
                    <label htmlFor="shipmentId" className="mt-2 mr-3 col-3 text-left">Location</label>
                    <div className="form-control col">
                        <Autocomplete
                        value={warehouseId}
                        onChange={(event,newValue)=>{
                            setWareHouseId(newValue);
                            onSearchWareHouse(newValue);
                        }}
                        options={warehouseIds}
                        renderInput={(params)=><TextField {...params}/>}
                        />
                    </div>
                </div>
            </div>
                <div className="mainsearchwarehouse">
                {warehouses.length > 0 && warehouses.map((w, index) =>
                <div key={index} className=" mb-4 searchwarehouse dashsearch address searchpanel" onClick={() =>props.onWarehouseSelect(w.id)}>
                <div className="d-flex flex-row " >
                    <ul className="mr-3">
                        <li className="mb-2 text-secondary">Country ID</li>
                        <li className="mb-2 text-secondary">Country</li>
                        <li className="mb-2 text-secondary">Location</li>
                        <li className="mb-1 text-secondary">Location Name</li>
                    </ul>
                    <ul>
                        <li className="mb-2">{w.country.id ? w.country.id : w.country.countryId}</li>
                        <li className="mb-2">{w.country.name ? w.country.name : w.country.countryName}</li>
                        <li className="mb-2">{w.id}</li>
                        <li className="mb-1">{w.title}</li>
                    </ul>
                </div>
                </div>)}
                </div>


        </div>
    )
}

export default SearchWareHouse;
