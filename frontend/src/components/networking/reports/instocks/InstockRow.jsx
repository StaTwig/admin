import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import BatchDetails from "./batchDetails/BatchDetails";
import NetworkGraph from "../../networkGraphs/NetworkGraph";

export default function InstockRow({product}) {
  const [open, setOpen] = React.useState(false);

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

  return (
    <>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset !important" } }}
        className="mi-custom-tableRow"
      >
        <TableCell className="mi-custom-cell mi-radius-first mi-first-cell-padding">
          <div className="mi-table-data">
            <div className="table-icon-space">
              <i class="fa-solid fa-prescription-bottle-medical"></i>
            </div>
            <p className="mi-body-md black f-700 mi-reset">{product?.type}</p>
          </div>
        </TableCell>
        <TableCell className="mi-custom-cell">
          <div className="mi-table-data">
            <p className="mi-body-md black f-700 mi-reset">{product?.name}</p>
            <Tooltip title="Product Expired" placement="top">
              <Button>
                {" "}
                <i class="fa-solid fa-triangle-exclamation error-icon"></i>
              </Button>
            </Tooltip>
          </div>
        </TableCell>
        <TableCell className="mi-custom-cell">
          <div className="mi-table-data">
            <p className="mi-body-md black f-700 mi-reset">0</p>
            <p className="mi-body-xs grey f-500 mi-reset mi-no-wrap">
              ( {product?.unitofMeasure?.name} )
            </p>
          </div>
        </TableCell>
        <TableCell className="mi-custom-cell">
          <div className="mi-table-data">
            <p className="mi-body-md black f-700 mi-reset">0</p>
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
            <i class="fa-solid fa-chart-pie"></i>
            <span>Batch</span>
          </button>
          <button
            className="nt-btn nt-btn-xs nt-btn-blue-alt"
            onClick={handleGraphOpen}
          >
            <i class="fa-solid fa-chart-pie"></i>
            <span>View</span>
          </button>
        </TableCell>
      </TableRow>
      <Dialog open={open} onClose={handleClose} className="mi-custom-dialog">
        <DialogContent className="mi-custom-dialog-content">
          <div className="network-modal-popup-container">
            <div className="nt-modal-header">
              <div className="modal-heading-space">
                <h1 className="mi-body-lg mi-reset">{product?.name}</h1>
                <p className="mi-body-md mi-reset">( {product?.type} )</p>
              </div>
              <div className="modal-closing-space" onClick={handleClose}>
                <i class="fa-solid fa-xmark"></i>
              </div>
            </div>
            <div className="nt-modal-body">
              <BatchDetails />
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
      </Dialog>

      <Dialog
        open={openGraph}
        onClose={handleGraphClose}
        className="mi-custom-dialog"
      >
        <DialogContent className="mi-custom-dialog-content">
          <NetworkGraph onClose={handleGraphClose} graph={"bar"} />
        </DialogContent>
      </Dialog>
    </>
  );
}
