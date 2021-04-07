import React,{useState} from 'react';
import './style.scss';
import traceDrop from '../../assets/icons/traceDrop.png';
import Down from '../../assets/icons/up.png';
import { useSelector } from "react-redux";

const ChainOfCustody = (props) => {
  console.log('Shippment')
  console.log(props.shipments);
  const shipmentData = props.shipments[0];
    const[op, setOp] = useState('');
 const profile = useSelector((state) => {
    return state.user;
  });

  return (
    Object.keys(props.shipments).length === 0 || (!props.shipments)? <div className="row panel justify-content-between">N/A</div> :
    <div>
    {props.shipments[0].shipmentUpdates.map((custody,index) =>(
      (index==0?
        <div className="row mb-3">
        <div></div>
        <div className="big-dot bg-info ml-4"></div>
        <div className="col">
          <div className="color mb-3">{custody.status === "CREATED"
                            ? "SHIPPED"
                            : "Shipped"}</div>
          <div className="col panel chain chainpanle">
            <div className="row justify-content-between">
              <div className="col">
                <div><strong>{`Shipment ${custody.status === "CREATED"
                            ? "Shipped"
                            : "SHIPPED"}`}</strong></div>
              <div className="row">
                <div className="col">
                <h7 className="mb-1">From</h7>
                <div className=" d-flex flex-row p-1">
                <span class="w-75  text-secondary" >Organisation Name</span> <span class="w-75">{shipmentData.supplier.org.name}</span></div>
                <div className=" d-flex flex-row p-1">
                <span class="w-75  text-secondary" >Organisation Location</span> <span class="w-75">{shipmentData.supplier.warehouse.postalAddress}</span></div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                <h7 className="mb-1">To</h7>
                <div className=" d-flex flex-row p-1">
                <span class="w-75  text-secondary" > Organisation Name </span>  <span class="w-75">{shipmentData.receiver.org.name}</span></div>
                <div className=" d-flex flex-row p-1">
                <span class="w-75  text-secondary" > Organisation Location</span> <span class="w-75">{shipmentData.receiver.warehouse.postalAddress}</span></div>
                </div>
              </div>
              </div>
              <div className="col">
                <div className="emp"></div>
                <div>Shipment ID : <strong>{shipmentData.id}</strong></div>
                <div></div>
              </div>
              <div className="d-flex flex-column mr-5">
                {/* <div>{custody.dateTime.split('T')[0].split('-')[2]+"/"+custody.dateTime.split('T')[0].split('-')[1]+"/"+custody.dateTime.split('T')[0].split('-')[0]}</div> */}
                <div>{custody.updatedOn.split(' ')[0]}</div>
                <div></div>
                <div></div>
              </div>
            </div>
            {op === index && index!==0?
         <div className="d-flex flex-row">
           <br></br>
           {/* <button className="btn btn-yellow dir mt-4" onClick={() => props.setOpenShipping(true)}>View Shipping Order</button> */}
           <div>Comment : <strong>{custody.updateComment}</strong></div>
          </div>
              : null}

         </div>

        </div>
      </div>
        :
      <div className="row mb-3">
        <div></div>
        <div className="big-dot bg-info ml-4"></div>
        <div className="col">
          <div className="color mb-3">{custody.status === "RECEIVED"
                            ? "DELIVERED"
                            : "UPDATED"}</div>
          <div className="col panel chain chainpanle">
            <div className="row justify-content-between">
              <div className="col">
                <div className="mb-1"><strong>{`Shipment ${custody.status === "RECEIVED"
                            ? "Delivered"
                            : "Updated"}`}</strong></div>
                <div className=" d-flex flex-row p-1">
                           <span class="w-75 text-secondary" > By{" "}</span>
                            <span class="w-75 " >{profile.firstName}{profile.lastName}</span>
                          </div>

                <div className=" d-flex flex-row p-1">
                <span class="w-75 text-secondary" >  Organisation ID</span><span class="w-75" >{shipmentData.supplier.warehouse.organisationId}</span></div>
                <div className=" d-flex flex-row p-1">
                <span class="w-75 text-secondary" >  Organisation Location</span><span class="w-75" >{shipmentData.supplier.warehouse.postalAddress}</span></div>
              </div>
              <div className="col">
                <div className="emp"></div>
                <div>Shipment ID : <strong>{shipmentData.id}</strong></div>
                <div></div>
              </div>
              <div className="d-flex flex-column mr-5">
                {/* <div>{custody.dateTime.split('T')[0].split('-')[2]+"/"+custody.dateTime.split('T')[0].split('-')[1]+"/"+custody.dateTime.split('T')[0].split('-')[0]}</div> */}
                <div>{custody.updatedOn.split(' ')[0]}</div>
                <div></div>
                <div></div>
              </div>
            </div>
            {op === index && index!==0?
         <div className="d-flex flex-row">
           <br></br>
           {/* <button className="btn btn-yellow dir mt-4" onClick={() => props.setOpenShipping(true)}>View Shipping Order</button> */}
           <h7>Comment </h7> <strong>{custody.updateComment}</strong></div>

              : null}
        { op === index && index!==0? <div className="arrow float-right" onClick={() => setOp('')}><img src={Down} alt="actions" height="7" width="12" /></div>
           :
           (index!==0 && <div className="arrow float-right"
             onClick={() => {
               setOp(index)}
           }>
               <img src={traceDrop} alt="actions" height="7" width="12"  /></div>)
           }

         </div>

        </div>
      </div>
        )
      )
    )}</div>
  )
}


export default ChainOfCustody;
