import React,{useEffect, useState} from 'react'
import { getRegions,getCountryByRegion, getWareHousesByCountry} from '../../actions/inventoryActions';
import CloseIcon from '../../assets/icons/cross.svg';
import DropdownButton from '../dropdownButtonGroup';
import './style.scss'

   const SearchWareHouse = props => {
    const { warehouse} = props?.dashBarData;
    const [region,setRegion]= useState('Select Region')
    const [regions,setRegions]= useState([])
    const [country,setCountry] = useState('Select Country')
    const [countrys,setCountrys] = useState([])
    const [warehous,setWareHous]=useState('Select Warehouse')
    const [warehouses,setWareHouses]=useState([])

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
            setCountrys(countryResult.data.countries)
        }
    }

    const onWarehouses = async (item) => {
        const warehousesResult = await getWareHousesByCountry(item);
     if (warehousesResult.status === 1) {
         setWareHouses(warehousesResult.data)
     }
 }

    return (
        <div className="dashbar">
            <div>
                <button type="button" className="close" onClick={() =>
                    {
                        props.setDashVisible(false)
                        props.setDashBarData({})
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
                            groups={countrys}
                        />
                    </div>
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="shipmentId" className="mt-2">Warehouse</label>
                    <div className="form-control ml-4">
                        <DropdownButton
                            name={warehous}
                            onSelect={item => {
                                setWareHous(item)
                                props.onSearchWareHouse(item)
                            }}
                            groups={warehouses}
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
            </div>

        </div>
    )
}

export default SearchWareHouse;