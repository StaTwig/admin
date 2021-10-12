import React from 'react'
import './styles.scss'

const CustomDropdown = props => {
    return (
        <select className={'cst-drop-container'}
            onChange={(e) => props.onSelectOfRole(e)} value={props.selected}>
            {props.data &&
                props.data.map((item, index) => {
                    return (
                        <option
                            className = "cst-drop-container-menu"
                            key={index}
                            value={item.key}>
                            {item.value}
                        </option>
                    )
                })}
        </select>
    )
}

export default CustomDropdown
