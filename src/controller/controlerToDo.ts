class controllerToDo{
    private $ = document.querySelector.bind(document);
    private inputs = [
        this.$("#nome") as HTMLInputElement,
        this.$("#desc") as HTMLInputElement,
        this.$("#data") as HTMLInputElement,
    ];
    private L = this.$("#lista");
    
    private lista:listaToDo; //= ProxyFactory.create(new listaToDo(),['add'],(model)=>this.view.set(model));
    private view:viewToDo;// = new viewToDo(this.L);

    constructor(){
        this.lista = ProxyFactory.create(new listaToDo(),['add'],(model)=>this.view.set(model));
        this.view = new viewToDo(this.L);
        this.addDb();
    }
    addDb(){
        ConnectionFactory.getLista().then(s=>{
            this.lista.add(...s);
        }).catch(e =>{
            console.log(e)
        })
    }
    add(event:Event):void{
        event.preventDefault();
        let todo = new toDo(...this.inputs
                            .map(s => s.value));
        this.lista.add(todo);
        ConnectionFactory.add(todo);
        this.clear();
    }
    clear(){
        this.inputs.forEach(s=>{
            s.value="";
        })
    }
}