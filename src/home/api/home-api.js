import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";



const endpoint = {
    //home: '/user'
};


function loginUser(user, callback){
    let request = new Request(HOST.backend_api + "/api/User" + "/login" , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

function registerUser(user, callback){
    let request = new Request(HOST.backend_api + "/register" , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

// function logoutUser(callback){
//     let request = new Request(HOST.backend_api + "/logout" , {
//         method: 'POST',
//         headers : {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//         },
//         //body: JSON.stringify()
//     });

//     console.log("URL: " + request.url);

//     RestApiClient.performRequest(request, callback);
// }

function getUserData(callback) {
    let request = new Request(HOST.backend_api + endpoint.home + "/loggedUserData", {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

export {
    loginUser,
    //logoutUser,
    getUserData,
    registerUser
};


