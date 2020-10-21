class viewToDo {
    constructor(elemet) {
        this.element = elemet;
    }
    template(models) {
        return `
        <ul class="lista">
            ${models.Lis.map(s => `
                    <li class="interLista">
                        <p>${s.nome}</p>
                        <p>${s.desc}</p>
                        <p>${DataHelper.dateToString(s.data)}</p>
                        <p>${s.DaysTo}</p>
                    </li>
            `).join('')}      
        </ul>`;
    }
    set(models) {
        this.element.innerHTML = this.template(models);
    }
}
//# sourceMappingURL=viewToDo.js.map