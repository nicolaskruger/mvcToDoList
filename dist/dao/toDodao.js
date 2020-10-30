"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConnectionFactory_1 = require("../services/ConnectionFactory");
const toDo_1 = require("../model/toDo");
class toDodao {
    constructor(connetion) {
        this.store = ConnectionFactory_1.ConnectionFactory.stores[0];
        this.connection = connetion;
    }
    getObjetStore() {
        return ConnectionFactory_1.ConnectionFactory.getConnection()
            .then(s => {
            return new Promise(resp => resp(s.transaction([ConnectionFactory_1.ConnectionFactory.stores[0]], 'readwrite')
                .objectStore(ConnectionFactory_1.ConnectionFactory.stores[0])));
        });
    }
    add(todo) {
        return new Promise((resolve, reject) => {
            let request = this.connection
                .transaction([this.store], 'readwrite')
                .objectStore(this.store)
                .add(todo);
            request.onsuccess = e => {
                resolve();
            };
            request.onerror = e => {
                reject();
            };
        });
    }
    getLista() {
        return new Promise((resolve) => {
            let cursor = this.connection
                .transaction([this.store], 'readwrite')
                .objectStore(this.store)
                .openCursor();
            let todos = [];
            cursor.onsuccess = e => {
                let atual = cursor.result;
                if (atual) {
                    var dado = atual.value;
                    todos.push(new toDo_1.toDo(dado.nome, dado.desc, dado.data));
                    atual.continue();
                }
                else {
                    resolve(todos);
                }
            };
        });
    }
    erase() {
        return new Promise((resolve, reject) => {
            let erase = this.connection
                .transaction([this.store], 'readwrite')
                .objectStore(this.store)
                .clear();
            erase.onsuccess = e => resolve();
            erase.onerror = e => reject();
        });
    }
}
exports.toDodao = toDodao;
//# sourceMappingURL=toDodao.js.map