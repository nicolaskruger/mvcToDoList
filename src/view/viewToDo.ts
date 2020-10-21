class viewToDo {
    private element:HTMLLIElement;
    constructor(elemet:HTMLLIElement) {
        this.element = elemet;
    }
    private template(models:listaToDo){
        return `
        <ul class="lista">
            ${models.Lis.map(s =>`
                    <li class="interLista">
                        <p>${s.nome}</p>
                        <p>${s.desc}</p>
                        <p>${DataHelper.dateToString(s.data)}</p>
                        <p>${s.DaysTo}</p>
                    </li>
            `).join('')}      
        </ul>`
    }
    public set(models:listaToDo){
        this.element.innerHTML= this.template(models);
    }
}