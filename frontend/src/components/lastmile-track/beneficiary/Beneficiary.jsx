import React from "react";
import { useState } from "react";
import "./Beneficiary.css";
import AddImage from "../../../assets/files/designs/add.jpg";
import { useEffect } from "react";
import NewDose from "./NewDose";
import { getVaccinationDetailsByVial } from "../../../actions/lastMileActions";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

function ResultCard({ age, gender, variant }) {
  const { t, i18n } = useTranslation();

  return (
    <div className={`Result-single-card result-variant-${variant}`}>
      <div className="more-action-btn">
        <i className="fa-solid fa-ellipsis-vertical"></i>
      </div>
      <div className="result-stats">
        <h1 className="vl-title f-700 vl-black">{t("age")}: {age}</h1>
        <h2 className="vl-subheading f-500 vl-black">{t("gender")} : {gender}</h2>
      </div>
    </div>
  );
}

export default function Beneficiary(props) {
  const { batchDetails } = props;
  const { t, i18n } = useTranslation();

  const [LayoutType, setLayoutType] = useState(1);

  const [vialId, setVialId] = useState();
  const [doses, setDoses] = useState([]);

  const userLocation = useSelector((store) => store.userLocation);

  useEffect(async () => {
    if (LayoutType === 1 && vialId) {
      const result = await getVaccinationDetailsByVial(vialId);
      if (result?.data?.success) {
        setDoses(result.data.data[0].doses);
      } else {
        console.log("Error in fetching dose list - ", result.data.message);
      }
    }
  }, [LayoutType]);

  const newVaccination = async (result) => {
    if (!vialId) {
      setVialId(result.vaccineVialId);
    }
    setLayoutType(1);
  };

  return (
    <div className="Beneficiary--container">
      <div className="Beneficiary--inner-wrapper">
        <div className="Beneficiary--header">
          <h1 className="vl-subtitle f-700 vl-black">
            {t("register_vaccination_details")}
          </h1>
          <button
            className="vl-btn vl-btn-sm vl-btn-primary"
            onClick={() => setLayoutType(2)}
          >
            <span>
              <i className="fa-solid fa-plus"></i>
            </span>{" "}
            {t("add_beneficiary_details")}
          </button>
        </div>
        <div className="Beneficiary--product">
          <div className="Beneficiary-product-card">
            <div className="Product-field-grid">
              <div className="field-header">
                <i className="fa-solid fa-vial-circle-check"></i>
                <p className="vl-body f-500 vl-blue">{t("product_name")} :</p>
              </div>
              <p className="vl-body f-500 vl-blue">
                {batchDetails.product.name}
              </p>
            </div>
            <div className="Product-field-grid">
              <div className="field-header">
                <i className="fa-solid fa-building"></i>
                <p className="vl-body f-500 vl-blue">{t("manufacturer_name")} :</p>
              </div>
              <p className="vl-body f-500 vl-blue">
                {batchDetails.product.manufacturer}
              </p>
            </div>
            <div className="batch-number">
              <p className="vl-note batch-number-label f-500">
                {t("batchNumber")} : {batchDetails?.batchNumber}
              </p>
            </div>
          </div>
        </div>
        <div className="Beneficiary--body">
          {LayoutType === 1 ? (
            doses.length === 0 ? (
              <section className="Beneficiary--Empty-wrapper">
                <div className="Beneficiary--Image-space">
                  <img src={AddImage} alt="ScanImage" />
                </div>
                <h1 className="vl-note f-500 vl-black">
                  {t("vaccinated_list_empty_click_add")}
                </h1>
              </section>
            ) : (
              <section className="Beneficiary--Result-wrapper">
                <div className="Beneficiary--Result-inner-wrapper">
                  <div className="Result-header">
                    <div className="Result-title-space">
                      <h1 className="vl-subheading f-700 vl-grey-md">
                        {t("vaccinated_overview")}
                      </h1>
                      <p className="vl-body card-number-label f-700">
                        {doses?.length ? doses.length : 0}
                      </p>
                    </div>
                    <button
                      className="vl-btn vl-btn-sm vl-btn-primary"
                      onClick={props.completeVaccination}
                    >
                      {t("complete")}
                    </button>
                  </div>
                  <div className="Result-body">
                    {doses.map((dose, index) => (
                      <ResultCard
                        variant={index}
                        age={dose.age}
                        gender={dose.gender}
                      />
                    ))}
                  </div>
                </div>
              </section>
            )
          ) : null}

          {LayoutType === 2 && (
            <NewDose
              vaccineVialId={vialId}
              warehouseId={
                userLocation?.id ? userLocation.id : props.user.warehouseId[0]
              }
              productId={batchDetails.product.id}
              batchNumber={batchDetails?.batchNumber}
              newVaccination={newVaccination}
            />
          )}
        </div>
      </div>
    </div>
  );
}
