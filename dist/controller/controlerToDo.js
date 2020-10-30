"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toDoServices_1 = require("../services/toDoServices");
const listaToDo_1 = require("../model/listaToDo");
const toDo_1 = require("../model/toDo");
const viewToDo_1 = require("../view/viewToDo");
const ProxyFactory_1 = require("../services/ProxyFactory");
class controllerToDo {
    constructor() {
        this.$ = document.querySelector.bind(document);
        this.inputs = [
            this.$("#nome"),
            this.$("#desc"),
            this.$("#data"),
        ];
        this.L = this.$("#lista");
        this.service = new toDoServices_1.toDoServices();
        this.lista = ProxyFactory_1.ProxyFactory.create(new listaToDo_1.listaToDo(), ['add', 'erase'], (model) => this.view.set(model));
        this.view = new viewToDo_1.viewToDo(this.L);
        this.addDb();
    }
    addDb() {
        this.service
            .getLista()
            .then((lis) => this.lista.add(...lis));
    }
    add(event) {
        event.preventDefault();
        let todo = new toDo_1.toDo(...this.inputs
            .map(s => s.value));
        this.service
            .add(todo)
            .then(() => {
            this.lista.add(todo);
            this.clear();
        });
    }
    erase(envent) {
        this.service
            .erase()
            .then(() => this.lista.erase())
            .catch(() => console.log("error"));
    }
    clear() {
        this.inputs.forEach(s => {
            s.value = "";
        });
    }
}
exports.controllerToDo = controllerToDo;
//# sourceMappingURL=controlerToDo.js.map