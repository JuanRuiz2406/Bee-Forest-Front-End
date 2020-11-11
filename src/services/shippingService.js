import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjBCMzlBQ0MwLTIzRDYtMTFFQi05MzlELUUzNjc1MEQxRDlBMiIsInVzZXJuYW1lIjoiZHZwZXJnYSIsImVtYWlsIjoiZGllZ29AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjA1MDY4Nzk3LCJleHAiOjE2MDc2NjA3OTd9.ud-hY6kHE1O4a-dPyorw4PvHgzvF2B130y2xe1y6ozQ';

export const storeShippings = (endpoint, shipping) => {

    let json = JSON.stringify(shipping);
    let params = "json=" + json;

    return axios.post(`${baseUrl}/${endpoint}`, params, { headers: { 'Authorization': token } })
        .then(response => {

            return response.data;
        })
        .catch(error => {
            console.log(error);
            return error;
        });
}

export const getShippings = (endpoint) => {

    return axios.get(`${baseUrl}/${endpoint}`, { headers: { 'content-type': 'application/json', 'Authorization': token } })
        .then(response => {

            return response.data;
        })
        .catch(error => {
            console.log(error);
            return error;
        })
}

export const updateShipping = (endpoint, shipping) => {

    let json = JSON.stringify(shipping);
    let params = "json=" + json;

    return axios.put(`${baseUrl}/${endpoint}`, params, { headers: { 'Authorization': token } })
        .then(response => {

            return response.data;
        })
        .catch(error => {
            console.log(error);
            return error;
        })
}

export const deleteShipping = (endpoint) => {

    return axios.delete(`${baseUrl}/${endpoint}`, { headers: { 'Authorization': token } })
        .then(response => {

            return response.data;
        })
        .catch(error => {
            console.log(error);
            return error;
        })
}