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

                $('#table2').DataTable({

                    "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
                    data: data,

                    columns: [
                        {
                            "data": null, "render": function (data, type, full, meta) {
                                return meta.row + 1;
                            }
                        },
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
                    initComplete: function () {
                        this.api().columns([1, 2, 3, 7, 4, 5]).every(function () {
                            var column = this;
                            var select = $('<select><option value=""></option></select>')
                                .appendTo($(column.footer()).empty())
                                .on('change', function () {
                                    var val = $.fn.dataTable.util.escapeRegex(
                                        $(this).val()
                                    );

                                    column
                                        .search(val ? '^' + val + '$' : '', true, false)
                                        .draw();
                                });

                            column.data().unique().sort().each(function (d, j) {
                                select.append('<option value="' + d + '">' + d + '</option>')
                            });

                        });
                    },

                    "pageLength": 5
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
    console.log(data)
    for (let i = 0; i < data.length; i++) {
        if (data[i].bill_id == id)
            localStorage.setItem('id_bill', data[i].bill_id)
        window.location.href = "editBill.html";


    }


}
