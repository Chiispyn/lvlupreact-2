// level-up-gaming-frontend/src/services/VideoService.ts

import axios from 'axios';
import { Video } from '../types/Video';
import { API_ENDPOINTS } from './api.config';

/**
 * Servicio para obtener videos (públicos)
 */
export const VideoService = {
    /**
     * Obtiene todos los videos
     */
    async fetchAllVideos(): Promise<Video[]> {
        try {
            const { data } = await axios.get(API_ENDPOINTS.VIDEOS);
            return Array.isArray(data) ? data.reverse() : [];
        } catch (error) {
            throw new Error('Error al cargar los videos.');
        }
    },

    /**
     * Obtiene un video por ID
     */
    async fetchVideoById(videoId: string): Promise<Video> {
        try {
            const { data } = await axios.get(`${API_ENDPOINTS.VIDEOS}/${videoId}`);
            return data;
        } catch (error) {
            throw new Error('Video no encontrado.');
        }
    },
};

export default VideoService;
