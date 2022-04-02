
var token = localStorage.getItem('token');

document.addEventListener("DOMContentLoaded", function () {
    var xhr = new XMLHttpRequest();
    displayLoading();
    xhr.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                hideLoading();
                var data = JSON.parse(this.responseText);
                for (let i = 0; i < data.length; i++) {
                    document.querySelector("#main_table").innerHTML += `<tr>
		<th scope="row">${data[i]._id}</th>
        <td>${data[i].email}</td>
		<td>${data[i].phone_number}</td>
		<td>${data[i].full_name}</td>
		<td ><a href="/pages/editBill.html" class="fa fa-edit fa-fw"></a></td>
		<td ><a href="/pages/editBill.html" class="fa-trash"></a></td>
	</tr>`;
                }
            }
        }
    };
    xhr.open(
        "GET",
        "https://hieuhmph12287-lab5.herokuapp.com/users/getAllUsers?token=" + token
    );
    xhr.send();
});
