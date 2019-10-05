document.addEventListener("DOMContentLoaded", function() {
  var fn = document.getElementById('fn');
  var ln = document.getElementById('ln');
  var mail = document.getElementById('mail');
  var pwd = document.getElementById('pwd');
  var pswd_div = document.querySelector(".psswd_div");
  var rep_pswd_div = document.querySelector(".rep_pwd");

  fn.addEventListener('keyup', show_pswd);
  ln.addEventListener('keyup', show_pswd);
  mail.addEventListener('keyup', show_pswd);
  pwd.addEventListener('keyup', show_rep_pswd);


  function show_rep_pswd() {
    rep_pswd_div.hidden = false;
    show_pswd()
  }

  function show_pswd() {
    pswd_div.hidden = false
  }
    function show_pswd_rep() {
    rep_pswd_div.hidden = false
  }
});