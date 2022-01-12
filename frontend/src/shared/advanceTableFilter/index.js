import React from "react";
import updownarrow from "../../assets/icons/up-and-down-1.svg";
import FilterIcon from "../../assets/icons/Filter.svg";
import ExportIcon from "../../assets/icons/Export.svg";
import dropdownIcon from "../../assets/icons/drop-down.svg";
import "./style.scss";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import FilterDropDown from "../../components/filterDropDown";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #D3D4D5",
    width: "10%",
    borderRadius: "15px",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));
const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      /* backgroundColor: theme.palette.primary.main, */
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);
const AdvanceTableFilter = (props) => {
  const { t } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [statusAnchorEl, setStatusAnchorEl] = React.useState(null);
  const [toShipmentAnchorEl, setToShipmentAnchorEl] = React.useState(null);
  const [fromShipmentAnchorEl, setFromShipmentAnchorEl] = React.useState(null);
  const [shipmentIdAnchorEl, setShipmentIdAnchorEl] = React.useState(null);
  const [poDeliveryLocationAnchorEl, setPoDeliveryLocationAnchorEl] =
    React.useState(null);
  const [poProductNameAnchorEl, setPoProductNameAnchorEl] =
    React.useState(null);
  const [poOrderIdAnchorEl, setPoOrderIdAnchorEl] = React.useState(null);
  const [poFromAnchorEl, setPoFromAnchorEl] = React.useState(null);
  const [poToAnchorEl, setPoToAnchorEl] = React.useState(null);
  const [inventoryStatusAnchorEl, setInventoryStatusAnchorEl] =
    React.useState(null);
  const [inventoryProductNameAnchorEl, setInventoryProductNameAnchorEl] =
    React.useState(null);
  const [
    inventoryProductCategoryAnchorEl,
    setInventoryProductCategoryAnchorEl,
  ] = React.useState(null);
  const [inventoryManufacturerAnchorEl, setInventoryManufacturerAnchorEl] =
    React.useState(null);
  const [inventoryfiFilterOnSelect, setInventoryfiFilterOnSelect] =
    React.useState(null);

  const renderColumn6 = (columnData) => {
    if (columnData === "Status") {
      return (
        <th
          className="cursorP table-border-right"
          onClick={handleInventoryStatusClick}
        >
          <div className="cursorP d-flex align-items-center">
            <div className="icon">{props.data.img6}</div>
            <div className="mx-2 table-text-filter">
              {props.data.displayColoumn6}
            </div>
            <img src={updownarrow} height="10" width="15" alt="" />
          </div>
          <StyledMenu
            className="ml-5 mt-3"
            style={{ width: "160rem" }}
            id="customized-menu"
            anchorEl={inventoryStatusAnchorEl}
            keepMounted
            onBlur={handleInventoryStatusClose}
            open={Boolean(inventoryStatusAnchorEl)}
            onClose={handleInventoryStatusClose}
          >
            <div className="d-flex flex-column align-items-center">
              <StyledMenuItem>
                <button
                  style={{
                    padding: "10px",
                    height: "40px",
                    width: "180px",
                    borderRadius: "10px",
                  }}
                  className="btn btn-outline-success btn-sm font-weight-bold"
                  color="primary"
                  onClick={() => setStatusFilterOnSelect("ACCEPTED")}
                >
                  {t("accepted")}
                </button>
              </StyledMenuItem>
              <StyledMenuItem>
                <button
                  style={{
                    padding: "10px",
                    height: "40px",
                    width: "180px",
                    borderRadius: "10px",
                  }}
                  className="btn btn-outline-primary btn-sm font-weight-bold"
                  color="primary"
                  onClick={() => setStatusFilterOnSelect("CREATED")}
                >
                  {props.visible === "one" ? t("sent") : t("received")}
                </button>
              </StyledMenuItem>

              <StyledMenuItem>
                <button
                  style={{
                    padding: "10px",
                    height: "40px",
                    width: "200px",
                    borderRadius: "10px",
                  }}
                  className="btn btn-outline-warning btn-sm font-weight-bold"
                  color="primary"
                  onClick={() =>
                    setStatusFilterOnSelect("TRANSIT%26PARTIALLYFULFILLED")
                  }
                >
                  {t("transitpartiallyfilled")}
                </button>
              </StyledMenuItem>

              <StyledMenuItem>
                <button
                  style={{
                    padding: "10px",
                    height: "40px",
                    width: "180px",
                    borderRadius: "10px",
                  }}
                  className="btn btn-outline-info btn-sm font-weight-bold"
                  color="primary"
                  onClick={() =>
                    setStatusFilterOnSelect("TRANSIT%26FULLYFULFILLED")
                  }
                >
                  {t("transitfullyfilled")}
                </button>
              </StyledMenuItem>

              <StyledMenuItem>
                <button
                  style={{
                    padding: "10px",
                    height: "40px",
                    width: "180px",
                    borderRadius: "10px",
                  }}
                  className="btn btn-outline-info btn-sm font-weight-bold"
                  color="primary"
                  onClick={() => setStatusFilterOnSelect("FULLYFULFILLED")}
                >
                  {t("fullyfilled")}
                </button>
              </StyledMenuItem>
              <StyledMenuItem>
                <button
                  style={{
                    padding: "10px",
                    height: "40px",
                    width: "180px",
                    borderRadius: "10px",
                  }}
                  className="btn btn-outline-secondary btn-sm font-weight-bold"
                  color="primary"
                  onClick={() => setStatusFilterOnSelect("REJECTED")}
                >
                  {t("rejected")}
                </button>
              </StyledMenuItem>
              <StyledMenuItem>
                <button
                  className="btn btn-link btn-sm font-weight-bold"
                  color="primary"
                  onClick={() => setStatusFilterOnSelect("")}
                >
                  {t("clear")}
                </button>
              </StyledMenuItem>
            </div>
          </StyledMenu>
        </th>
      );
    } else {
      return (
        <th
          className="cursorP table-border-right"
          onClick={handleInventoryStatusClick}
        >
          <div className="cursorP d-flex align-items-center">
            <div className="icon">{props.data.img6}</div>
            <div className="mx-2 table-text-filter">
              {props.data.displayColoumn6}
            </div>
            <img src={updownarrow} height="10" width="15" alt="" />
          </div>
          <StyledMenu
            className="filter-dropdown"
            style={{ width: "100rem" }}
            id="customized-menu"
            anchorEl={inventoryStatusAnchorEl}
            keepMounted
            // onBlur={handleInventoryStatusClose}
            open={Boolean(inventoryStatusAnchorEl)}
            onClose={handleInventoryStatusClose}
          >
            <div className="d-flex flex-column align-items-center">
              <StyledMenuItem>
                <button
                  style={{
                    padding: "0px",
                    height: "40px",
                    width: "130px",
                    borderRadius: "10px",
                  }}
                  className="btn btn-outline-primary btn-sm font-weight-bold"
                  variant="outlined"
                  color="primary"
                  onClick={() => setStatusFilterOnSelect("CREATED")}
                >
                  {t("shipped")}
                </button>
              </StyledMenuItem>
              <StyledMenuItem>
                <button
                  style={{
                    padding: "0px",
                    height: "40px",
                    width: "130px",
                    borderRadius: "10px",
                  }}
                  className="btn btn-outline-success btn-sm font-weight-bold"
                  variant="outlined"
                  color="primary"
                  onClick={() => setStatusFilterOnSelect("RECEIVED")}
                >
                  {t("delivered")}
                </button>
              </StyledMenuItem>
              <StyledMenuItem>
                <button
                  className="btn btn-link btn-sm font-weight-bold"
                  color="primary"
                  onClick={() => setStatusFilterOnSelect("")}
                >
                  {t("clear")}
                </button>
              </StyledMenuItem>
            </div>
          </StyledMenu>
        </th>
      );
    }
  };
  const handleClick = (event) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const setDateFilterOnSelect = (selectedVal) => {
    props.setDateFilterOnSelect(selectedVal);
    handleClose();
  };

  const handleStatusClose = () => {
    setStatusAnchorEl(null);
  };

  const setStatusFilterOnSelect = (selectedVal) => {
    props.setStatusFilterOnSelect(selectedVal);
    handleStatusClose();
  };

  const handlePoDeliveryLocationClick = (event) => {
    setPoDeliveryLocationAnchorEl(event?.currentTarget);
  };

  const handlePoDeliveryLocationClose = (event) => {
    if(!event?.currentTarget.contains(event?.relatedTarget))
    setPoDeliveryLocationAnchorEl(null);
  };

  const setPoDeliveryLocationFilterOnSelect = (selectedVal) => {
    props.setLocationFilterOnSelect(selectedVal);
    handlePoDeliveryLocationClose();
  };
  const renderColumn5 = (columnData) => {
    if (columnData === "Status") {
      return (
        <div className="box col-2">
          <div
            className="filter-item mr-5"
            onClick={handleInventoryStatusClick}
          >
            <div className="icon mr-2">{props.data.img5}</div>
            <div className="filterTitle">{props.data.displayColoumn5}</div>
            <img
              src={updownarrow}
              width="10"
              height="10"
              className="ml-3"
              alt="Arrow"
            />
          </div>
          <StyledMenu
            className="mt-3"
            id="customized-menu"
            anchorEl={inventoryStatusAnchorEl}
            keepMounted
            open={Boolean(inventoryStatusAnchorEl)}
            onClose={handleInventoryStatusClose}
            // onBlur={handleInventoryStatusClose}
          >
            <div className="d-flex flex-column align-items-center">
              <StyledMenuItem>
                <button
                  style={{
                    padding: "10px",
                    height: "40px",
                    width: "130px",
                    borderRadius: "10px",
                  }}
                  className="btn btn-outline-primary btn-sm font-weight-bold"
                  variant="outlined"
                  color="primary"
                  onClick={() => setInventoryStatusFilterOnSelect("ADD")}
                >
                  {t("added")}
                </button>
              </StyledMenuItem>
              <StyledMenuItem>
                <button
                  style={{
                    padding: "10px",
                    height: "40px",
                    width: "130px",
                    borderRadius: "10px",
                  }}
                  className="btn btn-outline-warning btn-sm font-weight-bold"
                  variant="outlined"
                  color="primary"
                  onClick={() => setInventoryStatusFilterOnSelect("CREATE")}
                >
                  {t("sent")}
                </button>
              </StyledMenuItem>
              <StyledMenuItem>
                <button
                  style={{
                    padding: "10px",
                    height: "40px",
                    width: "130px",
                    borderRadius: "10px",
                  }}
                  className="btn btn-outline-success btn-sm font-weight-bold"
                  variant="outlined"
                  color="primary"
                  onClick={() => setInventoryStatusFilterOnSelect("RECEIVE")}
                >
                  {t("received")}
                </button>
              </StyledMenuItem>
              <StyledMenuItem>
                <button
                  className="btn btn-link btn-sm font-weight-bold"
                  color="primary"
                  onClick={() => setInventoryStatusFilterOnSelect("")}
                >
                  {t("clear")}
                </button>
              </StyledMenuItem>
            </div>
          </StyledMenu>
        </div>
      );
    } else if (columnData === "Status") {
      return (
        <th
          className="cursorP table-border-right"
          onClick={handleInventoryStatusClick}
        >
          <div className="cursorP d-flex align-items-center">
            <div className="icon">{props.data.img5}</div>
            <div className="mx-2 table-text-filter">
              {props.data.displayColoumn5}
            </div>
            <img src={updownarrow} height="10" width="15" alt="" />
          </div>
          <StyledMenu
            className="filter-dropdown"
            id="customized-menu"
            anchorEl={inventoryStatusAnchorEl}
            keepMounted
            // onBlur={handleInventoryStatusClose}
            open={Boolean(inventoryStatusAnchorEl)}
            onClose={handleInventoryStatusClose}
          >
            <div className="d-flex flex-column align-items-center">
              <StyledMenuItem>
                <button
                  style={{
                    padding: "10px",
                    height: "40px",
                    width: "130px",
                    borderRadius: "10px",
                  }}
                  className="btn btn-outline-primary btn-sm font-weight-bold"
                  variant="outlined"
                  color="primary"
                  onClick={() => setStatusFilterOnSelect("CREATED")}
                >
                  {t("shipped")}
                </button>
              </StyledMenuItem>
              <StyledMenuItem>
                <button
                  style={{
                    padding: "10px",
                    height: "40px",
                    width: "130px",
                    borderRadius: "10px",
                  }}
                  className="btn btn-outline-primary btn-sm font-weight-bold"
                  variant="outlined"
                  color="primary"
                  onClick={() => setStatusFilterOnSelect("RECEIVED")}
                >
                  {t("delivered")}
                </button>
              </StyledMenuItem>
              <StyledMenuItem>
                <button
                  className="btn btn-link btn-sm font-weight-bold"
                  color="primary"
                  onClick={() => setStatusFilterOnSelect("")}
                >
                  {t("clear")}
                </button>
              </StyledMenuItem>
            </div>
          </StyledMenu>
        </th>
      );
    } else if (columnData === "Delivery Location") {
      return (
        <th
          className="cursorP table-border-right"
          onClick={handlePoDeliveryLocationClick}
        >
          <div className="cursorP d-flex align-items-center">
            <div className="icon">{props.data.img5}</div>
            <div className="mx-2 table-text-filter">
              {props.data.displayColoumn5}
            </div>
            <img src={updownarrow} height="10" width="15" alt="" />
          </div>
          <StyledMenu
            id="customized-menu"
            className="filter-dropdown"
            anchorEl={poDeliveryLocationAnchorEl}
            keepMounted
            open={Boolean(poDeliveryLocationAnchorEl)}
            onClose={handlePoDeliveryLocationClose}
            onBlur={handlePoDeliveryLocationClose}
          >
            <div className="d-flex flex-column align-items-center" id="deldiv">
              <StyledMenuItem style={{ width: "100%" }}>
                {poDeliveryLocationAnchorEl ? (
                  <Autocomplete
                    id="toShipment"
                    options={props.poDeliveryLocationsList}
                    getOptionLabel={(options) =>
                      options.title
                        ? options?.title +
                          " (" +
                          options?.warehouseAddress?.city +
                          " ," +
                          options?.warehouseAddress?.country +
                          ")"
                        : " (" + options.id + " )"
                    }
                    onChange={(event, newValue) => {
                      setPoDeliveryLocationFilterOnSelect(newValue.id);
                    }}
                    style={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={"Search Location"}
                        variant="outlined"
                      />
                    )}
                  />
                ) : (
                  <div>{t("empty_list")}</div>
                )}
              </StyledMenuItem>
              <StyledMenuItem>
                <button
                  className="btn btn-link btn-sm font-weight-bold"
                  variant="outlined"
                  color="primary"
                  onClick={() => setPoDeliveryLocationFilterOnSelect("")}
                >
                  {t("clear")}
                </button>
              </StyledMenuItem>
            </div>
          </StyledMenu>
        </th>
      );
    } else {
      return (
        <th className="cursorP table-border-right">
          <div className="cursorP d-flex align-items-center">
            <div className="icon">{props.data.img5}</div>
            <div className="mx-2 table-text-filter">
              {props.data.displayColoumn5}
            </div>
            {/* <img src={updownarrow} height="10" width="15" alt="" /> */}
          </div>
        </th>
      );
    }
  };

  const handleToShipmentClick = (event) => {
    setToShipmentAnchorEl(event?.currentTarget);
  };

  const handleToShipmentClose = (event) => {
    if (!event?.currentTarget.contains(event?.relatedTarget))
      setToShipmentAnchorEl(null);
  };

  const setToShipmentFilterOnSelect = (selectedVal) => {
    props.setToShipmentFilterOnSelect(selectedVal);
    handleToShipmentClose();
  };

  const handlePoProductNameClick = (event) => {
    setPoProductNameAnchorEl(event?.currentTarget);
  };

  const handlePoProductNameClose = (event) => {
    if (!event?.currentTarget.contains(event?.relatedTarget))
      setPoProductNameAnchorEl(null);
  };

  const setPoProductNameFilterOnSelect = (selectedVal) => {
    props.setProductNameFilterOnSelect(selectedVal);
    handlePoProductNameClose();
  };

  const handleInventoryStatusClick = (event) => {
    setInventoryStatusAnchorEl(event?.currentTarget);
  };

  const handleInventoryStatusClose = () => {
    setInventoryStatusAnchorEl(null);
  };

  const setInventoryStatusFilterOnSelect = (selectedVal) => {
    props.setInventoryStatusFilterOnSelect(selectedVal);
    handleInventoryStatusClose();
  };

  const renderColumn4 = (columnData) => {
    if (columnData === "To") {
      return (
        <th
          className="cursorP table-border-right"
          onClick={handleToShipmentClick}
        >
          <div className="cursorP d-flex align-items-center">
            <div className="icon">{props.data.img4}</div>
            <div className="mx-2 table-text-filter">
              {props.data.displayColoumn4}
            </div>
            <img src={updownarrow} height="10" width="15" alt="icon" />
          </div>
          <StyledMenu
            id="customized-menu"
            anchorEl={toShipmentAnchorEl}
            keepMounted
            open={Boolean(toShipmentAnchorEl)}
            onClose={handleToShipmentClose}
            onBlur={handleToShipmentClose}
          >
            <div className="d-flex flex-column align-items-center">
              {toShipmentAnchorEl ? (
                <StyledMenuItem>
                  <Autocomplete
                    id="toShipment"
                    options={props.supplierReceiverList}
                    getOptionLabel={(options) => options.name}
                    onChange={(event, newValue) => {
                      setToShipmentFilterOnSelect(newValue.id);
                    }}
                    style={{ width: "14rem" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={"Search Org. Name"}
                        variant="outlined"
                      />
                    )}
                  />
                </StyledMenuItem>
              ) : (
                <div>Empty List</div>
              )}
              <StyledMenuItem>
                <button
                  style={{ padding: "10px", height: "40px", width: "130px" }}
                  className="btn btn-link btn-sm font-weight-bold"
                  variant="outlined"
                  color="primary"
                  onClick={() => setToShipmentFilterOnSelect("")}
                >
                  Clear
                </button>
              </StyledMenuItem>
            </div>
          </StyledMenu>
        </th>
      );
    } else if (columnData === "Product") {
      return (
        <th
          className="cursorP table-border-right"
          onClick={handlePoProductNameClick}
        >
          <div className="cursorP d-flex align-items-center">
            <div className="icon">{props.data.img4}</div>
            <div className="mx-2 table-text-filter">
              {props.data.displayColoumn4}
            </div>
            <img src={updownarrow} height="10" width="15" alt="icon" />
          </div>
          <StyledMenu
            className="filter-dropdown"
            id="customized-menu"
            anchorEl={poProductNameAnchorEl}
            keepMounted
            open={Boolean(poProductNameAnchorEl)}
            onClose={handlePoProductNameClose}
            onBlur={handlePoProductNameClose}
          >
            <div className="d-flex flex-column align-items-center">
              {poProductNameAnchorEl ? (
                <StyledMenuItem>
                  <Autocomplete
                    id="fromShipment"
                    options={props.poProductsList}
                    getOptionLabel={(options) =>
                      options.name
                        ? options?.name + " (" + options?.id + " )"
                        : " (" + options?.id + " )"
                    }
                    onChange={(event, newValue) => {
                      setPoProductNameFilterOnSelect(newValue.id);
                    }}
                    style={{ width: "14rem" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={"Search Product"}
                        variant="outlined"
                      />
                    )}
                  />
                </StyledMenuItem>
              ) : (
                <div>Empty List</div>
              )}
              <StyledMenuItem>
                <button
                  style={{ padding: "10px", height: "40px", width: "130px" }}
                  className="btn btn-link btn-sm font-weight-bold"
                  variant="outlined"
                  color="primary"
                  onClick={() => setPoProductNameFilterOnSelect("")}
                >
                  Clear
                </button>
              </StyledMenuItem>
            </div>
          </StyledMenu>
        </th>
      );
    } else if (columnData === "Status") {
      return (
        <th
          className="cursorP table-border-right"
          onClick={handleInventoryStatusClick}
        >
          <div className="cursorP d-flex align-items-center">
            <div className="icon">{props.data.img4}</div>
            <div className="mx-2 table-text-filter">
              {props.data.displayColoumn4}
            </div>
            <img src={updownarrow} height="10" width="15" alt="" />
          </div>
          <StyledMenu
            id="customized-menu"
            anchorEl={inventoryStatusAnchorEl}
            keepMounted
            open={Boolean(inventoryStatusAnchorEl)}
            onClose={handleInventoryStatusClose}
            //
          >
            <div
              className="d-flex flex-column align-items-center"
              onBlur={handleInventoryStatusClose}
            >
              <StyledMenuItem>
                <button
                  style={{ padding: "10px", height: "40px", width: "130px" }}
                  className="btn btn-outline-primary btn-sm font-weight-bold"
                  variant="outlined"
                  color="primary"
                  onClick={() => setInventoryfiFilterOnSelect("ADD")}
                >
                  Add
                </button>
              </StyledMenuItem>
              <StyledMenuItem>
                <button
                  style={{ padding: "10px", height: "40px", width: "130px" }}
                  className="btn btn-outline-primary btn-sm font-weight-bold"
                  variant="outlined"
                  color="primary"
                  onClick={() => setInventoryStatusFilterOnSelect("CREATE")}
                >
                  Create
                </button>
              </StyledMenuItem>
              <StyledMenuItem>
                <button
                  style={{ padding: "10px", height: "40px", width: "130px" }}
                  className="btn btn-link btn-sm font-weight-bold"
                  variant="outlined"
                  color="primary"
                  onClick={() => setInventoryStatusFilterOnSelect("")}
                >
                  Clear
                </button>
              </StyledMenuItem>
            </div>
          </StyledMenu>
        </th>
      );
    } else if (columnData === "Quantity") {
      return (
        // <th className="cursorP table-border-right col-2">
        //   <div className="cursorP d-flex align-items-center">
        //     <div className="icon">{props.data.img4}</div>
        //     <div className="mx-2 table-text-filter">{props.data.coloumn4}</div>
        //     <img src={updownarrow} height="10" width="15" alt="" />
        //   </div>
        // </th>
        <div className="box col">
          <div className="filter-item">
            <div className="icon mr-2">{props.data.img4}</div>
            <div className="filterTitle">{props.data.displayColoumn4}</div>
            <div className="filterAction">
              {/* <img src={updownarrow} width="9" height="9" /> */}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <th className="cursorP table-border-right">
          <div className="cursorP d-flex align-items-center">
            <div className="icon">{props.data.img4}</div>
            <div className="mx-2 table-text-filter">
              {props.data.displayColoumn4}
            </div>
            {/* <img src={updownarrow} height="10" width="15" alt="" /> */}
          </div>
        </th>
      );
    }
  };

  const handleFromShipmentClick = (event) => {
    setFromShipmentAnchorEl(event?.currentTarget);
  };

  const handleFromShipmentClose = (event) => {
    if (!event?.currentTarget.contains(event?.relatedTarget))
      setFromShipmentAnchorEl(null);
  };

  const setFromShipmentFilterOnSelect = (selectedVal) => {
    props.setFromShipmentFilterOnSelect(selectedVal);
    handleFromShipmentClose();
  };

  const handlePoOrderIdClick = (event) => {
    setPoOrderIdAnchorEl(event?.currentTarget);
  };

  const handlePoOrderIdClose = (event) => {
    if (!event?.currentTarget.contains(event?.relatedTarget))
      setPoOrderIdAnchorEl(null);
  };

  const setPoOrderIdFilterOnSelect = (selectedVal) => {
    props.setOrderIdNameFilterOnSelect(selectedVal);
    handlePoOrderIdClose(null);
  };

  // const handleInventoryManufacturerClose = () => {
  //   setInventoryManufacturerAnchorEl(null);
  // };

  const renderColumn3 = (columnData) => {
    if (columnData === "From") {
      return (
        <th
          className="cursorP table-border-right"
          onClick={handleFromShipmentClick}
        >
          <div className="cursorP d-flex align-items-center">
            <div className="icon">{props.data.img3}</div>
            <div className="mx-2 table-text-filter">
              {props.data.displayColoumn3}
            </div>
            <img src={updownarrow} height="10" width="15" alt="" />
          </div>
          <StyledMenu
            id="customized-menu"
            anchorEl={fromShipmentAnchorEl}
            keepMounted
            open={Boolean(fromShipmentAnchorEl)}
            onClose={handleFromShipmentClose}
            onBlur={handleFromShipmentClose}
            style={{ marginLeft: "4rem" }}
          >
            <div className="d-flex flex-column align-items-center">
              {fromShipmentAnchorEl ? (
                <StyledMenuItem>
                  <Autocomplete
                    id="fromShipment"
                    options={props.supplierReceiverList}
                    getOptionLabel={(options) => options.name}
                    onChange={(event, newValue) => {
                      setFromShipmentFilterOnSelect(newValue.id);
                    }}
                    style={{ width: "14rem" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={"Search Supplier Name"}
                        variant="outlined"
                      />
                    )}
                  />
                </StyledMenuItem>
              ) : (
                <div>Empty List</div>
              )}
              <StyledMenuItem>
                <button
                  style={{ padding: "10px", height: "40px", width: "130px" }}
                  className="btn btn-link btn-sm font-weight-bold"
                  variant="outlined"
                  color="primary"
                  onClick={() => setFromShipmentFilterOnSelect("")}
                >
                  Clear
                </button>
              </StyledMenuItem>
            </div>
          </StyledMenu>
        </th>
      );
    } else if (columnData === "Order ID") {
      return (
        <th
          className="cursorP table-border-right"
          onClick={handlePoOrderIdClick}
        >
          <div className="cursorP d-flex align-items-center">
            <div className="icon">{props.data.img3}</div>
            <div className="mx-2 table-text-filter">
              {props.data.displayColoumn3}
            </div>
            <img src={updownarrow} height="10" width="15" alt="" />
          </div>
          <StyledMenu
            id="customized-menu"
            anchorEl={poOrderIdAnchorEl}
            keepMounted
            open={Boolean(poOrderIdAnchorEl)}
            onClose={handlePoOrderIdClose}
            onBlur={handlePoOrderIdClose}
          >
            <div className="d-flex flex-column align-items-center">
              {poOrderIdAnchorEl ? (
                <StyledMenuItem>
                  <Autocomplete
                    id="idOrder"
                    options={props.poOrderIdList}
                    getOptionLabel={(options) => options.id}
                    onChange={(event, newValue) => {
                      setPoOrderIdFilterOnSelect(newValue.id);
                    }}
                    style={{ width: "14rem" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={"Search Order"}
                        variant="outlined"
                      />
                    )}
                  />
                </StyledMenuItem>
              ) : (
                <div>Empty List</div>
              )}
              <StyledMenuItem>
                <button
                  className="btn btn-link btn-sm font-weight-bold"
                  variant="outlined"
                  color="primary"
                  onClick={() => setPoOrderIdFilterOnSelect("")}
                >
                  Clear
                </button>
              </StyledMenuItem>
            </div>
          </StyledMenu>
        </th>
      );
    } else if (columnData === "Date") {
      return (
        <div className="box col">
          <div className="filter-item">
            <div className="icon mr-2">{props.data.img3}</div>
            <div className="filterTitle">{props.data.displayColoumn3}</div>
            <div className="filterAction">
              {/* <img src={updownarrow} width="9" height="9" /> */}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <th className="cursorP table-border-right">
          <div className="cursorP d-flex align-items-center">
            <div className="icon">{props.data.img3}</div>
            <div className="mx-2 table-text-filter">
              {props.data.displayColoumn3}
            </div>
            {/* <img src={updownarrow} height="10" width="15" alt="" /> */}
          </div>
        </th>
      );
    }
  };

  const setInventoryProductCategoryFilterOnSelect = (selectedVal) => {
    props.setInventoryProductCategoryFilterOnSelect(selectedVal);
    handleInventoryProductCategoryClose();
  };

  const handleInventoryProductCategoryClick = (event) => {
    setInventoryProductCategoryAnchorEl(event?.currentTarget);
  };

  const handleInventoryProductCategoryClose = () => {
    setInventoryProductCategoryAnchorEl(null);
  };
  const renderColumn2 = (columnData) => {
    if (columnData === "Product Category") {
      return (
        <>
          {props.filterPage === "inventory" ? (
            <div className="box col-3">
              <div
                className="filter-item"
                onClick={handleInventoryProductCategoryClick}
              >
                <div className="icon mr-2">{props.data.img2}</div>
                <div className="filterTitle">{props.data.displayColoumn2}</div>
                <img
                  src={updownarrow}
                  width="10"
                  height="10"
                  className="ml-3"
                  style={{ position: "relative", left: "20px" }}
                  alt="arrow"
                />
              </div>
              <StyledMenu
                id="customized-menu"
                anchorEl={inventoryProductCategoryAnchorEl}
                keepMounted
                open={Boolean(inventoryProductCategoryAnchorEl)}
                onClose={handleInventoryProductCategoryClose}
                //
              >
                <div
                  className="d-flex flex-column align-items-center"
                  onBlur={handleInventoryProductCategoryClose}
                >
                  {inventoryProductCategoryAnchorEl ? (
                    <StyledMenuItem>
                      <Autocomplete
                        id="ProductCategory"
                        options={props.productCategories}
                        getOptionLabel={(options) => options.value}
                        onChange={(event, newValue) => {
                          setInventoryProductCategoryFilterOnSelect(
                            newValue.value
                          );
                        }}
                        style={{ width: "14rem" }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={"Search Category"}
                            variant="outlined"
                          />
                        )}
                      />
                    </StyledMenuItem>
                  ) : (
                    <div>Empty List</div>
                  )}
                  <StyledMenuItem>
                    <button
                      style={{
                        padding: "10px",
                        height: "40px",
                        width: "130px",
                      }}
                      className="btn btn-link btn-sm font-weight-bold"
                      variant="outlined"
                      color="primary"
                      onClick={() =>
                        setInventoryProductCategoryFilterOnSelect("")
                      }
                    >
                      Clear
                    </button>
                  </StyledMenuItem>
                </div>
              </StyledMenu>
            </div>
          ) : (
            <th
              className="cursorP table-border-right col-3"
              onClick={handleInventoryProductCategoryClick}
            >
              <div className="cursorP d-flex align-items-center">
                <div className="icon">{props.data.img2}</div>
                <div className="mx-2 table-text-filter">
                  {props.data.coloumn2}
                </div>
                <img src={updownarrow} height="10" width="15" alt="" />
              </div>
              <StyledMenu
                id="customized-menu"
                anchorEl={inventoryProductCategoryAnchorEl}
                keepMounted
                open={Boolean(inventoryProductCategoryAnchorEl)}
                onClose={handleInventoryProductCategoryClose}
                //
              >
                <div
                  className="d-flex flex-column align-items-center"
                  onBlur={handleInventoryProductCategoryClose}
                >
                  {inventoryProductCategoryAnchorEl ? (
                    <StyledMenuItem>
                      <Autocomplete
                        id="ProductCategory"
                        options={props.inventoryFilterData}
                        getOptionLabel={(options) => options.name}
                        onChange={(event, newValue) => {
                          setInventoryProductCategoryFilterOnSelect(
                            newValue.id
                          );
                        }}
                        style={{ width: "14rem" }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={"Search Category"}
                            variant="outlined"
                          />
                        )}
                      />
                    </StyledMenuItem>
                  ) : (
                    <div>Empty List</div>
                  )}
                  <StyledMenuItem>
                    <button
                      style={{
                        padding: "10px",
                        height: "40px",
                        width: "130px",
                      }}
                      className="btn btn-link btn-sm font-weight-bold"
                      variant="outlined"
                      color="primary"
                      onClick={() =>
                        setInventoryProductCategoryFilterOnSelect("")
                      }
                    >
                      Clear
                    </button>
                  </StyledMenuItem>
                </div>
              </StyledMenu>
            </th>
          )}
        </>
      );
    } else {
      return (
        <th className="cursorP table-border-right">
          <div className="cursorP d-flex align-items-center">
            <div className="icon">{props.data.img2}</div>
            <div className="mx-2 table-text-filter">
              {props.data.displayColoumn2}
            </div>
            {/* <img src={updownarrow} height="10" width="15" alt="" /> */}
          </div>
        </th>
      );
    }
  };

  const handleShipmentIdClick = (event) => {
    setShipmentIdAnchorEl(event?.currentTarget);
  };

  const handleShipmentIdClose = (event) => {
    if (!event?.currentTarget.contains(event?.relatedTarget))
      setShipmentIdAnchorEl(null);
  };

  const setShipmentIdFilterOnSelect = (selectedVal) => {
    props.setShipmentIdFilterOnSelect(selectedVal);
    handleShipmentIdClose();
  };

  const handlePoToClick = (event) => {
    setPoToAnchorEl(event?.currentTarget);
  };

  const handlePoToClose = () => {
    setPoToAnchorEl(null);
  };

  const setPoToFilterOnSelect = (selectedVal) => {
    props.setFromToFilterOnSelect(selectedVal);
    handlePoToClose();
  };

  const handlePoFromClick = (event) => {
    setPoFromAnchorEl(event?.currentTarget);
  };

  const handlePoFromClose = (event) => {
    if (!event?.currentTarget.contains(event?.relatedTarget))
      setPoFromAnchorEl(null);
  };

  const setInventoryProductNameFilterOnSelect = (selectedVal) => {
    props.setInventoryProductNameFilterOnSelect(selectedVal);
    handleInventoryProductNameClose();
  };

  const handleInventoryProductNameClick = (event) => {
    setInventoryProductNameAnchorEl(event?.currentTarget);
  };

  const handleInventoryProductNameClose = () => {
    setInventoryProductNameAnchorEl(null);
  };

  const setPoFromFilterOnSelect = (selectedVal) => {
    props.setFromToFilterOnSelect(selectedVal);
    handlePoFromClose();
  };
  const renderColumn1 = (columnData) => {
    if (columnData === "Shipment ID") {
      return (
        <th
          className="cursorP table-border-right"
          onClick={handleShipmentIdClick}
        >
          <div className="cursorP d-flex align-items-center">
            <div className="icon">{props.data.img1}</div>
            <div className="mx-2 table-text-filter">
              {props.data.displayColoumn1}
            </div>
            <img src={updownarrow} height="10" width="15" alt="" />
          </div>
          <StyledMenu
            id="customized-menu"
            anchorEl={shipmentIdAnchorEl}
            keepMounted
            open={Boolean(shipmentIdAnchorEl)}
            onClose={handleShipmentIdClose}
            onBlur={handleShipmentIdClose}
            style={{ width: "150rem" }}
          >
            <div className="d-flex flex-column align-items-center">
              {shipmentIdAnchorEl ? (
                <StyledMenuItem>
                  <Autocomplete
                    id="idShipment"
                    options={props.shipmentIdList}
                    getOptionLabel={(options) => options.id}
                    onChange={(event, newValue) => {
                      setShipmentIdFilterOnSelect(newValue.id);
                    }}
                    style={{ width: "14rem" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={"Search Shipment"}
                        variant="outlined"
                      />
                    )}
                  />
                </StyledMenuItem>
              ) : (
                <div>Empty List</div>
              )}
              <StyledMenuItem>
                <button
                  style={{ padding: "10px", height: "40px", width: "100%" }}
                  className="btn btn-link btn-sm font-weight-bold"
                  variant="outlined"
                  color="primary"
                  onClick={() => setShipmentIdFilterOnSelect("")}
                >
                  Clear
                </button>
              </StyledMenuItem>
            </div>
          </StyledMenu>
        </th>
      );
    } else if (columnData === "To") {
      return (
        <th className="cursorP table-border-right" onClick={handlePoToClick}>
          <div className="cursorP d-flex align-items-center">
            <div className="icon">{props.data.img1}</div>
            <div className="mx-2 table-text-filter">
              {props.data.displayColoumn1}
            </div>
            <img src={updownarrow} height="10" width="15" alt="" />
          </div>
          <StyledMenu
            id="customized-menu"
            anchorEl={poToAnchorEl}
            keepMounted
            open={Boolean(poToAnchorEl)}
            onClose={handlePoToClose}
            //
          >
            <div
              className="d-flex flex-column align-items-center"
              onBlur={handlePoToClose}
            >
              <StyledMenuItem>
                <button
                  style={{ padding: "10px", height: "40px", width: "130px" }}
                  className="btn btn-link btn-sm font-weight-bold"
                  variant="outlined"
                  color="primary"
                  onClick={() => setPoToFilterOnSelect("")}
                >
                  Clear
                </button>
              </StyledMenuItem>
              {poToAnchorEl ? (
                // props.poOrganisationsList.map((org) => {
                //   let orgNameDisplay = org.name + " (" + org.id + ")";
                //   return (
                //     <div>
                //       <StyledMenuItem>
                //         <button variant="outlined" color="primary" onClick={() => setPoToFilterOnSelect(org.id)}>{orgNameDisplay}</button>
                //       </StyledMenuItem>
                //     </div>
                //   )
                // })
                <StyledMenuItem>
                  <Autocomplete
                    id="toOrder"
                    options={props.poOrganisationsList}
                    getOptionLabel={(options) => options?.name}
                    onChange={(event, newValue) => {
                      setPoToFilterOnSelect(newValue.id);
                    }}
                    style={{ width: "14rem" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={"Search Customer"}
                        variant="outlined"
                      />
                    )}
                  />
                </StyledMenuItem>
              ) : (
                <div>Empty List</div>
              )}
            </div>
          </StyledMenu>
        </th>
      );
    } else if (columnData === "From") {
      return (
        <th className="cursorP table-border-right" onClick={handlePoFromClick}>
          <div className="cursorP d-flex align-items-center">
            <div className="icon">{props.data.img1}</div>
            <div className="mx-2 table-text-filter">
              {props.data.displayColoumn1}
            </div>
            <img src={updownarrow} height="10" width="15" alt="" />
          </div>
          <StyledMenu
            id="customized-menu"
            anchorEl={poFromAnchorEl}
            keepMounted
            open={Boolean(poFromAnchorEl)}
            onClose={handlePoFromClose}
            onBlur={handlePoFromClose}
          >
            <div className="d-flex flex-column align-items-center">
              <StyledMenuItem>
                <button
                  style={{ padding: "10px", height: "40px", width: "130px" }}
                  className="btn btn-link btn-sm font-weight-bold"
                  variant="outlined"
                  color="primary"
                  onClick={() => setPoFromFilterOnSelect("")}
                >
                  Clear
                </button>
              </StyledMenuItem>
              {poFromAnchorEl ? (
                // props.poOrganisationsList.map((org) => {
                //   let orgNameDisplay = org.name + " (" + org.id + ")";
                //   return (
                //     <div>
                //       <StyledMenuItem>
                //         <button variant="outlined" color="primary" onClick={() => setPoFromFilterOnSelect(org.id)}>{orgNameDisplay}</button>
                //       </StyledMenuItem>
                //     </div>
                //   )
                // })
                <StyledMenuItem>
                  <Autocomplete
                    id="fromOrder"
                    options={props.poOrganisationsList}
                    getOptionLabel={(options) => options?.name}
                    onChange={(event, newValue) => {
                      setPoFromFilterOnSelect(newValue.id);
                    }}
                    style={{ width: "14rem" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={"Search Supplier"}
                        variant="outlined"
                      />
                    )}
                  />
                </StyledMenuItem>
              ) : (
                <div>Empty List</div>
              )}
            </div>
          </StyledMenu>
        </th>
      );
    } else if (columnData === "Product Name") {
      return (
        <>
          {props.filterPage === "inventory" ? (
            <div className="box col-4">
              <div
                className="filter-item ml-4"
                onClick={handleInventoryProductNameClick}
                style={{ position: "relative", left: "-70px" }}
              >
                <div className="icon mr-2">{props.data.img1}</div>
                <div className="filterTitle">{props.data.displayColoumn1}</div>
                <img
                  src={updownarrow}
                  width="10"
                  height="10"
                  className="ml-3"
                  style={{ position: "relative", left: "140px" }}
                  alt="arrow"
                />
              </div>
              <StyledMenu
                id="customized-menu"
                anchorEl={inventoryProductNameAnchorEl}
                keepMounted
                open={Boolean(inventoryProductNameAnchorEl)}
                onClose={handleInventoryProductNameClose}
                //
                style={{ marginLeft: "3rem", width: "175rem" }}
              >
                <div
                  className="d-flex flex-column align-items-center"
                  onBlur={handleInventoryProductNameClose}
                >
                  {inventoryProductNameAnchorEl ? (
                    <StyledMenuItem>
                      <Autocomplete
                        id="ProductName"
                        options={props.inventoryFilterData}
                        getOptionLabel={(options) => options?.name}
                        onChange={(event, newValue) => {
                          setInventoryProductNameFilterOnSelect(newValue.id);
                        }}
                        style={{ width: "14rem" }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={"Search Product"}
                            variant="outlined"
                          />
                        )}
                      />
                    </StyledMenuItem>
                  ) : (
                    <div>Empty List</div>
                  )}
                  <StyledMenuItem>
                    <button
                      style={{
                        padding: "10px",
                        height: "40px",
                        width: "130px",
                      }}
                      className="btn btn-link btn-sm font-weight-bold"
                      variant="outlined"
                      color="primary"
                      onClick={() => setInventoryProductNameFilterOnSelect("")}
                    >
                      Clear
                    </button>
                  </StyledMenuItem>
                </div>
              </StyledMenu>
            </div>
          ) : (
            <th
              className="cursorP table-border-right col-3"
              onClick={handleInventoryProductNameClick}
            >
              <div className="cursorP d-flex align-items-center">
                <div className="icon">{props.data.img1}</div>
                <div className="mx-2 table-text-filter">
                  {props.data.coloumn1}
                </div>
                <img src={updownarrow} height="10" width="15" alt="" />
              </div>
              <StyledMenu
                id="customized-menu"
                anchorEl={inventoryProductNameAnchorEl}
                keepMounted
                open={Boolean(inventoryProductNameAnchorEl)}
                onClose={handleInventoryProductNameClose}
                //
                style={{ marginLeft: "3rem", width: "175rem" }}
              >
                <div
                  className="d-flex flex-column align-items-center"
                  onBlur={handleInventoryProductNameClose}
                >
                  {inventoryProductNameAnchorEl ? (
                    <StyledMenuItem>
                      <Autocomplete
                        id="ProductName"
                        options={props.inventoryFilterData}
                        getOptionLabel={(options) => options?.name}
                        onChange={(event, newValue) => {
                          setInventoryProductNameFilterOnSelect(newValue.id);
                        }}
                        style={{ width: "14rem" }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={"Search Product"}
                            variant="outlined"
                          />
                        )}
                      />
                    </StyledMenuItem>
                  ) : (
                    <div>Empty List</div>
                  )}
                  <StyledMenuItem>
                    <button
                      style={{
                        padding: "10px",
                        height: "40px",
                        width: "130px",
                      }}
                      className="btn btn-link btn-sm font-weight-bold"
                      variant="outlined"
                      color="primary"
                      onClick={() => setInventoryProductNameFilterOnSelect("")}
                    >
                      Clear
                    </button>
                  </StyledMenuItem>
                </div>
              </StyledMenu>
            </th>
          )}
        </>
      );
    } else {
      return (
        <th className="cursorP table-border-right">
          <div className="cursorP d-flex align-items-center">
            <div className="icon">{props.data.img1}</div>
            <div className="mx-2 table-text-filter">
              {props.data.displayColoumn1}
            </div>
            {/* <img src={updownarrow} height="10" width="15" alt="" /> */}
          </div>
        </th>
      );
    }
  };

  return (
    <>
      {props.filterPage === "inventory" ? (
        <div className="filter">
          <div className="d-flex justify-content-between">
            <div className="row" style={{ flexBasis: props.fb }}>
              {props.data.img1 ? renderColumn1(props.data.coloumn1) : null}
              <span className="divider" />

              {props.data.img2 ? renderColumn2(props.data.coloumn2) : null}
              <span className="divider" />

              {props.data.img3 ? renderColumn3(props.data.coloumn3) : null}
              {props.data.img4 ? <span className="divider" /> : null}
              {props.data.img4 ? renderColumn4(props.data.coloumn4) : null}
              {props.data.img5 ? <span className="divider" /> : null}
              {props.data.img5 ? renderColumn5(props.data.coloumn5) : null}
            </div>
            {props.data.img6 ? renderColumn6(props.data.coloumn6) : null}
            <div className="">
              <div className="box col">
                <button className="btn-filter-info" onClick={handleClick}>
                  <div className="d-flex align-items-center">
                    <img
                      src={FilterIcon}
                      width="14"
                      height="14"
                      className="mr-2"
                      alt="FilterIcon"
                    />
                    <span className="text">{t("filter")}</span>
                    <img
                      src={dropdownIcon}
                      width="10"
                      height="10"
                      className="ml-2"
                      alt="Drop Down Icon"
                    />
                  </div>
                </button>
                <StyledMenu
                  id="customized-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  //
                >
                  <div
                    className="d-flex flex-column align-items-center"
                    onBlur={handleClose}
                  >
                    <StyledMenuItem>
                      <button
                        type="button"
                        style={{
                          padding: "10px",
                          height: "40px",
                          width: "130px",
                        }}
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => setDateFilterOnSelect("today")}
                      >
                        <b>{t("today")}</b>
                      </button>
                    </StyledMenuItem>
                    <StyledMenuItem>
                      <button
                        type="button"
                        style={{ height: "40px", width: "130px" }}
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => setDateFilterOnSelect("week")}
                      >
                        <b>{t("this_week")}</b>
                      </button>
                    </StyledMenuItem>
                    <StyledMenuItem>
                      <button
                        type="button"
                        style={{ height: "40px", width: "130px" }}
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => setDateFilterOnSelect("month")}
                      >
                        <b>{t("this_month")}</b>
                      </button>
                    </StyledMenuItem>
                    <StyledMenuItem>
                      <button
                        type="button"
                        style={{ height: "40px", width: "130px" }}
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => setDateFilterOnSelect("threeMonth")}
                      >
                        <b>{t("last_three_months")}</b>
                      </button>
                    </StyledMenuItem>
                    <StyledMenuItem>
                      <button
                        type="button"
                        style={{ height: "40px", width: "130px" }}
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => setDateFilterOnSelect("sixMonth")}
                      >
                        <b>{t("last_six_months")}</b>
                      </button>
                    </StyledMenuItem>
                    <StyledMenuItem>
                      <button
                        type="button"
                        style={{ height: "40px", width: "130px" }}
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => setDateFilterOnSelect("year")}
                      >
                        <b>{t("this_year")}</b>
                      </button>
                    </StyledMenuItem>
                  </div>
                </StyledMenu>
                {!props?.isReportDisabled && (
                  <button
                    className="btn-filter-blue ml-2"
                    onClick={() =>
                      props.setShowExportFilter(!props.showExportFilter)
                    }
                  >
                    <div className="d-flex Export-fil align-items-center">
                      <img
                        src={ExportIcon}
                        width="14"
                        height="14"
                        className="mr-2"
                        alt="Export Icon"
                      />
                      <span>{t("export")}</span>
                      <img
                        src={dropdownIcon}
                        width="10"
                        height="10"
                        className="ml-2"
                        alt="DropDownIcon"
                      />
                      {props.showExportFilter && props.exportFilterData && (
                        <FilterDropDown
                          data={props.exportFilterData}
                          onChangeOfFilterDropDown={
                            props.onSelectionOfDropdownValue
                          }
                          type={"export"}
                        />
                      )}
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <thead>
          <tr className="circle-border">
            {props.data.img1 ? renderColumn1(props.data.coloumn1) : null}
            {props.data.img2 ? renderColumn2(props.data.coloumn2) : null}
            {props.data.img3 ? renderColumn3(props.data.coloumn3) : null}
            {props.data.img4 ? null : null}
            {props.data.img4 ? renderColumn4(props.data.coloumn4) : null}
            {props.data.img5 ? null : null}
            {props.data.img5 ? renderColumn5(props.data.coloumn5) : null}
            {props.data.img6 ? renderColumn6(props.data.coloumn6) : null}
            {props.filterss === "no" ? null : (
              <th>
                <div className="d-flex px-3">
                  <button className="btn-filter-info" onClick={handleClick}>
                    <div className="d-flex align-items-center">
                      <img
                        src={FilterIcon}
                        width="14"
                        height="14"
                        className="mr-2"
                        alt="FilterIcon"
                      />
                      <span className="text">{t("filter")}</span>
                      <img
                        src={dropdownIcon}
                        width="10"
                        height="10"
                        className="ml-2"
                        alt="Drop Down Icon"
                      />
                    </div>
                  </button>
                  <StyledMenu
                    id="customized-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    onBlur={handleClose}
                  >
                    <div className="d-flex flex-column align-items-center">
                      <StyledMenuItem>
                        <button
                          type="button"
                          style={{
                            padding: "10px",
                            height: "40px",
                            width: "130px",
                          }}
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => setDateFilterOnSelect("today")}
                        >
                          <b>{t("today")}</b>
                        </button>
                      </StyledMenuItem>
                      <StyledMenuItem>
                        <button
                          type="button"
                          style={{ height: "40px", width: "130px" }}
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => setDateFilterOnSelect("week")}
                        >
                          <b>{t("this_week")}</b>
                        </button>
                      </StyledMenuItem>
                      <StyledMenuItem>
                        <button
                          type="button"
                          style={{ height: "40px", width: "130px" }}
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => setDateFilterOnSelect("month")}
                        >
                          <b>{t("this_month")}</b>
                        </button>
                      </StyledMenuItem>
                      <StyledMenuItem>
                        <button
                          type="button"
                          style={{ height: "40px", width: "130px" }}
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => setDateFilterOnSelect("threeMonth")}
                        >
                          <b>{t("last_three_months")}</b>
                        </button>
                      </StyledMenuItem>
                      <StyledMenuItem>
                        <button
                          type="button"
                          style={{ height: "40px", width: "130px" }}
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => setDateFilterOnSelect("sixMonth")}
                        >
                          <b>{t("last_six_months")}</b>
                        </button>
                      </StyledMenuItem>
                      <StyledMenuItem>
                        <button
                          type="button"
                          style={{ height: "40px", width: "130px" }}
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => setDateFilterOnSelect("year")}
                        >
                          <b>{t("this_year")}</b>
                        </button>
                      </StyledMenuItem>
                    </div>
                  </StyledMenu>
                  {!props?.isReportDisabled && (
                    <button
                      className="btn-filter-blue ml-2"
                      onClick={() =>
                        props.setShowExportFilter(!props.showExportFilter)
                      }
                    >
                      <div className="d-flex  align-items-center">
                        <img
                          src={ExportIcon}
                          width="14"
                          height="14"
                          className="mr-2"
                          alt="Export Icon"
                        />
                        <span>{t("export")}</span>
                        <img
                          src={dropdownIcon}
                          width="10"
                          height="10"
                          className="ml-2"
                          alt="DropDownIcon"
                        />
                        {props.showExportFilter && props.exportFilterData && (
                          <FilterDropDown
                            data={props.exportFilterData}
                            onChangeOfFilterDropDown={
                              props.onSelectionOfDropdownValue
                            }
                            type={"export"}
                          />
                        )}
                      </div>
                    </button>
                  )}
                </div>
              </th>
            )}
          </tr>
        </thead>
      )}
    </>
  );
};
export default AdvanceTableFilter;
