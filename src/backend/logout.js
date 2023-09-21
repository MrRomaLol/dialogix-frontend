import axios from "axios";
import {backend} from "../config/consts";

const logout = (cb, onError) => {
    axios.post(backend + 'api/v1/logout', {}, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        withCredentials: true
    })
        .then(response => {
            console.log(response.data);
            cb?.();
        }).catch((err) => {
            onError?.();
        console.error(err.message);
    });
}