/**
 * SPDX-FileCopyrightText: Copyright 2023 Open Mobile Platform LLC <community@omp.ru>
 * SPDX-License-Identifier: BSD-3-Clause
 */
import * as React from 'react';
import PropTypes from "prop-types";
import {AppBar, Box, IconButton, Toolbar, Typography, useTheme} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import {ArrowBackOutlined} from "@mui/icons-material";
import {AppRoute} from "../App";

export function BaseLayout(props) {

    // hooks
    const location = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();

    return (<>
        <table className={'RootTable'} style={{
            background: theme.palette.background.default
        }}>
            <tbody>
            <tr>
                <td className={'AppBarTable'}>
                    {/*fixed or sticky not working*/}
                    <AppBar position={'relative'} color={'primary'}>
                        <Toolbar>
                            <IconButton
                                color={'inherit'}
                                aria-label="open drawer"
                                edge="start"
                                onClick={() => {
                                    navigate(-1)
                                }}
                                sx={{
                                    mr: 2,
                                    display: location.pathname === AppRoute.home
                                    || location.pathname === AppRoute.homeAll ? 'none' : 'inherit'
                                }}
                            >
                                <ArrowBackOutlined/>
                            </IconButton>

                            <Typography
                                color={'inherit'}
                                variant="h6"
                                component="div"
                                sx={{flexGrow: 1}}
                            >
                                {props.title}
                            </Typography>

                            {props.actions}
                        </Toolbar>
                    </AppBar>
                </td>
            </tr>
            <tr>
                <td className={'ContentTable'} style={{
                    verticalAlign: props.isCenter ? 'middle' : 'top',
                    background: props.background ? props.background : 'inherit',
                }}>
                    <Box sx={{p: 2}}>
                        {props.children}
                    </Box>
                </td>
            </tr>
            </tbody>
        </table>
    </>)
}

BaseLayout.propTypes = {
    background: PropTypes.string,
    isCenter: PropTypes.bool,
    actions: PropTypes.element,
    title: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
};
