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