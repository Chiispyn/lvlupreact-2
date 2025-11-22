// level-up-gaming-backend/src/controllers/videoController.ts
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
    get createVideo () {
        return createVideo;
    },
    get deleteVideo () {
        return deleteVideo;
    },
    get getAllVideos () {
        return getAllVideos;
    },
    get getFeaturedVideos () {
        return getFeaturedVideos;
    },
    get toggleVideoFeature () {
        return toggleVideoFeature;
    },
    get updateVideo () {
        return updateVideo;
    }
});
const _videoData = require("../data/videoData");
const _uuid = require("uuid");
const _dbUtils = require("../utils/dbUtils");
// ----------------------------------------------------
// LECTURA (GET)
// ----------------------------------------------------
const getFeaturedVideos = (req, res)=>{
    try {
        const videos = (0, _videoData.getVideos)();
        if (!videos) {
            return res.status(200).json([]);
        }
        const featured = videos.filter((v)=>v.isFeatured).slice(0, 2);
        res.json(featured);
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor al procesar videos destacados.'
        });
    }
};
const getAllVideos = (req, res)=>{
    try {
        res.json((0, _videoData.getVideos)());
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor al procesar videos.'
        });
    }
};
// ----------------------------------------------------
// ADMINISTRACIÓN (CRUD)
// ----------------------------------------------------
const createVideo = (req, res)=>{
    try {
        const { title, embedUrl, isFeatured } = req.body;
        if (!title || !embedUrl) {
            return res.status(400).json({
                message: 'Faltan campos obligatorios: título y URL de incrustación.'
            });
        }
        const newVideo = {
            id: (0, _uuid.v4)(),
            title: title,
            embedUrl: embedUrl,
            isFeatured: isFeatured || false
        };
        const videos = (0, _videoData.getVideos)();
        videos.push(newVideo);
        (0, _dbUtils.writeToDb)('video', videos);
        res.status(201).json(newVideo);
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor al crear video.'
        });
    }
};
const updateVideo = (req, res)=>{
    try {
        const { id } = req.params;
        const updateData = req.body;
        const videos = (0, _videoData.getVideos)();
        const videoIndex = videos.findIndex((v)=>v.id === id);
        if (videoIndex !== -1) {
            videos[videoIndex] = {
                ...videos[videoIndex],
                ...updateData
            };
            (0, _dbUtils.writeToDb)('video', videos);
            res.json(videos[videoIndex]);
            return;
        }
        res.status(404).json({
            message: 'Video no encontrado.'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor al actualizar video.'
        });
    }
};
const deleteVideo = (req, res)=>{
    const { id } = req.params;
    let videos = (0, _videoData.getVideos)();
    const initialLength = videos.length;
    videos = videos.filter((v)=>v.id !== id);
    (0, _dbUtils.writeToDb)('video', videos);
    if (videos.length < initialLength) {
        res.status(200).json({
            message: 'Video eliminado.'
        });
    } else {
        res.status(404).json({
            message: 'Video no encontrado.'
        });
    }
};
const toggleVideoFeature = (req, res)=>{
    const { id } = req.params;
    const videos = (0, _videoData.getVideos)();
    const videoIndex = videos.findIndex((v)=>v.id === id);
    if (videoIndex !== -1) {
        videos[videoIndex].isFeatured = !videos[videoIndex].isFeatured;
        (0, _dbUtils.writeToDb)('video', videos);
        res.json(videos[videoIndex]);
        return;
    }
    res.status(404).json({
        message: 'Video no encontrado.'
    });
};
