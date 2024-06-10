/**
 * SPDX-FileCopyrightText: Copyright 2023 Open Mobile Platform LLC <community@omp.ru>
 * SPDX-License-Identifier: BSD-3-Clause
 */
import {Box, Button, Stack, Typography} from "@mui/material";
import * as React from "react";
import {CartItem} from "./elements/CartItem";
import Lottie from "lottie-react";
import {AppConstants, AssetsConstants} from "../../constants";
import {useTranslation} from "react-i18next";
import {BaseLayout} from "../../components";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import {useLocation, useNavigate} from "react-router-dom";
import {AddOutlined} from "@mui/icons-material";
import {TopBarActions} from "./elements/TopBarActions";
import {StorageTypes, useLocalStorage} from "../../storage";
import {AppRoute} from "../../App";

export function HomePage(props) {

    // props
    const {
        isFilter,
    } = props

    // hooks
    const location = useLocation();
    const {t, i18n} = useTranslation();
    const navigate = useNavigate();
    const data = useLocalStorage(AppConstants.storage.keyTask, StorageTypes.array, []);

    // variables
    const content = []
    const title = location.pathname === AppRoute.home ? t('t_appbar_today') : t('t_appbar_all');

    // build content with filter by day
    data.forEach((item) => {
        if (!isFilter || dayjs(item.date).isToday()) {
            content.push(<CartItem
                key={`item-${item.id}`}
                id={item.id}
                date={dayjs(item.date).toDate()}
                name={item.name}
                desc={item.desc}
            />)
        }
    })

    // variables
    const isEmptyPage = content.length === 0;
    const isEmpty = data.length === 0;

    return (
        <BaseLayout
            isCenter={isEmptyPage}
            title={isEmpty ? t('t_appbar_appname') : title}
            actions={<TopBarActions isEmpty={isEmpty}/>}
        >
            <Stack
                direction="column"
                spacing={2}
            >
                {isEmptyPage ? (
                    <Stack
                        direction={'column'}
                        alignItems={'center'}
                        spacing={4}
                    >
                        <Stack spacing={2} alignItems={'center'}>
                            <Typography
                                variant={isEmpty ? 'h4' : 'h5'}
                                color={'text.primary'}
                                sx={{
                                    whiteSpace: 'pre-line',
                                    textAlign: 'center'
                                }}
                            >
                                {isEmpty ? t('t_home_empty_data_title') : new Intl
                                    .DateTimeFormat(i18n.language.replace('_', '-'), {
                                        year: 'numeric',
                                        month: 'long',
                                        day: '2-digit',
                                    })
                                    .format(new Date())}
                            </Typography>

                            <Typography
                                variant={'caption'}
                                color={'text.primary'}
                                sx={{textAlign: 'center'}}
                            >
                                {isEmpty ? t('t_home_empty_data_text') : t('t_home_empty_page_text')}
                            </Typography>
                        </Stack>

                        <Box sx={{
                            background: 'white',
                            borderRadius: '50%',
                            paddingBottom: '5px',
                            paddingLeft: '5px',
                            width: 142,
                        }}>
                            <Lottie animationData={AssetsConstants.lottie.welcome} style={{
                                width: 100,
                                margin: '15px auto 0px',
                            }}/>
                        </Box>

                        <Button
                            variant="contained"
                            startIcon={<AddOutlined/>}
                            onClick={() => {
                                navigate(AppRoute.create)
                            }}
                        >
                            {t('t_home_empty_btn')}
                        </Button>
                    </Stack>
                ) : content}
            </Stack>
        </BaseLayout>
    );
}

HomePage.propTypes = {
    isFilter: PropTypes.bool.isRequired,
};
