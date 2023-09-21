import axios from "axios";
import {backend} from "../config/consts";

export const loginStatus = (onLoggined, onUnLoggined, onError) => {
    axios.post(backend + 'api/v1/loginstatus', {}, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        withCredentials: true
    }).then(response => {
        if (response.data.status === 'loggedin') {
            onLoggined?.();
        } else {
            onUnLoggined?.();
        }
    }).catch((err) => {
        onError?.();
        console.log(err.message);
    });
}

export const onLoggined = (cb, onError) => {
    loginStatus(cb, null, onError);
}

export const onUnLoggined = (cb, onError) => {
    loginStatus(null, cb, onError);
}
