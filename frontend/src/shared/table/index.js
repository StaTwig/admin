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



const Table = props => {
  const { loadMore, onLoadMore, inventoryDetails, colors, skip } = props;
  const [display, setDisplay] = useState(false);
  
 
  return (
    <div className="table">
    
    <div className="rTable">
    
        {inventoryDetails.map((inventory, index) => (
         
          <div className="" key={index}>
          <Accordion className="mb-3" style={{borderRadius:"15px" }}>
           
              <AccordionSummary
                  expanded={display}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  //className="rTableRow"
                  >
                                   
                  <div className="rTableCell" style={{position:"relative",left:'-3%'}}>
                    <div className="d-flex flex-column txtBlue ">
                      <div>{inventory.products.name}</div>
                    </div>
                  </div>
                  <div className="rTableCell" style={{position:"relative",left:'0%'}}>Vaccines</div>
                  <div className="rTableCell" style={{position:"relative",left:'0%'}}>{inventory.products.manufacturer}</div>
                  <div className="rTableCell" style={{position:"relative",left:'4%'}}>21/05/2021</div>
                  <div className="rTableCell" style={{position:"relative",left:'9%'}}>{inventory.inventoryDetails.quantity}</div>
                  <div className="rTableCell" style={{position:"relative",left:'8%'}}> Sent </div>
                                  
                  
                  <div className="rTableCell" style={{position:"relative",left:'3%'}}>
                    <button
                      className="btn btn-outline-primary fontSize200 expand"
                      type="button"
                      onClick={() => setDisplay(!display)}
                    >{display ? "SHOW LESS" : "SHOW MORE"}</button>
                 </div>
                 
           

             </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                            <div className="" style={{position:"absolute" ,top:"25%",width:"97%" }}>
                          <hr class="solid" ></hr></div>
                             <TableContainer >
                                <Tablee class="table-borderless lg">
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Shipment Id</TableCell>
                                        <div className="ml-5"><TableCell align="left"><b>SHP1234</b></TableCell></div>
                                        <TableCell align="left">Mfg Date</TableCell>
                                        <div className="ml-5"><TableCell align="left"><b>01/2019</b></TableCell></div>
                                        
                                      </TableRow>

                                      <TableRow>
                                          <TableCell>From Organisation</TableCell>
                                          <div className="ml-5"><TableCell align="left"><b>Dr Reddy's Lab</b></TableCell></div>
                                         <TableCell align="left">Exp Date</TableCell>
                                         <div className="ml-5"><TableCell align="left"><b>01/2022</b></TableCell></div></TableRow>
                                         
                                    

                                    <TableRow>
                                        <TableCell component="th" scope="row">From Location</TableCell>
                                        <div className="ml-5" mr-5><TableCell align="left"><b>Plant 1, Baccupally,Hyderabad</b></TableCell></div>
                                        <TableCell align="left">Batch</TableCell>
                                        <div className="ml-5"><TableCell align="left"><b>BB76OPV</b></TableCell></div>
                                        
                                      </TableRow>
                                      <div className="mt-3" style={{position:"absolute", left:"80%", bottom:"40%" , heigth:"10%", width:"20%"}}>
                                      <button
                                          type="button" class="btn btn-outline-primary " 
                                          onClick={() => {
                                            {inventory.inventoryDetails.batchNumber}
                                          }}
                        
                                        >View Shipment</button>
                                        </div>
                                          <div className="mt-3" style={{position:"absolute", left:"78%", bottom:"15%" , width:"20%"}}>
                                        <button
                                        type="button" class="btn btn-outline-warning "
                                        onClick={() => {
                                          props.history.push(`/productlist/${inventory.inventoryDetails.batchNumber}`)
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
     
        <div className="d-flex flex-row-reverse">
          <img style={{ padding: 1, height: 30, cursor: 'pointer' }} onClick={() => inventoryDetails.length > 4 && onLoadMore(true)} src={next} />
          <img style={{ padding: 1, height: 30, cursor: 'pointer' }} onClick={() => skip > 0 && onLoadMore(false)} src={previous} />
        </div>
      </div>
      {/* {loadMore && (
         <button className=" btn-primary btn mr-2 float-left" onClick={onLoadMore}>Load More</button>
      )} */}
  </div>
);
};

export default Table;
