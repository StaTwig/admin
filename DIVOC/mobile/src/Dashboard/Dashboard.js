import React from 'react';
import './Dashboard.scss'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {BottomItem} from "../Base/Base";
import home from '../Home/home.svg'
import language from '../Language/language.svg'
import queue from '../Queue/queue.svg'
import ImgProfile from '../components/Profile/profile.svg'
import programs from '../components/ProgramSelection/programs.svg'
import {Home} from "../Home/Home";
import {Queue} from "../Queue/Queue";
import {SelectLanguage} from "../Language/LanguageSelection";
import {PrivateRoute} from "../utils/PrivateRoute";
import {LoginComponent} from "../Login/Login";
import {PreEnrollmentFlow} from "../Home/Forms/PreEnrollmentFlow";
import {ConfirmFlow} from "../ConfirmVaccination";
import {useLocation} from "react-router";
import {getMessageComponent, LANGUAGE_KEYS} from "../lang/LocaleContext";
import {WalkEnrollmentFlow} from "../components/WalkEnrollments";
import {Help} from "../components/Help";
import config from "../config";
import {createBrowserHistory} from 'history';
import {ProgramSelection} from "../components/ProgramSelection";
import {UserProfile} from "../components/Profile";

Dashboard.propTypes = {};

const history = createBrowserHistory({basename: '/facility_app'});

function Dashboard(props) {
    return (
        <Router history={history}>
            <div className={"dashboard-container"}>
                <div className={"host-container"}>

                    <Switch>
                        <PrivateRoute path={config.urlPath + "/"} exact component={Home}/>
                        <PrivateRoute path={config.urlPath + "/language"} exact component={SelectLanguage}/>
                        <PrivateRoute path={config.urlPath + "/queue"} exact component={Queue}/>
                        <PrivateRoute path={config.urlPath + "/profile"} exact component={UserProfile}/>
                        <PrivateRoute path={config.urlPath + "/help"} exact component={Help}/>
                        <PrivateRoute path={config.urlPath + "/programs"} exact component={ProgramSelection}/>
                        <PrivateRoute path={config.urlPath + "/preEnroll/:pageName"} component={PreEnrollmentFlow}/>
                        <PrivateRoute path={config.urlPath + "/walkInEnroll/:pageName"} component={WalkEnrollmentFlow}/>
                        <PrivateRoute path={config.urlPath + "/confirm/vaccination/:recipient_id/:pageName"}
                                      component={ConfirmFlow}/>
                        <Route path={config.urlPath + "/login"} exact component={LoginComponent}/>
                    </Switch>
                    <Footer/>
                </div>

            </div>
        </Router>
    );
}

export default Dashboard;

const Footer = () => {
    const location = useLocation();
    return (
        <div className="bottom-bar d-flex justify-content-around">
            <BottomItem currentLocation={location.pathname} src={home} href={config.urlPath + "/"}
                        title={getMessageComponent(LANGUAGE_KEYS.HOME)}/>
            <BottomItem currentLocation={location.pathname} src={queue} href={config.urlPath + "/queue"}
                        title={getMessageComponent(LANGUAGE_KEYS.QUEUE)}/>
            <BottomItem currentLocation={location.pathname} src={programs} href={config.urlPath + "/programs"}
                        title={getMessageComponent(LANGUAGE_KEYS.PROGRAM)}/>
            <BottomItem currentLocation={location.pathname} src={language} href={config.urlPath + "/language"}
                        title={getMessageComponent(LANGUAGE_KEYS.LANGUAGE)}/>
            <BottomItem currentLocation={location.pathname} src={ImgProfile} href={config.urlPath + "/profile"}
                        title={getMessageComponent(LANGUAGE_KEYS.PROFILE)}/>
        </div>
    )
}
