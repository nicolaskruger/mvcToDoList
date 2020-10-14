class listaToDo{
    private lis :Array<toDo> = [];
    public get Lis(){
        return [...this.lis];
    }
    public add(l:toDo){
        this.lis.push(l);
    }
}