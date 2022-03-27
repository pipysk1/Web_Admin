document.addEventListener("DOMContentLoaded", function () {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        var data = JSON.parse(this.responseText);
        for (let i = 0; i < data.length; i++) {
          document.querySelector(".main_table").innerHTML += `<tr>
		<th scope="row">${data[i].bill_id}</th>
		<td>${data[i].name}</td>
		<td>${data[i].phone_number}</td>
		<td>${data[i].status}</td>
		<td>${data[i].discount_id}</td>
		<td>${data[i].payment_type}</td>
		<td ><a href="/pages/editBill.html" class="fa fa-edit fa-fw"></a></td>
		<td ><a href="/pages/editBill.html" class="fa-trash"></a></td>
	</tr>`;
        }
        console.log(data);
      }
    }
  };
  xhr.open(
    "GET",
    "https://hieuhmph12287-lab5.herokuapp.com/bills/getBills?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjIzYWQyMTMxMzhiNjUwMDIzNmMwZGM1IiwidXNlcm5hbWUiOiJhZG1pbiIsImlhdCI6MTY0ODI3NjQ2NywiZXhwIjoxNjQ4MzYyODY3fQ.O1Ai0THkZTe34OyouqsZ3u2wF7mxkn9BEPLT5m_CYjs"
  );
  xhr.send();
});
