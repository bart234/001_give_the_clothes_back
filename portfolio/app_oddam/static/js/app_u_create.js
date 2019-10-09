document.addEventListener('DOMContentLoaded', function(){

let div_username= document.getElementById('div_username');
let div_password= document.getElementById('div_password');
let div_password2= document.getElementById('div_password2');
let div_first_name= document.getElementById('div_first_name');
let div_last_name= document.getElementById('div_last_name');
let div_email= document.getElementById('div_email');

let div_username_info= document.getElementById('div_username_info');
let div_password_info= document.getElementById('div_password_info');
let div_password2_info= document.getElementById('div_password2_info');
let div_first_name_info= document.getElementById('div_first_name_info');
let div_last_name_info= document.getElementById('div_last_name_info');
let div_email_info= document.getElementById('div_email_info');

    div_username_info.innerText = 'required, max 10 letters or numbers';
    div_password_info.innerText= 'require at least one: number, capital letter, more then 6 sign, less then 20';
    div_password2_info.innerText= 'require at least one: number, capital letter, more then 6 sign, less then 20';
    div_first_name_info.innerText= 'required, max 12 letters';
    div_last_name_info.innerText= 'required, max 18 letters';
    div_email_info.innerText= 'required, max 22 letters';

    div_username.addEventListener('focus',clean_msg);
    div_password.addEventListener('focus',clean_msg);
    div_password2.addEventListener('focus',clean_msg);
    div_first_name.addEventListener('focus',clean_msg);
    div_last_name.addEventListener('focus',clean_msg);
    div_email.addEventListener('focus',clean_msg);


    // div_password.addEventListener('keyup',validate_password);
    // div_password2.addEventListener('keyup',validate_password);
    // input_email.addEventListener('keyup',validate_email);  //
    // input_first_name.addEventListener('keyup',validate_name);
    // input_last_name.addEventListener('keyup',validate_name);

    function validate_name(){
        var element = this.value;
        var error_msg = [];
        if (!validate_len_min_ok(element, 3)) {
            error_msg.push("too short ")
        }

        var error_field = document.getElementById('passwordHelp_'+this.name);
        error_field.innerText=error_msg.join(',')
    }



    function clean_msg(){
        var error_msg = document.getElementById('div_'+this.name+'_info');
        error_msg.innerText=''
    }

    function validate_email() {
        var element = this.value;
        var error_msg = [];
        if (this.value !==""){
            if (!validate_mail_sign(element) ||(!validate_dot_sign(element))){
                error_msg.push('email incorrect ')
            }
            if (!validate_len_min_ok(element, 6)) {
                error_msg.push("too short ")
            }
        }
        var error_field = document.getElementById('passwordHelp_'+this.name);
        error_field.innerText=error_msg.join(',')
    }

    function validate_password() {
        //require at least one: number, capital letter, more then 6 sign, less then 20
        var element = this.value;
        var error_msg = [];
        if (this.value !== "") {

            if (!validate_len_min_ok(element, 6)) {
                error_msg.push(" too short")
            }
            if (!validate_len_max_ok(element, 20)) {
                error_msg.push(' too long')
            }
            if (!validate_contain_numbers(element, 1)) {
                error_msg.push(" one number")
            }
            if (!validate_capital_numbers(element, 1)) {
                error_msg.push(' one capital')
            }
        }

        if (this.name === "input_password2") {
            if (input_pwd1.value.length >= 6 && this.value.length >= 6) {
                if (input_pwd1.value !== this.value) {
                    error_msg.push('passwords dont match ')
                }
            }
        }
        console.log(error_msg);
        var error_field = document.getElementById('passwordHelp_' + this.name);
        error_field.innerText = error_msg.join(',')

    }

        if (this.name == "input_password"){
            var error_field = document.getElementById('passwordHelp_'+this.name);
            error_field.innerText=error_msg.join(',')
        }



    function validate_len_min_ok(element, min_length){
        if (element.length <= min_length){
            return false
        }else{
            return true
        }
    }

    function validate_len_max_ok(element,max_length) {
        if (element.length >= max_length){
            return false
        }else{
            return true
        }
    }
    function validate_contain_numbers(element,numbers_count) {
        var num_count = 0
        for (var i = 0; i < element.length; i++) {
            if (/[0-9]/.test(element[i])) {
                num_count += 1
            }
        }
        if (num_count >= numbers_count) {
            return true
        } else {
            return false
        }
    }
    function validate_capital_numbers(element,capital_count){
        var cap_count = 0;
        for (var i =0; i<element.length;i++){
            if(/[A-Z]/.test(element[i]))
                cap_count += 1
        }
        if (cap_count>=capital_count){
            return true
        }else{
            return false
        }
    }
    function validate_mail_sign(element){
        return /[@]/.test(element)
    }
    function validate_dot_sign(element){
        return /[.]/.test(element)
    }
    function validate_mobile_numbers(element){
        return /[0-9]{9}/.test(element)
    }

    function validate_mobile(){
    var element = this.value;
    var error_msg = [];
    if (this.value !== ""){
        if (!validate_mobile_numbers(element)){
            error_msg.push('mobile number incorrect ')
        }
    }
    var error_field = document.getElementById('passwordHelp_'+this.name);
    error_field.innerText=error_msg.join(',')
    }

});