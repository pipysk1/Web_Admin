var fasionApi = 'https://hieuhmph12287-lab5.herokuapp.com/products/getProducts?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjIzZGM0ZjFjNDgxOTYwMDIzZmZlYjM2IiwidXNlcm5hbWUiOiJtYWljb2RlIiwiaWF0IjoxNjQ4MjE1MjgyLCJleHAiOjE2NDgzMDE2ODJ9.x-HwJGcASiFehIyvKBcIofoy8SVyPw2ccbuaIeV-Cms'
var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjIzYzNjNDRkZjI4ZGEwMDIzZmUyNzBkIiwidXNlcm5hbWUiOiJtYWlhZG1pbiIsImlhdCI6MTY0ODExNDc1NiwiZXhwIjoxNjQ4MjAxMTU2fQ.zeigEov5LNLUHV2UdClTSXG65VOt_dSrG4mLtGO90wI'

function start() {
    getAllProducts(renderProducts);
}
start();

async function getAllProducts(callback) {
    await fetch(fasionApi)
        .then(function(response) {
            return response.json();
        }).then(callback);
}

function renderProducts(products) {
    var listProducts = document.querySelector('#list-products');
    var tableHead = document.querySelector('thead');
    var tBodyHead = document.querySelector('tbody');
    var tbody = document.querySelector('#data');
    var seq = 0;

    var htmls = products.map(function(product) {
        return `
        <tr>
        <th>${seq+=1}</th>
        <th>${product.name}</th>
        <th>${product.status}</th>
        <th>${product.old_price}</th>
        <th>${product.price}</th>
        <th>${product.gender}</th>
        <th>${product.type}</th>
        <th><img style="width:70%;height:100px" src="${product.src}"/></th>
        <th>"Xem"</th>
        <th>Edit</th>
        <th>Xóa</th>
        
        </tr>
        `

    });
    tbody.innerHTML = htmls.join('');
    // tableHead.innerHTML = htmls.join('');
}