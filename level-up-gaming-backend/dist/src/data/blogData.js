// level-up-gaming-backend/src/data/blogData.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getBlogPosts", {
    enumerable: true,
    get: function() {
        return getBlogPosts;
    }
});
const _dbUtils = require("../utils/dbUtils");
const getBlogPosts = ()=>(0, _dbUtils.readFromDb)('blog');
