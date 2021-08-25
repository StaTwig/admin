import React, { useEffect, useState } from "react";
import styles from "./FacilityActivation.module.css";
import { CheckboxItem, FacilityFilterTab, RadioItem } from "../FacilityFilterTab";
import { CONSTANTS, FACILITY_TYPE} from "../../utils/constants";
import DetailsCard from "../DetailsCard/DetailsCard";
import { Button, Modal } from "react-bootstrap";

function FacilityActivation({
                                facilities, setFacilities, selectedState, onStateSelected, districtList, selectedDistrict,
                                setSelectedDistrict, stateList, programs, selectedProgram, setSelectedProgram, facilityType, setFacilityType,
                                status, setStatus, fetchFacilities, resetFilter, updateFacilityProgramStatus, countryName, isLoading
                            }) {

    const [allChecked, setAllChecked] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [showCard, setShowCard] = useState(false);
    const [selectedRow, setSelectedRow] = useState([]);
    const oppositeStatus = status !== CONSTANTS.ACTIVE ? CONSTANTS.ACTIVE : CONSTANTS.IN_ACTIVE;

    useEffect(() => {
        resetFilter({status: CONSTANTS.ACTIVE});
        setShowCard(false)
    }, []);
    const handleChange = (value, setValue) => {
        setValue(value);
    };

    const handleAllCheck = (e) => {
        let list = [...facilities];
        setAllChecked(e.target.checked);
        list = list.map((ele) => ({
            ...ele,
            isChecked: e.target.checked,
        }));
        setFacilities(list);
    };

    const updateFacility = (index, key, value) => {
        const facilityData = [...facilities];
        facilityData[index][key] = value;
        setFacilities(facilityData);
    };

    const getFacilityStatusForProgram = (facility) => {
        if (facility.programs) {
            const program = facility.programs.find(obj => obj.name === selectedProgram);
            if (program) {
                return program.status;
            }
        }
        return CONSTANTS.IN_ACTIVE;
    };

    const getFacilityList = () => {
        return facilities.map((facility, index) => (
            <tr>
                <td>{facility["facilityCode"]}</td>
                <td role="button" onClick={() => {
                    setShowCard(!showCard);
                    setSelectedRow(facility)
                }}>{facility["facilityName"]}</td>
                <td>{FACILITY_TYPE[facility["category"]]}</td>
                <td>{getFacilityStatusForProgram(facility)}</td>
                <td style={{"textAlign":"right"}}>
                    <CheckboxItem
                        text={facility["id"]}
                        showText={false}
                        checked={facility.isChecked}
                        onSelect={() => {
                            updateFacility(index, "isChecked", !facility.isChecked)
                        }}
                    />

                </td>
            </tr>
        ));
    };
    const selectedFacilities = facilities.filter(
        (facility) => facility.isChecked
    );

    const updateSelectedFacilityStatus = () => {
        setAllChecked(false);
        updateFacilityProgramStatus(selectedFacilities, oppositeStatus);
    }

    const handleActiveClick = () => {
        if (selectedFacilities.length > 1) {
            setShowDialog(true);
        } else {
            updateSelectedFacilityStatus();
        }
    };

    const handleConfirmation = (e) => {
        switch (e.target.name) {
            case "ok":
                updateSelectedFacilityStatus();
            default:
                setShowDialog(false);
        }
    }

    const handleClose = () => {
        setShowDialog(false);
    }

    return (
        <div className={`row ${styles["container"]}`}>
            {!showCard && 
                <div className="col-sm-3">
                    <FacilityFilterTab
                        programs={programs}
                        selectedProgram={selectedProgram}
                        setSelectedProgram={setSelectedProgram}
                        countryName={countryName}
                        states={stateList}
                        setSelectedState={onStateSelected}
                        selectedState={selectedState}
                        districtList={districtList}
                        selectedDistrict={selectedDistrict}
                        setSelectedDistrict={setSelectedDistrict}
                        facilityType={facilityType}
                        setFacilityType={setFacilityType}
                    >
                        <div>
                            <span className={"filter-header"}>Status</span>
                            <div className="m-3">
                                <RadioItem
                                    text={CONSTANTS.ACTIVE}
                                    checked={status === CONSTANTS.ACTIVE}
                                    onSelect={(event) =>
                                        handleChange(event.target.name, setStatus)
                                    }
                                />
                                <RadioItem
                                    text={CONSTANTS.IN_ACTIVE}
                                    checked={status === CONSTANTS.IN_ACTIVE}
                                    onSelect={(event) =>
                                        handleChange(event.target.name, setStatus)
                                    }
                                />
                            </div>

                        </div>
                    </FacilityFilterTab>
                </div>
            }

            {!showCard && 
                <div className={`col-sm-6 ${styles["table"]} ${styles["pad-1rem"]}`}>
                    {isLoading ?
                        <div className='d-flex justify-content-center'>Please wait</div>
                        :
                        <div>
                            <p className={styles["highlight"]}>
                                {facilities.length === 0 ? "" : facilities.length} Facilit{facilities.length === 1 ? "y" : "ies"}
                            </p>
                            <table
                                className={`table table-hover ${styles["table-data"]}`}
                            >
                                <thead>
                                    <tr>
                                        <th>CODE</th>
                                        <th>NAME</th>
                                        <th>TYPE</th>
                                        <th>PROGRAM STATUS</th>
                                        <th style={{"textAlign":"right"}}>
                                            <CheckboxItem
                                                text={"checkAll"}
                                                checked={allChecked}
                                                onSelect={(e) => {
                                                    handleAllCheck(e);
                                                }}
                                                showText={false}
                                            />
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>{getFacilityList()}</tbody>
                            </table>
                        </div>
                    }
                </div>
            }
            <DetailsCard
                showCard={showCard}
                setShowCard={setShowCard}
                facility={selectedRow}
                fetchFacilities={fetchFacilities}
                status={status}
                updateFacilityProgramStatus={updateFacilityProgramStatus}
            />
            {!showCard && 
                <div className="col-sm-3 container">
                    <div className={`card ${styles["card-continer"]}`}>
                        {selectedProgram && <div className={`text-center ${styles["pad-1rem"]}`}>
                            <p>
                                Make {selectedFacilities.length} facilities {oppositeStatus.toLowerCase()} for the {selectedProgram}
                            </p>
                            <button 
                                onClick={handleActiveClick} 
                                className={styles["button"]}>
                                MAKE {oppositeStatus.toUpperCase()}
                            </button>
                            <Modal show={showDialog} onHide={handleClose} centered>
                                <Modal.Header  style={{"justifyContent": "center"}}>
                                    <Modal.Title>
                                        Making {selectedFacilities.length} facilities {oppositeStatus.toLowerCase()} for {selectedProgram}
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Footer>
                                    <Button variant="secondary" name="cancel" onClick={handleConfirmation}>CANCEL</Button>
                                    <Button variant="primary" name="ok" onClick={handleConfirmation}>OK</Button>
                                </Modal.Footer>
                            </Modal>
                        </div>}
                    </div>
                </div>
            }
        </div>
    );
}

export default FacilityActivation;
