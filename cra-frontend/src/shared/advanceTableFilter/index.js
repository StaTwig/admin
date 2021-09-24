import React from "react";
import updownarrow from "../../assets/icons/up-and-down-1.svg";
import FilterIcon from "../../assets/icons/Filter.svg";
import ExportIcon from "../../assets/icons/Export.svg";
import dropdownIcon from "../../assets/icons/drop-down.svg";
import "./style.scss";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
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
        <div className='box col-1'>
          <span className='divider' />
          <div
            className='filter-item ml-4'
            onClick={handleInventoryStatusClick}
          >
            <div className='icon mr-2'>{props.data.img6}</div>
            <div className='filterTitle'>{props.data.coloumn6}</div>
            <img
              src={updownarrow}
              width='10'
              height='10'
              className='ml-3'
              alt='Arrow'
            />
          </div>
          <StyledMenu
            className='ml-5 mt-3'
            style={{ width: "140rem" }}
            id='customized-menu'
            anchorEl={inventoryStatusAnchorEl}
            keepMounted
            onBlur={handleInventoryStatusClose}
            open={Boolean(inventoryStatusAnchorEl)}
            onClose={handleInventoryStatusClose}
          >
            <div className='d-flex flex-column align-items-center'>
              <StyledMenuItem>
                <Button
                  style={{
                    padding: "10px",
                    height: "40px",
                    width: "180px",
                    borderRadius: "10px",
                  }}
                  className='btn btn-outline-success btn-sm font-weight-bold'
                  color='primary'
                  onClick={() => setStatusFilterOnSelect("ACCEPTED")}
                >
                  Accepted
                </Button>
              </StyledMenuItem>
              <StyledMenuItem>
                <Button
                  style={{
                    padding: "10px",
                    height: "40px",
                    width: "180px",
                    borderRadius: "10px",
                  }}
                  className='btn btn-outline-primary btn-sm font-weight-bold'
                  color='primary'
                  onClick={() => setStatusFilterOnSelect("CREATED")}
                >
                  {props.visible === "one" ? "Sent" : "Received"}
                </Button>
              </StyledMenuItem>

              <StyledMenuItem>
                <Button
                  style={{
                    padding: "10px",
                    height: "40px",
                    width: "180px",
                    borderRadius: "10px",
                  }}
                  className='btn btn-outline-warning btn-sm font-weight-bold'
                  color='primary'
                  onClick={() =>
                    setStatusFilterOnSelect("TRANSIT%26PARTIALLYFULFILLED")
                  }
                >
                  Transit & Partially Fulfilled
                </Button>
              </StyledMenuItem>

              <StyledMenuItem>
                <Button
                  style={{
                    padding: "10px",
                    height: "40px",
                    width: "180px",
                    borderRadius: "10px",
                  }}
                  className='btn btn-outline-info btn-sm font-weight-bold'
                  color='primary'
                  onClick={() =>
                    setStatusFilterOnSelect("TRANSIT%26FULLYFULFILLED")
                  }
                >
                  Transit & Fullyfilled
                </Button>
              </StyledMenuItem>

              <StyledMenuItem>
                <Button
                  style={{
                    padding: "10px",
                    height: "40px",
                    width: "180px",
                    borderRadius: "10px",
                  }}
                  className='btn btn-outline-info btn-sm font-weight-bold'
                  color='primary'
                  onClick={() => setStatusFilterOnSelect("FULLYFULFILLED")}
                >
                  Fullyfilled
                </Button>
              </StyledMenuItem>
              <StyledMenuItem>
                <Button
                  style={{
                    padding: "10px",
                    height: "40px",
                    width: "180px",
                    borderRadius: "10px",
                  }}
                  className='btn btn-outline-secondary btn-sm font-weight-bold'
                  color='primary'
                  onClick={() => setStatusFilterOnSelect("REJECTED")}
                >
                  Rejected
                </Button>
              </StyledMenuItem>
              <StyledMenuItem>
                <Button
                  className='btn btn-link btn-sm font-weight-bold'
                  color='primary'
                  onClick={() => setStatusFilterOnSelect("")}
                >
                  Clear
                </Button>
              </StyledMenuItem>
            </div>
          </StyledMenu>
        </div>
      );
      //   return (  <div className="box col">
      //   <span className="divider" />
      //   <div className="filter-item">
      //     <div className="icon mr-2">
      //       {props.data.img6}
      //     </div>
      //     <div className="filterTitle">{props.data.coloumn6}</div>
      //     <div className="filterAction">
      //       {/* <img src={updownarrow} width="9" height="9" /> */}
      //      </div>
      //   </div>
      // </div>
      //   );
    } else {
      return (
        <div className='box col'>
          <span className='divider' />
          <div
            className='filter-item ml-4'
            onClick={handleInventoryStatusClick}
          >
            <div className='icon mr-2'>{props.data.img6}</div>
            <div className='filterTitle'>{props.data.coloumn6}</div>
            <img
              src={updownarrow}
              width='10'
              height='10'
              className='ml-3'
              alt='Arrow'
            />
          </div>
          <StyledMenu
            className='filter-dropdown'
            style={{ width: "100rem" }}
            id='customized-menu'
            anchorEl={inventoryStatusAnchorEl}
            keepMounted
            onBlur={handleInventoryStatusClose}
            open={Boolean(inventoryStatusAnchorEl)}
            onClose={handleInventoryStatusClose}
          >
            <div className='d-flex flex-column align-items-center'>
              <StyledMenuItem>
                <Button
                  style={{
                    padding: "0px",
                    height: "40px",
                    width: "130px",
                    borderRadius: "10px",
                  }}
                  className='btn btn-outline-primary btn-sm font-weight-bold'
                  variant='outlined'
                  color='primary'
                  onClick={() => setStatusFilterOnSelect("CREATED")}
                >
                  Shipped
                </Button>
              </StyledMenuItem>
              <StyledMenuItem>
                <Button
                  style={{
                    padding: "0px",
                    height: "40px",
                    width: "130px",
                    borderRadius: "10px",
                  }}
                  className='btn btn-outline-success btn-sm font-weight-bold'
                  variant='outlined'
                  color='primary'
                  onClick={() => setStatusFilterOnSelect("RECEIVED")}
                >
                  Delivered
                </Button>
              </StyledMenuItem>
              <StyledMenuItem>
                <Button
                  className='btn btn-link btn-sm font-weight-bold'
                  color='primary'
                  onClick={() => setStatusFilterOnSelect("")}
                >
                  Clear
                </Button>
              </StyledMenuItem>
            </div>
          </StyledMenu>
        </div>
      );
    }
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const setDateFilterOnSelect = (selectedVal) => {
    props.setDateFilterOnSelect(selectedVal);
    handleClose();
  };

  // const handleStatusClick = (event) => {
  //   setStatusAnchorEl(event.currentTarget);
  // };

  const handleStatusClose = () => {
    setStatusAnchorEl(null);
  };

  const setStatusFilterOnSelect = (selectedVal) => {
    props.setStatusFilterOnSelect(selectedVal);
    handleStatusClose();
  };

  const handlePoDeliveryLocationClick = (event) => {
    setPoDeliveryLocationAnchorEl(event.currentTarget);
  };

  const handlePoDeliveryLocationClose = () => {
    setPoDeliveryLocationAnchorEl(null);
  };

  const setPoDeliveryLocationFilterOnSelect = (selectedVal) => {
    props.setLocationFilterOnSelect(selectedVal);
    handlePoDeliveryLocationClose();
  };
  const renderColumn5 = (columnData) => {
    if (columnData === "Status") {
      return (
        <div className='box col-2'>
          {/* <span className="divider" /> */}
          <div
            className='filter-item mr-5'
            onClick={handleInventoryStatusClick}
          >
            <div className='icon mr-2'>{props.data.img5}</div>
            <div className='filterTitle'>{props.data.coloumn5}</div>
            <img
              src={updownarrow}
              width='10'
              height='10'
              className='ml-3'
              alt='Arrow'
            />
          </div>
          <StyledMenu
            className='mt-3'
            id='customized-menu'
            anchorEl={inventoryStatusAnchorEl}
            keepMounted
            open={Boolean(inventoryStatusAnchorEl)}
            onClose={handleInventoryStatusClose}
          >
            <div className='d-flex flex-column align-items-center'>
              <StyledMenuItem>
                <Button
                  style={{
                    padding: "10px",
                    height: "40px",
                    width: "130px",
                    borderRadius: "10px",
                  }}
                  className='btn btn-outline-primary btn-sm font-weight-bold'
                  variant='outlined'
                  color='primary'
                  onClick={() => setInventoryStatusFilterOnSelect("ADD")}
                >
                  Added
                </Button>
              </StyledMenuItem>
              <StyledMenuItem>
                <Button
                  style={{
                    padding: "10px",
                    height: "40px",
                    width: "130px",
                    borderRadius: "10px",
                  }}
                  className='btn btn-outline-warning btn-sm font-weight-bold'
                  variant='outlined'
                  color='primary'
                  onClick={() => setInventoryStatusFilterOnSelect("CREATE")}
                >
                  Sent
                </Button>
              </StyledMenuItem>
              <StyledMenuItem>
                <Button
                  style={{
                    padding: "10px",
                    height: "40px",
                    width: "130px",
                    borderRadius: "10px",
                  }}
                  className='btn btn-outline-success btn-sm font-weight-bold'
                  variant='outlined'
                  color='primary'
                  onClick={() => setInventoryStatusFilterOnSelect("RECEIVE")}
                >
                  Received
                </Button>
              </StyledMenuItem>
              <StyledMenuItem>
                <Button
                  className='btn btn-link btn-sm font-weight-bold'
                  color='primary'
                  onClick={() => setInventoryStatusFilterOnSelect("")}
                >
                  Clear
                </Button>
              </StyledMenuItem>
            </div>
          </StyledMenu>
        </div>
      );
      //   return (  <div className="box col">
      //   <span className="divider" />
      //   <div className="filter-item">
      //     <div className="icon mr-2">
      //       {props.data.img6}
      //     </div>
      //     <div className="filterTitle">{props.data.coloumn6}</div>
      //     <div className="filterAction">
      //       {/* <img src={updownarrow} width="9" height="9" /> */}
      //      </div>
      //   </div>
      // </div>
      //   );
    } else if (columnData === "Status") {
      return (
        <div className='box col'>
          {/* <span className="divider" /> */}
          <div className='filter-item' onClick={handleInventoryStatusClick}>
            <div className='icon mr-2'>{props.data.img5}</div>
            <div className='filterTitle'>{props.data.coloumn5}</div>
            <img
              src={updownarrow}
              width='10'
              height='10'
              className='ml-3'
              alt='Arrow'
            />
          </div>
          <StyledMenu
            className='filter-dropdown'
            id='customized-menu'
            anchorEl={inventoryStatusAnchorEl}
            keepMounted
            onBlur={handleInventoryStatusClose}
            open={Boolean(inventoryStatusAnchorEl)}
            onClose={handleInventoryStatusClose}
          >
            <div className='d-flex flex-column align-items-center'>
              <StyledMenuItem>
                <Button
                  style={{
                    padding: "10px",
                    height: "40px",
                    width: "130px",
                    borderRadius: "10px",
                  }}
                  className='btn btn-outline-primary btn-sm font-weight-bold'
                  variant='outlined'
                  color='primary'
                  onClick={() => setStatusFilterOnSelect("CREATED")}
                >
                  Shipped
                </Button>
              </StyledMenuItem>
              <StyledMenuItem>
                <Button
                  style={{
                    padding: "10px",
                    height: "40px",
                    width: "130px",
                    borderRadius: "10px",
                  }}
                  className='btn btn-outline-primary btn-sm font-weight-bold'
                  variant='outlined'
                  color='primary'
                  onClick={() => setStatusFilterOnSelect("RECEIVED")}
                >
                  Delivered
                </Button>
              </StyledMenuItem>
              <StyledMenuItem>
                <Button
                  className='btn btn-link btn-sm font-weight-bold'
                  color='primary'
                  onClick={() => setStatusFilterOnSelect("")}
                >
                  Clear
                </Button>
              </StyledMenuItem>
            </div>
          </StyledMenu>
        </div>
      );
    } else if (columnData === "Delivery Location") {
      return (
        <div className='box col'>
          <div
            className='filter-item ml-5'
            onClick={handlePoDeliveryLocationClick}
            style={{ position: "relative", left: "-35px" }}
          >
            <div className='icon mr-2'>{props.data.img5}</div>
            <div className='filterTitle'>{props.data.coloumn5}</div>
            <img
              src={updownarrow}
              width='10'
              height='10'
              className='ml-3'
              style={{ position: "relative", left: "20px" }}
              alt='arrow'
            />
          </div>
          <StyledMenu
            id='customized-menu'
            className='filter-dropdown'
            anchorEl={poDeliveryLocationAnchorEl}
            keepMounted
            open={Boolean(poDeliveryLocationAnchorEl)}
            onClose={handlePoDeliveryLocationClose}
          >
            <div className='d-flex flex-column align-items-center'>
              {/* <StyledMenuItem>
                <Button
                  // style={{ padding: "10px", height: "40px", width: "130px" }}
                  className='btn btn-link btn-sm font-weight-bold'
                  variant='outlined'
                  color='primary'
                  onClick={() => setPoDeliveryLocationFilterOnSelect("")}
                >
                  Clear
                </Button>
              </StyledMenuItem> */}
              <StyledMenuItem style={{ width: "100%" }}>
                {poDeliveryLocationAnchorEl ? (
                  // props.poDeliveryLocationsList.map((location) => {
                  //   return (
                  //     <div>
                  //       <StyledMenuItem>
                  //         <Button variant="outlined" color="primary" onClick={() => setPoDeliveryLocationFilterOnSelect(location.id)}>{location.id}</Button>
                  //       </StyledMenuItem>
                  //     </div>
                  //   )
                  // })
                  <Autocomplete
                    id='toShipment'
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
                        variant='outlined'
                      />
                    )}
                  />
                ) : (
                  <div>Empty List</div>
                )}
              </StyledMenuItem>
              <StyledMenuItem>
                <Button
                  className='btn btn-link btn-sm font-weight-bold'
                  variant='outlined'
                  color='primary'
                  onClick={() => setPoDeliveryLocationFilterOnSelect("")}
                >
                  Clear
                </Button>
              </StyledMenuItem>
            </div>
          </StyledMenu>
        </div>
      );
    } else {
      return (
        <div className='box col'>
          <div className='filter-item'>
            <div className='icon mr-2'>{props.data.img5}</div>
            <div className='filterTitle'>{props.data.coloumn5}</div>
            <div className='filterAction'>
              {/* <img src={updownarrow} width="9" height="9" /> */}
            </div>
          </div>
        </div>
      );
    }
  };

  const handleToShipmentClick = (event) => {
    setToShipmentAnchorEl(event.currentTarget);
  };

  const handleToShipmentClose = () => {
    setToShipmentAnchorEl(null);
  };

  const setToShipmentFilterOnSelect = (selectedVal) => {
    props.setToShipmentFilterOnSelect(selectedVal);
    handleToShipmentClose();
  };

  const handlePoProductNameClick = (event) => {
    setPoProductNameAnchorEl(event.currentTarget);
  };

  const handlePoProductNameClose = () => {
    setPoProductNameAnchorEl(null);
  };

  const setPoProductNameFilterOnSelect = (selectedVal) => {
    props.setProductNameFilterOnSelect(selectedVal);
    handlePoProductNameClose();
  };

  const handleInventoryStatusClick = (event) => {
    setInventoryStatusAnchorEl(event.currentTarget);
  };

  const handleInventoryStatusClose = () => {
    setInventoryStatusAnchorEl(null);
  };

  const setInventoryStatusFilterOnSelect = (selectedVal) => {
    props.setInventoryStatusFilterOnSelect(selectedVal);
    handleInventoryStatusClose();
  };

  // const setInventoryfiFilterOnSelect = (selectedVal) => {
  //   props.setInventoryfiFilterOnSelect(selectedVal);
  //   handleInventoryStatusClose();
  // }

  const renderColumn4 = (columnData) => {
    if (columnData === "To") {
      return (
        <div className='col-3'>
          <div
            className='d-flex justify-content-between'
            onClick={handleToShipmentClick}
            // style={{ display: "flex", position: "relative", left: "-80px" }}
          >
            <div className='my-3'>
              <span className='icon mr-2'>{props.data.img4}</span>
              <span className='filterTitle mr-4'>{props.data.coloumn4}</span>
            </div>
            <img
              className='my-4'
              src={updownarrow}
              width='10'
              height='10'
              alt='arrow'
            />
          </div>
          <StyledMenu
            id='customized-menu'
            anchorEl={toShipmentAnchorEl}
            keepMounted
            open={Boolean(toShipmentAnchorEl)}
            onClose={handleToShipmentClose}
          >
            <div className='d-flex flex-column align-items-center'>
              {toShipmentAnchorEl ? (
                <StyledMenuItem>
                  <Autocomplete
                    id='toShipment'
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
                        variant='outlined'
                      />
                    )}
                  />
                </StyledMenuItem>
              ) : (
                <div>Empty List</div>
              )}
              <StyledMenuItem>
                <Button
                  style={{ padding: "10px", height: "40px", width: "130px" }}
                  className='btn btn-link btn-sm font-weight-bold'
                  variant='outlined'
                  color='primary'
                  onClick={() => setToShipmentFilterOnSelect("")}
                >
                  Clear
                </Button>
              </StyledMenuItem>
            </div>
          </StyledMenu>
        </div>
      );
    } else if (columnData === "Product") {
      return (
        <div className='box col-3'>
          <div
            className='filter-item'
            onClick={handlePoProductNameClick}
            style={{ position: "relative", left: "-50px" }}
          >
            <div className='icon mr-2'>{props.data.img4}</div>
            <div className='filterTitle'>{props.data.coloumn4}</div>
            <img
              src={updownarrow}
              width='10'
              height='10'
              className='ml-3'
              style={{ position: "relative", left: "100px" }}
              alt='arrow'
            />
          </div>
          <StyledMenu
            className='filter-dropdown'
            id='customized-menu'
            anchorEl={poProductNameAnchorEl}
            keepMounted
            open={Boolean(poProductNameAnchorEl)}
            onClose={handlePoProductNameClose}
          >
            <div className='d-flex flex-column align-items-center'>
              {poProductNameAnchorEl ? (
                <StyledMenuItem>
                  <Autocomplete
                    id='fromShipment'
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
                        variant='outlined'
                      />
                    )}
                  />
                </StyledMenuItem>
              ) : (
                <div>Empty List</div>
              )}
              <StyledMenuItem>
                <Button
                  style={{ padding: "10px", height: "40px", width: "130px" }}
                  className='btn btn-link btn-sm font-weight-bold'
                  variant='outlined'
                  color='primary'
                  onClick={() => setPoProductNameFilterOnSelect("")}
                >
                  Clear
                </Button>
              </StyledMenuItem>
            </div>
          </StyledMenu>
        </div>
      );
    } else if (columnData === "Status") {
      return (
        <div className='box col'>
          <div className='filter-item' onClick={handleInventoryStatusClick}>
            <div className='icon mr-2'>{props.data.img4}</div>
            <div className='filterTitle'>{props.data.coloumn4}</div>
            <img
              src={updownarrow}
              width='10'
              height='10'
              className='ml-3'
              alt='arrow'
            />
          </div>
          <StyledMenu
            id='customized-menu'
            anchorEl={inventoryStatusAnchorEl}
            keepMounted
            open={Boolean(inventoryStatusAnchorEl)}
            onClose={handleInventoryStatusClose}
          >
            <div className='d-flex flex-column align-items-center'>
              <StyledMenuItem>
                <Button
                  style={{ padding: "10px", height: "40px", width: "130px" }}
                  className='btn btn-outline-primary btn-sm font-weight-bold'
                  variant='outlined'
                  color='primary'
                  onClick={() => setInventoryfiFilterOnSelect("ADD")}
                >
                  Add
                </Button>
              </StyledMenuItem>
              <StyledMenuItem>
                <Button
                  style={{ padding: "10px", height: "40px", width: "130px" }}
                  className='btn btn-outline-primary btn-sm font-weight-bold'
                  variant='outlined'
                  color='primary'
                  onClick={() => setInventoryStatusFilterOnSelect("CREATE")}
                >
                  Create
                </Button>
              </StyledMenuItem>
              <StyledMenuItem>
                <Button
                  style={{ padding: "10px", height: "40px", width: "130px" }}
                  className='btn btn-link btn-sm font-weight-bold'
                  variant='outlined'
                  color='primary'
                  onClick={() => setInventoryStatusFilterOnSelect("")}
                >
                  Clear
                </Button>
              </StyledMenuItem>
            </div>
          </StyledMenu>
        </div>
      );
    } else {
      return (
        <div className='box col'>
          <div className='filter-item'>
            <div className='icon mr-2'>{props.data.img4}</div>
            <div className='filterTitle'>{props.data.coloumn4}</div>
            <div className='filterAction'>
              {/* <img src={updownarrow} width="9" height="9" /> */}
            </div>
          </div>
        </div>
      );
    }
  };

  const handleFromShipmentClick = (event) => {
    setFromShipmentAnchorEl(event.currentTarget);
  };

  const handleFromShipmentClose = () => {
    setFromShipmentAnchorEl(null);
  };

  const setFromShipmentFilterOnSelect = (selectedVal) => {
    props.setFromShipmentFilterOnSelect(selectedVal);
    handleFromShipmentClose();
  };

  const handlePoOrderIdClick = (event) => {
    setPoOrderIdAnchorEl(event.currentTarget);
  };

  const handlePoOrderIdClose = () => {
    setPoOrderIdAnchorEl(null);
  };

  const setPoOrderIdFilterOnSelect = (selectedVal) => {
    props.setOrderIdNameFilterOnSelect(selectedVal);
    handlePoOrderIdClose();
  };

  // const handleInventoryManufacturerClose = () => {
  //   setInventoryManufacturerAnchorEl(null);
  // };

  const renderColumn3 = (columnData) => {
    if (columnData === "From") {
      return (
        <div className='box col-4'>
          <div
            className='filter-item'
            onClick={handleFromShipmentClick}
            style={{ position: "relative", left: "-100px" }}
          >
            <div className='icon mr-0'>{props.data.img3}</div>
            <div className='filterTitle'>{props.data.coloumn3}</div>
            <img
              src={updownarrow}
              width='10'
              height='10'
              className='ml-3'
              style={{ position: "relative", left: "205px" }}
              alt='arrow'
            />
          </div>
          <StyledMenu
            id='customized-menu'
            anchorEl={fromShipmentAnchorEl}
            keepMounted
            open={Boolean(fromShipmentAnchorEl)}
            onClose={handleFromShipmentClose}
            style={{ marginLeft: "4rem" }}
          >
            <div className='d-flex flex-column align-items-center'>
              {fromShipmentAnchorEl ? (
                <StyledMenuItem>
                  <Autocomplete
                    id='fromShipment'
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
                        variant='outlined'
                      />
                    )}
                  />
                </StyledMenuItem>
              ) : (
                <div>Empty List</div>
              )}
              <StyledMenuItem>
                <Button
                  style={{ padding: "10px", height: "40px", width: "130px" }}
                  className='btn btn-link btn-sm font-weight-bold'
                  variant='outlined'
                  color='primary'
                  onClick={() => setFromShipmentFilterOnSelect("")}
                >
                  Clear
                </Button>
              </StyledMenuItem>
            </div>
          </StyledMenu>
        </div>
      );
    } else if (columnData === "Order ID") {
      return (
        <div className='box col-2'>
          <div className='filter-item' onClick={handlePoOrderIdClick}>
            <div className='icon mr-2'>{props.data.img3}</div>
            <div className='filterTitle'>{props.data.coloumn3}</div>
            <img
              src={updownarrow}
              width='10'
              height='10'
              className='ml-3'
              alt='arrow'
            />
          </div>
          <StyledMenu
            id='customized-menu'
            anchorEl={poOrderIdAnchorEl}
            keepMounted
            open={Boolean(poOrderIdAnchorEl)}
            onClose={handlePoOrderIdClose}
          >
            <div className='d-flex flex-column align-items-center'>
              {poOrderIdAnchorEl ? (
                <StyledMenuItem>
                  <Autocomplete
                    id='idOrder'
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
                        variant='outlined'
                      />
                    )}
                  />
                </StyledMenuItem>
              ) : (
                <div>Empty List</div>
              )}
              <StyledMenuItem>
                <Button
                  className='btn btn-link btn-sm font-weight-bold'
                  variant='outlined'
                  color='primary'
                  onClick={() => setPoOrderIdFilterOnSelect("")}
                >
                  Clear
                </Button>
              </StyledMenuItem>
            </div>
          </StyledMenu>
        </div>
      );
    }
    // else if (columnData == "Manufacturer") {
    //   return (<div className="box col">
    //     <div className="filter-item" onClick={handleInventoryManufacturerClick}>
    //       <div className="icon mr-2">
    //         {props.data.img3}
    //       </div>
    //       <div className="filterTitle">{props.data.coloumn3}</div>
    //       <img src={updownarrow} width="10" height="10" className="ml-3" alt="arrow" />
    //     </div>
    //     <StyledMenu
    //       id="customized-menu"
    //       anchorEl={inventoryManufacturerAnchorEl}
    //       keepMounted
    //       open={Boolean(inventoryManufacturerAnchorEl)}
    //       onClose={handleInventoryManufacturerClose}
    //     >
    //       <div className="d-flex flex-column align-items-center">
    //         <StyledMenuItem>
    //           <Button variant="outlined" color="primary" onClick={() => setInventoryManufacturerFilterOnSelect("")}>Clear</Button>
    //         </StyledMenuItem>
    //         {inventoryManufacturerAnchorEl ?
    //           <Autocomplete
    //             id="Manufacturer"
    //             options={props.inventoryFilterData}
    //             getOptionLabel={(options) => options.manufacturer}
    //             onChange={(event, newValue) => {
    //               setInventoryManufacturerFilterOnSelect(newValue.manufacturer)
    //             }}
    //             style={{ width: '100%' }}
    //             renderInput={(params) => <TextField {...params} label={'Search Manufacturer'} variant="outlined" />}
    //           />
    //           :
    //           <div>
    //             Empty List
    //         </div>
    //         }
    //       </div>
    //     </StyledMenu>
    //   </div>);
    // }
    else {
      return (
        <div className='box col'>
          <div className='filter-item'>
            <div className='icon mr-2'>{props.data.img3}</div>
            <div className='filterTitle'>{props.data.coloumn3}</div>
            <div className='filterAction'>
              {/* <img src={updownarrow} width="9" height="9" /> */}
            </div>
          </div>
        </div>
      );
    }
  };

  const setInventoryProductCategoryFilterOnSelect = (selectedVal) => {
    props.setInventoryProductCategoryFilterOnSelect(selectedVal);
    handleInventoryProductCategoryClose();
  };

  const handleInventoryProductCategoryClick = (event) => {
    setInventoryProductCategoryAnchorEl(event.currentTarget);
  };

  const handleInventoryProductCategoryClose = () => {
    setInventoryProductCategoryAnchorEl(null);
  };
  const renderColumn2 = (columnData) => {
    if (columnData === "Product Category") {
      return (
        <div className='box col-3'>
          <div
            className='filter-item'
            onClick={handleInventoryProductCategoryClick}
          >
            <div className='icon mr-2'>{props.data.img2}</div>
            <div className='filterTitle'>{props.data.coloumn2}</div>
            <img
              src={updownarrow}
              width='10'
              height='10'
              className='ml-3'
              style={{ position: "relative", left: "20px" }}
              alt='arrow'
            />
          </div>
          <StyledMenu
            id='customized-menu'
            anchorEl={inventoryProductCategoryAnchorEl}
            keepMounted
            open={Boolean(inventoryProductCategoryAnchorEl)}
            onClose={handleInventoryProductCategoryClose}
          >
            <div className='d-flex flex-column align-items-center'>
              {inventoryProductCategoryAnchorEl ? (
                <StyledMenuItem>
                  <Autocomplete
                    id='ProductCategory'
                    options={props.inventoryFilterData}
                    getOptionLabel={(options) => options.name}
                    onChange={(event, newValue) => {
                      setInventoryProductCategoryFilterOnSelect(newValue.id);
                    }}
                    style={{ width: "14rem" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={"Search Category"}
                        variant='outlined'
                      />
                    )}
                  />
                </StyledMenuItem>
              ) : (
                <div>Empty List</div>
              )}
              <StyledMenuItem>
                <Button
                  style={{ padding: "10px", height: "40px", width: "130px" }}
                  className='btn btn-link btn-sm font-weight-bold'
                  variant='outlined'
                  color='primary'
                  onClick={() => setInventoryProductCategoryFilterOnSelect("")}
                >
                  Clear
                </Button>
              </StyledMenuItem>
            </div>
          </StyledMenu>
        </div>
      );
    } else {
      return (
        <div className='box col-2'>
          <div className='filter-item'>
            <div className='icon mr-1'>{props.data.img2}</div>
            <div className='filterTitle'>{props.data.coloumn2}</div>
            <div className='filterAction'></div>
          </div>
        </div>
      );
    }
  };

  const handleShipmentIdClick = (event) => {
    setShipmentIdAnchorEl(event.currentTarget);
  };

  const handleShipmentIdClose = () => {
    setShipmentIdAnchorEl(null);
  };

  const setShipmentIdFilterOnSelect = (selectedVal) => {
    props.setShipmentIdFilterOnSelect(selectedVal);
    handleShipmentIdClose();
  };

  const handlePoToClick = (event) => {
    setPoToAnchorEl(event.currentTarget);
  };

  const handlePoToClose = () => {
    setPoToAnchorEl(null);
  };

  const setPoToFilterOnSelect = (selectedVal) => {
    props.setFromToFilterOnSelect(selectedVal);
    handlePoToClose();
  };

  const handlePoFromClick = (event) => {
    setPoFromAnchorEl(event.currentTarget);
  };

  const handlePoFromClose = () => {
    setPoFromAnchorEl(null);
  };

  const setInventoryProductNameFilterOnSelect = (selectedVal) => {
    props.setInventoryProductNameFilterOnSelect(selectedVal);
    handleInventoryProductNameClose();
  };

  const handleInventoryProductNameClick = (event) => {
    setInventoryProductNameAnchorEl(event.currentTarget);
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
        <div className='box col-2'>
          <div
            className='filter-item ml-4 mr-3'
            onClick={handleShipmentIdClick}
          >
            <div className='icon'>{props.data.img1}</div>
            <div className='filterTitle'>{props.data.coloumn1}</div>
            <img
              src={updownarrow}
              width='10'
              height='10'
              className='ml-1'
              alt='arrow'
            />
          </div>
          <StyledMenu
            id='customized-menu'
            anchorEl={shipmentIdAnchorEl}
            keepMounted
            open={Boolean(shipmentIdAnchorEl)}
            onClose={handleShipmentIdClose}
            style={{ width: "150rem" }}
          >
            <div className='d-flex flex-column align-items-center'>
              {shipmentIdAnchorEl ? (
                <StyledMenuItem>
                  <Autocomplete
                    id='idShipment'
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
                        variant='outlined'
                      />
                    )}
                  />
                </StyledMenuItem>
              ) : (
                <div>Empty List</div>
              )}
              <StyledMenuItem>
                <Button
                  style={{ padding: "10px", height: "40px", width: "100%" }}
                  className='btn btn-link btn-sm font-weight-bold'
                  variant='outlined'
                  color='primary'
                  onClick={() => setShipmentIdFilterOnSelect("")}
                >
                  Clear
                </Button>
              </StyledMenuItem>
            </div>
          </StyledMenu>
        </div>
      );
    } else if (columnData === "To") {
      return (
        <div
          className='box col'
          style={{ position: "relative", left: "-30px" }}
        >
          <div className='filter-item ml-4' onClick={handlePoToClick}>
            <div className='icon mr-2'>{props.data.img1}</div>
            <div className='filterTitle'>{props.data.coloumn1}</div>
            <img
              src={updownarrow}
              width='10'
              height='10'
              className='ml-3'
              style={{ position: "relative", left: "70px" }}
              alt='updownarrow'
            />
          </div>
          <StyledMenu
            id='customized-menu'
            anchorEl={poToAnchorEl}
            keepMounted
            open={Boolean(poToAnchorEl)}
            onClose={handlePoToClose}
          >
            <div className='d-flex flex-column align-items-center'>
              <StyledMenuItem>
                <Button
                  style={{ padding: "10px", height: "40px", width: "130px" }}
                  className='btn btn-link btn-sm font-weight-bold'
                  variant='outlined'
                  color='primary'
                  onClick={() => setPoToFilterOnSelect("")}
                >
                  Clear
                </Button>
              </StyledMenuItem>
              {poToAnchorEl ? (
                // props.poOrganisationsList.map((org) => {
                //   let orgNameDisplay = org.name + " (" + org.id + ")";
                //   return (
                //     <div>
                //       <StyledMenuItem>
                //         <Button variant="outlined" color="primary" onClick={() => setPoToFilterOnSelect(org.id)}>{orgNameDisplay}</Button>
                //       </StyledMenuItem>
                //     </div>
                //   )
                // })
                <StyledMenuItem>
                  <Autocomplete
                    id='toOrder'
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
                        variant='outlined'
                      />
                    )}
                  />
                </StyledMenuItem>
              ) : (
                <div>Empty List</div>
              )}
            </div>
          </StyledMenu>
        </div>
      );
    } else if (columnData === "From") {
      return (
        <div className='box col-2'>
          <div className='filter-item ml-4' onClick={handlePoFromClick}>
            <div className='icon mr-2'>{props.data.img1}</div>
            <div className='filterTitle'>{props.data.coloumn1}</div>
            <img
              src={updownarrow}
              width='10'
              height='10'
              className='ml-3'
              alt='arrow'
            />
          </div>
          <StyledMenu
            id='customized-menu'
            anchorEl={poFromAnchorEl}
            keepMounted
            open={Boolean(poFromAnchorEl)}
            onClose={handlePoFromClose}
          >
            <div className='d-flex flex-column align-items-center'>
              <StyledMenuItem>
                <Button
                  style={{ padding: "10px", height: "40px", width: "130px" }}
                  className='btn btn-link btn-sm font-weight-bold'
                  variant='outlined'
                  color='primary'
                  onClick={() => setPoFromFilterOnSelect("")}
                >
                  Clear
                </Button>
              </StyledMenuItem>
              {poFromAnchorEl ? (
                // props.poOrganisationsList.map((org) => {
                //   let orgNameDisplay = org.name + " (" + org.id + ")";
                //   return (
                //     <div>
                //       <StyledMenuItem>
                //         <Button variant="outlined" color="primary" onClick={() => setPoFromFilterOnSelect(org.id)}>{orgNameDisplay}</Button>
                //       </StyledMenuItem>
                //     </div>
                //   )
                // })
                <StyledMenuItem>
                  <Autocomplete
                    id='fromOrder'
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
                        variant='outlined'
                      />
                    )}
                  />
                </StyledMenuItem>
              ) : (
                <div>Empty List</div>
              )}
            </div>
          </StyledMenu>
        </div>
      );
    } else if (columnData === "Product Name") {
      return (
        <div className='box col-4'>
          <div
            className='filter-item ml-4'
            onClick={handleInventoryProductNameClick}
            style={{ position: "relative", left: "-70px" }}
          >
            <div className='icon mr-2'>{props.data.img1}</div>
            <div className='filterTitle'>{props.data.coloumn1}</div>
            <img
              src={updownarrow}
              width='10'
              height='10'
              className='ml-3'
              style={{ position: "relative", left: "140px" }}
              alt='arrow'
            />
          </div>
          <StyledMenu
            id='customized-menu'
            anchorEl={inventoryProductNameAnchorEl}
            keepMounted
            open={Boolean(inventoryProductNameAnchorEl)}
            onClose={handleInventoryProductNameClose}
            style={{ marginLeft: "3rem", width: "175rem" }}
          >
            <div className='d-flex flex-column align-items-center'>
              {inventoryProductNameAnchorEl ? (
                <StyledMenuItem>
                  <Autocomplete
                    id='ProductName'
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
                        variant='outlined'
                      />
                    )}
                  />
                </StyledMenuItem>
              ) : (
                <div>Empty List</div>
              )}
              <StyledMenuItem>
                <Button
                  style={{ padding: "10px", height: "40px", width: "130px" }}
                  className='btn btn-link btn-sm font-weight-bold'
                  variant='outlined'
                  color='primary'
                  onClick={() => setInventoryProductNameFilterOnSelect("")}
                >
                  Clear
                </Button>
              </StyledMenuItem>
            </div>
          </StyledMenu>
        </div>
      );
    } else {
      return (
        <div className='box col'>
          <div className='filter-item'>
            <div className='icon mr-2'>{props.data.img1}</div>
            <div className='filterTitle'>{props.data.coloumn1}</div>
            <div className='filterAction'>
              {/* <img src={updownarrow} width="9" height="9" /> */}
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className='filter'>
      <div className='d-flex justify-content-between'>
        <div className='row' style={{ flexBasis: props.fb }}>
          {/* <div className="box col">
            <div className="filter-item">
              <div className="icon mr-2">
                {props.data.img1}
              </div>
              <div className="filterTitle">{props.data.coloumn1}</div>
              <div className="filterAction"> */}
          {/* <img src={updownarrow} width="9" height="9" /> */}
          {/* </div>
            </div>
          </div> */}
          {props.data.img1 ? renderColumn1(props.data.coloumn1) : null}
          <span className='divider' />
          {/* <div className="box col">
            <div className="filter-item">
              <div className="icon mr-2">
                {props.data.img2}
              </div>
              <div className="filterTitle">{props.data.coloumn2}</div>
              <div className="filterAction">
              </div>
            </div>
          </div> */}
          {props.data.img2 ? renderColumn2(props.data.coloumn2) : null}
          <span className='divider' />

          {/* <div className="box col">
            <div className="filter-item">
              <div className="icon mr-2">
                {props.data.img3}
              </div>
              <div className="filterTitle">{props.data.coloumn3}</div>
              <div className="filterAction"> */}
          {/* <img src={updownarrow} width="9" height="9" /> */}
          {/* </div>
            </div>
          </div> */}
          {props.data.img3 ? renderColumn3(props.data.coloumn3) : null}
          {props.data.img4 ? <span className='divider' /> : null}
          {props.data.img4
            ? // <div className="box col">
              //   <div className="filter-item">
              //     <div className="icon mr-2">
              //       {props.data.img4}
              //     </div>
              //     <div className="filterTitle">{props.data.coloumn4}</div>
              //     <div className="filterAction">
              //       {/* <img src={updownarrow} width="9" height="9" /> */}
              //     </div>
              //   </div>
              // </div>
              renderColumn4(props.data.coloumn4)
            : null}
          {props.data.img5 ? <span className='divider' /> : null}
          {props.data.img5
            ? // <div className="box col">
              //   <div className="filter-item">
              //       <div className="icon mr-2">
              //         {props.data.img5}
              //       </div>
              //       <div className="filterTitle">{props.data.coloumn5}</div>
              //     <div className="filterAction">
              //       {/* <img src={updownarrow} width="9" height="9" /> */}
              //     </div>
              //   </div>
              // </div>
              renderColumn5(props.data.coloumn5)
            : null}
        </div>
        {props.data.img6 ? renderColumn6(props.data.coloumn6) : null}
        {/* <div className="box col">
          <span className="divider" />
          <div className="filter-item">
            <div className="icon mr-2">
              {props.data.img6}
            </div>
            <div className="filterTitle">{props.data.coloumn6}</div>
            <div className="filterAction">
              {/* <img src={updownarrow} width="9" height="9" /> */}
        {/* </div>
          </div>
        </div> */}
        <div className=''>
          <div className='box col'>
            {/* <button className="btn btn-md btn-blue mr-2">
            <div className="d-flex align-items-center">
              <img src={FilterIcon} width="10" height="10" className="mr-3" />
              <span className="text">Filter</span>
              <img src={dropdownIcon} width="10" height="10" className="ml-3" />
            </div>
          </button> */}
            <button className='btn-filter-info' onClick={handleClick}>
              <div className='d-flex align-items-center'>
                <img
                  src={FilterIcon}
                  width='14'
                  height='14'
                  className='mr-2'
                  alt='FilterIcon'
                />
                <span className='text'>Filter</span>
                <img
                  src={dropdownIcon}
                  width='10'
                  height='10'
                  className='ml-2'
                  alt='Drop Down Icon'
                />
              </div>
            </button>
            <StyledMenu
              id='customized-menu'
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <div className='d-flex flex-column align-items-center'>
                <StyledMenuItem>
                  <Button
                    type='button'
                    style={{ padding: "10px", height: "40px", width: "130px" }}
                    className='btn btn-outline-primary btn-sm'
                    onClick={() => setDateFilterOnSelect("today")}
                  >
                    <b>Today</b>
                  </Button>
                </StyledMenuItem>
                <StyledMenuItem>
                  <Button
                    type='button'
                    style={{ height: "40px", width: "130px" }}
                    className='btn btn-outline-primary btn-sm'
                    onClick={() => setDateFilterOnSelect("week")}
                  >
                    <b>This Week</b>
                  </Button>
                </StyledMenuItem>
                <StyledMenuItem>
                  <Button
                    type='button'
                    style={{ height: "40px", width: "130px" }}
                    className='btn btn-outline-primary btn-sm'
                    onClick={() => setDateFilterOnSelect("month")}
                  >
                    <b>This Month</b>
                  </Button>
                </StyledMenuItem>
                <StyledMenuItem>
                  <Button
                    type='button'
                    style={{ height: "40px", width: "130px" }}
                    className='btn btn-outline-primary btn-sm'
                    onClick={() => setDateFilterOnSelect("threeMonth")}
                  >
                    <b>Last 3 Months</b>
                  </Button>
                </StyledMenuItem>
                <StyledMenuItem>
                  <Button
                    type='button'
                    style={{ height: "40px", width: "130px" }}
                    className='btn btn-outline-primary btn-sm'
                    onClick={() => setDateFilterOnSelect("sixMonth")}
                  >
                    <b>Last 6 Months</b>
                  </Button>
                </StyledMenuItem>
                <StyledMenuItem>
                  <Button
                    type='button'
                    style={{ height: "40px", width: "130px" }}
                    className='btn btn-outline-primary btn-sm'
                    onClick={() => setDateFilterOnSelect("year")}
                  >
                    <b>This Year</b>
                  </Button>
                </StyledMenuItem>
              </div>
            </StyledMenu>
            {!props?.isReportDisabled && (
              <button
                className='btn-filter-blue ml-2'
                onClick={() =>
                  props.setShowExportFilter(!props.showExportFilter)
                }
              >
                <div className='d-flex  align-items-center'>
                  <img
                    src={ExportIcon}
                    width='14'
                    height='14'
                    className='mr-2'
                    alt='Export Icon'
                  />
                  <span>Export</span>
                  <img
                    src={dropdownIcon}
                    width='10'
                    height='10'
                    className='ml-2'
                    alt='DropDownIcon'
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
  );
};
export default AdvanceTableFilter;
