"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controlerToDo_1 = require("./controller/controlerToDo");
let controller = new controlerToDo_1.controllerToDo();
document.querySelector('.forma').onsubmit = controller.add.bind(controller);
document.querySelector('#apaga').onclick = controller.erase.bind(controller);
//# sourceMappingURL=app.js.map