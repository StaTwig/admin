import Button from "react-bootstrap/Button";
import React from "react";
import {BaseCard} from "../Base/Base";
import "./Logout.scss"
import {appIndexDb} from "../AppDatabase";
import {SyncFacade} from "../SyncFacade";
import * as PropTypes from "prop-types";
import {AuthSafeComponent} from "../utils/keycloak";
import {Messages} from "../Base/Constants";
import config from "../config";
import {useOnlineStatus} from "../utils/offlineStatus";

function AuthSafeLogout({keycloak}) {
    const isOnLine = useOnlineStatus()
    return <div className="logout-container">
        <BaseCard>
            <div className="button-center">
                <Button variant="success" onClick={() => {
                    if (isOnLine) {
                        SyncFacade
                            .push()
                            .catch((e) => console.log(e.message))
                            .then(() => appIndexDb.clearEverything())
                            .then((() => keycloak.logout({redirectUri: window.location.origin + config.urlPath})))
                            .catch(e => {
                                console.log(e.message)
                                if (!isOnLine) {
                                    alert(Messages.NO_INTERNET_CONNECTION)
                                }
                            })
                    } else {
                        alert(Messages.NO_INTERNET_CONNECTION)
                    }
                }}>Confirm Logout ?</Button>{" "}
            </div>
        </BaseCard>
    </div>;
}

AuthSafeLogout.propTypes = {onClick: PropTypes.func};

export function Logout(props) {
    return (
        <AuthSafeComponent>
            <AuthSafeLogout/>
        </AuthSafeComponent>
    );
}
