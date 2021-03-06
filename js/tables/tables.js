var token = localStorage.getItem('token');


if (localStorage.getItem("token") === null) {
    window.location.href = "login.html";
    localStorage.removeItem("token");
}
var url = 'https://hieuhmph12287-lab5.herokuapp.com/'
var fasionApi = 'https://hieuhmph12287-lab5.herokuapp.com/products/getProducts?token=' + token;
var addProductApi = 'https://hieuhmph12287-lab5.herokuapp.com/products/addProduct?token=' + token;

function start() {
    getAllProducts();
    pagesAddProduct();

}
start();

var charactersList = document.getElementById('data');
var searchBar = document.getElementById('searchBar');
var data = [];



async function getAllProducts() {

    try {
        displayLoading()
        var res = await fetch(url + 'products/getProducts' + '?token=' + token);
        data = await res.json();
        displayCharacters(data);
        hideLoading()
    } catch (err) {
        console.error(err);
    }
}


function displayCharacters(characters) {
    var seq = 0;

    var tbody = characters
        .map((character) => {
            var price = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(character.price);
            var old_price = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(character.old_price);

            return ` <tr>
            <th>${seq++}</th>
            <th>${character.name}</th>
            <th>${character.status}</th>
            <th>${old_price}</th>
            <th>${price}</th>
            <th>${character.gender}</th>
            <th>${character.type}</th>
            <th><img src="${character.src}" height="100px" width="70px" /></th>
            <th><button class='btn btn-primary text-white' style='cursor:pointer; width:50px;'onclick="handleDetailPrroduct('${character.product_id}')"><i class='far fa-trash-alt'>Xem</i></button></th>
            <th> <button class='btn btn-info text-white' style='cursor:pointer; width:50px;' onclick="handleEditProduct('${character.product_id}')" ><i class='far fa-trash-alt'></i> Sửa</button></th>
            <th> <button class='btn btn-danger text-white' style='cursor:pointer; width:50px;'  onclick="handleDeleteProduct('${character.product_id}')"><i class='far fa-trash-alt'></i> Xóa</button></th>
            <th> <button class='btn btn-success text-white' style='cursor:pointer; width:150px;'  onclick="handleAddVariant('${character.product_id}')"<i class='far fa-trash-alt'></i> Tạo loại sản phẩm</button></th>
            </tr>`

        })
        .join('');
    charactersList.innerHTML = tbody;
};

function reFresh() {
    window.open(location.reload(true))
}
window.setInterval("reFresh()", 30000);

function handleDeleteProduct(id) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].product_id == id) {

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
            if (result == true) {
                fetch(url + 'products/hideProduct' + '?token=' + token, requestOptions)
                    .then(response => {

                            if (!response.ok) {
                                alert("Xóa không thành công sản phẩm: " + data[i].name);
                            } else {
                                alert("Xóa thành công sản phẩm: " + data[i].name);
                                reFresh();
                            }
                        }

                    ).catch(error => console.log('error', error));
            }

        }
    }

}
searchBar.addEventListener('keyup', (e) => {
    var searchString = e.target.value.toLowerCase();
    var filteredCharacters = data.filter((character) => {
        return (
            character.name.toLowerCase().includes(searchString) ||
            character.gender.toLowerCase().includes(searchString) ||
            character.status.toLowerCase().includes(searchString) ||
            character.type.toLowerCase().includes(searchString)
        );
    });
    displayCharacters(filteredCharacters);
});


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
function showAllType(id) {
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
    btnAddProducts.onclick = function() {
        window.location.href = "addProduct.html";
    }
}