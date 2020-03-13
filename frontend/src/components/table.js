import React from "react";
import './table.scss'
import 'typeface-roboto'
import dp from '../assets/image.jpg'
const ShipmentsSummary = () => {
    return (
        <div className="shipmentSummmary">
            <div className="row main">
            <div id="image" className="col-sm-1">
                   
                </div>
                <div id="title" className="col-md-2">
                    Client
                </div>
                <div id="title" className="col-sm-1">
                    ID
                </div>
                <div id="title" className="col-md-2">
                    Shipment Date
                </div>
                <div id="title" className="col-md-2">
                    Current Location
                </div>
                <div id="title" className="col-sm-2">
                    Temperature
                </div>
                <div id="title" className="col-md-2">
                    Status
                </div>

            </div>
            <div className="row main">
                <div id="image" className="col-sm-1">
                    <img className="image" src={dp} width="30px" />
                </div>
                <div id="Client" className="col-md-2">
                Fionna Jackson
                </div>
                <div id="options" className="col-sm-1">
                3987
                </div>
                <div id="options" className="col-md-2">
                29/03/2014
                </div>
                <div id="options" className="col-md-2">
                Puerto Vallarta
                </div>
                <div id="options" className="col-sm-2">
                8°C
                </div>
                <div id="success" className="col-md-2">
                Received
                </div>

            </div>
            <div className="row main">
                <div id="image" className="col-sm-1">
                    <img className="image" src={dp} width="30px" />
                </div>
                <div id="Client" className="col-md-2">
                Megan Sanders
                </div>
                <div id="options" className="col-sm-1">
                420
                </div>
                <div id="options" className="col-md-2">
                01/08/1997
                </div>
                <div id="options" className="col-md-2">
                Sydney
                </div>
                <div id="options" className="col-sm-2">
                5°C
                </div>
                <div id="transit" className="col-md-2">
                InTransit
                </div>

            </div>
            <div className="row main">
                <div id="image" className="col-sm-1">
                    <img className="image" src={dp} width="30px" />
                </div>
                <div id="Client" className="col-md-2">
                Natasha
                </div>
                <div id="options" className="col-sm-1">
                4290
                </div>
                <div id="options" className="col-md-2">
                07/05/1996
                </div>
                <div id="options" className="col-md-2">
                Jerusalem
                </div>
                <div id="options" className="col-sm-2">
                9°C
                </div>
                <div id="hold" className="col-md-2">
                On Hold
                </div>

            </div>
            <div className="row main">
                <div id="image" className="col-sm-1">
                    <img className="image" src={dp} width="30px" />
                </div>
                <div id="Client" className="col-md-2">
                Tom Gomez
                </div>
                <div id="options" className="col-sm-1">
                1780
                </div>
                <div id="options" className="col-md-2">
                31/08/1958
                </div>
                <div id="options" className="col-md-2">
                Manila
                </div>
                <div id="options" className="col-sm-2">
                0°C
                </div>
                <div id="cancel" className="col-md-2">
                Cancelled
                </div>

            </div>
            <div className="row main">
                <div id="image" className="col-sm-1">
                    <img className="image" src={dp} width="30px" />
                </div>
                <div id="Client" className="col-md-2">
                Lori Stanley
                </div>
                <div id="options" className="col-sm-1">
                4990
                </div>
                <div id="options" className="col-md-2">
                14/02/1966
                </div>
                <div id="options" className="col-md-2">
                Hobart
                </div>
                <div id="options" className="col-sm-2">
                3°C
                </div>
                <div id="success" className="col-md-2">
                Received
                </div>

            </div>
            
           
        </div>
    );

}

export default ShipmentsSummary;