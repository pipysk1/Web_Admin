var token = localStorage.getItem('token');
var data = [];
document.addEventListener("DOMContentLoaded", function() {
    var xhr = new XMLHttpRequest();
    displayLoading();
    xhr.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status === 200) {
                hideLoading();
                data = JSON.parse(this.responseText);
                console.log(data)
                for (let i = 0; i < data.length; i++) {
                    document.querySelector("#dataTables-example").innerHTML += `<tr>
		<th scope="row">${data[i].bill_id}</th>
    <td>${data[i].product[0].name}</td>
		<td>${data[i].phone_number}</td>
		<td>${data[i].status}</td>
		<td>${data[i].discount_value}</td>
		<td>${data[i].payment_type}</td>
		<td ><a href="editBill.html"   onclick="detailBill('${data[i].bill_id}')" class="fa fa-edit fa-fw"></a></td>
	</tr>`;
                }
            }
        }
    };
    xhr.open(
        "GET",
        "https://hieuhmph12287-lab5.herokuapp.com/bills/getBills?token=" + token
    );
    xhr.send();
});
// href="/pages/editBill.html" 
function detailBill(id) {

    for (let i = 0; i < data.length; i++) {
        if (data[i].bill_id == id)
            localStorage.setItem('id_bill', data[i].bill_id)
            
    
    }

}