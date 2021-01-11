import React from 'react'
import CloseIcon from '../../assets/icons/cross.svg';
import DropdownButton from '../dropdownButtonGroup';
import './style.scss'

const SearchWareHouse = (props) => {
    const region = "Select Region"
    const country = "Select Country"
    const warehouse = "Select Warehouse"

    return (
        <div className="dashbar">
            <div>
                <button type="button" className="close" onClick={() => props.setDashVisible(false)}>
                    <img src={CloseIcon} alt="Close" with="30" height="30" />
                </button>
            </div>
            <div className="d-flex flex-column mb-2 region">
                <div className="form-group">
                  <label htmlFor="shipmentId" className="mt-2">Region</label>
                    <div className="form-control ml-5">
                        <DropdownButton
                            name={region}
                            onSelect={item => (item)}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="shipmentId" className="mt-2 countr">Country</label>
                    <div className="form-control">
                        <DropdownButton
                            name={country}
                            onSelect={item => (item)}
                        />
                    </div>
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="shipmentId" className="mt-2">Warehouse</label>
                    <div className="form-control ml-4">
                        <DropdownButton
                            name={warehouse}
                            onSelect={item => (item)}
                        />
                    </div>
                </div>
            </div>
            <div className=" panel  mb-4 searchwarehouse address searchpanel">
            <div className="d-flex flex-row ">
                    <ul className="mr-3">
                        <li className="mb-2 text-secondary">Country ID</li>
                        <li className="mb-2 text-secondary">Country</li>
                        <li className="mb-2 text-secondary">Warehouse</li>
                        <li className="mb-1 text-secondary">Warehouse Name</li>
                    </ul>
                    <ul>
                        <li className="mb-2">India</li>
                        <li className="mb-2">democartic of serum</li>
                        <li className="mb-2">123</li>
                        <li className="mb-1">warehouse 123</li>
                    </ul>
            </div>
            </div>
            <div className=" panel  mb-4 searchwarehouse address searchpanel">
            <div className="d-flex flex-row ">
                    <ul className="mr-3">
                        <li className="mb-2 text-secondary">Country ID</li>
                        <li className="mb-2 text-secondary">Country</li>
                        <li className="mb-2 text-secondary">Warehouse</li>
                        <li className="mb-1 text-secondary">Warehouse Name</li>
                    </ul>
                    <ul>
                        <li className="mb-2">India</li>
                        <li className="mb-2">democartic of serum</li>
                        <li className="mb-2">123</li>
                        <li className="mb-1">warehouse 123</li>
                    </ul>
            </div>
            </div>
            <div className=" panel  mb-4 searchwarehouse address searchpanel">
            <div className="d-flex flex-row ">
                    <ul className="mr-3">
                        <li className="mb-2 text-secondary">Country ID</li>
                        <li className="mb-2 text-secondary">Country</li>
                        <li className="mb-2 text-secondary">Warehouse</li>
                        <li className="mb-1 text-secondary">Warehouse Name</li>
                    </ul>
                    <ul>
                        <li className="mb-2">India</li>
                        <li className="mb-2">democartic of serum</li>
                        <li className="mb-2">123</li>
                        <li className="mb-1">warehouse 123</li>
                    </ul>
            </div>
            </div>

        </div>
    )
}

export default SearchWareHouse;