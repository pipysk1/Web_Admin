//call api login
function handleLogin(data) {
    var url = 'https://hieuhmph12287-lab5.herokuapp.com/'
    var username = data.username;
    var password = data.password;

    var myHeaders = new Headers();
    myHeaders.append("username", username);
    myHeaders.append("password", password);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("username", username);
    urlencoded.append("password", password);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    fetch(url + "admins/loginAdmin", requestOptions)
        .then(response => {
            if (!response.ok) {
                alert("Sai tài khoản hoặc mật khẩu");
            } else {
                alert("Đăng nhập thành công");
                window.location.href = "home.html";
                return response.text();
            }
        })
        .then(result => {
            var result = JSON.parse(result)
                // $(".notify").toggleClass("active");
                // $("#notifyType").toggleClass("success");
                // setTimeout(function() {
                //     $(".notify").removeClass("active");
                //     $("#notifyType").removeClass("success");
                // }, 2000);

            localStorage.setItem('token', result.token);


            // window.location.href = "home.html";
        })
        .catch(error => console.log('error', error));
    $(".notify").addClass("active");
    $("#notifyType").addClass("failure");

    setTimeout(function() {
        $(".notify").removeClass("active");
        $("#notifyType").removeClass("failure");
    }, 2000);
}