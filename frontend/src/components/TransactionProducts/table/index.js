import React from "react";
import { formatDate } from "../../../utils/dateHelper";
// import Ungrouped from '../ungrouped.js'
import "./style.scss";
const Table = (props) => {
	return (
		<div className="producttable">
			<div className="rTable">
				<div className="overflow">
					{props.inventories.map((inventory, index) => (
						<div>
							<div className="rTableRow">
								<div className="rTableCell">
									<div className="combine-data">
										{inventory.productDetails.name ? inventory.productDetails.name : ""}
									</div>
								</div>
								<div className="rTableCell ml-5">
									{inventory.productDetails.manufacturer
										? inventory.productDetails.manufacturer
										: ""}
								</div>
								<div className="rTableCell ml-5">
									{inventory.productDetails.batchNumber ? inventory.productDetails.batchNumber : ""}
								</div>
								<div className="rTableCell font-weight-bold ml-5">
									{inventory.quantity ? inventory.quantity : ""}
								</div>
								<div className="rTableCell ml-5">
									{inventory.productDetails.createdAt.length > 11
										? inventory.productDetails.createdAt.substring(8, 10) +
										  "/" +
										  inventory.productDetails.createdAt.substring(5, 7) +
										  "/" +
										  inventory.productDetails.createdAt.substring(0, 4)
										: inventory.productDetails.createdAt}
								</div>
								<div className="rTableCell ml-5">
									{inventory.mfgDate ? formatDate(inventory.mfgDate) : ""}
								</div>
								<div className="rTableCell">
									{inventory.expDate ? formatDate(inventory.expDate) : ""}
								</div>
								{/* <div className="rTableCell">{batch === inventory.batchNumber?<button className="btn btn-outline-info fontSize200 enlarge" 
              onClick = {()=>{
                setBatch('')
                  }}
            >SHOW LESS</button>:<button className="btn btn-outline-info fontSize200 enlarge" 
             onClick = {()=>{
              setBatch(inventory.batchNumber)
                }}>SHOW MORE</button>}
      
            </div> */}
							</div>
							{/* {batch === inventory.batchNumber && <Ungrouped batch = {batch} {...props}/> } */}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Table;

/*   <button type="button" className="btn btn-outline-primary">SHOW MORE</button>*/
