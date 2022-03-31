function Validator(options) {
    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    var selectorRules = {};

    // Hàm thực hiện validate
    function validate(inputElement, rule) {
        var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
        var errorMessage;

        // Lấy ra các rules của selector
        var rules = selectorRules[rule.selector];

        // Lặp qua từng rule & kiểm tra
        // Nếu có lỗi thì dừng việc kiểm
        for (var i = 0; i < rules.length; ++i) {
            switch (inputElement.type) {
                case 'radio':
                case 'checkbox':
                    errorMessage = rules[i](
                        formElement.querySelector(rule.selector + ':checked')
                    );
                    break;
                default:
                    errorMessage = rules[i](inputElement.value);
            }
            if (errorMessage) break;
        }

        if (errorMessage) {
            errorElement.innerText = errorMessage;
            getParent(inputElement, options.formGroupSelector).classList.add('invalid');
        } else {
            errorElement.innerText = '';
            getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
        }

        return !errorMessage;
    }

    // Lấy element của form cần validate
    var formElement = document.querySelector(options.form);
    if (formElement) {
        // Khi submit form
<<<<<<< HEAD
        formElement.onsubmit = function(e) {
=======
        formElement.onsubmit = function (e) {
>>>>>>> a6dc3f4645766e7e036c14863fbfa7af834424b7
            e.preventDefault();

            var isFormValid = true;

            // Lặp qua từng rules và validate
<<<<<<< HEAD
            options.rules.forEach(function(rule) {
=======
            options.rules.forEach(function (rule) {
>>>>>>> a6dc3f4645766e7e036c14863fbfa7af834424b7
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);
                if (!isValid) {
                    isFormValid = false;
                }
            });

            if (isFormValid) {
                // Trường hợp submit với javascript
                if (typeof options.onSubmit === 'function') {
                    var enableInputs = formElement.querySelectorAll('[name]');
<<<<<<< HEAD
                    var formValues = Array.from(enableInputs).reduce(function(values, input) {
=======
                    var formValues = Array.from(enableInputs).reduce(function (values, input) {
>>>>>>> a6dc3f4645766e7e036c14863fbfa7af834424b7

                        switch (input.type) {
                            case 'radio':
                                values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                                break;
                            case 'checkbox':
                                if (!input.matches(':checked')) {
                                    values[input.name] = '';
                                    return values;
                                }
                                if (!Array.isArray(values[input.name])) {
                                    values[input.name] = [];
                                }
                                values[input.name].push(input.value);
                                break;
                            case 'file':
                                values[input.name] = input.files;
                                break;
                            default:
                                values[input.name] = input.value;
                        }

                        return values;
                    }, {});
                    options.onSubmit(formValues);
                    var username = formValues.username;
                    var password = formValues.password;

                    var myHeaders = new Headers();
                    myHeaders.append("username", username);
                    myHeaders.append("password", password);
                    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

                    var urlencoded = new URLSearchParams();
                    urlencoded.append("username", username);
                    urlencoded.append("password", password);

                    var requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body: urlencoded,
                        redirect: 'follow'
                    };

                    fetch("https://hieuhmph12287-lab5.herokuapp.com/admins/loginAdmin", requestOptions)
                        .then(response => response.text())
                        .then(result => {
<<<<<<< HEAD
                            console.log(result)
=======
                            var result = JSON.parse(result)
                            // var accessTokenObj = JSON.parse(localStorage.getItem("token:"));
                            // console.log(accessTokenObj);
                            // var x = document.getElementById("toast")
                            // x.className = "show";
                            // setTimeout(function () { x.className = x.className.replace("show", ""); }, 5000);
                            localStorage.setItem('token', result.token);
                            window.location.href = "home.html";
>>>>>>> a6dc3f4645766e7e036c14863fbfa7af834424b7
                        })
                        .catch(error => console.log('error', error));


                }

            }
            // Trường hợp submit với hành vi mặc định
            else {
                formElement.submit();
            }
        }
    }

    // Lặp qua mỗi rule và xử lý (lắng nghe sự kiện blur, input, ...)
<<<<<<< HEAD
    options.rules.forEach(function(rule) {
=======
    options.rules.forEach(function (rule) {
>>>>>>> a6dc3f4645766e7e036c14863fbfa7af834424b7

        // Lưu lại các rules cho mỗi input
        if (Array.isArray(selectorRules[rule.selector])) {
            selectorRules[rule.selector].push(rule.test);
        } else {
            selectorRules[rule.selector] = [rule.test];
        }

        var inputElements = formElement.querySelectorAll(rule.selector);

<<<<<<< HEAD
        Array.from(inputElements).forEach(function(inputElement) {
            // Xử lý trường hợp blur khỏi input
            inputElement.onblur = function() {
=======
        Array.from(inputElements).forEach(function (inputElement) {
            // Xử lý trường hợp blur khỏi input
            inputElement.onblur = function () {
>>>>>>> a6dc3f4645766e7e036c14863fbfa7af834424b7
                validate(inputElement, rule);
            }

            // Xử lý mỗi khi người dùng nhập vào input
<<<<<<< HEAD
            inputElement.oninput = function() {
=======
            inputElement.oninput = function () {
>>>>>>> a6dc3f4645766e7e036c14863fbfa7af834424b7
                var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
                errorElement.innerText = '';
                getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
            }
        });
    });
}



<<<<<<< HEAD
Validator.isUsername = function(selector, message) {
    return {
        selector: selector,

        test: function(value) {
=======
Validator.isUsername = function (selector, message) {
    return {
        selector: selector,

        test: function (value) {
>>>>>>> a6dc3f4645766e7e036c14863fbfa7af834424b7
            return value.trim() ? undefined : message || 'Vui lòng nhập tài khoản'
        }
    }

}

<<<<<<< HEAD
Validator.isPassword = function(selector, message) {
    return {
        selector: selector,

        test: function(value) {
=======
Validator.isPassword = function (selector, message) {
    return {
        selector: selector,

        test: function (value) {
>>>>>>> a6dc3f4645766e7e036c14863fbfa7af834424b7
            return value.trim() ? undefined : message || 'Vui lòng nhập mật khẩu'
        }
    }
}