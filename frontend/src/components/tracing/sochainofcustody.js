import React,{useState} from 'react';
import './style.scss';
import traceDrop from '../../assets/icons/traceDrop.png';
import Down from '../../assets/icons/up.png';


const SoChainOfCustody = (props) => {
  console.log('Shippment')
  console.log(props.shipments);
  const shipmentData = props.shipments[0];
    const[op, setOp] = useState('');
  return (
    Object.keys(props.shipments).length === 0 || (!props.shipments)? <div className="row panel justify-content-between">N/A</div> :
    <div>
    {props.shipments[0].shipmentUpdates.map((custody,index) =>(
      (index==0?
        <div className="row mb-3">
        <div></div>
        <div className="big-dot bg-info ml-4"></div>
        <div className="col">
          <div className="color mb-3">{custody.status}</div>
          <div className="col panel chain chainpanle">
            <div className="row justify-content-between">
              <div className="col">
                <div><strong>{`Shippment ${custody.status}`}</strong></div>
              <div className="row">
                <div className="col">
                <div className="mb-1">From:</div>  
                <div>Organisation Name : <strong>{shipmentData.supplier.org.name}</strong></div>
                <div className="mb-1">Organisation Location: <strong>{shipmentData.supplier.warehouse.postalAddress}</strong></div>
                </div>
              </div>       
              <div className="row">
                <div className="col">
                <div className="mb-1">To:</div>
                <div>Organisation Name : <strong>{shipmentData.receiver.org.name}</strong></div>
                <div className="mb-1">Organisation Location: <strong>{shipmentData.receiver.warehouse.postalAddress}</strong></div>
                </div>
              </div>                    
              </div>
              <div className="col">
                <div className="emp"></div>
                <div>Shipping Order ID : <strong>{shipmentData.id}</strong></div>
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
          <div className="color mb-3">{custody.status}</div>
          <div className="col panel chain chainpanle">
            <div className="row justify-content-between">
              <div className="col">
                <div className="mb-1"><strong>{`Shippment ${custody.status}`}</strong></div>
              <div className="mb-1">Warehouse ID : <strong>{shipmentData.supplier.warehouse.organisationId}</strong></div>
              <div className="mb-1">Warehouse Location: <strong>{shipmentData.supplier.warehouse.postalAddress}</strong></div>
              </div>
              <div className="col">
                <div className="emp"></div>
                <div>Shipping Order ID : <strong>{shipmentData.id}</strong></div>
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


export default SoChainOfCustody;
