/**
 * SPDX-FileCopyrightText: Copyright 2023 Open Mobile Platform LLC <community@omp.ru>
 * SPDX-License-Identifier: BSD-3-Clause
 */
import * as React from "react";
import {Stack, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import {BaseLayout} from "../../components";
import {AppConstants} from "../../constants";

export function AboutPage() {

    // hooks
    const {t} = useTranslation()

    return (
        <BaseLayout title={t('t_appbar_about')}>
            <Stack spacing={3}>

                <Stack spacing={2}>
                    <Typography variant={'h5'} color={'text.primary'}>
                        {t('t_about_title')} {AppConstants.other.version}
                    </Typography>

                    <Typography variant={'body1'} color={'text.primary'}>
                        {t('t_about_text1')}
                    </Typography>

                    <Typography variant={'body1'} color={'text.primary'}>
                        {t('t_about_text2')}
                    </Typography>
                </Stack>

                <Stack spacing={1}>
                    <Stack spacing={0}>
                        <Typography variant={'h6'} color={'text.primary'}>
                            {t('t_about_aurora_title')}
                        </Typography>

                        <Typography component={'div'} variant={'body1'} color={'text.primary'}>
                            <ul>
                                <li>
                                    {t('t_about_aurora_text1')}
                                </li>
                                <li>
                                    {t('t_about_aurora_text2')}
                                </li>
                                <li>
                                    {t('t_about_aurora_text3')}
                                </li>
                                <li>
                                    {t('t_about_aurora_text4')}
                                </li>
                            </ul>
                        </Typography>
                    </Stack>

                    <Stack spacing={0}>
                        <Typography variant={'h6'} color={'text.primary'}>
                            {t('t_about_react_title')}
                        </Typography>

                        <Typography component={'div'} variant={'body1'} color={'text.primary'}>
                            <ul>
                                <li>
                                    {t('t_about_react_text1')}
                                </li>
                                <li>
                                    {t('t_about_react_text2')}
                                </li>
                                <li>
                                    {t('t_about_react_text3')}
                                </li>
                                <li>
                                    {t('t_about_react_text4')}
                                </li>
                                <li>
                                    {t('t_about_react_text5')}
                                </li>
                                <li>
                                    {t('t_about_react_text6')}
                                </li>
                                <li>
                                    {t('t_about_react_text7')}
                                </li>
                                <li>
                                    {t('t_about_react_text8')}
                                </li>
                            </ul>
                        </Typography>
                    </Stack>
                </Stack>

            </Stack>
        </BaseLayout>
    );
}
