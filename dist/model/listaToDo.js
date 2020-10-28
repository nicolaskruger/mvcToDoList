class listaToDo {
    constructor() {
        this.lis = [];
    }
    get Lis() {
        return [...this.lis];
    }
    add(...l) {
        console.log(l);
        this.lis.push(...l);
    }
}
//# sourceMappingURL=listaToDo.js.map