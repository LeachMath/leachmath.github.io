class Rational {
    constructor(num, den) {
        this.num = num;
        this.den = den;
    }

    toDecimal(){
        return this.num / this.den;
    }

    reduce(){
        var l = lcm(this.den, this.num);
        this.num = this.num / l;
        this.den = this.den / l;
    }

    toString() {
        if (this.den == 1) return this.num;
        return this.num + '/' + this.den;
    }

    plus(that){
        var newden = this.den * that.den;
        this.num = this.num * that.den + this.den * that.num;
        this.den = newden;
    }    

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

function difference(a,b){
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
    var newden = a.den * b.num;
    var newnum = a.num * b.den;
    var result = new Rational(newnum, newden);
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