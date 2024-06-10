/**
 * SPDX-FileCopyrightText: Copyright 2023 Open Mobile Platform LLC <community@omp.ru>
 * SPDX-License-Identifier: BSD-3-Clause
 */
import {useEffect, useState} from 'react';
import {AppTheme} from "../theme/AppTheme";
import {ColorSchemeBorealis} from "../theme/ColorsScheme";
import {EventsUtils} from "./EventsUtils";
import {defaultLanguage} from "../localization/Localization";
import {StorageUtils} from "../storage";
import {AppConstants} from "../constants";

/**
 * Init functions with listen call
 */
export function useEventsState() {

    const [theme, setTheme] = useState(AppTheme(ColorSchemeBorealis));
    const [language, setLanguage] = useState(defaultLanguage);

    useEffect(() => {
        // for update theme
        EventsUtils.define.setThemeColors((scheme) => {
            setTheme(AppTheme(scheme));
        });

        // for update language
        EventsUtils.define.setLocale((language) => {
            setLanguage(language);
        });

        // for update storage
        EventsUtils.define.setTasks((data) => {
            // save in storage
            StorageUtils.arraySet(AppConstants.storage.keyTask, data);
        });

        // send init event
        EventsUtils.send.init();

    }, []);

    return {
        theme: theme,
        language: language,
    };
}
