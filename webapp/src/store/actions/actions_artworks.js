import axios from "../../axios-orders";
import * as actionTypes from "./actions_names";

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

        const id = parseInt(Math.random() * 1000000);
        const url = '/artwork/' + id + '.json';
        console.log(url);

        axios.put(url, formData)

       // axios.put('/artwork/1.json', formData)
            .then(response => {
                dispatch(artworksSendSuccess(response.data.name, formData));
            })
            .catch(error => {
                dispatch(artworksFail(error));
            });
    };
};

export const getData = (id = null, limit = null) => {
    return dispatch => {
        dispatch(artworksStart());
        let url = "/artwork";
        if(id) url += "/" + id;
        url += ".json";

        axios.get(url)
            .then(response => {
                let data = response.data;
                if(limit){
                    // let data2 = data.slice(0, limit);
                    // console.log(data2);
                    console.log("A MODIFIER : actions_artwork");
                    console.log(data);
                }

                dispatch(artworksGetSuccess(data));
            })
            .catch(error => {
                console.log("error");
                dispatch(artworksFail(error));
            });

    };

};

