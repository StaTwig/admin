import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { COUNTRY_CODE } from "../../../constants/countryCode";
import PhoneInput from "react-phone-input-2";

export default function ApproveUser(props) {
  const { data, addresses, onSuccess, defaultRoles, handleClose, t } = props;

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      emailId: data?.emailId,
      phoneNumber: data?.phoneNumber,
      role: "",
      warehouse: "",
    },
  });

  const approveUser = (values) => {
    const reqData = {
      id: data.id,
      role: values.role,
      warehouse: [values.warehouse.id],
      phoneNumber: values.phoneNumber,
    };

    onSuccess(reqData);
  };

  const options = [
    { label: "1" },
    { label: "2" },
    { label: "3" },
    { label: "4" },
  ];
  return (
    <div className="addOrganization-container">
      <form onSubmit={handleSubmit(approveUser)}>
        <div className="addorganization-header">
          <p className="vl-subheading f-500 vl-blue">{t("assign_header")}</p>
          <i className="fa-solid fa-xmark" onClick={handleClose}></i>
        </div>
        <div className="addorganization-body">
          <div className="input-set">
            <p className="vl-body f-500 vl-black">{t("user_details")}</p>
            <div className="input-two-column-space">
              <Controller
                name="emailId"
                control={control}
                rules={{ required: data?.phoneNumber ? false : true }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    variant="outlined"
                    label={t("email")}
                    {...field}
                    inputProps={{ style: { textAlign: "left" } }}
                    error={Boolean(errors.emailId)}
                    helperText={errors.emailId && "Email ID is required!"}
                    disabled={data?.emailId ? true : false}
                  />
                )}
              />
              <Controller
                name="phone"
                control={control}
                rules={{ required: data?.emailId ? false : true }}
                render={({ field }) => (
                  <PhoneInput
                    international
                    countryCallingCodeEditable={false}
                    defaultCountry={COUNTRY_CODE}
                    className="vl-custom-phone-input-2"
                    {...field}
                    maxLength={15}
                    style={{
                      borderColor: Boolean(errors.phone) ? "#da323c" : "",
                    }}
                    disabled
                  />
                )}
              />
              {errors.phone?.type === "custom" ? (
                <span className="error-msg text-dangerS">
                  {errors.phone?.message}
                </span>
              ) : null}
            </div>
          </div>
          <div className="input-set">
            <p className="vl-body f-500 vl-black">{t("assign_here")}</p>
            <div className="input-two-column-space">
              <Controller
                name="role"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Autocomplete
                    fullWidth
                    id="combo-box-demo"
                    options={defaultRoles}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={t("assign_role")}
                        error={Boolean(errors.role)}
                        helperText={errors.role && "Role is required!"}
                      />
                    )}
                    {...field}
                    onChange={(event, value) => {
                      field.onChange(value);
                    }}
                  />
                )}
              />
              <Controller
                name="warehouse"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Autocomplete
                    fullWidth
                    id="combo-box-demo"
                    options={addresses}
                    getOptionLabel={(option) =>
                      option.title ? option.title : ""
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={t("assign_warehouse")}
                        error={Boolean(errors.warehouse)}
                        helperText={
                          errors.warehouse && "Warehouse is required!"
                        }
                      />
                    )}
                    {...field}
                    onChange={(event, value) => {
                      field.onChange(value);
                    }}
                  />
                )}
              />
            </div>
          </div>
        </div>

        <div className="addorganization-actions">
          <button type="submit" className="vl-btn vl-btn-sm vl-btn-primary">
            {t("approve_user")}
          </button>
        </div>
      </form>
    </div>
  );
}
