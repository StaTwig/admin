import React, { useEffect, useState } from "react";
import "./Pendings.css";
import { getLocationApproval, modifyLocation } from "../../../../actions/organisationActions";
import { useDispatch } from "react-redux";
import { turnOff, turnOn } from "../../../../../actions/spinnerActions";

function PendingCard({ warehouse, refetch, setRefetch }) {
  const dispatch = useDispatch();

  const approveWarehouse = async () => {
    try {
      dispatch(turnOn());
      const data = {
        id: warehouse?.id,
        eid: warehouse?.employee.id,
        type: 1,
      };
      const result = await modifyLocation(data);
      if(result.status === 200) {
        console.log("Warehouse approved!");
        setRefetch(!refetch);
      } else {
        console.log("Warehouse approval failed!");
      }
      dispatch(turnOff());
    } catch(err) {
      dispatch(turnOff());
      console.log(err);
    }
  };
  
  const rejectWarehouse = async () => {
    try {
      dispatch(turnOn());
      const data = {
        id: warehouse?.id,
        eid: warehouse?.employee.id,
        type: 2,
      };
      const result = await modifyLocation(data);
      if(result.status === 200) {
        console.log("Warehouse rejected!");
        setRefetch(!refetch);
      } else {
        console.log("Warehouse rejection failed!");
      }
      dispatch(turnOff());
    } catch(err) {
      dispatch(turnOff());
      console.log(err);
    }
  }

	return (
		<div className="pendingCard-container">
			<div className="pendingcard-header">
				<div className="pc-name-space">
					<p className="vl-subheading f-500 vl-blue">{`${warehouse.employee?.firstName} ${warehouse.employee?.lastName}`}</p>
					<p className="vl-small f-400 vl-grey-xs">
						{new Date(warehouse.createdAt).toDateString()}
					</p>
				</div>
				<div className="organization-name">
					<p className="vl-body f-500 vl-black">{warehouse.title} </p>
				</div>
			</div>
			<div className="pendingcard-body">
				<div className="pc-body-grid">
					<p className="vl-body f-500 vl-black">Email:</p>
					<p className="vl-body f-500 vl-grey-sm">{warehouse.employee?.emailId}</p>
				</div>
				<div className="pc-body-two-space">
					<div className="pc-body-grid">
						<p className="vl-body f-500 vl-black">Region:</p>
						<p className="vl-body f-500 vl-grey-sm">{warehouse.warehouseAddress?.region}</p>
					</div>
					<div className="pc-body-grid">
						<p className="vl-body f-500 vl-black">Country:</p>
						<p className="vl-body f-500 vl-grey-sm">{warehouse.warehouseAddress?.country}</p>
					</div>
				</div>
				<div className="pc-body-col-space">
					<p className="vl-body f-500 vl-black">Organization Address :</p>
					<p className="vl-body f-500 vl-grey-sm">{`${warehouse.warehouseAddress?.firstLine}, ${warehouse.warehouseAddress?.city}, ${warehouse.warehouseAddress?.state}`}</p>
				</div>
			</div>
			<div className="pendingcard-action vl-flex vl-gap-sm">
				<button onClick={approveWarehouse} className="vl-btn vl-btn-sm vl-btn-accept">
					Accept
				</button>
				<button onClick={rejectWarehouse} className="vl-btn vl-btn-sm vl-btn-reject">Reject</button>
			</div>
		</div>
	);
}

export default function PendingWarehouses(props) {
	const { heading } = props;

  const [pendingWarehouses, setPendingWarehouses] = useState([]);
  const [refetch, setRefetch] = useState(false);

	useEffect(() => {
		//getRoles
		async function loadData() {
			try {
				const result = await getLocationApproval();
				result.data.sort(function (a, b) {
					return new Date(b.createdAt) < new Date(a.createdAt) ? -1 : 0;
				});
				console.log("GetLocationApproval", result.data);
				setPendingWarehouses(result.data);
			} catch (err) {
				console.log("Error from Location Appoval", err);
			}
		}
		loadData();
	}, [, refetch]);

	return (
		<section className="pending-container">
			<div className="pending-header">
				<h1 className="vl-subheading f-700 vl-black">{heading}</h1>
				<div className="number-label">{pendingWarehouses.length || 0}</div>
			</div>
			<div className="pending-body">
				{pendingWarehouses.map((warehouse) => (
					<PendingCard warehouse={warehouse} refetch={refetch} setRefetch={setRefetch} />
				))}
			</div>
		</section>
	);
}
