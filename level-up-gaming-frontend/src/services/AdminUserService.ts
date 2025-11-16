// level-up-gaming-frontend/src/services/AdminUserService.ts

import axios from 'axios';
import { User, UserCreatePayload, UserUpdatePayload } from '../types/User';
import { API_ENDPOINTS } from './api.config';

/**
 * Servicio para gestionar usuarios en el panel administrativo
 */
export const AdminUserService = {
    /**
     * Obtiene todos los usuarios
     */
    async fetchUsers(): Promise<User[]> {
        try {
            const { data } = await axios.get(API_ENDPOINTS.USERS);
            return Array.isArray(data) ? data : [];
        } catch (error) {
            throw new Error('Error al cargar los usuarios.');
        }
    },

    /**
     * Crea un nuevo usuario
     */
    async createUser(payload: UserCreatePayload): Promise<User> {
        try {
            const { data } = await axios.post(`${API_ENDPOINTS.USERS}/admin`, payload);
            return data;
        } catch (error: any) {
            throw error;
        }
    },

    /**
     * Actualiza un usuario existente
     */
    async updateUser(userId: string, payload: UserUpdatePayload): Promise<User> {
        try {
            const { data } = await axios.put(`${API_ENDPOINTS.USERS}/${userId}/admin`, payload);
            return data;
        } catch (error: any) {
            throw error;
        }
    },

    /**
     * Activa o desactiva un usuario
     */
    async toggleUserStatus(userId: string, isActive: boolean): Promise<User> {
        try {
            const { data } = await axios.put(`${API_ENDPOINTS.USERS}/${userId}/status`, { isActive });
            return data;
        } catch (error) {
            throw new Error('Fallo al cambiar el estado del usuario.');
        }
    },

    /**
     * Elimina un usuario
     */
    async deleteUser(userId: string): Promise<void> {
        try {
            await axios.delete(`${API_ENDPOINTS.USERS}/${userId}/admin`);
        } catch (error) {
            throw new Error('Fallo al eliminar el usuario.');
        }
    },
};

export default AdminUserService;
