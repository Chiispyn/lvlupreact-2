// level-up-gaming-backend/src/controllers/blogController.ts
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
    get createBlogPost () {
        return createBlogPost;
    },
    get deleteBlogPost () {
        return deleteBlogPost;
    },
    get getBlogPostById () {
        return getBlogPostById;
    },
    get getBlogPosts () {
        return getBlogPosts;
    },
    get updateBlogPost () {
        return updateBlogPost;
    }
});
const _blogData = require("../data/blogData");
const _uuid = require("uuid");
const _dbUtils = require("../utils/dbUtils");
// ----------------------------------------------------
// LECTURA (GET)
// ----------------------------------------------------
const getBlogPosts = (req, res)=>{
    try {
        const blogPosts = (0, _blogData.getBlogPosts)();
        if (!blogPosts) {
            return res.status(200).json([]);
        }
        const sortedPosts = blogPosts.sort((a, b)=>new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        res.json(sortedPosts);
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor al procesar blog.'
        });
    }
};
const getBlogPostById = (req, res)=>{
    const { id } = req.params;
    const blogPosts = (0, _blogData.getBlogPosts)();
    const post = blogPosts.find((p)=>p.id === id); // Busca el post por ID
    if (post) {
        res.json(post);
    } else {
        res.status(404).json({
            message: 'Post no encontrado.'
        });
    }
};
// ----------------------------------------------------
// ADMINISTRACIÓN (CRUD)
// ----------------------------------------------------
// ... (Funciones createBlogPost, updateBlogPost, deleteBlogPost) ...
const createBlogPost = (req, res)=>{
    try {
        const { title, excerpt, content, imageUrl, author } = req.body;
        if (!title || !content) {
            return res.status(400).json({
                message: 'Faltan campos obligatorios: título y contenido.'
            });
        }
        const newPost = {
            id: (0, _uuid.v4)(),
            title: title,
            excerpt: excerpt || 'Sin resumen',
            content: content,
            imageUrl: imageUrl || 'https://picsum.photos/id/500/300/200',
            author: author || 'Admin',
            createdAt: new Date().toISOString()
        };
        const blogPosts = (0, _blogData.getBlogPosts)();
        blogPosts.push(newPost);
        (0, _dbUtils.writeToDb)('blog', blogPosts);
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor al crear post.'
        });
    }
};
const updateBlogPost = (req, res)=>{
    try {
        const { id } = req.params;
        const updateData = req.body;
        const blogPosts = (0, _blogData.getBlogPosts)();
        const postIndex = blogPosts.findIndex((p)=>p.id === id);
        if (postIndex !== -1) {
            blogPosts[postIndex] = {
                ...blogPosts[postIndex],
                ...updateData
            };
            (0, _dbUtils.writeToDb)('blog', blogPosts);
            res.json(blogPosts[postIndex]);
            return;
        }
        res.status(404).json({
            message: 'Post no encontrado para actualizar.'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor al actualizar post.'
        });
    }
};
const deleteBlogPost = (req, res)=>{
    const { id } = req.params;
    let blogPosts = (0, _blogData.getBlogPosts)();
    const initialLength = blogPosts.length;
    blogPosts = blogPosts.filter((p)=>p.id !== id);
    (0, _dbUtils.writeToDb)('blog', blogPosts);
    if (blogPosts.length < initialLength) {
        res.status(200).json({
            message: 'Post eliminado.'
        });
    } else {
        res.status(404).json({
            message: 'Post no encontrado.'
        });
    }
};
