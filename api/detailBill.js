var token = localStorage.getItem('token');
var id = localStorage.getItem('bill_id');

var id_bill = localStorage.getItem('bill_id')

if (localStorage.getItem("token") === null) {
    window.location.href = "login.html";
}

var url = 'https://hieuhmph12287-lab5.herokuapp.com/'
var fasionApi = 'https://hieuhmph12287-lab5.herokuapp.com/products/getProducts?token=' + token;
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
    await fetch(url + 'bills/getBills' + '?token=' + token)

    .then(function(response) {

        return response.json();

    }).then(callback);
    hideLoading();
}

function renderProducts(products) {

    data = products;

    for (let i = 0; i < data.length; i++) {

        if (data[i].bill_id == id_bill) {

            var bill_id = document.getElementById('bill_id').value = data[i].bill_id.slice(0, 6);
            var name_products = document.getElementById('name').value = data[i].name_receiver;
            var phone_number = document.getElementById('phone').value = data[i].phone_number;
            var status = document.getElementById('status').value = data[i].status;
            var discount_value = document.getElementById('discount').value = data[i].discount_value;
            var payment_type = document.getElementById('payment').value = data[i].payment_type;
            var address = document.getElementById('address').value = data[i].address_detail;

            product = data[i].product
            for (let i = 0; i < product.length; i++) {
                document.querySelector("#main_table").innerHTML += `<tr>
		<th scope="row">${product[i].name}</th>
    <td><img style="width:70%;height:100px" src="${product[i].src}"/></th></td>
    <td>${product[i].quantity}</td>
    <td>${product[i].size}</td>
    <td>${product[i].status}</td>
    <td>${product[i].color}</td>
    <td id="price">${product[i].price}</td></tr>
    `;

            }

        }
    }
    $(function() {

        var TotalValue = 0;

        $(" #price").each(function(index, value) {
            currentRow = parseFloat($(this).text());
            TotalValue += currentRow
        });

        document.getElementById('total').value = TotalValue;

    });


}

function tranfer() {

    fetch('https://hieuhmph12287-lab5.herokuapp.com/bills/transferOrder/' + id_bill + '?&token=' + token, {
            method: 'GET', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            alert("change status succes!!")
            window.location.href = "bill.html";
        })
        .catch((error) => {
            console.log(error);
        });

}

var submitBtn = document.getElementById('tranfer');
submitBtn.addEventListener('click', tranfer);

//accept
function accept() {

    fetch('https://hieuhmph12287-lab5.herokuapp.com/bills/confirmOrder/' + id_bill + '?&token=' + token, {
            method: 'GET', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            alert("change status succes!!")
            window.location.href = "bill.html";
        })
        .catch((error) => {
            console.log(error);
        });

}

var submitBtn = document.getElementById('accept');
submitBtn.addEventListener('click', accept);

//finish
function finish() {

    fetch('https://hieuhmph12287-lab5.herokuapp.com/bills/finishOrder/' + id_bill + '?&token=' + token, {
            method: 'GET', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            alert("change status succes!!")
            window.location.href = "bill.html";
        })
        .catch((error) => {
            console.log(error);
        });

}

var submitBtn = document.getElementById('finish');
submitBtn.addEventListener('click', finish);

//cancel
function cancel() {

    fetch('https://hieuhmph12287-lab5.herokuapp.com/bills/cancelOrder/' + id_bill + '?&token=' + token, {
            method: 'GET', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            alert("change status succes!!")
            window.location.href = "bill.html";
        })
        .catch((error) => {
            console.log(error);
        });

}

var submitBtn = document.getElementById('cancel');
submitBtn.addEventListener('click', cancel);