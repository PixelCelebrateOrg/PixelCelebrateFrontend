import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";


const endpoint = {
    user: '/api/User'
};


function addUser(user, callback){
    let request = new Request(HOST.backend_api + endpoint.user + "/CreateUser" , {
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

function updateUser(user, callback){
    let request = new Request(HOST.backend_api + endpoint.user + "/UpdateUser" , {
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

function deleteUser(email, callback){
    let request = new Request(HOST.backend_api + endpoint.user + "/DeleteUser" , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(email)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

function SetDay(numberOfDays, callback){
    let request = new Request(HOST.backend_api + endpoint.user + "/SetDay" , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(numberOfDays)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

function getUsers(callback) {
    let request = new Request(HOST.backend_api + endpoint.user + "/GetAllUsers", {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getUsersAngajat(callback) {
    let request = new Request(HOST.backend_api + endpoint.user + "/GetAllUsersAngajat", {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getDateAngajat(email, callback){
    let request = new Request(HOST.backend_api + endpoint.user + "/GetDateAngajat" , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(email)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}


export {
    addUser,
    updateUser,
    deleteUser,
    getUsers,
    getUsersAngajat,
    getDateAngajat,
    SetDay,
};
