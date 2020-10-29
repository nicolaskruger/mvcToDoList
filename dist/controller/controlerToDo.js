class controllerToDo {
    constructor() {
        this.$ = document.querySelector.bind(document);
        this.inputs = [
            this.$("#nome"),
            this.$("#desc"),
            this.$("#data"),
        ];
        this.L = this.$("#lista");
        this.service = new toDoServices();
        this.lista = ProxyFactory.create(new listaToDo(), ['add', 'erase'], (model) => this.view.set(model));
        this.view = new viewToDo(this.L);
        this.addDb();
    }
    addDb() {
        this.service
            .getLista()
            .then((lis) => this.lista.add(...lis));
    }
    add(event) {
        event.preventDefault();
        let todo = new toDo(...this.inputs
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
//# sourceMappingURL=controlerToDo.js.map