import { React, Fragment, useState, useEffect } from "react";
import {
  getAlertModalData,
  updateAlertModalData,
} from "../../../actions/userActions";
import "./style.scss";
import CloseIcon from "../../../assets/icons/cross.svg";
import alertIcon from "../../../assets/icons/alert.png";
import ApproveIcon from "../../../assets/icons/approve.png";
import RejectIcon from "../../../assets/icons/reject.png";

const AlertModal = (props) => {
  const Transid = props.dataPass.transactionId;

  const [AlertTransport, setAlertTransport] = useState({});

  useEffect(() => {
    async function fetchApi(Transid) {
      const response = await getAlertModalData(Transid);
      setAlertTransport(response);
      return response;
    }
    fetchApi(Transid);
  }, []);

  async function UpfetchApi(Transid, ModalStatus) {
    const response = await updateAlertModalData(Transid, ModalStatus);
    return response;
  }

  return (
    <Fragment>
      <div className='modal-backdrop' />
      <div className='modal' tabIndex='-1' role='dialog'>
        <div className='modal-dialog modal-mg' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button
                type='button'
                className='close'
                onClick={() => props.change(false)}
              >
                <img src={CloseIcon} alt='Close' with='40' height='40' />
              </button>
              <div className='alert-img'>
                {AlertTransport.status === "PENDING" ? (
                  <img src={alertIcon} with='20' height='20' />
                ) : AlertTransport.status === "ACCEPTED" ? (
                  <img src={ApproveIcon} with='25' height='25' />
                ) : (
                  <img src={RejectIcon} with='25' height='25' />
                )}
              </div>
              <h5>
                {/* {AlertTransport?.from?.name} <span>(User D)</span> is trying to scan & Recieve
                shipment <span>(User B)</span> */}
                {/* {AlertTransport?.from?.name} is trying to scan & Recieve
                shipment */}
                {AlertTransport.status === "PENDING"
                  ? AlertTransport?.from?.name +
                    "  is trying to scan & Recieve shipment"
                  : AlertTransport.status === "ACCEPTED"
                  ? AlertTransport?.from?.name +
                    "  has been approved to Scan & Receive this Shipment"
                  : AlertTransport?.from?.name +
                    "  has been Rejected to Scan & Receive this Shipment"}
              </h5>
              <p className='dataTag'>
                shipment ID
                <span className='headingID'>{AlertTransport.shipmentId}</span>
              </p>
            </div>
            <div className='modal-body'>
              <div className='modal-grid'>
                <div className='modal-grid-item'>
                  <p className='headingData tableHead'>Shipping Detail</p>
                  <table>
                    <tbody>
                      {AlertTransport?.shipment?.name && (
                        <tr>
                          <td>
                            <p className='dataTag'>Username</p>
                          </td>
                          <td>
                            <p className='userData'></p>
                          </td>
                        </tr>
                      )}
                      <tr>
                        <td>
                          <p className='dataTag'>Delivery location</p>
                        </td>
                        <td>
                          <p className='userData'>
                            {AlertTransport?.shipment?.deliveryLocation}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className='dataTag'>Organisation name</p>
                        </td>
                        <td>
                          <p className='userData'>
                            {AlertTransport?.shipment?.organisationName}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className='modal-grid-item'>
                  <p className='headingData tableHead'>
                    Scanning Location Details
                  </p>
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <p className='dataTag'>Username</p>
                        </td>
                        <td>
                          <p className='userData'>
                            {AlertTransport?.from?.name}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className='dataTag'>Delivery location</p>
                        </td>
                        <td>
                          <p className='userData'>
                            {AlertTransport?.from?.deliveryLocation}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className='dataTag'>Organisation name</p>
                        </td>
                        <td>
                          <p className='userData'>
                            {AlertTransport?.from?.organisationName}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {AlertTransport.status === "PENDING" && (
              <div className='modal-action'>
                <button
                  className='Alert-btn Alert-btn-green'
                  onClick={() => {
                    UpfetchApi(Transid, "ACCEPTED");
                    props.change(false);
                  }}
                >
                  Approve
                </button>
                <button
                  className='Alert-btn Alert-btn-red'
                  onClick={() => {
                    UpfetchApi(Transid, "REJECTED");
                    props.change(false);
                  }}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AlertModal;
