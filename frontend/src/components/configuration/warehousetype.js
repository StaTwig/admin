import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import "./style.scss";
import DropdownButton from "../../shared/dropdownButtonGroup";
import { Formik } from "formik";
import TextField from '@material-ui/core/TextField';

import AddressField from "../newaddress/addressfield";


const SentRequests = (props) => {
  const [typename, setTypeName] = useState("");
  const [orgID, setOrgID] = useState("Select a organisation ID");
  const { organisationsList, disableShadow, sendAffiliate, users } = props;
  return (
    <Formik
      initialValues={{
        typename: "",
        orgID: "",
      }}
      enableReinitialize
      validate={(values) => {
        const errors = {};
        if (!values.typename) {
          errors.typename = "Required";
        }
        if (!values.orgID) {
          errors.orgID = "Required";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(false);
        resetForm({
          values: {
            typename: "",
            orgID: "",
          },
          isSubmitting: true,
        });
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
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col ">
          
                      <div className="card ">
                        <div className="card-body">
                          <p><b><u>ADD NEW WAREHOUSE</u></b></p>
                          <AddressField
                                label="Organisation ID:"
                                refe="orgID2"
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                error={errors.orgID2}
                                touched={touched.orgID2}
                                value={values.orgID2}
                              />
                          <AddressField
                                label="Type of Organisation:"
                                refe="typename"
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                error={errors.typename}
                                touched={touched.typename}
                                value={values.typename}
                          />

                        <div className="d-grid">
                        <button type="submit" className="btn btn-default orangeBtn">
                        Submit
                        </button>
                         </div>    
                    </div>
                    </div>
             </div>

<br></br><br></br>
<div className="col">
  <div className="w-550">
            <div className="card">
              <div className="card-body">  <p><b><u>GET WAREHOUSE TYPE</u></b></p>
              <AddressField
                      label="Configuration ID:"
                      refe="cfgID"
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                  <div className="d-grid">
              <button type="submit" className="btn btn-default orangeBtn">
                GET
              </button>
              </div>
              </div>
              </div>
            </div>
            </div>
            </div>
            <br></br><br></br>
            <div className="row">
              <div className="col">
          
            <div className="card">
              <div className="card-body">
              <p><b><u>UPDATE WAREHOUSE TYPE</u></b></p>
              <AddressField
                      label="Organisation ID:"
                      refe="orgID"
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                  <AddressField
                      label="Type of Organisation:"
                      refe="type"
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                  <div className="d-grid">
              <button type="submit" className="btn btn-default orangeBtn">
                Update
              </button>
              </div>
              </div>
              </div></div>
              <div className="col">
              
            <div className="card">
              <div className="card-body">
              <table class="table ">
  <thead className="borderless">
    <tr className="borderless text-center">
      <th scope="col"></th>
      <th scope="col">ID</th>
      <th scope="col">Name of Warehouse</th>
    </tr>
  </thead>
  <tbody className="borderless">
    <tr>
      <th scope="row"></th>
      <td>ORG001</td>
      <td>HEAD OFFICE</td>
    </tr>
    </tbody>
    </table>
                </div>
                </div>
                </div>
                </div>
            

        </form>
      )}
    </Formik>
  );
};

export default SentRequests;




              
