import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

//saliendo del apuro
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjBCMzlBQ0MwLTIzRDYtMTFFQi05MzlELUUzNjc1MEQxRDlBMiIsInVzZXJuYW1lIjoiZHZwZXJnYSIsImVtYWlsIjoiZGllZ29AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjA1MDY4Nzk3LCJleHAiOjE2MDc2NjA3OTd9.ud-hY6kHE1O4a-dPyorw4PvHgzvF2B130y2xe1y6ozQ';


export const getMaterials = ( endpoint ) => { // por el momento solo un parametro luego tendremos que mandar el token
 
    return axios.get( `${ baseUrl }/${ endpoint }`, { headers: {'Content-Type': 'application/json', 'Authorization': token}} )
    .then(response => {
        
    return response.data;

    })

    .catch(error => {
        console.log(error);
        return error;
    });            
}

export const getMaterial = ( endpoint, materialName ) => { // por el momento solo un parametro luego tendremos que mandar el token
    
    return axios.get( `${ baseUrl }/${ endpoint }/${ materialName }`, { headers: {'Content-Type': 'application/json', 'Authorization': token}} )
    .then(response => {
    return response.data;

    })

    .catch(error => {
        console.log(error);
        return error;
    });            
}