/**
 * SPDX-FileCopyrightText: Copyright 2023 Open Mobile Platform LLC <community@omp.ru>
 * SPDX-License-Identifier: BSD-3-Clause
 */

/**
 * Events keys for connect with app
 * send - actions for send event
 * define - defining functions to be called from the application
 */
export const EventsKey = {
    send: {
        init: 'init',
        updateTask: 'updateTask',
        deleteTask: 'deleteTask',
    },
    define: {
        listener: 'listener',
        setLocale: 'setLocale',
        setThemeColors: 'setThemeColors',
        setTasks: 'setTasks',
    },
}
