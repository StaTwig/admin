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
//   console.log(props.inventoryDetails)
function getDate(n){
    return n.substring(0,10)
}
  return (
    <div className="table">
    <div className="rTable">
       {inventoryDetails.map((inventory, index) => (
         
          <div className="" key={index}>
          <Accordion className="mb-3" style={{borderRadius:"15px", width:"103%" }}>
           
              <AccordionSummary
                 // expand={display}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  //className="rTableRow"
                  >
                                   
                  <div className="rTableCell" style={{position:"relative",left:'0%'}}>
                    <div className="d-flex flex-column txtBlue">
                      <div>{inventory.ProductList[0].productDetails.name}</div>
                    </div>
                  </div>
                  <div className="rTableCell" style={{position:"relative",left:'6%'}}>{inventory.ProductList[0].productDetails.type}</div>
                  {/* <div className="rTableCell" style={{position:"relative",left:'0%'}}>{inventory.ProductList[0].productDetails.manufacturer}</div> */}
                  <div className="rTableCell" style={{position:"relative",left:'12%'}}>{formatDate(inventory.ProductList[0].productDetails.createdAt)}</div>
                  <div className="rTableCell" style={{position:"relative",left:'19%'}}>{inventory.inventoryQuantity}</div>                                 
                  <div className="rTableCell" style={{position:"relative",left:'22%'}}> {(inventory.eventTypePrimary !== 'ADD') ? (inventory.eventTypePrimary === 'RECEIVED' ? 'RECEIVED' :  'SENT') : 'ADDED'} </div>
                 <div className=" rTableCell m-2" 
                         style={{position:"relative",left:'12%'}}>
                         <span className="drop-pad shadow rounded-circle">
                         <img src={dropdownIcon} height="12" width="18"/></span>
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
                            <div className="" style={{position:"relative", bottom:"15%", width:"200%" }}>
                                 <hr className="solid" ></hr>
                            </div>
                              <TableContainer> 
                               <Tablee className="table-borderless lg">
                                <TableBody>
                                    {(inventory.eventTypePrimary === 'CREATE') ?
                                    <div>
                                     <TableRow>
                                          <TableCell>Shipment Id:</TableCell>
                                             <div className="">
                                             <TableCell align="left"><b>{inventory.ProductList[0].shipmentDetails.id}</b></TableCell></div>
                                      </TableRow>
                                      <TableRow>
                                          <TableCell>From Organisation:</TableCell>
                                             <div className="">
                                             <TableCell align="left"><b>{inventory.ProductList[0].shipmentDetails.supplier.id}</b></TableCell></div>
                                      </TableRow>
                                      <TableRow>
                                          <TableCell>From Location:</TableCell>
                                          <div className="">
                                          <TableCell align="left"><b>{(inventory.actorOrgId === inventory.ProductList[0].shipmentDetails.supplier.id) ? inventory.actorOrgAddress : inventory.secondaryOrgAddress}</b></TableCell></div>
                                      </TableRow>
                                    </div>
                                         :
                                     <TableRow>
                                           <TableCell>Mfg Date</TableCell>
                                              <div className="ml-5">
                                              <TableCell align="left"><b>{inventory.ProductList[0].mfgDate}</b></TableCell></div>
                                          <TableCell align="left">Exp Date</TableCell>
                                              <div className="ml-5">
                                              <TableCell align="left"><b>{inventory.ProductList[0].expDate}</b></TableCell></div>
                                          <TableCell align="left">Batch</TableCell>
                                              <div className="ml-5">
                                              <TableCell align="left"><b>{inventory.ProductList[0].batchNumber}</b></TableCell></div>
                                    </TableRow> }    

                         
                                      <div className="mt-3" style={{position:"absolute", left:"80%", bottom:"38%" , heigth:"10%", width:"20%"}}>
                                      {(inventory.eventTypePrimary === 'CREATE') ? 
                                      <button
                                          type="button" className="btn btn-outline-primary " 
                                          onClick={() => {
                                            props.history.push(`/viewshipment/${inventory.payloadData.data.id}`)
                                        }}
                        
                                        >View Shipment</button>: ''}
                                        </div>
                                          <div className="mt-3" style={{position:"absolute", left:"78%", bottom:"15%" , width:"20%"}}>
                                        <button
                                        type="button" className="btn btn-outline-warning "
                                        disabled = {!inventory.payloadData.data.products[0].batchNumber}
                                        onClick={() => {
                                          props.history.push(`/productlist/${inventory.payloadData.data.products[0].batchNumber}`)
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
