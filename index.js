
const axios = require('axios'); 
const _ = require('lodash'); 

axios.get('https://keep.google.com/v1/keep/list',  { 
    headers: {
        'Authentication': 'Bearer AUTH_TOKEN'
    }
})
.then(response => {
    const keeps = response.data; 
    _.each(keeps, keep => {
        console.log(keep); 
    }); 
})
.catch(err => {
    console.log(err); 
});