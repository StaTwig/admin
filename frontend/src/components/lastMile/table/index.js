import React, { useState} from 'react';
import './style.scss'
const Table = props => {
  const [ batch, setBatch] = useState('');
  var orgTypeArray = [];
  return (
    <div className="producttable">
      <div className="rTable pt-2">
        <div className="overflow">
           {orgTypeArray.map((lastmile,index) => ( 
            <div>
              <div className="rTableRow pt-3 pb-3">
              <div className="rTableCell" >{lastmile}</div>
              <div className="rTableCell ml-2" >{""}</div>
              <div className="rTableCell ml-2">{""}</div>
              <div className="rTableCell ml-2">{""}</div>
              <div className="rTableCell ">{""}</div> 
              </div>
           
            </div>
            
            
          ))} 
        
        </div>
      </div>
    </div>
  );
};

export default Table;

/*   <button type="button" class="btn btn-outline-primary">SHOW MORE</button>*/
