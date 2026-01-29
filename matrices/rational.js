class Rational {
    constructor(num, den) {
        if (den==0) throw new Error("denominator can't be zero!");
        this.num = num;
        this.den = den;  
    }

    toDecimal(){
        return this.num / this.den;
    }

    reduce(){
        if (this.num==0){
            this.den = 1;
            return;
        }
        let signum = 1;
        if (this.num < 0){
            this.num = -this.num
            signum *= -1;
           };
           if (this.den < 0){
            this.den = -this.den
            signum *= -1;
           };
      var l = lcm(this.den, this.num);
        this.num = signum*this.num / l;
        this.den = this.den / l;
    }

    toString() {
        if (this.den == 1) return this.num.toString();
        return this.num + '/' + this.den;
    }

     times(that){
        this.den = this.den * that.den;
        this.num = this.num * that.num;
        this.reduce();
        }    

    plus(that){
        var newden = this.den * that.den;
        this.num = this.num * that.den + this.den * that.num;
        this.den = newden;
    }    
    sign(){
        if (this.num == 0) return 0;
        if (this.num/this.den < 0) return -1;
        return 1;
    }

}

function clone(input){
    console.log("clone");
    let n = new Rational(input.num, input.den);
    return n;
}

function stringToRational(input){
    let pattern = /^-?\d+$/;
    if (pattern.test(input)){
        console.log("valid integer")
        let result = new Rational(parseInt(input),1);
        return result;
    } 
    pattern = /^-?\d+\/-?\d+$/
    if (pattern.test(input)){
        console.log("valid fraction");
        let a=input.split("/");
        if (a[0]<0 && a[1]<0){
            a[0]=-a[0];
            a[1]=-a[1];
        }
        let result = new Rational(a[0],a[1]);
        result.reduce();
        return result;
    }
    console.log("Unrecognized");
    return null;

}

function negate(a){
    var r = clone(a);
    r.num = -r.num;
    return r
    
}

function reciprocal(a){
    newnum = a.den;
    newden = a.num;
    var result = new Rational(newnum, newden);
    return result;
}

function sum(a,b){
    var newden = a.den * b.den;
    var newnum = a.num * b.den + a.den * b.num;
    var result = new Rational(newnum, newden);
    result.reduce();
    return result;
}    

function difference(a,k){
    var b = new Rational(1,k);
    var newden = a.den * b.den;
    var newnum = a.num * b.den - a.den * b.num;
    var result = new Rational(newnum, newden);
    result.reduce();
    return result;
}    

function product(a,b){
    var newden = a.den * b.den;
    var newnum = b.num * a.num;
    var result = new Rational(newnum, newden);
    result.reduce();
    return result;
}    

function quotient(a,b){
    console.log(a,b)
    var newden = a.den * b.num;
    var newnum = a.num * b.den;
    var result = new Rational(newnum, newden);
    console.log("result = " + result);
    result.reduce();
    return result;
}    


function lcm(a,b){
    if (a==b) return a;
    if (a>b) {
        tmp = b;
        b = a;
        a = tmp;
    }
    r = 1;
    while (r>0){
        r = b % a;
        b = a;
        a = r;
    }
    return b;

}