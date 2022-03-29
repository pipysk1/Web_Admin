// var userName = "clientID";
// var passWord = "secretKey";

// function authenticateUser(user, password) {
//     var token = user + ":" + password;

//     // Should i be encoding this value????? does it matter???
//     // Base64 Encoding -> btoa
//     var hash = btoa(token);

//     return "Basic " + hash;
// }

// function CallWebAPI() {

//     // New XMLHTTPRequest
//     var request = new XMLHttpRequest();
//     request.open("POST", "https://hieuhmph12287-lab5.herokuapp.com/admins/loginAdmin/", false);
//     request.setRequestHeader("Authorization", authenticateUser(userName, passWord));
//     request.send();
//     // view request status
//     alert(request.status);
//     response.innerHTML = request.responseText;
// }