var token = localStorage.getItem('token');
var id = localStorage.getItem('id');
var id_bill = localStorage.getItem('id_bill')
// console.log(token);
var url = 'https://hieuhmph12287-lab5.herokuapp.com/'
var fasionApi = 'https://hieuhmph12287-lab5.herokuapp.com/products/getProducts?token=' + token;
var addProductApi = 'https://hieuhmph12287-lab5.herokuapp.com/products/addProduct?token=' + token;

getAllProducts(renderProducts);



async function getAllProducts(callback) {
    displayLoading();
    await fetch(url + 'bills/getBills' + '?token=' + token)
    
        .then(function(response) {
            return response.json();
       
        }).then(callback);
        hideLoading();
}

function renderProducts(products) {

    data = products;
    console.log(data)
    for (let i = 0; i < data.length; i++) {
        if (data[i].bill_id == id_bill) {
       
            var bill_id = document.getElementById('bill_id').value = data[i].bill_id;
            var name_products = document.getElementById('name').value = data[i].product[0].name;
            var phone_number = document.getElementById('phone').value = data[i].phone_number;
            var status = document.getElementById('status').value = data[i].status;
            var discount_value = document.getElementById('discount').value = data[i].discount_value;
            var payment_type = document.getElementById('payment').value = data[i].payment_type;
            var price = document.getElementById('price').value = data[i].product[0].price;
        }
    }


}
