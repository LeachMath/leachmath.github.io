function initializepage(){
window.addEventListener('keydown', function(evt) {
    evt.stopImmediatePropagation();
    console.log(evt.key);
    if ((evt.key === 'Z' || evt.key ==='z') && (evt.ctrlKey || evt.metaKey)) {
        undolastrowop();
    }
});
}


function computeCrossProduct(){
document.getElementById("result").innerHTML="";
var ax = stringToRational(document.getElementById("Ax").value);
var ay = stringToRational(document.getElementById("Ay").value);
var az = stringToRational(document.getElementById("Az").value);
var bx = stringToRational(document.getElementById("Bx").value);
var by = stringToRational(document.getElementById("By").value);
var bz = stringToRational(document.getElementById("Bz").value);

var cx = difference(product(ay,bz),product(az,by));
var cy = negate(difference(product(ax,bz),product(az,bx)));
var cz = difference(product(ax,by),product(ay,bx));

console.log(cx.toString());
console.log(cy.toString());
console.log(cz.toString());

var output="A &#x2715 B = &#x2329" + " "+ cx + ", " + cy + ", " + cz  + "&#x232A";

document.getElementById("result").innerHTML=output;


}

function readinmatrix() {
    console.log("READINMATRIX");
    var numrows = document.getElementById("numrows").value;
    var numcols = document.getElementById("numcols").value;
    var entries = document.getElementById("list").value;
    console.log(entries);
   entries = entries.trim().split(/[\s,\t,\n]+/).join(' ');
    var newentries = entries.split(' ');
    for (var i=0; i<newentries.length; i++){
        // newentries[i]=parseFloat(newentries[i]);
         newentries[i]=new Rational(parseInt(newentries[i]),1);
       console.log("BLAH");
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
    // A.trim();
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
    console.log(A);
    A.swap(r1,r2);
    console.log(A);
    console.log(r1);
    console.log(r2);
    rowoperation = "R" + r1 + " &harr; R" + r2;
    update();
}

function scalerow(){
    const row = document.getElementById("scalerow").value;
    const k = stringToRational(document.getElementById("k1").value);
    console.log("k = ", k);
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
    const k = stringToRational(document.getElementById("k2").value);
    console.log("lll  "+k);
    if (k==0) throw new Error("Division by 0.")
    else{
        Ahistory.push(A.getClone());
        console.log("ABC " + k);
        A.scale(row,reciprocal(k));
        rowoperation = "R" + row + " &div; " + k;
        update();
    }
} 
  
function combinerows(){
    const r1 = document.getElementById("addrow1").value;
    const r2 = document.getElementById("addrow2").value;
    const k = stringToRational(document.getElementById("k3").value);

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
    const k = stringToRational(document.getElementById("k4").value);
    if (r1 == r2 && k==1) throw new Error("can't subtract a row from itself.");
    else {
      Ahistory.push(A.getClone());
      A.addmultiple(r1,r2,negate(k));
      var multiplier = k;
      if (k==1) multiplier = ""
      rowoperation = "R" + r1 + " - " + multiplier + "R" + r2;
      update();
    }   
}


function copytoclipboard(){
    navigator.clipboard.writeText(matrixarea.textContent);
}