"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toDo_1 = require("../model/toDo");
class controllerIndexDb {
    constructor() {
        this.tableName = "lis";
        this.dbName = "toDo";
        this.openRequest = window.indexedDB.open(this.dbName, 1);
        this.openRequest.onupgradeneeded = (e) => {
            console.log("cria ou altera u banco");
            let minhaConnection = this.openRequest.result;
            if (minhaConnection.objectStoreNames.contains(this.tableName))
                minhaConnection.deleteObjectStore(this.tableName);
            minhaConnection.createObjectStore(this.tableName, { autoIncrement: true });
        };
        this.openRequest.onsuccess = e => {
            console.log("conexão estabelecida com sucesso");
            this.connection = this.openRequest.result;
        };
        this.openRequest.onerror = e => {
            console.log(this.openRequest.error);
        };
    }
    get Store() {
        let transaction = this.connection.transaction([this.tableName], 'readwrite');
        return transaction.objectStore(this.tableName);
    }
    add(todo) {
        let store = this.Store;
        let request = store.add(todo);
        request.onsuccess = e => {
            console.log("negociação incluida com sucesso");
        };
        request.onerror = e => {
            console.log("não foi possivel incluir");
        };
    }
    get Lista() {
        return new Promise((resolve, reject) => {
            let todos = [];
            let store = this.Store;
            let cursor = store.openCursor();
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
            cursor.onerror = e => {
                reject(cursor.error);
            };
        });
    }
}
exports.controllerIndexDb = controllerIndexDb;
//# sourceMappingURL=controllerIndexDb.js.map