// showing loading



var token = localStorage.getItem('token');
// console.log(token);
var fasionApi = 'https://hieuhmph12287-lab5.herokuapp.com/products/getProducts?token=' + token;
var addProductApi = 'https://hieuhmph12287-lab5.herokuapp.com/products/addProduct?token=' + token;

function start() {
    getAllProducts(renderProducts);

}
start();

async function getAllProducts(callback) {
    displayLoading()
    await fetch(fasionApi)
        .then(function(response) {
            hideLoading()
            return response.json();
        }).then(callback);
}

function renderProducts(products) {
    var tbody = document.querySelector('#data');
    var seq = 0;

    var htmls = products.map(function(product) {
        return `
        <tr>
        <th>${seq += 1}</th>
        <th>${product.name}</th>
        <th>${product.status}</th>
        <th>${product.old_price}</th>
        <th>${product.price}</th>
        <th>${product.gender}</th>
        <th>${product.type}</th>
        <th><img style="width:70%;height:100px" src="${product.src}"/></th>
        <th><button id="edit">Sửa</button></th>
        <th><button id="delete">Xóa</button></th>

        </tr>
        `

    });
    tbody.innerHTML = htmls.join('');
    handleDeleteProduct();
}

function handleDeleteProduct() {
    var deleteProduct = document.getElementById('delete');
    console.log(deleteProduct);
    deleteProduct.onclick = function(e) {
        e.preventDefault();
        alert("Chức năng này đang được phát triển");
    }
}

function handleEditProduct() {

}