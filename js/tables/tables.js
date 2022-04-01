var token = localStorage.getItem('token');
// console.log(token);
var fasionApi = 'https://hieuhmph12287-lab5.herokuapp.com/products/getProducts?token=' + token;
var addProductApi = 'https://hieuhmph12287-lab5.herokuapp.com/products/addProduct?token=' + token;

function start() {
    getAllProducts(renderProducts);
    handleCreateForm();
}
start();

async function getAllProducts(callback) {
    await fetch(fasionApi)
        .then(function(response) {
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
        <th>"Xem"</th>
        <th>Edit</th>
        <th>Xóa</th>

        </tr>
        `

    });
    tbody.innerHTML = htmls.join('');
    //     // tableHead.innerHTML = htmls.join('');
    // }
}

function handleCreateForm() {

    var createBtn = document.querySelector('#create');
    createBtn.onclick = function(e) {
        e.preventDefault();
        var name_products = document.querySelector('input[name="name_products"]').value;
        var status = document.querySelector('input[name="optionsRadios"]').value;
        var gender = document.querySelector('input[name="optionsRadios1"]').value;
        var type = document.getElementById('list-type').value;
        let file = document.getElementById("imgFile").files[0];
        var collection_id = document.querySelector('input[name="collection_id"]').value;
        var price = document.querySelector('input[name="numbernew"]').value;
        var old_price = document.querySelector('input[name="numberold"]').value;
        var product_detail = document.getElementById('product_detail').value;
        var formData = new FormData();
        formData.append("name", name_products);
        formData.append("gender", gender);
        formData.append("price", price);
        formData.append("old_price", old_price);
        formData.append("product_detail", product_detail);
        formData.append("status", status);
        formData.append("type", type);
        formData.append("file", file);
        console.log(file)
        var requestOptions = {
            method: 'POST',
            body: formData,
            redirect: 'follow'
        };
        fetch("https://hieuhmph12287-lab5.herokuapp.com/products/addProduct?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjIzYWQyMTMxMzhiNjUwMDIzNmMwZGM1IiwidXNlcm5hbWUiOiJhZG1pbiIsImlhdCI6MTY0ODcyNDE3MiwiZXhwIjoxNjQ4ODEwNTcyfQ.8LnZ5rGBqOQtXbXmDgta6WbsuwGblflnqonUShj-2Ew", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }
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





// var formdata = new FormData();
// formdata.append("file", fileInput.files[0], "/C:/Users/LvMai/Documents/Zalo Received Files/z3256746378248_8bbf5ed66540584653079a173bda552f.jpg");
// formdata.append("name", "ao khoac");
// formdata.append("gender", "Male");
// formdata.append("price", "10000");
// formdata.append("old_price", "200000");
// formdata.append("product_detail", "asssadas");
// formdata.append("status", "Dang xu ly123");
// formdata.append("type", "Áo khoác");

// var requestOptions = {
//     method: 'POST',
//     body: formdata,
//     redirect: 'follow'
// };

// fetch("https://hieuhmph12287-lab5.herokuapp.com/products/addProduct?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjIzYWQyMTMxMzhiNjUwMDIzNmMwZGM1IiwidXNlcm5hbWUiOiJhZG1pbiIsImlhdCI6MTY0ODcyNDE3MiwiZXhwIjoxNjQ4ODEwNTcyfQ.8LnZ5rGBqOQtXbXmDgta6WbsuwGblflnqonUShj-2Ew", requestOptions)
//     .then(response => response.text())
//     .then(result => console.log(result))
//     .catch(error => console.log('error', error));
// }