/**
 * SPDX-FileCopyrightText: Copyright 2023 Open Mobile Platform LLC <community@omp.ru>
 * SPDX-License-Identifier: BSD-3-Clause
 */
import {useCallback, useLayoutEffect, useState} from "react";
import {StorageTypes} from "./StorageTypes";
import {StorageUtils} from "./StorageUtils";

/**
 * Sync state to local storage so that it persists through a page refresh.
 */
export function useLocalStorage(key, valueType = StorageTypes.string, defaultValue = null) {

    const getValueType = useCallback(
        () => {
            switch (valueType) {
                case StorageTypes.array:
                    return StorageUtils.arrayGet(key, defaultValue)
                case StorageTypes.object:
                    return StorageUtils.objectGet(key, defaultValue)
                case StorageTypes.bool:
                    return StorageUtils.booleanGet(key, defaultValue)
                case StorageTypes.integer:
                    return StorageUtils.intGet(key, defaultValue)
                default:
                    return StorageUtils.stringGet(key, defaultValue)
            }
        }, [defaultValue, key, valueType]);

    const [value, setValue] = useState(getValueType());

    useLayoutEffect(() => {
        const element = document.querySelector('#root');

        const observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.type === "attributes") {
                    setValue(getValueType());
                }
            });
        });

        observer.observe(element, {
            attributes: true
        });

        return () => {
            observer.disconnect()
        };
    }, [getValueType, key, valueType]);

    return value;
}
