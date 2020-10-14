class controllerToDo{
    private $ = document.querySelector.bind(document);
    private inputs = [
        this.$("#nome") as HTMLInputElement,
        this.$("#desc") as HTMLInputElement,
        this.$("#data") as HTMLInputElement,
    ];
    private L = this.$("#lista");
    private lista = new listaToDo();
    private view = new viewToDo();
    constructor(){

    }
    add(event:Event):void{
        event.preventDefault();
        let todo = new toDo(...this.inputs
                            .map(s => s.value));
        this.lista.add(todo);
        this.view.set(this.L,this.lista);
        this.clear();
    }
    clear(){
        this.inputs.forEach(s=>{
            s.value="";
        })
    }
}