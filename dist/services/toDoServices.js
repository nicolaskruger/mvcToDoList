"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConnectionFactory_1 = require("./ConnectionFactory");
const toDodao_1 = require("../dao/toDodao");
class toDoServices {
    constructor() {
    }
    add(...todo) {
        return ConnectionFactory_1.ConnectionFactory
            .getConnection()
            .then(connection => new toDodao_1.toDodao(connection))
            .then(dao => todo.forEach(td => dao.add(td)));
    }
    getLista() {
        return ConnectionFactory_1.ConnectionFactory
            .getConnection()
            .then(connection => new toDodao_1.toDodao(connection))
            .then(dao => dao.getLista());
    }
    erase() {
        return ConnectionFactory_1.ConnectionFactory
            .getConnection()
            .then(connection => new toDodao_1.toDodao(connection))
            .then(dao => dao.erase());
    }
}
exports.toDoServices = toDoServices;
//# sourceMappingURL=toDoServices.js.map