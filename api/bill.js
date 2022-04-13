var token = localStorage.getItem('token');
var data = [];
var current_page = 1;
var records_per_page = 5;
var editor;
document.addEventListener("DOMContentLoaded", function () {
    var xhr = new XMLHttpRequest();
    displayLoading();
    xhr.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                hideLoading();
                data = JSON.parse(this.responseText);
                $('#table2').DataTable({
                    "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
                    data: data,

                    columns: [
                        { data: 'bill_id' },
                        { data: 'name_receiver' },
                        { data: 'phone_number' },
                        { data: 'address_detail' },
                        { data: 'status' },
                        { data: 'discount_value' },
                        { data: 'date_created' },
                        { data: 'payment_type' },
                    ],
                    "aoColumnDefs": [
                        {
                            "aTargets": [8],
                            "mData": "userId",
                            "mRender": function (data, type, full) {
                                return '<a href="editBill.html"   class="fa fa-edit fa-fw"></a>';
                            }
                        }
                    ],

                    "pageLength": 5
                });
                $('#table2 tbody').on('click', 'button', function () {
                    var data = table.row($(this).parents('tr')).data();
                    console.log(data);
                    $('#userEditModal').modal('show');
                });


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
function prevPage() {
    if (current_page > 1) {
        current_page--;
        changePage(current_page);
    }
}

function nextPage() {
    if (current_page < numPages()) {
        current_page++;
        changePage(current_page);
    }
}

function changePage(page) {
    var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");
    var listing_table = document.getElementById("main_table");
    var page_span = document.getElementById("page");

    // Validate page
    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();

    listing_table.innerHTML = "";

    for (var i = (page - 1) * records_per_page; i < (page * records_per_page) && i < data.length; i++) {
        document.querySelector("#main_table").innerHTML += `<tr>
		<th scope="row">${data[i].bill_id.slice(0, 6)}</th>
    <td>${data[i].product[0].name}</td>
		<td>${data[i].phone_number}</td>
        <td>${data[i].address_detail}</td>
		<td>${data[i].status}</td>
		<td>${data[i].discount_value}</td>
        <td>${data[i].date_created}</td>
		<td>${data[i].payment_type}</td>
		<td ><a href="editBill.html"   onclick="detailBill('${data[i].bill_id}')" class="fa fa-edit fa-fw"></a></td>
	</tr>`;
    }
    page_span.innerHTML = page + "/" + numPages();

    if (page == 1) {
        btn_prev.style.visibility = "hidden";
    } else {
        btn_prev.style.visibility = "visible";
    }

    if (page == numPages()) {
        btn_next.style.visibility = "hidden";
    } else {
        btn_next.style.visibility = "visible";
    }
}

function numPages() {
    return Math.ceil(data.length / records_per_page);
}

window.onload = function () {
    changePage(1);
};

function myFunction() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("dataTables-example");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[2];
        console.log(td)
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

