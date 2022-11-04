import React, { useState } from "react";
import AnalyticTiles from "../../shared/stats-tile/AnalyticTiles";
import Beneficiary from "./beneficiary/Beneficiary";
import "./LastmileTrack.css";
import ScanBatch from "./scan-batch/ScanBatch";
import TodayVaccinatedTable from "./stats-table/today-vaccinated/TodayVaccinatedTable";
import TotalVaccinatedTable from "./stats-table/total-vaccinated/TotalVaccinatedTable";
import UnitUsedTable from "./stats-table/units-used/UnitUsedTable";

export default function LastmileTrack() {
  const [Steps, setSteps] = useState(1);
  return (
    <>
      <div className="Lastmile--mainPage-layout">
        <div className="Lastmile--pageHeader">
          <h1
            style={{ paddingBottom: "10px" }}
            className="vl-heading-bdr black f-700 mi-reset"
          >
            LastMile
          </h1>
        </div>
        <div className="Lastmile--gridLayout-wrapper">
          {/* <UnitUsedTable /> */}
          {/* <TodayVaccinatedTable /> */}
          {/* <TotalVaccinatedTable /> */}
          <div className="Lastmile--Interaction-space">
            {Steps === 1 ? (
              <ScanBatch setSteps={setSteps} />
            ) : (
              <Beneficiary setSteps={setSteps} />
            )}
          </div>
          <div className="Lastmile--Analytics-space">
            <AnalyticTiles
              layout="1"
              variant="1"
              title="Total Number of Units Utilized"
              stat="320"
              link="/units"
            />

            <AnalyticTiles
              layout="1"
              variant="2"
              title="No. of Beneficiaries Vaccinated so far"
              stat="1220"
              link="/units"
            />

            <AnalyticTiles
              layout="1"
              variant="3"
              title="No. of Beneficaries Vaccinated today"
              stat="45"
              link="/units"
            />
          </div>
        </div>
      </div>
    </>
  );
}
