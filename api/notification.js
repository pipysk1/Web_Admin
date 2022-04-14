var token = localStorage.getItem('token');

if (localStorage.getItem("token") === null) {
    window.location.href = "login.html";
}
function changePassword() {
    var title = document.getElementById("title").value;
    var body = document.getElementById("body").value;
    var data = { title: title, body: body };
    if (title == "") {
        alert("please input title")
    }
    if (body == "") {
        alert("please comfirm Details")
    }
    else {
        fetch('https://hieuhmph12287-lab5.herokuapp.com/notify/sendNotifyMultiUser?token=' + token, {
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
                window.location.href = "notification.html";
            })
            .catch((error) => {
                console.log('Success:', data);
                alert("change password succes!!")
                window.location.href = "notification.html";
            });
    }
}

var submitBtn = document.getElementById('btn-password');
submitBtn.addEventListener('click', changePassword);

