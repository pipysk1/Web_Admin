var token = localStorage.getItem('token');


function changePassword() {
    var inputPass = document.getElementById("changePass").value;
    var confirm_password = document.getElementById("confirm_password").value;
    var data = { password: inputPass };
    if (inputPass == "") {
        alert("please input password")
    }
    if (confirm_password == "") {
        alert("please comfirm password")
    }
    else {
        fetch('https://hieuhmph12287-lab5.herokuapp.com/admins/changePassword?token=' + token, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                alert("change password succes!!")
                window.location.href = "home.html";
            })
            .catch((error) => {
                console.error('Error:', error);
                alert("change password error")
            });
    }
}

var submitBtn = document.getElementById('btn-password');
submitBtn.addEventListener('click', changePassword);

var check = function () {
    if (document.getElementById('changePass').value ==
        document.getElementById('confirm_password').value) {
        document.getElementById('message').style.color = 'green';
        document.getElementById('message').innerHTML = 'matching';
    } else {
        document.getElementById('message').style.color = 'red';
        document.getElementById('message').innerHTML = 'not matching';
    }
}