class controllerToDo {
    constructor() {
        this.$ = document.querySelector.bind(document);
        this.inputs = [
            this.$("#nome"),
            this.$("#desc"),
            this.$("#data"),
        ];
        this.L = this.$("#lista");
        this.lista = ProxyFactory.create(new listaToDo(), ['add'], (model) => this.view.set(model));
        this.view = new viewToDo(this.L);
        this.addDb();
    }
    addDb() {
        ConnectionFactory.getConnection()
            .then(connection => {
            new toDodao(connection)
                .getLista()
                .then(lis => this.lista.add(...lis));
        });
    }
    add(event) {
        event.preventDefault();
        ConnectionFactory.getConnection()
            .then(connection => {
            let todo = new toDo(...this.inputs
                .map(s => s.value));
            new toDodao(connection)
                .add(todo)
                .then(() => {
                this.lista.add(todo);
                this.clear();
            });
        });
        //ConnectionFactory.add(todo);
    }
    clear() {
        this.inputs.forEach(s => {
            s.value = "";
        });
    }
}
//# sourceMappingURL=controlerToDo.js.map