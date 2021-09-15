import React, { useEffect, useState } from "react";
import { getSerialNumbersByBatchNumber } from "../../actions/inventoryActions";
import "./style.scss";

const Ungrouped = (batch) => {
  const [unGroupBatchNumber, setUnGroupBatchNumber] = useState({});

  useEffect(() => {
    async function fetchData() {
      const result = await getSerialNumbersByBatchNumber(batch);
      setUnGroupBatchNumber(result);
    }
    fetchData();
  }, [batch]);
  return (
    <div className='table ungroup'>
      <div className='rTable'>
        <div className='rTableHeading'>
          <div className='rTableHead'>Product Name</div>
          <div className='rTableHead'>Manufacturer</div>
          <div className='rTableHead'>Batch Number</div>
          <div className='rTableHead'>Serial Number</div>
          <div className='rTableHead'>Date Added</div>
          <div className='rTableHead'>Mfg Date</div>
          <div className='rTableHead'>Exp Date</div>
          <div className='rTableHead'></div>
        </div>
        <div>
          {Object.keys(unGroupBatchNumber).length === 0 ? (
            <div className='row ml-5'>LOADING...</div>
          ) : (
            unGroupBatchNumber.map((inventory, index) => (
              <div className='rTableRow'>
                <div className='rTableCell'>
                  <div className='combine-data'>{inventory.productName}</div>
                </div>
                <div className='rTableCell'>{inventory.manufacturerName}</div>
                <div className='rTableCell'>{inventory.batchNumber}</div>
                <div className='rTableCell'>{inventory.serialNumber}</div>
                <div className='rTableCell'>
                  {inventory.createdAt.length > 11
                    ? inventory.createdAt.substring(8, 10) +
                      "/" +
                      inventory.createdAt.substring(5, 7) +
                      "/" +
                      inventory.createdAt.substring(0, 4)
                    : inventory.createdAt}
                </div>
                <div className='rTableCell'>
                  {inventory.manufacturingDate.length > 11
                    ? inventory.manufacturingDate.substring(5, 7) +
                      "/" +
                      inventory.manufacturingDate.substring(0, 4)
                    : inventory.manufacturingDate.split("/")[1] +
                      "/" +
                      inventory.manufacturingDate.split("/")[2]}
                </div>
                <div className='rTableCell '>
                  {inventory.expiryDate.length > 11
                    ? inventory.expiryDate.substring(5, 7) +
                      "/" +
                      inventory.expiryDate.substring(0, 4)
                    : inventory.expiryDate.split("/")[1] +
                      "/" +
                      inventory.expiryDate.split("/")[2]}
                </div>
                <div className='rTableCell'>
                  <button className='btn btn-outline-info fontSize200 enlarge'>
                    Track
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Ungrouped;
