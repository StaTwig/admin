import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  exportVaccinationList,
  fetchAnalytics,
  getAllVaccinationDetails,
} from "../../actions/lastMileActions";
import AnalyticTiles from "../../shared/stats-tile/AnalyticTiles";
import Filterbar from "./filterbar/Filterbar";
import "./LastmileCenteral.css";
import CenteralStatsTable from "./stats-table/CenteralStatsTable";

let useClickOutside = (handler) => {
  let domNode = useRef();

  useEffect(() => {
    let maybeHandler = (event) => {
      if (!domNode.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });

  return domNode;
};

export default function LastmileCenteral(props) {
  const [analytics, setAnalytics] = useState();
  const [filters, setFilters] = useState({});
  const { t } = useTranslation();

  const [vaccinationList, setVaccinationList] = useState([]);
  const [ButtonOpen, setButtonOpen] = useState(false);

  let domNode = useClickOutside(() => {
    setButtonOpen(false);
  });

  useEffect(async () => {
    const result = await getAllVaccinationDetails(filters);
    if (result?.data?.success) {
      setVaccinationList(result.data.data.vaccinationDetails);
      setAnalytics(result.data.data.analytics);
    }
  }, [filters]);

  const exportVaccinationReport = async (type) => {
    let data = filters;
    data.reportType = type ? type : "excel";

    const result = await exportVaccinationList(data);
    console.log(result);
    if (result?.data && result?.status === 200) {
      console.log("Report ready");
      const downloadUrl = window.URL.createObjectURL(new Blob([result.data]));
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute(
        "download",
        `vaccinationReport.${type === "excel" ? "xlsx" : "pdf"}`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  };

  return (
    <div className="LastmileCenteral--Grid-layout">
      <div className="LastmileCenteral--table-wrapper">
        <div className="Lastmile--pageHeader">
          <h1
            style={{ paddingBottom: "10px" }}
            className="vl-heading-bdr black f-700 mi-reset"
          >
            {t("lastmile")}
          </h1>
          <div className="export-collapse-btn" ref={domNode}>
            <button
              onClick={() => setButtonOpen(!ButtonOpen)}
              className="vl-btn vl-btn-sm vl-btn-primary"
            >
              <span>
                <i className="fa-solid fa-file-export"></i>
              </span>
              {t("export")}
            </button>
            <div className={`export-button-dropdown ${ButtonOpen && "active"}`}>
              <div
                className="export-btn-dropdown-card"
                onClick={() => exportVaccinationReport("excel")}
              >
                <i className="fa-solid fa-file-csv vl-excel"></i>
                <p className="vl-note f-500">
                  {t("export")} {t("as")} Excel
                </p>
              </div>
              <div
                className="export-btn-dropdown-card"
                onClick={() => exportVaccinationReport("pdf")}
              >
                <i className="fa-solid fa-file-pdf vl-pdf"></i>
                <p className="vl-note f-500">
                  {t("export")} {t("as")} PDF
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="LastmileCenteral--Stats-filters">
          <AnalyticTiles
            layout="2"
            variant="1"
            title={t("total_units_utilized")}
            stat={analytics?.unitsUtilized ? analytics.unitsUtilized : 0}
            link="/units"
          />

          <AnalyticTiles
            layout="2"
            variant="2"
            title={t("no_beneficiaries_vaccinated_so_far")}
            stat={
              analytics?.totalVaccinations ? analytics.totalVaccinations : 0
            }
            link="/units"
          />

          <AnalyticTiles
            layout="2"
            variant="3"
            title={t("no_beneficiaries_vaccinated_today")}
            stat={
              analytics?.todaysVaccinations ? analytics.todaysVaccinations : 0
            }
            link="/units"
          />
        </div>
        <CenteralStatsTable t={t} vaccinationList={vaccinationList} />
      </div>
      <div className="LastmileCenteral--filter-wrapper">
        <Filterbar t={t} setFilters={setFilters} {...props} />
      </div>
    </div>
  );
}
