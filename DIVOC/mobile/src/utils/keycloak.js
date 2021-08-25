import Keycloak from 'keycloak-js';
import config from "../config"
import React, {useEffect} from "react";
import {useKeycloak} from "@react-keycloak/web";
import {Messages} from "../Base/Constants";
import {appIndexDb} from "../AppDatabase";
import {ApiServices} from "../Services/ApiServices";
import {useOnlineStatus} from "./offlineStatus";

const keycloak = Keycloak(config.urlPath + '/keycloak.json');

export default keycloak

export function AuthSafeComponent({children}) {
    const isOnLine = useOnlineStatus()
    if (isOnLine) {
        return <WithKeyCloakComponent children={children}/>
    } else {
        return <WithoutKeyCloakComponent children={children}/>
    }
}

export function WithKeyCloakComponent({children}) {
    const {keycloak, initialized} = useKeycloak()
    const isOnLine = useOnlineStatus()
    useEffect(() => {
        if (initialized || keycloak.authenticated) {
            keycloak.loadUserProfile()
                .then(res => {
                    return saveUserAttributes(res["attributes"]);
                })
                .catch((e) => {
                    console.log(e.message)
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialized]);

    if (!keycloak || !children) {
        return <div>
            Loading...
        </div>
    }
    if (isOnLine) {
        return React.cloneElement(
            children,
            {initialized: initialized, keycloak: keycloak}
        )
    } else {
        return React.cloneElement(
            children,
            {
                initialized: true,
                keycloak: {
                    authenticated: true,
                    login: function (path) {

                    },
                    hasResourceRole: function () {
                        return true
                    },
                    token: localStorage.getItem("token")
                }
            }
        )
    }
}

async function saveUserAttributes(attributes) {
    await appIndexDb.initDb()
    let userDetails = await appIndexDb.getUserDetails();
    if (!userDetails) {
        userDetails = await ApiServices.getUserDetails()
        const facilityDetails = await ApiServices.getFacilityDetails();
        if (facilityDetails && facilityDetails.length > 0) {
            userDetails["facilityDetails"] = facilityDetails[0]
        }
        userDetails["loginTime"] = new Date().toISOString()
        await appIndexDb.saveUserDetails(userDetails)
    }
    if (!userDetails["loginTime"]) {
        userDetails["loginTime"] = new Date().toISOString()
    }
    for (let attributesKey in attributes) {
        userDetails[attributesKey] = attributes[attributesKey][0]
    }
    await appIndexDb.saveUserDetails(userDetails)
}

export function WithoutKeyCloakComponent({children}) {
    if (!children) {
        return <div>
            Loading...
        </div>
    }
    const token = localStorage.getItem("token")
    if (!token) {
        return <div>Failed to Login. Please by re-login again</div>
    }
    return React.cloneElement(
        children,
        {
            initialized: true,
            keycloak: {
                authenticated: true,
                login: function (path) {
                    alert(Messages.NO_INTERNET_CONNECTION)
                },
                logout: function () {
                    alert(Messages.NO_INTERNET_CONNECTION)
                },
                hasResourceRole: function () {
                    return true
                },
                token: localStorage.getItem("token")
            }
        }
    )
}
