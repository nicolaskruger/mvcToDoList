"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function DateToString(dat) {
    return dat.getDate() + '/' + ((dat.getMonth() + 1) < 10 ? `0${dat.getMonth() + 1}` : `${(dat.getMonth() + 1)}`) + '/' + dat.getFullYear();
}
exports.DateToString = DateToString;
class DataHelper {
    constructor() {
        throw new Error("data helper não pode ser instanciado");
    }
    static stringToDate(text) {
        if (!(/\d{4}-\d{2}-\d{2}/.test(text)))
            throw new Error("data invalida formato aaaa-mm-dd");
        return new Date(text.replace("-", ","));
    }
    static dateToString(dat) {
        return `${dat.getDate()}/${((dat.getMonth() + 1) < 10 ? `0${dat.getMonth() + 1}` : `${(dat.getMonth() + 1)}`)}/${dat.getFullYear()}`;
    }
}
exports.DataHelper = DataHelper;
//# sourceMappingURL=dateHelper.js.map