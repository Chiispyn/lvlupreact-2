// level-up-gaming-backend/src/data/rewardData.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getRewards", {
    enumerable: true,
    get: function() {
        return getRewards;
    }
});
const _dbUtils = require("../utils/dbUtils");
const getRewards = ()=>(0, _dbUtils.readFromDb)('reward');
