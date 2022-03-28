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

    function validate(inputElement, rule) {
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
        var errorMessage;

        var rules = selectorRules[rule.selector];


        for (var i = 0; i < rules.length; ++i) {
            errorMessage = rules[i](inputElement.value);

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

    var formElement = document.querySelector(options.form);

    if (formElement) {


        formElement.onsubmit = function(e) {
            e.preventDefault();

            var isFormValid = true;

            // Lặp qua từng rules và validate
            options.rules.forEach(function(rule) {
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
                    var formValues = Array.from(enableInputs).reduce(function(values, input) {

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
                            if (success == false) {
                                console.log(success)
                            }
                            console.log("maimai" + result)
                            console.log(result)
                        })
                        .catch(error => console.log('error', error));


                }
                if (success === true) {
                    console.log("Login thanh cong")
                }

                // window.location = "goolg";


            }
            // Trường hợp submit với hành vi mặc định
            else {
                formElement.submit();
            }
        }
    }

    options.rules.forEach(function(rule) {

        // Lưu lại các rules cho mỗi input
        if (Array.isArray(selectorRules[rule.selector])) {
            selectorRules[rule.selector].push(rule.test);
        } else {
            selectorRules[rule.selector] = [rule.test];
        }

        var inputElements = formElement.querySelectorAll(rule.selector);

        Array.from(inputElements).forEach(function(inputElement) {
            // Xử lý trường hợp blur khỏi input
            inputElement.onblur = function() {
                validate(inputElement, rule);
            }

            // Xử lý mỗi khi người dùng nhập vào input
            inputElement.oninput = function() {
                var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
                errorElement.innerText = '';
                getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
            }
        });
    });
}





Validator.isUsername = function(selector, message) {
    return {
        selector: selector,

        test: function(value) {
            return value.trim() ? undefined : message || 'Vui lòng nhập tài khoản'
        }
    }

}

Validator.isPassword = function(selector, message) {
    return {
        selector: selector,

        test: function(value) {
            return value.trim() ? undefined : message || 'Vui lòng nhập mật khẩu'
        }
    }
}






function handleLogin() {
    var loginBtn = document.querySelector('#login-btn');
    loginBtn.onclick = function() {
        var name = document.querySelector('input[name="username"]').value;
        var password = document.querySelector('input[name="password"]').value;

        var myHeaders = new Headers();
        myHeaders.append("username", name);
        myHeaders.append("password", password);
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("username", name);
        urlencoded.append("password", password);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://hieuhmph12287-lab5.herokuapp.com/admins/loginAdmin", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

    }
}