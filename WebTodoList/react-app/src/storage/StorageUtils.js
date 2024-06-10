/**
 * SPDX-FileCopyrightText: Copyright 2023 Open Mobile Platform LLC <community@omp.ru>
 * SPDX-License-Identifier: BSD-3-Clause
 */
import {MD5} from "crypto-js";
import LZString from "lz-string"

/**
 * App for work with cache
 */
export const StorageUtils = {

    ////////////////////////////
    // Array

    arrayGet: function (key, defaultValue = []) {
        const string = StorageUtils._getItem(key)

        try {
            if (string && string.charAt(0) === '[') {
                return JSON.parse(string)
            }
        } catch (e) {}

        return defaultValue
    },

    arraySet: function (key, value) {
        StorageUtils._setItem(key, JSON.stringify(value))
    },

    ////////////////////////////
    // Object

    objectGet: function (key, defaultValue = null) {
        const string = StorageUtils._getItem(key)

        try {
            if (string && string.charAt(0) === '{') {
                return JSON.parse(string)
            }
        } catch (e) {}

        return defaultValue
    },

    objectSet: function (key, value) {
        StorageUtils._setItem(key, JSON.stringify(value))
    },

    ////////////////////////////
    // Int

    intGet: function (key, defaultValue = 0) {
        const string = StorageUtils._getItem(key)
        if (string) return parseInt(string)
        return defaultValue
    },

    intSet: function (key, value) {
        StorageUtils._setItem(key, value)
    },

    ////////////////////////////
    // String

    stringGet: function (key, defaultValue = '') {
        const string = StorageUtils._getItem(key)
        if (string) return string
        return defaultValue
    },

    stringSet: function (key, value) {
        StorageUtils._setItem(key, value)
    },

    ////////////////////////////
    // Boolean

    booleanGet: function (key, defaultValue = false) {
        const string = StorageUtils._getItem(key)
        if (string) return string === 'true'
        return defaultValue
    },

    booleanSet: function (key, value) {
        StorageUtils._setItem(key, value)
    },

    ////////////////////////////
    // Common

    clearByKey: function (key) {
        StorageUtils._setItem(key, null)
        localStorage.removeItem(key)
    },

    clearAll: function () {
        localStorage.clear()
        // update root
        document.querySelector('#root').dataset.cache = ""
    },

    ////////////////////////////
    // Private
    _getItem: function (key) {
        const val = localStorage.getItem(MD5(key))
        return val ? LZString.decompress(val) : null
    },

    _setItem: function (key, value) {

        // get values
        const valueKey = MD5(key)
        const valueLz = LZString.compress(value)

        // save value
        localStorage.setItem(valueKey, valueLz)

        // update root
        const el = document.querySelector('#root');
        const hash = MD5(StorageUtils._allStorage().toString())
        if (el.dataset.cache !== hash) {
            el.dataset.cache = hash
        }
    },

    _allStorage: function () {
        let values = [],
            keys = Object.keys(localStorage),
            i = keys.length;

        while (i--) {
            values.push(LZString.decompress(localStorage.getItem(keys[i])));
        }

        return values;
    }
};
