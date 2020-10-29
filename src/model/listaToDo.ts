class listaToDo{
    private lis :Array<toDo> = [];
    public get Lis(){
        return [...this.lis];
    }
    public add(...l:Array<toDo>){
        this.lis.push(...l);
    }
    public erase(){
        this.lis = [];
    }
}