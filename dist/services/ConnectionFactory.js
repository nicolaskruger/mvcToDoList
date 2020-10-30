"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toDo_1 = require("../model/toDo");
class ConnectionFactory {
    static getConnection() {
        return new Promise((resolve, reject) => {
            let openRequest = window.indexedDB.open(ConnectionFactory.dbName, ConnectionFactory.version);
            openRequest.onupgradeneeded = e => {
                ConnectionFactory._createStore(openRequest.result);
            };
            openRequest.onsuccess = e => {
                if (!ConnectionFactory.connection)
                    ConnectionFactory.connection = openRequest.result;
                resolve(ConnectionFactory.connection);
            };
            openRequest.onerror = e => {
                console.log(openRequest.error);
                resolve(null);
            };
        });
    }
    static _createStore(connection) {
        ConnectionFactory.stores.forEach(store => {
            if (connection.objectStoreNames.contains(store)) {
                connection.deleteObjectStore(store);
            }
            connection.createObjectStore(store, { autoIncrement: true });
        });
    }
    static closeConnection() {
        ConnectionFactory.connection.close();
        ConnectionFactory.connection = null;
    }
    static getTodo() {
        return this.getConnection()
            .then(s => {
            return new Promise(resp => resp(s.transaction([ConnectionFactory.stores[0]], 'readwrite')
                .objectStore(ConnectionFactory.stores[0])));
        });
    }
    static add(todo) {
        ConnectionFactory.getTodo().then(s => {
            let request = s.add(todo);
            request.onsuccess = e => {
                console.log("negociação incluida com sucesso");
            };
            request.onerror = e => {
                console.log("não foi possivel incluir");
            };
        });
    }
    static getLista() {
        return ConnectionFactory.getTodo().then(s => {
            return new Promise(res => {
                let todos = [];
                let cursor = s.openCursor();
                cursor.onsuccess = e => {
                    let atual = cursor.result;
                    if (atual) {
                        var dado = atual.value;
                        todos.push(new toDo_1.toDo(dado.nome, dado.desc, dado.data));
                        atual.continue();
                    }
                    else {
                        res(todos);
                    }
                };
            });
        });
    }
}
ConnectionFactory.stores = ["lis"];
ConnectionFactory.dbName = "toDo";
ConnectionFactory.version = 1;
ConnectionFactory.connection = null;
exports.ConnectionFactory = ConnectionFactory;
//# sourceMappingURL=ConnectionFactory.js.map