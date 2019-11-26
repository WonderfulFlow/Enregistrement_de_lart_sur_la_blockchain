import * as actionTypes from "./actions_names";
import tile from "../../components/Tile/Tile";

export const uploadStart = () => {
    return {
        type: actionTypes.upload_START
    };
};

export const uploadSuccess = (uploadedImage, original_height, original_width) => {
    return {
        type: actionTypes.upload_SUCCESS,
        uploadedImage: uploadedImage,
        original_height: original_height,
        original_width: original_width
    };
};

export const uploadFail = (error) => {
    return {
        type: actionTypes.upload_FAIL,
        error: error
    };
};

const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
};

const checkFileValidity = (event) => {
    const files = event.target.files;

    return (files[0] && files.length === 1 && files[0].name.match(/.(jpg|jpeg|png|gif)$/i));
};

const getImageDimensions = (file) => {
    return new Promise (function (resolved, rejected) {
        const i = new Image();
        i.onload = function(){
            resolved({
                width: i.width,
                height: i.height
            })
        };
        i.src = file
    })
};

export const uploadImage = (event) => {
    return dispatch => {
        dispatch(uploadStart());

        let check = false;

        if (event.target.files.length !== 0) {
            if (checkFileValidity(event)) {
                getBase64(event.target.files[0])
                    .then(base64 => {
                        getImageDimensions(base64)
                            .then(response => {
                                check = true;

                                dispatch(uploadSuccess(base64, response.height, response.width));
                            })
                    })
            }
        }

        if (check) {
            dispatch(uploadFail());
        }
    }
};