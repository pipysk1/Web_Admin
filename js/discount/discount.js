var token = localStorage.getItem('token');
console.log(token);

var url = 'https://hieuhmph12287-lab5.herokuapp.com'

var btnAdd = document.querySelector('.form-submit');

btnAdd.onclick = function(e) {
    e.preventDefault();
    window.location.href = "addDiscount.html";

}

getAllDiscount(renderDiscount)

function getAllDiscount(callback) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    fetch(url + '/discounts/getDiscounts?token=' + token, requestOptions)
        .then(response => response.json())
        .then(callback);

}

var data = [];

function renderDiscount(discounts) {
    var tbody = document.querySelector('#data');

    data = discounts;

    for (let i = 0; i < data.length; i++) {

        var string_id = data[i].discount_id;
        var res = string_id.slice(0, 5);
        var date = new Date();
        var SHORT_1 = data[i].date_start;


        // console.log(date);


        console.log(string_id)
        tbody.innerHTML +=
            `<tr>
            <th></th>
        <th>${res}</th>
        <th>${data[i].code}</th>
        <th>${data[i].value}</th>
        <th>${data[i].max_used_by_user}</th>
        <th>${data[i].max_used}</th>
        <th>${data[i].date_start}</th>
        <th>${data[i].date_end}</th>
       </tr>`
    }
}