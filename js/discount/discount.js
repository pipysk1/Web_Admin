var token = localStorage.getItem('token');


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

        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        var date_start = new Date(data[i].date_start);
        var date_end = new Date(data[i].date_end);
        tbody.innerHTML +=
            `<tr>
            <th></th>
        <th>${res}</th>
        <th>${data[i].code}</th>
        <th>${data[i].value}</th>
        <th>${data[i].max_used_by_user}</th>
        <th>${data[i].max_used}</th>
        <th>${date_start.toLocaleDateString("en-US",options)}</th>
        <th>${date_end.toLocaleDateString("en-US",options)}</th>
       </tr>`
    }
}