/**
 * SPDX-FileCopyrightText: Copyright 2023 Open Mobile Platform LLC <community@omp.ru>
 * SPDX-License-Identifier: BSD-3-Clause
 */
import * as React from "react";
import {Stack} from "@mui/material";
import Lottie from "lottie-react";
import {AssetsConstants} from "../../constants";
import {BaseLayout} from "../../components";
import {useTranslation} from "react-i18next";

export function ErrorPage() {

    // hooks
    const {t} = useTranslation();

    return (<BaseLayout
        title={t('t_appbar_error')}
        isCenter={true}
        background={'#ecf0f1'}
    >
        <Stack
            spacing={3}
            alignItems={'center'}
        >
            <Lottie animationData={AssetsConstants.lottie.error} style={{
                width: 300,
            }}/>
        </Stack>
    </BaseLayout>);
}
