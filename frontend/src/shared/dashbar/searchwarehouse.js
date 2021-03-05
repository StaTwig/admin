import React,{useEffect, useState} from 'react';
import { useDispatch } from 'react-redux'

import {
    getRegions,
    getCountryByRegion,
    getWareHousesByCountry,
    getProductDetailsByWarehouseId
} from '../../actions/inventoryActions';
import CloseIcon from '../../assets/icons/cross.svg';
import DropdownButton from '../dropdownButtonGroup';
import './style.scss'
import {Link} from "react-router-dom";
import {turnOff, turnOn} from "../../actions/spinnerActions";

   const SearchWareHouse = props => {
       const dispatch = useDispatch();
    const [region,setRegion]= useState('Select Region')
    const [regions,setRegions]= useState([])
    const [country,setCountry] = useState('Select Country')
    const [countries,setCountries] = useState([])
    const [warehouseId,setWareHouseId]=useState('Select Warehouse')
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

    const onWarehouses = async (item) => {
        const warehousesResult = await getWareHousesByCountry(item);
     if (warehousesResult.status === 1) {
         setWareHouses(warehousesResult.data);
         const warehouseList = warehousesResult.data.map(w => w.id);
         setWareHouseIds(warehouseList);
     }
 }
       const onSearchWareHouse = async (warehouseId) => {
           dispatch(turnOn());
           const result = await getProductDetailsByWarehouseId(warehouseId);
           setProducts(result.productArray);
           setWarehouse(result.warehouse);
           dispatch(turnOff());
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
                <div className="form-group">
                  <label htmlFor="shipmentId" className="mt-2">Region</label>
                    <div className="form-control ml-5">
                        <DropdownButton
                            name={region}
                            onSelect={item =>
                                {
                                setRegion(item)
                                onCountries(item)
                                }
                            }
                            groups={regions}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="shipmentId" className="mt-2 countr">Country</label>
                    <div className="form-control">
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
                <div className="form-group mb-4">
                    <label htmlFor="shipmentId" className="mt-2">Warehouse</label>
                    <div className="form-control ml-4">
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
            <div className=" panel  mb-4 searchwarehouse dashsearch address searchpanel">
            <div className="d-flex flex-row ">
                    <ul className="mr-3">
                        <li className="mb-2 text-secondary">Country ID</li>
                        <li className="mb-2 text-secondary">Country</li>
                        <li className="mb-2 text-secondary">Warehouse</li>
                        <li className="mb-1 text-secondary">Warehouse Name</li>
                    </ul>
                    <ul>
                        <li className="mb-2">{warehouse?.warehouseCountryId}</li>
                        <li className="mb-2">{warehouse?.warehouseCountryName}</li>
                        <li className="mb-2">{warehouse?.warehouseId}</li>
                        <li className="mb-1">{warehouse?.warehouseName}</li>
                    </ul>
            </div>
                <div className="panel address searchpanel prodpanel d-flex flex-column">
                    {products?.map(product => <div className="mb-1 subprod">
                        <div className="text-primary" key={product.productId}>
                            <strong>{product.productName}</strong>
                        </div>
                        <div className="d-flex flex-row mb-1">
                            <div className="mr-3 text-secondary">Manufacture : {product.manufacturer}</div>
                            <div className="text-secondary">
                                Quantity : <span className="text-info">{product.quantity}</span>
                            </div>
                        </div>
                        <Link to="/productlist/all">
                            <button className="btn btn-outline-info fontSize200 sho mb-2 mt-1">
                                SHOW MORE
                            </button>
                        </Link>
                    </div>)}
                </div>
            </div>

        </div>
    )
}

export default SearchWareHouse;