import React, {useEffect, useState} from "react";
import "./VaccinatorDetails.css"
import { equals, isEmpty, reject} from "ramda";
import searchImg from "../../../assets/img/search.svg";
import {useAxios} from "../../../utils/useAxios";
import check from "../../../assets/img/check.png";
import DropDown from "../../DropDown/DropDown";
import {API_URL, CONSTANTS} from "../../../utils/constants";
import withStyles from "@material-ui/core/styles/withStyles";
import Switch from "@material-ui/core/Switch/Switch";
import SearchVaccinatorResultsView from "../SearchVaccinatorResults/SearchVaccinatorResultsView";
import {useSelector} from "react-redux";
import {maskPersonalDetails} from "../../../utils/maskPersonalDetails";
import InputMask from "../../InputMask/InputMask";


export default function VaccinatorDetails({
      selectedVaccinator, setEnableVaccinatorDetailView, onSelectVaccinatorBasedOnCode, facilityCode
}) {

    const [hasVaccinatorSelected, setHasVaccinatorSelected] = useState(false);
    const [vaccinator, setVaccinator] = useState({});
    const [savedSuccessfully, setSavedSuccessfully] = useState(false);
    const [updatedVaccinatorFields, setUpdatedVaccinatorFields] = useState({});
    const [selectedProgram, setSelectedProgram] = useState({});
    const [programs, setPrograms] = useState([]);
    const [searchVaccinatorName, setSearchVaccinatorName] = useState('');
    const [searchVaccinatorResults, setSearchVaccinatorResults] = useState([]);
    const [togglePopup, setTogglePopup] = useState(false);
    const countryCode = useSelector(state => state.flagr.appConfig.countryCode)

    const axiosInstance = useAxios('');

    useEffect(() => {
        setHasVaccinatorSelected(!isEmpty(selectedVaccinator));
        if (!isEmpty(selectedVaccinator)) {
            setVaccinator(selectedVaccinator);
            setUpdatedVaccinatorFields({})
        } else {
            setVaccinator({
                name: "",
                code: "",
                mobileNumber: "",
                email: "",
                facilityIds: [],
                nationalIdentifier: "",
                status: "Active",
                signatures: [],
                averageRating:0,
                trainingCertificate:"",
                signatureString: "",
                programs: []
            });
            setUpdatedVaccinatorFields({})
        }
        fetchPrograms();
        setSelectedProgram({});
    }, [selectedVaccinator]);

    function fetchPrograms() {
        axiosInstance.current.get(API_URL.USER_FACILITY_API)
            .then(res => {
                res.data.forEach(item => {
                    if (!("programs" in item)) {
                        setPrograms([]);
                    } else {
                        const programs = item.programs.map(p => ({name:p.name, id:p.programId}))
                        setPrograms(programs)
                    }
                });
            });
    }

    function searchVaccinators() {
        let params = {
            name: searchVaccinatorName,
            facilityCode: "ALL"
        };
        params = reject(equals(''))(params);
        const queryParams = new URLSearchParams(params);
        axiosInstance.current.get(API_URL.VACCINATORS_API, {params: queryParams})
            .then(res => {
                setSearchVaccinatorResults(res.data.filter(v => !v.facilityIds.includes(facilityCode)));
                setTogglePopup(!togglePopup);
            });
    }

    function onValueChange(evt, field) {
        setUpdatedVaccinatorFields({...updatedVaccinatorFields, [field]: evt.target.value});
        setVaccinator({...vaccinator, [field]: evt.target.value})
    }

    function isVaccinatorValid(vaccinator) {
        if (vaccinator.name && vaccinator.email &&
            vaccinator.mobileNumber && vaccinator.nationalIdentifier && vaccinator.code) {
            return true;
        }
        return false;
    }

    function saveVaccinator() {
        if (isVaccinatorValid(vaccinator)) {
            const data = {...vaccinator};
            if (selectedProgram.programId) {
                data.programs = [selectedProgram]
            }
            axiosInstance.current.post('/divoc/admin/api/v1/vaccinator', data)
                .then(res => {
                    if (res.status === 200) {
                        onSuccessfulSave()
                    }
                    else
                        alert("Something went wrong while saving!");
                });
        } else {
            alert("Please fill all the required values!")
        }
    }

    function editVaccinator() {
        if (isVaccinatorValid(vaccinator) && vaccinator.osid) {
            const editData = {...updatedVaccinatorFields};
            if (editData) {
                editData['osid'] = vaccinator.osid;
                if (selectedProgram.programId && !vaccinator.programs.filter(p => p.programId === selectedProgram.programId).length > 0) {
                    editData['programs'] = vaccinator.programs.concat(selectedProgram)
                } else {
                    editData['programs'] = vaccinator.programs
                }
                axiosInstance.current.put(API_URL.VACCINATORS_API, [editData])
                    .then(res => {
                        if (res.status === 200) {
                            onSuccessfulSave()
                        }
                        else
                            alert("Something went wrong while saving!");
                    });
            }
        } else {
            alert("Please fill all the required values!")
        }
    }

    const onSuccessfulSave = () => {
        setSavedSuccessfully(true);
        setEnableVaccinatorDetailView(true);
        setTimeout(() => onSelectVaccinatorBasedOnCode(vaccinator.code), 2000);
    };

    function exitDetailView() {
        setEnableVaccinatorDetailView(false)
    }

    const CustomSwitch = withStyles({
        switchBase: {
            '&$checked': {
                color: "#88C6A9",
            },
            '&$checked + $track': {
                backgroundColor: "#88C6A9",
            },
        },
        checked: {},
        track: {},
    })(Switch);

    function onProgramCertifyChange(program, certified) {
        program.certified = certified;
        let updatedPrograms = vaccinator.programs.map(p => {
            if (p.programId === program.programId) {
                p.certified = program.certified
            }
            return p
        });

        setUpdatedVaccinatorFields({...updatedVaccinatorFields, "programs": updatedPrograms});
        setVaccinator({...vaccinator, "programs": updatedPrograms})
    }

    function onAddProgramChange(value) {
        let program = {
            programId: programs.filter(p => p.name === value).map(p => p.id)[0],
            certified: false,
            status: "Active"
        };
        setSelectedProgram(program);
    }

    function onAddProgramCertify(value) {
        setSelectedProgram({...selectedProgram, "certified": value})
    }

    function triggerSearchForOnClickEnter(event) {
        if (event.key === 'Enter' && event.target.value) {
            searchVaccinators()
        }
    }

    function isProgramAssociated(program, vaccinator) {
        return vaccinator.programs && vaccinator.programs.map(p => p.name).includes(program.name)
    }

    return (
        <>
        <div className="personal-details-div">
            <div className="row">
                <div ><h2>{hasVaccinatorSelected ? "Vaccinator Details" : "Add Vaccinator" }</h2></div>
                <div className="search-div">
                {
                        !hasVaccinatorSelected &&
                            <>
                                <input
                                    className="form-control"
                                    value = {searchVaccinatorName}
                                    type="text"
                                    id="name"
                                    placeholder="Search Registry by Name"
                                    onKeyDown = {triggerSearchForOnClickEnter}
                                    onChange={(evt) => setSearchVaccinatorName(evt.target.value)}
                                />
                                <button disabled={!searchVaccinatorName} className="search-img" onClick={searchVaccinators} ><img src={searchImg} alt={""} /></button>
                                <SearchVaccinatorResultsView
                                    vaccinators={searchVaccinatorResults}
                                    togglePopup={togglePopup}
                                    setTogglePopup={setTogglePopup}
                                    onSelectVaccinatorBasedOnCode={onSelectVaccinatorBasedOnCode}
                                    facilityCode={facilityCode}
                                />
                            </>
                    }
                    <button className="add-vaccinator-button" onClick={exitDetailView} >BACK</button>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-10">
                    <h3>Personal Details</h3>
                    <form>
                        <div className="form-row">
                            <div className="col-md-6">
                                <label htmlFor="name">
                                    Name *
                                </label>
                                <input
                                    className="form-control"
                                    value = {vaccinator.name}
                                    type="text"
                                    id="name"
                                    onChange={(evt) => onValueChange(evt, "name")}
                                    required />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="email">
                                    Email *
                                </label>
                                <InputMask
                                    type="email"
                                    id="email"
                                    defaultValue={vaccinator.email}
                                    handleChange={(evt) => onValueChange(evt, "email")}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col-md-6">
                                <label htmlFor="mobileNumber">
                                    Mobile *
                                </label>
                                <InputMask
                                    type="text"
                                    id="mobileNumber"
                                    defaultValue={vaccinator.mobileNumber}
                                    handleChange={(evt) => onValueChange(evt, "mobileNumber")}
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="nationalIdentifier">
                                    National Identifier *
                                </label>
                                <InputMask
                                    type="text"
                                    id="nationalIdentifier"
                                    defaultValue={vaccinator.nationalIdentifier}
                                    handleChange={(evt) => onValueChange(evt, "nationalIdentifier")}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col-md-6">
                                <label htmlFor="licenseNumber">
                                    License Number *
                                </label>
                                <InputMask 
                                    type="text"
                                    id="licenseNumber"
                                    defaultValue={vaccinator.code}
                                    handleChange={(evt) => onValueChange(evt, "code")}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6 training-and-certification">
                <h3>Training & Certification</h3>
                    {
                        vaccinator.programs &&
                        vaccinator.programs.map(program => (
                            <div className="row vaccinator-prg-div">
                                <span className="col-sm-7 vaccinator-prg-span">{program.name}</span>
                                <CustomSwitch
                                    checked={program.certified}
                                    onChange={() => onProgramCertifyChange(program, !program.certified)}
                                    color="primary"
                                />
                                <span className="vaccinator-prg-span">Certified</span>
                            </div>
                        ))
                    }
                    <div>
                        <span className="filter-header">Certification (if any)</span>
                        <DropDown
                            options={programs.filter(p => !isProgramAssociated(p, vaccinator)).map(p => p.name)}
                            placeholder="Please select Program"
                            setSelectedOption={onAddProgramChange}
                        />
                        <div>
                            <span>Certified</span>
                            <CustomSwitch
                                checked={selectedProgram.certified}
                                onChange={() => onAddProgramCertify(!selectedProgram.certified)}
                                color="primary"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
            <div style={{marginLeft: "12px"}}>
                {savedSuccessfully && <span><img src={check}/> <span className="saved-success">Details Saved</span></span>}
                {!hasVaccinatorSelected && <button className="add-vaccinator-button" onClick={saveVaccinator}>ADD</button>}
                {hasVaccinatorSelected && <button className="add-vaccinator-button" onClick={editVaccinator}>SAVE</button>}
            </div>
    </>
    );
}
