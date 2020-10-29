

class toDodao {
    private connection:IDBDatabase;
    private store = ConnectionFactory.stores[0];
    constructor(connetion:IDBDatabase) {
        this.connection= connetion;
    }
    private getObjetStore(){
        return ConnectionFactory.getConnection()
                    .then(s=>{
                        return new Promise<IDBObjectStore>(resp=>resp(
                            s.transaction([ConnectionFactory.stores[0]],'readwrite')
                                .objectStore(ConnectionFactory.stores[0]))
                            )
                    });
    }
    public add(todo:toDo){
        return new Promise((resolve,reject)=>{
            let request = this.connection
                            .transaction([this.store],'readwrite')
                            .objectStore(this.store)
                            .add(todo);
            request.onsuccess = e =>{
                resolve();
            }
            request.onerror = e =>{
                reject();
            }
        })
    }
    public getLista(){
        return new Promise<Array<toDo>>((resolve)=>{
            let cursor = this.connection
                            .transaction([this.store],'readwrite')
                            .objectStore(this.store)
                            .openCursor();
            let todos:Array<toDo> = []
            cursor.onsuccess = e =>{
                let atual = cursor.result;
                if(atual){
                    var dado = atual.value;
                    todos.push(new toDo(dado.nome,dado.desc,dado.data))
                    atual.continue();
                }else{
                    resolve(todos)
                }
            }
        });
    }
    public erase(){
        return new Promise((resolve,reject)=>{
            let erase = this.connection
                            .transaction([this.store],'readwrite')
                            .objectStore(this.store)
                            .clear();
            erase.onsuccess = e=> resolve();
            erase.onerror = e => reject();
        })
    }
}