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
        this.data = DataHelper.stringToDate(date);
    }
}
//# sourceMappingURL=toDo.js.map