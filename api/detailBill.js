var token = localStorage.getItem('token');
var id = localStorage.getItem('id');
var id_bill = localStorage.getItem('id_bill')
console.log(id_bill);
// console.log(token);
var url = 'https://hieuhmph12287-lab5.herokuapp.com/'
var fasionApi = 'https://hieuhmph12287-lab5.herokuapp.com/products/getProducts?token=' + token;
var addProductApi = 'https://hieuhmph12287-lab5.herokuapp.com/products/addProduct?token=' + token;

getAllProducts(renderProducts);



async function getAllProducts(callback) {
    await fetch(url + 'bills/getBills' + '?token=' + token)
        .then(function(response) {
            return response.json();
        }).then(callback);
}

function renderProducts(products) {
    var tbody = document.querySelector('#main_table');
    data = products;
    console.log(data)
    for (let i = 0; i < data.length; i++) {
        if (data[i].bill_id == id_bill) {
            console.log(data[i].product[0].name)
            tbody.innerHTML +=
                `<tr>
            <th scope="row">${data[i].bill_id}</th>
            <td>${data[i].product[0].name}</td>
            <td>${data[i].phone_number}</td>
            <td>${data[i].status}</td>
            <td>${data[i].discount_value}</td>
            <td>${data[i].payment_type}</td>
            <td ><a  onclick="detailBill('${data[i].bill_id}')" class="fa fa-edit fa-fw"></a></td>
            <td ><a href="/pages/editBill.html" class="fa-trash"></a></td>
        </tr>`;
        }
    }


}