var token = localStorage.getItem('token');

if (localStorage.getItem("token") === null) {
    window.location.href = "login.html";
}
function changePassword() {
    var title = document.getElementById("title").value;
    var body = document.getElementById("body").value;
    var data = { title: title, body: body };
    if (title == "") {
        alert("Please input title")
    }
    if (body == "") {
        alert("Please comfirm Details")
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
                alert("Push notification succes!!")
                window.location.href = "notification.html";
            })
            .catch((error) => {
                console.log(error)
            });
    }
}

var submitBtn = document.getElementById('btn-password');
submitBtn.addEventListener('click', changePassword);

