import React, { useState} from 'react';
import './style.scss';
import Pagination from '@material-ui/lab/Pagination';
const Table = props => {
  const [ batch, setBatch] = useState('');
  var orgTypeArray = [];
  const handlePageChange  = (event, value) => {
    props.onPageChange(value);
  };
  return (
    <div className="producttable">    
    <div className="table">
      <div className="rTable mt-3"> 
           {orgTypeArray.length == 0 && <div className="rTableRow pt-2 pb-2 justify-content-center text-muted shadow-none">No records found</div>}
           {orgTypeArray.map((lastmile,index) => ( 
            <div>
              <div className="rTableRow pt-3 pb-3">
              <div className="rTableCell" >{lastmile}</div>
              <div className="rTableCell ml-2" >{"Test"}</div>
              <div className="rTableCell ml-2">{"Test1"}</div>
              <div className="rTableCell ml-2">{"Test2"}</div>
              <div className="rTableCell ml-1">{"Test3"}</div> 
              </div>
           
            </div>  
          ))} 
          {orgTypeArray?.length > 0 && (
            <div className="d-flex flex-row-reverse">
            <Pagination showFirstButton showLastButton color="primary" count={Math.ceil(props.count/10)} onChange={handlePageChange} />
            <span className="mx-5 my-1 rounded text-primary">Total Records {props.count} </span>
          </div> 
          )}
        
        </div>
      </div>
      </div>

    
  );
};

export default Table;

/*   <button type="button" class="btn btn-outline-primary">SHOW MORE</button>*/
