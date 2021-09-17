import React, { useState, useEffect } from "react";
import previous from '../../assets/icons/previous.png';
import next from '../../assets/icons/next.png';
import './style.scss';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Tablee from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Pagination from '@material-ui/lab/Pagination';
import { formatDate } from '../../utils/dateHelper';
import dropdownIcon from '../../assets/icons/dropdown_selected.png';
import Divider from '@material-ui/core/Divider';

const Table = props => {
  const { inventoryDetails, inventoryCount, colors, skip } = props;
  const [display, setDisplay] = useState(false);
  
  const handlePageChange  = (event, value) => {
    props.onPageChange(value)
  };
function getDate(n){
    return n.substring(0,10)
}
// console.log("inventoryDetailsTable",inventoryDetails)
inventoryDetails.sort(function(a,b){
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  return (
    <div className="table">
    <div className="rTable">
    {inventoryDetails.length == 0 && <div className="rTableRow pt-2 pb-2 justify-content-center text-muted shadow-none">No records found</div>}
       {inventoryDetails.map((inventory, index) => (
         
          <div className="" key={index}>
          <Accordion className="mb-3 p-0 table-inventory">
           
              <AccordionSummary
                 // expand={display}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  //className="rTableRow"
                  >
                  {/*<div className="rTableCell" style={{position:"relative",left:'0%', fontWeight:"600"}}>*/}            
                  <div className="col-4 txt1 text-left" style={{position:"relative",left:'0%', fontWeight:"600",fontSize:"14px"}}>
                    <div className="d-flex flex-column txtBlue">
                      <div> 
                          {inventory.productDetails.name}
                      </div>
                    </div>
                  </div>
                  <div className="col-2 txt1 text-left" style={{position:"relative",left:'3%',fontSize:"14px"}}>{inventory.productDetails.type}</div>
                  {/* <div className="rTableCell" style={{position:"relative",left:'0%'}}>{inventory.ProductList[0].productDetails.manufacturer}</div> */}
                  <div className="col txt1" style={{position:"relative",left:'11%',fontSize:"14px"}}> {formatDate(inventory.createdAt)}</div>
                  <div className="col txt1 text-right"  style={{position:"relative",left:'14%',fontSize:"14px"}}>{inventory.inventoryQuantity}{inventory.productDetails.unitofMeasure ? inventory.productDetails.unitofMeasure.name ? <span>{" ("}{inventory.productDetails.unitofMeasure.name}{")"}</span>: null:null}</div>                                 
                  <div className="rTableCell" style={{position:"relative", left:"14%", fontWeight:" 600 "}}>
                         {(inventory.eventTypePrimary !== 'ADD') ? (inventory.eventTypePrimary === 'RECEIVE' ? <div className="status secondary-bg bg-success"> Received</div> :  <div className="status secondary-bg bg-warning">Sent</div>) :  <div className="status secondary-bg bg-primary">Added</div>} 
                  </div>
                    <div className=" rTableCell m-1" 
                         style={{position:"relative",left:'8.5%'}}>
                         <span className="drop-pad rounded-circle ">
                         <img src={dropdownIcon} height="8" width="14" /> </span>
                  </div>                  
              {  /* <button
                      className="btn btn-outline-primary fontSize200 expand"
                      type="button"
                      onClick={() => setDisplay(!display)}
                      >{display ? "SHOW LESS" : "SHOW MORE"}
                    </button> */}
              </AccordionSummary>
                        <Divider />
                <AccordionDetails>
                     <Typography>
                           <TableContainer> 
                               <Tablee className="table-borderless lg">
                                <TableBody>
                                    {(inventory.eventTypePrimary === 'CREATE' || inventory.eventTypePrimary === 'RECEIVE') ?
                                    <div>
                                     <TableRow>
                                          <TableCell><div className="d-head">Shipment ID</div></TableCell>
                                             <div>
                                             <TableCell align="left">{inventory.shipmentDetails.id}</TableCell></div>
                                      </TableRow>
                                      <TableRow>
                                          <TableCell><div className="d-head">{inventory.eventTypePrimary === 'CREATE'?"To Organisation":"From Organisation" }</div></TableCell>
                                             <div className="">
                                               <TableCell align="left">{inventory.eventTypePrimary === 'CREATE'?(inventory.receiverDetails[0].name):(inventory.senderDetails[0].name)}</TableCell></div>
                                      </TableRow>
                                      <TableRow>
                                          <TableCell><div className="d-head">{inventory.eventTypePrimary === 'CREATE'?"To Location":"From Location" }</div></TableCell>
                                          <div className="">
                                             <TableCell align="left">{inventory.eventTypePrimary === 'CREATE' ? (inventory.receiverDetails[0].postalAddress) : (inventory.senderDetails[0].postalAddress)}</TableCell></div>
                                      </TableRow>
                                    </div>
                                         :
                                      <div>    
                                      <TableRow>
                                           <TableCell><div className="d-head">Mfg Date</div></TableCell>
                                              <div className="ml-5">
                                              <TableCell align="left">{formatDate(inventory.payloadData.data.products.mfgDate, "mmyyyy")}</TableCell></div>
                                      </TableRow>
                                      <TableRow>
                                              <TableCell align="left"><div className="d-head">Exp Date</div></TableCell>
                                              <div className="ml-5">
                                              <TableCell align="left">{formatDate(inventory.payloadData.data.products.expDate, "mmyyyy")}</TableCell></div>
                                      </TableRow>
                                      <TableRow>
                                              <TableCell align="left"><div className="d-head">Batch</div></TableCell>
                                              <div className="ml-5">
                                              <TableCell align="left">{inventory.payloadData.data.products.batchNumber}</TableCell></div>
                                      </TableRow> 
                                      </div> } 
                                      <div className="mt-3" style={{position:"absolute ", left:"78% ", bottom:"10% ", width:"20% "}}>
                                      {(inventory.eventTypePrimary === 'CREATE'|| inventory.eventTypePrimary === 'RECEIVE')  ? 
                                      <button
                                          type="button" className="bttn-blue blue-primary"  
                                          onClick={() => {
                                            props.history.push(`/viewshipment/${inventory.payloadData.data.id}`)
                                        }}
                                      >
                                        View Shipment</button>: ''}
                                  </div>
                                  {/* <div className="mt-3" style={{position:"absolute", left:"73%", bottom:"13%" , width:"25%"}}>
                                      <button
                                        type="button" className="bttn-orange orange-warning"
                                        disabled = {!inventory.payloadData.data.products.batchNumber}
                                        onClick={() => {
                                          props.history.push(`/productlist/${inventory.payloadData.data.products.batchNumber}`)
                                        }}
                                      >
                                      Show Product Details</button>
                                      </div>   */} 
                                   </TableBody>
                                </Tablee>
                      </TableContainer> 
                  </Typography>
                                  
               </AccordionDetails>
            </Accordion>
          </div>         
           ))}
     
     {inventoryCount > 0 && (
            <div className="d-flex flex-row-reverse">
              <Pagination showFirstButton showLastButton color="primary"  count={Math.ceil(inventoryCount/10)} onChange={handlePageChange} />
              <span className="mx-5 my-1 rounded text-dark" style={{fontWeight:"400",fontSize:"14px"}}>Total Records {inventoryCount} </span>
            </div>            
          )}
      </div>
      {/* {loadMore && (
         <button className=" btn-primary btn mr-2 float-left" onClick={onLoadMore}>Load More</button>
      )} */}
  </div>
);
};

export default Table;
