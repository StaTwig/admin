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
              
                <div id="head">Inventory Summary</div>
                
                  <MDBBtn id="submitTop"  type="submit">  Add Inventory </MDBBtn>
                  <MDBBtn id="submitBottom" type="submit">  View More </MDBBtn>
                  <div id="chartjs-render-monitor" ><ChartsPage/></div>
                <div id="total">Total Current Inventory</div>
                <div id="value">1200</div>
              
          </MDBCardBody>
          </MDBCard>
          </MDBContainer>
    
    </div>

  );
};


export default InventorySummary;


