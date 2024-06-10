/**
 * SPDX-FileCopyrightText: Copyright 2023 Open Mobile Platform LLC <community@omp.ru>
 * SPDX-License-Identifier: BSD-3-Clause
 */
import * as React from 'react';
import {useEffect} from 'react';
import {HomePage} from "./pages/home/HomePage";
import {Route, Routes} from "react-router-dom";
import {UpdatePage} from "./pages/update/UpdatePage";
import {ErrorPage} from "./pages/error/ErrorPage";
import {AboutPage} from "./pages/about/AboutPage";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {ThemeProvider} from "@mui/material";
import {useEventsState} from "./events";
import {useTranslation} from "react-i18next";

dayjs.extend(require('dayjs/plugin/isToday'))

/**
 * Apps route link
 */
export const AppRoute = {
    home: '/',
    homeAll: '/all',
    about: '/about',
    create: '/create',
    update: '/update/:id',
};

/**
 * Main
 */
export function App() {

    // hooks
    const {i18n} = useTranslation();
    // listen change events
    const {theme, language} = useEventsState();

    // change language If there were changes
    useEffect(() => {
        i18n.changeLanguage(language);
    }, [i18n, language]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ThemeProvider theme={theme}>
                <Routes>
                    <Route path={AppRoute.home}>
                        {/*Home page*/}
                        <Route index element={
                            <HomePage isFilter={true}/>
                        }/>
                        <Route path={AppRoute.homeAll} element={
                            <HomePage isFilter={false}/>
                        }/>
                        {/*Update page*/}
                        <Route path={AppRoute.update} element={
                            <UpdatePage isUpdate={true}/>
                        }/>
                        <Route path={AppRoute.create} element={
                            <UpdatePage isUpdate={false}/>
                        }/>
                        {/*About page*/}
                        <Route path={AppRoute.about} element={
                            <AboutPage/>
                        }/>
                        {/*Not found*/}
                        <Route path="*" element={
                            <ErrorPage/>
                        }/>
                    </Route>
                </Routes>
            </ThemeProvider>
        </LocalizationProvider>
    );
}
