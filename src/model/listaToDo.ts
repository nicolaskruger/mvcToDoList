class listaToDo{
    private lis :Array<toDo> = [];
    public get Lis(){
        return [...this.lis];
    }
    public add(...l:Array<toDo>){
        console.log(l);
        this.lis.push(...l);
    }
}