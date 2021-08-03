import {BaseCard} from "../Base/Base";
import React, {createContext, useContext, useEffect, useMemo, useReducer, useState} from "react";
import "./Home.scss"
import {Col} from "react-bootstrap";
import {useHistory} from "react-router";
import {FORM_PRE_ENROLL_CODE} from "./Forms/PreEnrollmentFlow";
import enrollRecipient from "./enroll_recipient.png"
import verifyRecipient from "./verify_recpient.png"
import {getMessageComponent, LANGUAGE_KEYS} from "../lang/LocaleContext";
import {FORM_WALK_IN_ELIGIBILITY_CRITERIA, WALK_IN_ROUTE} from "../components/WalkEnrollments/context";
import config from "../config"
import {SyncFacade} from "../SyncFacade";
import NoNetworkImg from "assets/img/no_network.svg"
import NetworkImg from "assets/img/network_online.svg"
import {getSelectedProgram, getSelectedProgramId} from "../components/ProgramSelection";
import {programDb} from "../Services/ProgramDB";
import {appIndexDb} from "../AppDatabase";
import {AppointmentDetails} from "./AppointmentDetails";
import {formatDate} from "../utils/date_utils";

function ProgramHeader() {
    const [bannerImage, setBannerImage] = useState();
    const [userDetails, setUserDetails] = useState();
    const programName = getSelectedProgram();

    useEffect(() => {
        programDb
            .getProgramByName(programName)
            .then((program) => setBannerImage(program.logoURL))
            .catch((e) => {
            })

        appIndexDb.getUserDetails()
            .then((userDetails) => setUserDetails(userDetails))
            .catch((e) => {
            })

    }, [programName])

    return <div className={"program-header"}>
        <BaseCard>
            <div>
                {userDetails &&
                <div className="ml-3 m-2">
                    <div className="name">{userDetails.facilityDetails.facilityName}</div>
                    <div
                        className="subtitle">{userDetails.facilityDetails.address.district},{userDetails.facilityDetails.address.state}</div>
                </div>
                }
                {userDetails && <hr className="mt-0 mb-0"/>}
                {!bannerImage && <div className="program-name-container">
                    <div
                        className="program-name">{programName}</div>
                </div>}
                {<img className={"banner"} src={bannerImage} alt={""}
                      onError={() => setBannerImage(null)}/>}
            </div>
        </BaseCard>
    </div>;
}

export function Title({text, content}) {
    return <div className={"title-container"}>
        <div className={"title"}>{text}</div>
        {content}
    </div>;
}

export default Home;

function EnrollmentTypes() {

    const {goToVerifyRecipient, goToQueue, goToNewEnroll} = useHome();
    return <>
        <div className="enroll-container">
            <EnrolmentItems title={getMessageComponent(LANGUAGE_KEYS.VERIFY_RECIPIENT)} icon={verifyRecipient}
                            onClick={() => {
                                goToVerifyRecipient()
                            }}/>
            <EnrolmentItems title={getMessageComponent(LANGUAGE_KEYS.ENROLL_RECIPIENT)} icon={enrollRecipient}
                            onClick={() => {
                                goToNewEnroll()
                            }}/>
        </div>
    </>;
}

function VaccinationProgress() {
    const [beneficiaryStatus, setRecipientDetails] = useState([])
    useEffect(() => {
        appIndexDb.recipientDetails().then(beneficiary => setRecipientDetails(beneficiary))
    }, [])
    const {goToQueue} = useHome();
    if (beneficiaryStatus.length > 0) {
        return <>
            <div className="enroll-container mt-2">
                <EnrolmentItems title={getMessageComponent(LANGUAGE_KEYS.RECIPIENT_QUEUE)}
                                onClick={goToQueue} value={beneficiaryStatus[0].value}/>
                <EnrolmentItems title={getMessageComponent(LANGUAGE_KEYS.CERTIFICATE_ISSUED)}
                                value={beneficiaryStatus[1].value}/>
            </div>
        </>;
    } else {
        return <></>
    }
}

export function EnrolmentItems({icon, title, onClick, value}) {
    return (
        <div className={"verify-card"} onClick={onClick}>
            <BaseCard>
                <Col>
                    {icon && <img className="icon" src={icon} alt={""}/>}
                    <h5>{value}</h5>
                    <h5>{title}</h5>
                </Col>
            </BaseCard>
        </div>
    );
}

export function VaccineProgram() {
    const [isNotSynced, setNotSynced] = useState(false)
    const [eventsCount, setEventsCount] = useState(false)
    useEffect(() => {
        appIndexDb.getAllEvents()
            .then((events) => setEventsCount(events.length))
            .catch(e => console.log(e.message))
        SyncFacade.isNotSynced()
            .then((result) => setNotSynced(result))
            .catch(e => console.log(e.message))
    }, [])
    return <div className={"home-container"}>
        <ProgramHeader/>
        <SyncData isNotSynced={isNotSynced} eventsCount={eventsCount}/>
        <Title text={""} content={<EnrollmentTypes/>}/>
        <Title
            text={getMessageComponent(LANGUAGE_KEYS.ENROLLMENT_TODAY, "", {date: formatDate(new Date().toISOString())})}
            content={<VaccinationProgress/>}/>
        <AppointmentDetails selectedProgramId={getSelectedProgramId()}/>
    </div>;
}

function SyncData(props) {
    let baseCard;
    if (!props.isNotSynced) {
        baseCard = <BaseCard>
            <div className="d-flex pl-3 ml-4">
                <img className="network" src={NetworkImg} alt={"no_network"} width="25px"/>
                <div className="p-3" style={{fontWeight: 600}}>Sync upto date</div>
            </div>
        </BaseCard>
    } else {
        const lastSyncedDate = SyncFacade.lastSyncedOn();
        baseCard = <BaseCard>
            <div className="d-flex pl-3">
                <img className="network mr-2" src={NoNetworkImg} alt={"no_network"} width="25px"/>
                <div className="p-3 ml-4">
                    <label style={{fontWeight: 600}}>Last synced {lastSyncedDate}.</label>
                    <label>Information of {props.eventsCount} beneficiaries is not yet synced.</label>
                </div>
            </div>
        </BaseCard>
    }
    return (
        <div className="mt-3">
            {baseCard}
        </div>
    );
}

export function Home(props) {
    useEffect(() => {
        SyncFacade.push()
            .then(() => {
            })
            .catch((e) => console.log("Sync Failed", e.message))
    }, [])
    return (
        <HomeProvider>
            <VaccineProgram/>
        </HomeProvider>
    );
}


const initialState = {pageNo: 0};

function homeReducer(state, action) {
    switch (action.type) {
        case ACTION_VERIFY_RECIPIENT:
            return state;
        default:
            throw new Error();
    }
}

export const ACTION_VERIFY_RECIPIENT = 'verifyRecipient';

const HomeContext = createContext(null);

export function useHome() {
    const context = useContext(HomeContext);
    const history = useHistory();
    if (!context) {
        throw new Error(`useHome must be used within a HomeProvider`)
    }
    const [state, dispatch] = context;

    const goToVerifyRecipient = function () {
        history.push(config.urlPath + '/preEnroll/' + FORM_PRE_ENROLL_CODE)
    }

    const goToQueue = function () {
        history.push(`${config.urlPath}/queue`)
    };
    const goToNewEnroll = function () {
        history.push(config.urlPath + '/' + WALK_IN_ROUTE + '/' + FORM_WALK_IN_ELIGIBILITY_CRITERIA)
    };

    return {
        state,
        dispatch,
        goToVerifyRecipient,
        goToQueue,
        goToNewEnroll
    }
}

export function HomeProvider(props) {
    const [state, dispatch] = useReducer(homeReducer, initialState);
    const value = useMemo(() => [state, dispatch], [state]);
    return <HomeContext.Provider value={value} {...props} />
}
