"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dateHelper_1 = require("../helper/dateHelper");
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
                        <p>${dateHelper_1.DataHelper.dateToString(s.data)}</p>
                        <p>${s.DaysTo}</p>
                    </li>
            `).join('')}      
        </ul>`;
    }
    set(models) {
        this.element.innerHTML = this.template(models);
    }
}
exports.viewToDo = viewToDo;
//# sourceMappingURL=viewToDo.js.map