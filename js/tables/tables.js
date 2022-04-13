// showing loading
var token = localStorage.getItem('token');
// console.log(token);
var url = 'https://hieuhmph12287-lab5.herokuapp.com/'
var fasionApi = 'https://hieuhmph12287-lab5.herokuapp.com/products/getProducts?token=' + token;
var addProductApi = 'https://hieuhmph12287-lab5.herokuapp.com/products/addProduct?token=' + token;

function start() {
    getAllProducts(renderProducts);
    pagesAddProduct();

}
start();

async function getAllProducts(callback) {
    displayLoading()
    await fetch(url + 'products/getProducts' + '?token=' + token)
        .then(function (response) {
            hideLoading()
            return response.json();
        }).then(callback);
}
var data = []


function renderProducts(products) {
    var tbody = document.querySelector('#data');
    var seq = 0;

    data = products;

    $('#tableHome').on('click', '.Mybtn', function () {

        var RowIndex = $(this).closest('tr');
        var data = Dtable.row(RowIndex).data();
        alert(data[1]);
    });
    $('#tableHome').DataTable({
        "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],

        data: data,


        columns: [
            {
                "data": null, "render": function (data, type, full, meta) {
                    return meta.row + 1;
                }
            },
            { data: 'name' },
            { data: 'status' },
            { data: 'old_price' },
            { data: 'price' },
            { data: 'gender' },
            { data: 'type' },
            {
                "data": "src",
                "render": function (data) {
                    var img = data;
                    return '<img src="' + img + '" height="150px" width="150px" >';
                }
            },
            {
                "data": null,
                "render": function (data, type, row) {
                    return `<div class="text-center">
                    <button class='btn btn-primary text-white' style='cursor:pointer; width:50px;'onclick="handleDetailPrroduct('${data.product_id}')" >
                       <i class='far fa-trash-alt'></i> Xem 
                    </button></div>
                `;
                }, "width": "5%"
            },
            {
                "data": null,
                "render": function (data, type, row) {
                    return `<div class="text-center">
                    <button class='btn btn-info text-white' style='cursor:pointer; width:50px;' onclick="handleEditProduct('${data.product_id}')" >
                       <i class='far fa-trash-alt'></i> Sửa
                    </button></div>
                `;
                }, "width": "5%"
            },
            {
                "data": null,
                "render": function (data, type, row) {
                    return `<div class="text-center">
                    <button class='btn btn-danger text-white' style='cursor:pointer; width:50px;'  onclick="handleDeleteProduct('${data.product_id}')" >
                       <i class='far fa-trash-alt'></i> Xóa
                    </button></div>
                `;
                }, "width": "5%"
            },
            {
                "data": null,
                "render": function (data, type, row) {
                    return `<div class="text-center">
                    <button class='btn btn-success text-white' style='cursor:pointer; width:150px;'  onclick="handleAddVariant('${data.product_id}')" >
                       <i class='far fa-trash-alt'></i> Tạo loại sản phẩm
                    </button></div>
                `;
                }, "width": "5%"
            }
        ],



        "pageLength": 5
    });


}


function reFresh() {
    window.open(location.reload(true))
}
window.setInterval("reFresh()", 30000);

function handleDeleteProduct(id) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].product_id == id) {
            console.log(id);
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "product_id": id
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            var result = confirm("Bạn có muốn xóa sản phẩm: " + data[i].name)
            fetch(url + 'products/hideProduct' + '?token=' + token, requestOptions)
                .then(response => {
                    if (result == true) {
                        if (!response.ok) {
                            alert("Xóa không thành công sản phẩm: " + data[i].name);
                        } else {
                            alert("Xóa thành công sản phẩm: " + data[i].name);
                            reFresh();
                        }
                    }

                })
                .catch(error => console.log('error', error));
        }
    }

}




function handleDetailPrroduct(id) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].product_id == id) {
            localStorage.setItem('id', data[i].product_id);
            window.location.href = "detailProduct.html";
        }
    }
}

function handleAddVariant(id) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].product_id == id) {
            localStorage.setItem('id', data[i].product_id);
            window.location.href = "addVariant.html";
        }
    }
}

//xem
function showAllType(id){
    displayLoading();
    var formData = new FormData();
    formData.append("product", id);

    var requestOptions = {
        method: 'GET',
        body: formData,
        redirect: 'follow'
    };
    fetch(url + "products/addProduct?token=" + token, requestOptions)
        .then(response => {
            if (!response.ok) {
                hideLoading()
                alert("Không tìm thấy sản phẩm");
                throw new Error('Network response was not OK');

            } else {
                hideLoading()
                window.location.href = "home.html";
                return response.text();
            }

        })
}


function handleEditProduct(id) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].product_id == id) {
            localStorage.setItem('id', data[i].product_id);
            window.location.href = "updateProduct.html";
        }
    }
}


function pagesAddProduct() {
    var btnAddProducts = document.querySelector('.form-submit');
    btnAddProducts.onclick = function () {
        window.location.href = "addProduct.html";
    }
}