var token = localStorage.getItem('token');
var id = localStorage.getItem('id');
console.log(id);
// console.log(token);
var url = 'https://hieuhmph12287-lab5.herokuapp.com/'
var fasionApi = 'https://hieuhmph12287-lab5.herokuapp.com/products/getProducts?token=' + token;
var addProductApi = 'https://hieuhmph12287-lab5.herokuapp.com/products/addProduct?token=' + token;

getAllProducts(renderProducts);



async function getAllProducts(callback) {
    await fetch(url + 'products/getProducts' + '?token=' + token)
        .then(function(response) {
            return response.json();
        }).then(callback);
}

var data = []

function renderProducts(products) {
    data = products;
    console.log(data)
    for (let i = 0; i < data.length; i++) {
        if (data[i].product_id == id) {
            var name_products = document.querySelector('input[name="name_products"]').value = data[i].name;
            var status = document.querySelector('input[name="optionsRadios"]').value = data[i].status;
            var gender = document.querySelector('input[name="optionsRadios1"]').value = data[i].gender;
            var type = document.getElementById('list-type').value = data[i].type;
            let file = document.getElementById("imgFile").files[0] = data[i].file;
            var collection_id = document.querySelector('input[name="collection_id"]').value = data[i].collection_id;
            var price = document.querySelector('input[name="numbernew"]').value = data[i].price;
            var old_price = document.querySelector('input[name="numberold"]').value = data[i].old_price;
            var product_detail = document.getElementById('product_detail').value = data[i].product_detail;
        }
    }
    var createBtn = document.querySelector('#create');
    createBtn.onclick = function(e) {
        e.preventDefault();
        name_products = document.querySelector('input[name="name_products"]').value;
        status = document.querySelector('input[name="optionsRadios"]').value;
        gender = document.querySelector('input[name="optionsRadios1"]').value;
        type = document.getElementById('list-type').value;
        file = document.getElementById("imgFile").files[0];
        collection_id = document.querySelector('input[name="collection_id"]').value;
        price = document.querySelector('input[name="numbernew"]').value;
        old_price = document.querySelector('input[name="numberold"]').value;
        product_detail = document.getElementById('product_detail').value;
        console.log(status)
        var formData = new FormData();
        formData.append("name", name_products);
        formData.append("gender", gender);
        formData.append("price", price);
        formData.append("old_price", old_price);
        formData.append("product_detail", product_detail);
        formData.append("status", status);
        formData.append("collection_id", collection_id);
        formData.append("type", type);
        formData.append("file", file);
        createProduct(formData);

    }
}

function createProduct(data) {
    var requestOptions = {
        method: 'POST',
        body: data,
        redirect: 'follow'
    };
    fetch(url + "products/updateProduct?token=" + token, requestOptions)
        .then(response => {
            if (!response.ok) {
                alert("Chức năng đang lỗi");
                throw new Error('Network response was not OK');

            } else {
                window.location.href = "home.html";
                return response.text();
            }

        })

    .then(result => console.log(result))
        .catch(error => console.log('error', error));
}




$(".image-box").click(function(event) {
    var previewImg = $(this).children("img");

    $(this)
        .siblings()
        .children("input")
        .trigger("click");

    $(this)
        .siblings()
        .children("input")
        .change(function() {
            var reader = new FileReader();

            reader.onload = function(e) {
                var urll = e.target.result;
                $(previewImg).attr("src", urll);
                previewImg.parent().css("background", "transparent");
                previewImg.show();
                previewImg.siblings("p").hide();
            };
            reader.readAsDataURL(this.files[0]);
        });
});