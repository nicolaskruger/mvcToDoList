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
        ConnectionFactory.getLista().then(s => {
            this.lista.add(...s);
        }).catch(e => {
            console.log(e);
        });
    }
    add(event) {
        event.preventDefault();
        let todo = new toDo(...this.inputs
            .map(s => s.value));
        this.lista.add(todo);
        ConnectionFactory.add(todo);
        this.clear();
    }
    clear() {
        this.inputs.forEach(s => {
            s.value = "";
        });
    }
}
//# sourceMappingURL=controlerToDo.js.map