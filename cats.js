"use strict";

function Cat(name, color) {
    function Fullname(first, last) {
        this.first = first;
        this.last = last;
    }
    this.name = new Fullname();
    this.color = color;
}

var gatinho1 = new Cat();
gatinho1.name.first = "Fofo";
gatinho1.name.last = "DelRey";
gatinho1.color = "Amarelo";

gatinho1.dono = "Susana";

exports.name = gatinho1.name.first + " " + gatinho1.name.last;
exports.color = gatinho1.color;
exports.dono = gatinho1.dono;

/*console.log("Nome: " + gatinho1.name.first + " " + gatinho1.name.last);
console.log("Cor: " + gatinho1.color);
console.log("Dono: " + gatinho1.dono);*/
