import React from "react";
import Pagination from "@material-ui/lab/Pagination";
import user from "../../../assets/icons/user.svg";
import "./style.scss";
const Table = (props) => {
  const handlePageChange = (event, value) => {
    props.onPageChange(value);
  };
  console.log(props);
  var orgTypeArray = [...props.lastMile];
  return (
    <div className='producttable'>
      <div className='rTable pt-2'>
        <div>
          {orgTypeArray.map((lastmile, index) => (
            <div key={index} onClick={() => props.cardFill(lastmile)}>
              <div className='rTableRow pt-3 pb-3'>
                <img
                  src={user}
                  width='27'
                  height='18'
                  alt='User'
                  className='ml-4'
                />
                <div className='rTableCell'>
                  {lastmile.eol_info.first_name +
                    " " +
                    lastmile.eol_info.last_name}
                </div>
                <div className='rTableCell ml-5'>
                  {lastmile.eol_info.idProof.idNo}
                </div>
                <div className='rTableCell ml-5'>
                  {lastmile.eol_info.contact_number}
                </div>
                <div className='rTableCell ml-5'>
                  {lastmile.productAdministeredInfo[0].productName}
                </div>
                <div className='rTableCell'>
                  {lastmile.productAdministeredInfo[0].administeredData
                    .split("T")
                    .join(" ")
                    .substring(0, 19)}
                </div>
              </div>
            </div>
          ))}
          {orgTypeArray?.length > 0 && (
            <div className='d-flex flex-row-reverse'>
              <Pagination
                showFirstButton
                showLastButton
                color='primary'
                count={Math.ceil(props.count / 10)}
                onChange={handlePageChange}
              />
              <span className='mx-5 my-1 rounded text-dark'>
                Total Records {props.count}{" "}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Table;

/*   <button type="button" className="btn btn-outline-primary">SHOW MORE</button>*/
