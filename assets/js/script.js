// star functions onload 
window.onload = function(){
    selectOptions_size();
    selectOptions_color();
}


// selecao do tamanho
function selectOptions_size() {
    // fecha a overlay de seleção
    document.getElementById("btn_select").click();          

    // acede e escreve o valor selecionado pelo user
    var selected = document.querySelector('input[name="size"]:checked').value;
    document.getElementById("option_selected_size").innerHTML = selected;

    // saber o value para por class '.btn_selected'
    var teste = document.querySelector('input[name="size"]:checked').value;
    console.log(teste);
 
}


// selecao do cor
function selectOptions_color() {
    // fecha a overlay de seleção
    document.getElementById("btn_select1").click();          

    // acede e escreve o valor selecionado pelo user
    var selected_color = document.querySelector('input[name="color"]:checked').value;
    document.getElementById("option_selected_color").innerHTML = selected_color;

    // saber o value para por class '.btn_selected'
    var teste = document.querySelector('input[name="color"]:checked').value;
    console.log(teste);

    
 
}

