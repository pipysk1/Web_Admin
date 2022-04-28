var token = localStorage.getItem('token');

var id = localStorage.getItem('id');


var addVariant = document.getElementById('addVariant');
addVariant.onclick = function(e) {
    e.preventDefault();
    window.location.href = "addVariant.html";
}
var url = 'https://hieuhmph12287-lab5.herokuapp.com/'

getAllProducts(renderProducts);

async function getAllProducts(callback) {
    await fetch(url + 'products/getProducts' + '?token=' + token)
        .then(function(response) {
            return response.json();
        }).then(callback);
}

var data = []

function renderProducts(products) {
    var img = document.getElementById('img-detail');
    var name = document.getElementById('detail-product')

    var price = document.getElementById('price');
    var type = document.getElementById('type');
    var tbody = document.getElementById('data');


    var seq = 0;

    data = products;

    for (let i = 0; i < data.length; i++) {
        if (data[i].product_id == id) {
            var variant = data[i].variant;

            img.innerHTML += `
            <div class="card">
            <div class = "product-imgs">
            <img  src="${data[i].src}"/>
            </div>
            <div class="product-content">
            <h2 class ="product-title">${data[i].name}</h2>
           <div class="product-status" >
           <p  class = "product-status">${data[i].status}</p>
           </div>
           <div class="product-gender">
           <p class="product-gender">Gender:  <span>${data[i].gender}</span></p>

           </div>
           <div>
           <p class="product-gender">Type:  <span>${data[i].type}</span></p>
           </div>

           <div>
           <select data-id="value"></select>
           </div>

            <div class = "product-price">
            <p class = "last-price">Old Price: <span>${data[i].old_price}</span></p>
            <p class = "new-price">New Price: <span>${data[i].price}</span></p>
            </div>
            <div class = "product-detail">
            <h2>Product Description : </h2>
            <p>${data[i].product_detail}</p>
            </div>
            </div>
            `

            for (let i = 0; i < variant.length; i++) {
                tbody.innerHTML += `
            <tr>
            <th>${seq += 1}</th>
            <th>${variant[i].color}</th>
            <th>${variant[i].rgb}</th>
            <th>${variant[i].size}</th>
            <th>${variant[i].price}</th>
            <th>${variant[i].stock}</th>
            <th><img src="${variant[i].src}" style="width:70%;height:100px"/></th>
            <th><button id="myBtn" onclick="handleEditProduct('${variant[i].variant_id}')">Sửa</button></th>
            <th><button onclick="handleDeleteVariant('${variant[i].variant_id}')">Xóa</button></th>
            </tr>`
            }
        }
    }
}

function handleEditProduct(id) {
    localStorage.setItem('id_variant', id);
    window.location.href = "editVariant.html";
}

function handleDeleteVariant(id) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "variant_id": id
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    var result = confirm("Bạn có muốn xóa sản phẩm: " + id)
    if (result == true) {
        fetch(url + 'variants/hideVariant?token=' + token, requestOptions)
            .then(response => {
                if (result == true) {
                    if (!response.ok) {
                        alert('Xóa không thành công !')
                    } else {
                        alert('Xóa thành công.')
                    }
                }
            })
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

}