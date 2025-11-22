// level-up-gaming-backend/src/data/videoData.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getVideos", {
    enumerable: true,
    get: function() {
        return getVideos;
    }
});
const _dbUtils = require("../utils/dbUtils");
const getVideos = ()=>(0, _dbUtils.readFromDb)('video');
