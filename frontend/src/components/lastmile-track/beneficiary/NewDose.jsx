import React from "react";
import { Select, MenuItem, TextField, Autocomplete } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { vaccinateIndividual } from "../../../actions/lastMileActions";
import { useTranslation } from "react-i18next";

export default function NewDose(props) {
  const { vaccineVialId, warehouseId, productId, batchNumber } = props;
  const { t, i18n } = useTranslation();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      gender: null,
      age: null,
    },
  });

  const newDose = async (values) => {
    try {
      const data = {
        vaccineVialId: vaccineVialId,
        warehouseId: warehouseId,
        productId: productId,
        batchNumber: batchNumber,
        ...values,
      };

      // Call vaccinate api
      const result = await vaccinateIndividual(data);
      if (result.data.success) {
        props.newVaccination(result.data.data);
      } else {
        throw new Error(result.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const options = ["MALE", "FEMALE", "OTHERS"];

  return (
    <section className="Beneficiary--Add-wrapper">
      <form onSubmit={handleSubmit(newDose)}>
        <div className="Beneficiary--Add-inner-wrapper">
          <h1 className="vl-subheading f-700 vl-grey-md">Personal Details</h1>
          <div className="Add-form-space">
            <Controller
              name="gender"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Autocomplete
                  fullWidth
                  options={options}
                  getOptionLabel={(option) => option || ""}
                  renderInput={(params) => (
                    <TextField {...params} label={t("gender")} />
                  )}
                  {...field}
                  onChange={(event, value) => {
                    field.onChange(value);
                  }}
                />
              )}
            />
            <Controller
              name="age"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  variant="outlined"
                  label={t("age")}
                  {...field}
                />
              )}
            />
          </div>
          <div className="Beneficiary--action">
            <button type="submit" className="vl-btn vl-btn-md vl-btn-primary">
              {t("save")}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
