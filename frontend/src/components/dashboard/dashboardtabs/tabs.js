import React, { useState } from "react";
import searchingIcon from "../../../assets/icons/searching@2x.png";
import "./style.scss";

const Tabs = (props) => {
  const {
    filteredWareHouses,
    visible,
    setVisible,
    warehouseText,
    setWarehouseText,
    onWarehouseChange,
    onSearchClick,
    setContent,
    setDashVisible,
    warehouseArr,
    setWarehouseArr,
    setDashBarData,
    t
  } = props;
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div className='dashboardtabs'>
      <ul className='nav nav-pills mb-2'>
        <li
          className={visible ? "nav-item" : "nav-item-active"}
          onClick={() => {
            if (warehouseArr.length > 0) setWarehouseArr([]);
            setWarehouseText("");
            setDashVisible(false);
            setDashBarData({});
            setVisible(false);
          }}
        >
          <div className={visible ? "nav-link text-secondary" : "nav-link"}>
            {t('storage_location')}
          </div>
        </li>
        <li
          className={visible ? "nav-item-active " : "nav-item"}
          onClick={() => {
            if (warehouseArr.length > 0) setWarehouseArr([]);
            setWarehouseText("");
            setDashVisible(false);
            setDashBarData({});
            setVisible(true);
          }}
        >
          <div className={visible ? "nav-link" : "nav-link text-secondary"}>
            {t('shipment')}
          </div>
        </li>
        <li>
          <div className='search-form'>
            <input
              type='text'
              value={warehouseText}
              onChange={(e) => {
                if (isClicked) setIsClicked(false);
                onWarehouseChange(e.target.value);
              }}
              placeholder={visible ? t('enter') + " " + t('shipment_id') : t('enter') + " " + t('location_id')}
              className='form-control search-field'
            />
            <img
              src={searchingIcon}
              onClick={() => onSearchClick(warehouseText)}
              alt='searching'
            />
            {warehouseText !== "" && !isClicked && (
              <div
                className='bg-white m-1 p-2 position-absolute rounded'
                style={{ width: 250 }}
              >
                {filteredWareHouses?.map((warehouse, index) => (
                  <p
                    key={index}
                    className='p-2 m-1 cursorP border-bottom'
                    onClick={() => {
                      setIsClicked(true);
                      onWarehouseChange(
                        visible ? warehouse.id : warehouse.title
                      );
                      onSearchClick(warehouse.id);
                    }}
                  >
                    {visible
                      ? warehouse.id
                      : warehouse.title
                      ? warehouse.title
                      : warehouse.id}
                  </p>
                ))}
              </div>
            )}
          </div>
        </li>
        <li>
          {!visible && (
            <button
              className=' btn-primary btn warehouse'
              onClick={() => {
                setContent(false);
                setDashVisible(true);
              }}
            >
              {t('search') + ' ' + t('location')}
            </button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Tabs;
