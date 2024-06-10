/**
 * SPDX-FileCopyrightText: Copyright 2023 Open Mobile Platform LLC <community@omp.ru>
 * SPDX-License-Identifier: BSD-3-Clause
 */
import {createTheme} from '@mui/material/styles';

/**
 * App theme MUI
 */
export const AppTheme = (scheme) => createTheme({
    components: {
        MuiAppBar: {
            styleOverrides: {
                colorPrimary: {
                    backgroundColor: scheme.isDark ? scheme.highlightDimmerColor : scheme.highlightColor
                }
            }
        }
    },
    palette: {
        mode: scheme.isDark ? 'dark' : 'light',
        background: {
            paper: scheme.isDark ? '#4f4f4f' : '#dedede',
            default: scheme.isDark ? '#000000' : '#ffffff',
        },
        primary: {
            light: scheme.highlightColor,
            main: scheme.highlightColor,
            dark: scheme.highlightColor,
        },
        secondary: {
            light: scheme.secondaryColor,
            main: scheme.secondaryColor,
            dark: scheme.secondaryColor,
        },
        error: {
            light: scheme.errorColor,
            main: scheme.errorColor,
            dark: scheme.errorColor,
        },
        warning: {
            light: '#ff805314',
            main: '#ff8053',
            dark: '#bb6141',
        },
        info: {
            light: '#51c0ff14',
            main: '#51c0ff',
            dark: '#337aa3',
        },
        success: {
            light: '#b6efdb',
            main: '#03af72',
            dark: '#02422b',
        },
        gray: {
            light: '#ecf0f1',
            main: '#8b8b8b',
            dark: '#515151',
        },
    }
});
