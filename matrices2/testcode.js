// A = new Matrix(3,3,[1,2,3,4,5,6,3,0,3]);
// A = new Matrix(3,4,[1,1,1,21, 3,-4,2,28, 7,0,6,112]);
// A = new Matrix(3,4,[2,3,-1,7, 4,5,-2,10, 0,1,-3,-5]);
A = new Matrix(2,2,[0,0,0,0]);
console.log(A.toString());
var mdiv = document.getElementById("matrixarea");
mdiv.innerHTML = "";
var rowoperation;
var Ahistory = [];

function initializepage(){
window.addEventListener('keydown', function(evt) {
    evt.stopImmediatePropagation();
    console.log(evt.key);
    if ((evt.key === 'Z' || evt.key ==='z') && (evt.ctrlKey || evt.metaKey)) {
        undolastrowop();
    }
});
}



function readinmatrix() {
    var numrows = document.getElementById("numrows").value;
    var numcols = document.getElementById("numcols").value;
    var entries = document.getElementById("list").value;
    console.log(entries);
   entries = entries.trim().split(/[\s,\t,\n]+/).join(' ');
    var newentries = entries.split(' ');
    for (var i=0; i<newentries.length; i++){
        newentries[i]=parseFloat(newentries[i]);
        }
    console.log(newentries);
    A = new Matrix(numrows, numcols, newentries)
    mdiv.innerHTML += A.toString();
    mdiv.scrollTop = mdiv.scrollHeight;
    Ahistory = [];
}

function cleararea(){
    mdiv.innerHTML = "";
}

function undolastrowop(){
    matrixarea.removeChild(matrixarea.lastChild);
    A = Ahistory.pop().getClone();
    console.log(Ahistory);
}



function update(){
    A.trim();
    const newMatDiv = document.createElement("div");
    newMatDiv.classList.add("matdiv");
    newMatDiv.innerHTML += "<br>" + rowoperation +"<br>";
    newMatDiv.innerHTML += A.toString();
    mdiv.appendChild(newMatDiv);
    mdiv.scrollTop = mdiv.scrollHeight;
}

function swaprows(){
    Ahistory.push(A.getClone());
    const r1 = document.getElementById("swaprow1").value;
    const r2 = document.getElementById("swaprow2").value;
    A.swap(r1,r2);
    console.log(r1);
    console.log(r2);
    rowoperation = "R" + r1 + " &harr; R" + r2;
    update();
}

function scalerow(){
    const row = document.getElementById("scalerow").value;
    const k = document.getElementById("k1").value;
    if (k==0) throw new Error("Can't scale by 0.")
    else{
        Ahistory.push(A.getClone());
        A.scale(row,k);
        rowoperation = "R" + row + " &times; " + k;
        update();
    }
} 

function dividerow(){
    const row = document.getElementById("scalerow2").value;
    const k = document.getElementById("k2").value;
    if (k==0) throw new Error("Division by 0.")
    else{
        Ahistory.push(A.getClone());
        A.scale(row,1/k);
        rowoperation = "R" + row + " &div; " + k;
        update();
    }
} 

function combinerows(){
    const r1 = document.getElementById("addrow1").value;
    const r2 = document.getElementById("addrow2").value;
    const k = document.getElementById("k3").value;
    if (r1 == r2 && k==-1) throw new Error("can't subtract a row from itself.");
    else {
        Ahistory.push(A.getClone());
        A.addmultiple(r1,r2,k);
        var multiplier = k;
        if (k==1) multiplier = ""
        rowoperation = "R" + r1 + " + " + multiplier + "R" + r2;
        update();
    }    
}

function subtractrows(){
    const r1 = document.getElementById("subrow1").value;
    const r2 = document.getElementById("subrow2").value;
    const k = document.getElementById("k4").value;
    if (r1 == r2 && k==1) throw new Error("can't subtract a row from itself.");
    else {
      Ahistory.push(A.getClone());
      A.addmultiple(r1,r2,-k);
      var multiplier = k;
      if (k==1) multiplier = ""
      rowoperation = "R" + r1 + " - " + multiplier + "R" + r2;
      update();
    }   
}


function copytoclipboard(){
    navigator.clipboard.writeText(matrixarea.textContent);
}