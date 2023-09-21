import React from 'react';
import ReactDOM from 'react-dom';
import i18n from "i18next";
import {useTranslation, initReactI18next} from "react-i18next";

import App from './App';

import {uk, en} from "./locale/locale";

i18n.use(initReactI18next).init({
    compatibilityJSON: "v3",
    resources: {
        ...uk, ...en,
    },
    lng: "en",
    fallbackLng:"en",
    interpolation: {
        escapeValue: false,
    }
})

ReactDOM.render(
    <App/>,
    document.getElementById('root')
)
