import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import NetworkGraph from "../../networkGraphs/NetworkGraph";
import { useSelector } from "react-redux";

export default function BestSellerRow({ product }) {
  const [openGraph, setOpenGraph] = React.useState(false);
  const {user} = useSelector((state) => state);
  const Distributor = user.type === "DISTRIBUTORS"
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
        className='mi-custom-tableRow'
      >
        <TableCell className='mi-custom-cell mi-radius-first mi-first-cell-padding'>
          <div className='mi-table-data'>
            <div className='table-icon-space'>
              <i className='fa-solid fa-prescription-bottle-medical'></i>
            </div>
            <p className='mi-body-md black f-700 mi-reset'>
              {product?.productCategory}
            </p>
          </div>
        </TableCell>
        <TableCell className='mi-custom-cell'>
          <div className='mi-table-data'>
            <p className='mi-body-md black f-700 mi-reset'>
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

        <TableCell className='mi-custom-cell'>
          <div className='mi-table-data'>
            <p className='mi-body-md black f-700 mi-reset'>
              {product?.inventoryAnalytics?.sales || 0}
            </p>
            <p className='mi-body-xs grey f-500 mi-reset mi-no-wrap'>
              ( {product?.unitofMeasure?.name} )
            </p>
          </div>
        </TableCell>
        <TableCell className='mi-custom-cell table-button-space mi-radius-last'>
          <button
            className='nt-btn nt-btn-xs nt-btn-blue-alt'
            onClick={handleGraphOpen}
          >
            <i className='fa-solid fa-chart-pie'></i>
            <span>View</span>
          </button>
        </TableCell>
      </TableRow>

      <Dialog
        open={openGraph}
        onClose={handleGraphClose}
        className='mi-custom-dialog'
      >
        <DialogContent className='mi-custom-dialog-content'>
          <NetworkGraph
            onClose={handleGraphClose}
            graph={"bigbar"}
            name={product?.productName}
            cat={product?.productCategory}
            data={product?.inventoryAnalytics?.dailyAnalytics}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
