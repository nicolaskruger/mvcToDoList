import {toDoServices} from '../services/toDoServices';
import {listaToDo} from '../model/listaToDo';
import {toDo} from '../model/toDo';
import {viewToDo} from '../view/viewToDo';
import {ProxyFactory} from '../services/ProxyFactory';

export class controllerToDo{
    private $ = document.querySelector.bind(document);
    private inputs = [
        this.$("#nome") as HTMLInputElement,
        this.$("#desc") as HTMLInputElement,
        this.$("#data") as HTMLInputElement,
    ];
    private L = this.$("#lista");
    
    private lista:listaToDo; //= ProxyFactory.create(new listaToDo(),['add'],(model)=>this.view.set(model));
    private view:viewToDo;// = new viewToDo(this.L);

    private service:toDoServices = new toDoServices();
    constructor(){
        this.lista = ProxyFactory.create(new listaToDo(),['add','erase'],(model)=>this.view.set(model));
        this.view = new viewToDo(this.L);
        this.addDb();
    }
    addDb(){
        this.service
            .getLista()
            .then((lis)=>this.lista.add(...lis));
    }
    add(event:Event):void{
        event.preventDefault();
        let todo = new toDo(...this.inputs
            .map(s => s.value));
        this.service
            .add(todo)
            .then(()=>{
                this.lista.add(todo)
                this.clear();
            })
        
    }
    erase(envent:Event){
        this.service
            .erase()
            .then(()=>this.lista.erase())
            .catch(()=> console.log("error"));
    }
    clear(){
        this.inputs.forEach(s=>{
            s.value="";
        })
    }
}