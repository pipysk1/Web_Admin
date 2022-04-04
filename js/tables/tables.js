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
        .then(function(response) {
            hideLoading()
            return response.json();
        }).then(callback);
}
var data = []


function renderProducts(products) {
    var tbody = document.querySelector('#data');
    var seq = 0;

    data = products;
    console.log(data);
    for (let i = 0; i < data.length; i++) {
        tbody.innerHTML +=
            `<tr>
        <th>${seq += 1}</td>
        <th >${data[i].name}</th>
        <th >${data[i].status}</th>
        <th >${data[i].old_price}</th>
        <th >${data[i].price}</th>
        <th >${data[i].gender}</th>
        <th >${data[i].type}</th>
        <th><img style="width:70%;height:100px" src="${data[i].src}"/></th>
        <th><button id="myBtn" onclick="handleEditProduct('${data[i].product_id}')">Sửa</button></th>
        <th><button onclick="handleDeleteProduct()">Xóa</button></th>
        <th><button onclick="handleAddVariant('${data[i].product_id}')">Tạo loại sản phẩm</button></th>
        </tr>
        `
    }
}

function handleDeleteProduct() {

    alert("đang update")
}

function handleAddVariant(id) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].product_id == id) {
            localStorage.setItem('id', data[i].product_id);
            window.location.href = "addVariant.html";
        }
    }
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
    btnAddProducts.onclick = function() {
        window.location.href = "addProduct.html";
    }
}