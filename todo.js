/**
 * Created by NinaYoda on 2016-03-14.
 */

function adda(list){

    var itemId = Math.floor((Math.random()+1)*100);
    var item = document.createElement("li");


    var input = document.getElementById("inputItem");
    if(input.value != "") {
        list.appendChild(item);
        item.className = "collection-item";
        item.innerHTML = input.value;
        item.setAttribute("id", itemId.toString());
        item.addEventListener("click", function () {
            makeItemActive(item);
        });
        input.value = "";
    }
    else throwErrorMessage("Du kan inte lägga till föremål i listan utan att ange dem.");

}

function makeItemActive(item){

    if(item.classList.contains("active") ){
        item.className = "collection-item";
    }
    else {
        item.className = "collection-item active";
    }
}

function throwErrorMessage(meddelandeAsString){

    var errorField = document.getElementById("errorField");
    var header = document.getElementById("errorMessage");

    errorField.className="col s12 card";

    header.innerHTML = meddelandeAsString;
    setTimeout(function(){resetErrorMessage(errorField,header)},1500);
}

function resetErrorMessage(errorField, header){

    header.innerHTML = "";
    errorField.className = "col s12 hidden";
}


function edita(list){


    var counter = 0;

    //Räkna hur många element är markerade
    for(var i = 0; i < list.childNodes.length; i++){
        if(list.childNodes[i].className== "collection-item active"){

            counter ++;
        }

    }

    //Om fler element är markerade kommer det upp ett meddelande.
    if(counter > 1){
        throwErrorMessage("Du kan inte ändra flera objekt åt gången.");
    }
    else if(counter < 1){
        throwErrorMessage("Du har inte valt något objekt att ändra.");
    }


    //Ta reda på vilket element som är markerat.
    else {
        var activated;
        var input = document.getElementById("inputItem");
        for(var i = 0; i < list.childNodes.length; i++){
            if(list.childNodes[i].className == "collection-item active"){
                input.value = list.childNodes[i].innerHTML;
                activated = list.childNodes[i];
            }
        }

        //Ändra text på Edit knapp
        var editknapp = document.getElementById("btnEdit");
        editknapp.innerHTML = "Save";

        //Ändra event kopplat till knappen.
        editknapp.onclick = function(){
                save(activated, input);
            };


    }

}

function save(item, input){
    var editknapp = document.getElementById("btnEdit");

    //Updaterar värdet på objektet
    item.innerHTML = input.value;

    //Tömmer input fältet
    input.value = "";
    item.className="collection-item";

    //Ändrar namn på save knappen och funktion.
    editknapp.innerHTML="Edit";
    editknapp.onclick = function(){
        edita(todolist);
    };
}

function tabort(list){

    var items = checkmarked(list);

    //Loopar igenom arrayen och flyttar elementen till donelist
    var donelist = document.getElementById("donelist");
    for(var ref of items) {
        donelist.appendChild(ref);
        ref.className = "collection-item";
    }

}

function tabortforevigt(list){

    var items = checkmarked(list);

    for(var ref of items) {
        ref.parentNode.removeChild(ref);
    }

}

function checkmarked(list){

    var items = [];
    for(var i = 0; i < list.childNodes.length; i++) {
        if (list.childNodes[i].className == "collection-item active") {
            items.push(list.childNodes[i]);
        }
    }
    return items;
}