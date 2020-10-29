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
        ConnectionFactory.getConnection()
                        .then(connection=>{
                            new toDodao(connection)
                                .getLista()
                                .then(lis=> this.lista.add(...lis))
                        })
       
    }
    add(event:Event):void{
        event.preventDefault();
        ConnectionFactory.getConnection()
            .then(connection=>{
                let todo = new toDo(...this.inputs
                    .map(s => s.value));
                new toDodao(connection)
                        .add(todo)
                        .then(()=>{
                            this.lista.add(todo);
                            this.clear();
                        })

                        
            })
        //ConnectionFactory.add(todo);
    }
    clear(){
        this.inputs.forEach(s=>{
            s.value="";
        })
    }
}