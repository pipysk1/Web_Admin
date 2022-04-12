var variant_id = localStorage.getItem('id');
console.log(variant_id);
var token = localStorage.getItem('token');

var url = 'https://hieuhmph12287-lab5.herokuapp.com/'

getAllProducts(renderProducts);



async function getAllProducts(callback) {
    await fetch(url + 'variants/getVariants' + '?token=' + token)
        .then(function(response) {
            return response.json();
        }).then(callback);
}

var data = []

function renderProducts(products) {
    var btnAddVariant = document.getElementById('btn-confirm');
    data = products;
    // console.log(data)
    for (let i = 0; i < data.length; i++) {
        if (data[i].variant_id == variant_id) {
    // console.log(data[i].variant_id);
    var nameproduct = document.querySelector('input[name="id"]').value=data[i].variant_id;
    console.log(nameproduct);
    var color = document.querySelector('input[name="color"]').value = data[i].color;
    var rgb = document.querySelector('input[name="rgb"]').value = data[i].rgb;
    var size = document.getElementById('list-type').value = data[i].size;
   // var size = document.querySelector('input[name="optionsRadios"]:checked').value = data[i].size;
  
    var price = document.querySelector('input[name="numbernew"]').value = data[i].price;
    var stock = document.querySelector('input[name="numberold"]').value = data[i].stock;
    let file = document.getElementById("imgFile").files[0] = data[i].file;


    btnAddVariant.onclick = function(e) {
        e.preventDefault();
nameproduct= document.querySelector('input[name="id"]').value;

color = document.querySelector('input[name="color"]').value
rgb = document.querySelector('input[name="rgb"]').value
size = document.getElementById('list-type').value
price = document.querySelector('input[name="numbernew"]').value
stock = document.querySelector('input[name="numberold"]').value
file = document.getElementById("imgFile").files[0]
    var formData = new FormData();
    formData.append("variant_id", nameproduct);
    formData.append("rgb", rgb);
    formData.append("color", color);
    formData.append("size", size);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("file", file);
    editVariant(formData)
        }}
}}

function editVariant(formdata) {
    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };
      
      fetch("https://hieuhmph12287-lab5.herokuapp.com/variants/updateVariant?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjIzZGM0ZjFjNDgxOTYwMDIzZmZlYjM2IiwidXNlcm5hbWUiOiJtYWljb2RlIiwiaWF0IjoxNjQ5NzgwMTA2LCJleHAiOjE2NDk4NjY1MDZ9.BFaFTqF6OneAUjVgUPTPXgPAV8IEdega_SJZI96MggQ", requestOptions)
        .then(response =>
            { if(!response.ok){
            alert("False")
            }else{
                alert('success')
                
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


var formdata = new FormData();
formdata.append("variant_id", "cfe10734-1460-4e3a-8a81-6020cb4337e9");
formdata.append("color", "cam");
formdata.append("rgb", "#ff");
formdata.append("price", "123456");
formdata.append("stock", "654321");
formdata.append("size", "XL");

var requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};

fetch("https://hieuhmph12287-lab5.herokuapp.com/variants/updateVariant?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjIzZGM0ZjFjNDgxOTYwMDIzZmZlYjM2IiwidXNlcm5hbWUiOiJtYWljb2RlIiwiaWF0IjoxNjQ5NzgwMTA2LCJleHAiOjE2NDk4NjY1MDZ9.BFaFTqF6OneAUjVgUPTPXgPAV8IEdega_SJZI96MggQ", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));