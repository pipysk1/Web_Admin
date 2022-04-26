var token = localStorage.getItem('token');
var id = localStorage.getItem('id');
if (localStorage.getItem("token") === null) {
    window.location.href = "login.html";
}

var url = 'https://hieuhmph12287-lab5.herokuapp.com/'
var fasionApi = 'https://hieuhmph12287-lab5.herokuapp.com/products/getProducts?token=' + token;
var addProductApi = 'https://hieuhmph12287-lab5.herokuapp.com/products/addProduct?token=' + token;

getAllProducts(renderProducts);
test();



async function getAllProducts(callback) {
    await fetch(url + 'products/getProducts' + '?token=' + token)
        .then(function(response) {
            return response.json();
        }).then(callback);
}

var data = []

function renderProducts(products) {
    data = products;

    var rates = document.getElementsByName('optionsRadios1');

    for (let i = 0; i < data.length; i++) {
        if (data[i].product_id == id) {
            document.querySelector('input[name="name_products"]').value = data[i].name;

            var dataStatus = document.getElementsByName('optionsRadios').value = data[i].status;


            if (dataStatus == "Hot Trending") {

                document.getElementById('optionsRadios1').checked = dataStatus;
            } else if (dataStatus == "New Arrival") {


                document.getElementById('optionsRadios2').checked = dataStatus;
            } else {


                document.getElementById('optionsRadios3').checked = dataStatus;
            }

            var gender1 = document.getElementsByName('optionsRadios1').value = data[i].gender;



            if (gender1 == "Female") {
                document.getElementById('gender2').checked = gender1;
            } else if (gender1 == "Male") {
                document.getElementById('gender1').checked = gender1;
            } else {
                document.getElementById('gender3').checked = gender1;
            }


            document.getElementById('list-type').value = data[i].type;
            document.getElementById("imgFile").files[0] = data[i].src;
            document.getElementById("img").src = data[i].src
            document.querySelector('input[name="collection_id"]').value = data[i].collection_id;
            document.querySelector('input[name="numbernew"]').value = data[i].price;
            document.querySelector('input[name="numberold"]').value = data[i].old_price;
            document.getElementById('product_detail').value = data[i].product_detail;
        }
    }
}

function test() {
    var createBtn = document.querySelector('#create');
    createBtn.onclick = function(e) {
        e.preventDefault();
        var name_products = document.querySelector('input[name="name_products"]').value;
        var status = document.querySelector('input[name="optionsRadios"]:checked').value;


        var gender = document.querySelector('input[name="optionsRadios1"]:checked').value;

        var type = document.getElementById('list-type').value;


        var file = document.getElementById("imgFile").files[0];
        var collection_id = document.querySelector('input[name="collection_id"]').value;
        var price = document.querySelector('input[name="numbernew"]').value;
        var old_price = document.querySelector('input[name="numberold"]').value;
        var product_detail = document.getElementById('product_detail').value;

        var formData = new FormData();
        formData.append("product_id", id);
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
                alert("Update thành công");

                return response.text() && (window.location.href = "home.html");


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

function ValidateFileUpload() {
    var allowedExtension = ['jpeg', 'jpg', 'png', 'gif', 'bmp'];
    var fileExtension = document.getElementById('imgFile').value.split('.').pop().toLowerCase();
    var isValidFile = false;
    for (var index in allowedExtension) {
        if (fileExtension === allowedExtension[index]) {
            isValidFile = true;
            break;
        }
    }
    if (!isValidFile) {
        document.getElementById("imgFile").value = "";

        alert('Allowed Extensions are : *.' + allowedExtension.join(', *.'));
    }

    return isValidFile;
}