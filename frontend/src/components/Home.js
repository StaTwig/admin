
import React from 'react';
import './Home.css';
//import EnhancedTable from './table'
function App() {
  return (
    <div className="wrapper d-flex">
      <div className="sticky-menu">
        <div className="d-flex flex-column">
          <div className="logo-left logo-style text-right mb-5 mt-5">VACCINE</div>
          <ul className="list-unstyled text-center">
            <li className="d-flex flex-column mb-3">
              <i className="fa fa-home"></i>
              <span>Home</span>
            </li>
            <li className="d-flex flex-column mb-3">
              <i className="fa fa-home"></i>
              <span>Home</span>
            </li>
            <li className="d-flex flex-column mb-3">
              <i className="fa fa-home"></i>
              <span>Home</span>
            </li>
            <li className="d-flex flex-column mb-3">
              <i className="fa fa-home"></i>
              <span>Home</span>
            </li>
            <li className="d-flex flex-column mb-3">
              <i className="fa fa-home"></i>
              <span>Home</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="content">
        <header className="d-flex justify-content-between">
          <div className="logo-right logo-style mt-5">LEDGER</div>
          <div className="form-user d-flex">
            <div>
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2" />
                <div className="input-group-append">
                  <button className="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
                </div>
              </div>
            </div>
            <div className="notification">B</div>
            <div className="user-info">
              <span>John Doe</span>
              <picture>
                <source srcset="..." type="image/svg+xml" />
                <img src="..." className="img-fluid img-thumbnail" alt="..." />
              </picture>
            </div>
          </div>
        </header>
        <div className="container-fluid p-5 pt-2">
          <h2>OVERVIEW</h2>
          <div className="row mt-3 mb-3">
            <div className="col-md-2">
              <p>Total Shipment</p>
            </div>
            <div className="col-md-2">
              <p>Total Shipment</p>
            </div>
            <div className="col-md-2">
              <p>Total Shipment</p>
            </div>
            <div className="col-md-2">
              <p>Total Shipment</p>
            </div>
            <div className="col-md-2">
              <p>Total Shipment</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="panel">
                <h4></h4>
              </div>
              <div className="card">
                <div className="card-body">
                  Inventory summary
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card">
                <div className="card-body">
                  Shipment summary
                  <EnhancedTable />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
