import React,{useState} from 'react';
import './style.scss';
import traceDrop from '../../assets/icons/traceDrop.png';
import Down from '../../assets/icons/up.png';


const SoChainOfCustody = (props) => {
    const[op, setOp] = useState('');
  return (
    Object.keys(props.shipments).length === 0 || (!props.shipments.soChainOfCustody)? <div className="row panel justify-content-between">N/A</div> :
    <div>
    {props.shipments.soChainOfCustody.map((custody,index) =>(
      <div className="row mb-3">
        <div></div>
        <div className="big-dot bg-info ml-4"></div>
        <div className="col">
          <div className="color mb-3">{custody.status}</div>
          <div className="col panel chain chainpanle">
            <div className="row justify-content-between">
              <div className="col">
                <div><strong>{`Shipping Order ${custody.status}`}</strong></div>
              <div>Warehouse ID : <strong>{custody.warehouseId}</strong></div>
              <div>Warehouse Location: <strong>{custody.warehouseLocation}</strong></div>
              </div>
              <div className="col">
                <div className="emp"></div>
                <div>Shipping Order ID : <strong>{custody.shippingOrderId}</strong></div>
                <div></div>
              </div>
              <div className="d-flex flex-column mr-5">
                <div>{custody.dateTime.split('T')[0].split('-')[2]+"/"+custody.dateTime.split('T')[0].split('-')[1]+"/"+custody.dateTime.split('T')[0].split('-')[0]}</div>
                <div></div>
                <div></div>
              </div>
            </div>
            {op === index?
         <div className="d-flex flex-row"><button className="btn btn-yellow dir mt-4" onClick={() => props.setOpenShipping(true)}>View Shipping Order</button></div>
              : null}
        { op === index ? <div className="arrow float-right" onClick={() => setOp('')}><img src={Down} alt="actions" height="7" width="12" /></div>
           :
           <div className="arrow float-right" 
             onClick={() => {
               setOp(index)}
           }>
               <img src={traceDrop} alt="actions" height="7" width="12"  /></div>
           }
         
         </div>

        </div>
      </div>
    ))}</div>
  )
         
}


export default SoChainOfCustody;
