class toDodao {
    constructor(connetion) {
        this.store = ConnectionFactory.stores[0];
        this.connection = connetion;
    }
    getObjetStore() {
        return ConnectionFactory.getConnection()
            .then(s => {
            return new Promise(resp => resp(s.transaction([ConnectionFactory.stores[0]], 'readwrite')
                .objectStore(ConnectionFactory.stores[0])));
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
                    todos.push(new toDo(dado.nome, dado.desc, dado.data));
                    atual.continue();
                }
                else {
                    resolve(todos);
                }
            };
        });
    }
}
//# sourceMappingURL=toDodao.js.map