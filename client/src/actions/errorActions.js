import { GET_ERRORS, CLEAR_ERRORS } from './types';

export const returnErrors = (msg, status, id = null) => {
    return{
        type: GET_ERRORS,
        payload: { msg, status, id }
    };
};

export const clearErrors = () => {
    return{
        type: CLEAR_ERRORS
    };
};

export const tokenConfig = getState => {
    const token = getState().auth.token;
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    if(token){
        config.headers['x-auth-token'] = token;
    }
    return config;
}