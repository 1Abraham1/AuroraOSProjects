/**
 * SPDX-FileCopyrightText: Copyright 2023 Open Mobile Platform LLC <community@omp.ru>
 * SPDX-License-Identifier: BSD-3-Clause
 */
import * as React from "react";
import {Box, Button, CircularProgress, FormGroup, Stack, TextField, Typography} from "@mui/material";
import {DoneOutlined} from "@mui/icons-material";
import {Formik} from "formik";
import * as Yup from "yup";
import {MobileDatePicker} from '@mui/x-date-pickers/MobileDatePicker';
import dayjs from "dayjs";
import {useNavigate, useParams} from "react-router-dom";
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";
import {StorageTypes, StorageUtils, useLocalStorage} from "../../storage";
import {AppConstants} from "../../constants";
import {AppRoute} from "../../App";
import {TopBarActions} from "./elements/TopBarActions";
import {AlertSuccess, BaseLayout} from "../../components";
import {EventsUtils} from "../../events/EventsUtils";

export function UpdatePage(props) {

    // props
    const {
        isUpdate,
    } = props

    // hooks
    let {id} = useParams();
    const {t} = useTranslation()
    const navigate = useNavigate();
    const data = useLocalStorage(AppConstants.storage.keyTask, StorageTypes.array, []);

    // variables
    const model = data.find(e => e.id === parseInt(id)) ?? null

    // states
    const [datePicker, setDatePicker] = React.useState(model === null ? dayjs() : dayjs(model.date));

    return (
        <BaseLayout
            title={isUpdate ? t('t_appbar_update') : t('t_appbar_create')}
            actions={<TopBarActions id={model?.id}/>}
        >
            <Formik
                initialValues={{
                    name: model?.name ?? '',
                    desc: model?.desc ?? '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    name: Yup.string().required(t('t_field_error_required')),
                    desc: Yup.string().required(t('t_field_error_required')),
                })}
                onSubmit={async (values, {setErrors, setStatus, setValues}) => {
                    setStatus({success: null});
                    setErrors({submit: null});

                    // delay for animation
                    await new Promise(r => setTimeout(r, 1000));

                    if (EventsUtils.isRunAurora) {
                        // update cache in native
                        EventsUtils.send.updateTask({
                            id: model?.id,
                            date: datePicker.format(),
                            name: values.name,
                            desc: values.desc,
                        }, (response) => {
                            // you can check here errors from native
                            // now just set success, validate in form enough
                            setStatus({success: true});
                            // get last model
                            const item = response[response.length - 1];
                            // update list
                            StorageUtils.arraySet(AppConstants.storage.keyTask, response);
                            // update page
                            navigate(AppRoute.update.replace(":id", `${item.id}`), {replace: true});
                        });
                    } else {
                        // update cache in browser
                        // create model
                        const newModel = {
                            id: data.length + 1,
                            date: datePicker.format(),
                            name: values.name,
                            desc: values.desc,
                        };

                        // set status
                        setStatus({success: true});

                        // update array
                        if (model) {
                            const index = data.findIndex(e => e.id === parseInt(id));
                            data[index] = newModel;
                        } else {
                            data.push(newModel);
                        }

                        // save in storage
                        StorageUtils.arraySet(AppConstants.storage.keyTask, data);

                        // update page
                        navigate(AppRoute.update.replace(":id", `${newModel.id}`), {replace: true});
                    }
                }}
            >
                {({
                      status,
                      errors,
                      setStatus,
                      handleBlur,
                      handleChange,
                      handleSubmit,
                      isSubmitting,
                      touched,
                      values
                  }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <FormGroup>
                            <Box>
                                <Stack spacing={2}>
                                    {!isUpdate && (
                                        <Stack spacing={1}>
                                            <Typography variant={'h5'} color={'text.primary'}>
                                                {t('t_update_title')}
                                            </Typography>

                                            <Typography variant={'caption'} color={'text.primary'}>
                                                {t('t_update_subtitle')}
                                            </Typography>
                                        </Stack>
                                    )}

                                    {status && status.success && (
                                        <AlertSuccess onClose={() => setStatus({success: false})}>
                                            {t('t_update_form_success')}
                                        </AlertSuccess>
                                    )}

                                    <MobileDatePicker
                                        disabled={isSubmitting}
                                        label={t('t_update_field_date')}
                                        inputFormat="MM/DD/YYYY"
                                        value={datePicker}
                                        onChange={(value) => {
                                            setDatePicker(value);
                                        }}
                                        helperText={touched.date ? errors.date : ''}
                                        error={Boolean(touched.date && errors.date)}
                                        renderInput={(params) => <TextField variant={'filled'} {...params} />}
                                    />

                                    <TextField
                                        disabled={isSubmitting}
                                        type={'text'}
                                        name={'name'}
                                        value={values.name}
                                        helperText={touched.name ? errors.name : ''}
                                        error={Boolean(touched.name && errors.name)}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        fullWidth
                                        label={t('t_update_field_name')}
                                        variant="filled"
                                    />

                                    <TextField
                                        disabled={isSubmitting}
                                        type={'text'}
                                        name={'desc'}
                                        value={values.desc}
                                        helperText={touched.desc ? errors.desc : ''}
                                        error={Boolean(touched.desc && errors.desc)}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        fullWidth
                                        multiline
                                        minRows={5}
                                        maxRows={10}
                                        label={t('t_update_field_desc')}
                                        variant="filled"
                                    />

                                    <Box>
                                        <Button
                                            type={'submit'}
                                            disableElevation
                                            variant={'contained'}
                                            size={'medium'}
                                            color={'primary'}
                                            disabled={isSubmitting}
                                            startIcon={isSubmitting ? (
                                                <CircularProgress sx={{
                                                    mr: 0.5,
                                                    height: '18px !important',
                                                    width: '18px !important'
                                                }}/>
                                            ) : (
                                                <DoneOutlined sx={{
                                                    height: 18
                                                }}/>
                                            )}
                                        >
                                            {t('t_btn_save')}
                                        </Button>
                                    </Box>
                                </Stack>
                            </Box>
                        </FormGroup>
                    </form>
                )}
            </Formik>
        </BaseLayout>
    );
}

UpdatePage.propTypes = {
    isUpdate: PropTypes.bool,
};
