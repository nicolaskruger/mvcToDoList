import {controllerToDo} from './controller/controlerToDo'
let controller = new controllerToDo();

(document.querySelector('.forma') as HTMLFormElement).onsubmit = controller.add.bind(controller);
(document.querySelector('#apaga') as HTMLButtonElement).onclick = controller.erase.bind(controller);
