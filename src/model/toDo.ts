 
class toDo {
    nome:string;
    desc:string;
    data:Date;
    get DaysTo():number{
        var diff = Math.abs(this.data.getTime() -  new Date().getTime());
        return Math.ceil(diff / (1000 * 3600 * 24)); 
    }
    get Info():Array<string>{
        return [this.nome,this.desc,this.data.toDateString(),this.DaysTo.toFixed(2)];
    }
    constructor(nome:string =" atividae",desc:string ="o  q fazer",date:(string) = "2017-11-11"){
        this.nome =nome;
        this.desc = desc;
        try {
            this.data = DataHelper.stringToDate(date as string);
        } catch (error) {
            this.data = new Date(date);
        }
    }   
}