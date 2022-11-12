import React, { useState } from "react";
import { useEffect } from "react";
import { fetchAnalytics } from "../../actions/lastMileActions";
import AnalyticTiles from "../../shared/stats-tile/AnalyticTiles";
import Beneficiary from "./beneficiary/Beneficiary";
import "./LastmileTrack.css";
import ScanBatch from "./scan-batch/ScanBatch";
import TodayVaccinatedTable from "./stats-table/today-vaccinated/TodayVaccinatedTable";
import TotalVaccinatedTable from "./stats-table/total-vaccinated/TotalVaccinatedTable";
import UnitUsedTable from "./stats-table/units-used/UnitUsedTable";

export default function LastmileTrack(props) {
	const [batchDetails, setBatchDetails] = useState();
	const [Steps, setSteps] = useState(1);
	const [analytics, setAnalytics] = useState();

	useEffect(async () => {
		// Fetch analytics
		const result = await fetchAnalytics();
		if (result?.data?.success) {
			setAnalytics(result.data.data);
		}
	}, []);

	const completeVaccination = () => {
		// Refetch analytics
	};

	return (
		<>
			<div className="Lastmile--mainPage-layout">
				<div className="Lastmile--pageHeader">
					<h1 style={{ paddingBottom: "10px" }} className="vl-heading-bdr black f-700 mi-reset">
						LastMile
					</h1>
				</div>
				<div className="Lastmile--gridLayout-wrapper">
					{/* <UnitUsedTable /> */}
					{/* <TodayVaccinatedTable /> */}
					{/* <TotalVaccinatedTable /> */}
					<div className="Lastmile--Interaction-space">
						{Steps === 1 ? (
							<ScanBatch setBatchDetails={setBatchDetails} setSteps={setSteps} {...props} />
						) : (
							<Beneficiary batchDetails={batchDetails} setSteps={setSteps} {...props} />
						)}
					</div>
					<div className="Lastmile--Analytics-space">
						<AnalyticTiles
							layout="1"
							variant="1"
							title="Total Number of Units Utilized"
							stat={analytics?.unitsUtilized ? analytics.unitsUtilized : 0}
							link="/lastMile-Centeral"
						/>
						<AnalyticTiles
							layout="1"
							variant="2"
							title="No. of Beneficiaries Vaccinated so far"
							stat={analytics?.totalVaccinations ? analytics.totalVaccinations : 0}
							link="/lastMile-Centeral"
						/>
						<AnalyticTiles
							layout="1"
							variant="3"
							title="No. of Beneficaries Vaccinated today"
							stat={analytics?.todaysVaccinations ? analytics.todaysVaccinations : 0}
							link="/lastMile-Centeral"
							link=""
						/>
					</div>
				</div>
			</div>
		</>
	);
}
