import React,{useEffect, useState} from 'react';
import { useDispatch } from 'react-redux'

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
        async function fetchData() {
          const result = await getRegions();
          setRegions(result.data.map(reg => reg.name));
       }
        fetchData();
      }, []);

        const onCountries = async (item) => {
           const countryResult = await getCountryByRegion(item);
        if (countryResult.status === 1) {
            setCountries(countryResult.data.countries)
        }
    }

    const onRegionChange = async item => {
        setRegion(item)
        onCountries(item);
        const regionResult = await getWareHousesByRegion(item);
        if (regionResult.status === 1) {
            setWareHouses(regionResult.data);
            props.setWarehouseArr(regionResult.data);
            const warehouseList = regionResult.data.map(w => w.id);
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
                    <img src={CloseIcon} alt="Close" with="30" height="30" />
                </button>
            </div>
            <div className="d-flex flex-column mb-2 region">
                <div className="form-group row mr-1">
                  <label htmlFor="shipmentId" className="mt-2 mr-3 col-4">Region</label>
                    <div className="form-control col">
                        <DropdownButton
                            name={region}
                            onSelect={onRegionChange}
                            groups={regions}
                        />
                    </div>
                </div>
                <div className="form-group row mr-1">
                    <label htmlFor="shipmentId" className="mt-2 mr-3 col-4">Country</label>
                    <div className="form-control col">
                        <DropdownButton
                            name={country}
                            onSelect={item =>
                                {
                                setCountry(item)
                                onWarehouses(item)
                                }
                            }
                            groups={countries}
                        />
                    </div>
                </div>
                <div className="form-group mb-4 row mr-1">
                    <label htmlFor="shipmentId" className="mt-2 mr-3 col-4">Location</label>
                    <div className="form-control col">
                        <DropdownButton
                            name={warehouseId}
                            onSelect={item => {
                                setWareHouseId(item)
                                onSearchWareHouse(item)
                            }}
                            groups={warehouseIds}
                        />
                    </div>
                </div>
            </div>
                <div className="mainsearchwarehouse">
                {warehouses.length > 0 && warehouses.map((w, index) =>
                <div key={index} className=" panel  mb-4 searchwarehouse dashsearch address searchpanel" onClick={() =>props.onWarehouseSelect(w.id)}>
                <div className="d-flex flex-row " >
                    <ul className="mr-3">
                        <li className="mb-2 text-secondary">Country ID</li>
                        <li className="mb-2 text-secondary">Country</li>
                        <li className="mb-2 text-secondary">Location</li>
                        <li className="mb-1 text-secondary">Location Name</li>
                    </ul>
                    <ul>
                        <li className="mb-2">{w.country.id}</li>
                        <li className="mb-2">{w.country.name}</li>
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
