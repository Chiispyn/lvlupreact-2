// level-up-gaming-frontend/src/services/AdminOrderService.ts

import axios from 'axios';
import { Order, OrderUpdatePayload } from '../types/Order';
import { User } from '../types/User';
import { API_ENDPOINTS } from './api.config';

/**
 * Servicio para gestionar órdenes en el panel administrativo
 */

export const AdminOrderService = {
    /**
     * Obtiene todas las órdenes
     */
    async fetchOrders(): Promise<Order[]> {
        try {
            const { data } = await axios.get(API_ENDPOINTS.ORDERS);
            return Array.isArray(data) ? data.reverse() : [];
        } catch (error) {
            throw new Error('Error al cargar las órdenes. Asegúrate de que el Backend esté corriendo.');
        }
    },

    /**
     * Obtiene todos los usuarios (para mapear IDs a RUTs)
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
     * Obtiene órdenes y usuarios en paralelo
     */
    async fetchOrdersAndUsers(): Promise<{ orders: Order[]; users: User[] }> {
        try {
            const [ordersRes, usersRes] = await Promise.all([
                axios.get(API_ENDPOINTS.ORDERS),
                axios.get(API_ENDPOINTS.USERS),
            ]);

            return {
                orders: Array.isArray(ordersRes.data) ? ordersRes.data.reverse() : [],
                users: Array.isArray(usersRes.data) ? usersRes.data : [],
            };
        } catch (error) {
            throw new Error('Error al cargar órdenes y usuarios.');
        }
    },

    /**
     * Actualiza el estado de una orden
     */
    async updateOrderStatus(orderId: string, payload: OrderUpdatePayload): Promise<Order> {
        try {
            const { data } = await axios.put(`${API_ENDPOINTS.ORDERS}/${orderId}/status`, payload);
            return data;
        } catch (error) {
            throw new Error('Fallo al actualizar el estado de la orden.');
        }
    },
};

export default AdminOrderService;
