import { MenuItem, Select } from "@mui/material";
import React from "react";
import Graph from "./Graphs/Graph";

export default function NetworkGraph({ onClose, graph }) {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div className="network-modal-popup-container">
      <div className="nt-modal-header">
        <div className="modal-heading-space">
          <h1 className="mi-body-lg mi-reset">Paracetamol</h1>
          <p className="mi-body-md mi-reset">( Vaccine )</p>
        </div>
        <div className="modal-closing-space" onClick={onClose}>
          <i class="fa-solid fa-xmark"></i>
        </div>
      </div>
      <div className="nt-modal-body center-placement">
        <div className="nt-graph-container">
          <Graph graph={graph} />
        </div>
      </div>
      <div className="nt-modal-actions">
        <div className="modal-heading-space">
          <select name="" id="" className="date-select-ui">
            <option value="June">June</option>
            <option value="June">July</option>
            <option value="June">August</option>
          </select>
        </div>
        <button className="nt-btn nt-btn-sm nt-btn-blue" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
