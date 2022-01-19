import React, { useState } from "react";
import { Formik } from "formik";
import AddressField from "./addressfield";
import FailedPopUp from "../../shared/PopUp/failedPopUp";
import Modal from "../../shared/modal";
import { useDispatch } from "react-redux";
import DropdownButton from "../../shared/dropdownButtonGroup";

const OrganisationPopUp = (props) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [orgType, setOrgType] = useState("Organisation type");
  const [message, setMessage] = useState(
    "Location service is disabled. Enter address manually!!!"
  );
  const required = t('Required');
  const [address, setAddress] = useState({});
  const [pos, setPos] = useState({});
  const closeModal = () => setShowModal(false);
  const orgTypeArr = [
    { id: "SUPPLIER", name: "Supplier" },
    { id: "CUSTOMER", name: "Customer" },
    { id: "CUSTOMER_SUPPLIER", name: "Both" },
    { id: "CENTRAL_AUTHORITY", name: "Central authority" },
  ];

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

  return (
    <div className="p-2">
      {showModal && (
        <Modal
          close={closeModal}
          // size="modal-sm" //for other size's use `modal-lg, modal-md, modal-sm`
          buttonclassName="btn-orange"
        >
          <FailedPopUp onHide={closeModal} message={message} />
        </Modal>
      )}
      <div className="card w-100 rounded border border-white bg-white ">
        <div className="card-body flex-column d-flex">
          <div className="flex-row text-muted justify-content-between">
            <Formik
              enableReinitialize={true}
              initialValues={{
                type: "",
                line1: address?.Subdistrict ? address?.Subdistrict : "",
                pincode: address?.PostalCode,
                city: address?.City ? address?.City : "",
                state: address?.AdditionalData?.length
                  ? address?.AdditionalData?.filter(
                      (row) => row.key == "StateName"
                    )[0].value
                  : "",
                country: address?.AdditionalData?.length
                  ? address?.AdditionalData?.filter(
                      (row) => row.key == "CountryName"
                    )[0].value
                  : "",
              }}
              validate={(values) => {
                const errors = {};
                if (!values.type) {
                  errors.type = t('Required');
                }
                if (!values.pincode) {
                  errors.pincode = t('Required');
                }
                if (!values.line1) {
                  errors.line1 = t('Required');
                }
                if (!values.city) {
                  errors.city = t('Required');
                }
                if (!values.state) {
                  errors.state = t('Required');
                }
                if (!values.country) {
                  errors.country = t('Required');
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                props.onSignup(values);
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
                    error={errors.orgName}
                    touched={touched.orgName}
                    label="Organisation Name"
                    refe="orgName"
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    value={values.orgName}
                  />
                  <div className="form-group row">
                    <label
                      htmlFor="type"
                      className="col-sm-5 txtColor col-form-label"
                    >
                      Organisation type *
                    </label>
                    <div className="col-sm-7">
                      <DropdownButton
                        groups={orgTypeArr}
                        onSelect={(data) => {
                          setOrgType(data.name);
                          setFieldValue("type", data.id);
                        }}
                        name={orgType}
                      />
                    </div>
                    {errors.type && touched.type && (
                      <span className="error-msg text-danger">
                        {errors.type}
                      </span>
                    )}
                  </div>
                  <AddressField
                    error={errors.pincode}
                    touched={touched.pincode}
                    label="Pincode"
                    refe="pincode"
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    value={values.pincode}
                  />
                  <AddressField
                    error={errors.line1}
                    touched={touched.line1}
                    label="Address Line"
                    refe="line1"
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    value={values.line1}
                  />
                  <AddressField
                    error={errors.city}
                    touched={touched.city}
                    label="Town/ City"
                    refe="city"
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    value={values.city}
                  />
                  <AddressField
                    error={errors.state}
                    touched={touched.state}
                    label="State/ Province/ Region"
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
                  <div className="pt-5 d-flex flex-row-reverse">
                    <button type="submit" className="btn btn-primary ">
                      ADD
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganisationPopUp;
