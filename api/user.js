var token = localStorage.getItem('token');
var data = [];
if (localStorage.getItem("token") === null) {
    window.location.href = "login.html";
}
document.addEventListener("DOMContentLoaded", function () {
    var xhr = new XMLHttpRequest();
    displayLoading();
    xhr.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                hideLoading();
                data = JSON.parse(this.responseText);

                $('#tableUser').DataTable({
                    "lengthMenu": [
                        [5, 10, 25, 50, -1],
                        [5, 10, 25, 50, "All"]
                    ],
                    data: data,

                    columns: [
                        { data: '_id' },
                        { data: 'email' },
                        { data: 'phone_number' },
                        { data: 'full_name' },
                        { data: 'address_detail' },
                        {
                            "data": null,
                            "render": function (data, type, row) {
                                return `<div class="text-center">
                                <button class='btn btn-primary text-white' style='cursor:pointer; width:50px;'onclick="detailUser('${data._id}')" >
                                <i class='fa fa-eye'></i> 
                                </button></div>
                            `;
                            },
                            "width": "5%"
                        },
                    ],

                    "pageLength": 5
                });
            }
        }
    };
    xhr.open(
        "GET",
        "https://hieuhmph12287-lab5.herokuapp.com/users/getAllUsers?token=" + token
    );
    xhr.send();
});

function myFunction(){
   
}

function detailUser(id) {
    var x = document.getElementById("hopthoai");
    const closeModal= document.getElementById('close');
    
closeModal.addEventListener('click', () => {
    x.close();

  });
    // if(y.open == true){
    //     x.open = false;
       
    // }else{
    //     y.open = true;
        
    // }
    
    if(x.open == true){
        y.open = false;
     
       
    }else{
        x.open = true;

       
    }
    for (let i = 0; i < data.length; i++) {
        if (data[i]._id == id) {
            localStorage.setItem('user_id', data[i]._id)
        }
    }
    var id = localStorage.getItem('id');
    var id_bill = localStorage.getItem('user_id')
    if (localStorage.getItem("token") === null) {
        window.location.href = "login.html";
    }
    
    var url = 'https://hieuhmph12287-lab5.herokuapp.com/'
    var fasionApi = 'https://hieuhmph12287-lab5.herokuapp.com/users/getAllUsers?token=' + token;
    getAllProducts(renderProducts);
    
    
    async function getAllProducts(callback) {
        displayLoading();
        await fetch(url + 'users/getAllUsers' + '?token=' + token)
    
        .then(function(response) {
            return response.json();
    
        }).then(callback);
        hideLoading();
    }
    
    function renderProducts(products) {
    
        data = products;
    
        for (let i = 0; i < data.length; i++) {
            if (data[i]._id == id_bill) {
                var user_id = document.getElementById('user_id').value = data[i]._id;
                var bill_id = document.getElementById('bill_id').value = data[i].full_name;
                var name_products = document.getElementById('name').value = data[i].email;
                var phone_number = document.getElementById('phone').value = data[i].phone_number;
                var status = document.getElementById('status').value = data[i].address_detail;
                var discount_value = document.getElementById('discount').value = data[i].sub_district;
                var payment_type = document.getElementById('payment').value = data[i].district;
                var address = document.getElementById('address').value = data[i].city;
    
    console.log(data[i]._id);
    
            }
        }
    }
    
}



