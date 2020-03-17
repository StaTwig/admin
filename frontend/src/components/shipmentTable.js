import React from "react";
import './shipmentTable.scss'
import 'typeface-roboto'
import brand from '../assets/brand.png'
import shipdate from '../assets/ship_date.png'
import inventory from '../assets/inventorynew.png'
import filter from '../assets/filter.png'
import Export from '../assets/Export.png'
import Status from '../assets/Status.png'
import user from '../assets/image.jpg'
import bell from '../assets/bell.svg'
import updown from '../assets/up-and-down-1.svg' 
import down from '../assets/up-and-down.svg'
const Shipments = () => {
    return (
        <div className="shipmentTable">
            <div className="row dark-bg">
                <div id="options" className="col-md-2 text-center icon">
                   <img width="18px" src={brand} /> Client <img width="9px" id="updown" src={updown} />
                </div>
                <div id="options" className="col-md-2 text-center icon">
                <img width="18px" src={shipdate} /> Shipping Date  <img width="9px" id="updown" src={updown} />
                </div>
                <div id="options" className="col-md-2 text-center icon">
                <img width="18px" src={inventory} /> Product Type <img width="9px" id="updown" src={updown} />
                </div>
                <div id="options" className="col-md-2 text-center icon">
                <img width="18px" src={Status} />  
                Status <img width="9px" id="updown" src={updown} />
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
                <table>
                    <thead>
                    <tr className="headings">
                        <th className="fh">
                            Client
                        </th>
                        <th>
                            Shipment ID
                        </th>
                        <th>
                            Alert
                        </th>
                        <th>
                            Product Name
                        </th>
                        <th>
                            Quantity
                        </th>
                        <th>
                            Shipment Date
                        </th>
                        <th>
                            Deliver to
                        </th>
                        <th>
                            Delivery Date
                        </th>
                        <th>
                            Delivery Location
                        </th>
                        <th>
                            Status
                        </th>
                    </tr>
                    </thead>
                    <span class="br"></span>
                    <tr>
                        <td>
                            <img className="img" src={user}  width="30px" /> <span className="client">Fionna Jackson </span>
                        </td>
                        <td>
                        3987
                        </td>
                        <td>
                            <img src={bell} className="no"width="30" height="30" />
                        </td>
                        <td>
                        bOPV <span className="underline"> +5 more </span>
                        </td>
                        <td>
                        4486
                        </td>
                        <td>
                        29/03/2014
                        </td>
                        <td>
                        Philip Lucas
                        </td>
                        <td>
                        29/03/2014
                        </td>
                        <td>
                        Puerto Vallarta
                        </td>
                        <td className="success">
                        Received
                        </td>
                    </tr>
                    <span class="br"></span>
                    <tr>
                        <td>
                            <img className="img" src={user}  width="30px" /> <span className="client">Megan Sanders</span>
                        </td>
                        <td>
                        420
                        </td>
                        <td>
                            <img src={bell} className="yes"width="30" height="30" />
                        </td>
                        <td>
                        MMR <span className="underline"> +2 more </span>
                        </td>
                        <td>
                        3598
                        </td>
                        <td>
                        01/08/1997
                        </td>
                        <td>
                        Randy Stewart
                        </td>
                        <td>
                        01/08/1997
                        </td>
                        <td>
                        Sydney
                        </td>
                        <td className="transit">
                        InTransit
                        </td>
                    </tr> 
                    <span class="br"></span>
                    <tr>
                        <td>
                            <img className="img" src={user}  width="30px" /> <span className="client">Natasha</span>
                        </td>
                        <td>
                        4290
                        </td>
                        <td>
                            <img src={bell} className="no"width="30" height="30" />
                        </td>
                        <td>
                        bOPV <span className="underline"> +5 more </span>
                        </td>
                        <td>
                        4984
                        </td>
                        <td>
                        07/05/1996
                        </td>
                        <td>
                        Carmen Meyer
                        </td>
                        <td>
                        07/05/1996
                        </td>
                        <td>
                        Jerusalem
                        </td>
                        <td className="hold">
                        On Hold
                        </td>
                    </tr>
                    <span class="br"></span>
                    <tr>
                        <td>
                            <img className="img" src={user}  width="30px" /> <span className="client">Tom Gomez</span>
                        </td>
                        <td>
                        1780
                        </td>
                        <td>
                            <img src={bell} className="yes" width="30" height="30" />
                        </td>
                        <td>
                        HepA <span className="underline"> +5 more </span>
                        </td>
                        <td>
                        4949
                        </td>
                        <td>
                        31/08/1958
                        </td>
                        <td>
                        Bruce Dean
                        </td>
                        <td>
                        31/08/1958
                        </td>
                        <td>
                        Manila
                        </td>
                        <td className="cancel">
                        Cancelled
                        </td>
                    </tr>
                    <span class="br"></span>
                    <tr className="content">
                        <td>
                            <img className="img" src={user}  width="30px" /> <span className="client">Lori Stanley</span>
                        </td>
                        <td>
                        2215
                        </td>
                        <td>
                            <img src={bell} className="no"width="30" height="30" />
                        </td>
                        <td>
                        HepB <span className="underline"> +5 more </span>
                        </td>
                        <td>
                        4864
                        </td>
                        <td>
                        15/02/2000
                        </td>
                        <td>
                        Lori Hill
                        </td>
                        <td>
                        15/02/2000
                        </td>
                        <td>
                        Manila
                        </td>
                        <td className="success">
                        Send
                        </td>
                    </tr>
                    <span class="br"></span>
                    <tr>
                        <td className="special">
                            <img className="img" src={user}  width="30px" /> <span className="client">Jessica Grand</span>
                        </td>
                        <td>
                        4990
                        </td>
                        <td>
                            <img src={bell} className="no"width="30" height="30" />
                        </td>
                        <td>
                        MMR <span className="underline"> +2 more </span>
                        </td>
                        <td>
                        845
                        </td>
                        <td>
                        14/02/1966
                        </td>
                        <td>
                        Justin Carrol
                        </td>
                        <td>
                        14/02/1966
                        </td>
                        <td>
                        Hobart
                        </td>
                        <td className="transit">
                        InTransit
                        </td>
                    </tr>
                   
                </table>
            </div>
        </div>
    );

}

export default Shipments;