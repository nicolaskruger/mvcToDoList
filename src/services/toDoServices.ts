class toDoServices {
    constructor() {
        
    }
    add(...todo:Array<toDo>){
        return ConnectionFactory
                .getConnection()
                .then(connection=>new toDodao(connection))
                .then(dao => todo.forEach(td=>dao.add(td)));
    }
    getLista(){
        return ConnectionFactory
                .getConnection()
                .then(connection=> new toDodao(connection))
                .then(dao => dao.getLista());
    }
    erase(){
        return ConnectionFactory
                .getConnection()
                .then(connection=>new toDodao(connection))
                .then(dao=>dao.erase());
    }
}