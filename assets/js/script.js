// star functions onload 
window.onload = function(){
    selectOptions_size();
    selectOptions_color();
}

// ---- quantidade (+/-) -----
var count = 1;
function plus(){
    count++;
    document.getElementById("btn_count").innerHTML = count;
}
function minus(){
  if (count > 1) {
    count--;
    document.getElementById("btn_count").innerHTML = count;
  }  
}


// selecao do tamanho
function selectOptions_size() {
    // fecha a overlay de seleção
    document.getElementById("btn_select_size").click();  
    
    var options = document.querySelectorAll('input[name="size"]');
    var selectedValue, option_val;

    for (var option of options) {
        if (option.checked) {
            //opção selecionada - adiciona class 'btn_selected'
            selectedValue = option.value;
            document.getElementById("option_selected_size").innerHTML = selectedValue;
            document.getElementById(selectedValue+'_label').classList.add("btn_selected");
            /* alert(selectedValue); */
        } else {
            //opções não selecionadas - remove class 'btn_selected'
            option_val = option.value;
            document.getElementById(option_val+'_label').classList.remove("btn_selected");
            /* console.log(option_val); */
        }
    }
 
}



// selecao do cor
function selectOptions_color() {
    // fecha a overlay de seleção
    document.getElementById("btn_select_color").click();   
    
    var options = document.querySelectorAll('input[name="color"]');
    var selectedValue, option_val;

    for (var option of options) {
        if (option.checked) {
            //opção selecionada - adiciona class 'btn_selected'
            selectedValue = option.value;
            document.getElementById("option_selected_color").innerHTML = selectedValue;
            document.getElementById(selectedValue+'_label').classList.add("btn_selected");
            /* alert(selectedValue); */
        } else {
            //opções não selecionadas - remove class 'btn_selected'
            option_val = option.value;
            document.getElementById(option_val+'_label').classList.remove("btn_selected");
            /* console.log(option_val); */
        }
    }



    // acede e escreve o valor selecionado pelo user
    /* var selected_color = document.querySelector('input[name="color"]:checked').value;
    document.getElementById("option_selected_color").innerHTML = selected_color; */

    //Modificar a IMG dependendo da cor selecionada
    /* document.getElementById("myImage").src = 'img/new-image.jpg'; */

    // saber o value para por class '.btn_selected'
    /* var teste = document.querySelector('input[name="color"]:checked').value;
    console.log(teste); */

    /* var selected_option_slide = document.getElementById(selected_color);
    selected_option_slide.classList.add("btn_selected");
    console.log(selected_option_slide);  */

    
}

