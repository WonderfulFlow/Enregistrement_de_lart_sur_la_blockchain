import axios from "../../axios-orders";
import * as actionTypes from "./actions_names";
import {Button, Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@material-ui/core";
import React from "react";

export const artworksStart = () => {
    return {
        type: actionTypes.artworks_START
    };
};

export const artworksSendSuccess = (id, formData) => {
    return {
        type: actionTypes.artworks_SEND_SUCCESS,
        dataID: id,
        formData: formData
    };
};

export const artworksGetSuccess = (data) => {
    return {
        type: actionTypes.artworks_GET_SUCCESS,
        data: data,
    };
};

export const artworksFail = (error) => {
    return {
        type: actionTypes.artworks_FAIL,
        error: error
    };
};

export const sendData = (formData) => {
    return dispatch => {
        dispatch(artworksStart());

        axios.post('/artwork.json', formData)
            .then(response => {
                dispatch(artworksSendSuccess(response.data.name, formData));
            })
            .catch(error => {
                dispatch(artworksFail(error));
            });
    };
};

export const getData = () => {
    return dispatch => {
        dispatch(artworksStart());

        axios.get('/artwork.json')
            .then(response => {
                dispatch(artworksGetSuccess(response.data));
            })
            .catch(error => {
                dispatch(artworksFail(error));
            });

    };
};


