var token = localStorage.getItem('token');
var data = [];
if (localStorage.getItem("token") === null) {
    window.location.href = "login.html";
}
document.addEventListener("DOMContentLoaded", function () {
    var xhr = new XMLHttpRequest();
    displayLoading();
    xhr.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                hideLoading();
                data = JSON.parse(this.responseText);

                $('#tableUser').DataTable({
                    "lengthMenu": [
                        [5, 10, 25, 50, -1],
                        [5, 10, 25, 50, "All"]
                    ],
                    data: data,

                    columns: [
                        { data: '_id' },
                        { data: 'email' },
                        { data: 'phone_number' },
                        { data: 'full_name' },
                        { data: 'address_detail' },
                        {
                            "data": null,
                            "render": function (data, type, row) {
                                return `<div class="text-center">
                                <button class='btn btn-primary text-white' style='cursor:pointer; width:50px;'onclick="detailUser('${data._id}')" >
                                <i class='fa fa-eye'></i> 
                                </button></div>
                            `;
                            },
                            "width": "5%"
                        },
                    ],

                    "pageLength": 5
                });
            }
        }
    };
    xhr.open(
        "GET",
        "https://hieuhmph12287-lab5.herokuapp.com/users/getAllUsers?token=" + token
    );
    xhr.send();
});

function detailUser(id) {

    for (let i = 0; i < data.length; i++) {
        if (data[i]._id == id) {
            localStorage.setItem('user_id', data[i]._id)
            window.location.href = "editUser.html";
        }



    }

}