class viewToDo {
    constructor() {
        
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
    public set(element:HTMLLIElement,models:listaToDo){
        element.innerHTML= this.template(models);
    }
}