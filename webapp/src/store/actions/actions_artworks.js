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
            .then(response => {
                console.log(response);
                dispatch(artworksSendSuccess(response.data.name, formData));
            })
            .catch(error => {
                console.log(error);
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

                if(!id){
                    data = Object.keys(data).map(key => {
                        console.log(key);
                        return {
                            id: key,
                            ...data[key]
                        }
                    });

                    if(limit && data.length > limit){
                        data = data.slice(0, limit);
                    }
                }

                dispatch(artworksGetSuccess(data));
            })
            .catch(error => {
                console.log("error");
                dispatch(artworksFail(error));
            });
    };
};

export const filterData = (event) => {
    const filter = event.target.value;

    return {
        type: actionTypes.artworks_FILTER,
        filter: filter
    };
};

