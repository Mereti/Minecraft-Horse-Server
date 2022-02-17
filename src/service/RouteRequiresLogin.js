import React, { FC } from "react";
import { Route } from "react-router-dom";
import Login from "../components/Login/Login";
import {get_request} from "./api_requests";

const RouteRequiresLogin: FC<React.ComponentProps<typeof Route>> = props => {
    const token = localStorage.getItem('authToken');
    if(token != null) {
        get_request(
            'http://127.0.0.1:8080/api/username',
            true
        ).then(response => {
            if (!response.ok) {
                history.push('/panel/')
            } else {
                <Route {...props}>{props.children}</Route>
            }
        })
    }
};

export default RouteRequiresLogin;
