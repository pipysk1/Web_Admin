
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
                    document.querySelector("#dataTables-example").innerHTML += `<tr>
		<th scope="row">${data[i].bill_id}</th>
        <td>${data[i].product[0].name}</td>
		<td>${data[i].phone_number}</td>
		<td>${data[i].status}</td>
		<td>${data[i].discount_id}</td>
		<td>${data[i].payment_type}</td>
		<td ><a href="/pages/editBill.html" class="fa fa-edit fa-fw"></a></td>
		<td ><a href="/pages/editBill.html" class="fa-trash"></a></td>
	</tr>`;
                }
                for (let i = 0; i < data.product.length; i++) {
                    document.querySelector("#dataTables-example").innerHTML += `<tr>
		<td>${data.product[i].name}</td>
	</tr>`;
                }
                console.log(data.product[i].name);
            }
        }
    };
    xhr.open(
        "GET",
        "https://hieuhmph12287-lab5.herokuapp.com/bills/getProcessBills?token=" + token
    );
    xhr.send();
});
