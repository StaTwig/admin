import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import AddressField from "./addressfield";
import { Formik } from "formik";
import FailedPopUp from "../../shared/PopUp/failedPopUp";
import SuccessPopUp from "../../shared/PopUp/successPopUp";
import {
  getAddressByLatLong,
  addAddress,
  getWareHouses,
} from "../../actions/organisationActions";
import Modal from "../../shared/modal";
import { turnOn, turnOff } from "../../actions/spinnerActions";
import { useSelector, useDispatch } from "react-redux";

const NewAddress = (props) => {
  // const editAddress = JSON.parse(props.match.params.address);

  let editAddress;
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showModals, setShowModals] = useState(false);
  const [addr, setAdd] = useState({});
  const [message, setMessage] = useState(
    "Location service is disabled. Enter address manually!!!"
  );
  const [address, setAddress] = useState({});
  const [pos, setPos] = useState({});
  const closeModal = () => setShowModal(false);
  const closeModals = () => setShowModals(false);

  const addArr = useSelector((state) => {
    return state.organisation.addresses;
  });

  useEffect(() => {
    dispatch(getWareHouses());
  }, []);

  const getGeoLocation = async () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setPos(position);
          dispatch(turnOn());
          const result = await getAddressByLatLong(position);
          dispatch(turnOff());
          if (result.status === 200) {
            await setAddress(result);
          } else {
            setShowModal(true);
          }
        },
        (error) => {
          setShowModal(true);
        }
      );
    } else {
      setShowModal(true);
    }
  };

  const saveAddress = async (data) => {
    data.postitions = pos;
    data.id = props.match.params.address
      ? JSON.parse(props.match.params.address)
      : "";
    data.organisationId = props.user.organisationId;
    dispatch(turnOn());
    const result = await addAddress(data);
    if (result.status == 200) {
      props.history.push(`/address`);
      setMessage(result.data.data.message);
    }
    dispatch(turnOff());
  };

  if (addArr && addr?.length == 0 && props.match.params.address) {
    editAddress = addArr.filter(
      (row) => row.id == JSON.parse(props.match.params.address)
    );
    if (editAddress?.length) setAdd(editAddress[0]);
  }

  useEffect(() => {
    if (addArr && addr?.length == 0 && props.match.params.address) {
      editAddress = addArr.filter(
        (row) => row.id == JSON.parse(props.match.params.address)
      );
      if (editAddress?.length) setAdd(editAddress[0]);
    }
  });

  return (
    <div className="address">
      {showModal && (
        <Modal
          close={closeModal}
          // size="modal-sm" //for other size's use `modal-lg, modal-md, modal-sm`
          buttonclassName="btn-orange"
        >
          <FailedPopUp onHide={closeModal} message={message} />
        </Modal>
      )}
      {showModals && (
        <Modal
          close={closeModals}
          // size="modal-sm" //for other size's use `modal-lg, modal-md, modal-sm`
          buttonclassName="btn-orange"
        >
          <SuccessPopUp onHide={closeModals} message={message} />
        </Modal>
      )}
      <h1 className="breadcrumb dash pl-2">ADD NEW ADDRESS</h1>
      <div className="d-flex row ">
        <div className="card w-100 rounded border border-white shadow bg-white m-4 p-3">
          <div className="card-body d-flex flex-row justify-content-between">
            <div className="w-50">
              <Formik
                enableReinitialize={true}
                initialValues={{
                  title: addr?.length ? addr?.title : "Warehouse",
                  // flatno: addr?.length ? addr[0] : "",
                  pincode: address?.PostalCode
                    ? address?.PostalCode
                    : addr?.length
                    ? addr?.warehouseAddress?.pinCode
                    : "",
                  area: address?.Subdistrict
                    ? address?.Subdistrict
                    : addr?.length
                    ? addr?.warehouseAddress?.firstLine
                    : "",
                  // landmark: addr?.length ? addr[2] : "",
                  town: address?.City
                    ? address?.City
                    : addr?.length
                    ? addr?.warehouseAddress?.city
                    : "",
                  state: address?.AdditionalData?.length
                    ? address?.AdditionalData?.filter(
                        (row) => row.key == "StateName"
                      )[0].value
                    : addr?.length
                    ? addr?.warehouseAddress?.state
                    : "",
                  country: address?.AdditionalData?.length
                    ? address?.AdditionalData?.filter(
                        (row) => row.key == "CountryName"
                      )[0].value
                    : addr?.length
                    ? addr?.warehouseAddress?.country
                    : "",
                }}
                validate={(values) => {
                  const errors = {};
                  if (!values.title) {
                    errors.title = "Required";
                  }
                  if (!values.pincode) {
                    errors.pincode = "Required";
                  }
                  // if (!values.flatno) {
                  //   errors.flatno = "Required";
                  // }
                  if (!values.area) {
                    errors.area = "Required";
                  }
                  // if (!values.landmark) {
                  //   errors.landmark = "Required";
                  // }
                  if (!values.town) {
                    errors.town = "Required";
                  }
                  if (!values.state) {
                    errors.state = "Required";
                  }
                  if (!values.country) {
                    errors.country = "Required";
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  setSubmitting(false);
                  saveAddress(values);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  setFieldValue,
                  dirty,
                }) => (
                  <form onSubmit={handleSubmit} className="mb-3">
                    <AddressField
                      error={errors.title}
                      touched={touched.title}
                      label="Address Title"
                      refe="title"
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      value={values.title}
                    />
                    {/* <AddressField
                      error={errors.flatno}
                      touched={touched.flatno}
                      label="Address line"
                      refe="flatno"
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      value={values.flatno}
                    /> */}
                    <AddressField
                      error={errors.area}
                      touched={touched.area}
                      label="Address line"
                      refe="area"
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      value={values.area}
                    />
                    {/* <AddressField
                      error={errors.landmark}
                      touched={touched.landmark}
                      label="Landmark"
                      refe="landmark"
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      value={values.landmark}
                    /> */}
                    <AddressField
                      error={errors.town}
                      touched={touched.town}
                      label="City/ Town"
                      refe="town"
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      value={values.town}
                    />
                    <AddressField
                      error={errors.state}
                      touched={touched.state}
                      label="State"
                      refe="state"
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      value={values.state}
                    />
                    <AddressField
                      error={errors.country}
                      touched={touched.country}
                      label="Country"
                      refe="country"
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      value={values.country}
                    />
                    <AddressField
                      error={errors.pincode}
                      touched={touched.pincode}
                      label="Pincode"
                      refe="pincode"
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      value={values.pincode}
                    />
                    <div className="pt-5">
                      <button type="submit" className="btn btn-warning ">
                        <i
                          className="fa fa-plus txt pr-2"
                          aria-hidden="true"
                        ></i>
                        <span className="txt">Add New Address</span>
                      </button>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
            <div className="w-50 ml-5 d-flex flex-row justify-content-between">
              <div className="pt-1 w-50 d-flex flex-row-reverse">
                <button
                  onClick={getGeoLocation}
                  type="button"
                  className="btn btn-primary btn-sm"
                >
                  <span className="txt">Use my current location</span>
                </button>
              </div>
              <div className="pl-1 w-75 pt-1">
                <p className="txtColor font-13">
                  This will auto populate/ auto fill every information that is
                  shown mandatory
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAddress;
