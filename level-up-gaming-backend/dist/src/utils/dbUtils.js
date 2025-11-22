// level-up-gaming-backend/src/utils/dbUtils.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get readFromDb () {
        return readFromDb;
    },
    get writeToDb () {
        return writeToDb;
    }
});
const _fs = /*#__PURE__*/ _interop_require_default(require("fs"));
const _path = /*#__PURE__*/ _interop_require_default(require("path"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const readFromDb = (table)=>{
    const dbPath = _path.default.resolve(__dirname, `../db/${table}.json`);
    try {
        const data = _fs.default.readFileSync(dbPath, 'utf-8');
        const parsedData = JSON.parse(data);
        if (!Array.isArray(parsedData)) {
            console.warn(`Content of ${table}.json is not an array. Initializing as empty array.`);
            return [];
        }
        return parsedData;
    } catch (error) {
        // Si el archivo no existe o hay un error, retorna una lista vacía.
        console.error(`Error reading from ${table}.json:`, error);
        return [];
    }
};
const writeToDb = (table, data)=>{
    const dbPath = _path.default.resolve(__dirname, `../db/${table}.json`);
    try {
        _fs.default.writeFileSync(dbPath, JSON.stringify(data, null, 4), 'utf-8');
    } catch (error) {
        console.error(`Error writing to ${table}.json:`, error);
    }
};
