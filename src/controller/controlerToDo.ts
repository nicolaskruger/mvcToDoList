class controllerToDo{
    private $ = document.querySelector.bind(document);
    private inputs = [
        this.$("#nome") as HTMLInputElement,
        this.$("#desc") as HTMLInputElement,
        this.$("#data") as HTMLInputElement,
    ];
    private L = this.$("#lista");
    
    private view = new viewToDo(this.L);
    private lista = ProxyFactory.create(new listaToDo(),['add'],(model)=>this.view.set(model));
    constructor(){

    }
    add(event:Event):void{
        event.preventDefault();
        let todo = new toDo(...this.inputs
                            .map(s => s.value));
        this.lista.add(todo);
        this.clear();
    }
    clear(){
        this.inputs.forEach(s=>{
            s.value="";
        })
    }
}