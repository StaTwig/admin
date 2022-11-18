import React from "react";
import Graph from "./Graphs/Graph";

export default function NetworkGraph({ onClose, graph, data, name, cat }) {
  const [age, setAge] = React.useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div className='network-modal-popup-container'>
      <div className='nt-modal-header'>
        <div className='modal-heading-space'>
          <h1 className='mi-body-lg mi-reset'>{name || ''}</h1>
          <p className='mi-body-md mi-reset'>( {cat || ''} )</p>
        </div>
        <div className='modal-closing-space' onClick={onClose}>
          <i className='fa-solid fa-xmark'></i>
        </div>
      </div>
      <div className='nt-modal-body center-placement'>
        <div className='nt-graph-container'>
          <Graph graph={graph} data={data} />
        </div>
      </div>
      <div className='nt-modal-actions'>
        {/* <div className='modal-heading-space'>
          <select name='' id='' className='date-select-ui'>
            <option value='July'>July</option>
            <option value='August'>August</option>
          </select>
        </div> */}
        <button className='nt-btn nt-btn-sm nt-btn-blue' onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
