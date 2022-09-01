import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Search } from "@mui/icons-material";
import "./style.scss";

const Tabs = (props) => {
  const {
    filteredWareHouses,
    visible,
    setVisible,
    setWarehouseText,
    onWarehouseChange,
    onSearchClick,
    setContent,
    setDashVisible,
    warehouseArr,
    setWarehouseArr,
    setDashBarData,
    t,
  } = props;
  const [isClicked, setIsClicked] = useState(false);

  console.log(filteredWareHouses);
  return (
    <div className='dashboardtabs'>
      <ul className='nav nav-pills mb-2 flex-sb'>
        <div className='left-flex'>
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
              {t("storage_location")}
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
              {t("shipment")}
            </div>
          </li>
        </div>
        <div className='right-flex'>
          <div>
            <div style={{ position: "relative" }}>
              <Autocomplete
                freeSolo
                id='free-solo-2-demo'
                disableClearable
                sx={{ width: "300px" }}
                options={filteredWareHouses.map((warehouse) => warehouse)}
                getOptionLabel={(warehouse) =>
                  visible ? warehouse.id : warehouse.title
                }
                onChange={(e, key) => {
                  onSearchClick(key.id);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    disableClearable
                    placeholder={
                      visible
                        ? t("enter") + " " + t("shipment_id")
                        : t("enter") + " " + t("location_id")
                    }
                    InputProps={{
                      ...params.InputProps,
                      type: "searcH",
                    }}
                    onChange={(e) => {
                      if (isClicked) setIsClicked(false);
                      onWarehouseChange(e.target.value);
                    }}
                    onClick={() => onWarehouseChange("")}
                    size='small'
                    className="mi-auto-height"
                  />
                )}
              />
              <Search
                className='network-search-icon darkblue'
                style={{}}
                onClick={() => onSearchClick()}
              />
            </div>
          </div>
          <div>
            {!visible && (
              <button
                className='mi-btn mi-btn-md mi-btn-primary'
                onClick={() => {
                  setContent(false);
                  setDashVisible(true);
                }}
              >
                {t("search") + " " + t("location")}
              </button>
            )}
          </div>
        </div>
      </ul>
    </div>
  );
};

export default Tabs;
