class Matrix{
 
    constructor (numrows, numcols, entries){
        this.numrows = numrows;
        this.numcols = numcols;
        this.entries = [];
        for(var i=0; i<this.numrows; i++){
            this.entries.push([]);
            for(var j=0; j<this.numcols; j++){
                // console.log(entries);
                this.entries[i].push(entries.shift());
                // console.log(entries, this.entries);
            }            
        }
    }
    

    getClone(){
        let n = new Matrix(this.numrows, this.numcols, []);
        for( let i=0; i<this.numrows; i++){
            for (let j=0; j<this.numcols; j++){
                n.entries[i][j] = this.entries[i][j];
            }
        }
        return n;
    }

    swap(a,b){
        if (a<1 || a>this.numrows+1 || b<1 || b>this.numrows+1) throw new Error("bad row index");
        var tmp = this.entries[a-1];
        this.entries[a-1] = this.entries[b-1];
        this.entries[b-1] = tmp;        
    }

    scale(row, k){
        if (row<1 || row>this.numrows+1) throw new Error("bad row index");
        if (k==0) throw new Error("can't scale by 0");
        for(var i=0; i<this.numcols; i++){
            this.entries[row-1][i] *= k;
        }
    }

    addmultiple(row1, row2, k){
        if (row1<1 || row1>this.numrows+1 || row2<1 || row2>this.numrows+1) throw new Error("bad row index");
        if (k==0) throw new Error("can't scale by 0");
        for(var i=0; i<this.numcols; i++){
            this.entries[row1-1][i]  += this.entries[row2-1][i] *k;
        }
    }



    trim(){
        for (var j=0; j<this.numrows; j++){
            for (var i=0; i<this.numcols; i++){
                var value = this.entries[j][i];
                if (Math.abs(Math.round(value)-value) < .000001) {
                    this.entries[j][i]=Math.round(value);
               }
            }
        }
    }


    toString(){
        const maxchars = 7;
        var str = "\n";

        for (var i=0; i<this.numrows; i++){
            str += "[";
            for(var j=0; j<this.numcols; j++){
                var numstr = this.entries[i][j].toString();
                if(numstr.length>maxchars) numstr=numstr.slice(0,maxchars);
                while(numstr.length<maxchars) numstr = ' ' + numstr;
                str += numstr; 
                str += " ";
            }
            str += "]\n";
        }
        str +="\n";
    return str;
    }
    





}
