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

    let condition_1='required, max 10 letters or numbers';
    let condition_2='require at least one: number, capital letter, more then 6 sign, less then 20';
    let condition_4='required, max 18 letters';
    let condition_5='required, max 22 letters';

    let condition_short = "too short ";
    let condition_long = "too long ";
    let condition_email = 'email incorrect ';
    let condition_one_num = ' one number';
    let condition_one_cap = ' one capital';
    let condition_pwd_incorret = 'passwords dont match ';

    let second_pswd_name = "password2"

    div_username_info.innerText = condition_1;
    div_password_info.innerText= condition_2;
    div_password2_info.innerText= condition_2;
    div_first_name_info.innerText=condition_4;
    div_last_name_info.innerText= condition_4;
    div_email_info.innerText= condition_5;

    div_username.addEventListener('focus',clean_msg);
    div_password.addEventListener('focus',clean_msg);
    div_password2.addEventListener('focus',clean_msg);
    div_first_name.addEventListener('focus',clean_msg);
    div_last_name.addEventListener('focus',clean_msg);
    div_email.addEventListener('focus',clean_msg);

    div_username.addEventListener('keyup',validate_username);
    div_password.addEventListener('keyup',validate_password);
    div_password2.addEventListener('keyup',validate_password);
    div_email.addEventListener('keyup',validate_email);
    div_first_name.addEventListener('keyup',validate_name);
    div_last_name.addEventListener('keyup',validate_name);

    div_username.addEventListener('focusout',validate_username);
    div_password.addEventListener('focusout',validate_password);
    div_password2.addEventListener('focusout',validate_password);
    div_email.addEventListener('focusout',validate_email);
    div_first_name.addEventListener('focusout',validate_name);
    div_last_name.addEventListener('focusout',validate_name);



    function validate_name(){
        let element = this.value;
        let error_msg = [];
        if (!validate_len_min_ok(element, 3)) {
            error_msg.push()
        }
        if (!validate_len_min_ok(element, 0)) {
            error_msg.push(condition_4)
        }
        let error_field = document.getElementById('div_'+this.name+'_info');
        error_field.innerText=error_msg.join(',')
    }


    function validate_username(){
        let element = this.value;
        let error_msg = [];
        if (!validate_len_min_ok(element, 3)) {
            error_msg.push(condition_short)
        }
        if (!validate_len_min_ok(element, 0)) {
            error_msg.push(condition_1)
        }
        let error_field = document.getElementById('div_'+this.name+'_info');
        error_field.innerText=error_msg.join(',')
    }

    function clean_msg(){
        let error_msg = document.getElementById('div_'+this.name+'_info');
        error_msg.innerText=''
    }

    function validate_email() {
        let element = this.value;
        let error_msg = [];
        if (this.value !==""){
            if (!validate_mail_sign(element) ||(!validate_dot_sign(element))){
                error_msg.push(condition_email)
            }
            if (!validate_len_min_ok(element, 6)) {
                error_msg.push(condition_short)
            }
        }
        let error_field = document.getElementById('div_'+this.name+'_info');
        error_field.innerText=error_msg.join(',')
    }

    function validate_password() {
        //require at least one: number, capital letter, more then 6 sign, less then 20
        let element = this.value;
        let error_msg = [];
        if (this.value !== "") {

            if (!validate_len_min_ok(element, 6)) {
                error_msg.push(condition_short)
            }
            if (!validate_len_max_ok(element, 20)) {
                error_msg.push(condition_long)
            }
            if (!validate_contain_numbers(element, 1)) {
                error_msg.push(condition_one_num)
            }
            if (!validate_capital_numbers(element, 1)) {
                error_msg.push(condition_one_cap)
            }
        }

        if (this.name === second_pswd_name) {
            if (div_password.value.length >= 6 && this.value.length >= 6) {
                if (div_password.value !== this.value) {
                    error_msg.push(condition_pwd_incorret)
                }
            }
        }
        if (!validate_len_min_ok(element, 0)) {
            error_msg.push(condition_2)
        }
        let error_field = document.getElementById('div_'+this.name+'_info');
        error_field.innerText = error_msg.join(',') 

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


});