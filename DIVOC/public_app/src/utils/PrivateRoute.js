import * as React from 'react'
import {Redirect, Route} from 'react-router-dom'

import {useKeycloak} from '@react-keycloak/web'
import config from "../config"
import {useEffect} from "react";


export function PrivateRoute({component: Component, role, clientId, ...rest}) {
    const {keycloak} = useKeycloak();
    useEffect(() => {
        if (keycloak.authenticated) {
            if (!keycloak.hasResourceRole(role, clientId)) {
                // alert("Unauthorized. Contact ADMIN");
                keycloak.logout({redirectUri: window.location.origin + "/"});
                // keycloak.logout();
            }
        }
    }, [keycloak]);
    return (
        <Route
            {...rest}
            render={(props) =>
                keycloak.authenticated ? (
                    role === undefined || keycloak.hasResourceRole(role, clientId) ?
                        <Component {...props} /> : <Redirect to="/"/>
                ) : (
                    <Redirect
                        to={{
                            pathname: config.urlPath + '/login',
                            state: {from: props.location},
                        }}
                    />
                )
            }
        />
    )
}
