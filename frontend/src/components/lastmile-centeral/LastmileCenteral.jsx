import React, { useEffect, useState } from "react";
import { fetchAnalytics, getAllVaccinationDetails } from "../../actions/lastMileActions";
import AnalyticTiles from "../../shared/stats-tile/AnalyticTiles";
import Filterbar from "./filterbar/Filterbar";
import "./LastmileCenteral.css";
import CenteralStatsTable from "./stats-table/CenteralStatsTable";

export default function LastmileCenteral(props) {
  const [analytics, setAnalytics] = useState();
  const [filters, setFilters] = useState({});

  const [vaccinationList, setVaccinationList] = useState([]);

	useEffect(async () => {
		const result = await getAllVaccinationDetails(filters);
		if (result?.data?.success) {
      setVaccinationList(result.data.data.vaccinationDetails);
      setAnalytics(result.data.data.analytics);
		}
	}, [filters]);

  return (
    <div className="LastmileCenteral--Grid-layout">
      <div className="LastmileCenteral--table-wrapper">
        <div className="Lastmile--pageHeader">
          <h1
            style={{ paddingBottom: "10px" }}
            className="vl-heading-bdr black f-700 mi-reset"
          >
            LastMile
          </h1>
          {/* <button className="vl-btn vl-btn-sm vl-btn-primary">
            <span>
              <i class="fa-solid fa-file-export"></i>
            </span>{" "}
            Export
          </button> */}
        </div>
        <div className="LastmileCenteral--Stats-filters">
          <AnalyticTiles
            layout="2"
            variant="1"
            title="Total Number of Units Utilized"
            stat={analytics?.unitsUtilized ? analytics.unitsUtilized : 0}
            link="/units"
          />

          <AnalyticTiles
            layout="2"
            variant="2"
            title="No. of Beneficiaries Vaccinated so far"
            stat={analytics?.totalVaccinations ? analytics.totalVaccinations : 0}
            link="/units"
          />

          <AnalyticTiles
            layout="2"
            variant="3"
            title="No. of Beneficaries Vaccinated today"
            stat={analytics?.todaysVaccinations ? analytics.todaysVaccinations : 0}
            link="/units"
          />
        </div>
        <CenteralStatsTable vaccinationList={vaccinationList} />
      </div>
      <div className="LastmileCenteral--filter-wrapper">
        <Filterbar setFilters={setFilters} {...props} />
      </div>
    </div>
  );
}
