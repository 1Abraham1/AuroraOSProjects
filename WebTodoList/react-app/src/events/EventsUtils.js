/**
 * SPDX-FileCopyrightText: Copyright 2023 Open Mobile Platform LLC <community@omp.ru>
 * SPDX-License-Identifier: BSD-3-Clause
 */
import {EventsKey} from "./EventsKey";

/**
 * Events utils
 */
export const EventsUtils = {
    isRunAurora: false,
    // send events to app
    send: {
        // event action 'init'
        init: function () {
            EventsUtils.send._custom(EventsKey.send.init)
        },
        // send update item in native
        updateTask: function (data, callback) {
            EventsUtils.send._custom(EventsKey.send.updateTask, data)
            EventsUtils.define._defineProperty(EventsKey.define.listener, callback)
        },
        // send delete data in native
        deleteTask: function (id, callback) {
            EventsUtils.send._custom(EventsKey.send.deleteTask, id)
            EventsUtils.define._defineProperty(EventsKey.define.listener, callback)
        },
        // base function for send event
        // not use in app, add function in [EventUtils] to section send
        _custom: function (action, data) {
            document.dispatchEvent(new CustomEvent('framescript:action', {
                detail: {
                    action: action,
                    data: data
                }
            }));
        },
    },
    // define property in root document to call from the application
    define: {
        // register function change storage
        setTasks: function (callback) {
            EventsUtils.define._defineProperty(EventsKey.define.setTasks, callback)
        },
        // register function change color scheme
        setLocale: function (callback) {
            EventsUtils.define._defineProperty(EventsKey.define.setLocale, callback)
        },
        // register function change color scheme
        setThemeColors: function (callback) {
            EventsUtils.define._defineProperty(EventsKey.define.setThemeColors, callback)
        },
        // base function for define
        // with send callback state for log in app
        _defineProperty: function (key, callback) {
            Object.defineProperty(document.getElementById('root'), key, {
                value: function (data) {
                    // use in aurora
                    EventsUtils.isRunAurora = true
                    // invoke callback
                    callback(data)
                    // send event with delay
                    setTimeout(() => {
                        EventsUtils.send._custom(key, data)
                    }, 1000)
                },
                configurable: true
            });
        },
    }
};
