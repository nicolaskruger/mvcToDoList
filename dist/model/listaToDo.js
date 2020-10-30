"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.listaToDo = listaToDo;
//# sourceMappingURL=listaToDo.js.map