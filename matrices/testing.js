let monitor = document.getElementById("output");


function printf(a){
    if (a==null) a="";
    monitor.innerHTML += a;
    monitor.innerHTML += "<br>"; 
}

function getfrac(){
    k2 =  document.getElementByIdc("k2").value;
    let m = stringToRational(k2);
    console.log(m);
 }

 function multiply(){
    k2 =  document.getElementById("k2").value;
    let m = stringToRational(k2);
    k1 =  document.getElementById("k1").value;
    let n = stringToRational(k1);
     let pd = product(m,n);
     document.getElementById("ans").value=pd.toString();
 }
  
let a = new Rational(1,3);
let b = new Rational(2,1);
let c = new Rational(3,7);
let d = new Rational(4,1);
let e = new Rational(5,4);
let f = new Rational(6,7);
let g = new Rational(7,1);
let h = new Rational(8,3);
let j = new Rational(8,9);

m = new Matrix(3,3,[9,9,3,d,e,f,g,h,j]);
n = new Matrix(3,3,[1,2,3,4,5,6,7,8,9]);

// printf(a.toString());
// printf(b.toString());
// printf(c.toString());
// printf(d.toString());
printf("---------------");
console.log(m.toString());
printf(m.toString());
console.log(m.toString());

m.scale(1,3);
console.log(m.toString());
printf(m.toString());

