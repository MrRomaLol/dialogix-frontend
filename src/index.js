import React from 'react';
import ReactDOM from 'react-dom/client';
import i18n from "i18next";
import {Provider} from "react-redux";
import {initReactI18next} from "react-i18next";

import store from "./store";

import App from './App';
import {uk, en} from "./locale/locale";

i18n.use(initReactI18next).init({
    compatibilityJSON: "v3",
    resources: {
        ...uk, ...en,
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    }
})

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <Provider store={store}>
        <App/>
    </Provider>,
);
