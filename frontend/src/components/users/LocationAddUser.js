import React, { useState,useEffect} from 'react'
import './location.scss'

const LocationAddUser = (props) => {

    const [selected, setSelected] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState({})

    const addresses = props.addresses;
    const {  onSelect,name } = props;

    const selectedValue = (selected) => {
        setSelected(false);

        const selectedValue = addresses.find((address,index) => {
            if(selected.id === address.id){
                setSelected(true);
                setSelectedAddress(selected)
            }
        })
    }
  
    return (
        <React.Fragment>
            {addresses.map((address,index) => (
                <div 
                    style ={{width : "27%", cursor:"pointer", position:"relative"}}
                    className="card flex-row justify-content-between rounded border border-white shadow bg-white mt-3 ml-2 p-3"
                    onClick={() => {
                        onSelect(address);
                        selectedValue(address);
                        props.referance.current.setFieldValue('warehouse',address.id)
                    }}
                    key={address.id}
                    >
                    {(selected && selectedAddress.id === address.id) ?   (
                        <span className="selectedValue">Selected</span>
                    ) : ``}
                
                    <div className="addressalign">
                        <span className = "title">{address.title}</span><br/>
                        <span className = "secondAddress">{address.warehouseAddress.city}, {address.warehouseAddress.state}, {address.warehouseAddress.country}</span><br/>
                        <span>{address.warehouseAddress.firstLine}, <br/>
                            {address.warehouseAddress.city}, <br/>
                            {address.warehouseAddress.state}
                        </span><br/>
                        <span>{`Zipcode: ${address.warehouseAddress.zipCode}`}</span>
                    </div>
                </div>
            ))}
        </React.Fragment>
    )
}

export default LocationAddUser
