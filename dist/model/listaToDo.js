class listaToDo {
    constructor() {
        this.lis = [];
    }
    get Lis() {
        return [...this.lis];
    }
    add(...l) {
        this.lis.push(...l);
    }
    erase() {
        this.lis = [];
    }
}
//# sourceMappingURL=listaToDo.js.map