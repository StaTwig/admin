import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './styles.scss';
import { addPOsFromExcel,setReviewPos } from '../../../actions/poActions';
import { turnOn, turnOff } from '../../../actions/spinnerActions';
import uploadBlue from '../../../assets/icons/UploadBlue.svg';
import Modal from '../../../shared/modal';
import SuccessOrderPopUp from './SuccessOrder/SuccessOrder';
import FailPopup from "../../../shared/PopUp/failedPopUp";


const ExcelPopUp = props => {
  const [excel, setExcel] = useState('');
  const dispatch = useDispatch();
  const [openSuccesfulOrder, setopenSuccesfulOrder] = useState(false);
  const [openFailedPopup,setopenFailedPop] = useState(false);
  const [ modalProps, setModalProps ] = useState({});

  const setExcelFile = evt => {
    setExcel(evt.target.files[0]);
  };

  const uploadExcel = async () => {
    let formData = new FormData();
    formData.append('excel', excel);
    dispatch(turnOn());
    const result = await addPOsFromExcel(formData);
    console.log(result);
    if (result && result.status === 200) {
      console.log('success add PO');
      // dispatch(setReviewPos(result.data.data));
      setopenSuccesfulOrder(true);
      setModalProps({
    message: 'Created Successfully!',
    OrderLength: result.data.data.length,
    type: 'Success'
  })
    }
    else {
      setopenFailedPop(true);
 }
    dispatch(turnOff());
  };

  const closeModal = () => {
    setopenSuccesfulOrder(false);
    props.history.push("/orders");
  };
  const closeModalFailedPopUp = () => {
    setopenFailedPop(false);
    props.history.push("/neworder");
  };
  return (
    <div className="excelpopup col">
      <div className="d-flex flex-column upload mb-5 ml-5">
        <img
          src={uploadBlue}
          name="photo"
          width="50"
          height="50"
          className="mt-2"
        />
        <div>"Drag and drop" your Excel file here</div>
        <div>or</div>
        <input type="file" className="mb-3 excelSpace" onChange={setExcelFile} />
      </div>
      <div className="row justify-content-between">
        <div />
        <div className="row">
          <button
            className="btn-outline-primary btn mr-3"
            onClick={props.onHide}
          >
            CANCEL
          </button>
          <button className="btn-primary btn mr-4" onClick={uploadExcel}>
            IMPORT
          </button>
          {openSuccesfulOrder && (
                <Modal
                  close={() => closeModal()}
                  size="modal-sm" //for other size's use `modal-lg, modal-md, modal-sm`
                >
                  <SuccessOrderPopUp
                     onHide={closeModal}// onHide={closeModal} //FailurePopUp
                    {...modalProps}
                />
                </Modal>
              )}
              {openFailedPopup && (
                <Modal
                  close={() => closeModalFailedPopUp()}
                  size="modal-sm"
                  > 
                  <FailPopup
                    onHide={closeModalFailedPopUp}
                  />
                </Modal>
              )}

        </div>
      </div>
    </div>
  );
};

export default ExcelPopUp;
