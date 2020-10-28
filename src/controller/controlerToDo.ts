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
    private indexDb:controllerIndexDb; //= new controllerIndexDb(); 

    constructor(){
        this.lista = ProxyFactory.create(new listaToDo(),['add'],(model)=>this.view.set(model));
        this.view = new viewToDo(this.L);
        this.indexDb = new controllerIndexDb(); 
        setTimeout(()=>{this.addDb()},1000);
    }
    addDb(){
        this.indexDb.Lista.then(s=>{
            this.lista.add(...s as Array<toDo>);
        }).catch(e =>{
            console.log(e)
        })
    }
    add(event:Event):void{
        event.preventDefault();
        let todo = new toDo(...this.inputs
                            .map(s => s.value));
        this.lista.add(todo);
        this.indexDb.add(todo);
        this.clear();
    }
    clear(){
        this.inputs.forEach(s=>{
            s.value="";
        })
    }
}