import React, { useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  fetchAnalytics,
  getVaccinationsList,
  getVialsUtilised,
} from "../../actions/lastMileActions";
import AnalyticTiles from "../../shared/stats-tile/AnalyticTiles";
import Beneficiary from "./beneficiary/Beneficiary";
import "./LastmileTrack.css";
import ScanBatch from "./scan-batch/ScanBatch";
import TodayVaccinatedTable from "./stats-table/today-vaccinated/TodayVaccinatedTable";
import TotalVaccinatedTable from "./stats-table/total-vaccinated/TotalVaccinatedTable";
import UnitUsedTable from "./stats-table/units-used/UnitUsedTable";

export default function LastmileTrack(props) {
  const [Steps, setSteps] = useState(1);
  const [tableView, setTableView] = useState(false);
  const [tableComp, setTableComp] = useState(null);

  const [analytics, setAnalytics] = useState();
  const [unitsUtilized, setUnitsUtilized] = useState();
  const [totalVaccinations, setTotalVaccinations] = useState();
  const [todaysVaccinations, setTodaysVaccinations] = useState();
  const [batchDetails, setBatchDetails] = useState();

  const { t, i18n } = useTranslation();

  useEffect(async () => {
    // Fetch analytics
    const analytics = await fetchAnalytics();
    if (analytics?.data?.success) {
      setAnalytics(analytics.data.data);
    }

    const unitsUtilized = await getVialsUtilised();
    if (unitsUtilized?.data?.success) {
      setUnitsUtilized(unitsUtilized.data.data);
    }

    const vaccinationsList = await getVaccinationsList();
    if (vaccinationsList?.data?.success) {
      setTotalVaccinations(vaccinationsList.data.data.vaccinationsList);
      setTodaysVaccinations(vaccinationsList.data.data.todaysVaccinationsList);
    }
  }, []);

  const completeVaccination = async () => {
    setSteps(1);
    console.log("helllo i am running");
    const result = await fetchAnalytics();
    if (result?.data?.success) {
      setAnalytics(result.data.data);
    }
  };

  const handleAnalyticsClicked = (tableType) => {
    let table;
    switch (tableType) {
      case "unitsUtilized": {
        table = <UnitUsedTable t={t} unitsUtilized={unitsUtilized} />;
        break;
      }
      case "totalVaccinations": {
        table = (
          <TotalVaccinatedTable t={t} vaccinationsList={totalVaccinations} />
        );
        break;
      }
      case "todaysVaccinations": {
        table = (
          <TodayVaccinatedTable t={t} vaccinationsList={todaysVaccinations} />
        );
        break;
      }
    }

    setTableComp(table);
    setTableView(true);
  };

  return (
    <>
      <div className="Lastmile--mainPage-layout">
        <div className="Lastmile--pageHeader">
          <h1
            style={{ paddingBottom: "10px" }}
            className="vl-heading-bdr black f-700 mi-reset"
          >
            {t("lastmile")}
          </h1>
          {tableView && (
            <div className="back-link-button-space">
              <button
                className="back-action-btn"
                onClick={() => setTableView(false)}
              >
                <i className="fa-solid fa-arrow-left"></i>
                <span>{t("back_to_batch_details")}</span>
              </button>
            </div>
          )}
        </div>
        <div className="Lastmile--gridLayout-wrapper">
          {tableView ? (
            <div className="Lastmile--Interaction-space">{tableComp}</div>
          ) : (
            <div className="Lastmile--Interaction-space">
              {Steps === 1 ? (
                <ScanBatch
                  setBatchDetails={setBatchDetails}
                  setSteps={setSteps}
                  {...props}
                />
              ) : (
                <Beneficiary
                  batchDetails={batchDetails}
                  completeVaccination={completeVaccination}
                  {...props}
                />
              )}
            </div>
          )}
          <div className="Lastmile--Analytics-space">
            <AnalyticTiles
              layout="1"
              variant="1"
              title={t("total_units_utilized")}
              stat={analytics?.unitsUtilized ? analytics.unitsUtilized : 0}
              name="unitsUtilized"
              onClick={handleAnalyticsClicked}
            />
            <AnalyticTiles
              layout="1"
              variant="2"
              title={t("no_beneficiaries_vaccinated_so_far")}
              stat={
                analytics?.totalVaccinations ? analytics.totalVaccinations : 0
              }
              name="totalVaccinations"
              onClick={handleAnalyticsClicked}
            />
            <AnalyticTiles
              layout="1"
              variant="3"
              title={t("no_beneficiaries_vaccinated_today")}
              stat={
                analytics?.todaysVaccinations ? analytics.todaysVaccinations : 0
              }
              name="todaysVaccinations"
              onClick={handleAnalyticsClicked}
            />
          </div>
        </div>
      </div>
    </>
  );
}