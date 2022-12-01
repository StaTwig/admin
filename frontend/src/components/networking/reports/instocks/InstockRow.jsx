import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
// import Tooltip from "@mui/material/Tooltip";
// import Button from "@mui/material/Button";
// import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import BatchDetails from "./batchDetails/BatchDetails";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import FormControl from "@mui/material/FormControl";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import Select from "@mui/material/Select";
// import Switch from "@mui/material/Switch";
import NetworkGraph from "../../networkGraphs/NetworkGraph";
import isBefore from "date-fns/isBefore";
import { subDays } from "date-fns";
import { useSelector } from "react-redux";

export default function InstockRow({ product, reportWarehouse, t }) {
  const [open, setOpen] = React.useState(false);
  const { user } = useSelector((state) => state);
  const Distributor = user.type === "DISTRIBUTORS" || user.type === "DROGUERIA" ? true : false;
  const isNearExpiry = (givenDate) => {
    try {
      if (givenDate)
        return {
          nearExpiry: isBefore(subDays(new Date(givenDate), 90), new Date()),
          expiry: isBefore(new Date(givenDate), new Date()),
        };
      else return { nearExpiry: false, expiry: false };
    } catch (err) {
      return { nearExpiry: false, expiry: false };
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [openGraph, setOpenGraph] = React.useState(false);

  const handleGraphOpen = () => {
    setOpenGraph(true);
  };

  const handleGraphClose = () => {
    setOpenGraph(false);
  };

  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("md");

  const handleMaxWidthChange = (event) => {
    // ts-expect-error autofill of arbitrary value is not handled.
    setMaxWidth(event.target.value);
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };

  return (
    <>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset !important" } }}
        className="mi-custom-tableRow"
      >
        <TableCell className="mi-custom-cell mi-radius-first mi-first-cell-padding">
          <div className="mi-table-data">
            <div className="table-icon-space">
              <i className="fa-solid fa-prescription-bottle-medical"></i>
            </div>
            <p className="mi-body-md black f-700 mi-reset">
              {product?.productCategory}
            </p>
          </div>
        </TableCell>

        <TableCell className="mi-custom-cell">
          <div className="mi-table-data">
            <p className="mi-body-md black f-700 mi-reset mi-text-wrap-sm">
              {product?.productName}
            </p>
          </div>
        </TableCell>

        {Distributor && (
          <TableCell className="mi-custom-cell">
            <div className="mi-table-data">
              <p className="mi-body-md black f-700 mi-reset">
                {product.manufacturer}
              </p>
            </div>
          </TableCell>
        )}
        <TableCell className="mi-custom-cell">
          <div className="mi-table-data">
            <p className="mi-body-md black f-700 mi-reset">
              {product?.inventoryAnalytics?.openingBalance || 0}
            </p>
            <p className="mi-body-xs grey f-500 mi-reset mi-no-wrap">
              ( {product?.unitofMeasure?.name} )
            </p>
          </div>
        </TableCell>
        <TableCell className="mi-custom-cell">
          <div className="mi-table-data">
            <p className="mi-body-md black f-700 mi-reset">
              {product?.productQuantity || 0}
            </p>
            <p className="mi-body-xs grey f-500 mi-reset mi-no-wrap">
              ( {product?.unitofMeasure?.name} )
            </p>
          </div>
        </TableCell>
        <TableCell className="mi-custom-cell table-button-space mi-radius-last">
          <button
            className="nt-btn nt-btn-xs nt-btn-orange"
            onClick={handleClickOpen}
          >
            <i className="fa-solid fa-clipboard-list"></i>
            <span>{t("batch")}</span>
          </button>
          <button
            className="nt-btn nt-btn-xs nt-btn-blue-alt"
            onClick={handleGraphOpen}
          >
            <i className="fa-solid fa-chart-pie"></i>
            <span>{t("view")}</span>
          </button>
        </TableCell>
      </TableRow>
      {/* <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        className="mi-custom-dialog"
      >
        <DialogContent className="mi-custom-dialog-content">
          <div className="network-modal-popup-container">
            <div className="nt-modal-header">
              <div className="modal-heading-space">
                <h1 className="mi-body-lg mi-reset mi-text-wrap-md">
                  {product?.productName}
                </h1>
                <p className='mi-body-md mi-reset'>
                  ( {product?.productCategory} )
                </p>
              </div>
              <div className='modal-closing-space' onClick={handleClose}>
                <i className='fa-solid fa-xmark'></i>
              </div>
            </div>
            <div className='nt-modal-body'>
              <BatchDetails
                productId={product._id}
                isNearExpiry={isNearExpiry}
                warehouseId={reportWarehouse}
              />
            </div>
            <div className="nt-modal-actions">
              <div className="modal-heading-space">
                <p className="mi-body-md f-500  mi-reset">Total - 1 Batch</p>
              </div>
              <button
                className="nt-btn nt-btn-sm nt-btn-blue"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog> */}

      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
        className="mi-custom-dialog"
      >
        <DialogContent className="mi-custom-dialog-content">
          <div className="network-modal-popup-container">
            <div className="nt-modal-header">
              <div className="modal-heading-space">
                <h1 className="mi-body-lg mi-reset mi-max-text-wrap-md">
                  {product?.productName}
                </h1>
                <p className="mi-body-md mi-reset">
                  ( {product?.productCategory} )
                </p>
              </div>
              <div className="modal-closing-space" onClick={handleClose}>
                <i className="fa-solid fa-xmark"></i>
              </div>
            </div>
            <div className="nt-modal-body">
              <BatchDetails
                productId={product._id}
                isNearExpiry={isNearExpiry}
                warehouseId={reportWarehouse}
                uom={product?.unitofMeasure?.name}
                t={t}
              />
            </div>
            <div className="nt-modal-actions">
              {/* <div className="modal-heading-space">
                <p className="mi-body-md f-500  mi-reset">Total - 1 Batch</p>
              </div> */}
              <div className="null"></div>
              <button
                className="nt-btn nt-btn-sm nt-btn-blue"
                onClick={handleClose}
              >
                {t("close")}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openGraph}
        onClose={handleGraphClose}
        className="mi-custom-dialog"
      >
        <DialogContent className="mi-custom-dialog-content">
          <NetworkGraph
            onClose={handleGraphClose}
            name={product?.productName}
            cat={product?.productCategory}
            data={product?.inventoryAnalytics?.dailyAnalytics}
            graph={"bar"}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
