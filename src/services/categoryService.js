import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

//saliendo del apuro
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjAxQ0VDMTkwLTBCMzgtMTFFQi1CRDg4LTIxQTJBOTE2RjJDNSIsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYwMjM2MjI1NCwiZXhwIjoxNjA0OTU0MjU0fQ.qe_inikq-F-2wNVbIAdmbTvNDZnhpA5c9RT31ALEBhU';


export const getCategory= ( endpoint, categoryName ) => { // por el momento solo un parametro luego tendremos que mandar el token

    return axios.get( `${ baseUrl }/${ endpoint }/${ categoryName }`, { headers: {'Content-Type': 'application/json', 'Authorization': token}} )
    .then(response => {
 
    return response.data;

    })

    .catch(error => {
        console.log(error);
        return error;
    });            
}