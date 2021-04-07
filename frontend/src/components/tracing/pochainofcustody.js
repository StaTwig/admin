import React,{useState}from 'react';
import './style.scss';
import traceDrop from '../../assets/icons/traceDrop.png';
import Down from '../../assets/icons/up.png';


const PoChainOfCustody = (props) => {
  const[op, setOp] = useState('');
  console.log('Shipments from poChainOfCustody');
  console.log(props.shipments);
  return (
    Object.keys(props.shipments).length === 0 || (!props.shipments)? <div className="row panel justify-content-between">N/A</div> :
    <div>
    {props.shipments.map((custody,index) =>(
      <div className="row mb-3">
        <div></div>
        <div className="big-dot bg-info ml-4"></div>
        <div className="col">
          <div className="color mb-3">{custody.poStatus}</div>
          <div className="col panel chain chainpanle">
            <div className="row justify-content-between">
              <div className="col">
                <div><strong>{`Purchase Order ${custody.poStatus}`}</strong></div>
              <div>By: <strong>{custody.supplier.organisation.name}</strong></div>
              </div>
              <div className="col">
                <div className="emp"></div>
                <div>Unicef Po ID : <strong>{custody.externalId}</strong></div>
                <div></div>
              </div>
              <div className="d-flex flex-column mr-5">
                <div>{custody.createdAt.split('T')[0].split('-')[2]+"/"+custody.createdAt.split('T')[0].split('-')[1]+"/"+custody.createdAt.split('T')[0].split('-')[0]}</div>
                <div></div>
                <div></div>
              </div>
            </div>
            {op === index?
         <div className="d-flex flex-row"><button className="btn btn-yellow dir mt-4" onClick={() => props.setOpenPurchase(true)}>View Purchase Order</button></div>
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


export default PoChainOfCustody;
