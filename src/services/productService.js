import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

//saliendo del apuro
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjBCMzlBQ0MwLTIzRDYtMTFFQi05MzlELUUzNjc1MEQxRDlBMiIsInVzZXJuYW1lIjoiZHZwZXJnYSIsImVtYWlsIjoiZGllZ29AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjA1MDY4Nzk3LCJleHAiOjE2MDc2NjA3OTd9.ud-hY6kHE1O4a-dPyorw4PvHgzvF2B130y2xe1y6ozQ';




export const storeProducts = (endpoint, product) => { // por el momento solo un parametro luego tendremos que mandar el token

    let json = JSON.stringify(product);
    let params = "json=" + json;

    return axios.post(`${baseUrl}/${endpoint}`, params, { headers: { 'Authorization': token } })
        .then(response => {
            console.log(response);
            return response.data;

        })

        .catch(error => {
            console.log(error);
            return error;
        });
}

export const updateProducts = (endpoint, product) => { // por el momento solo un parametro luego tendremos que mandar el token

    let json = JSON.stringify(product);
    let params = "json=" + json;

    return axios.put(`${baseUrl}/${endpoint}`, params, { headers: { 'Authorization': token } })
        .then(response => {
            console.log(response);
            return response.data;

        })

        .catch(error => {
            console.log(error);
            return error;
        });
}

export const deleteProducts = (endpoint) => { // por el momento solo un parametro luego tendremos que mandar el token

    return axios.delete(`${baseUrl}/${endpoint}`, { headers: { 'Authorization': token } })
        .then(response => {
            console.log(response);
            return response.data;

        })

        .catch(error => {
            console.log(error);
            return error;
        });
}

export const uploadProduct = (endpoint, file0) => { // por el momento solo un parametro luego tendremos que mandar el token

    let formData = new FormData();

    formData.append("file0", file0);

    return axios.post(`${baseUrl}/${endpoint}`, formData, { headers: { "Content-Type": "multipart/form-data", 'Authorization': token } })
        .then(response => {

            return response.data;

        })

        .catch(error => {
            console.log(error);
            return error;
        });
}

export const getProducts = (endpoint) => { // por el momento solo un parametro luego tendremos que mandar el token

    return axios.get(`${baseUrl}/${endpoint}`, { headers: { 'Content-Type': 'application/json', 'Authorization': token } })
        .then(response => {

            return response.data;

        })

        .catch(error => {
            console.log(error);
            return error;
        });
}

export const getMaterialByProduct = (endpoint) => { // por el momento solo un parametro luego tendremos que mandar el token

    return axios.get(`${baseUrl}/${endpoint}`, { headers: { 'Content-Type': 'application/json', 'Authorization': token } })
        .then(response => {

            return response.data;

        })

        .catch(error => {
            console.log(error);
            return error;
        });
}