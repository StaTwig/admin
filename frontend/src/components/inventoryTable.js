import React from "react";
import './inventoryTable.scss'
import 'typeface-roboto'
import brand from '../assets/brand.png'
import shipdate from '../assets/ship_date.png'
import inventory from '../assets/inventorynew.png'
import filter from '../assets/filter.png'
import Export from '../assets/Export.png'
import Status from '../assets/Status.png'
import OPV from '../assets/Sent.svg'
import MMR from '../assets/Received.svg'
import updown from '../assets/up-and-down-1.svg'
import down from '../assets/up-and-down.svg'
import InventoryAnalytic from './inventoryAnalytic'
const Inventory = () => {
    return (
        <div className="inventoryTable">
            <div className="row">
            <InventoryAnalytic />

            </div>
            <div className="row dark-bg">
                <div id="options" className="col-md-2 text-center icon">
                   <img width="18px" src={brand} /> Product Type <img width="9px" id="updown" src={updown} />
                </div>
                <div id="options" className="col-md-2 text-center icon">
                <img width="18px" src={shipdate} /> Brand  <img width="9px" id="updown" src={updown} />
                </div>
                <div id="options" className="col-md-2 text-center icon">
                <img width="18px" src={inventory} /> Expiry Date <img width="9px" id="updown" src={updown} />
                </div>
                <div id="options" className="col-md-2 text-center icon">
                <img width="18px" src={Status} />  
                Date Added<img width="9px" id="updown" src={updown} />
                {/* <select class="selectpicker">
                <option value="0">Status</option>
                <option>Received</option>
                <option>In-transit</option>
                <option>On.Hold</option>
                <option>Cancelled</option>
                </select> */}

                
                </div>                
                <div className="col-md-2 text-center">
                    <div>
                    <button  id="filter" class="btn">  <img width="18px" src={filter} />   Filter <img width="9px" id="down" src={down} /></button>
                    </div>
                </div>
                <div className="col-md-2 text-center">
                <button id="export" class="btn">  <img width="18px" src={Export} />   Export <img width="9px" id="down" src={down} /> </button>
                </div>

            </div>
            <div className="row main-table">
                <div className="col-md-9">
                <table>
                    <thead>
                    <tr className="headings">
                        <th className="fh">
                            Product Name
                        </th>
                        <th>
                            Brand
                        </th>
                        <th>
                            Batch Number
                        </th>
                        <th>
                            Quantity
                        </th>
                        <th>
                            Date Added
                        </th>
                        <th>
                            Mfg Date
                        </th>
                        <th>
                            Exp Date
                        </th>
                        
                    </tr>
                    </thead>
                    <span class="br"></span>
                    <tr>
                        <td>
                            <img className="OPV" src={OPV}  width="30px" /> <span className="client">OPV </span>
                        </td>
                        <td>
                        Quis urna
                        </td>
                        <td>
                        NKJ6286329
                        </td>
                        <td>
                        <span className="positive">+1415</span>
                        </td>
                        <td>
                        23/06/2008
                        </td>
                        <td>
                        17/08/2017
                        </td>
                        <td>
                        17/08/2017
                        </td>
                        
                    </tr>
                    <span class="br"></span>
                    <tr>
                        <td>
                            <img className="MMR" src={MMR}  width="30px" /> <span className="client">MMR</span>
                        </td>
                        <td>
                        Ultricies ultrices
                        </td>
                        <td>
                        NKJ6286329
                        </td>
                        <td>
                        <span className="negative"> - 4155</span>
                        </td>
                        <td>
                        18/02/1972
                        </td>
                        <td>
                        06/01/1951
                        </td>
                        <td>
                        06/01/1951
                        </td>
                        
                    </tr> 
                    <span class="br"></span>
                    <tr>
                        <td>
                            <img className="OPV" src={OPV}  width="30px" /> <span className="client">OPV</span>
                        </td>
                        <td>
                        Viverra non
                        </td>
                        <td>
                             NKJ6286329
                        </td>
                        <td>
                        <span className="negative"> - 832</span>
                        </td>
                        <td>
                        10/04/2009
                        </td>
                        <td>
                        08/09/1971
                        </td>
                        <td>
                        08/09/1971
                        </td>
                        
                    </tr>
                    <span class="br"></span>
                    <tr>
                        <td>
                            <img className="OPV" src={OPV}  width="30px" /> <span className="client">OPV</span>
                        </td>
                        <td>
                        Ornare
                        </td>
                        <td>
                        NKJ6286329
                        </td>
                        <td>
                        <span className="positive"> + 2634</span>
                        </td>
                        <td>
                        02/06/1976
                        </td>
                        <td>
                        16/06/1963
                        </td>
                        <td>
                        16/06/1963
                        </td>
                        
                    </tr>
                    <span class="br"></span>
                    <tr className="content">
                        <td>
                            <img className="MMR" src={MMR}  width="30px" /> <span className="client">MMR</span>
                        </td>
                        <td>
                        Tempor posuere
                        </td>
                        <td>
                        NKJ6286329
                        </td>
                        <td>
                        <span className="positive"> + 4595</span>
                        </td>
                        <td>
                        04/05/2016
                        </td>
                        <td>
                        23/03/1976
                        </td>
                        <td>
                        23/03/1976
                        </td>
                        
                    </tr>
                    <span class="br"></span>
                    <tr>
                        <td className="special">
                            <img className="MMR" src={MMR}  width="30px" /> <span className="client">MMR</span>
                        </td>
                        <td>
                        Condimentum
                        </td>
                        <td>
                        NKJ6286329
                        </td>
                        <td>
                        <span className="negative"> - 903 </span>
                        </td>
                        <td>
                        03/04/1988
                        </td>
                        <td>
                        10/01/2019
                        </td>
                        <td>
                        10/01/2019
                        </td>
                        
                    </tr>
                   
                </table>
                </div>
                <div className="col-md-1">
                <div className="row">
                   <div className="card-small">                       
                        <img id="OPV" height="35px" src={OPV} />                       
                       <span id="card-text">OPV</span>
                       <span id="text-bold">2930</span>
                   </div>
                   </div>
                   <div className="row">
                   <div className="card-small">
                       
                           <img id="MMR" height="35px" src={MMR} />
                       
                       <span id="card-text">MMR</span>
                       <span id="text-bold">6437</span>
                   </div>
                   </div>
                   <div className="row">
                   <div className="card-small">
                       
                           <img id="OPV" height="35px" src={OPV} />
                       
                       <span id="card-text">OPV</span>
                       <span id="text-bold">2930</span>
                   </div>
                   </div>
                </div>
                <div className="col-md-1">
                <div className="row">
                <div className="card-small-right">
                       
                           <img id="MMR" height="35px" src={MMR} />
                       
                       <span id="card-text">MMR</span>
                       <span id="text-bold">6437</span>
                   </div>
                   </div>
                   <div className="row">
                   <div className="card-small-right">
                       
                           <img id="OPV" height="35px" src={OPV} />
                       
                       <span id="card-text">OPV</span>
                       <span id="text-bold">2930</span>
                   </div>
                   </div>
                   <div className="row">
                   <div className="card-small-right">
                       
                           <img id="MMR" height="35px" src={MMR} />
                       
                       <span id="card-text">MMR</span>
                       <span id="text-bold">6437</span>
                   </div>
                   </div>
                </div>
            </div>
        </div>
    );

}

export default Inventory;