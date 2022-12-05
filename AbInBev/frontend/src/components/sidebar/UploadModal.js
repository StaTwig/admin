import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import './style.scss';
import { Formik } from 'formik';
import { postUploadExcelData } from '../../actions/userActions';
import { useDispatch } from 'react-redux';

const UploadModal = (props) => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState('false');
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState('false');

  const uploadExcelData = async (data) => {
    let fileData = new FormData();
    fileData.append('excel', data.file);
    fileData.append('collectedDate', data.uploadDate);
    fileData.append('targetPercentage', data.percentage);
    const result = await dispatch(postUploadExcelData(fileData));
    if (result.status === 200) {
      setSuccessMessage(result.data.message);
      setShowSuccessMessage(true);
      setTimeout(() => {
        closeModal();
      }, 3000);
    } else if (result.status === 500) {
      setErrorMessage(result.data.message);
      setShowErrorMessage(true);
    } else {
      const err = result.data.data[0];
      setErrorMessage(err.msg);
      setShowErrorMessage(true);
    }
  };

  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  return (
    <div>
      <button
        type="button"
        className="btn btn-warning dahbtnupload"
        onClick={() => {
          setOpen((o) => !o);
          setSuccessMessage('');
          setErrorMessage('');
        }}
      >
        Upload Sales Data
      </button>
      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <Formik
          initialValues={{
            uploadDate: '',
            file: '',
            percentage: '',
          }}
          validate={(values) => {
            const errors = {};
            if (!values.uploadDate) {
              errors.uploadDate = 'Select upload date';
            }
            if (!values.file) {
              errors.file = 'Excel Required';
            }
            if (!values.percentage) {
              errors.percentage = 'Percentage Required';
            }

            return errors;
          }}
          onSubmit={async (values) => {
            const result = await uploadExcelData(values);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit} className="">
              <div className="col-md-12 uploadModal">
                <h1>Upload Sales Data</h1>
                <hr />
                <div className="col-md-12">
                  <div className="col-md-12">
                    <label
                      htmlFor="uploadDate"
                      className="filterSubHeading mt-3"
                    >
                      {' '}
                      Data Collected Date{' '}
                    </label>
                    <input
                      name="uploadDate"
                      className="filterSelect"
                      value={values.uploadDate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="date"
                    />
                    <div className="errorDisplay">
                      {errors.uploadDate && touched.uploadDate && (
                        <div className="error-msg text-danger mb-3">
                          {errors.uploadDate}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="file" className="filterSubHeading mt-3">
                      Upload Sales Data
                    </label>
                    <input
                      id="file"
                      className="filterInput"
                      name="file"
                      type="file"
                      onChange={(event) => {
                        setFieldValue('file', event.currentTarget.files[0]);
                      }}
                    />
                    <div className="errorDisplay">
                      {errors.file && touched.file && (
                        <div className="error-msg text-danger mb-3">
                          {errors.file}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <label
                      htmlFor="percentage"
                      className="filterSubHeading mt-3"
                    >
                      {' '}
                      Target Sales Percentage{' '}
                    </label>
                    <input
                      name="percentage"
                      className="filterSelect"
                      type="number"
                      maxLength="100"
                      value={values.percentage}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <div className="errorDisplay">
                      {errors.percentage && touched.percentage && (
                        <div className="error-msg text-danger mb-3">
                          {errors.percentage}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-12" style={{ display: 'flex' }}>
                    <button
                      type="button"
                      className="btn cancelButton mt-4"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                    <button className="btn uploadButton mt-4" type="submit">
                      Upload
                    </button>
                  </div>
                  <div className="col-md-12">
                    {showErrorMessage ? (
                      <h4 className="error-message text-center text-danger">
                        {errorMessage}
                      </h4>
                    ) : (
                      ''
                    )}

                    {showSuccessMessage ? (
                      <h4 className="success-message text-center text-success">
                        {successMessage}
                      </h4>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </Popup>
    </div>
  );
};

export default UploadModal;
