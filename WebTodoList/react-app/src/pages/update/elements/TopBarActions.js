/**
 * SPDX-FileCopyrightText: Copyright 2023 Open Mobile Platform LLC <community@omp.ru>
 * SPDX-License-Identifier: BSD-3-Clause
 */
import {IconButton} from "@mui/material";
import * as React from "react";
import PropTypes from "prop-types";
import {DeleteOutlined} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {StorageTypes, StorageUtils, useLocalStorage} from "../../../storage";
import {AppConstants} from "../../../constants";
import {EventsUtils} from "../../../events/EventsUtils";

export function TopBarActions(props) {

    // props
    const {
        id
    } = props

    // hooks
    const navigate = useNavigate();
    const data = useLocalStorage(AppConstants.storage.keyTask, StorageTypes.array, []);

    return (
        <>
            {id === undefined ? null : (
                <IconButton
                    color={'inherit'}
                    edge="end"
                    onClick={() => {
                        if (EventsUtils.isRunAurora) {
                            // update cache in native
                            EventsUtils.send.deleteTask(id, (response) => {
                                // save in storage
                                StorageUtils.arraySet(AppConstants.storage.keyTask, response);
                                // back to list
                                navigate(-1)
                            });
                        } else {
                            const newData = data.filter(e => e.id !== id);
                            // save in storage
                            StorageUtils.arraySet(AppConstants.storage.keyTask, newData);
                            // back to list
                            navigate(-1)
                        }
                    }}
                >
                    <DeleteOutlined/>
                </IconButton>
            )}
        </>
    );
}

TopBarActions.propTypes = {
    id: PropTypes.number,
};
