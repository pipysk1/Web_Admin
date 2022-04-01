
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
    <td>${data[i].product}</td>
		<td>${data[i].phone_number}</td>
		<td>${data[i].status}</td>
		<td>${data[i].discount_id}</td>
		<td>${data[i].payment_type}</td>
		<td ><a href="/pages/editBill.html" class="fa fa-edit fa-fw"></a></td>
		<td ><a href="/pages/editBill.html" class="fa-trash"></a></td>
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
