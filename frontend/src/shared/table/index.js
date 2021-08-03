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
          <Accordion className="mb-3" style={{borderRadius:"15px", width:"103%" }}>
           
              <AccordionSummary
                 // expand={display}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  //className="rTableRow"
                  >
                                   
                  <div className="rTableCell" style={{position:"relative",left:'0%', fontWeight:"600"}}>
                    <div className="d-flex flex-column txtBlue">
                      <div> 
                          {inventory.productDetails.name}
                      </div>
                    </div>
                  </div>
                  <div className="rTableCell text-center" style={{position:"relative",left:'18%'}}>{inventory.productDetails.type}</div>
                  {/* <div className="rTableCell" style={{position:"relative",left:'0%'}}>{inventory.ProductList[0].productDetails.manufacturer}</div> */}
                  <div className="rTableCell " style={{position:"relative",left:'27%'}}> {formatDate(inventory.createdAt)}</div>
                  <div className="rTableCell"  style={{position:"relative",left:'26%'}}>{inventory.inventoryQuantity}{inventory.productDetails.unitofMeasure ? inventory.productDetails.unitofMeasure.name ? <span>{" ("}{inventory.productDetails.unitofMeasure.name}{")"}</span>: null:null}</div>                                 
                  <div className="rTableCell" style={{position:"relative", left:"19%", fontWeight:" 600 "}}>
                         {(inventory.eventTypePrimary !== 'ADD') ? (inventory.eventTypePrimary === 'RECEIVE' ? <div className="status secondary-bg bg-success"> Received</div> :  <div className="status secondary-bg bg-warning">Sent</div>) :  <div className="status secondary-bg bg-primary">Added</div>} 
                  </div>
                    <div className=" rTableCell m-2" 
                         style={{position:"relative",left:'12%'}}>
                         <span className="drop-pad shadow rounded-circle ">
                         <img src={dropdownIcon} height="12" width="18" /> </span>
                  </div>                  
              {  /* <button
                      className="btn btn-outline-primary fontSize200 expand"
                      type="button"
                      onClick={() => setDisplay(!display)}
                      >{display ? "SHOW LESS" : "SHOW MORE"}
                    </button> */}
       
                 
           

             </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                            {/* <div className="" style={{position:"relative", bottom:"15%", width:"200%" }}>
                                   <hr className="solid" ></hr>
                                </div> */}
                              <TableContainer> 
                               <Tablee className="table-borderless lg">
                                <TableBody>
                                    {(inventory.eventTypePrimary === 'CREATE' || inventory.eventTypePrimary === 'RECEIVE') ?
                                    <div>
                                     <TableRow>
                                          <TableCell>Shipment Id:</TableCell>
                                             <div className="">
                                             <TableCell align="left">{inventory.shipmentDetails.id}</TableCell></div>
                                      </TableRow>
                                      <TableRow>
                                          <TableCell>{inventory.eventTypePrimary === 'CREATE'?"To Organisation:":"From Organisation:" }</TableCell>
                                             <div className="">
                                               <TableCell align="left">{inventory.eventTypePrimary === 'CREATE'?(inventory.receiverDetails[0].name):(inventory.senderDetails[0].name)}</TableCell></div>

                                      </TableRow>
                                      <TableRow>
                                          <TableCell>{inventory.eventTypePrimary === 'CREATE'?"To Location:":"From Location:" }</TableCell>
                                          <div className="">
                                             <TableCell align="left">{inventory.eventTypePrimary === 'CREATE' ? (inventory.receiverDetails[0].postalAddress) : (inventory.senderDetails[0].postalAddress)}</TableCell></div>

                                      </TableRow>
                                    </div>
                                         :
                                      <div>    
                                      <TableRow>
                                           <TableCell>Mfg Date</TableCell>
                                              <div className="ml-5">
                                              <TableCell align="left">{formatDate(inventory.payloadData.data.products.mfgDate, "mmyyyy")}</TableCell></div>
                                      </TableRow>
                                      <TableRow>
                                              <TableCell align="left">Exp Date</TableCell>
                                              <div className="ml-5">
                                              <TableCell align="left">{formatDate(inventory.payloadData.data.products.expDate, "mmyyyy")}</TableCell></div>
                                      </TableRow>
                                      <TableRow>
                                              <TableCell align="left">Batch</TableCell>
                                              <div className="ml-5">
                                              <TableCell align="left">{inventory.payloadData.data.products.batchNumber}</TableCell></div>
                                      </TableRow> 
                                      </div> }    

                                      <div className="mt-3" style={{position:"absolute ", left:"79% ", bottom:"38% ", width:"20% "}}>
                                      {(inventory.eventTypePrimary === 'CREATE'|| inventory.eventTypePrimary === 'RECEIVE')  ? 
                                      <button
                                          type="button" className="btn btn-outline-primary"  
                                          onClick={() => {
                                            props.history.push(`/viewshipment/${inventory.payloadData.data.id}`)
                                        }}
                        
                                        >View Shipment</button>: ''}
                                        </div>
                                          <div className="mt-3" style={{position:"absolute", left:"75%", bottom:"15%" , width:"25%"}}>
                                        <button
                                        type="button" className="btn btn-info"
                                        disabled = {!inventory.payloadData.data.products.batchNumber}
                                        onClick={() => {
                                          props.history.push(`/productlist/${inventory.payloadData.data.products.batchNumber}`)
                                        }}
                      
                                      >Show Product Details</button></div>
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
              <Pagination showFirstButton showLastButton color="primary" count={Math.ceil(inventoryCount/10)} onChange={handlePageChange} />
              <span className="mx-5 my-1 rounded text-primary">Total Records {inventoryCount} </span>
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
