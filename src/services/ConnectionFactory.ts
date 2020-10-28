class ConnectionFactory{
    private static stores = ["lis"];
    private static dbName = "toDo";
    private static version = 1;
    private static connection:IDBDatabase =null;
    static getConnection(){
        return new Promise<IDBDatabase>((resolve,reject)=>{
            let openRequest = window.indexedDB.open(ConnectionFactory.dbName,ConnectionFactory.version);
            openRequest.onupgradeneeded = e =>{
                ConnectionFactory._createStore(openRequest.result);
            };
            openRequest.onsuccess= e =>{
                if(!ConnectionFactory.connection)
                    ConnectionFactory.connection = openRequest.result;
                    resolve(ConnectionFactory.connection);
                
            }
            openRequest.onerror =  e =>{
                console.log(openRequest.error);
                resolve(null);
            };
        });
    }
    private static _createStore(connection:IDBDatabase){
        ConnectionFactory.stores.forEach(store=>{
            if(connection.objectStoreNames.contains(store)){
                connection.deleteObjectStore(store);
            }
            connection.createObjectStore(store,{autoIncrement:true});

        })
    }
    static closeConnection(){
        ConnectionFactory.connection.close();
        ConnectionFactory.connection = null;
    }
    private static getTodo(){
        return this.getConnection()
                    .then(s=>{
                        return new Promise<IDBObjectStore>(resp=>resp(
                            s.transaction([ConnectionFactory.stores[0]],'readwrite')
                                .objectStore(ConnectionFactory.stores[0]))
                            )
                    });
    } 
    static add(todo:toDo){
        ConnectionFactory.getTodo().then(s =>{
            let request = s.add(todo);
            request.onsuccess = e => {
                console.log("negociação incluida com sucesso");
            }
            request.onerror = e =>{
                console.log("não foi possivel incluir");
            }
        })
    }
    static getLista(){
        return ConnectionFactory.getTodo().then(s =>{
            return new Promise<Array<toDo>>(res=>{
                let todos:Array<toDo> =[];
                let cursor = s.openCursor();
                cursor.onsuccess = e =>{
                    let atual = cursor.result;
                    if(atual){
                        var dado = atual.value;
                        todos.push(new toDo(dado.nome,dado.desc,dado.data))
                        atual.continue();
                    }else{
                        res(todos)
                    }
                }
            })
        })
    }
}