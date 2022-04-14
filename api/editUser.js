var token = localStorage.getItem('token');
var id = localStorage.getItem('id');
var id_bill = localStorage.getItem('user_id')
// console.log(token);
var url = 'https://hieuhmph12287-lab5.herokuapp.com/'
var fasionApi = 'https://hieuhmph12287-lab5.herokuapp.com/users/getAllUsers?token=' + token;
getAllProducts(renderProducts);


function sum(input) {

    if (toString.call(input) !== "[object Array]")
        return false;

    var total = 0;
    for (var i = 0; i < input.length; i++) {
        if (isNaN(input[i])) {
            continue;
        }
        total += Number(input[i]);
    }
    return total;
}


async function getAllProducts(callback) {
    displayLoading();
    await fetch(url + 'users/getAllUsers' + '?token=' + token)

        .then(function (response) {
            return response.json();

        }).then(callback);
    hideLoading();
}

function renderProducts(products) {

    data = products;
    console.log(data)
    for (let i = 0; i < data.length; i++) {
        if (data[i]._id == id_bill) {

            var bill_id = document.getElementById('bill_id').value = data[i].full_name;
            var name_products = document.getElementById('name').value = data[i].email;
            var phone_number = document.getElementById('phone').value = data[i].phone_number;
            var status = document.getElementById('status').value = data[i].address_detail;
            var discount_value = document.getElementById('discount').value = data[i].sub_district;
            var payment_type = document.getElementById('payment').value = data[i].district;
            var address = document.getElementById('address').value = data[i].city;
            console.log(data[i].city)


        }
    }
}
