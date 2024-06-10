/**
 * SPDX-FileCopyrightText: Copyright 2023 Open Mobile Platform LLC <community@omp.ru>
 * SPDX-License-Identifier: BSD-3-Clause
 */
import {Avatar, Card, CardActionArea, CardHeader, Stack, Typography, useTheme} from "@mui/material";
import * as React from "react";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {AlarmOnOutlined, AlarmOutlined, SnoozeOutlined} from "@mui/icons-material";
import dayjs from "dayjs";

import {AppRoute} from "../../../App";

/**
 * Item list tasks
 */
export function CartItem(props) {

    // props
    const {
        id,
        date,
        name,
        desc,
    } = props

    // hooks
    const theme = useTheme();
    const navigate = useNavigate();
    const {i18n} = useTranslation()

    // variables
    const content = []

    if (dayjs(date).isToday()) {
        content.push(
            <Avatar key={'avatar'} sx={{bgcolor: theme.palette.success.main}}>
                <AlarmOutlined/>
            </Avatar>
        )
    } else if (dayjs(date).isBefore(dayjs())) {
        content.push(
            <Avatar key={'avatar'} sx={{bgcolor: theme.palette.grey["600"]}}>
                <AlarmOnOutlined/>
            </Avatar>
        )
    } else {
        content.push(
            <Avatar key={'avatar'} sx={{bgcolor: theme.palette.primary.main}}>
                <SnoozeOutlined/>
            </Avatar>
        )
    }

    return (
        <Card sx={{width: '100%'}}>
            <CardActionArea onClick={() => {
                navigate(AppRoute.update.replace(":id", `${id}`))
            }}>
                <CardHeader
                    sx={{alignItems: 'flex-start'}}
                    avatar={content}
                    title={(
                        <Typography sx={{fontWeight: 'bold'}} variant={'body1'} color={'text.primary'}>
                            {name}
                        </Typography>
                    )}
                    subheader={(
                        <Stack spacing={0}>
                            <Typography variant={'body2'} color={'text.primary'} sx={{pt: '3px', pb: '3px'}}>
                                {desc}
                            </Typography>
                            <Typography variant={'caption'} color={'text.secondary'}>
                                {new Intl
                                    .DateTimeFormat(i18n.language.replace('_', '-'), {
                                        year: 'numeric',
                                        month: 'long',
                                        day: '2-digit',
                                    })
                                    .format(date)}
                            </Typography>
                        </Stack>
                    )}
                />
            </CardActionArea>
        </Card>
    )
}

CartItem.propTypes = {
    id: PropTypes.number.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    name: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
};
