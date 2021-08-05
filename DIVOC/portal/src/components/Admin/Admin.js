import React from "react";
import VaccineRegistration from "../VaccineRegistration/VaccineRegistration";
import {TabPanels} from "../TabPanel/TabPanel";
import VaccinatorsRegistry from "../VaccinatorsRegistry/VaccinatorsRegistry";
import FacilitiesRegistry from "../FacilitiesRegistry/FacilitiesRegistry";
import ProgramRegistration from "../ProgramRegistration/ProgramRegistration";
import PreEnrollment from "../PreEnrollment/PreEnrollment";
import {Button, Col} from "react-bootstrap";
import {SampleCSV} from "../../utils/constants";
import DownloadImg from "../../assets/img/download.svg";
import "./Admin.module.css"


export default function Admin() {

    function renderDownloadTemplateButton(templateLink) {
        return <Button bsPrefix={"btn-template"} href={templateLink}>
            <Col className="d-flex flex-row">
                <h6>DOWNLOAD TEMPLATE</h6>
                <img src={DownloadImg} alt={"Download CSV"}/>
            </Col>
        </Button>;
    }

    return (
        <TabPanels tabs={[
            {
                title: 'Facilities',
                component: <FacilitiesRegistry/>,
                rightTabContent: renderDownloadTemplateButton(SampleCSV.FACILITY_REGISTRY)
            },
            {
                title: 'Vaccinators',
                component: <VaccinatorsRegistry/>,
                rightTabContent: renderDownloadTemplateButton(SampleCSV.VACCINATOR_REGISTRY)
            },
            {title: 'Vaccines', component: <VaccineRegistration/>},
            {title: 'Vaccine Programs', component: <ProgramRegistration/>},
            {
                title: 'Pre-Enrollment',
                component: <PreEnrollment/>,
                rightTabContent: renderDownloadTemplateButton(SampleCSV.PRE_ENROLLMENT)
            },
        ]}/>
    );
}
