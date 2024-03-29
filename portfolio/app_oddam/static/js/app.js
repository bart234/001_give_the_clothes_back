document.addEventListener("DOMContentLoaded", function() {
  /**
   * TO sort elements on step 3
   */
    let checked_list = [];
    let inst_group = document.querySelectorAll('.inst-group');
    let cat_group = document.querySelectorAll('.categories--list');
    let sort_trigg = document.querySelector('.sort-trigger');
    let information_div = document.querySelector('.inst-information');
    let btn_cat_reveal = document.querySelector('.categories-reveal');
    let summary_step = document.querySelector('.summary-step');
    let s_content = document.querySelector('.summary-content');
    let s_bags_in = document.querySelector('.s_bags');
    let s_inst_out= document.querySelector('.sumary-out-inst');
    let show_fund = document.getElementById('show_fund');
    let show_org = document.getElementById('show_org');
    let show_coll = document.getElementById('show_coll');


   //region institution buttons
    let div_fund = document.getElementById('div_fundation');
    let div_org = document.getElementById('div_org');
    let div_coll = document.getElementById('div_coll');

    // let div_fund_btn = document.getElementById('div_fundation_btn');
    // let div_org_btn = document.getElementById('div_org_btn');
    // let div_coll_btn = document.getElementById('div_coll_btn');


    if (typeof (show_fund) !== 'undefined' && show_fund != null){
      show_fund.addEventListener("click", show_only_fund);
      show_org.addEventListener("click", show_only_org);
      show_coll.addEventListener("click", show_only_coll);
    }

    //
    function show_only_fund() {
      div_fund.classList.add("active");
      div_org.classList.remove("active");
      div_coll.classList.remove("active");
      // div_fund_btn.hidden = false;
      // div_org_btn.hidden = true;
      // div_coll_btn.hidden = true;
    }

    function show_only_org() {
      div_fund.classList.remove("active");
      div_org.classList.add("active");
      div_coll.classList.remove("active");
      // div_fund_btn.hidden = true;
      // div_org_btn.hidden = false;
      // div_coll_btn.hidden = true;
    }

    function show_only_coll() {
      div_fund.classList.remove("active");
      div_org.classList.remove("active");
      div_coll.classList.add("active");
      // div_fund_btn.hidden = true;
      // div_org_btn.hidden = true;
      // div_coll_btn.hidden = false;
    }
  //endregion


  //region events
  if (typeof (sort_trigg) !== 'undefined' && sort_trigg != null){
      sort_trigg.addEventListener("click",sort_function);
      btn_cat_reveal.addEventListener("click",reveal_inst);
      summary_step.addEventListener("mouseover",enable_next_step);
      summary_step.addEventListener("click",set_summary);
      
    }

  function enable_next_step(){
    let x =0;
    if((in_adress.value == "") == false && (document.getElementById("address-info").innerText == "") == true){
      x +=1}
    if((in_city.value == "") == false && (document.getElementById("city-info").innerText == "") == true){
      x +=1}
    if((in_postcode.value == "") == false && (document.getElementById("postcode-info").innerText == "") == true){
      x +=1}
    if((in_phone.value == "") == false && (document.getElementById("phone-info").innerText == "") == true){
      x +=1}
    if((data.value == "") == false && (document.getElementById("pick_up_data-info").innerText == "") == true){
      x +=1}
    if((time.value == "") == false && (document.getElementById("pick_up_time-info").innerText == "") == true){
      x +=1}


    console.log(x);
    if (x=6){
        summary_step.disabled = false
    }else {
        summary_step.disabled = true
    }
  }
  //endregion


  //region to check if at least one chcekbox is checked
  for (let a= 0;a<cat_group.length;a++){
    cat_group[a].addEventListener('change',let_to_step_2)
  }
  var counter = 0;

  function let_to_step_2() {
    if (this.checked) {
      counter++;
      on_off_to_step_2()
    } else {
      counter--;
      on_off_to_step_2()
    }
  }

  function on_off_to_step_2(){
    if (counter >0){
      sort_trigg.disabled = false
    }else{
      sort_trigg.disabled = true
    }
  }
  //endregion

  //region to check if  institution is checked
  let to_step_4 = document.querySelector('.to_step_4');
  let radio_coll = document.getElementsByName("inst_id");
    for (let a= 0;a<radio_coll.length;a++){
    radio_coll[a].addEventListener('change',let_to_step_4)
  }

    function let_to_step_4(){
      for (let i =0; i<radio_coll.length;i++){
        if (radio_coll[i].checked){
           to_step_4.disabled = false
        }
      }
    }
  //endregion

    // variable to  take data form
    let in_adress = document.getElementById("address");
    let in_city = document.getElementById("city");
    let in_postcode = document.getElementById("postcode");
    let in_phone = document.getElementById("phone");
    let in_data = document.getElementById("data");
    let in_time = document.getElementById("time");
    let in_more_info = document.getElementById("more_info");

    //variable to put data to summary
    let out_adress = document.querySelector(".out_address");
    let out_city = document.querySelector(".out_city");
    let out_postcode = document.querySelector(".out_postcode");
    let out_phone = document.querySelector(".out_phone");
    let out_data = document.querySelector(".out_data");
    let out_time = document.querySelector(".out_time");
    let out_more_info = document.querySelector(".out_more_info");


    in_adress.addEventListener('focus',clean_msg);
    in_adress.addEventListener('keyup',validate_string);
    in_city.addEventListener('focus',clean_msg);
    in_city.addEventListener('keyup',validate_string);
    in_postcode.addEventListener('focus',clean_msg);
    in_postcode.addEventListener('keyup',zip_code_check);
    in_phone.addEventListener('focus',clean_msg);
    in_phone.addEventListener('keyup',mobile);





    // in_data.addEventListener('focus',clean_msg);
    // in_data.addEventListener('blur',check_data);
    //
    // function check_data(){
    //     let error_msg = [];
    //     if (Date.now >this.value){
    //         error_msg.push('sdf');
    //     }else{
    //         error_msg.push('Data odbioru musi byc wieksza od dnia jutrzejszego');
    //     };
    //     let error_field = document.getElementById(this.name+'-info');
    //     error_field.innerText=error_msg.join(',')
    // }

   

    function mobile(){
        let element = this.value;
        let error_msg = [];
        if ( !(validate_mobile_numbers(element))){
             error_msg.push('Numer telefonu jest za krotki');
        }else{
        }
        let error_field = document.getElementById(this.name+'-info');
        error_field.innerText=error_msg.join(',')

    }
    function validate_mobile_numbers(element){
        return /[0-9]{9}/.test(element)
    }

    function zip_code_check(){

        let element = this.value;
        let error_msg = [];
        var patt = new RegExp("[0-9]{2}-[0-9]{3}");
        var res = patt.test(element);
        if (!(res)) {
            error_msg.push('Popraw kod pocztowy do  formatu xx-xxx');
        }else{
        }
        let error_field = document.getElementById(this.name+'-info');
        error_field.innerText=error_msg.join(',')
    }

    function clean_msg(){
        let error_msg2 = document.getElementById(this.name+'-info');
        error_msg2.innerText=''
    }

    function validate_string(){
        let element = this.value;
        let error_msg = [];

        if (!validate_len_min_ok(element, 3)) {
            error_msg.push('`Wprowadzony` tekst jest za krotki');
        }else {
        }

        let error_field = document.getElementById(this.name+'-info');
        error_field.innerText=error_msg.join(',')

    }

    function validate_len_min_ok(element, min_length){
        if (element.length <= min_length){
            return false
        }else{
            return true
        }
    }

    function set_summary() {
      s_content.innerText =  s_bags_in.value + " worki zawierajacych "+ checked_list;
      radio_coll = document.getElementsByName("inst_id");
      for (let i =0; i<radio_coll.length;i++){
        if (radio_coll[i].checked){
           s_inst_out.innerText = radio_coll[i].value;
        }
      }



      out_adress.innerText= in_adress.value;
      out_city.innerText=in_city.value;
      out_postcode.innerText=in_postcode.value;
      out_phone.innerText=in_phone.value;
      out_data.innerText=in_data.value;
      out_time.innerText=in_time.value;
      out_more_info.innerText=in_more_info.value;
    }



    function reveal_inst(){
      for (let c = 0; c< inst_group.length;c++){
          inst_group[c].hidden = false;
          checked_list = []
          }
      }


    function sort_function() {
      //take array with categories from checkboxes
        for (let i = 0; i< cat_group.length;i++){
          if (cat_group[i].checked){
            checked_list.push(cat_group[i].name);
          }
        }



        //take array with caterories from institution , remove last one
        for (let a = 0; a< inst_group.length;a++){
          let temp_list = (inst_group[a].childNodes[1].children[0].dataset.categories).split('-');
          temp_list.pop(temp_list.length-1);

          // check if all elements from checked_list are in temp_list
          // then nothing, else put hide in div
          for (let b = 0; b<checked_list.length;b++){
            if (temp_list.includes(checked_list[b])){
            }else{
              inst_group[a].hidden = true
            }
          }
        }
        let counter = 0;
        for (a = 0; a< inst_group.length;a++){
            if (inst_group[a].hidden){
              counter ++
            }
        }

        if (counter == inst_group.length){
            information_div.hidden = false
        }else{
          information_div.hidden = true
        }

        }


  /**
   * HomePage - Help section
   */
   class Help {
    constructor($el) {
      this.$el = $el;
      this.$buttonsContainer = $el.querySelector(".help--buttons");
      this.$slidesContainers = $el.querySelectorAll(".help--slides");
      this.currentSlide = this.$buttonsContainer.querySelector(".active").parentElement.dataset.id;
      this.init();
    }

    init() {
      this.events();
    }

    events() {
      /**
       * Slide buttons
       */
      this.$buttonsContainer.addEventListener("click", e => {
        if (e.target.classList.contains("btn")) {
          this.changeSlide(e);
        }
      });

      /**
       * Pagination buttons
       */
      this.$el.addEventListener("click", e => {
        if (e.target.classList.contains("btn") && e.target.parentElement.parentElement.classList.contains("help--slides-pagination")) {
          this.changePage(e);
        }
      });
    }

    changeSlide(e) {
      e.preventDefault();
      const $btn = e.target;

      // Buttons Active class change
      [...this.$buttonsContainer.children].forEach(btn => btn.firstElementChild.classList.remove("active"));
      $btn.classList.add("active");

      // Current slide
      this.currentSlide = $btn.parentElement.dataset.id;

      // Slides active class change
      this.$slidesContainers.forEach(el => {
        el.classList.remove("active");

        if (el.dataset.id === this.currentSlide) {
          el.classList.add("active");
        }
      });
    }

    /**
     * TODO: callback to page change event
     */
    changePage(e) {
      e.preventDefault();
      const page = e.target.dataset.page;

      console.log(page);
    }
  }
  const helpSection = document.querySelector(".help");
  if (helpSection !== null) {
    new Help(helpSection);
  }

  /**
   * Form Select
   */
  class FormSelect {
    constructor($el) {
      this.$el = $el;
      this.options = [...$el.children];
      this.init();
    }

    init() {
      this.createElements();
      this.addEvents();
      this.$el.parentElement.removeChild(this.$el);
    }

    createElements() {
      // Input for value
      this.valueInput = document.createElement("input");
      this.valueInput.type = "text";
      this.valueInput.name = this.$el.name;

      // Dropdown container
      this.dropdown = document.createElement("div");
      this.dropdown.classList.add("dropdown");

      // List container
      this.ul = document.createElement("ul");

      // All list options
      this.options.forEach((el, i) => {
        const li = document.createElement("li");
        li.dataset.value = el.value;
        li.innerText = el.innerText;

        if (i === 0) {
          // First clickable option
          this.current = document.createElement("div");
          this.current.innerText = el.innerText;
          this.dropdown.appendChild(this.current);
          this.valueInput.value = el.value;
          li.classList.add("selected");
        }

        this.ul.appendChild(li);
      });

      this.dropdown.appendChild(this.ul);
      this.dropdown.appendChild(this.valueInput);
      this.$el.parentElement.appendChild(this.dropdown);
    }

    addEvents() {
      this.dropdown.addEventListener("click", e => {
        const target = e.target;
        this.dropdown.classList.toggle("selecting");

        // Save new value only when clicked on li
        if (target.tagName === "LI") {
          this.valueInput.value = target.dataset.value;
          this.current.innerText = target.innerText;
        }
      });
    }
  }
  document.querySelectorAll(".form-group--dropdown select").forEach(el => {
    new FormSelect(el);
  });

  /**
   * Hide elements when clicked on document
   */
  document.addEventListener("click", function(e) {
    const target = e.target;
    const tagName = target.tagName;

    if (target.classList.contains("dropdown")) return false;

    if (tagName === "LI" && target.parentElement.parentElement.classList.contains("dropdown")) {
      return false;
    }

    if (tagName === "DIV" && target.parentElement.classList.contains("dropdown")) {
      return false;
    }

    document.querySelectorAll(".form-group--dropdown .dropdown").forEach(el => {
      el.classList.remove("selecting");
    });
  });

  /**
   * Switching between form steps
   */
  class FormSteps {
    constructor(form) {
      this.$form = form;
      this.$next = form.querySelectorAll(".next-step");
      this.$prev = form.querySelectorAll(".prev-step");
      this.$step = form.querySelector(".form--steps-counter span");
      this.currentStep = 1;

      this.$stepInstructions = form.querySelectorAll(".form--steps-instructions p");
      const $stepForms = form.querySelectorAll("form > div");
      this.slides = [...this.$stepInstructions, ...$stepForms];

      this.init();
    }

    /**
     * Init all methods
     */
    init() {
      this.events();
      this.updateForm();
    }

    /**
     * All events that are happening in form
     */
    events() {
      // Next step
      this.$next.forEach(btn => {
        btn.addEventListener("click", e => {
          e.preventDefault();
          this.currentStep++;
          this.updateForm();
        });
      });

      // Previous step
      this.$prev.forEach(btn => {
        btn.addEventListener("click", e => {
          e.preventDefault();
          this.currentStep--;
          this.updateForm();
        });
      });

      // Form submit
      this.$form.querySelector("form").addEventListener("submit", e => this.submit(e));
    }

    /**
     * Update form front-end
     * Show next or previous section etc.
     */
    updateForm() {
      this.$step.innerText = this.currentStep;

      // TODO: Validation

      this.slides.forEach(slide => {
        slide.classList.remove("active");

        if (slide.dataset.step == this.currentStep) {
          slide.classList.add("active");
        }
      });

      this.$stepInstructions[0].parentElement.parentElement.hidden = this.currentStep >= 6;
      this.$step.parentElement.hidden = this.currentStep >= 6;

      // TODO: get data from inputs and show them in summary
    }

    /**
     * Submit form
     *
     * TODO: validation, send data to server
     */
    submit(e) {
      // e.preventDefault();
      this.currentStep++;
      this.updateForm();
    }
  }
  const form = document.querySelector(".form--steps");
  if (form !== null) {
    new FormSteps(form);
  }
});