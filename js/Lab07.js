let allTable = [];
function check_select_one() {
    let index = document.getElementById("select_one").selectedIndex;
    let value = document.getElementById("select_one").options[index].text;

    switch (value){
        case "SELECT ONE":select_one();break;
        case "CREATE TABLE":create_table();break;
        case "ADD ROW":add_row();break;
        case "DELETE ROW":delete_row();break;
        case "DELETE TABLE":delete_table();break;
    }
}
function select_one() {
    document.getElementById("table_input").value = "";
    document.getElementById("number_input").value = "";
    document.getElementById("section_one").style.display = "none";
    document.getElementById("section_two").innerHTML = "";
    document.getElementById("button").style.display = "none";
}
function create_table(){
    document.getElementById("table_input").value = "";
    document.getElementById("number_input").value = "";
    document.getElementById("button").style.display = "none";
    document.getElementById("section_two").innerHTML = "";
    document.getElementById("section_one").style.display = "block";
}

function add_row() {
    document.getElementById("section_one").style.display = "none";
    document.getElementById("section_two").innerHTML = "";
    document.getElementById("button").style.display = "block";
    let index = document.getElementById("select_two").selectedIndex;
    let value = document.getElementById("select_two").options[index].text;

    let arrays = allTable[value];
    for(let i = 0 ; i < arrays[0].length ; i++){
        let input = document.createElement("input");
        input.type = "text";
        input.placeholder = arrays[0][i];
        document.getElementById("section_two").appendChild(input);
    }
}
function delete_row() {
    document.getElementById("section_one").style.display = "none";
    document.getElementById("section_two").innerHTML = "";
    document.getElementById("button").style.display = "block";

    let index = document.getElementById("select_two").selectedIndex;
    let value = document.getElementById("select_two").options[index].text;

    let arrays = allTable[value];
    for(let i = 0 ; i < arrays[0].length ; i++){
        let input = document.createElement("input");
        input.type = "text";
        input.placeholder = arrays[0][i];
        document.getElementById("section_two").appendChild(input);
    }
}
function delete_row_commit() {
    let table_name = document.getElementById("select_two").options[document.getElementById("select_two").selectedIndex].text;
    let array = document.getElementById("section_two").childNodes;
    let other_array = [];
    for(let i = 0 ; i < array.length ; i++){
        other_array.push(array[i].value);
    }
    if(allTable[table_name].length > 1){
        for(let i = 1 ; i < allTable[table_name].length ; i++){
            if(other_array.toString() === allTable[table_name][i].toString()){
                allTable[table_name].splice(i,1);
                break;
            }
        }
        document.getElementById("table").innerHTML = "";
        let tr = document.createElement("tr");

        for(let i = 0 ; i < allTable[table_name][0].length ; i++){
            let th = document.createElement("th");
            th.innerText = allTable[table_name][0][i];
            tr.appendChild(th);
        }
        document.getElementById("table").appendChild(tr);
        if(allTable[table_name].length > 1){
            for(let i = 1 ; i < allTable[table_name].length ; i++){
                let tr = document.createElement("tr");
                for(let j = 0 ; j < allTable[table_name][i].length ; j++){
                    let td = document.createElement("td");
                    td.innerText = allTable[table_name][i][j];
                    tr.appendChild(td)
                }
                document.getElementById("table").appendChild(tr);
            }
        }
    }

}
function delete_table() {
    document.getElementById("section_one").style.display = "none";
    document.getElementById("section_two").innerHTML = "WARNING: You cannot undo this action!";
    document.getElementById("button").style.display = "block";

}
function delete_table_commit() {
    let index = document.getElementById("select_two").selectedIndex;
    let value = document.getElementById("select_two").options[index].text;

    if(value !== "SELECT (default: last created)"){
        delete allTable[value];

        document.getElementById("select_two").removeChild(document.getElementById("select_two").options[index]);

        document.getElementById("select_two").options[0].selected = true;

        if(document.getElementById("select_two").childNodes.length === 1){
            document.getElementById("table").innerHTML = "";
            return;
        }

        change_table();
    }
}
function addInput() {
    let other_tr = document.getElementById("section_two");
    let text = document.getElementById("number_input").value;
    let number = parseInt(text);
    other_tr.innerHTML = "";

    if(number <= 0 || text === undefined){
        document.getElementById("button").style.display = "none";
    }
    else if(number > 0){
        document.getElementById("button").style.display = "block";

        for(let i = 0 ; i < number ; i++){
            let input = document.createElement("input");
            input.type = "text";
            input.placeholder = "Attribute";

            other_tr.appendChild(input);
        }
    }
}
function commit() {
    let index = document.getElementById("select_one").selectedIndex;
    let value = document.getElementById("select_one").options[index].text;

    switch (value){
        case "CREATE TABLE":create_table_commit();break;
        case "ADD ROW":add_row_commit();break;
        case "DELETE ROW":delete_row_commit();break;
        case "DELETE TABLE":delete_table_commit();break;
    }
}
function change_table() {
    document.getElementById("table").innerHTML = "";
    let index = document.getElementById("select_two").selectedIndex;
    let value = document.getElementById("select_two").options[index].text;
    if(value === "SELECT (default: last created)"){
        document.getElementById("table").innerHTML = "";
    }

    let arrays = allTable[value];
    let tr = document.createElement("tr");

    for(let i = 0 ; i < arrays[0].length ; i++){
        let th = document.createElement("th");
        th.innerText = arrays[0][i];
        tr.appendChild(th);
    }
    document.getElementById("table").appendChild(tr);
    if(arrays.length > 1){
        for(let i = 1 ; i < arrays.length ; i++){
            let tr = document.createElement("tr");
            for(let j = 0 ; j < arrays[i].length ; j++){
                let td = document.createElement("td");
                td.innerText = arrays[i][j];
                tr.appendChild(td)
            }
            document.getElementById("table").appendChild(tr);
        }
    }
}
function check_table_name() {
    if(document.getElementById("table_input").value === undefined){
        document.getElementById("button").style.display = "none";
    }
}
function create_table_commit() {
    //往section2里面添加table的名字
    let attr = [];
    let table = [];
    let table_number = document.getElementById("table_input").value;
    if(table_number !== undefined) {
        let option = document.createElement("option");
        option.text = table_number;
        option.selected = true;
        document.getElementById("select_two").appendChild(option);
    }

    //对table元素的内容清空
    document.getElementById("table").innerHTML = "";

    //添加table当中的元素
    let array = document.getElementById("section_two").childNodes;
    let tr = document.createElement("tr");
    for(let i = 0 ; i < array.length ; i++){
        if(array[i].value === undefined){
            alert("something is empty.");
            return;
        }
        let th = document.createElement("th");
        th.innerText = array[i].value;
        tr.appendChild(th);
        attr.push(array[i].value);
    }
    table.push(attr);
    allTable.push(table_number);
    allTable[table_number] = table;
    document.getElementById("table").appendChild(tr);

    document.getElementById("table_input").value = "";
    document.getElementById("number_input").value = "";
    document.getElementById("section_two").innerHTML = "";
    document.getElementById("button").style.display = "none";
}
function add_row_commit() {
    let attr = [];
    let array = document.getElementById("section_two").childNodes;
    let table_name = document.getElementById("select_two").options[document.getElementById("select_two").selectedIndex].text;
    let tr = document.createElement("tr");

    for(let i = 0 ; i < array.length ; i++){
        let td = document.createElement("td");
        td.innerText = array[i].value;
        tr.appendChild(td);
        attr.push(array[i].value);
    }
    document.getElementById("table").appendChild(tr);
    allTable[table_name].push(attr);
}