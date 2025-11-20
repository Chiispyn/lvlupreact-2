// level-up-gaming-backend/src/data/eventData.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getEvents", {
    enumerable: true,
    get: function() {
        return getEvents;
    }
});
const _dbUtils = require("../utils/dbUtils");
const getEvents = ()=>(0, _dbUtils.readFromDb)('event');
