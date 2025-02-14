/**
 * SPDX-FileCopyrightText: Copyright 2023 Open Mobile Platform LLC <community@omp.ru>
 * SPDX-License-Identifier: BSD-3-Clause
 */
import * as React from "react";
import {Alert, Collapse, IconButton} from "@mui/material";
import {Close} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

/**
 * Alert success for form
 */
export function AlertSuccess(props) {

    // props
    const {
        onClose
    } = props

    // states
    const [collapse, setCollapse] = React.useState(true);

    return (
        <Collapse in={collapse}>
            <Alert
                style={props.style}
                severity="success"
                sx={{
                    color: 'success.dark',
                    backgroundColor: 'success.light',
                    borderRadius: 1,
                    '& svg': {
                        color: 'success.dark',
                    }
                }}
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setCollapse(false);
                            setTimeout(() => onClose(), 200)
                        }}
                    >
                        <Close fontSize="inherit"/>
                    </IconButton>
                }
            >
                <Typography gutterBottom variant="text3">
                    {props.children}
                </Typography>
            </Alert>
        </Collapse>
    );
}

AlertSuccess.propTypes = {
    style: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.string.isRequired
};
