var token = localStorage.getItem('token');
var data = [];
var current_page = 1;
var records_per_page = 5;

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
                        {
                            "data": null,
                            "render": function (data, type, row) {
                                return `<div class="text-center">
                                <button class='btn btn-primary text-white' style='cursor:pointer; width:50px;'onclick="detailBill('${data.product_id}')" >
                                   <i class='far fa-trash-alt'></i> Xem 
                                </button></div>
                            `;
                            }, "width": "5%"
                        },
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
        window.location.href = "editBill.html";


    }

}
