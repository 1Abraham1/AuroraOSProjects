/**
 * SPDX-FileCopyrightText: Copyright 2023 Open Mobile Platform LLC <community@omp.ru>
 * SPDX-License-Identifier: BSD-3-Clause
 */
import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import {enLocalization} from "./impl/en";
import {ruLocalization} from "./impl/ru";

export const defaultLanguage = 'en_US';

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: defaultLanguage,
        resources: {
            en_US: enLocalization,
            ru_RU: ruLocalization,
        },
        react: {
            bindI18n: 'languageChanged'
        }
    }).then(() => {
});
