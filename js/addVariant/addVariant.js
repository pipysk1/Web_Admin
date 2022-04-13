var id = localStorage.getItem('id')
console.log(id)

var token = localStorage.getItem('token');
console.log(token)
var url = "https://hieuhmph12287-lab5.herokuapp.com/";

function start() {
    getAllProducts(renderProducts);
    handleFormAddVariant();
}

start();

function getAllProducts(Callback) {
    fetch(url + "products/getProducts" + "?token=" + token)
    .then(Response => {
        return Response.json()
    })
    .then(Callback);
}

var data = [];

function renderProducts(products){
    data = products;
    for (let i = 0; i <data.length; i++) {
        if(data[i].product_id == id){
            var product_id = document.querySelector('#nameproduct').value = data[i].product_id
            console.log(product_id);
        }
    }
    console.log(data);
}

function handleFormAddVariant() {
    var btnAddVariant = document.querySelector('#create');

    btnAddVariant.onclick = function(e) {
        e.preventDefault();
    product_id = document.querySelector('#nameproduct').value;
    var color = document.querySelector('input[name="color"]').value;
    var rgb = document.querySelector('input[name="rgb"]').value;
    var size = document.querySelector('input[name="optionsRadios"]:checked').value;
    var price = document.querySelector('input[name="numbernew"]').value;
    var stock = document.querySelector('input[name="numberold"]').value;
    let file = document.getElementById("imgFile").files[0];
    var formData = new FormData();
    formData.append("product_id", product_id);
    formData.append("rgb", rgb);
    formData.append("color", color);
    formData.append("size", size);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("file", file);
    createAddVariant(formData)
    }

    var btnAddComfirm = document.querySelector('#btn-confirm');
    btnAddComfirm.onclick = function(e) {
        document.querySelector('#c-id').innerHTML =  document.querySelector('#nameproduct').value;
        document.querySelector('#c-color').innerHTML =  document.querySelector('input[name="color"]').value;
        document.querySelector('#c-rbg').innerHTML =  document.querySelector('input[name="rgb"]').value;
        document.querySelector('#c-size').innerHTML =  document.querySelector('input[name="optionsRadios"]:checked').value;
        document.querySelector('#c-price').innerHTML = document.querySelector('input[name="numbernew"]').value;
        document.querySelector('#c-stock').innerHTML =   document.querySelector('input[name="numberold"]').value;
        document.querySelector('#c-des').innerHTML =  document.querySelector('#product_detail').value;
    }
}

function createAddVariant(data) {
    var requestOption = {
        method:'POST',
        body: data,
    };
    fetch(url + "variants/addVariant" + "?token=" + token, requestOption)
    .then(Response => {if(!Response.ok){
        alert('Thêm loại sản phẩm không thành công');
    }
    else {
        alert('Thêm thành công');
        window.location.href = "home.html";
        return Response.text();
    }
}).then(result => {console.log(result)}).catch(error => {console.log('Error: '+ error)})
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