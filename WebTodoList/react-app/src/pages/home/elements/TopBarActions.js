/**
 * SPDX-FileCopyrightText: Copyright 2023 Open Mobile Platform LLC <community@omp.ru>
 * SPDX-License-Identifier: BSD-3-Clause
 */
import {IconButton} from "@mui/material";
import * as React from "react";
import PropTypes from "prop-types";
import {useLocation, useNavigate} from "react-router-dom";
import {AddOutlined, CalendarMonthOutlined, InfoOutlined, TodayOutlined} from "@mui/icons-material";
import {AppRoute} from "../../../App";

export function TopBarActions(props) {

    // props
    const {
        isEmpty
    } = props

    // hooks
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <>
            <IconButton
                color={'inherit'}
                onClick={() => {
                    navigate(AppRoute.create)
                }}
                sx={{mr: 1}}
            >
                <AddOutlined/>
            </IconButton>

            {isEmpty ? null : (
                <IconButton
                    color={'inherit'}
                    onClick={() => {
                        if (location.pathname === AppRoute.home) {
                            navigate(AppRoute.homeAll, {replace: true})
                        } else {
                            navigate(AppRoute.home, {replace: true})
                        }
                    }}
                    sx={{mr: 1}}
                >
                    {location.pathname === AppRoute.home ? <TodayOutlined/> : <CalendarMonthOutlined/>}
                </IconButton>
            )}

            <IconButton
                color={'inherit'}
                edge="end"
                onClick={() => {
                    navigate(AppRoute.about)
                }}
            >
                <InfoOutlined/>
            </IconButton>
        </>
    );
}

TopBarActions.propTypes = {
    isEmpty: PropTypes.bool.isRequired,
};
