"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dateHelper_1 = require("../helper/dateHelper");
class toDo {
    get DaysTo() {
        var diff = Math.abs(this.data.getTime() - new Date().getTime());
        return Math.ceil(diff / (1000 * 3600 * 24));
    }
    get Info() {
        return [this.nome, this.desc, this.data.toDateString(), this.DaysTo.toFixed(2)];
    }
    constructor(nome = " atividae", desc = "o  q fazer", date = "2017-11-11") {
        this.nome = nome;
        this.desc = desc;
        try {
            this.data = dateHelper_1.DataHelper.stringToDate(date);
        }
        catch (error) {
            this.data = new Date(date);
        }
    }
}
exports.toDo = toDo;
//# sourceMappingURL=toDo.js.map