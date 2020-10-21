class controllerToDo {
    constructor() {
        this.$ = document.querySelector.bind(document);
        this.inputs = [
            this.$("#nome"),
            this.$("#desc"),
            this.$("#data"),
        ];
        this.L = this.$("#lista");
        this.view = new viewToDo(this.L);
        this.lista = ProxyFactory.create(new listaToDo(), ['add'], (model) => this.view.set(model));
    }
    add(event) {
        event.preventDefault();
        let todo = new toDo(...this.inputs
            .map(s => s.value));
        this.lista.add(todo);
        //this.view.set(this.lista);
        this.clear();
    }
    clear() {
        this.inputs.forEach(s => {
            s.value = "";
        });
    }
}
//# sourceMappingURL=controlerToDo.js.map