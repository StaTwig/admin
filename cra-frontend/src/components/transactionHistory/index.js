import React from "react";
import BlueTrans from "../../assets/icons/bluetrans.png";
import "./style.scss";

const TransactionHistory = (props) => {
  return (
    <div className='transactionHistory'>
      <h1 className='breadcrumb'>Transaction History</h1>
      <h4>
        Payment Successful !{" "}
        <img
          src={BlueTrans}
          height='40'
          width='40'
          className='ml-3'
          alt='Transaction Sucess'
        />
      </h4>
      <div className='row mt-4'>
        <div className='col-sm-6'>
          <div className='card trans'>
            <div className='card-body mb-1'>
              <h6>Payment Details</h6>
              <div className='d-flex flex-row justify-content-between mt-4'>
                <div className='recive'>
                  Received <span className='recive'>2,50,000</span>
                </div>
                <div className='d-flex flex-column'>
                  <div className='dateinfo'>20/12/2021</div>
                  <div className='dateinfo'>11:14 AM</div>
                </div>
              </div>
              <div className='d-flex flex-row mt-1'>
                <ul className='ulheads'>
                  <li className='mb-1 text-secondary'>Payment Order ID</li>
                  <li className='mb-1 text-secondary'>Transaction ID</li>
                  <li className='mb-1 text-secondary'>Reference ID</li>
                  <li className='mb-1 text-secondary'>Transaction Status</li>
                  <li className='mb-1 text-secondary'>Payment Mode</li>
                  <li className='mb-1 text-secondary'>Signature</li>
                  <li className='mb-1 text-secondary'>Transaction Time</li>
                  <li className='mb-1 text-secondary'>From </li>
                  <li className='mb-1 text-secondary'>To</li>
                </ul>
                <ul>
                  <li className='mb-1'>order-8uy88yy8y</li>
                  <li className='mb-1'>snnscncsnnscncsnnscncsnnscnc</li>
                  <li className='mb-1'>8uy88yy8y</li>
                  <li className='mb-1'>Success</li>
                  <li className='mb-1'>Debit Card</li>
                  <li className='mb-1'>"snnscncsnnscncsnnscncsnnscnc"</li>
                  <li className='mb-1'>20/12/2030</li>
                  <li className='mb-1'>APollo Ltd</li>
                  <li className='mb-1'>Bharat Bio-Tech</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className='col-sm-6'>
          <div className='card trans'>
            <div className='card-body'>
              <h6>Purchase Order Details</h6>
              <div className='mt-4'>
                Purchase Order ID{" "}
                <span className='font-weight-bold ml-5'>PO12345</span>
              </div>
              <div className='d-flex flex-row mt-2'>
                <div className=' d-flex flex-row mr-4'>
                  <div className='d-flex flex-column mr-3'>
                    <div className='mb-2 heads'>Supplier Details : </div>
                    <div className='mb-2 text-secondary'>Organisation ID</div>
                    <div className='mb-2 text-secondary'>Organisation Name</div>
                  </div>
                  <div className='d-flex flex-column'>
                    <div className='mb-2 text-white'>k</div>
                    <div className='text-dark mb-2'>ORG123</div>
                    <div className='text-dark mb-2'>Bharat Biotech Ltd</div>
                  </div>
                </div>
                <div className=' d-flex flex-row'>
                  <div className='d-flex flex-column mr-3'>
                    <div className='mb-2 heads'>Customer Details : </div>
                    <div className='mb-2 text-secondary'>Organisation ID</div>
                    <div className='mb-2 text-secondary'>
                      Delivery Location ID
                    </div>
                    <div className='mb-2 text-secondary'>Delivery Location</div>
                  </div>
                  <div className='d-flex flex-column'>
                    <div className='mb-2 text-white'>k</div>
                    <div className='text-dark mb-2'>ORG123</div>
                    <div className='text-dark mb-2'>Bharat Biotech Ltd</div>
                    <div className='text-dark mb-2'>Bharat Biotech Ltd</div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <table className='table poModalTable'>
              <thead>
                <tr>
                  <th scope='col' />
                  <th scope='col' className='text-secondary'>
                    Product ID
                  </th>
                  <th scope='col ' className='text-secondary'>
                    Product Name
                  </th>
                  <th scope='col' className='text-secondary'>
                    Manufacturer
                  </th>
                  <th scope='col' className='text-secondary'>
                    Quantity
                  </th>
                  <th scope='col' className='text-secondary'>
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                <th scope='row'>
                  <div className='square-box' />
                </th>
                <td>MMR 123</td>
                <td>MMR</td>
                <td>Bharat</td>
                <td>80000</td>
                <td>2,50,000</td>
              </tbody>
            </table>
            <hr />
            <div className='d-flex justify-content-end mb-1'>
              <div className='d-flex flex-column mr-5'>
                <div className='amoun text-secondary'>Total Amount</div>
                <div className='text-info font-weight-bold money'>2,50,000</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
