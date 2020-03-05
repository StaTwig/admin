import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { MDBContainer, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import 'typeface-roboto';
import './inventorySummary.css';

import ChartsPage from './doughnut'

const InventorySummary = () => {
  return (
    <div>
    <MDBContainer>

          <MDBCard className="inventoryCard">
            <MDBCardBody>
              
                <div className="head">Inventory Summary</div>
                
                <div className="top">
                  <MDBBtn className="submitTop"  type="submit">
                    Add Inventory
                  </MDBBtn>
                </div>
                <div className="bottom">
                  <MDBBtn className="submitBottom" type="submit">
                    View More
                  </MDBBtn>
                </div>
                <div className="chart"><ChartsPage/></div>
                <div className="box">Total Current Inventory<div><b>1200</b></div></div>
              
          </MDBCardBody>
          </MDBCard>
          </MDBContainer>
    
    </div>

  );
};


export default InventorySummary;


