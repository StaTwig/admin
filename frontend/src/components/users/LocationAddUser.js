import React, { useState,useEffect} from 'react'
import './location.scss'

const LocationAddUser = (props) => {

    const [select, setSelected] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState({})
    const [sndClickAnotherCard, setSndClickAnotherCard] = useState({});

    const addresses = props.addresses;
    const {  onSelect,name,getSelectedAddress,addUserBtnDisable } = props;

    const selectedValue = (selected) => {
        // getSelectedAddress(addUserBtnDisable ? false : true)
        const selectedValue = addresses.forEach((address,index) => {
            if(selected.id === address.id && addUserBtnDisable){
                // setSelected(true);
                // setSelectedAddress(selected)
                document.getElementById(`selectedCard${index}`).style.backgroundColor = '#DFF1F2';
            }
            else{
                document.getElementById(`selectedCard${index}`).style.backgroundColor = '#fff';
            }
        })

        setSndClickAnotherCard(
            {
                selectedCardId : selected.id,
                value : true
            }
        )
    }

    const unSelectCard = (selected) => {
        if(sndClickAnotherCard && selected.id === sndClickAnotherCard.selectedCardId) {
            getSelectedAddress(true)
        }
        else {
            getSelectedAddress(false)
        }
    }
  
    return (
        <React.Fragment>
            {addresses.map((address,index) => (
                <div 
                    id = {`selectedCard${index}`}
                    style ={{width : "27%", cursor:"pointer", position:"relative", backgroundColor:`${props.selectedAddress.warehouse === address.id ? "#DFF1F2" :""}`, left : `${props.addresses.length < 2 ? `3rem` : `unset`}`}}
                    className="card flex-row justify-content-between rounded border border-white shadow mt-3 ml-2 p-3"
                    onClick={() => {
                        unSelectCard(address)
                        onSelect(address);
                        selectedValue(address,index);
                        props.referance.current.setFieldValue('warehouse',address.id);
                        // document.getElementById(`selectedCard${index}`).style.backgroundColor = '#DFF1F2';
                    }}
                    key={address.id}
                    >
                    {/* {(selected && selectedAddress.id === address.id) ?   (
                        <span className="selectedValue">Selected</span>
                    ) : ``}
                 */}
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