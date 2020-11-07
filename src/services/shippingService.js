import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjAxQ0VDMTkwLTBCMzgtMTFFQi1CRDg4LTIxQTJBOTE2RjJDNSIsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYwMjM2MjI1NCwiZXhwIjoxNjA0OTU0MjU0fQ.qe_inikq-F-2wNVbIAdmbTvNDZnhpA5c9RT31ALEBhU';

export const storeShippings = ( endpoint, shipping ) => {

    let json = JSON.stringify(shipping);
    let params = "json=" + json;

    return axios.post(`${ baseUrl }/${ endpoint }`, params, { headers: {'Authorization': token}} )
    .then(response => {

        return response.data;
    })
    .catch(error => {
        console.log(error);
        return error;
    });
}

export const getShipping = ( endpoint ) => {
    
    return axios.get(`${ baseUrl }/${ endpoint }`, { headers: {'content-type': 'application/json', 'Authorization': token}} )
    .then(response => {

        return response.data;
    })
    .catch(error => {
        console.log(error);
        return error;
    })
}

export const updateShipping = ( endpoint, shipping, id ) => {

    let json = JSON.stringify(shipping);
    let params = "json=" + json;

    return axios.put(`${ baseUrl }/${ endpoint }/${ id }`, params, { headers: {"Content-Type": "multipart/form-data",'Authorization': token}} )
    .then(response => {

        return response.data;
    })
    .catch(error => {
        console.log(error);
        return error;
    })
}

export const deleteShipping = ( endpoint, shipping) => {

    let json = JSON.stringify(shipping);
    let params = 'json=' + json;

    return axios.delete(`${ baseUrl }/${ endpoint }`, params, { headers: {'Authorization': token}} )
    .then(response => {

        return response.data;
    })
    .catch(error => {
        console.log(error);
        return error;
    })
}