var token = localStorage.getItem('token');

var id = localStorage.getItem('id');
console.log(id);

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
        // var name = document.getElementById('name');
    var price = document.getElementById('price');
    var type = document.getElementById('type');
    var tbody = document.getElementById('data');


    var seq = 0;

    data = products;

    for (let i = 0; i < data.length; i++) {
        if (data[i].product_id == id) {
            var variant = data[i].variant;
            console.log(variant_id);
            console.log(variant[i].product_id)
            img.innerHTML += `
            <img style="width:70%;" src="${data[i].src}"/>
`
            name.innerHTML += `
            <span style="font-size:24px" >${data[i].name}</span>
            <p style="font-size:22px;color:blue;margin-top:12px" >${data[i].price}</p>
            <p style="font-size:22px;margin-top:12px" >${data[i].gender}</p>
            <p style="font-size:22px;margin-top:12px" >${data[i].type}</p>
            <p style="font-size:22px;margin-top:12px" >${data[i].product_detail}</p>
            `

            for (let i = 0; i < variant.length; i++) {
                tbody.innerHTML += `
            <tr>
            <th>${seq+=1}</th>
            <th>${variant[i].color}</th>
            <th>${variant[i].rgb}</th>
            <th>${variant[i].size}</th>
            <th>${variant[i].price}</th>
            <th>${variant[i].stock}</th>
            <th><img src="${variant[i].src}" style="width:70%;height:100px"/></th>
            <th><button id="myBtn" onclick="handleEditVariant('${variant[i].variant_id}')">Sửa</button></th>
            <th><button onclick="handleDeleteVariant('${data[i].variant_id}')">Xóa</button></th>
            </tr>`
            }
        }



    }

}
function handleEditVariant(id){
  console.log(id)
  localStorage.setItem('id',id);
  window.location.href = "editVariant.html";
}



function handleDeleteVariant(id) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].variant_id == id) {
            console.log(id);
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
            var result = confirm("Bạn có muốn xóa sản phẩm: " + data[i].name)
            fetch(url + 'variants/hideVariant' + '?token=' + token, requestOptions)
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


